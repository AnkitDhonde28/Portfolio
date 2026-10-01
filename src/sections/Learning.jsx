import { motion } from "framer-motion";
import learning from "../data/learning";

export default function Learning() {
  return (
    <section
      id="learning"
      className="relative overflow-hidden bg-[#020617] py-20"
    >
      {/* Background Glow */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at center, rgba(var(--theme-rgb), 0.05), transparent 70%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-3xl text-center">

          {/* Badge */}
          <span
            className="
              inline-flex
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
            Engineering Journal
          </span>

          {/* Heading */}
          <h2 className="mt-5 text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Learning &{" "}
            <span
              style={{
                color: "var(--theme-primary)",
              }}
            >
              Building
            </span>
          </h2>

          <p className="mt-5 text-base leading-7 text-slate-400 sm:text-lg">
            Documenting what I&apos;m learning, experimenting with, and
            building across DevOps, Cloud, Kubernetes, Infrastructure as
            Code, and automation.
          </p>
        </div>

        {/* Learning Cards */}

        <div className="mt-20 grid gap-8 md:grid-cols-2">
          {learning.map((item, index) => (
            <motion.article
              key={item.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
              }}
              className="
                group
                relative
                overflow-hidden
                rounded-2xl
                border
                border-slate-800
                bg-slate-900/40
                p-7
                backdrop-blur-sm
                transition-all
                duration-300
                hover:bg-slate-900/70
              "
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor =
                  "rgba(var(--theme-rgb), 0.40)";

                e.currentTarget.style.boxShadow =
                  "0 0 35px rgba(var(--theme-rgb), 0.08)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "";

                e.currentTarget.style.boxShadow = "";
              }}
            >

              {/* Card Glow */}

              <div
                className="
                  absolute
                  -right-20
                  -top-20
                  h-40
                  w-40
                  rounded-full
                  blur-3xl
                  transition-all
                  duration-500
                  group-hover:scale-125
                "
                style={{
                  backgroundColor:
                    "rgba(var(--theme-rgb), 0.10)",
                }}
              />

              <div className="relative">

                {/* Header */}

                <div className="flex items-start justify-between gap-4">

                  <div>

                    <span
                      className="text-sm font-medium"
                      style={{
                        color: "var(--theme-primary)",
                      }}
                    >
                      {item.category}
                    </span>

                    <h3 className="mt-2 text-2xl font-bold text-white">
                      {item.title}
                    </h3>

                  </div>

                  {/* Status */}

                  <span
                    className="
                      shrink-0
                      rounded-full
                      px-3
                      py-1
                      text-xs
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
                    {item.status}
                  </span>

                </div>

                {/* Date */}

                <p className="mt-3 text-sm text-slate-500">
                  {item.date}
                </p>

                {/* Description */}

                <p className="mt-6 leading-7 text-slate-400">
                  {item.description}
                </p>

                {/* Technologies */}

                <div className="mt-6 flex flex-wrap gap-2">

                  {item.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="
                        rounded-md
                        border
                        border-slate-700
                        bg-slate-800/70
                        px-3
                        py-1.5
                        text-xs
                        font-medium
                        text-slate-300
                        transition-all
                        duration-300
                      "
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor =
                          "rgba(var(--theme-rgb), 0.40)";

                        e.currentTarget.style.color =
                          "var(--theme-primary)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = "";

                        e.currentTarget.style.color = "";
                      }}
                    >
                      {tech}
                    </span>
                  ))}

                </div>

                {/* Topics */}

                <div className="mt-7">

                  <p className="mb-3 text-sm font-semibold text-slate-300">
                    Exploring
                  </p>

                  <div className="grid gap-2 sm:grid-cols-2">

                    {item.topics.map((topic) => (
                      <div
                        key={topic}
                        className="
                          flex
                          items-center
                          gap-2
                          text-sm
                          text-slate-400
                        "
                      >
                        <span
                          className="h-1.5 w-1.5 rounded-full"
                          style={{
                            backgroundColor:
                              "var(--theme-primary)",
                          }}
                        />

                        {topic}
                      </div>
                    ))}

                  </div>
                </div>

                {/* Bottom */}

                <div className="mt-8 flex items-center justify-between border-t border-slate-800 pt-5">

                  {/* LinkedIn */}

                  <a
                    href={item.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                      text-sm
                      font-medium
                      transition-colors
                    "
                    style={{
                      color: "var(--theme-primary)",
                    }}
                  >
                    LinkedIn Post ↗
                  </a>

                  {/* Technical Details */}

                  <a
                    href={`#learning/${item.id}`}
                    className="
                      text-sm
                      font-medium
                      text-slate-300
                      transition-colors
                      hover:text-white
                    "
                  >
                    Technical Details →
                  </a>

                </div>

              </div>
            </motion.article>
          ))}
        </div>

        {/* Bottom Message */}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 text-center"
        >
          <p className="text-sm text-slate-500">
            Learning in public • Building in practice • Documenting the journey
          </p>
        </motion.div>

      </div>
    </section>
  );
}