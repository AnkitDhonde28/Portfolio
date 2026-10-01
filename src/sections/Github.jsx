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

      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at center, rgba(var(--theme-rgb), 0.05), transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">

        {/* Heading */}

        <div className="text-center">

          <span
            className="
              rounded-full
              px-5
              py-2
              text-xs
              font-bold
              uppercase
              tracking-[0.25em]
            "
            style={{
              color: "var(--theme-primary)",
              backgroundColor:
                "rgba(var(--theme-rgb), 0.10)",
              border:
                "1px solid rgba(var(--theme-rgb), 0.20)",
            }}
          >
            OPEN SOURCE
          </span>

          <h2 className="mt-6 text-5xl font-black">
            GitHub
            <span
              style={{
                color: "var(--theme-primary)",
              }}
            >
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

          <div
            className="
              rounded-3xl
              border
              border-slate-800
              bg-slate-900
              p-8
              transition-all
              duration-300
            "
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor =
                "rgba(var(--theme-rgb), 0.40)";

              e.currentTarget.style.boxShadow =
                "0 0 35px rgba(var(--theme-rgb), 0.10)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "";

              e.currentTarget.style.boxShadow = "";
            }}
          >

            <h3 className="text-2xl font-bold">
              Open Source Journey
            </h3>

            <p className="mt-4 leading-8 text-slate-400">
              My GitHub contains projects focused on Cloud,
              Kubernetes, Docker, Terraform, AWS,
              automation and full-stack development.
            </p>

            <div className="mt-8 grid grid-cols-2 gap-5">

              {/* Public Projects */}

              <div className="rounded-2xl bg-slate-800 p-5">
                <h4
                  className="text-3xl font-bold"
                  style={{
                    color: "var(--theme-primary)",
                  }}
                >
                  10+
                </h4>

                <p className="mt-2 text-slate-400">
                  Public Projects
                </p>
              </div>

              {/* AWS */}

              <div className="rounded-2xl bg-slate-800 p-5">
                <h4
                  className="text-3xl font-bold"
                  style={{
                    color: "var(--theme-primary)",
                  }}
                >
                  AWS
                </h4>

                <p className="mt-2 text-slate-400">
                  Cloud Labs
                </p>
              </div>

              {/* Docker */}

              <div className="rounded-2xl bg-slate-800 p-5">
                <h4
                  className="text-3xl font-bold"
                  style={{
                    color: "var(--theme-primary)",
                  }}
                >
                  Docker
                </h4>

                <p className="mt-2 text-slate-400">
                  Containers
                </p>
              </div>

              {/* Terraform */}

              <div className="rounded-2xl bg-slate-800 p-5">
                <h4
                  className="text-3xl font-bold"
                  style={{
                    color: "var(--theme-primary)",
                  }}
                >
                  IaC
                </h4>

                <p className="mt-2 text-slate-400">
                  Terraform
                </p>
              </div>

            </div>

          </div>

          {/* Right */}

          <div
            className="
              rounded-3xl
              border
              border-slate-800
              bg-slate-900
              p-8
              transition-all
              duration-300
            "
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor =
                "rgba(var(--theme-rgb), 0.40)";

              e.currentTarget.style.boxShadow =
                "0 0 35px rgba(var(--theme-rgb), 0.10)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "";

              e.currentTarget.style.boxShadow = "";
            }}
          >

            <h3 className="text-2xl font-bold">
              Technologies
            </h3>

            <div className="mt-8 flex flex-wrap gap-4">

              {/* AWS */}

              <div className="flex items-center gap-3 rounded-xl bg-slate-800 px-5 py-3">
                <FaAws className="text-2xl text-orange-400" />
                AWS
              </div>

              {/* Docker */}

              <div className="flex items-center gap-3 rounded-xl bg-slate-800 px-5 py-3">
                <FaDocker
                  className="text-2xl"
                  style={{
                    color: "var(--theme-primary)",
                  }}
                />
                Docker
              </div>

              {/* Kubernetes */}

              <div className="flex items-center gap-3 rounded-xl bg-slate-800 px-5 py-3">
                <SiKubernetes className="text-2xl text-blue-400" />
                Kubernetes
              </div>

              {/* Terraform */}

              <div className="flex items-center gap-3 rounded-xl bg-slate-800 px-5 py-3">
                <SiTerraform className="text-2xl text-violet-400" />
                Terraform
              </div>

              {/* GitHub Actions */}

              <div className="flex items-center gap-3 rounded-xl bg-slate-800 px-5 py-3">
                <SiGithubactions
                  className="text-2xl"
                  style={{
                    color: "var(--theme-primary)",
                  }}
                />
                GitHub Actions
              </div>

            </div>

            {/* GitHub Button */}

            <a
              href="https://github.com/AnkitDhonde28"
              target="_blank"
              rel="noreferrer"
              className="
                mt-10
                inline-flex
                items-center
                gap-3
                rounded-xl
                px-7
                py-4
                font-semibold
                text-white
                transition-all
                duration-300
                hover:scale-105
              "
              style={{
                background:
                  "linear-gradient(to right, var(--theme-primary), #2563eb)",
                boxShadow:
                  "0 0 30px rgba(var(--theme-rgb), 0.20)",
              }}
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