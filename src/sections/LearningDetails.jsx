import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import argoCd from "../data/learningDetails/argoCd";
import webRequestJourney from "../data/learningDetails/webRequestJourney";

import LearningSidebar from "../components/learning/LearningSidebar";
import LearningContent from "../components/learning/LearningContent";

/* =========================================================
   LOCAL ARTICLES
========================================================= */

const learningArticles = {
  "argo-cd-gitops": argoCd,

  "what-happens-when-you-open-a-website":
    webRequestJourney,
};

/* =========================================================
   MOBILE TABLE OF CONTENTS
========================================================= */

function MobileTableOfContents({
  sections,
  activeSection,
}) {
  const scrollToSection = (id) => {
    const element =
      document.getElementById(id);

    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <div className="mb-10 lg:hidden">
      <details className="group rounded-xl border border-slate-800 bg-slate-900/40">
        <summary className="flex cursor-pointer list-none items-center justify-between px-5 py-4">
          <span className="text-sm font-semibold text-white">
            On This Page
          </span>

          <span className="text-slate-500 transition group-open:rotate-180">
            ↓
          </span>
        </summary>

        <div className="border-t border-slate-800 px-5 py-4">
          <nav className="space-y-1">
            {sections
              .filter(
                (section) =>
                  section.type !== "group"
              )
              .map((section) => (
                <button
                  key={section.id}
                  onClick={() =>
                    scrollToSection(
                      section.id
                    )
                  }
                  className={`block w-full py-2 text-left text-sm transition ${
                    section.parent
                      ? "pl-4"
                      : ""
                  }`}
                  style={{
                    color:
                      activeSection ===
                      section.id
                        ? "var(--theme-primary)"
                        : undefined,
                  }}
                >
                  {section.title}
                </button>
              ))}
          </nav>
        </div>
      </details>
    </div>
  );
}

/* =========================================================
   DATABASE ARTICLE NORMALIZER
========================================================= */

function normalizeDatabaseArticle(
  databaseArticle
) {
  return {
    id: databaseArticle.slug,

    title:
      databaseArticle.title,

    category:
      databaseArticle.category ||
      "Cloud & DevOps",

    date: databaseArticle.published_at
      ? new Date(
          databaseArticle.published_at
        ).toLocaleDateString(
          "en-US",
          {
            month: "long",
            year: "numeric",
          }
        )
      : new Date(
          databaseArticle.created_at
        ).toLocaleDateString(
          "en-US",
          {
            month: "long",
            year: "numeric",
          }
        ),

    readTime:
      databaseArticle.read_time ||
      "5 min read",

    technologies:
      Array.isArray(
        databaseArticle.technologies
      )
        ? databaseArticle.technologies
        : [],

    description:
      databaseArticle.description ||
      "",

    sections:
      Array.isArray(
        databaseArticle.content
      )
        ? databaseArticle.content
        : [],
  };
}

/* =========================================================
   LOAD DATABASE ARTICLE
========================================================= */

async function fetchDatabaseArticle(
  slug
) {
  try {
    const response =
      await fetch(
        `/api/articles?slug=${encodeURIComponent(
          slug
        )}`
      );

    if (!response.ok) {
      return null;
    }

    const data =
      await response.json();

    const articles =
      Array.isArray(
        data.articles
      )
        ? data.articles
        : [];

    const databaseArticle =
      articles.find(
        (article) =>
          article.slug === slug &&
          article.status ===
            "published"
      );

    if (!databaseArticle) {
      return null;
    }

    return normalizeDatabaseArticle(
      databaseArticle
    );
  } catch (error) {
    console.error(
      "Failed to load database article:",
      error
    );

    return null;
  }
}

/* =========================================================
   MAIN COMPONENT
========================================================= */

