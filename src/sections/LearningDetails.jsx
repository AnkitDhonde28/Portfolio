import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import argoCd from "../data/learningDetails/argoCd";

import LearningSidebar from "../components/learning/LearningSidebar";
import LearningContent from "../components/learning/LearningContent";

const learningArticles = {
    "argo-cd-gitops": argoCd,
};

function MobileTableOfContents({
    sections,
    activeSection,
}) {
    const scrollToSection = (id) => {
        const element = document.getElementById(id);

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
                                (section) => section.type !== "group"
                            )
                            .map((section) => (
                                <button
                                    key={section.id}
                                    onClick={() =>
                                        scrollToSection(section.id)
                                    }
                                    className={`block w-full py-2 text-left text-sm ${activeSection === section.id
                                        ? "text-cyan-400"
                                        : "text-slate-500"
                                        } ${section.parent
                                            ? "pl-4"
                                            : ""
                                        }`}
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

export default function LearningDetails() {
    const [article, setArticle] = useState(null);
    const [activeSection, setActiveSection] = useState("");

    useEffect(() => {
        const loadArticle = () => {
            const hash = window.location.hash;

            const id = hash.startsWith("#learning/")
                ? hash.replace("#learning/", "")
                : null;

            if (id && learningArticles[id]) {
                setArticle(learningArticles[id]);

                window.scrollTo({
                    top: 0,
                    behavior: "instant",
                });
            } else {
                setArticle(null);
            }
        };

        loadArticle();

        window.addEventListener("hashchange", loadArticle);

        return () => {
            window.removeEventListener("hashchange", loadArticle);
        };
    }, []);

    useEffect(() => {
        if (!article) return;

        const sections = article.sections.filter(
            (section) => section.type !== "group"
        );

        const observer = new IntersectionObserver(
            (entries) => {
                const visible = entries
                    .filter((entry) => entry.isIntersecting)
                    .sort(
                        (a, b) =>
                            a.boundingClientRect.top -
                            b.boundingClientRect.top
                    );

                if (visible.length > 0) {
                    setActiveSection(visible[0].target.id);
                }
            },
            {
                rootMargin: "-120px 0px -65% 0px",
            }
        );

        sections.forEach((section) => {
            const element = document.getElementById(section.id);

            if (element) {
                observer.observe(element);
            }
        });

        return () => observer.disconnect();
    }, [article]);

    const goBack = () => {
        window.location.hash = "learning";
    };

    if (!article) {
        return (
            <section className="min-h-screen bg-[#020617] px-6 py-32">
                <div className="mx-auto max-w-4xl text-center">
                    <h1 className="text-4xl font-bold text-white">
                        Learning article not found
                    </h1>

                    <p className="mt-4 text-slate-400">
                        The technical article you are looking for does not exist.
                    </p>

                    <button
                        onClick={goBack}
                        className="mt-8 rounded-lg bg-cyan-400 px-5 py-3 font-semibold text-slate-950 transition hover:bg-cyan-300"
                    >
                        ← Back to Learning
                    </button>
                </div>
            </section>
        );
    }

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
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="mb-10 text-sm font-medium text-slate-500 transition hover:text-cyan-400"
                >
                    ← Back to Learning
                </motion.button>

                {/* Article Header */}
                <motion.header
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
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

                        {article.technologies.map((technology) => (
                            <span
                                key={technology}
                                className="rounded-lg border border-slate-800 bg-slate-900/60 px-3 py-2 text-sm text-slate-400 transition hover:border-cyan-400/30 hover:text-cyan-400"
                            >
                                {technology}
                            </span>
                        ))}
                    </div>
                </motion.header>

                {/* Documentation Layout */}
                {/* Quick Overview */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
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
                                This article breaks down how Argo CD works internally,
                                how GitOps is implemented with Kubernetes, how desired
                                and actual state are compared, and how applications are
                                synchronized with the cluster.
                            </p>
                        </div>
                    </div>
                </motion.div>
                {/* Mobile Table of Contents */}
                <MobileTableOfContents
                    sections={article.sections}
                    activeSection={activeSection}
                />

                {/* Documentation Layout */}
                <div className="grid gap-12 lg:grid-cols-[240px_minmax(0,1fr)]">
                    <LearningSidebar
                        sections={article.sections}
                        activeSection={activeSection}
                    />

                    <LearningContent sections={article.sections} />
                </div>
            </div>
        </section>
    );
}