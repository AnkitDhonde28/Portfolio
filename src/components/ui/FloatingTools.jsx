import { useState } from "react";
import {
  FiTerminal,
  FiSliders,
  FiX,
} from "react-icons/fi";

export default function FloatingTools() {
  const [open, setOpen] = useState(false);

  const openTerminal = () => {
    window.dispatchEvent(
      new Event("open-terminal")
    );

    setOpen(false);
  };

  const openTheme = () => {
    window.dispatchEvent(
      new Event("open-theme-customizer")
    );

    setOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[90]">
      {/* Floating Options */}
      <div
        className={`absolute bottom-16 right-0 flex flex-col items-center gap-3 transition-all duration-300 ${
          open
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none translate-y-4 opacity-0"
        }`}
      >
        {/* Terminal */}
        <button
          onClick={openTerminal}
          className="flex h-11 w-11 items-center justify-center rounded-full text-white shadow-lg transition-all duration-200 hover:scale-110"
          style={{
            backgroundColor:
              "var(--theme-primary)",
            boxShadow:
              "0 0 22px rgba(var(--theme-rgb), 0.35)",
          }}
          title="Open Terminal"
          aria-label="Open Terminal"
        >
          <FiTerminal size={19} />
        </button>

        {/* Theme */}
        <button
          onClick={openTheme}
          className="flex h-11 w-11 items-center justify-center rounded-full text-white shadow-lg transition-all duration-200 hover:scale-110"
          style={{
            backgroundColor:
              "var(--theme-primary)",
            boxShadow:
              "0 0 22px rgba(var(--theme-rgb), 0.35)",
          }}
          title="Customize Theme"
          aria-label="Customize Theme"
        >
          <FiSliders size={19} />
        </button>
      </div>

      {/* Main Button */}
      <button
        onClick={() =>
          setOpen((prev) => !prev)
        }
        className="flex h-12 w-12 items-center justify-center rounded-full text-white shadow-lg transition-all duration-300 hover:scale-110"
        style={{
          backgroundColor:
            "var(--theme-primary)",
          boxShadow:
            "0 0 25px rgba(var(--theme-rgb), 0.4)",
          transform: open
            ? "rotate(90deg)"
            : "rotate(0deg)",
        }}
        title="Portfolio Tools"
        aria-label="Open portfolio tools"
        aria-expanded={open}
      >
        {open ? (
          <FiX size={21} />
        ) : (
          <FiSliders size={21} />
        )}
      </button>
    </div>
  );
}