import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaAws,
  FaDatabase,
  FaGlobe,
  FaServer,
  FaSearch,
  FaCheckCircle,
  FaExclamationTriangle,
  FaRedo,
} from "react-icons/fa";

const incidentOptions = [
  {
    id: "alb",
    title: "Load Balancer",
    subtitle: "ALB",
    icon: FaGlobe,
    description:
      "Check target health, request count, latency, and HTTP response patterns.",
    finding:
      "ALB is healthy. Requests are reaching the application normally.",
    status: "healthy",
  },
  {
    id: "ec2",
    title: "Compute",
    subtitle: "EC2",
    icon: FaServer,
    description:
      "Check CPU utilization, memory pressure, instance health, and application processes.",
    finding:
      "EC2 instances are healthy. CPU and memory utilization are within normal range.",
    status: "healthy",
  },
  {
    id: "database",
    title: "Database",
    subtitle: "RDS",
    icon: FaDatabase,
    description:
      "Check active connections, connection pool usage, slow queries, and database health.",
    finding:
      "Connection pool is exhausted. Active connections have reached the configured limit.",
    status: "root-cause",
  },
  {
    id: "dns",
    title: "DNS",
    subtitle: "Route 53",
    icon: FaAws,
    description:
      "Check DNS resolution, routing configuration, health checks, and propagation.",
    finding:
      "DNS resolution is healthy and traffic is resolving to the expected endpoint.",
    status: "healthy",
  },
];

const investigationSteps = [
  "Check infrastructure health",
  "Inspect application metrics",
  "Review logs and dependencies",
  "Identify the bottleneck",
  "Apply a safe remediation",
];

