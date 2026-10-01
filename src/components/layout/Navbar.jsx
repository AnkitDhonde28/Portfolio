import { useState } from "react";
import {
  HiOutlineMenuAlt3,
  HiOutlineX,
  HiOutlineChevronDown,
} from "react-icons/hi";

import navigation from "../../data/navigation";
import useScroll from "../../hooks/useScroll";
import { useTheme } from "../../context/ThemeContext";

export default function Navbar({ onNavigate }) {
  const scrolled = useScroll();

  const [menuOpen, setMenuOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [mobileMoreOpen, setMobileMoreOpen] = useState(false);

  const { themeColor } = useTheme();

  /*
   * Main sections shown directly in navbar
   */
  const primaryIds = [
    "hero",
    "about",
    "experience",
    "skills",
    "projects",
    "learning",
    "contact",
  ];

  const primaryNavigation = navigation.filter((item) =>
    primaryIds.includes(item.id)
  );

  /*
   * Separate pages / additional items shown inside More
   */
  const moreNavigation = navigation.filter(
    (item) => !primaryIds.includes(item.id)
  );

  /*
   * Separate page routes
   *
   * IMPORTANT:
   * These IDs must match the IDs in navigation.js
   */
  const pageRoutes = {
    pipeline: "/pipeline",
    "aws-architecture": "/aws-architecture",
    "incident-lab": "/incident-lab",
  };

  /* =========================================================
     CLOSE MENUS
  ========================================================= */

  const closeMenus = () => {
    setMenuOpen(false);
    setMoreOpen(false);
    setMobileMoreOpen(false);
  };

  /* =========================================================
     NAVIGATION
  ========================================================= */

  const handleNavigation = (id) => {
    /*
     * Separate page navigation
     *
     * Example:
     * pipeline        -> /pipeline
     * aws-architecture -> /aws-architecture
     * incident-lab    -> /incident-lab
     */
    if (pageRoutes[id]) {
      if (onNavigate) {
        onNavigate(pageRoutes[id]);
      } else {
        window.location.href = pageRoutes[id];
      }

      closeMenus();
      return;
    }

    /*
     * Home button
     */
    if (id === "hero") {
      const currentPath = window.location.pathname;

      if (currentPath !== "/") {
        if (onNavigate) {
          onNavigate("/");
        } else {
          window.location.href = "/";
        }

        setTimeout(() => {
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
        }, 100);
      } else {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }

      closeMenus();
      return;
    }

    /*
     * Normal home-page sections
     */
    const currentPath = window.location.pathname;

    if (currentPath !== "/") {
      /*
       * We are currently on a separate page.
       *
       * First return to home.
       */
      if (onNavigate) {
        onNavigate("/");
      } else {
        window.location.href = "/";
      }

      /*
       * Wait for React to render the home page,
       * then scroll to the requested section.
       */
      setTimeout(() => {
        const element = document.getElementById(id);

        if (element) {
          const y =
            element.getBoundingClientRect().top +
            window.scrollY -
            88;

          window.scrollTo({
            top: y,
            behavior: "smooth",
          });
        }
      }, 150);

      closeMenus();
      return;
    }

    /*
     * Learning detail page handling
     */
    const isLearningDetails =
      window.location.hash.startsWith("#learning/");

    const scrollToSection = () => {
      const element = document.getElementById(id);

      if (!element) return;

      const y =
        element.getBoundingClientRect().top +
        window.scrollY -
        88;

      window.scrollTo({
        top: y,
        behavior: "smooth",
      });
    };

    if (isLearningDetails) {
      window.location.hash = `#${id}`;

      setTimeout(() => {
        scrollToSection();
      }, 100);
    } else {
      scrollToSection();
    }

    closeMenus();
  };

  /* =========================================================
     LOGO
  ========================================================= */

  const handleLogoClick = () => {
    const currentPath = window.location.pathname;

    /*
     * If we're on a separate page,
     * return to home.
     */
    if (currentPath !== "/") {
      if (onNavigate) {
        onNavigate("/");
      } else {
        window.location.href = "/";
      }

      closeMenus();
      return;
    }

    /*
     * If we're inside Learning Details,
     * return to the home hero.
     */
    const isLearningDetails =
      window.location.hash.startsWith("#learning/");

    if (isLearningDetails) {
      window.location.hash = "#hero";

      setTimeout(() => {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }, 100);
    } else {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }

    closeMenus();
  };

  return (
    <header
      style={{
        backdropFilter: scrolled
          ? "blur(18px)"
          : "none",
      }}
      className={`
        fixed
        left-0
        top-0
        z-50
        w-full
        transition-all
        duration-500
        ease-out
        ${
          scrolled
            ? "border-b border-white/10 bg-slate-950/85 shadow-[0_10px_40px_rgba(0,0,0,.35)] backdrop-blur-xl"
            : "bg-transparent"
        }
      `}
    >
      {/* =====================================================
          NAVBAR CONTAINER
      ===================================================== */}

      <div
        className="
          mx-auto
          flex
          h-[88px]
          w-full
          max-w-[1400px]
          items-center
          justify-between
          px-6
          lg:px-8
        "
      >
        {/* ===================================================
            LOGO
        =================================================== */}

        <button
          onClick={handleLogoClick}
          className="shrink-0 cursor-pointer text-left"
          aria-label="Go to home"
        >
          <div className="flex items-center gap-3.5">
            {/* Logo */}
            <div
              className="
                flex
                h-12
                w-12
                shrink-0
                items-center
                justify-center
                rounded-xl
                text-lg
                font-bold
                text-slate-950
                transition-all
                duration-500
              "
              style={{
                background: `linear-gradient(135deg, ${themeColor}, #2563eb)`,
                boxShadow:
                  "0 0 30px rgba(var(--theme-rgb), 0.45)",
              }}
            >
              AD
            </div>

            {/* Name */}
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold leading-none text-white">
                Ankit Dhonde
              </h1>

              <p className="mt-1 text-sm text-slate-400">
                Cloud & DevOps Engineer
              </p>
            </div>
          </div>
        </button>

        {/* ===================================================
            DESKTOP NAVIGATION
        =================================================== */}

        <nav className="hidden items-center gap-7 lg:flex xl:gap-8">
          {/* Main navigation */}
          {primaryNavigation.map((item) => (
            <button
              key={item.id}
              onClick={() =>
                handleNavigation(item.id)
              }
              className="
                group
                relative
                cursor-pointer
                whitespace-nowrap
                text-[15px]
                font-medium
                text-slate-300
                transition-colors
                duration-300
              "
              onMouseEnter={(e) => {
                e.currentTarget.style.color =
                  themeColor;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "";
              }}
            >
              {item.label}

              <span
                className="
                  absolute
                  -bottom-2
                  left-0
                  h-[2px]
                  w-0
                  rounded-full
                  transition-all
                  duration-300
                  group-hover:w-full
                "
                style={{
                  backgroundColor: themeColor,
                }}
              />
            </button>
          ))}

          {/* =================================================
              MORE
          ================================================= */}

          {moreNavigation.length > 0 && (
            <div className="relative">
              <button
                onClick={() =>
                  setMoreOpen((prev) => !prev)
                }
                className="
                  flex
                  cursor-pointer
                  items-center
                  gap-1.5
                  whitespace-nowrap
                  text-[15px]
                  font-medium
                  text-slate-300
                  transition-colors
                  duration-300
                "
                style={{
                  color: moreOpen
                    ? themeColor
                    : undefined,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color =
                    themeColor;
                }}
                onMouseLeave={(e) => {
                  if (!moreOpen) {
                    e.currentTarget.style.color =
                      "";
                  }
                }}
              >
                More

                <HiOutlineChevronDown
                  className={`
                    text-base
                    transition-transform
                    duration-300
                    ${
                      moreOpen
                        ? "rotate-180"
                        : ""
                    }
                  `}
                />
              </button>

              {/* Dropdown */}
              <div
                className={`
                  absolute
                  right-0
                  top-full
                  mt-4
                  w-60
                  origin-top-right
                  overflow-hidden
                  rounded-xl
                  border
                  border-slate-700/80
                  bg-slate-950/95
                  shadow-2xl
                  backdrop-blur-xl
                  transition-all
                  duration-200
                  ${
                    moreOpen
                      ? "visible translate-y-0 opacity-100"
                      : "invisible -translate-y-2 opacity-0"
                  }
                `}
              >
                <div className="p-2">
                  {moreNavigation.map((item) => (
                    <button
                      key={item.id}
                      onClick={() =>
                        handleNavigation(item.id)
                      }
                      className="
                        flex
                        w-full
                        cursor-pointer
                        items-center
                        rounded-lg
                        px-4
                        py-3
                        text-left
                        text-[15px]
                        font-medium
                        text-slate-300
                        transition-all
                        duration-200
                      "
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color =
                          themeColor;

                        e.currentTarget.style.backgroundColor =
                          "rgba(var(--theme-rgb), 0.08)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color =
                          "";

                        e.currentTarget.style.backgroundColor =
                          "transparent";
                      }}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </nav>

        {/* ===================================================
            RESUME
        =================================================== */}

        <a
          href="/resume.pdf"
          target="_blank"
          rel="noreferrer"
          className="
            hidden
            rounded-xl
            px-6
            py-3
            text-[15px]
            font-semibold
            text-slate-950
            transition-all
            duration-300
            hover:-translate-y-0.5
            hover:scale-105
            lg:block
          "
          style={{
            backgroundColor: themeColor,
            boxShadow:
              "0 0 30px rgba(var(--theme-rgb), 0.35)",
          }}
        >
          Resume
        </a>

        {/* ===================================================
            MOBILE BUTTON
        =================================================== */}

        <button
          onClick={() => {
            setMenuOpen((prev) => !prev);
            setMoreOpen(false);
            setMobileMoreOpen(false);
          }}
          className="
            cursor-pointer
            text-3xl
            text-white
            lg:hidden
          "
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          {menuOpen ? (
            <HiOutlineX />
          ) : (
            <HiOutlineMenuAlt3 />
          )}
        </button>
      </div>

      {/* =====================================================
          MOBILE MENU
      ===================================================== */}

      <div
        className={`
          overflow-hidden
          transition-all
          duration-500
          ease-out
          lg:hidden
          ${
            menuOpen
              ? "max-h-[750px]"
              : "max-h-0"
          }
        `}
      >
        <div
          className="
            border-t
            border-white/10
            bg-slate-950/95
            px-5
            py-5
            backdrop-blur-xl
          "
        >
          <div className="flex flex-col gap-1">
            {/* Main links */}
            {primaryNavigation.map((item) => (
              <button
                key={item.id}
                onClick={() =>
                  handleNavigation(item.id)
                }
                className="
                  w-full
                  cursor-pointer
                  rounded-lg
                  px-3
                  py-3
                  text-left
                  text-[15px]
                  font-medium
                  text-slate-300
                  transition-all
                  duration-200
                "
                onMouseEnter={(e) => {
                  e.currentTarget.style.color =
                    themeColor;

                  e.currentTarget.style.backgroundColor =
                    "rgba(var(--theme-rgb), 0.08)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color =
                    "";

                  e.currentTarget.style.backgroundColor =
                    "transparent";
                }}
              >
                {item.label}
              </button>
            ))}

            {/* =================================================
                MOBILE MORE
            ================================================= */}

            {moreNavigation.length > 0 && (
              <div className="mt-1">
                <button
                  onClick={() =>
                    setMobileMoreOpen(
                      (prev) => !prev
                    )
                  }
                  className="
                    flex
                    w-full
                    cursor-pointer
                    items-center
                    justify-between
                    rounded-lg
                    px-3
                    py-3
                    text-left
                    text-[15px]
                    font-medium
                    text-slate-300
                  "
                  style={{
                    color: mobileMoreOpen
                      ? themeColor
                      : undefined,
                  }}
                >
                  <span>More</span>

                  <HiOutlineChevronDown
                    className={`
                      text-base
                      transition-transform
                      duration-300
                      ${
                        mobileMoreOpen
                          ? "rotate-180"
                          : ""
                      }
                    `}
                  />
                </button>

                <div
                  className={`
                    overflow-hidden
                    transition-all
                    duration-300
                    ${
                      mobileMoreOpen
                        ? "max-h-60 opacity-100"
                        : "max-h-0 opacity-0"
                    }
                  `}
                >
                  <div className="ml-3 border-l border-slate-800 pl-3">
                    {moreNavigation.map(
                      (item) => (
                        <button
                          key={item.id}
                          onClick={() =>
                            handleNavigation(
                              item.id
                            )
                          }
                          className="
                            block
                            w-full
                            cursor-pointer
                            rounded-lg
                            px-3
                            py-2.5
                            text-left
                            text-sm
                            text-slate-400
                            transition-all
                          "
                          onMouseEnter={(e) => {
                            e.currentTarget.style.color =
                              themeColor;

                            e.currentTarget.style.backgroundColor =
                              "rgba(var(--theme-rgb), 0.08)";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.color =
                              "";

                            e.currentTarget.style.backgroundColor =
                              "transparent";
                          }}
                        >
                          {item.label}
                        </button>
                      )
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Resume */}
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noreferrer"
              className="
                mt-4
                block
                rounded-xl
                py-3
                text-center
                text-[15px]
                font-semibold
                text-slate-950
                transition-all
                duration-300
                hover:scale-[1.02]
              "
              style={{
                backgroundColor: themeColor,
                boxShadow:
                  "0 0 25px rgba(var(--theme-rgb), 0.25)",
              }}
            >
              Download Resume
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}