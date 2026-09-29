import { motion } from "framer-motion";
import learning from "../data/learning";


export default function Learning() {
    return (
        <section
            id="learning"
            className="relative overflow-hidden bg-[#020617] py-20"
        >
            {/* Background Glow */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,211,238,.05),transparent_70%)]" />

            <div className="relative z-10 mx-auto max-w-7xl px-6">
                <div className="mx-auto max-w-3xl text-center">
                    <span className="inline-flex rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-1.5 text-sm font-medium text-cyan-400">
                        Engineering Journal
                    </span>

                    <h2 className="mt-5 text-4xl font-bold tracking-tight text-white sm:text-5xl">
                        Learning &{" "}
                        <span className="text-cyan-400">Building</span>
                    </h2>

                    <p className="mt-5 text-base leading-7 text-slate-400 sm:text-lg">
                        Documenting what I&apos;m learning, experimenting with, and building
                        across DevOps, Cloud, Kubernetes, Infrastructure as Code, and automation.
                    </p>
                </div>

                {/* Learning Cards */}
                <div className="mt-20 grid gap-8 md:grid-cols-2">
                    {learning.map((item, index) => (
                        <motion.article
                            key={item.id}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{
                                duration: 0.6,
                                delay: index * 0.1,
                            }}
                            className="group relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/40 p-7 backdrop-blur-sm transition-all duration-300 hover:border-cyan-400/40 hover:bg-slate-900/70"
                        >
                            {/* Card Glow */}
                            <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-cyan-400/10 blur-3xl transition-all duration-500 group-hover:bg-cyan-400/20" />

                            <div className="relative">
                                {/* Header */}
                                <div className="flex items-start justify-between gap-4">
                                    <div>
                                        <span className="text-sm font-medium text-cyan-400">
                                            {item.category}
                                        </span>

                                        <h3 className="mt-2 text-2xl font-bold text-white">
                                            {item.title}
                                        </h3>
                                    </div>

                                    <span className="shrink-0 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-xs font-medium text-cyan-300">
                                        {item.status}
                                    </span>
                                </div>

                                {/* Date */}
                                <p className="mt-3 text-sm text-slate-500">
                                    {item.date}
                                </p>

                                {/* Description */}
                                <p className="mt-6 leading-7 text-slate-400">
                                    {item.description}
                                </p>

                                {/* Technologies */}
                                <div className="mt-6 flex flex-wrap gap-2">
                                    {item.technologies.map((tech) => (
                                        <span
                                            key={tech}
                                            className="rounded-md border border-slate-700 bg-slate-800/70 px-3 py-1.5 text-xs font-medium text-slate-300"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>

                                {/* Topics */}
                                <div className="mt-7">
                                    <p className="mb-3 text-sm font-semibold text-slate-300">
                                        Exploring
                                    </p>

                                    <div className="grid gap-2 sm:grid-cols-2">
                                        {item.topics.map((topic) => (
                                            <div
                                                key={topic}
                                                className="flex items-center gap-2 text-sm text-slate-400"
                                            >
                                                <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
                                                {topic}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Bottom */}
                                <div className="mt-8 flex items-center justify-between border-t border-slate-800 pt-5">
                                    <a
                                        href={item.linkedin}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-sm font-medium text-cyan-400 transition-colors hover:text-cyan-300"
                                    >
                                        LinkedIn Post ↗
                                    </a>

                                    <a
                                        href={`#learning/${item.id}`}
                                        className="text-sm font-medium text-slate-300 transition-colors hover:text-white"
                                    >
                                        Technical Details →
                                    </a>
                                </div>
                            </div>
                        </motion.article>
                    ))}
                </div>

                {/* Bottom Message */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mt-16 text-center"
                >
                    <p className="text-sm text-slate-500">
                        Learning in public • Building in practice • Documenting the journey
                    </p>
                </motion.div>
            </div>
        </section>
    );
}