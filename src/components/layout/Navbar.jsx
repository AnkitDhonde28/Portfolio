import { useState } from "react";
import { HiOutlineMenuAlt3, HiOutlineX } from "react-icons/hi";
import { Link } from "react-scroll";
import navigation from "../../data/navigation";
import useScroll from "../../hooks/useScroll";

export default function Navbar() {
  const scrolled = useScroll();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header
      style={{
        backdropFilter: scrolled ? "blur(18px)" : "none",
      }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-out ${scrolled
        ? "bg-slate-950/80 backdrop-blur-xl border-b border-white/10 shadow-[0_10px_40px_rgba(0,0,0,.35)]"
        : "bg-transparent"
        }`}
    >
      <div className="max-w-7xl mx-auto h-20 px-6 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="hero"
          smooth={true}
          duration={600}
          offset={-80}
          className="cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <div className="
w-11
h-11
rounded-xl
bg-gradient-to-br
from-cyan-400
to-blue-600
flex
items-center
justify-center
text-slate-950
font-bold
text-lg
shadow-[0_0_30px_rgba(56,189,248,.45)]
">
              AD
            </div>

            <div className="hidden sm:block">
              <h1 className="text-white font-bold text-lg leading-none">
                Ankit Dhonde
              </h1>

              <p className="text-slate-400 text-xs">
                Cloud & DevOps Engineer
              </p>
            </div>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          {navigation.map((item) => (
            <Link
              key={item.id}
              to={item.id}
              smooth={true}
              spy={true}
              offset={-80}
              duration={600}
              activeClass="text-cyan-400 after:w-full"
              className="
               relative
               cursor-pointer
               text-slate-300
               hover:text-cyan-400
               transition-all
               duration-300
               font-medium
               after:absolute
               after:left-0
               after:-bottom-2
               after:h-[2px]
               after:w-0
               after:bg-cyan-400
               after:transition-all
               after:duration-300
               hover:after:w-full
               "
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Desktop Resume Button */}
        <div className="
                      px-6
                      py-3
                      rounded-xl
                      bg-gradient-to-r
                      from-cyan-500
                      to-blue-600
                      text-white
                      font-semibold
                      hover:scale-105
                      hover:shadow-[0_0_30px_rgba(56,189,248,.5)]
                      transition-all
                      duration-300
                      ">
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noreferrer"
            className="px-6 py-3 rounded-xl bg-cyan-500 text-slate-950 font-semibold hover:bg-cyan-400 transition-all duration-500 ease-out hover:scale-105 shadow-[0_10px_40px_rgba(0,0,0,.35)]"
          >
            Resume
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="lg:hidden text-white text-3xl"
        >
          {menuOpen ? <HiOutlineX /> : <HiOutlineMenuAlt3 />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-500 ease-out ${menuOpen ? "max-h-[500px]" : "max-h-0"
          }`}
      >
        <div className="bg-slate-950/95 backdrop-blur-xl border-t border-white/10 px-6 py-6">
          <div className="flex flex-col gap-5">
            {navigation.map((item) => (
              <Link
                key={item.id}
                to={item.id}
                smooth={true}
                duration={600}
                offset={-80}
                onClick={() => setMenuOpen(false)}
                className="cursor-pointer text-slate-300 hover:text-cyan-400 transition font-medium"
              >
                {item.label}
              </Link>
            ))}

            <a
              href="/resume.pdf"
              target="_blank"
              rel="noreferrer"
              className="mt-4 bg-cyan-500 text-center text-slate-950 font-semibold py-3 rounded-xl hover:bg-cyan-400 transition"
            >
              Download Resume
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}