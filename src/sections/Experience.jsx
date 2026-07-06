import { motion } from "framer-motion";
import portfolio from "../data/portfolio";
import SectionTitle from "../components/common/SectionTitle";

export default function Experience() {
  return (
    <section id="experience" className="py-28 bg-[#020617]">
      <div className="max-w-7xl mx-auto px-6">

        <SectionTitle
          badge="Experience"
          title="Professional"
          highlight="Journey"
          subtitle="My experience building cloud infrastructure and automating deployments."
        />

        {portfolio.experience.map((job, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: .7 }}
            className="relative mt-16"
          >

            {/* Timeline */}

            <div className="absolute left-4 top-0 bottom-0 w-1 bg-cyan-500 rounded-full"></div>

            <div className="pl-16">

              {/* Circle */}

              <div className="absolute left-0 top-3 w-9 h-9 rounded-full bg-cyan-500 border-4 border-slate-950"></div>

              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8">

                <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center">

                  <div>

                    <h3 className="text-3xl font-bold">
                      {job.role}
                    </h3>

                    <p className="text-cyan-400 mt-2 text-lg">
                      {job.company}
                    </p>

                  </div>

                  <div className="mt-5 lg:mt-0 text-slate-400">

                    <p>{job.duration}</p>

                    <p>{job.location}</p>

                  </div>

                </div>

                {/* Achievements */}

                <ul className="mt-8 space-y-4">

                  {job.achievements.map((item, i) => (
                    <li
                      key={i}
                      className="flex gap-3 text-slate-300"
                    >
                      <span className="text-cyan-400">
                        ✔
                      </span>

                      {item}

                    </li>
                  ))}

                </ul>

                {/* Technologies */}

                <div className="flex flex-wrap gap-3 mt-10">

                  {job.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-4 py-2 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20"
                    >
                      {tech}
                    </span>
                  ))}

                </div>

              </div>

            </div>

          </motion.div>
        ))}

      </div>
    </section>
  );
}