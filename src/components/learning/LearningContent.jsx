import { useState } from "react";
import { motion } from "framer-motion";

function Paragraph({ text }) {
    return (
        <p className="mt-5 text-[16px] leading-8 text-slate-400 sm:text-[17px]">
            {text}
        </p>
    );
}

function List({ items }) {
    return (
        <ul className="mt-6 space-y-3">
            {items.map((item, index) => (
                <li
                    key={index}
                    className="flex gap-3 text-[16px] leading-7 text-slate-400"
                >
                    <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-400" />

                    <span>{item}</span>
                </li>
            ))}
        </ul>
    );
}

function CodeBlock({ title, language, code }) {
    const [copied, setCopied] = useState(false);

    const copyCode = async () => {
        try {
            await navigator.clipboard.writeText(code);

            setCopied(true);

            setTimeout(() => {
                setCopied(false);
            }, 2000);
        } catch (error) {
            console.error("Failed to copy code:", error);
        }
    };

    return (
        <div className="mt-8 overflow-hidden rounded-xl border border-slate-800 bg-[#080d19]">
            {/* Code Header */}
            <div className="flex items-center justify-between border-b border-slate-800 bg-slate-900/70 px-4 py-3 sm:px-5">
                <div className="flex items-center gap-3">
                    {/* Mac dots */}
                    <div className="hidden gap-1.5 sm:flex">
                        <span className="h-2.5 w-2.5 rounded-full bg-slate-700" />
                        <span className="h-2.5 w-2.5 rounded-full bg-slate-700" />
                        <span className="h-2.5 w-2.5 rounded-full bg-slate-700" />
                    </div>

                    <span className="text-xs font-medium text-slate-400 sm:text-sm">
                        {title || "Code"}
                    </span>
                </div>

                <div className="flex items-center gap-3">
                    <span className="hidden text-xs uppercase tracking-wider text-slate-600 sm:block">
                        {language}
                    </span>

                    <button
                        onClick={copyCode}
                        className="rounded-md border border-slate-700 px-2.5 py-1 text-xs text-slate-400 transition hover:border-cyan-400/40 hover:text-cyan-400"
                    >
                        {copied ? "Copied ✓" : "Copy"}
                    </button>
                </div>
            </div>

            {/* Code */}
            <pre className="overflow-x-auto p-5 text-sm leading-7">
                <code className="text-slate-300">{code}</code>
            </pre>
        </div>
    );
}

function InfoBox({ variant, title, text }) {
    const config = {
        concept: {
            icon: "💡",
            border: "border-cyan-400/10",
            background: "bg-cyan-400/[0.05]",
        },

        tip: {
            icon: "✓",
            border: "border-emerald-400/10",
            background: "bg-emerald-400/[0.05]",
        },

        warning: {
            icon: "⚠",
            border: "border-amber-400/10",
            background: "bg-amber-400/[0.05]",
        },

        next: {
            icon: "→",
            border: "border-violet-400/10",
            background: "bg-violet-400/[0.05]",
        },
    };

    const style = config[variant] || config.concept;

    return (
        <div
            className={`mt-8 rounded-xl border ${style.border} ${style.background} p-5 sm:p-6`}
        >
            <div className="flex gap-4">
                <span className="text-lg">{style.icon}</span>

                <div>
                    <h4 className="font-semibold text-white">
                        {title}
                    </h4>

                    <p className="mt-2 leading-7 text-slate-400">
                        {text}
                    </p>
                </div>
            </div>
        </div>
    );
}

function ArchitectureImage({ image, alt, caption }) {
    return (
        <figure className="mt-10">
            <div className="overflow-hidden rounded-xl border border-slate-800 bg-[#080d19] p-2 sm:p-3">
                <img
                    src={image}
                    alt={alt}
                    loading="lazy"
                    className="mx-auto max-h-[700px] w-auto max-w-full rounded-lg object-contain"
                />
            </div>

            {caption && (
                <figcaption className="mx-auto mt-3 max-w-2xl text-center text-sm leading-6 text-slate-500">
                    {caption}
                </figcaption>
            )}
        </figure>
    );
}

function SectionHeading({ section }) {
    return (
        <div className="group">
            <div className="flex items-center gap-3">
                <h2
                    className={`font-bold tracking-tight text-white ${section.parent
                        ? "text-2xl sm:text-3xl"
                        : "text-3xl sm:text-4xl"
                        }`}
                >
                    {section.title}
                </h2>

                <a
                    href={`#${section.id}`}
                    className="text-sm text-slate-700 opacity-0 transition group-hover:opacity-100 hover:text-cyan-400"
                    aria-label={`Link to ${section.title}`}
                >
                    #
                </a>
            </div>
        </div>
    );
}

function LearningSummary({ title, items }) {
    return (
        <div className="mt-10 rounded-2xl border border-slate-800 bg-slate-900/40 p-6 sm:p-8">
            <h3 className="text-xl font-semibold text-white">
                {title}
            </h3>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {items.map((item, index) => (
                    <div
                        key={index}
                        className="flex items-center gap-3 rounded-lg border border-slate-800/80 bg-slate-950/40 px-4 py-3"
                    >
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-cyan-400/10 text-xs text-cyan-400">
                            ✓
                        </span>

                        <span className="text-sm text-slate-400">
                            {item}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}

function RenderContent({ content }) {
    return (
        <>
            {content?.map((block, index) => {
                switch (block.type) {
                    case "paragraph":
                        return <Paragraph key={index} text={block.text} />;

                    case "list":
                        return <List key={index} items={block.items} />;

                    case "code":
                        return (
                            <CodeBlock
                                key={index}
                                title={block.title}
                                language={block.language}
                                code={block.code}
                            />
                        );

                    case "info":
                        return (
                            <InfoBox
                                key={index}
                                variant={block.variant}
                                title={block.title}
                                text={block.text}
                            />
                        );

                    case "architecture":
                        return (
                            <ArchitectureImage
                                key={index}
                                image={block.image}
                                alt={block.alt}
                                caption={block.caption}
                            />
                        );

                    case "learningSummary":
                        return (
                            <LearningSummary
                                key={index}
                                title={block.title}
                                items={block.items}
                            />
                        );

                    default:
                        return null;
                }
            })}
        </>
    );
}

export default function LearningContent({ sections }) {
    return (
        <article className="min-w-0">
            {sections
                .filter((section) => section.type !== "group")
                .map((section, index) => (
                    <motion.section
                        key={section.id}
                        id={section.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{
                            once: true,
                            margin: "-80px",
                        }}
                        transition={{
                            duration: 0.45,
                            delay: index * 0.02,
                        }}
                        className="scroll-mt-28 border-b border-slate-800/70 pb-16 pt-4 last:border-b-0"
                    >
                        <SectionHeading section={section} />

                        <RenderContent content={section.content} />
                    </motion.section>
                ))}
        </article>
    );
}