export default function IncidentLab() {
  const [selected, setSelected] = useState(null);
  const [showResolution, setShowResolution] =
    useState(false);

  const selectedOption = incidentOptions.find(
    (option) => option.id === selected
  );

  const handleInvestigation = (id) => {
    setSelected(id);
    setShowResolution(false);
  };

  const resetIncident = () => {
    setSelected(null);
    setShowResolution(false);
  };

  return (
    <section
      id="incident-lab"
      className="
        relative
        min-h-screen
        w-full
        overflow-hidden
        bg-[#020617]
        py-20
        sm:py-24
        lg:py-28
      "
    >
      {/* =====================================================
          BACKGROUND
      ===================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
        "
        style={{
          background:
            "radial-gradient(circle at center, rgba(var(--theme-rgb), 0.07), transparent 65%)",
        }}
      />

      <div
        className="
          pointer-events-none
          absolute
          -left-40
          top-1/4
          h-80
          w-80
          rounded-full
          blur-[140px]
        "
        style={{
          backgroundColor:
            "rgba(var(--theme-rgb), 0.07)",
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
          max-w-6xl
          px-4
          sm:px-6
          lg:px-8
        "
      >
        {/* ===================================================
            HEADER
        =================================================== */}

        <motion.div
          initial={{
            opacity: 0,
            y: 25,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.6,
          }}
          className="mx-auto max-w-3xl text-center"
        >
          <span
            className="
              inline-flex
              items-center
              gap-2
              rounded-full
              px-4
              py-1.5
              text-sm
              font-medium
            "
            style={{
              color: "var(--theme-primary)",
              backgroundColor:
                "rgba(var(--theme-rgb), 0.10)",
              border:
                "1px solid rgba(var(--theme-rgb), 0.20)",
            }}
          >
            <FaExclamationTriangle />
            DevOps Incident Lab
          </span>

          <h1
            className="
              mt-5
              text-4xl
              font-bold
              tracking-tight
              text-white
              sm:text-5xl
            "
          >
            Diagnose the{" "}
            <span
              style={{
                color: "var(--theme-primary)",
              }}
            >
              Incident
            </span>
          </h1>

          <p className="mt-5 text-base leading-7 text-slate-400 sm:text-lg">
            A simulated production incident designed to
            demonstrate a structured DevOps troubleshooting
            workflow.
          </p>
        </motion.div>

        {/* ===================================================
            INCIDENT CARD
        =================================================== */}

        <motion.div
          initial={{
            opacity: 0,
            y: 35,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.6,
            delay: 0.15,
          }}
          className="
            mx-auto
            mt-14
            max-w-5xl
            overflow-hidden
            rounded-3xl
            border
            border-slate-800
            bg-slate-900/80
            shadow-2xl
            backdrop-blur-xl
          "
        >
          {/* Browser header */}

          <div
            className="
              flex
              h-12
              items-center
              gap-2
              border-b
              border-slate-800
              bg-slate-800/70
              px-5
            "
          >
            <span className="h-3 w-3 rounded-full bg-red-500" />
            <span className="h-3 w-3 rounded-full bg-yellow-500" />
            <span className="h-3 w-3 rounded-full bg-green-500" />

            <span className="ml-auto font-mono text-xs text-slate-500">
              production-api
            </span>
          </div>

          {/* Incident */}

          <div className="p-5 sm:p-8 lg:p-10">

            {/* Status */}

            <div
              className="
                flex
                flex-col
                gap-4
                rounded-2xl
                border
                border-red-500/20
                bg-red-500/5
                p-5
                sm:flex-row
                sm:items-center
                sm:justify-between
              "
            >
              <div className="flex items-start gap-4">
                <div
                  className="
                    flex
                    h-12
                    w-12
                    shrink-0
                    items-center
                    justify-center
                    rounded-xl
                    bg-red-500/10
                    text-xl
                    text-red-400
                  "
                >
                  <FaExclamationTriangle />
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-red-400">
                    Production Incident
                  </p>

                  <h2 className="mt-1 text-lg font-bold text-white sm:text-xl">
                    API latency has increased
                  </h2>

                  <p className="mt-1 text-sm text-slate-400">
                    Average response time increased from
                    200ms to 8.4s.
                  </p>
                </div>
              </div>

              <div className="flex shrink-0 items-center gap-2 rounded-full border border-red-500/20 bg-red-500/10 px-3 py-1.5">
                <span className="h-2 w-2 animate-pulse rounded-full bg-red-500" />

                <span className="text-xs font-medium text-red-400">
                  Investigating
                </span>
              </div>
            </div>

            {/* =================================================
                INVESTIGATION
            ================================================= */}

            <div className="mt-10">

              <div className="flex items-center gap-3">
                <div
                  className="
                    flex
                    h-9
                    w-9
                    items-center
                    justify-center
                    rounded-lg
                  "
                  style={{
                    color:
                      "var(--theme-primary)",
                    backgroundColor:
                      "rgba(var(--theme-rgb), 0.10)",
                  }}
                >
                  <FaSearch />
                </div>

                <div>
                  <h3 className="font-bold text-white">
                    Investigation
                  </h3>

                  <p className="text-xs text-slate-500">
                    Where would you investigate first?
                  </p>
                </div>
              </div>

              {/* Options */}

              <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {incidentOptions.map(
                  (option, index) => {
                    const Icon = option.icon;

                    const isSelected =
                      selected === option.id;

                    return (
                      <motion.button
                        key={option.id}
                        initial={{
                          opacity: 0,
                          y: 20,
                        }}
                        animate={{
                          opacity: 1,
                          y: 0,
                        }}
                        transition={{
                          delay:
                            0.25 + index * 0.07,
                        }}
                        onClick={() =>
                          handleInvestigation(
                            option.id
                          )
                        }
                        className="
                          group
                          relative
                          cursor-pointer
                          overflow-hidden
                          rounded-2xl
                          border
                          p-5
                          text-left
                          transition-all
                          duration-300
                          hover:-translate-y-1
                        "
                        style={{
                          borderColor: isSelected
                            ? "var(--theme-primary)"
                            : "rgb(30 41 59)",
                          backgroundColor:
                            isSelected
                              ? "rgba(var(--theme-rgb), 0.08)"
                              : "rgba(15, 23, 42, 0.70)",
                          boxShadow: isSelected
                            ? "0 0 30px rgba(var(--theme-rgb), 0.12)"
                            : "none",
                        }}
                      >
                        <div
                          className="
                            flex
                            h-11
                            w-11
                            items-center
                            justify-center
                            rounded-xl
                            text-lg
                          "
                          style={{
                            color:
                              "var(--theme-primary)",
                            backgroundColor:
                              "rgba(var(--theme-rgb), 0.10)",
                          }}
                        >
                          <Icon />
                        </div>

                        <p
                          className="mt-4 text-xs font-medium uppercase tracking-wider"
                          style={{
                            color:
                              "var(--theme-primary)",
                          }}
                        >
                          {option.subtitle}
                        </p>

                        <h4 className="mt-1 font-bold text-white">
                          {option.title}
                        </h4>

                        <p className="mt-2 text-xs leading-5 text-slate-500">
                          {option.description}
                        </p>

                        {isSelected && (
                          <div
                            className="
                              absolute
                              right-4
                              top-4
                              h-2
                              w-2
                              rounded-full
                            "
                            style={{
                              backgroundColor:
                                "var(--theme-primary)",
                              boxShadow:
                                "0 0 10px rgba(var(--theme-rgb), 0.7)",
                            }}
                          />
                        )}
                      </motion.button>
                    );
                  }
                )}
              </div>
            </div>

            {/* =================================================
                RESULT
            ================================================= */}

            <AnimatePresence mode="wait">
              {selectedOption && (
                <motion.div
                  key={selectedOption.id}
                  initial={{
                    opacity: 0,
                    y: 20,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  exit={{
                    opacity: 0,
                    y: -10,
                  }}
                  transition={{
                    duration: 0.35,
                  }}
                  className="mt-8"
                >
                  <div
                    className="
                      rounded-2xl
                      border
                      p-5
                      sm:p-6
                    "
                    style={{
                      borderColor:
                        selectedOption.status ===
                        "root-cause"
                          ? "rgba(34, 197, 94, 0.30)"
                          : "rgba(var(--theme-rgb), 0.20)",
                      backgroundColor:
                        selectedOption.status ===
                        "root-cause"
                          ? "rgba(34, 197, 94, 0.05)"
                          : "rgba(var(--theme-rgb), 0.05)",
                    }}
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className="
                          flex
                          h-11
                          w-11
                          shrink-0
                          items-center
                          justify-center
                          rounded-xl
                        "
                        style={{
                          color:
                            selectedOption.status ===
                            "root-cause"
                              ? "#22c55e"
                              : "var(--theme-primary)",
                          backgroundColor:
                            selectedOption.status ===
                            "root-cause"
                              ? "rgba(34, 197, 94, 0.10)"
                              : "rgba(var(--theme-rgb), 0.10)",
                        }}
                      >
                        {selectedOption.status ===
                        "root-cause" ? (
                          <FaCheckCircle />
                        ) : (
                          <FaSearch />
                        )}
                      </div>

                      <div className="min-w-0">
                        <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                          Investigation Result
                        </p>

                        <h3 className="mt-1 font-bold text-white">
                          {selectedOption.subtitle}
                        </h3>

                        <p className="mt-2 text-sm leading-6 text-slate-400">
                          {selectedOption.finding}
                        </p>
                      </div>
                    </div>

                    {/* Root cause */}

                    {selectedOption.status ===
                      "root-cause" && (
                      <motion.div
                        initial={{
                          opacity: 0,
                          height: 0,
                        }}
                        animate={{
                          opacity: 1,
                          height: "auto",
                        }}
                        className="
                          mt-6
                          overflow-hidden
                          rounded-xl
                          border
                          border-green-500/20
                          bg-green-500/5
                          p-5
                        "
                      >
                        <div className="flex items-center gap-2 text-green-400">
                          <FaCheckCircle />

                          <span className="text-sm font-semibold">
                            Root Cause Found
                          </span>
                        </div>

                        <p className="mt-3 text-sm leading-6 text-slate-300">
                          The database connection pool
                          has reached its configured limit,
                          causing new requests to wait for
                          available connections.
                        </p>

                        <div className="mt-4 grid gap-3 sm:grid-cols-3">
                          <div className="rounded-lg border border-slate-800 bg-slate-900/70 p-3">
                            <p className="text-[10px] uppercase text-slate-500">
                              Connections
                            </p>
                            <p className="mt-1 font-mono text-sm text-red-400">
                              100 / 100
                            </p>
                          </div>

                          <div className="rounded-lg border border-slate-800 bg-slate-900/70 p-3">
                            <p className="text-[10px] uppercase text-slate-500">
                              API Latency
                            </p>
                            <p className="mt-1 font-mono text-sm text-red-400">
                              8.4s
                            </p>
                          </div>

                          <div className="rounded-lg border border-slate-800 bg-slate-900/70 p-3">
                            <p className="text-[10px] uppercase text-slate-500">
                              Status
                            </p>
                            <p className="mt-1 font-mono text-sm text-green-400">
                              Confirmed
                            </p>
                          </div>
                        </div>

                        <button
                          onClick={() =>
                            setShowResolution(
                              (prev) => !prev
                            )
                          }
                          className="
                            mt-5
                            flex
                            w-full
                            cursor-pointer
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
                              "0 0 25px rgba(var(--theme-rgb), 0.18)",
                          }}
                        >
                          <FaCheckCircle />

                          {showResolution
                            ? "Hide Remediation"
                            : "View Recommended Remediation"}
                        </button>

                        <AnimatePresence>
                          {showResolution && (
                            <motion.div
                              initial={{
                                opacity: 0,
                                height: 0,
                              }}
                              animate={{
                                opacity: 1,
                                height: "auto",
                              }}
                              exit={{
                                opacity: 0,
                                height: 0,
                              }}
                              className="overflow-hidden"
                            >
                              <div className="mt-4 rounded-xl border border-slate-800 bg-slate-950/60 p-5">
                                <p className="text-sm font-semibold text-white">
                                  Suggested remediation
                                </p>

                                <div className="mt-4 space-y-3">
                                  {[
                                    "Review current database connection usage.",
                                    "Identify long-running or leaked connections.",
                                    "Optimize connection pooling configuration.",
                                    "Monitor database connections after deployment.",
                                  ].map(
                                    (step, index) => (
                                      <div
                                        key={step}
                                        className="flex gap-3"
                                      >
                                        <span
                                          className="
                                            flex
                                            h-6
                                            w-6
                                            shrink-0
                                            items-center
                                            justify-center
                                            rounded-full
                                            text-[10px]
                                            font-bold
                                          "
                                          style={{
                                            color:
                                              "var(--theme-primary)",
                                            backgroundColor:
                                              "rgba(var(--theme-rgb), 0.10)",
                                          }}
                                        >
                                          {index + 1}
                                        </span>

                                        <p className="text-sm leading-6 text-slate-400">
                                          {step}
                                        </p>
                                      </div>
                                    )
                                  )}
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* =================================================
                WORKFLOW
            ================================================= */}

            <div className="mt-10 border-t border-slate-800 pt-8">
              <div className="flex flex-wrap justify-center gap-x-5 gap-y-3">
                {investigationSteps.map(
                  (step, index) => (
                    <div
                      key={step}
                      className="flex items-center gap-2 text-xs text-slate-500"
                    >
                      <span
                        className="
                          flex
                          h-6
                          w-6
                          items-center
                          justify-center
                          rounded-full
                          font-mono
                          text-[10px]
                        "
                        style={{
                          color:
                            "var(--theme-primary)",
                          backgroundColor:
                            "rgba(var(--theme-rgb), 0.08)",
                        }}
                      >
                        {String(index + 1).padStart(
                          2,
                          "0"
                        )}
                      </span>

                      {step}
                    </div>
                  )
                )}
              </div>
            </div>

            {/* Reset */}

            {selected && (
              <button
                onClick={resetIncident}
                className="
                  mx-auto
                  mt-8
                  flex
                  cursor-pointer
                  items-center
                  gap-2
                  text-xs
                  text-slate-500
                  transition-colors
                  hover:text-white
                "
              >
                <FaRedo />
                Reset Incident
              </button>
            )}
          </div>
        </motion.div>

        {/* ===================================================
            FOOTNOTE
        =================================================== */}

        <motion.p
          initial={{
            opacity: 0,
          }}
          whileInView={{
            opacity: 1,
          }}
          viewport={{
            once: true,
          }}
          className="
            mx-auto
            mt-8
            max-w-2xl
            text-center
            text-xs
            leading-6
            text-slate-600
          "
        >
          Simulated incident scenario for demonstrating
          structured troubleshooting and production
          investigation practices.
        </motion.p>
      </div>
    </section>
  );
}