export default function LearningSidebar({
  sections,
  activeSection,
}) {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);

    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <aside className="hidden lg:block">
      <div className="sticky top-28 max-h-[calc(100vh-8rem)] overflow-y-auto pr-5">
        <div className="border-l border-slate-800 pl-5">
          <div className="mb-5">
            <p className="text-xs font-bold tracking-[0.2em] text-slate-500">
              ON THIS PAGE
            </p>
          </div>

          <nav className="space-y-1">
            {sections.map((section) => {
              if (section.type === "group") {
                return (
                  <div
                    key={section.id}
                    className="pt-5 pb-2"
                  >
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-600">
                      {section.title}
                    </p>
                  </div>
                );
              }

              const isActive =
                activeSection === section.id;

              return (
                <button
                  key={section.id}
                  onClick={() =>
                    scrollToSection(section.id)
                  }
                  className={`block w-full border-l-2 py-1.5 text-left text-sm transition-all duration-200 ${
                    section.parent
                      ? "ml-3 pl-4 text-[13px]"
                      : "pl-4 font-medium"
                  } ${
                    isActive
                      ? "border-cyan-400 text-cyan-400"
                      : "border-transparent text-slate-500 hover:border-slate-700 hover:text-slate-300"
                  }`}
                >
                  {section.title}
                </button>
              );
            })}
          </nav>
        </div>
      </div>
    </aside>
  );
}