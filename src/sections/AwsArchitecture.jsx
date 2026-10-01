import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaAws,
  FaRoute,
  FaServer,
  FaDocker,
  FaDatabase,
  FaCloud,
  FaUsers,
} from "react-icons/fa";
import { SiKubernetes } from "react-icons/si";

const services = [
  {
    id: "users",
    name: "Users",
    subtitle: "Web / Mobile Clients",
    description:
      "Users access the application through web or mobile clients.",
    icon: FaUsers,
    color: "#38bdf8",
    type: "entry",
  },
  {
    id: "route53",
    name: "Route 53",
    subtitle: "DNS & Domain Management",
    description:
      "Amazon Route 53 provides DNS resolution and routes users to the application entry point.",
    icon: FaRoute,
    color: "#8b5cf6",
    type: "network",
  },
  {
    id: "alb",
    name: "Application Load Balancer",
    subtitle: "Distributes Traffic",
    description:
      "Application Load Balancer distributes incoming HTTP/HTTPS traffic across application targets, helping improve availability and scalability.",
    icon: FaCloud,
    color: "#f97316",
    type: "network",
    features: [
      "Layer 7 load balancing",
      "Health checks",
      "SSL/TLS termination",
      "Integration with EC2 and EKS",
      "Auto scaling support",
    ],
  },
  {
    id: "ec2",
    name: "EC2",
    subtitle: "Application Server",
    description:
      "Amazon EC2 provides scalable compute instances for running application workloads.",
    icon: FaServer,
    color: "#f97316",
    type: "compute",
  },
  {
    id: "eks",
    name: "EKS",
    subtitle: "Kubernetes Cluster",
    description:
      "Amazon EKS provides a managed Kubernetes environment for deploying and managing containerized applications.",
    icon: SiKubernetes,
    color: "#3b82f6",
    type: "compute",
  },
  {
    id: "docker",
    name: "Docker Containers",
    subtitle: "Application Services",
    description:
      "Docker packages applications and their dependencies into portable containers for consistent deployments.",
    icon: FaDocker,
    color: "#2496ed",
    type: "container",
  },
  {
    id: "rds",
    name: "RDS",
    subtitle: "Database Service",
    description:
      "Amazon RDS provides managed relational database infrastructure for application data.",
    icon: FaDatabase,
    color: "#527fff",
    type: "database",
  },
  {
    id: "s3",
    name: "S3",
    subtitle: "Object Storage",
    description:
      "Amazon S3 provides durable object storage for assets, backups, logs, and other application data.",
    icon: FaCloud,
    color: "#22c55e",
    type: "storage",
  },
];

const connections = [
  ["users", "route53"],
  ["route53", "alb"],
  ["alb", "ec2"],
  ["alb", "eks"],
  ["alb", "docker"],
  ["ec2", "docker"],
  ["eks", "docker"],
  ["docker", "rds"],
  ["docker", "s3"],
];

