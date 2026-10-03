import { useEffect, useMemo, useState } from "react";
import ImageUploader from "../components/ui/ImageUploader";

const emptyArticle = {
    title: "",
    slug: "",
    category: "Cloud & DevOps",
    description: "",
    readTime: "5 min read",
    technologies: [],
    topics: [],
    overview: "",
    status: "draft",
    content: [
        {
            id: "introduction",
            title: "Introduction",
            type: "article",
            content: [
                {
                    type: "paragraph",
                    text: "Start writing your article here.",
                },
            ],
        },
    ],
};

function createSlug(value = "") {
    return value
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
}

export default function AdminArticleEditor({
    session,
    articleId,
    onLogout,
}) {
    const isEditing = Boolean(articleId);

    const [article, setArticle] =
        useState(emptyArticle);

    const [jsonSource, setJsonSource] =
        useState(
            JSON.stringify(
                emptyArticle.content,
                null,
                2
            )
        );

    const [loading, setLoading] =
        useState(isEditing);

    const [saving, setSaving] =
        useState(false);

    const [message, setMessage] =
        useState("");

    const [error, setError] =
        useState("");

    const [jsonError, setJsonError] =
        useState("");

    /*
     * Which architecture image should receive
     * the uploaded image.
     */
    const [selectedImageId, setSelectedImageId] =
        useState("");

    /* =====================================================
       LOAD ARTICLE
    ===================================================== */

    useEffect(() => {
        if (!isEditing) {
            setLoading(false);
            return;
        }

        const loadArticle = async () => {
            try {
                setLoading(true);
                setError("");

                const response = await fetch(
                    `/api/articles/${articleId}`,
                    {
                        headers: {
                            Authorization:
                                `Bearer ${session.access_token}`,
                        },
                    }
                );

                const data =
                    await response.json();

                if (!response.ok) {
                    throw new Error(
                        data.error ||
                        "Failed to load article"
                    );
                }

                const loaded = {
                    ...emptyArticle,
                    ...data.article,

                    readTime:
                        data.article.read_time ||
                        "5 min read",

                    content:
                        Array.isArray(
                            data.article.content
                        )
                            ? data.article.content
                            : [],

                    technologies:
                        Array.isArray(
                            data.article.technologies
                        )
                            ? data.article.technologies
                            : [],

                    topics:
                        Array.isArray(
                            data.article.topics
                        )
                            ? data.article.topics
                            : [],
                };

                setArticle(loaded);

                setJsonSource(
                    JSON.stringify(
                        loaded.content,
                        null,
                        2
                    )
                );

                /*
                 * Automatically select the first
                 * architecture image if one exists.
                 */
                const firstImage =
                    findArchitectureBlocks(
                        loaded.content
                    )[0];

                if (firstImage) {
                    setSelectedImageId(
                        firstImage.id
                    );
                }
            } catch (err) {
                console.error(err);

                setError(
                    err.message ||
                    "Failed to load article"
                );
            } finally {
                setLoading(false);
            }
        };

        loadArticle();
    }, [
        articleId,
        isEditing,
        session,
    ]);

    /* =====================================================
       FIELD UPDATE
    ===================================================== */

    const updateField = (
        field,
        value
    ) => {
        setArticle((current) => ({
            ...current,
            [field]: value,
        }));

        setMessage("");
        setError("");
    };

    /* =====================================================
       TITLE → SLUG
    ===================================================== */

    const handleTitleChange = (value) => {
        setArticle((current) => ({
            ...current,
            title: value,

            ...(isEditing
                ? {}
                : {
                    slug: createSlug(value),
                }),
        }));
    };

    /* =====================================================
       TECHNOLOGIES
    ===================================================== */

    const technologiesText =
        article.technologies.join(", ");

    const handleTechnologiesChange = (
        value
    ) => {
        const technologies = value
            .split(",")
            .map((item) => item.trim())
            .filter(Boolean);

        updateField(
            "technologies",
            technologies
        );
    };

    {/* EXPLORING / TOPICS */ }

    <div>
        <label className="mb-2 block text-sm text-slate-400">
            Exploring / Topics
        </label>

        <input
            value={article.topics.join(", ")}
            onChange={(e) =>
                updateField(
                    "topics",
                    e.target.value
                        .split(",")
                        .map((item) => item.trim())
                        .filter(Boolean)
                )
            }
            placeholder="Rolling Deployment, Blue-Green Deployment, Kubernetes"
            className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 text-white outline-none focus:border-cyan-400"
        />

        <p className="mt-2 text-xs text-slate-600">
            Separate topics with commas.
        </p>
    </div>

    /* =====================================================
       JSON CONTENT CHANGE
    ===================================================== */

    const handleJsonChange = (
        value
    ) => {
        setJsonSource(value);
        setJsonError("");
        setMessage("");

        try {
            const parsed =
                JSON.parse(value);

            if (!Array.isArray(parsed)) {
                throw new Error(
                    "Content must be an array."
                );
            }

            setArticle((current) => ({
                ...current,
                content: parsed,
            }));

            /*
             * Keep image selector valid after
             * manually editing JSON.
             */
            const imageBlocks =
                findArchitectureBlocks(
                    parsed
                );

            if (
                imageBlocks.length > 0 &&
                !imageBlocks.some(
                    (image) =>
                        image.id ===
                        selectedImageId
                )
            ) {
                setSelectedImageId(
                    imageBlocks[0].id
                );
            }

            if (imageBlocks.length === 0) {
                setSelectedImageId("");
            }
        } catch (err) {
            setJsonError(
                err.message ||
                "Invalid JSON"
            );
        }
    };

    /* =====================================================
       IMAGE BLOCKS
    ===================================================== */

    const imageBlocks =
        useMemo(
            () =>
                findArchitectureBlocks(
                    article.content
                ),
            [article.content]
        );

    /* =====================================================
       IMAGE UPLOAD
    ===================================================== */
    const handleImageUpload = (uploadedImage) => {
        if (!selectedImageId) {
            setError(
                "Please select an image target first."
            );

            return;
        }

        const updatedContent = article.content.map(
            (section, sectionIndex) => {
                if (!Array.isArray(section.content)) {
                    return section;
                }

                return {
                    ...section,

                    content: section.content.map(
                        (block, blockIndex) => {
                            if (
                                block.type !==
                                "architecture"
                            ) {
                                return block;
                            }

                            /*
                             * Generate the same ID used
                             * by the Image Target dropdown.
                             */
                            const generatedId =
                                block.id ||
                                `architecture-${sectionIndex}-${blockIndex}`;

                            /*
                             * This is the important part.
                             *
                             * If the selected image matches
                             * this block, replace its image URL.
                             */
                            if (
                                generatedId ===
                                selectedImageId
                            ) {
                                return {
                                    ...block,

                                    id: generatedId,

                                    image:
                                        uploadedImage.image,

                                    alt:
                                        uploadedImage.name ||
                                        block.alt ||
                                        "Article image",
                                };
                            }

                            return block;
                        }
                    ),
                };
            }
        );

        /*
         * Update React article state
         */
        setArticle((current) => ({
            ...current,
            content: updatedContent,
        }));

        /*
         * Update the JSON editor immediately
         */
        const updatedJson =
            JSON.stringify(
                updatedContent,
                null,
                2
            );

        setJsonSource(updatedJson);

        setJsonError("");
        setError("");

        setMessage(
            "Image uploaded and JSON updated successfully."
        );
    };
    /* =====================================================
       SAVE
    ===================================================== */

    const saveArticle = async (
        status
    ) => {
        setMessage("");
        setError("");

        let parsedContent;

        try {
            parsedContent =
                JSON.parse(jsonSource);

            if (
                !Array.isArray(
                    parsedContent
                )
            ) {
                throw new Error(
                    "Article content must be an array."
                );
            }
        } catch (err) {
            setJsonError(
                err.message ||
                "Invalid article JSON."
            );

            return;
        }

        if (!article.title.trim()) {
            setError(
                "Article title is required."
            );

            return;
        }

        if (!article.slug.trim()) {
            setError(
                "Article slug is required."
            );

            return;
        }

        try {
            setSaving(true);

            const payload = {
                title:
                    article.title.trim(),

                slug:
                    createSlug(
                        article.slug
                    ),

                category:
                    article.category.trim() ||
                    "Cloud & DevOps",

                description:
                    article.description.trim(),

                readTime:
                    article.readTime.trim() ||
                    "5 min read",

                technologies:
                    article.technologies,

                topics:
                    article.topics,

                overview:
                    article.description.trim(),

                content:
                    parsedContent,

                status,
            };

            const url = isEditing
                ? `/api/articles/${articleId}`
                : "/api/articles";

            const method = isEditing
                ? "PUT"
                : "POST";

            const response =
                await fetch(
                    url,
                    {
                        method,

                        headers: {
                            "Content-Type":
                                "application/json",

                            Authorization:
                                `Bearer ${session.access_token}`,
                        },

                        body:
                            JSON.stringify(
                                payload
                            ),
                    }
                );

            const data =
                await response.json();

            if (!response.ok) {
                throw new Error(
                    data.error ||
                    "Failed to save article"
                );
            }

            const saved =
                data.article;

            const savedContent =
                Array.isArray(
                    saved.content
                )
                    ? saved.content
                    : parsedContent;

            setArticle((current) => ({
                ...current,

                ...saved,

                readTime:
                    saved.read_time ||
                    current.readTime,

                content:
                    savedContent,
            }));

            setJsonSource(
                JSON.stringify(
                    savedContent,
                    null,
                    2
                )
            );

            setMessage(
                status === "published"
                    ? "Article published successfully."
                    : "Article saved as draft."
            );

            /*
             * If this is a new article,
             * move to edit URL.
             */
            if (
                !isEditing &&
                saved.id
            ) {
                window.history.pushState(
                    {},
                    "",
                    `/admin/articles/${saved.id}`
                );

                window.dispatchEvent(
                    new PopStateEvent(
                        "popstate"
                    )
                );
            }
        } catch (err) {
            console.error(err);

            setError(
                err.message ||
                "Something went wrong."
            );
        } finally {
            setSaving(false);
        }
    };

    /* =====================================================
       BACK
    ===================================================== */

    const goBack = () => {
        window.history.pushState(
            {},
            "",
            "/admin/articles"
        );

        window.dispatchEvent(
            new PopStateEvent("popstate")
        );
    };

    /* =====================================================
       LIVE PREVIEW
    ===================================================== */

    const previewArticle =
        useMemo(
            () => ({
                ...article,

                date:
                    new Date().toLocaleDateString(
                        "en-US",
                        {
                            month: "long",
                            year: "numeric",
                        }
                    ),
            }),
            [article]
        );

    /* =====================================================
       LOADING
    ===================================================== */

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-slate-950 text-cyan-400">
                Loading article...
            </div>
        );
    }

    /* =====================================================
       PAGE
    ===================================================== */

    return (
        <div className="min-h-screen bg-slate-950 text-white">

            {/* HEADER */}

            <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/95 backdrop-blur">
                <div className="mx-auto flex max-w-[1600px] items-center justify-between px-6 py-4">

                    <div>
                        <button
                            onClick={goBack}
                            className="text-sm text-slate-400 transition hover:text-cyan-400"
                        >
                            ← Back to Articles
                        </button>

                        <h1 className="mt-1 text-xl font-bold">
                            {isEditing
                                ? "Edit Article"
                                : "New Article"}
                        </h1>
                    </div>

                    <button
                        onClick={onLogout}
                        className="rounded-lg border border-slate-700 px-4 py-2 text-sm text-slate-400 transition hover:border-red-400 hover:text-red-400"
                    >
                        Logout
                    </button>

                </div>
            </header>

            <main className="mx-auto max-w-[1600px] px-6 py-8">

                {/* STATUS */}

                {message && (
                    <div className="fixed inset-x-0 top-6 z-[100] flex justify-center px-4 pointer-events-none">
                        <div
                            className="
        rounded-xl
        border
        border-emerald-400/30
        bg-slate-950/95
        px-6
        py-3
        text-sm
        font-medium
        text-emerald-400
        shadow-2xl
        shadow-emerald-500/10
        backdrop-blur-xl
      "
                        >
                            ✓ {message}
                        </div>
                    </div>
                )}

                {error && (
                    <div className="mb-6 rounded-xl border border-red-500/20 bg-red-500/5 px-5 py-4 text-sm text-red-400">
                        {error}
                    </div>
                )}

                {/* ARTICLE CONFIGURATION */}

                <section className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6">

                    <div className="mb-6">
                        <p className="text-xs uppercase tracking-[0.25em] text-cyan-400">
                            Article Configuration
                        </p>

                        <h2 className="mt-2 text-xl font-semibold">
                            Article Details
                        </h2>
                    </div>

                    <div className="grid gap-5 md:grid-cols-2">

                        {/* TITLE */}

                        <div className="md:col-span-2">
                            <label className="mb-2 block text-sm text-slate-400">
                                Title
                            </label>

                            <input
                                value={
                                    article.title
                                }
                                onChange={(e) =>
                                    handleTitleChange(
                                        e.target.value
                                    )
                                }
                                placeholder="What Actually Happens When You Open a Website?"
                                className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 text-white outline-none focus:border-cyan-400"
                            />
                        </div>

                        {/* SLUG */}

                        <div>
                            <label className="mb-2 block text-sm text-slate-400">
                                Slug
                            </label>

                            <input
                                value={
                                    article.slug
                                }
                                onChange={(e) =>
                                    updateField(
                                        "slug",
                                        createSlug(
                                            e.target.value
                                        )
                                    )
                                }
                                placeholder="article-slug"
                                className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 text-white outline-none focus:border-cyan-400"
                            />
                        </div>

                        {/* CATEGORY */}

                        <div>
                            <label className="mb-2 block text-sm text-slate-400">
                                Category
                            </label>

                            <input
                                value={
                                    article.category
                                }
                                onChange={(e) =>
                                    updateField(
                                        "category",
                                        e.target.value
                                    )
                                }
                                placeholder="Cloud & DevOps"
                                className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 text-white outline-none focus:border-cyan-400"
                            />
                        </div>

                        {/* READ TIME */}

                        <div>
                            <label className="mb-2 block text-sm text-slate-400">
                                Read Time
                            </label>

                            <input
                                value={
                                    article.readTime
                                }
                                onChange={(e) =>
                                    updateField(
                                        "readTime",
                                        e.target.value
                                    )
                                }
                                placeholder="10 min read"
                                className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 text-white outline-none focus:border-cyan-400"
                            />
                        </div>

                        {/* TECHNOLOGIES */}

                        <div>
                            <label className="mb-2 block text-sm text-slate-400">
                                Technologies
                            </label>

                            <input
                                value={
                                    technologiesText
                                }
                                onChange={(e) =>
                                    handleTechnologiesChange(
                                        e.target.value
                                    )
                                }
                                placeholder="Kubernetes, Docker, AWS"
                                className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 text-white outline-none focus:border-cyan-400"
                            />

                            <p className="mt-2 text-xs text-slate-600">
                                Separate technologies with commas.
                            </p>
                        </div>

                        {/* EXPLORING / TOPICS */}

                        <div>
                            <label className="mb-2 block text-sm text-slate-400">
                                Exploring / Topics
                            </label>

                            <input
                                value={article.topics.join(", ")}
                                onChange={(e) =>
                                    updateField(
                                        "topics",
                                        e.target.value
                                            .split(",")
                                            .map((item) => item.trim())
                                            .filter(Boolean)
                                    )
                                }
                                placeholder="Rolling Deployment, Blue-Green Deployment, Kubernetes"
                                className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 text-white outline-none focus:border-cyan-400"
                            />

                            <p className="mt-2 text-xs text-slate-600">
                                Separate topics with commas.
                            </p>
                        </div>

                        {/* DESCRIPTION */}

                        <div className="md:col-span-2">
                            <label className="mb-2 block text-sm text-slate-400">
                                Description
                            </label>

                            <textarea
                                value={
                                    article.description
                                }
                                onChange={(e) =>
                                    updateField(
                                        "description",
                                        e.target.value
                                    )
                                }
                                rows={4}
                                placeholder="A short description shown in the article header and overview."
                                className="w-full resize-y rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 text-white outline-none focus:border-cyan-400"
                            />
                        </div>

                    </div>
                </section>

                {/* EDITOR + PREVIEW */}

                <div className="mt-8 grid gap-8 xl:grid-cols-2">

                    {/* SOURCE */}

                    <section className="min-w-0">

                        <div className="mb-4 flex items-center justify-between">

                            <div>
                                <p className="text-xs uppercase tracking-[0.25em] text-cyan-400">
                                    Source
                                </p>

                                <h2 className="mt-1 text-xl font-semibold">
                                    Article Content
                                </h2>
                            </div>

                            <span className="rounded-lg border border-slate-800 bg-slate-900 px-3 py-1 text-xs text-slate-500">
                                JSON
                            </span>

                        </div>

                        {/* JSON EDITOR */}

                        <div className="overflow-hidden rounded-2xl border border-slate-800 bg-[#020617]">

                            <textarea
                                value={
                                    jsonSource
                                }
                                onChange={(e) =>
                                    handleJsonChange(
                                        e.target.value
                                    )
                                }
                                spellCheck={false}
                                className="
                                    min-h-[750px]
                                    w-full
                                    resize-y
                                    bg-transparent
                                    p-5
                                    font-mono
                                    text-sm
                                    leading-6
                                    text-cyan-100
                                    outline-none
                                "
                            />

                        </div>

                        {/* IMAGE UPLOADER */}

                        <div className="mt-4 rounded-2xl border border-slate-800 bg-slate-900/50 p-4">

                            <div className="mb-4">

                                <p className="text-sm font-medium text-white">
                                    Article Image
                                </p>

                                <p className="mt-1 text-xs text-slate-500">
                                    Select which image block
                                    you want to replace.
                                </p>

                            </div>

                            {imageBlocks.length > 0 ? (
                                <div className="mb-4">

                                    <label className="mb-2 block text-sm text-slate-400">
                                        Image Target
                                    </label>

                                    <select
                                        value={
                                            selectedImageId
                                        }
                                        onChange={(e) =>
                                            setSelectedImageId(
                                                e.target.value
                                            )
                                        }
                                        className="
                                            w-full
                                            rounded-xl
                                            border
                                            border-slate-800
                                            bg-slate-950
                                            px-4
                                            py-3
                                            text-sm
                                            text-white
                                            outline-none
                                            focus:border-cyan-400
                                        "
                                    >

                                        {imageBlocks.map(
                                            (
                                                imageBlock
                                            ) => (
                                                <option
                                                    key={
                                                        imageBlock.id
                                                    }
                                                    value={
                                                        imageBlock.id
                                                    }
                                                >
                                                    {
                                                        imageBlock.label
                                                    }
                                                </option>
                                            )
                                        )}

                                    </select>

                                </div>
                            ) : (
                                <div className="mb-4 rounded-xl border border-yellow-500/20 bg-yellow-500/5 px-4 py-3 text-sm text-yellow-400">
                                    No architecture image
                                    blocks found in your
                                    JSON. Add a block with
                                    <code className="mx-1">
                                        type:
                                        "architecture"
                                    </code>
                                    first.
                                </div>
                            )}

                            <ImageUploader
                                slug={article.slug}
                                onUpload={
                                    handleImageUpload
                                }
                            />

                        </div>

                        {jsonError && (
                            <div className="mt-3 rounded-xl border border-red-500/20 bg-red-500/5 px-4 py-3 text-sm text-red-400">
                                JSON error:{" "}
                                {jsonError}
                            </div>
                        )}

                        {/* ACTIONS */}

                        <div className="mt-5 flex flex-wrap gap-3">

                            <button
                                disabled={saving}
                                onClick={() =>
                                    saveArticle(
                                        "draft"
                                    )
                                }
                                className="rounded-xl border border-slate-700 bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:border-cyan-400 disabled:opacity-50"
                            >
                                {saving
                                    ? "Saving..."
                                    : "Save Draft"}
                            </button>

                            <button
                                disabled={saving}
                                onClick={() =>
                                    saveArticle(
                                        "published"
                                    )
                                }
                                className="rounded-xl bg-cyan-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300 disabled:opacity-50"
                            >
                                {saving
                                    ? "Publishing..."
                                    : "Publish Article"}
                            </button>

                        </div>

                    </section>

                    {/* PREVIEW */}

                    <section className="min-w-0">

                        <div className="mb-4">
                            <p className="text-xs uppercase tracking-[0.25em] text-cyan-400">
                                Live Preview
                            </p>

                            <h2 className="mt-1 text-xl font-semibold">
                                Article Preview
                            </h2>
                        </div>

                        {/* PREVIEW SCROLL AREA */}
                        <div
                            className="
      max-h-[calc(100vh-180px)]
      overflow-y-auto
      rounded-2xl
      border
      border-slate-800
      bg-slate-950
      pr-1

      scrollbar-thin
      scrollbar-track-slate-950
      scrollbar-thumb-slate-700
      hover:scrollbar-thumb-cyan-400
    "
                        >
                            <ArticlePreview
                                article={previewArticle}
                            />
                        </div>

                    </section>

                </div>
            </main>
        </div>
    );
}

