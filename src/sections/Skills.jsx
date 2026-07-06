import { motion } from "framer-motion";
import portfolio from "../data/portfolio";
import SectionTitle from "../components/common/SectionTitle";

export default function Skills() {
  return (
    <section
      id="skills"
      className="py-28 bg-slate-900"
    >
      <div className="max-w-7xl mx-auto px-6">

        <SectionTitle
          badge="Skills"
          title="Technical"
          highlight="Expertise"
          subtitle="Technologies and tools I use to build scalable cloud infrastructure and modern applications."
        />

        <div className="grid md:grid-cols-2 gap-8 mt-16">

          {portfolio.skills.map((skill, index) => (

            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: .5 }}
              className="bg-slate-800 border border-slate-700 rounded-3xl p-8 hover:border-cyan-500 transition"
            >

              <h3 className="text-2xl font-bold mb-6">

                {skill.icon} {skill.category}

              </h3>

              <div className="flex flex-wrap gap-3">

                {skill.technologies.map((tech) => (

                  <span
                    key={tech}
                    className="px-4 py-2 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 hover:bg-cyan-500 hover:text-white transition"
                  >

                    {tech}

                  </span>

                ))}

              </div>

            </motion.div>

          ))}

        </div>

      </div>
    </section>
  );
}