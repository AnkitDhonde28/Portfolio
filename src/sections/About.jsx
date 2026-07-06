import { motion } from "framer-motion";
import portfolio from "../data/portfolio";
import SectionTitle from "../components/common/SectionTitle";

export default function About() {
  return (
    <section
      id="about"
      className="py-28 bg-slate-900"
    >
      <div className="max-w-7xl mx-auto px-6">

        <SectionTitle
          badge="About Me"
          title="Who"
          highlight="I Am"
          subtitle="Get to know more about my background, experience and passion for Cloud & DevOps."
        />

        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left */}

          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-cyan-500/20 blur-[120px]" />

              <img
                src="/profile.png"
                alt="Ankit Dhonde"
                className="
      relative
      w-full
      rounded-3xl
      mix-blend-screen
      drop-shadow-[0_0_60px_rgba(34,211,238,.4)]
    "
              />
            </div>
          </motion.div>

          {/* Right */}

          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >

            <h3 className="text-4xl font-bold">
              {portfolio.about.title}
            </h3>

            <p className="mt-6 text-slate-400 leading-8">
              {portfolio.about.description}
            </p>

            <div className="grid grid-cols-2 gap-4 mt-10">

              {portfolio.about.highlights.map((skill) => (
                <div
                  key={skill}
                  className="bg-slate-800 rounded-xl px-4 py-3 border border-slate-700 hover:border-cyan-500 transition"
                >
                  ✓ {skill}
                </div>
              ))}

            </div>

            <div className="grid md:grid-cols-2 gap-5 mt-10">

              {portfolio.about.cards.map((card) => (
                <div
                  key={card.title}
                  className="bg-slate-800 rounded-2xl p-5 border border-slate-700"
                >
                  <h4 className="text-cyan-400 font-semibold">
                    {card.title}
                  </h4>

                  <p className="mt-2 text-lg">
                    {card.value}
                  </p>
                </div>
              ))}

            </div>

          </motion.div>

        </div>

      </div>
    </section>
  );
}