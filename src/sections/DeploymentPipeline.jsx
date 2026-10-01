import { motion } from "framer-motion";
import {
  FaGithub,
  FaJenkins,
  FaDocker,
  FaShieldAlt,
  FaAws,
  FaCheckCircle,
} from "react-icons/fa";
import { SiKubernetes } from "react-icons/si";

const pipelineStages = [
  {
    id: "source",
    title: "Source",
    subtitle: "GitHub",
    description:
      "Code changes are pushed to the repository and trigger the deployment workflow.",
    icon: FaGithub,
  },
  {
    id: "ci",
    title: "CI Pipeline",
    subtitle: "Jenkins",
    description:
      "Jenkins automates the build process and executes the required pipeline stages.",
    icon: FaJenkins,
  },
  {
    id: "build",
    title: "Build",
    subtitle: "Application",
    description:
      "Dependencies are installed and the application is built and prepared for deployment.",
    icon: FaCheckCircle,
  },
  {
    id: "container",
    title: "Containerize",
    subtitle: "Docker",
    description:
      "The application is packaged into a consistent Docker container image.",
    icon: FaDocker,
  },
  {
    id: "security",
    title: "Security",
    subtitle: "Validation",
    description:
      "The pipeline performs validation and security checks before deployment.",
    icon: FaShieldAlt,
  },
  {
    id: "deploy",
    title: "Deploy",
    subtitle: "Kubernetes",
    description:
      "Containerized workloads are deployed and managed using Kubernetes.",
    icon: SiKubernetes,
  },
  {
    id: "cloud",
    title: "Cloud",
    subtitle: "AWS",
    description:
      "Infrastructure and workloads run on AWS cloud services.",
    icon: FaAws,
  },
  {
    id: "production",
    title: "Production",
    subtitle: "Live",
    description:
      "The application reaches the production environment and becomes available to users.",
    icon: FaCheckCircle,
  },
];

