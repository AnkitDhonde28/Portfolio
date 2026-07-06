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
      className="relative overflow-hidden bg-[#020617] py-20"
    >
      {/* Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,211,238,.05),transparent_70%)]" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <SectionTitle
          badge="Engineering Projects"
          title="Featured"
          highlight="Projects"
          subtitle="Production-ready cloud infrastructure, DevOps automation, AI applications, and full-stack solutions showcasing real-world engineering practices."
        />

        {/* Featured Projects */}
        <div className="mt-20 space-y-12">
          {featuredProjects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: index * 0.15,
              }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </div>

        {/* Other Projects */}
        {otherProjects.length > 0 && (
          <>
            <div className="mt-28 mb-10">
              <h2 className="text-3xl font-bold text-white">
                More Projects
              </h2>

              <p className="mt-3 max-w-2xl text-slate-400">
                Additional applications demonstrating frontend development,
                responsive UI design, cloud deployment, and automation.
              </p>
            </div>

            <div className="grid gap-10 lg:grid-cols-2">
              {otherProjects.map((project, index) => (
                <motion.div
                  key={project.title}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.15,
                  }}
                >
                  <ProjectCard project={project} />
                </motion.div>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}