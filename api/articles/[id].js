import { createClient } from "@supabase/supabase-js";

/* =========================================================
   SUPABASE SERVER CLIENT
========================================================= */

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SECRET_KEY
);

/* =========================================================
   CHECK ADMIN
========================================================= */

async function requireAdmin(req) {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    return null;
  }

  const token = authHeader.replace(
    "Bearer ",
    ""
  );

  if (!token) {
    return null;
  }

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser(token);

  if (error || !user) {
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
    return null;
  }

  return user;
}

/* =========================================================
   VALIDATE ARTICLE ID
========================================================= */

function getArticleId(req) {
  const id = req.query?.id;

  if (!id) {
    return null;
  }

  const articleId = Number(id);

  if (
    !Number.isInteger(articleId) ||
    articleId <= 0
  ) {
    return null;
  }

  return articleId;
}

/* =========================================================
   NORMALIZE SLUG
========================================================= */

function normalizeSlug(slug) {
  return String(slug || "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
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
    .map((item) => item.trim())
    .filter(Boolean);
}

/* =========================================================
   API HANDLER
========================================================= */

export default async function handler(req, res) {
  try {
    const articleId =
      getArticleId(req);

    if (!articleId) {
      return res.status(400).json({
        error: "Invalid article ID",
      });
    }

    /* =====================================================
       GET SINGLE ARTICLE
    ===================================================== */

    if (req.method === "GET") {
      const admin =
        await requireAdmin(req);

      const {
        data,
        error,
      } = await supabase
        .from("articles")
        .select("*")
        .eq("id", articleId)
        .single();

      if (error) {
        if (
          error.code === "PGRST116"
        ) {
          return res.status(404).json({
            error:
              "Article not found",
          });
        }

        console.error(
          "GET article error:",
          error
        );

        return res.status(500).json({
          error:
            "Failed to fetch article",
          details: error.message,
        });
      }

      /* -----------------------------------------------
         Public users cannot access drafts
      ------------------------------------------------ */

      if (
        !admin &&
        data.status !== "published"
      ) {
        return res.status(404).json({
          error:
            "Article not found",
        });
      }

      /*
       * Make sure topics always exists.
       * Older articles may have an empty array.
       */

      const article = {
        ...data,

        technologies:
          Array.isArray(
            data.technologies
          )
            ? data.technologies
            : [],

        topics:
          Array.isArray(data.topics)
            ? data.topics
            : [],

        content:
          Array.isArray(data.content)
            ? data.content
            : [],
      };

      return res.status(200).json({
        article,
      });
    }

    /* =====================================================
       ADMIN REQUIRED FOR UPDATE / DELETE
    ===================================================== */

    if (
      req.method === "PUT" ||
      req.method === "DELETE"
    ) {
      const admin =
        await requireAdmin(req);

      if (!admin) {
        return res.status(401).json({
          error: "Unauthorized",
        });
      }
    }

    /* =====================================================
       UPDATE ARTICLE
    ===================================================== */

    if (req.method === "PUT") {
      const {
        slug,
        title,
        category,
        description,
        readTime,
        technologies,
        topics,
        overview,
        content,
        status,
      } = req.body || {};

      /* -----------------------------------------------
         Basic validation
      ------------------------------------------------ */

      if (
        typeof title !== "string" ||
        !title.trim()
      ) {
        return res.status(400).json({
          error:
            "Title is required",
        });
      }

      if (
        typeof slug !== "string" ||
        !slug.trim()
      ) {
        return res.status(400).json({
          error:
            "Slug is required",
        });
      }

      const normalizedSlug =
        normalizeSlug(slug);

      if (!normalizedSlug) {
        return res.status(400).json({
          error: "Invalid slug",
        });
      }

      /* -----------------------------------------------
         Check duplicate slug
      ------------------------------------------------ */

      const {
        data: existingArticle,
        error: existingError,
      } = await supabase
        .from("articles")
        .select("id")
        .eq("slug", normalizedSlug)
        .neq("id", articleId)
        .maybeSingle();

      if (existingError) {
        console.error(
          "Slug check error:",
          existingError
        );

        return res.status(500).json({
          error:
            "Failed to validate slug",
          details:
            existingError.message,
        });
      }

      if (existingArticle) {
        return res.status(409).json({
          error:
            "Another article already uses this slug",
        });
      }

      /* -----------------------------------------------
         Validate status
      ------------------------------------------------ */

      const articleStatus =
        status === "published"
          ? "published"
          : "draft";

      /* -----------------------------------------------
         Clean technologies
      ------------------------------------------------ */

      const safeTechnologies =
        cleanStringArray(
          technologies
        );

      /* -----------------------------------------------
         Clean topics
      ------------------------------------------------ */

      const safeTopics =
        cleanStringArray(topics);

      /* -----------------------------------------------
         Clean content
      ------------------------------------------------ */

      const safeContent =
        Array.isArray(content)
          ? content
          : [];

      /* -----------------------------------------------
         Prepare update
      ------------------------------------------------ */

      const updateData = {
        slug: normalizedSlug,

        title: title.trim(),

        category:
          typeof category === "string"
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
         * NEW:
         * Save Exploring / Topics
         */

        topics: safeTopics,

        overview:
          typeof overview ===
          "string"
            ? overview.trim()
            : "",

        content:
          safeContent,

        status:
          articleStatus,

        published_at:
          articleStatus ===
          "published"
            ? new Date().toISOString()
            : null,
      };

      console.log(
        "Updating article:",
        articleId
      );

      console.log(
        "Topics:",
        safeTopics
      );

      /* -----------------------------------------------
         Update
      ------------------------------------------------ */

      const {
        data,
        error,
      } = await supabase
        .from("articles")
        .update(updateData)
        .eq("id", articleId)
        .select()
        .single();

      if (error) {
        console.error(
          "PUT article error:",
          error
        );

        return res.status(500).json({
          error:
            "Failed to update article",
          details:
            error.message,
          code:
            error.code || null,
          hint:
            error.hint || null,
        });
      }

      /* -----------------------------------------------
         Return normalized article
      ------------------------------------------------ */

      const updatedArticle = {
        ...data,

        technologies:
          Array.isArray(
            data.technologies
          )
            ? data.technologies
            : [],

        topics:
          Array.isArray(data.topics)
            ? data.topics
            : [],

        content:
          Array.isArray(data.content)
            ? data.content
            : [],
      };

      return res.status(200).json({
        message:
          "Article updated successfully",

        article:
          updatedArticle,
      });
    }

    /* =====================================================
       DELETE ARTICLE
    ===================================================== */

    if (req.method === "DELETE") {
      /* -----------------------------------------------
         Find article first
      ------------------------------------------------ */

      const {
        data: existingArticle,
        error: findError,
      } = await supabase
        .from("articles")
        .select(
          "id, title, slug"
        )
        .eq("id", articleId)
        .single();

      if (findError) {
        if (
          findError.code ===
          "PGRST116"
        ) {
          return res.status(404).json({
            error:
              "Article not found",
          });
        }

        console.error(
          "Find article error:",
          findError
        );

        return res.status(500).json({
          error:
            "Failed to find article",
          details:
            findError.message,
        });
      }

      /* -----------------------------------------------
         Delete
      ------------------------------------------------ */

      const {
        error: deleteError,
      } = await supabase
        .from("articles")
        .delete()
        .eq("id", articleId);

      if (deleteError) {
        console.error(
          "DELETE article error:",
          deleteError
        );

        return res.status(500).json({
          error:
            "Failed to delete article",

          details:
            deleteError.message,

          code:
            deleteError.code || null,
        });
      }

      return res.status(200).json({
        message:
          "Article deleted successfully",

        article:
          existingArticle,
      });
    }

    /* =====================================================
       METHOD NOT ALLOWED
    ===================================================== */

    res.setHeader(
      "Allow",
      ["GET", "PUT", "DELETE"]
    );

    return res.status(405).json({
      error:
        "Method not allowed",
    });

  } catch (error) {
    console.error(
      "Single article API error:",
      error
    );

    return res.status(500).json({
      error:
        "Internal server error",

      details:
        error?.message ||
        String(error),
    });
  }
}