function ServiceCard({
  service,
  active,
  onClick,
  compact = false,
}) {
  const Icon = service.icon;

  return (
    <motion.button
      type="button"
      whileHover={{ y: -4, scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onClick(service)}
      className={`
        group
        relative
        w-full
        overflow-hidden
        rounded-xl
        border
        text-left
        transition-all
        duration-300
        ${
          active
            ? "border-[var(--theme-primary)]"
            : "border-slate-700/80 hover:border-slate-600"
        }
        ${compact ? "p-4" : "p-5"}
      `}
      style={{
        backgroundColor: active
          ? "rgba(var(--theme-rgb), 0.08)"
          : "rgba(15, 23, 42, 0.85)",
        boxShadow: active
          ? "0 0 30px rgba(var(--theme-rgb), 0.15)"
          : "none",
      }}
    >
      {/* Active glow */}
      <div
        className="pointer-events-none absolute -right-8 -top-8 h-20 w-20 rounded-full blur-2xl transition-transform duration-500 group-hover:scale-150"
        style={{
          backgroundColor: `${service.color}22`,
        }}
      />

      <div className="relative flex items-center gap-3">
        <div
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-xl"
          style={{
            color: service.color,
            backgroundColor: `${service.color}18`,
            border: `1px solid ${service.color}35`,
          }}
        >
          <Icon />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-2">
            <h3
              className={`truncate font-semibold text-white ${
                compact ? "text-sm" : "text-base"
              }`}
            >
              {service.name}
            </h3>

            <span
              className="h-2 w-2 shrink-0 rounded-full"
              style={{
                backgroundColor: "#22c55e",
                boxShadow: "0 0 8px rgba(34,197,94,.7)",
              }}
            />
          </div>

          <p className="mt-1 truncate text-xs text-slate-500">
            {service.subtitle}
          </p>
        </div>
      </div>
    </motion.button>
  );
}

function Connector({ vertical = false }) {
  return (
    <div
      className={
        vertical
          ? "mx-auto h-8 w-px"
          : "h-px flex-1"
      }
      style={{
        background:
          "linear-gradient(90deg, transparent, rgba(var(--theme-rgb), .65), transparent)",
      }}
    />
  );
}

export default function AwsArchitecture() {
  const [selectedService, setSelectedService] =
    useState(services[2]);

  const selectService = (service) => {
    setSelectedService(service);
  };

  return (
    <section
      id="aws-architecture"
      className="relative overflow-hidden bg-[#020617] py-24 sm:py-28"
    >
      {/* Background */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at center, rgba(var(--theme-rgb), .07), transparent 65%)",
        }}
      />

      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.025) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
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
            className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium"
            style={{
              color: "var(--theme-primary)",
              backgroundColor:
                "rgba(var(--theme-rgb), .10)",
              border:
                "1px solid rgba(var(--theme-rgb), .20)",
            }}
          >
            <FaAws />
            AWS Infrastructure
          </span>

          <h2 className="mt-5 text-4xl font-bold tracking-tight text-white sm:text-5xl">
            AWS Architecture{" "}
            <span style={{ color: "var(--theme-primary)" }}>
              Explorer
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-400 sm:text-lg">
            Explore a simplified cloud architecture and
            click on each component to understand its role
            in the infrastructure.
          </p>
        </motion.div>

        {/* Main Explorer */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-16 grid gap-6 lg:grid-cols-[1.6fr_.8fr]"
        >
          {/* Architecture */}
          <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-950/60 p-4 backdrop-blur-sm sm:p-6">
            {/* Legend */}
            <div className="mb-8 flex flex-wrap gap-4 text-xs text-slate-500">
              <div className="flex items-center gap-2">
                <span
                  className="h-px w-7"
                  style={{
                    backgroundColor:
                      "var(--theme-primary)",
                  }}
                />
                Traffic Flow
              </div>

              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-green-400" />
                Healthy
              </div>

              <div className="flex items-center gap-2">
                <span
                  className="h-2 w-2 rounded-full"
                  style={{
                    backgroundColor:
                      "var(--theme-primary)",
                  }}
                />
                Selected
              </div>
            </div>

            {/* Desktop / Tablet Architecture */}
            <div className="hidden md:block">
              {/* Users */}
              <div className="mx-auto max-w-xs">
                <ServiceCard
                  service={services[0]}
                  active={
                    selectedService.id ===
                    services[0].id
                  }
                  onClick={selectService}
                />
              </div>

              <Connector vertical />

              {/* Route 53 */}
              <div className="mx-auto max-w-md">
                <ServiceCard
                  service={services[1]}
                  active={
                    selectedService.id ===
                    services[1].id
                  }
                  onClick={selectService}
                />
              </div>

              <Connector vertical />

              {/* ALB */}
              <div className="mx-auto max-w-lg">
                <ServiceCard
                  service={services[2]}
                  active={
                    selectedService.id ===
                    services[2].id
                  }
                  onClick={selectService}
                />
              </div>

              {/* Branches */}
              <div className="mx-auto mt-3 grid max-w-3xl grid-cols-3 items-center gap-3">
                <Connector />
                <div
                  className="h-px"
                  style={{
                    backgroundColor:
                      "rgba(var(--theme-rgb), .5)",
                  }}
                />
                <Connector />
              </div>

              {/* Compute */}
              <div className="grid grid-cols-2 gap-4">
                <ServiceCard
                  service={services[3]}
                  active={
                    selectedService.id ===
                    services[3].id
                  }
                  onClick={selectService}
                />

                <ServiceCard
                  service={services[4]}
                  active={
                    selectedService.id ===
                    services[4].id
                  }
                  onClick={selectService}
                />
              </div>

              <Connector vertical />

              {/* Docker */}
              <div className="mx-auto max-w-md">
                <ServiceCard
                  service={services[5]}
                  active={
                    selectedService.id ===
                    services[5].id
                  }
                  onClick={selectService}
                />
              </div>

              <Connector vertical />

              {/* Storage */}
              <div className="grid grid-cols-2 gap-4">
                <ServiceCard
                  service={services[6]}
                  active={
                    selectedService.id ===
                    services[6].id
                  }
                  onClick={selectService}
                />

                <ServiceCard
                  service={services[7]}
                  active={
                    selectedService.id ===
                    services[7].id
                  }
                  onClick={selectService}
                />
              </div>
            </div>

            {/* Mobile Architecture */}
            <div className="md:hidden">
              <div className="mx-auto max-w-sm">
                {services.map((service, index) => (
                  <div key={service.id}>
                    <ServiceCard
                      service={service}
                      active={
                        selectedService.id ===
                        service.id
                      }
                      onClick={selectService}
                      compact
                    />

                    {index <
                      services.length - 1 && (
                      <Connector vertical />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Details */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedService.id}
                initial={{
                  opacity: 0,
                  x: 15,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                }}
                exit={{
                  opacity: 0,
                  x: -15,
                }}
                transition={{
                  duration: 0.25,
                }}
                className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 backdrop-blur-md"
              >
                {/* Detail Header */}
                <div className="flex items-start gap-4">
                  <div
                    className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl text-2xl"
                    style={{
                      color:
                        selectedService.color,
                      backgroundColor:
                        `${selectedService.color}18`,
                      border:
                        `1px solid ${selectedService.color}35`,
                    }}
                  >
                    <selectedService.icon />
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="text-xl font-bold text-white">
                        {selectedService.name}
                      </h3>

                      <span className="rounded-full border border-green-400/20 bg-green-400/10 px-2 py-0.5 text-[10px] font-medium text-green-400">
                        Healthy
                      </span>
                    </div>

                    <p
                      className="mt-1 text-sm"
                      style={{
                        color:
                          "var(--theme-primary)",
                      }}
                    >
                      {selectedService.subtitle}
                    </p>
                  </div>
                </div>

                {/* Description */}
                <p className="mt-6 text-sm leading-7 text-slate-400">
                  {selectedService.description}
                </p>

                {/* Features */}
                {selectedService.features?.length > 0 && (
                  <div className="mt-6 rounded-xl border border-slate-800 bg-slate-950/60 p-4">
                    <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Key Capabilities
                    </p>

                    <div className="space-y-3">
                      {selectedService.features.map(
                        (feature) => (
                          <div
                            key={feature}
                            className="flex items-start gap-3"
                          >
                            <span
                              className="mt-1 h-2 w-2 shrink-0 rounded-full"
                              style={{
                                backgroundColor:
                                  "var(--theme-primary)",
                              }}
                            />

                            <span className="text-sm leading-5 text-slate-300">
                              {feature}
                            </span>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                )}

                {/* Experience */}
                <div className="mt-6 rounded-xl border border-slate-800 bg-slate-950/60 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                    My Usage
                  </p>

                  <p className="mt-2 text-sm leading-6 text-slate-400">
                    Used as part of cloud infrastructure,
                    deployment, monitoring, and
                    application delivery workflows.
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4"
        >
          {[
            ["7+", "AWS Services"],
            ["3+", "Environments"],
            ["99.9%", "Availability Focus"],
            ["50%+", "Automation"],
          ].map(([value, label]) => (
            <div
              key={label}
              className="rounded-xl border border-slate-800 bg-slate-900/50 p-4 text-center"
            >
              <div
                className="text-2xl font-bold"
                style={{
                  color:
                    "var(--theme-primary)",
                }}
              >
                {value}
              </div>

              <div className="mt-1 text-xs text-slate-500">
                {label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}