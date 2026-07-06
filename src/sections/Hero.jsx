import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaDownload,
} from "react-icons/fa";

import portfolio from "../data/portfolio";

import Terminal from "../components/ui/Terminal";


export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden bg-[#020617] pt-28 pb-20"

    >
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />
      {/* Background Glow */}
      <div className="absolute top-20 left-20 h-72 w-72 rounded-full bg-cyan-500/20 blur-[180px]" />

      <div className="absolute bottom-10 right-20 h-96 w-96 rounded-full bg-violet-500/20 blur-[220px]" />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.08),transparent_55%)]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
        <div className="grid
grid-cols-1
lg:grid-cols-[1.1fr_0.9fr]
gap-16
lg:gap-24 gap-24 items-center">

          {/* LEFT SECTION */}

          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Badge */}

            <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-semibold mb-6">
              🚀 {portfolio.badge}
            </span>

            {/* Heading */}

            <h4 className="text-xl text-slate-300">
              Hi, I'm
            </h4>

            <h1 className="text-5xl
sm:text-6xl
md:text-7xl
xl:text-8xl lg:text-7xl font-black leading-tight mt-3 tracking-tight">
              {portfolio.name}
            </h1>

            {/* Typing */}

            <div className="mt-6 text-3xl font-semibold text-cyan-400">
              <TypeAnimation
                sequence={[
                  ...portfolio.typing.flatMap((item) => [item, 2000]),
                ]}
                speed={45}
                repeat={Infinity}
              />
            </div>

            {/* Description */}

            <p className="mt-8 text-lg text-slate-400 leading-8 max-w-xl">
              {portfolio.description}
            </p>

            {/* Buttons */}

            <div className="flex flex-wrap gap-5 mt-10">

              <a
                href={portfolio.resume}
                className="
    group
    flex
    items-center
    gap-2
    rounded-xl
    bg-gradient-to-r
    from-cyan-500
    to-blue-600
    px-7
    py-3
    font-semibold
    text-white
    shadow-lg
    transition-all
    duration-300
    hover:-translate-y-1
    hover:scale-105
    hover:shadow-[0_0_40px_rgba(34,211,238,.45)]
  "
              >
                <FaDownload />

                Download Resume
              </a>

              <a
                href="#projects"
                className="border border-cyan-500 px-7 py-3 rounded-xl hover:bg-cyan-500 hover:text-white transition-all duration-300 hover:scale-105"
              >
                View Projects
              </a>

            </div>

            {/* Social */}

            <div className="flex gap-6 mt-10 text-2xl">

              <a
                href={portfolio.github}
                target="_blank"
                rel="noreferrer"
                className="hover:text-cyan-400 transition"
              >
                <FaGithub />
              </a>

              <a
                href={portfolio.linkedin}
                target="_blank"
                rel="noreferrer"
                className="hover:text-cyan-400 transition"
              >
                <FaLinkedin />
              </a>

              <a
                href={`mailto:${portfolio.email}`}
                className="hover:text-cyan-400 transition"
              >
                <FaEnvelope />
              </a>

            </div>

            {/* Stats */}

            <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mt-12">

              {portfolio.stats.map((item) => (
                <div
                  key={item.title}
                  className="bg-slate-900/80 backdrop-blur-md border border-slate-800 rounded-2xl p-5 hover:border-cyan-400 hover:-translate-y-2 hover:shadow-[0_0_35px_rgba(34,211,238,.2)] transition-all duration-300"
                >
                  <h2 className="text-3xl font-bold text-cyan-400">

                    {typeof item.value === "number" ? (
                      <>
                        {item.value}
                        {item.suffix}
                      </>
                    ) : (
                      item.value
                    )}

                  </h2>
                  <p className="text-slate-400 mt-2 text-sm">
                    {item.title}
                  </p>
                </div>
              ))}

            </div>

          </motion.div>

          {/* RIGHT SECTION */}

          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex justify-end"
          >
            <div className="flex flex-col items-center gap-10">

              <div className="relative">
                {/* Glow */}

                <div className="absolute inset-0 rounded-full bg-cyan-500/40 blur-[160px] animate-pulse"></div>

                {/* Floating Badges */}

                {/* Floating Tech Logos */}

                <div className="absolute -top-6 -left-8 flex items-center gap-2 rounded-xl border border-cyan-500/30 bg-slate-900/80 px-4 py-2 backdrop-blur-md shadow-lg">
                  <img src="/logos/aws.svg" alt="AWS" className="h-6 w-6" />
                  <span className="text-sm font-medium text-white">AWS</span>
                </div>

                <div className="absolute top-10 -right-12 flex items-center gap-2 rounded-xl border border-cyan-500/30 bg-slate-900/80 px-4 py-2 backdrop-blur-md shadow-lg">
                  <img src="/logos/docker.svg" alt="Docker" className="h-6 w-6" />
                  <span className="text-sm font-medium text-white">Docker</span>
                </div>

                <div className="absolute bottom-12 -left-12 flex items-center gap-2 rounded-xl border border-cyan-500/30 bg-slate-900/80 px-4 py-2 backdrop-blur-md shadow-lg">
                  <img src="/logos/kubernetes.svg" alt="Kubernetes" className="h-6 w-6" />
                  <span className="text-sm font-medium text-white">Kubernetes</span>
                </div>

                <div className="absolute bottom-0 -right-10 flex items-center gap-2 rounded-xl border border-cyan-500/30 bg-slate-900/80 px-4 py-2 backdrop-blur-md shadow-lg">
                  <img src="/logos/terraform.svg" alt="Terraform" className="h-6 w-6" />
                  <span className="text-sm font-medium text-white">Terraform</span>
                </div>



                {/* Profile */}

                <div className="relative">

                  <div className="absolute inset-0 rounded-full bg-cyan-400/30 blur-[180px] animate-pulse"></div>

                  <img
                    src="/profile.jpg"
                    alt="Ankit Dhonde"
                    className="relative w-[260px]
h-[260px]
sm:w-[320px]
sm:h-[320px]
lg:w-[400px]
lg:h-[400px] rounded-full object-cover border-[6px] border-white/10 shadow-2xl"
                  />
                </div>
              </div>


              <div className="w-full max-w-md">
                <Terminal />
              </div>


            </div>
          </motion.div>

        </div>
      </div>

    </section>
  );
}