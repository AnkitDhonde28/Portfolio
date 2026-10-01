import {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  FiCheck,
  FiRotateCcw,
  FiX,
} from "react-icons/fi";

import { useTheme } from "../../context/ThemeContext";

const DEFAULT_COLOR = "#38bdf8";

const colors = [
  {
    name: "Sky",
    color: "#38bdf8",
  },
  {
    name: "Purple",
    color: "#8b5cf6",
  },
  {
    name: "Green",
    color: "#22c55e",
  },
  {
    name: "Rose",
    color: "#f43f5e",
  },
  {
    name: "Orange",
    color: "#f97316",
  },
  {
    name: "Yellow",
    color: "#eab308",
  },
  {
    name: "Blue",
    color: "#3b82f6",
  },
  {
    name: "Pink",
    color: "#ec4899",
  },
];

export default function ColorCustomizer() {
  const {
    themeColor,
    setThemeColor,
  } = useTheme();

  const [open, setOpen] = useState(false);

  const panelRef = useRef(null);

  // Open from shared floating tools
  useEffect(() => {
    const handleOpenTheme = () => {
      setOpen(true);
    };

    window.addEventListener(
      "open-theme-customizer",
      handleOpenTheme
    );

    return () => {
      window.removeEventListener(
        "open-theme-customizer",
        handleOpenTheme
      );
    };
  }, []);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        panelRef.current &&
        !panelRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener(
        "mousedown",
        handleClickOutside
      );
    }

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, [open]);

  const resetTheme = () => {
    setThemeColor(DEFAULT_COLOR);
  };

  if (!open) {
    return null;
  }

  return (
    <div
      ref={panelRef}
      className="fixed bottom-24 right-6 z-[95]"
    >
      <div className="w-72 rounded-2xl border border-white/10 bg-slate-900/95 p-5 shadow-2xl backdrop-blur-xl">
        {/* Header */}
        <div className="mb-5 flex items-start justify-between">
          <div>
            <h3 className="text-sm font-semibold text-white">
              Customize Theme
            </h3>

            <p className="mt-1 text-xs text-gray-400">
              Choose your accent color
            </p>
          </div>

          <button
            onClick={() => setOpen(false)}
            className="text-gray-400 transition hover:text-white"
            aria-label="Close theme customizer"
          >
            <FiX size={18} />
          </button>
        </div>

        {/* Preset Colors */}
        <div className="grid grid-cols-4 gap-4">
          {colors.map(
            ({ name, color }) => {
              const isActive =
                themeColor === color;

              return (
                <button
                  key={color}
                  onClick={() =>
                    setThemeColor(color)
                  }
                  title={name}
                  aria-label={`Change theme to ${name}`}
                  className={`group relative h-10 w-10 rounded-full border-2 transition-all duration-200 hover:scale-110 ${
                    isActive
                      ? "border-white"
                      : "border-white/10"
                  }`}
                  style={{
                    backgroundColor: color,
                    boxShadow: isActive
                      ? `0 0 18px ${color}66`
                      : "none",
                  }}
                >
                  {isActive && (
                    <FiCheck
                      size={16}
                      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white"
                    />
                  )}

                  <span className="pointer-events-none absolute -top-8 left-1/2 hidden -translate-x-1/2 whitespace-nowrap rounded-md bg-black px-2 py-1 text-[10px] text-white shadow-lg group-hover:block">
                    {name}
                  </span>
                </button>
              );
            }
          )}
        </div>

        {/* Custom Color */}
        <div className="mt-5 border-t border-white/10 pt-4">
          <label className="mb-2 block text-xs font-medium text-gray-400">
            Custom Color
          </label>

          <div className="flex items-center gap-3">
            <input
              type="color"
              value={themeColor}
              onChange={(e) =>
                setThemeColor(
                  e.target.value
                )
              }
              className="h-10 w-14 cursor-pointer rounded-lg border-0 bg-transparent"
              aria-label="Choose custom theme color"
            />

            <div className="flex-1">
              <span className="text-sm font-medium text-gray-300">
                {themeColor.toUpperCase()}
              </span>

              <p className="mt-0.5 text-[11px] text-gray-500">
                Custom accent
              </p>
            </div>
          </div>
        </div>

        {/* Reset */}
        <button
          onClick={resetTheme}
          disabled={
            themeColor === DEFAULT_COLOR
          }
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg border border-slate-700 px-3 py-2 text-xs font-medium text-slate-400 transition-all duration-200 hover:border-slate-500 hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
        >
          <FiRotateCcw size={13} />
          Reset to Default
        </button>
      </div>
    </div>
  );
}