/* =========================================================
   FIND ARCHITECTURE IMAGE BLOCKS
========================================================= */

function findArchitectureBlocks(
    content
) {
    if (!Array.isArray(content)) {
        return [];
    }

    const blocks = [];

    content.forEach(
        (section, sectionIndex) => {
            if (
                !Array.isArray(
                    section.content
                )
            ) {
                return;
            }

            section.content.forEach(
                (block, blockIndex) => {
                    if (
                        block?.type ===
                        "architecture"
                    ) {
                        /*
                         * Older JSON may not have an ID
                         * on the image block.
                         *
                         * Give it a stable ID based on
                         * section + block position.
                         */
                        const blockId =
                            block.id ||
                            `architecture-${sectionIndex}-${blockIndex}`;

                        blocks.push({
                            id: blockId,

                            sectionIndex,

                            blockIndex,

                            label:
                                section.title
                                    ? `${section.title} — Image ${blockIndex + 1}`
                                    : `Image ${blockIndex + 1}`,

                            image:
                                block.image || "",
                        });
                    }
                }
            );
        }
    );

    return blocks;
}

/* =========================================================
   ARTICLE PREVIEW
========================================================= */

function ArticlePreview({
    article,
}) {
    return (
        <div className="overflow-hidden rounded-2xl border border-slate-800 bg-[#020617]">

            <div className="p-6 sm:p-8 lg:p-10">

                {/* HEADER */}

                <div className="border-b border-slate-800/70 pb-10">

                    <div className="flex flex-wrap items-center gap-3 text-sm">

                        <span className="text-cyan-400">
                            {article.category}
                        </span>

                        <span className="text-slate-700">
                            •
                        </span>

                        <span className="text-slate-500">
                            {article.date}
                        </span>

                    </div>

                    <h1 className="mt-5 text-3xl font-bold leading-tight text-white sm:text-4xl">
                        {article.title ||
                            "Your Article Title"}
                    </h1>

                    <p className="mt-5 leading-7 text-slate-400">
                        {article.description ||
                            "Your article description will appear here."}
                    </p>

                    <div className="mt-6 flex flex-wrap items-center gap-3 text-sm">

                        <span className="rounded-lg border border-slate-800 bg-slate-900/60 px-3 py-2 text-slate-400">
                            {article.readTime}
                        </span>

                        {article.technologies.map(
                            (technology) => (
                                <span
                                    key={
                                        technology
                                    }
                                    className="rounded-lg border border-slate-800 bg-slate-900/60 px-3 py-2 text-slate-400"
                                >
                                    {
                                        technology
                                    }
                                </span>
                            )
                        )}

                    </div>

                </div>

                {/* OVERVIEW */}

                <div className="my-10 rounded-2xl border border-cyan-400/10 bg-cyan-400/[0.04] p-6">

                    <div className="flex gap-4">

                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-cyan-400/10 text-cyan-400">
                            ⚡
                        </div>

                        <div>

                            <h2 className="text-lg font-semibold text-white">
                                What this article covers
                            </h2>

                            <p className="mt-3 leading-7 text-slate-400">
                                {article.description ||
                                    "Your article overview will appear here."}
                            </p>

                        </div>

                    </div>

                </div>

                {/* CONTENT */}

                <div className="space-y-10">

                    {article.content
                        ?.filter(
                            (section) =>
                                section.type !==
                                "group"
                        )
                        .map(
                            (section) => (
                                <PreviewSection
                                    key={
                                        section.id
                                    }
                                    section={
                                        section
                                    }
                                />
                            )
                        )}

                </div>

            </div>
        </div>
    );
}

