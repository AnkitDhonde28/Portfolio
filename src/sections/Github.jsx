import {
  FaGithub,
  FaDocker,
  FaAws,
} from "react-icons/fa";

import {
  SiTerraform,
  SiKubernetes,
  SiGithubactions,
} from "react-icons/si";

export default function Github() {
  return (
    <section
      id="github"
      className="relative overflow-hidden bg-[#020617] py-32"
    >
      {/* Background Glow */}

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,211,238,.05),transparent_70%)]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">

        {/* Heading */}

        <div className="text-center">

          <span className="rounded-full border border-cyan-500/20 bg-cyan-500/10 px-5 py-2 text-xs font-bold uppercase tracking-[0.25em] text-cyan-400">
            OPEN SOURCE
          </span>

          <h2 className="mt-6 text-5xl font-black">
            GitHub
            <span className="text-cyan-400">
              {" "}Profile
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-3xl leading-8 text-slate-400">
            Passionate about building cloud-native infrastructure,
            DevOps automation and scalable backend applications.
          </p>

        </div>

        {/* Cards */}

        <div className="mt-20 grid gap-8 lg:grid-cols-2">

          {/* Left */}

          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8">

            <h3 className="text-2xl font-bold">
              Open Source Journey
            </h3>

            <p className="mt-4 leading-8 text-slate-400">
              My GitHub contains projects focused on Cloud,
              Kubernetes, Docker, Terraform, AWS,
              automation and full-stack development.
            </p>

            <div className="mt-8 grid grid-cols-2 gap-5">

              <div className="rounded-2xl bg-slate-800 p-5">
                <h4 className="text-3xl font-bold text-cyan-400">
                  10+
                </h4>

                <p className="mt-2 text-slate-400">
                  Public Projects
                </p>
              </div>

              <div className="rounded-2xl bg-slate-800 p-5">
                <h4 className="text-3xl font-bold text-cyan-400">
                  AWS
                </h4>

                <p className="mt-2 text-slate-400">
                  Cloud Labs
                </p>
              </div>

              <div className="rounded-2xl bg-slate-800 p-5">
                <h4 className="text-3xl font-bold text-cyan-400">
                  Docker
                </h4>

                <p className="mt-2 text-slate-400">
                  Containers
                </p>
              </div>

              <div className="rounded-2xl bg-slate-800 p-5">
                <h4 className="text-3xl font-bold text-cyan-400">
                  IaC
                </h4>

                <p className="mt-2 text-slate-400">
                  Terraform
                </p>
              </div>

            </div>

          </div>

          {/* Right */}

          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8">

            <h3 className="text-2xl font-bold">
              Technologies
            </h3>

            <div className="mt-8 flex flex-wrap gap-4">

              <div className="flex items-center gap-3 rounded-xl bg-slate-800 px-5 py-3">
                <FaAws className="text-2xl text-orange-400" />
                AWS
              </div>

              <div className="flex items-center gap-3 rounded-xl bg-slate-800 px-5 py-3">
                <FaDocker className="text-2xl text-cyan-400" />
                Docker
              </div>

              <div className="flex items-center gap-3 rounded-xl bg-slate-800 px-5 py-3">
                <SiKubernetes className="text-2xl text-blue-400" />
                Kubernetes
              </div>

              <div className="flex items-center gap-3 rounded-xl bg-slate-800 px-5 py-3">
                <SiTerraform className="text-2xl text-violet-400" />
                Terraform
              </div>

              <div className="flex items-center gap-3 rounded-xl bg-slate-800 px-5 py-3">
                <SiGithubactions className="text-2xl text-cyan-400" />
                GitHub Actions
              </div>

            </div>

            <a
              href="https://github.com/AnkitDhonde28"
              target="_blank"
              rel="noreferrer"
              className="mt-10 inline-flex items-center gap-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-7 py-4 font-semibold transition hover:scale-105"
            >
              <FaGithub />

              Visit GitHub
            </a>

          </div>

        </div>

      </div>
    </section>
  );
}