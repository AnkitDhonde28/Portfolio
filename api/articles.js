import { createClient } from "@supabase/supabase-js";

/* =========================================================
   SUPABASE SERVER CLIENT
========================================================= */

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SECRET_KEY
);

/* =========================================================
   ADMIN AUTHENTICATION
========================================================= */

async function getAdmin(req) {
  try {
    const authHeader =
      req.headers.authorization;

    if (
      !authHeader ||
      !authHeader.startsWith("Bearer ")
    ) {
      return null;
    }

    const token =
      authHeader.replace(
        "Bearer ",
        ""
      );

    if (!token) {
      return null;
    }

    const {
      data: { user },
      error,
    } =
      await supabase.auth.getUser(
        token
      );

    if (error || !user) {
      console.error(
        "Supabase auth error:",
        error
      );

      return null;
    }

    const adminEmail =
      process.env.ADMIN_EMAIL
        ?.trim()
        .toLowerCase();

    const userEmail =
      user.email
        ?.trim()
        .toLowerCase();

    if (
      !adminEmail ||
      !userEmail ||
      userEmail !== adminEmail
    ) {
      console.error(
        "Admin email mismatch:",
        userEmail
      );

      return null;
    }

    return user;
  } catch (error) {
    console.error(
      "getAdmin error:",
      error
    );

    return null;
  }
}

/* =========================================================
   NORMALIZE SLUG
========================================================= */

function normalizeSlug(slug) {
  return String(slug || "")
    .trim()
    .toLowerCase()
    .replace(
      /[^a-z0-9]+/g,
      "-"
    )
    .replace(
      /^-+|-+$/g,
      "");
}

/* =========================================================
   CLEAN STRING ARRAY
========================================================= */

function cleanStringArray(value) {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .filter(
      (item) =>
        typeof item === "string"
    )
    .map((item) =>
      item.trim()
    )
    .filter(Boolean);
}

/* =========================================================
   API HANDLER
========================================================= */

