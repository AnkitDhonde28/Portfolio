import { motion } from "framer-motion";
import portfolio from "../data/portfolio";
import SectionTitle from "../components/common/SectionTitle";
import ProjectCard from "../components/ui/ProjectCard";

export default function Projects() {
  const featuredProjects = portfolio.projects.filter(
    (project) => project.featured
  );

  const otherProjects = portfolio.projects.filter(
    (project) => !project.featured
  );

  return (
    <section
      id="projects"
      className="
        relative
        w-full
        overflow-hidden
        bg-[#020617]
        py-16
        sm:py-20
        lg:py-24
      "
    >
      {/* =====================================================
          BACKGROUND GLOW
      ===================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
        "
        style={{
          background:
            "radial-gradient(circle at center, rgba(var(--theme-rgb), 0.05), transparent 70%)",
        }}
      />

      {/* Additional subtle glow */}

      <div
        className="
          pointer-events-none
          absolute
          -left-40
          top-1/3
          h-80
          w-80
          rounded-full
          blur-[140px]
        "
        style={{
          backgroundColor:
            "rgba(var(--theme-rgb), 0.06)",
        }}
      />

      <div
        className="
          pointer-events-none
          absolute
          -right-40
          bottom-1/4
          h-80
          w-80
          rounded-full
          blur-[140px]
        "
        style={{
          backgroundColor:
            "rgba(var(--theme-rgb), 0.05)",
        }}
      />

      {/* =====================================================
          CONTENT
      ===================================================== */}

      <div
        className="
          relative
          z-10
          mx-auto
          w-full
          max-w-7xl
          px-4
          sm:px-6
          lg:px-8
        "
      >
        {/* ===================================================
            SECTION TITLE
        =================================================== */}

        <SectionTitle
          badge="Engineering Projects"
          title="Featured"
          highlight="Projects"
          subtitle="Production-ready cloud infrastructure, DevOps automation, AI applications, and full-stack solutions showcasing real-world engineering practices."
        />

        {/* ===================================================
            FEATURED PROJECTS
        =================================================== */}

        {featuredProjects.length > 0 && (
          <div
            className="
              mt-12
              grid
              grid-cols-1
              items-stretch
              gap-6
              sm:mt-14
              lg:grid-cols-2
              lg:gap-8
            "
          >
            {featuredProjects.map(
              (project, index) => (
                <motion.div
                  key={project.title}
                  initial={{
                    opacity: 0,
                    y: 40,
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
                    duration: 0.6,
                    delay: index * 0.12,
                  }}
                  className="flex min-w-0"
                >
                  <ProjectCard project={project} />
                </motion.div>
              )
            )}
          </div>
        )}

        {/* ===================================================
            OTHER PROJECTS
        =================================================== */}

        {otherProjects.length > 0 && (
          <div className="mt-20 sm:mt-24">

            {/* Heading */}

            <div className="mb-8 sm:mb-10">
              <div className="flex flex-wrap items-center gap-3">
                <h2 className="text-2xl font-bold text-white sm:text-3xl">
                  More Projects
                </h2>

                <span
                  className="
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
                      "rgba(var(--theme-rgb), 0.08)",
                    border:
                      "1px solid rgba(var(--theme-rgb), 0.20)",
                  }}
                >
                  {otherProjects.length}
                </span>
              </div>

              <p
                className="
                  mt-3
                  max-w-2xl
                  text-sm
                  leading-7
                  text-slate-400
                  sm:text-base
                "
              >
                Additional applications demonstrating
                frontend development, responsive UI design,
                cloud deployment, and automation.
              </p>
            </div>

            {/* Grid */}

            <div
              className="
                grid
                grid-cols-1
                items-stretch
                gap-6
                lg:grid-cols-2
                lg:gap-8
              "
            >
              {otherProjects.map(
                (project, index) => (
                  <motion.div
                    key={project.title}
                    initial={{
                      opacity: 0,
                      y: 40,
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
                      duration: 0.6,
                      delay: index * 0.12,
                    }}
                    className="flex min-w-0"
                  >
                    <ProjectCard
                      project={project}
                    />
                  </motion.div>
                )
              )}
            </div>
          </div>
        )}

        {/* ===================================================
            EMPTY STATE
        =================================================== */}

        {portfolio.projects.length === 0 && (
          <div className="mt-16 text-center">
            <p className="text-slate-500">
              Projects coming soon.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}