import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaDownload,
} from "react-icons/fa";

import portfolio from "../data/portfolio";

export default function Hero() {
  return (
    <section
      id="hero"
      className="
        relative
        min-h-screen
        w-full
        overflow-hidden
        bg-[#020617]
        pt-24
        pb-16
        sm:pt-28
        sm:pb-20
      "
    >
      {/* =====================================================
          BACKGROUND
      ====================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)]
          bg-[size:40px_40px]
        "
      />

      {/* Main Theme Glow */}
      <div
        className="
          pointer-events-none
          absolute
          left-[-120px]
          top-20
          h-72
          w-72
          rounded-full
          blur-[160px]
          sm:left-20
          sm:blur-[180px]
        "
        style={{
          backgroundColor:
            "rgba(var(--theme-rgb), 0.20)",
        }}
      />

      {/* Secondary Glow */}
      <div
        className="
          pointer-events-none
          absolute
          bottom-10
          right-[-150px]
          h-96
          w-96
          rounded-full
          bg-violet-500/20
          blur-[180px]
          sm:right-20
          sm:blur-[220px]
        "
      />

      {/* Top Radial Glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at top, rgba(var(--theme-rgb), 0.08), transparent 55%)",
        }}
      />

      {/* =====================================================
          MAIN CONTAINER
      ====================================================== */}

      <div
        className="
          relative
          z-10
          mx-auto
          w-full
          max-w-7xl
          px-4
          sm:px-6
          lg:px-8
        "
      >
        <div
          className="
            grid
            w-full
            min-w-0
            grid-cols-1
            items-center
            gap-16
            lg:grid-cols-[1.1fr_0.9fr]
            lg:gap-24
          "
        >
          {/* =================================================
              LEFT SECTION
          ================================================== */}

          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="min-w-0 w-full"
          >
            {/* Badge */}
            <span
              className="
                inline-flex
                max-w-full
                items-center
                gap-2
                rounded-full
                px-3
                py-2
                text-[11px]
                font-semibold
                leading-5
                sm:px-5
                sm:text-sm
              "
              style={{
                backgroundColor:
                  "rgba(var(--theme-rgb), 0.10)",
                border:
                  "1px solid rgba(var(--theme-rgb), 0.20)",
                color: "var(--theme-primary)",
              }}
            >
              <span className="shrink-0">
                🚀
              </span>

              <span className="min-w-0 break-words">
                {portfolio.badge}
              </span>
            </span>

            {/* Greeting */}
            <h4
              className="
                mt-6
                text-lg
                text-slate-300
                sm:text-xl
              "
            >
              Hi, I'm
            </h4>

            {/* Name */}
            <h1
              className="
                mt-2
                max-w-full
                break-words
                text-4xl
                font-black
                leading-tight
                tracking-tight
                sm:text-6xl
                md:text-7xl
                lg:text-7xl
                xl:text-8xl
              "
            >
              {portfolio.name}
            </h1>

            {/* Typing */}
            <div
              className="
                mt-5
                max-w-full
                overflow-hidden
                text-2xl
                font-semibold
                leading-tight
                sm:mt-6
                sm:text-3xl
              "
              style={{
                color: "var(--theme-primary)",
              }}
            >
              <TypeAnimation
                sequence={[
                  ...portfolio.typing.flatMap(
                    (item) => [item, 2000]
                  ),
                ]}
                speed={45}
                repeat={Infinity}
              />
            </div>

            {/* Description */}
            <p
              className="
                mt-7
                w-full
                max-w-xl
                break-words
                text-base
                leading-7
                text-slate-400
                sm:mt-8
                sm:text-lg
                sm:leading-8
              "
            >
              {portfolio.description}
            </p>

            {/* =================================================
                BUTTONS
            ================================================== */}

            <div
              className="
                mt-8
                flex
                w-full
                flex-col
                gap-3
                sm:mt-10
                sm:flex-row
                sm:flex-wrap
                sm:gap-5
              "
            >
              {/* Resume */}
              <a
                href={portfolio.resume}
                className="
                  group
                  inline-flex
                  w-full
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  px-6
                  py-3
                  font-semibold
                  text-white
                  shadow-lg
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:scale-[1.02]
                  sm:w-auto
                  sm:px-7
                "
                style={{
                  background:
                    "linear-gradient(to right, var(--theme-primary), #2563eb)",
                  boxShadow:
                    "0 0 30px rgba(var(--theme-rgb), 0.25)",
                }}
              >
                <FaDownload />

                Download Resume
              </a>

              {/* Projects */}
              <a
                href="#projects"
                className="
                  inline-flex
                  w-full
                  items-center
                  justify-center
                  rounded-xl
                  px-6
                  py-3
                  transition-all
                  duration-300
                  hover:scale-[1.02]
                  sm:w-auto
                  sm:px-7
                "
                style={{
                  border:
                    "1px solid var(--theme-primary)",
                  color: "var(--theme-primary)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor =
                    "var(--theme-primary)";

                  e.currentTarget.style.color =
                    "#ffffff";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor =
                    "transparent";

                  e.currentTarget.style.color =
                    "var(--theme-primary)";
                }}
              >
                View Projects
              </a>
            </div>

            {/* =================================================
                SOCIAL
            ================================================== */}

            <div
              className="
                mt-8
                flex
                gap-6
                text-2xl
                sm:mt-10
              "
            >
              <a
                href={portfolio.github}
                target="_blank"
                rel="noreferrer"
                className="transition-colors"
                style={{
                  color: "white",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color =
                    "var(--theme-primary)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color =
                    "white";
                }}
              >
                <FaGithub />
              </a>

              <a
                href={portfolio.linkedin}
                target="_blank"
                rel="noreferrer"
                className="transition-colors"
                style={{
                  color: "white",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color =
                    "var(--theme-primary)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color =
                    "white";
                }}
              >
                <FaLinkedin />
              </a>

              <a
                href={`mailto:${portfolio.email}`}
                className="transition-colors"
                style={{
                  color: "white",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color =
                    "var(--theme-primary)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color =
                    "white";
                }}
              >
                <FaEnvelope />
              </a>
            </div>

            {/* =================================================
                STATS
            ================================================== */}

            <div
              className="
                mt-10
                grid
                w-full
                min-w-0
                grid-cols-2
                gap-3
                sm:mt-12
                sm:gap-5
                lg:grid-cols-4
              "
            >
              {portfolio.stats.map((item) => (
                <div
                  key={item.title}
                  className="
                    min-w-0
                    overflow-hidden
                    rounded-2xl
                    border
                    border-slate-800
                    bg-slate-900/80
                    p-4
                    backdrop-blur-md
                    transition-all
                    duration-300
                    hover:-translate-y-2
                    sm:p-5
                  "
                  style={{
                    transitionProperty:
                      "border-color, transform, box-shadow",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor =
                      "var(--theme-primary)";

                    e.currentTarget.style.boxShadow =
                      "0 0 35px rgba(var(--theme-rgb), 0.20)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor =
                      "";

                    e.currentTarget.style.boxShadow =
                      "";
                  }}
                >
                  <h2
                    className="
                      truncate
                      text-2xl
                      font-bold
                      sm:text-3xl
                    "
                    style={{
                      color:
                        "var(--theme-primary)",
                    }}
                  >
                    {typeof item.value ===
                    "number" ? (
                      <>
                        {item.value}
                        {item.suffix}
                      </>
                    ) : (
                      item.value
                    )}
                  </h2>

                  <p
                    className="
                      mt-2
                      break-words
                      text-xs
                      leading-5
                      text-slate-400
                      sm:text-sm
                    "
                  >
                    {item.title}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* =================================================
              RIGHT SECTION
          ================================================== */}

          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="
              flex
              min-w-0
              w-full
              justify-center
              lg:justify-end
            "
          >
            <div
              className="
                relative
                flex
                min-w-0
                max-w-full
                flex-col
                items-center
              "
            >
              {/* Profile / Architecture */}
              <div className="relative max-w-full">
                {/* Main Glow */}
                <div
                  className="
                    pointer-events-none
                    absolute
                    inset-0
                    rounded-full
                    blur-[140px]
                    animate-pulse
                    sm:blur-[160px]
                  "
                  style={{
                    backgroundColor:
                      "rgba(var(--theme-rgb), 0.40)",
                  }}
                />

                {/* AWS */}
                <div
                  className="
                    absolute
                    -left-3
                    -top-5
                    z-10
                    flex
                    items-center
                    gap-2
                    rounded-xl
                    bg-slate-900/90
                    px-3
                    py-2
                    shadow-lg
                    backdrop-blur-md
                    sm:-left-8
                    sm:-top-6
                    sm:px-4
                  "
                  style={{
                    border:
                      "1px solid rgba(var(--theme-rgb), 0.30)",
                  }}
                >
                  <img
                    src="/logos/aws.svg"
                    alt="AWS"
                    className="h-5 w-5 sm:h-6 sm:w-6"
                  />

                  <span className="text-xs font-medium text-white sm:text-sm">
                    AWS
                  </span>
                </div>

                {/* Docker */}
                <div
                  className="
                    absolute
                    -right-3
                    top-8
                    z-10
                    flex
                    items-center
                    gap-2
                    rounded-xl
                    bg-slate-900/90
                    px-3
                    py-2
                    shadow-lg
                    backdrop-blur-md
                    sm:-right-12
                    sm:top-10
                    sm:px-4
                  "
                  style={{
                    border:
                      "1px solid rgba(var(--theme-rgb), 0.30)",
                  }}
                >
                  <img
                    src="/logos/docker.svg"
                    alt="Docker"
                    className="h-5 w-5 sm:h-6 sm:w-6"
                  />

                  <span className="text-xs font-medium text-white sm:text-sm">
                    Docker
                  </span>
                </div>

                {/* Kubernetes */}
                <div
                  className="
                    absolute
                    -bottom-2
                    -left-3
                    z-10
                    flex
                    items-center
                    gap-2
                    rounded-xl
                    bg-slate-900/90
                    px-3
                    py-2
                    shadow-lg
                    backdrop-blur-md
                    sm:bottom-12
                    sm:-left-12
                    sm:px-4
                  "
                  style={{
                    border:
                      "1px solid rgba(var(--theme-rgb), 0.30)",
                  }}
                >
                  <img
                    src="/logos/kubernetes.svg"
                    alt="Kubernetes"
                    className="h-5 w-5 sm:h-6 sm:w-6"
                  />

                  <span className="text-xs font-medium text-white sm:text-sm">
                    Kubernetes
                  </span>
                </div>

                {/* Terraform */}
                <div
                  className="
                    absolute
                    -bottom-5
                    -right-3
                    z-10
                    flex
                    items-center
                    gap-2
                    rounded-xl
                    bg-slate-900/90
                    px-3
                    py-2
                    shadow-lg
                    backdrop-blur-md
                    sm:bottom-0
                    sm:-right-10
                    sm:px-4
                  "
                  style={{
                    border:
                      "1px solid rgba(var(--theme-rgb), 0.30)",
                  }}
                >
                  <img
                    src="/logos/terraform.svg"
                    alt="Terraform"
                    className="h-5 w-5 sm:h-6 sm:w-6"
                  />

                  <span className="text-xs font-medium text-white sm:text-sm">
                    Terraform
                  </span>
                </div>

                {/* Profile */}
                <div className="relative">
                  <div
                    className="
                      pointer-events-none
                      absolute
                      inset-0
                      rounded-full
                      blur-[150px]
                      animate-pulse
                      sm:blur-[180px]
                    "
                    style={{
                      backgroundColor:
                        "rgba(var(--theme-rgb), 0.30)",
                    }}
                  />

                  <img
                    src="/profile.jpg"
                    alt="Ankit Dhonde"
                    className="
                      relative
                      h-[220px]
                      w-[220px]
                      max-w-[65vw]
                      rounded-full
                      border-[6px]
                      border-white/10
                      object-cover
                      shadow-2xl
                      sm:h-[320px]
                      sm:w-[320px]
                      sm:max-w-none
                      lg:h-[400px]
                      lg:w-[400px]
                    "
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}