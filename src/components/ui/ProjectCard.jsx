import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";

export default function ProjectCard({ project }) {
  return (
    <div
      className="
        group
        overflow-hidden
        rounded-3xl
        border
        border-slate-800
        bg-slate-900
        transition-all
        duration-500
        hover:-translate-y-3
        hover:border-cyan-400
        hover:shadow-[0_0_60px_rgba(34,211,238,.18)]
      "
    >
      {/* Browser Header */}
      <div className="flex items-center gap-2 border-b border-slate-700 bg-slate-800 px-5 py-3">
        <div className="h-3 w-3 rounded-full bg-red-500" />
        <div className="h-3 w-3 rounded-full bg-yellow-500" />
        <div className="h-3 w-3 rounded-full bg-green-500" />

        <div className="ml-auto text-xs text-slate-400">
          {project.title}
        </div>
      </div>

      {/* Project Image */}
      <div className="relative overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="h-80 w-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-1"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent opacity-70" />

        {/* Hover Overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 transition duration-500 group-hover:opacity-100">
          <a
            href={project.demo}
            target="_blank"
            rel="noreferrer"
            className="rounded-xl bg-cyan-500 px-6 py-3 font-semibold text-slate-950 shadow-xl transition hover:scale-105"
          >
            Live Preview
          </a>
        </div>
      </div>

      {/* Content */}
      <div className="p-8">
        {/* Featured */}
        <div className="mb-5 flex flex-wrap items-center gap-3">
          {project.featured && (
            <span className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-2 text-xs font-bold uppercase tracking-widest text-cyan-300">
              ⭐ Featured
            </span>
          )}

          {project.category && (
            <span className="rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-2 text-xs font-semibold text-violet-300">
              {project.category}
            </span>
          )}
        </div>

        {/* Title */}
        <h2 className="text-3xl font-bold text-white">
          {project.title}
        </h2>

        {/* Overview */}
        <p className="mt-5 leading-8 text-slate-400">
          {project.overview}
        </p>

        {/* Problem / Solution / Result */}
        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {/* Problem */}
          <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-5 transition duration-300 hover:-translate-y-2 hover:border-red-400">
            <h3 className="mb-3 text-lg font-semibold text-red-400">
              🚩 Problem
            </h3>

            <p className="text-sm leading-7 text-slate-400">
              {project.problem}
            </p>
          </div>

          {/* Solution */}
          <div className="rounded-2xl border border-cyan-500/20 bg-cyan-500/5 p-5 transition duration-300 hover:-translate-y-2 hover:border-cyan-400">
            <h3 className="mb-3 text-lg font-semibold text-cyan-400">
              💡 Solution
            </h3>

            <p className="text-sm leading-7 text-slate-400">
              {project.solution}
            </p>
          </div>

          {/* Result */}
          <div className="rounded-2xl border border-green-500/20 bg-green-500/5 p-5 transition duration-300 hover:-translate-y-2 hover:border-green-400">
            <h3 className="mb-3 text-lg font-semibold text-green-400">
              📈 Result
            </h3>

            <p className="text-sm leading-7 text-slate-400">
              {project.result}
            </p>
          </div>
        </div>

        {/* Highlights */}
        <div className="mt-10">
          <h3 className="mb-4 text-lg font-semibold text-white">
            Highlights
          </h3>

          <div className="flex flex-wrap gap-3">
            {project.metrics?.map((item) => (
              <span
                key={item}
                className="rounded-full border border-green-500/20 bg-green-500/10 px-4 py-2 text-sm text-green-400"
              >
                ✔ {item}
              </span>
            ))}
          </div>
        </div>

        {/* Architecture */}
        <div className="mt-10">
          <h3 className="mb-4 text-lg font-semibold text-white">
            Architecture
          </h3>

          <div className="flex flex-wrap items-center gap-3">
            {project.architecture?.map((item, index) => (
              <div key={item} className="flex items-center gap-3">
                <span className="rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-2 text-sm text-cyan-400">
                  {item}
                </span>

                {index !== project.architecture.length - 1 && (
                  <span className="text-cyan-400">→</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Technologies */}
        <div className="mt-10">
          <h3 className="mb-4 text-lg font-semibold text-white">
            Technologies
          </h3>

          <div className="flex flex-wrap gap-3">
            {project.technologies?.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-2 text-sm text-violet-300 transition duration-300 hover:border-violet-400"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-12 flex flex-wrap gap-4">
          <a
            href={project.github}
            target="_blank"
            rel="noreferrer"
            className="
              flex
              items-center
              gap-2
              rounded-xl
              border
              border-white/10
              bg-slate-800
              px-6
              py-3
              transition-all
              duration-300
              hover:-translate-y-1
              hover:border-cyan-400
              hover:bg-slate-700
            "
          >
            <FaGithub />
            GitHub Repository
          </a>

          <a
            href={project.demo}
            target="_blank"
            rel="noreferrer"
            className="
              flex
              items-center
              gap-2
              rounded-xl
              bg-gradient-to-r
              from-cyan-500
              to-blue-600
              px-6
              py-3
              font-semibold
              text-white
              transition-all
              duration-300
              hover:-translate-y-1
              hover:shadow-[0_0_35px_rgba(34,211,238,.35)]
            "
          >
            <FaExternalLinkAlt />
            Live Preview
          </a>
        </div>
      </div>
    </div>
  );
}