/* =========================================================
   SECTION
========================================================= */

function PreviewSection({
    section,
}) {
    return (
        <section className="border-b border-slate-800/70 pb-10 last:border-b-0">

            <div className="mb-6">

                <h2
                    className={`font-semibold text-white ${section.parent
                        ? "text-2xl"
                        : "text-3xl"
                        }`}
                >
                    {section.title}
                </h2>

            </div>

            <div>

                {section.content?.map(
                    (block, index) => (
                        <PreviewBlock
                            key={index}
                            block={block}
                        />
                    )
                )}

            </div>

        </section>
    );
}

/* =========================================================
   CONTENT BLOCK
========================================================= */

function PreviewBlock({
    block,
}) {
    switch (block.type) {

        case "paragraph":
            return (
                <p className="mt-5 leading-8 text-slate-400">
                    {block.text}
                </p>
            );

        case "list":
            return (
                <ul className="mt-6 space-y-3">

                    {block.items?.map(
                        (item, index) => (
                            <li
                                key={index}
                                className="flex gap-3 text-slate-400"
                            >

                                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-400" />

                                <span>
                                    {item}
                                </span>

                            </li>
                        )
                    )}

                </ul>
            );

        case "code":
            return (
                <div className="mt-6 flex justify-center">

                    <div className="w-full max-w-3xl overflow-hidden rounded-xl border border-slate-800 bg-[#020617]">

                        {block.title && (
                            <div className="border-b border-slate-800 px-4 py-3 text-xs text-slate-500">
                                {block.title}
                            </div>
                        )}

                        <pre className="overflow-x-auto p-5 text-sm leading-6 text-cyan-100">
                            <code>
                                {block.code}
                            </code>
                        </pre>

                    </div>

                </div>
            );

        case "info":
            return (
                <div className="mt-6 rounded-xl border border-cyan-400/10 bg-cyan-400/[0.04] p-5">

                    <h3 className="font-semibold text-white">
                        {block.title}
                    </h3>

                    <p className="mt-2 leading-7 text-slate-400">
                        {block.text}
                    </p>

                </div>
            );

        case "architecture":
            return (
                <figure className="mt-6">

                    <div className="overflow-hidden rounded-xl border border-slate-800 bg-slate-900/30">

                        {block.image ? (
                            <img
                                src={
                                    block.image
                                }
                                alt={
                                    block.alt ||
                                    ""
                                }
                                className="w-full object-contain"
                            />
                        ) : (
                            <div className="flex min-h-[180px] items-center justify-center text-sm text-slate-600">
                                Image preview
                            </div>
                        )}

                    </div>

                    {block.caption && (
                        <figcaption className="mt-3 text-center text-sm text-slate-600">
                            {
                                block.caption
                            }
                        </figcaption>
                    )}

                </figure>
            );

        case "learningSummary":
            return (
                <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-900/40 p-6">

                    <h3 className="text-xl font-semibold text-white">
                        {block.title}
                    </h3>

                    <div className="mt-5 grid gap-3 sm:grid-cols-2">

                        {block.items?.map(
                            (
                                item,
                                index
                            ) => (
                                <div
                                    key={
                                        index
                                    }
                                    className="flex gap-3 rounded-lg border border-slate-800/80 bg-slate-950/40 px-4 py-3"
                                >

                                    <span className="text-cyan-400">
                                        ✓
                                    </span>

                                    <span className="text-sm text-slate-400">
                                        {item}
                                    </span>

                                </div>
                            )
                        )}

                    </div>

                </div>
            );

        default:
            return null;
    }
}