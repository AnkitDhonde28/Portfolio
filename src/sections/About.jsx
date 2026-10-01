import { motion } from "framer-motion";
import portfolio from "../data/portfolio";
import SectionTitle from "../components/common/SectionTitle";

export default function About() {
  return (
    <section
      id="about"
      className="
        w-full
        overflow-hidden
        bg-slate-900
        py-16
        sm:py-20
        lg:py-28
      "
    >
      <div
        className="
          mx-auto
          w-full
          max-w-7xl
          px-4
          sm:px-6
          lg:px-8
        "
      >
        {/* =====================================================
            SECTION TITLE
        ===================================================== */}

        <SectionTitle
          badge="About Me"
          title="Who"
          highlight="I Am"
          subtitle="Get to know more about my background, experience and passion for Cloud & DevOps."
        />

        {/* =====================================================
            MAIN CONTENT
        ===================================================== */}

        <div
          className="
            mt-12
            grid
            w-full
            min-w-0
            grid-cols-1
            items-center
            gap-12
            sm:mt-16
            sm:gap-16
            lg:grid-cols-2
            lg:gap-16
          "
        >
          {/* ===================================================
              LEFT — ILLUSTRATION
          =================================================== */}

          <motion.div
            initial={{
              opacity: 0,
              x: -60,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
              amount: 0.2,
            }}
            transition={{
              duration: 0.7,
            }}
            className="
              flex
              min-w-0
              w-full
              justify-center
              lg:justify-start
            "
          >
            <div
              className="
                relative
                flex
                w-full
                max-w-[520px]
                items-center
                justify-center
              "
            >
              {/* Theme Glow */}

              <div
                className="
                  pointer-events-none
                  absolute
                  left-1/2
                  top-1/2
                  h-56
                  w-56
                  -translate-x-1/2
                  -translate-y-1/2
                  rounded-full
                  blur-[100px]
                  sm:h-72
                  sm:w-72
                  sm:blur-[120px]
                  lg:h-96
                  lg:w-96
                  lg:blur-[140px]
                "
                style={{
                  backgroundColor:
                    "rgba(var(--theme-rgb), 0.20)",
                }}
              />

              <img
                src="/profile.png"
                alt="Cloud Illustration"
                className="
                  relative
                  h-auto
                  w-full
                  max-w-[300px]
                  object-contain
                  sm:max-w-[420px]
                  lg:max-w-[520px]
                "
                style={{
                  filter:
                    "drop-shadow(0 0 60px rgba(var(--theme-rgb), 0.35))",
                }}
              />
            </div>
          </motion.div>

          {/* ===================================================
              RIGHT — CONTENT
          =================================================== */}

          <motion.div
            initial={{
              opacity: 0,
              x: 60,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
              amount: 0.2,
            }}
            transition={{
              duration: 0.7,
            }}
            className="
              min-w-0
              w-full
            "
          >
            {/* =================================================
                INTRO
            ================================================= */}

            <div className="mb-6 sm:mb-7">

              {/* Badge */}

              <span
                className="
                  inline-flex
                  max-w-full
                  items-center
                  rounded-full
                  px-3
                  py-2
                  text-xs
                  font-semibold
                  sm:px-4
                  sm:text-sm
                "
                style={{
                  color: "var(--theme-primary)",
                  backgroundColor:
                    "rgba(var(--theme-rgb), 0.10)",
                  border:
                    "1px solid rgba(var(--theme-rgb), 0.20)",
                }}
              >
                <span className="mr-2 shrink-0">
                  ☁️
                </span>

                <span className="break-words">
                  Cloud & DevOps Engineer
                </span>
              </span>

              {/* Heading */}

              <h3
                className="
                  mt-5
                  max-w-full
                  break-words
                  text-3xl
                  font-black
                  leading-tight
                  sm:text-4xl
                  lg:text-5xl
                "
              >
                Building{" "}
                <span
                  style={{
                    color:
                      "var(--theme-primary)",
                  }}
                >
                  Scalable Infrastructure
                </span>
              </h3>
            </div>

            {/* =================================================
                DESCRIPTION
            ================================================= */}

            <p
              className="
                w-full
                break-words
                text-sm
                leading-7
                text-slate-400
                sm:text-base
                sm:leading-8
              "
            >
              {portfolio.about.description}
            </p>

            {/* =================================================
                HIGHLIGHTS
            ================================================= */}

            <div
              className="
                mt-8
                grid
                w-full
                min-w-0
                grid-cols-1
                gap-3
                sm:mt-10
                sm:grid-cols-2
                sm:gap-4
              "
            >
              {portfolio.about.highlights.map(
                (skill) => (
                  <div
                    key={skill}
                    className="
                      flex
                      min-w-0
                      w-full
                      items-start
                      gap-2
                      overflow-hidden
                      rounded-xl
                      border
                      border-slate-700
                      bg-slate-800
                      px-4
                      py-3
                      text-sm
                      leading-5
                      text-slate-200
                      transition-all
                      duration-300
                      sm:text-base
                    "
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor =
                        "var(--theme-primary)";

                      e.currentTarget.style.boxShadow =
                        "0 0 20px rgba(var(--theme-rgb), 0.12)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor =
                        "";

                      e.currentTarget.style.boxShadow =
                        "";
                    }}
                  >
                    <span
                      className="
                        shrink-0
                        font-semibold
                      "
                      style={{
                        color:
                          "var(--theme-primary)",
                      }}
                    >
                      ✓
                    </span>

                    <span className="min-w-0 break-words">
                      {skill}
                    </span>
                  </div>
                )
              )}
            </div>

            {/* =================================================
                INFO CARDS
            ================================================= */}

            <div
              className="
                mt-8
                grid
                w-full
                min-w-0
                grid-cols-1
                gap-4
                sm:mt-10
                sm:gap-5
                md:grid-cols-2
              "
            >
              {portfolio.about.cards.map(
                (card) => (
                  <div
                    key={card.title}
                    className="
                      min-w-0
                      w-full
                      overflow-hidden
                      rounded-2xl
                      border
                      border-slate-700
                      bg-slate-800
                      p-5
                      transition-all
                      duration-300
                      sm:p-6
                    "
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor =
                        "var(--theme-primary)";

                      e.currentTarget.style.boxShadow =
                        "0 0 25px rgba(var(--theme-rgb), 0.12)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor =
                        "";

                      e.currentTarget.style.boxShadow =
                        "";
                    }}
                  >
                    <h4
                      className="
                        break-words
                        text-sm
                        font-semibold
                        sm:text-base
                      "
                      style={{
                        color:
                          "var(--theme-primary)",
                      }}
                    >
                      {card.title}
                    </h4>

                    <p
                      className="
                        mt-2
                        break-words
                        text-base
                        font-medium
                        text-white
                        sm:text-lg
                      "
                    >
                      {card.value}
                    </p>
                  </div>
                )
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}