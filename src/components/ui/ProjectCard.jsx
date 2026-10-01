import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";

export default function ProjectCard({ project }) {
  const visibleTechnologies =
    project.technologies?.slice(0, 4) || [];

  const remainingTechnologies = Math.max(
    (project.technologies?.length || 0) - 4,
    0
  );

  return (
    <article
      className="
        group
        flex
        h-full
        min-w-0
        flex-col
        overflow-hidden
        rounded-3xl
        border
        border-slate-800
        bg-slate-900
        transition-all
        duration-500
        hover:-translate-y-2
      "
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor =
          "var(--theme-primary)";

        e.currentTarget.style.boxShadow =
          "0 0 45px rgba(var(--theme-rgb), 0.14)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "";
        e.currentTarget.style.boxShadow = "";
      }}
    >
      {/* =====================================================
          BROWSER HEADER
      ===================================================== */}

      <div
        className="
          flex
          h-11
          shrink-0
          items-center
          gap-2
          border-b
          border-slate-700
          bg-slate-800/90
          px-4
        "
      >
        <span className="h-2.5 w-2.5 rounded-full bg-red-500" />
        <span className="h-2.5 w-2.5 rounded-full bg-yellow-500" />
        <span className="h-2.5 w-2.5 rounded-full bg-green-500" />

        <span className="ml-auto max-w-[55%] truncate text-[10px] text-slate-400 sm:text-xs">
          {project.title}
        </span>
      </div>

      {/* =====================================================
          PROJECT IMAGE
      ===================================================== */}

      <div className="relative h-[230px] shrink-0 overflow-hidden bg-slate-950 sm:h-[250px]">
        <img
          src={project.image}
          alt={project.title}
          className="
            h-full
            w-full
            object-cover
            object-top
            transition-transform
            duration-700
            group-hover:scale-105
          "
          onError={(e) => {
            e.currentTarget.style.display = "none";
          }}
        />

        {/* Image gradient */}

        <div
          className="
            pointer-events-none
            absolute
            inset-0
            bg-gradient-to-t
            from-slate-950/80
            via-transparent
            to-transparent
          "
        />

        {/* Desktop hover */}

        <div
          className="
            absolute
            inset-0
            hidden
            items-center
            justify-center
            bg-slate-950/55
            backdrop-blur-[2px]
            opacity-0
            transition-opacity
            duration-300
            sm:flex
            group-hover:opacity-100
          "
        >
          <a
            href={project.demo}
            target="_blank"
            rel="noreferrer"
            className="
              flex
              items-center
              gap-2
              rounded-xl
              px-5
              py-3
              text-sm
              font-semibold
              text-white
              transition-transform
              duration-300
              hover:scale-105
            "
            style={{
              backgroundColor:
                "var(--theme-primary)",
              boxShadow:
                "0 0 30px rgba(var(--theme-rgb), 0.35)",
            }}
          >
            <FaExternalLinkAlt />
            View Live
          </a>
        </div>
      </div>

      {/* =====================================================
          CONTENT
      ===================================================== */}

      <div
        className="
          flex
          min-w-0
          flex-1
          flex-col
          p-5
          sm:p-6
        "
      >
        {/* =================================================
            BADGES
        ================================================= */}

        <div className="flex flex-wrap gap-2">
          {project.featured && (
            <span
              className="
                inline-flex
                items-center
                rounded-full
                px-3
                py-1.5
                text-[10px]
                font-bold
                uppercase
                tracking-wider
              "
              style={{
                color: "var(--theme-primary)",
                backgroundColor:
                  "rgba(var(--theme-rgb), 0.10)",
                border:
                  "1px solid rgba(var(--theme-rgb), 0.25)",
              }}
            >
              ⭐ Featured
            </span>
          )}

          {project.category && (
            <span
              className="
                inline-flex
                items-center
                rounded-full
                px-3
                py-1.5
                text-[10px]
                font-semibold
                sm:text-xs
              "
              style={{
                color: "var(--theme-primary)",
                backgroundColor:
                  "rgba(var(--theme-rgb), 0.08)",
                border:
                  "1px solid rgba(var(--theme-rgb), 0.20)",
              }}
            >
              {project.category}
            </span>
          )}
        </div>

        {/* =================================================
            TITLE
        ================================================= */}

        <h2
          className="
            mt-4
            break-words
            text-2xl
            font-bold
            leading-tight
            text-white
            sm:text-3xl
          "
        >
          {project.title}
        </h2>

        {/* =================================================
            DESCRIPTION
        ================================================= */}

        <p
          className="
            mt-3
            line-clamp-3
            break-words
            text-sm
            leading-6
            text-slate-400
            sm:text-[15px]
            sm:leading-7
          "
        >
          {project.overview}
        </p>

        {/* =================================================
            METRICS / HIGHLIGHTS
        ================================================= */}

        {project.metrics?.length > 0 && (
          <div className="mt-5 flex flex-wrap gap-2">
            {project.metrics.slice(0, 3).map((item) => (
              <span
                key={item}
                className="
                  rounded-lg
                  border
                  border-slate-700
                  bg-slate-800/70
                  px-2.5
                  py-1.5
                  text-[11px]
                  leading-4
                  text-slate-300
                "
              >
                <span
                  className="mr-1"
                  style={{
                    color: "var(--theme-primary)",
                  }}
                >
                  ✓
                </span>
                {item}
              </span>
            ))}
          </div>
        )}

        {/* =================================================
            TECHNOLOGIES
        ================================================= */}

        {project.technologies?.length > 0 && (
          <div className="mt-5 flex flex-wrap gap-2">
            {visibleTechnologies.map((tech) => (
              <span
                key={tech}
                className="
                  rounded-lg
                  border
                  px-2.5
                  py-1.5
                  text-[11px]
                  font-medium
                  sm:text-xs
                "
                style={{
                  color: "var(--theme-primary)",
                  backgroundColor:
                    "rgba(var(--theme-rgb), 0.07)",
                  borderColor:
                    "rgba(var(--theme-rgb), 0.18)",
                }}
              >
                {tech}
              </span>
            ))}

            {remainingTechnologies > 0 && (
              <span
                className="
                  rounded-lg
                  border
                  border-slate-700
                  bg-slate-800
                  px-2.5
                  py-1.5
                  text-[11px]
                  text-slate-400
                  sm:text-xs
                "
              >
                +{remainingTechnologies}
              </span>
            )}
          </div>
        )}

        {/* =================================================
            ACTIONS
        ================================================= */}

        <div
          className="
            mt-auto
            flex
            flex-col
            gap-2.5
            pt-6
            sm:flex-row
          "
        >
          {/* GitHub */}

          <a
            href={project.github}
            target="_blank"
            rel="noreferrer"
            className="
              flex
              flex-1
              items-center
              justify-center
              gap-2
              rounded-xl
              border
              border-slate-700
              bg-slate-800
              px-4
              py-3
              text-sm
              font-medium
              text-white
              transition-all
              duration-300
              hover:-translate-y-0.5
            "
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor =
                "var(--theme-primary)";

              e.currentTarget.style.color =
                "var(--theme-primary)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "";
              e.currentTarget.style.color = "";
            }}
          >
            <FaGithub />
            GitHub
          </a>

          {/* Live Demo */}

          <a
            href={project.demo}
            target="_blank"
            rel="noreferrer"
            className="
              flex
              flex-1
              items-center
              justify-center
              gap-2
              rounded-xl
              px-4
              py-3
              text-sm
              font-semibold
              text-white
              transition-all
              duration-300
              hover:-translate-y-0.5
            "
            style={{
              background:
                "linear-gradient(to right, var(--theme-primary), #2563eb)",
              boxShadow:
                "0 0 22px rgba(var(--theme-rgb), 0.18)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow =
                "0 0 32px rgba(var(--theme-rgb), 0.35)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow =
                "0 0 22px rgba(var(--theme-rgb), 0.18)";
            }}
          >
            <FaExternalLinkAlt />
            Live Demo
          </a>
        </div>
      </div>
    </article>
  );
}