export default function DeploymentPipeline() {
  return (
    <section
      id="pipeline"
      className="relative overflow-hidden bg-[#020617] py-24 sm:py-28"
    >
      {/* Background Glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at center, rgba(var(--theme-rgb), 0.07), transparent 65%)",
        }}
      />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl text-center"
        >
          <span
            className="inline-flex rounded-full px-4 py-1.5 text-sm font-medium"
            style={{
              color: "var(--theme-primary)",
              backgroundColor:
                "rgba(var(--theme-rgb), 0.10)",
              border:
                "1px solid rgba(var(--theme-rgb), 0.20)",
            }}
          >
            DevOps Workflow
          </span>

          <h2 className="mt-5 text-4xl font-bold tracking-tight text-white sm:text-5xl">
            From Code to{" "}
            <span style={{ color: "var(--theme-primary)" }}>
              Production
            </span>
          </h2>

          <p className="mt-5 text-base leading-7 text-slate-400 sm:text-lg">
            A simplified view of how I approach modern application
            delivery using CI/CD, containers, Kubernetes, and cloud
            infrastructure.
          </p>
        </motion.div>

        {/* Pipeline */}
        <div className="relative mt-16 sm:mt-20">
          {/* Desktop Connecting Line */}
          <div
            className="absolute left-[6%] right-[6%] top-[72px] hidden h-px lg:block"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(var(--theme-rgb), 0.5), transparent)",
            }}
          />

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {pipelineStages.map(
              (stage, index) => {
                const Icon = stage.icon;

                return (
                  <motion.div
                    key={stage.id}
                    initial={{
                      opacity: 0,
                      y: 35,
                    }}
                    whileInView={{
                      opacity: 1,
                      y: 0,
                    }}
                    viewport={{
                      once: true,
                      margin: "-80px",
                    }}
                    transition={{
                      duration: 0.5,
                      delay: index * 0.08,
                    }}
                    className="group relative"
                  >
                    {/* Stage Card */}
                    <div
                      className="
                        relative
                        h-full
                        overflow-hidden
                        rounded-2xl
                        border
                        border-slate-800
                        bg-slate-900/70
                        p-6
                        backdrop-blur-md
                        transition-all
                        duration-300
                        hover:-translate-y-2
                      "
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor =
                          "rgba(var(--theme-rgb), 0.45)";

                        e.currentTarget.style.boxShadow =
                          "0 0 35px rgba(var(--theme-rgb), 0.10)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor =
                          "";

                        e.currentTarget.style.boxShadow =
                          "";
                      }}
                    >
                      {/* Glow */}
                      <div
                        className="
                          pointer-events-none
                          absolute
                          -right-12
                          -top-12
                          h-24
                          w-24
                          rounded-full
                          blur-3xl
                          transition-all
                          duration-500
                          group-hover:scale-150
                        "
                        style={{
                          backgroundColor:
                            "rgba(var(--theme-rgb), 0.10)",
                        }}
                      />

                      {/* Icon */}
                      <div
                        className="
                          relative
                          flex
                          h-14
                          w-14
                          items-center
                          justify-center
                          rounded-xl
                          text-2xl
                          transition-all
                          duration-300
                          group-hover:scale-110
                        "
                        style={{
                          color:
                            "var(--theme-primary)",
                          backgroundColor:
                            "rgba(var(--theme-rgb), 0.10)",
                          border:
                            "1px solid rgba(var(--theme-rgb), 0.20)",
                        }}
                      >
                        <Icon />
                      </div>

                      {/* Number */}
                      <span
                        className="absolute right-5 top-5 font-mono text-xs"
                        style={{
                          color:
                            "rgba(var(--theme-rgb), 0.45)",
                        }}
                      >
                        {String(index + 1).padStart(
                          2,
                          "0"
                        )}
                      </span>

                      {/* Content */}
                      <div className="relative mt-6">
                        <p
                          className="text-xs font-medium uppercase tracking-wider"
                          style={{
                            color:
                              "var(--theme-primary)",
                          }}
                        >
                          {stage.title}
                        </p>

                        <h3 className="mt-1 text-xl font-bold text-white">
                          {stage.subtitle}
                        </h3>

                        <p className="mt-3 text-sm leading-6 text-slate-400">
                          {stage.description}
                        </p>
                      </div>

                      {/* Status */}
                      <div className="relative mt-6 flex items-center gap-2 border-t border-slate-800 pt-4">
                        <span
                          className="h-2 w-2 rounded-full"
                          style={{
                            backgroundColor:
                              "var(--theme-primary)",
                            boxShadow:
                              "0 0 10px rgba(var(--theme-rgb), 0.7)",
                          }}
                        />

                        <span className="text-xs text-slate-500">
                          Ready
                        </span>
                      </div>
                    </div>

                    {/* Mobile / Tablet Connector */}
                    {index <
                      pipelineStages.length - 1 && (
                      <div
                        className="
                          absolute
                          -bottom-6
                          left-1/2
                          h-6
                          w-px
                          lg:hidden
                        "
                        style={{
                          backgroundColor:
                            "rgba(var(--theme-rgb), 0.30)",
                        }}
                      />
                    )}
                  </motion.div>
                );
              }
            )}
          </div>
        </div>

        {/* Bottom Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{ once: true }}
          transition={{
            duration: 0.6,
            delay: 0.3,
          }}
          className="mx-auto mt-14 max-w-3xl rounded-2xl border border-slate-800 bg-slate-900/50 p-6 text-center backdrop-blur-sm sm:mt-16 sm:p-8"
        >
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-sm text-slate-400">
            <span>Code</span>

            <span
              style={{
                color: "var(--theme-primary)",
              }}
            >
              →
            </span>

            <span>Build</span>

            <span
              style={{
                color: "var(--theme-primary)",
              }}
            >
              →
            </span>

            <span>Container</span>

            <span
              style={{
                color: "var(--theme-primary)",
              }}
            >
              →
            </span>

            <span>Deploy</span>

            <span
              style={{
                color: "var(--theme-primary)",
              }}
            >
              →
            </span>

            <span
              className="font-medium"
              style={{
                color: "var(--theme-primary)",
              }}
            >
              Production
            </span>
          </div>

          <p className="mt-4 text-xs leading-6 text-slate-500">
            Automated delivery with repeatable builds,
            containerized workloads, infrastructure automation,
            and cloud deployment.
          </p>
        </motion.div>
      </div>
    </section>
  );
}