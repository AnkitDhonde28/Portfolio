import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

import learning from "../data/learning";

/* =========================================================
   LOCAL ARTICLE DATE PARSER
========================================================= */

function parseLocalArticleDate(dateString) {
  if (!dateString) {
    return "1970-01-01";
  }

  /*
   * Examples:
   *
   * "October 2026"
   * "September 2026"
   * "August 2026"
   */

  const parsed = new Date(`${dateString} 1`);

  if (!Number.isNaN(parsed.getTime())) {
    return parsed.toISOString();
  }

  return "1970-01-01";
}

/* =========================================================
   COMPONENT
========================================================= */

export default function Learning() {
  const [articles, setArticles] = useState(learning);
  const [loadingArticles, setLoadingArticles] = useState(true);

  const sliderRef = useRef(null);

  /* =====================================================
     FETCH PUBLISHED DATABASE ARTICLES
  ===================================================== */

  useEffect(() => {
    const fetchPublishedArticles = async () => {
      try {
        setLoadingArticles(true);

        const response = await fetch("/api/articles");

        if (!response.ok) {
          throw new Error("Failed to fetch published articles");
        }

        const data = await response.json();

        /*
         * Convert published database articles
         * into the same structure used by local articles.
         */

        const publishedArticles = Array.isArray(data.articles)
          ? data.articles
              .filter(
                (article) => article.status === "published"
              )
              .map((article) => ({
                id: article.slug,

                title: article.title,

                category:
                  article.category || "Cloud & DevOps",

                status: "Published",

                /*
                 * Display the actual publication date.
                 */
                date: article.published_at
                  ? new Date(
                      article.published_at
                    ).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })
                  : article.created_at
                    ? new Date(
                        article.created_at
                      ).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })
                    : "",

                description:
                  article.description || "",

                /*
                 * Technologies from Supabase.
                 */
                technologies:
                  Array.isArray(article.technologies)
                    ? article.technologies
                    : [],

                /*
                 * Topics / Exploring from Supabase.
                 *
                 * This is the important fix.
                 */
                topics:
                  Array.isArray(article.topics)
                    ? article.topics
                    : [],

                /*
                 * Database articles currently do not
                 * have a LinkedIn URL field.
                 */
                linkedin: null,

                readTime:
                  article.read_time || "5 min read",

                source: "database",

                /*
                 * IMPORTANT:
                 *
                 * Sort published articles using
                 * published_at first.
                 *
                 * This prevents editing an old article
                 * from making it appear as the newest
                 * published article.
                 */
                sortDate:
                  article.published_at ||
                  article.created_at ||
                  article.updated_at ||
                  "1970-01-01",
              }))
          : [];

        /* =================================================
           LOCAL ARTICLES
        ================================================= */

        /*
         * Convert existing local articles into the same
         * structure and give them a sortable date.
         */

        const localArticles = learning.map((item) => ({
          ...item,

          source: "local",

          /*
           * Existing local data has dates such as:
           *
           * "September 2026"
           * "October 2026"
           * "August 2026"
           */

          sortDate: parseLocalArticleDate(item.date),
        }));

        /* =================================================
           REMOVE DUPLICATES
        ================================================= */

        /*
         * If a database article has the same ID/slug
         * as a local article, keep the local version.
         */

        const localIds = new Set(
          localArticles.map((article) => article.id)
        );

        const uniqueDatabaseArticles =
          publishedArticles.filter(
            (article) => !localIds.has(article.id)
          );

        /* =================================================
           COMBINE LOCAL + DATABASE ARTICLES
        ================================================= */

        const combinedArticles = [
          ...localArticles,
          ...uniqueDatabaseArticles,
        ];

        /* =================================================
           SORT NEWEST FIRST
        ================================================= */

        /*
         * Newest article will always appear first.
         */

        combinedArticles.sort((a, b) => {
          const dateA = new Date(
            a.sortDate || 0
          ).getTime();

          const dateB = new Date(
            b.sortDate || 0
          ).getTime();

          return dateB - dateA;
        });

        setArticles(combinedArticles);
      } catch (error) {
        console.error(
          "Failed to load published articles:",
          error
        );

        /*
         * If API fails, still show local articles.
         */

        const sortedLocalArticles = [...learning]
          .map((item) => ({
            ...item,

            source: "local",

            sortDate:
              parseLocalArticleDate(item.date),
          }))
          .sort((a, b) => {
            return (
              new Date(b.sortDate || 0).getTime() -
              new Date(a.sortDate || 0).getTime()
            );
          });

        setArticles(sortedLocalArticles);
      } finally {
        setLoadingArticles(false);
      }
    };

    fetchPublishedArticles();
  }, []);

  /* =====================================================
     SCROLL CAROUSEL
  ===================================================== */

  const scrollSlider = (direction) => {
    if (!sliderRef.current) return;

    const amount =
      sliderRef.current.clientWidth * 0.75;

    sliderRef.current.scrollBy({
      left:
        direction === "left"
          ? -amount
          : amount,

      behavior: "smooth",
    });
  };

  /* =====================================================
     RENDER
  ===================================================== */

  return (
    <section
      id="learning"
      className="
        relative
        overflow-hidden
        bg-[#020617]
        py-20
      "
    >
      {/* =================================================
          BACKGROUND GLOW
      ================================================= */}

      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at center, rgba(var(--theme-rgb), 0.05), transparent 70%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6">

        {/* =================================================
            HEADER
        ================================================= */}

        <div className="mx-auto max-w-3xl text-center">

          {/* Badge */}

          <span
            className="
              inline-flex
              rounded-full
              px-4
              py-1.5
              text-sm
              font-medium
            "
            style={{
              color:
                "var(--theme-primary)",

              backgroundColor:
                "rgba(var(--theme-rgb), 0.10)",

              border:
                "1px solid rgba(var(--theme-rgb), 0.20)",
            }}
          >
            Engineering Journal
          </span>

          {/* Heading */}

          <h2
            className="
              mt-5
              text-4xl
              font-bold
              tracking-tight
              text-white
              sm:text-5xl
            "
          >
            Learning{" "}
            <span
              style={{
                color:
                  "var(--theme-primary)",
              }}
            >
              & Building
            </span>
          </h2>

          <p
            className="
              mt-5
              text-base
              leading-7
              text-slate-400
              sm:text-lg
            "
          >
            Documenting what I&apos;m learning,
            experimenting with, and building across
            DevOps, Cloud, Kubernetes, Infrastructure
            as Code, and automation.
          </p>
        </div>

        {/* =================================================
            LOADING
        ================================================= */}

        {loadingArticles && (
          <div className="mt-12 text-center text-sm text-slate-600">
            Loading articles...
          </div>
        )}

        {/* =================================================
            ARTICLE CAROUSEL
        ================================================= */}

        <div className="relative mt-16">

          {/* LEFT ARROW */}

          <button
            type="button"
            onClick={() =>
              scrollSlider("left")
            }
            aria-label="Previous articles"
            className="
              absolute
              left-0
              top-1/2
              z-20
              hidden
              h-11
              w-11
              -translate-x-1/2
              -translate-y-1/2
              items-center
              justify-center
              rounded-full
              border
              border-slate-700
              bg-slate-950/95
              text-xl
              text-slate-300
              shadow-xl
              transition
              hover:border-[var(--theme-primary)]
              hover:text-[var(--theme-primary)]
              md:flex
            "
          >
            ←
          </button>

          {/* RIGHT ARROW */}

          <button
            type="button"
            onClick={() =>
              scrollSlider("right")
            }
            aria-label="Next articles"
            className="
              absolute
              right-0
              top-1/2
              z-20
              hidden
              h-11
              w-11
              translate-x-1/2
              -translate-y-1/2
              items-center
              justify-center
              rounded-full
              border
              border-slate-700
              bg-slate-950/95
              text-xl
              text-slate-300
              shadow-xl
              transition
              hover:border-[var(--theme-primary)]
              hover:text-[var(--theme-primary)]
              md:flex
            "
          >
            →
          </button>

          {/* =================================================
              SLIDER
          ================================================= */}

          <div
            ref={sliderRef}
            className="
              flex
              gap-6
              overflow-x-auto
              scroll-smooth
              snap-x
              snap-mandatory
              pb-6
              px-1
              scrollbar-none
              [-ms-overflow-style:none]
              [scrollbar-width:none]
              [&::-webkit-scrollbar]:hidden
            "
          >

            {articles.map(
              (item, index) => (
                <motion.article
                  key={item.id}
                  initial={{
                    opacity: 0,
                    y: 25,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                    amount: 0.15,
                  }}
                  transition={{
                    duration: 0.45,
                    delay:
                      Math.min(
                        index * 0.05,
                        0.3
                      ),
                  }}
                  className="
                    group
                    relative
                    min-w-[88%]
                    snap-start
                    overflow-hidden
                    rounded-2xl
                    border
                    border-slate-800
                    bg-slate-900/40
                    p-7
                    backdrop-blur-sm
                    transition-all
                    duration-300
                    hover:bg-slate-900/70
                    sm:min-w-[70%]
                    lg:min-w-[48%]
                  "
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor =
                      "rgba(var(--theme-rgb), 0.40)";

                    e.currentTarget.style.boxShadow =
                      "0 0 35px rgba(var(--theme-rgb), 0.08)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor =
                      "";

                    e.currentTarget.style.boxShadow =
                      "";
                  }}
                >

                  {/* =================================================
                      CARD GLOW
                  ================================================= */}

                  <div
                    className="
                      absolute
                      -right-20
                      -top-20
                      h-40
                      w-40
                      rounded-full
                      blur-3xl
                      transition-all
                      duration-500
                      group-hover:scale-125
                    "
                    style={{
                      backgroundColor:
                        "rgba(var(--theme-rgb), 0.10)",
                    }}
                  />

                  <div className="relative">

                    {/* =================================================
                        LATEST ARTICLE BADGE
                    ================================================= */}

                    {index === 0 &&
                      item.source ===
                        "database" && (
                        <div className="mb-5">
                          <span
                            className="
                              inline-flex
                              items-center
                              gap-2
                              rounded-full
                              px-3
                              py-1
                              text-xs
                              font-semibold
                            "
                            style={{
                              color:
                                "var(--theme-primary)",

                              backgroundColor:
                                "rgba(var(--theme-rgb), 0.10)",

                              border:
                                "1px solid rgba(var(--theme-rgb), 0.25)",
                            }}
                          >
                            <span
                              className="
                                h-1.5
                                w-1.5
                                animate-pulse
                                rounded-full
                              "
                              style={{
                                backgroundColor:
                                  "var(--theme-primary)",
                              }}
                            />

                            Latest Article
                          </span>
                        </div>
                      )}

                    {/* =================================================
                        HEADER
                    ================================================= */}

                    <div
                      className="
                        flex
                        items-start
                        justify-between
                        gap-4
                      "
                    >

                      <div>

                        <span
                          className="
                            text-sm
                            font-medium
                          "
                          style={{
                            color:
                              "var(--theme-primary)",
                          }}
                        >
                          {item.category}
                        </span>

                        <h3
                          className="
                            mt-2
                            text-2xl
                            font-bold
                            text-white
                          "
                        >
                          {item.title}
                        </h3>

                      </div>

                      {/* Status */}

                      <span
                        className="
                          shrink-0
                          rounded-full
                          px-3
                          py-1
                          text-xs
                          font-medium
                        "
                        style={{
                          color:
                            "var(--theme-primary)",

                          backgroundColor:
                            "rgba(var(--theme-rgb), 0.10)",

                          border:
                            "1px solid rgba(var(--theme-rgb), 0.20)",
                        }}
                      >
                        {item.status}
                      </span>

                    </div>

                    {/* =================================================
                        DATE
                    ================================================= */}

                    <p className="mt-3 text-sm text-slate-500">
                      {item.date}

                      {item.readTime && (
                        <>
                          {" "}
                          • {item.readTime}
                        </>
                      )}
                    </p>

                    {/* =================================================
                        DESCRIPTION
                    ================================================= */}

                    <p
                      className="
                        mt-6
                        min-h-[84px]
                        leading-7
                        text-slate-400
                      "
                    >
                      {item.description}
                    </p>

                    {/* =================================================
                        TECHNOLOGIES
                    ================================================= */}

                    {item.technologies?.length >
                      0 && (
                      <div
                        className="
                          mt-6
                          flex
                          flex-wrap
                          gap-2
                        "
                      >
                        {item.technologies.map(
                          (tech) => (
                            <span
                              key={tech}
                              className="
                                rounded-md
                                border
                                border-slate-700
                                bg-slate-800/70
                                px-3
                                py-1.5
                                text-xs
                                font-medium
                                text-slate-300
                                transition-all
                                duration-300
                              "
                            >
                              {tech}
                            </span>
                          )
                        )}
                      </div>
                    )}

                    {/* =================================================
                        EXPLORING / TOPICS
                    ================================================= */}

                    {item.topics?.length >
                      0 && (
                      <div className="mt-7">

                        <p
                          className="
                            mb-3
                            text-sm
                            font-semibold
                            text-slate-300
                          "
                        >
                          Exploring
                        </p>

                        <div
                          className="
                            grid
                            gap-2
                            sm:grid-cols-2
                          "
                        >
                          {item.topics.map(
                            (topic) => (
                              <div
                                key={topic}
                                className="
                                  flex
                                  items-center
                                  gap-2
                                  text-sm
                                  text-slate-400
                                "
                              >
                                <span
                                  className="
                                    h-1.5
                                    w-1.5
                                    rounded-full
                                  "
                                  style={{
                                    backgroundColor:
                                      "var(--theme-primary)",
                                  }}
                                />

                                {topic}
                              </div>
                            )
                          )}
                        </div>

                      </div>
                    )}

                    {/* =================================================
                        BOTTOM
                    ================================================= */}

                    <div
                      className="
                        mt-8
                        flex
                        items-center
                        justify-between
                        border-t
                        border-slate-800
                        pt-5
                      "
                    >

                      {/* LinkedIn */}

                      {item.linkedin ? (
                        <a
                          href={
                            item.linkedin
                          }
                          target="_blank"
                          rel="noopener noreferrer"
                          className="
                            text-sm
                            font-medium
                          "
                          style={{
                            color:
                              "var(--theme-primary)",
                          }}
                        >
                          LinkedIn Post ↗
                        </a>
                      ) : (
                        <span
                          className="
                            text-sm
                            text-slate-600
                          "
                        >
                          Technical Article
                        </span>
                      )}

                      {/* Details */}

                      <a
                        href={`#learning/${item.id}`}
                        className="
                          text-sm
                          font-medium
                          text-slate-300
                          transition-colors
                          hover:text-white
                        "
                      >
                        Technical Details →
                      </a>

                    </div>

                  </div>
                </motion.article>
              )
            )}

          </div>

          {/* =================================================
              MOBILE SWIPE HINT
          ================================================= */}

          <div className="mt-3 text-center md:hidden">
            <span className="text-xs text-slate-600">
              ← Swipe to explore more articles →
            </span>
          </div>

        </div>

        {/* =================================================
            BOTTOM MESSAGE
        ================================================= */}

        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.6,
          }}
          className="mt-12 text-center"
        >
          <p className="text-sm text-slate-500">
            Learning in public • Building in practice •
            Documenting the journey
          </p>
        </motion.div>

      </div>
    </section>
  );
}