export default function LearningDetails() {
  const [article, setArticle] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [activeSection, setActiveSection] =
    useState("");

  /* =======================================================
     LOAD ARTICLE
  ======================================================= */

  useEffect(() => {
    let mounted = true;

    const loadArticle =
      async () => {
        setLoading(true);

        const hash =
          window.location.hash;

        const id =
          hash.startsWith(
            "#learning/"
          )
            ? hash.replace(
                "#learning/",
                ""
              )
            : null;

        if (!id) {
          if (mounted) {
            setArticle(null);
            setLoading(false);
          }

          return;
        }

        /* ================================================
           1. LOCAL ARTICLE
        ================================================= */

        if (learningArticles[id]) {
          if (mounted) {
            setArticle(
              learningArticles[id]
            );

            setLoading(false);

            window.scrollTo({
              top: 0,
              behavior: "instant",
            });
          }

          return;
        }

        /* ================================================
           2. DATABASE ARTICLE
        ================================================= */

        const databaseArticle =
          await fetchDatabaseArticle(
            id
          );

        if (mounted) {
          setArticle(
            databaseArticle
          );

          setLoading(false);

          if (databaseArticle) {
            window.scrollTo({
              top: 0,
              behavior: "instant",
            });
          }
        }
      };

    loadArticle();

    window.addEventListener(
      "hashchange",
      loadArticle
    );

    return () => {
      mounted = false;

      window.removeEventListener(
        "hashchange",
        loadArticle
      );
    };
  }, []);

  /* =======================================================
     ACTIVE SECTION OBSERVER
  ======================================================= */

  useEffect(() => {
    if (!article) return;

    const sections =
      article.sections.filter(
        (section) =>
          section.type !== "group"
      );

    const observer =
      new IntersectionObserver(
        (entries) => {
          const visible =
            entries
              .filter(
                (entry) =>
                  entry.isIntersecting
              )
              .sort(
                (a, b) =>
                  a.boundingClientRect
                    .top -
                  b.boundingClientRect
                    .top
              );

          if (
            visible.length > 0
          ) {
            setActiveSection(
              visible[0].target.id
            );
          }
        },
        {
          rootMargin:
            "-120px 0px -65% 0px",
        }
      );

    sections.forEach(
      (section) => {
        const element =
          document.getElementById(
            section.id
          );

        if (element) {
          observer.observe(
            element
          );
        }
      }
    );

    return () =>
      observer.disconnect();
  }, [article]);

  /* =======================================================
     BACK
  ======================================================= */

  const goBack = () => {
    window.location.hash =
      "learning";
  };

  /* =======================================================
     LOADING
  ======================================================= */

  if (loading) {
    return (
      <section className="min-h-screen bg-[#020617] px-6 py-32">
        <div className="mx-auto max-w-4xl text-center">
          <div className="text-sm uppercase tracking-[0.3em] text-cyan-400">
            Loading article...
          </div>
        </div>
      </section>
    );
  }

  /* =======================================================
     NOT FOUND
  ======================================================= */

  if (!article) {
    return (
      <section className="min-h-screen bg-[#020617] px-6 py-32">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-4xl font-bold text-white">
            Learning article not found
          </h1>

          <p className="mt-4 text-slate-400">
            The technical article
            you are looking for does
            not exist.
          </p>

          <button
            onClick={goBack}
            className="
              mt-8
              rounded-lg
              px-5
              py-3
              font-semibold
              text-slate-950
              transition
              hover:scale-105
            "
            style={{
              backgroundColor:
                "var(--theme-primary)",
              boxShadow:
                "0 0 25px rgba(var(--theme-rgb), 0.20)",
            }}
          >
            ← Back to Learning
          </button>
        </div>
      </section>
    );
  }

  /* =======================================================
     ARTICLE PAGE
  ======================================================= */

  return (
    <section className="min-h-screen bg-[#020617] pt-28 pb-24">
      {/* Background */}

      <div className="pointer-events-none fixed inset-0 -z-0">
        <div className="absolute left-1/2 top-0 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-cyan-400/[0.04] blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6">

        {/* Back */}

        <motion.button
          onClick={goBack}
          initial={{
            opacity: 0,
            x: -10,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          className="mb-10 text-sm font-medium text-slate-500 transition hover:text-cyan-400"
        >
          ← Back to Learning
        </motion.button>

        {/* Article Header */}

        <motion.header
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.5,
          }}
          className="mb-12 max-w-4xl"
        >
          {/* Category */}

          <div className="flex items-center gap-3">
            <span className="inline-flex rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-1.5 text-sm font-medium text-cyan-400">
              {article.category}
            </span>

            <span className="text-sm text-slate-600">
              •
            </span>

            <span className="text-sm text-slate-500">
              {article.date}
            </span>
          </div>

          {/* Title */}

          <h1 className="mt-6 text-4xl font-bold tracking-tight text-white sm:text-6xl">
            {article.title}
          </h1>

          {/* Description */}

          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-400">
            {article.description}
          </p>

          {/* Metadata */}

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <span className="rounded-lg border border-slate-800 bg-slate-900/60 px-3 py-2 text-sm text-slate-400">
              ⏱ {article.readTime}
            </span>

            {article.technologies.map(
              (technology) => (
                <span
                  key={technology}
                  className="rounded-lg border border-slate-800 bg-slate-900/60 px-3 py-2 text-sm text-slate-400 transition hover:border-cyan-400/30 hover:text-cyan-400"
                >
                  {technology}
                </span>
              )
            )}
          </div>
        </motion.header>

        {/* Quick Overview */}

        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.5,
            delay: 0.1,
          }}
          className="mb-14 max-w-4xl rounded-2xl border border-cyan-400/10 bg-cyan-400/[0.04] p-6 sm:p-8"
        >
          <div className="flex gap-4">
            <div className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-cyan-400/10 text-cyan-400">
              ⚡
            </div>

            <div>
              <h2 className="text-lg font-semibold text-white">
                What this article covers
              </h2>

              <p className="mt-3 leading-7 text-slate-400">
                {article.description}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Mobile TOC */}

        <MobileTableOfContents
          sections={
            article.sections
          }
          activeSection={
            activeSection
          }
        />

        {/* Documentation Layout */}

        <div className="grid gap-12 lg:grid-cols-[240px_minmax(0,1fr)]">
          <LearningSidebar
            sections={
              article.sections
            }
            activeSection={
              activeSection
            }
          />

          <LearningContent
            sections={
              article.sections
            }
          />
        </div>
      </div>
    </section>
  );
}