export default async function handler(
  req,
  res
) {
  try {
    console.log(
      `[ARTICLES API] ${req.method}`
    );

    /* =====================================================
       GET
       
       Public:
       Only published articles

       Admin:
       Draft + published articles
    ===================================================== */

    if (req.method === "GET") {
      const admin =
        await getAdmin(req);

      const requestedSlug =
        req.query?.slug
          ? String(
              req.query.slug
            ).trim()
          : "";

      let query = supabase
        .from("articles")
        .select("*")
        .order(
          "updated_at",
          {
            ascending: false,
          }
        );

      /* -----------------------------------------------
         Filter by slug if provided
      ------------------------------------------------ */

      if (requestedSlug) {
        query = query.eq(
          "slug",
          requestedSlug
        );
      }

      /* -----------------------------------------------
         Public users only see published
      ------------------------------------------------ */

      if (!admin) {
        query = query.eq(
          "status",
          "published"
        );
      }

      const {
        data,
        error,
      } = await query;

      if (error) {
        console.error(
          "GET articles error:",
          error
        );

        return res.status(500).json({
          error:
            "Failed to fetch articles",
          details:
            error.message,
          code:
            error.code || null,
        });
      }

      /*
       * Make sure every article has
       * arrays for technologies/topics/content.
       */

      const articles =
        (data || []).map(
          (article) => ({
            ...article,

            technologies:
              Array.isArray(
                article.technologies
              )
                ? article.technologies
                : [],

            topics:
              Array.isArray(
                article.topics
              )
                ? article.topics
                : [],

            content:
              Array.isArray(
                article.content
              )
                ? article.content
                : [],
          })
        );

      return res.status(200).json({
        articles,
      });
    }

    /* =====================================================
       POST
       
       Create new article
    ===================================================== */

    if (req.method === "POST") {
      const admin =
        await getAdmin(req);

      if (!admin) {
        return res.status(401).json({
          error:
            "Unauthorized",
        });
      }

      const body =
        req.body || {};

      console.log(
        "ARTICLE REQUEST:",
        JSON.stringify(body)
      );

      /* -----------------------------------------------
         Read body
      ------------------------------------------------ */

      const {
        title,
        slug,
        category,
        description,
        readTime,
        technologies,

        /*
         * NEW
         */
        topics,

        overview,
        content,
        status,
      } = body;

      /* -----------------------------------------------
         Validate title
      ------------------------------------------------ */

      if (
        typeof title !==
          "string" ||
        !title.trim()
      ) {
        return res.status(400).json({
          error:
            "Title is required.",
        });
      }

      /* -----------------------------------------------
         Validate slug
      ------------------------------------------------ */

      if (
        typeof slug !==
          "string" ||
        !slug.trim()
      ) {
        return res.status(400).json({
          error:
            "Slug is required.",
        });
      }

      const normalizedSlug =
        normalizeSlug(slug);

      if (!normalizedSlug) {
        return res.status(400).json({
          error:
            "Invalid slug.",
        });
      }

      /* -----------------------------------------------
         Validate content
      ------------------------------------------------ */

      let safeContent = [];

      if (
        Array.isArray(content)
      ) {
        safeContent =
          content;
      } else if (
        content === undefined ||
        content === null
      ) {
        safeContent = [];
      } else {
        return res.status(400).json({
          error:
            "Content must be a JSON array.",
        });
      }

      /* -----------------------------------------------
         Technologies
      ------------------------------------------------ */

      const safeTechnologies =
        cleanStringArray(
          technologies
        );

      /* -----------------------------------------------
         Topics / Exploring
      ------------------------------------------------ */

      const safeTopics =
        cleanStringArray(
          topics
        );

      /* -----------------------------------------------
         Status
      ------------------------------------------------ */

      const safeStatus =
        status === "published"
          ? "published"
          : "draft";

      /* -----------------------------------------------
         Check duplicate slug
      ------------------------------------------------ */

      const {
        data: existingArticle,
        error:
          slugCheckError,
      } =
        await supabase
          .from("articles")
          .select(
            "id, slug"
          )
          .eq(
            "slug",
            normalizedSlug
          )
          .maybeSingle();

      if (slugCheckError) {
        console.error(
          "Slug check error:",
          slugCheckError
        );

        return res.status(500).json({
          error:
            "Failed to check article slug.",
          details:
            slugCheckError.message,
        });
      }

      if (existingArticle) {
        return res.status(409).json({
          error:
            "An article with this slug already exists.",

          slug:
            normalizedSlug,
        });
      }

      /* -----------------------------------------------
         Published date
      ------------------------------------------------ */

      const publishedAt =
        safeStatus ===
        "published"
          ? new Date().toISOString()
          : null;

      /* -----------------------------------------------
         Article data
      ------------------------------------------------ */

      const articleData = {
        slug:
          normalizedSlug,

        title:
          title.trim(),

        category:
          typeof category ===
          "string"
            ? category.trim() ||
              "Cloud & DevOps"
            : "Cloud & DevOps",

        description:
          typeof description ===
          "string"
            ? description.trim()
            : "",

        read_time:
          typeof readTime ===
          "string"
            ? readTime.trim() ||
              "5 min read"
            : "5 min read",

        technologies:
          safeTechnologies,

        /*
         * NEW
         * Exploring / Topics
         */
        topics:
          safeTopics,

        overview:
          typeof overview ===
          "string"
            ? overview.trim()
            : "",

        content:
          safeContent,

        status:
          safeStatus,

        published_at:
          publishedAt,
      };

      console.log(
        "Creating article:",
        articleData.slug
      );

      console.log(
        "Topics:",
        articleData.topics
      );

      /* -----------------------------------------------
         INSERT
      ------------------------------------------------ */

      const {
        data: article,
        error:
          insertError,
      } =
        await supabase
          .from("articles")
          .insert(
            articleData
          )
          .select()
          .single();

      if (insertError) {
        console.error(
          "Insert article error:",
          insertError
        );

        return res.status(500).json({
          error:
            "Failed to create article.",

          details:
            insertError.message,

          code:
            insertError.code ||
            null,

          hint:
            insertError.hint ||
            null,
        });
      }

      console.log(
        "Article created:",
        article.id
      );

      /* -----------------------------------------------
         Normalize response
      ------------------------------------------------ */

      const createdArticle = {
        ...article,

        technologies:
          Array.isArray(
            article.technologies
          )
            ? article.technologies
            : [],

        topics:
          Array.isArray(
            article.topics
          )
            ? article.topics
            : [],

        content:
          Array.isArray(
            article.content
          )
            ? article.content
            : [],
      };

      return res.status(201).json({
        message:
          "Article created successfully.",

        article:
          createdArticle,
      });
    }

    /* =====================================================
       METHOD NOT ALLOWED
    ===================================================== */

    res.setHeader(
      "Allow",
      "GET, POST"
    );

    return res.status(405).json({
      error:
        "Method not allowed.",
    });

  } catch (error) {
    console.error(
      "ARTICLES API CRASH:",
      error
    );

    return res.status(500).json({
      error:
        "Internal server error.",

      details:
        error?.message ||
        String(error),
    });
  }
}