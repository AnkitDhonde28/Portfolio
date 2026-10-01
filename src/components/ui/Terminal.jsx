import { useEffect, useRef, useState } from "react";
import {
  FiX,
  FiMinimize2,
  FiMaximize2,
} from "react-icons/fi";

const COMMANDS = {
  help: {
    output: [
      "Available commands:",
      "",
      "  about            Learn about me",
      "  skills           View technical skills",
      "  projects         View featured projects",
      "  experience       View professional experience",
      "  certifications   View certifications",
      "  contact          Get contact information",
      "  whoami           Show identity",
      "  ls               List portfolio sections",
      "  pwd              Show current directory",
      "  date             Show current date",
      "  clear            Clear terminal",
      "  exit             Close terminal",
      "",
      "You can also ask naturally, for example:",
      '  "tell me about you"',
      '  "what technologies do you use?"',
      '  "what projects have you built?"',
      '  "how can I contact you?"',
      "",
      "Tip: Use ↑ / ↓ to navigate command history.",
    ],
  },

  about: {
    output: [
      "Ankit Dhonde",
      "DevOps Engineer",
      "",
      "Cloud & DevOps engineer focused on building",
      "reliable infrastructure, CI/CD pipelines,",
      "containerized applications and automation.",
      "",
      "Currently exploring:",
      "AWS • Kubernetes • Terraform • Docker • Jenkins",
    ],
  },

  skills: {
    output: [
      "Technical Skills",
      "",
      "Cloud:",
      "  AWS",
      "",
      "DevOps:",
      "  Docker",
      "  Kubernetes",
      "  Jenkins",
      "  CI/CD",
      "",
      "Infrastructure:",
      "  Terraform",
      "  Linux",
      "  NGINX",
      "",
      "Tools:",
      "  Git • GitHub • CloudWatch",
    ],
  },

  projects: {
    output: [
      "Featured Projects",
      "",
      "01  Car Rental Platform",
      "    React • Node.js • PostgreSQL",
      "    Docker • Kubernetes • Jenkins",
      "",
      "02  AI Market Analysis",
      "    React • Node.js • Express",
      "    Binance API • Technical Analysis",
      "",
      "03  DevOps Portfolio",
      "    React • Tailwind CSS • Vite",
      "    Framer Motion • Cloud/DevOps",
    ],
  },

  experience: {
    output: [
      "Professional Experience",
      "",
      "Role:",
      "  Technical Engineer / DevOps-focused",
      "",
      "Experience:",
      "  3+ years",
      "",
      "Areas:",
      "  AWS infrastructure",
      "  CI/CD pipelines",
      "  Docker",
      "  Jenkins",
      "  Linux administration",
      "  Monitoring & troubleshooting",
      "  Infrastructure automation",
    ],
  },

  certifications: {
    output: [
      "Certifications",
      "",
      "View the Certifications section",
      "to see verified credentials.",
    ],
  },

  contact: {
    output: [
      "Contact",
      "",
      "Use the Contact section of this portfolio",
      "to connect with me.",
      "",
      "GitHub   → Open the GitHub profile",
      "LinkedIn → Open the LinkedIn profile",
      "Email    → Send an email",
    ],
  },
};

export default function Terminal() {
  const [open, setOpen] = useState(false);
  const [maximized, setMaximized] = useState(false);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([]);
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const inputRef = useRef(null);
  const terminalBodyRef = useRef(null);

  // Listen for the shared floating tools button
  useEffect(() => {
    const handleOpenTerminal = () => {
      setOpen(true);
    };

    window.addEventListener(
      "open-terminal",
      handleOpenTerminal
    );

    return () => {
      window.removeEventListener(
        "open-terminal",
        handleOpenTerminal
      );
    };
  }, []);

  // Focus input when terminal opens
  useEffect(() => {
    if (open) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    }
  }, [open]);

  // Scroll terminal to bottom
  useEffect(() => {
    if (terminalBodyRef.current) {
      terminalBodyRef.current.scrollTop =
        terminalBodyRef.current.scrollHeight;
    }
  }, [history]);

  const addHistory = (command, output) => {
    setHistory((prev) => [
      ...prev,
      {
        command,
        output,
      },
    ]);
  };

  const executeCommand = (rawCommand) => {
    const command = rawCommand.trim().toLowerCase();

    if (!command) return;

    setCommandHistory((prev) => [
      ...prev.filter((item) => item !== command),
      command,
    ]);

    setHistoryIndex(-1);

    // Clear
    if (
      command === "clear" ||
      command === "cls"
    ) {
      setHistory([]);
      return;
    }

    // Exit
    if (
      command === "exit" ||
      command === "quit" ||
      command === "close"
    ) {
      setOpen(false);
      return;
    }

    // Help
    if (
      command === "help" ||
      command === "commands" ||
      command === "?" ||
      command.includes("what can i do")
    ) {
      addHistory(command, COMMANDS.help.output);
      return;
    }

    // About
    if (
      command === "about" ||
      command === "about me" ||
      command === "learn about me" ||
      command === "tell me about you" ||
      command === "tell me about yourself" ||
      command === "who are you" ||
      command === "whoami" ||
      command === "who am i"
    ) {
      addHistory(command, COMMANDS.about.output);
      return;
    }

    // Skills
    if (
      command === "skills" ||
      command === "my skills" ||
      command === "show skills" ||
      command === "technical skills" ||
      command === "your skills" ||
      command === "what are your skills" ||
      command === "what technologies do you use" ||
      command === "what technologies do you know" ||
      command === "what tech do you use" ||
      command === "tech stack"
    ) {
      addHistory(command, COMMANDS.skills.output);
      return;
    }

    // Projects
    if (
      command === "projects" ||
      command === "my projects" ||
      command === "show projects" ||
      command === "view projects" ||
      command === "featured projects" ||
      command === "what projects have you built" ||
      command === "what have you built" ||
      command === "what did you build"
    ) {
      addHistory(command, COMMANDS.projects.output);
      return;
    }

    // Experience
    if (
      command === "experience" ||
      command === "my experience" ||
      command === "show experience" ||
      command === "work experience" ||
      command === "professional experience" ||
      command === "how much experience do you have"
    ) {
      addHistory(
        command,
        COMMANDS.experience.output
      );
      return;
    }

    // Certifications
    if (
      command === "certifications" ||
      command === "certificates" ||
      command === "my certifications" ||
      command === "show certifications" ||
      command === "what certifications do you have"
    ) {
      addHistory(
        command,
        COMMANDS.certifications.output
      );
      return;
    }

    // Contact
    if (
      command === "contact" ||
      command === "contact me" ||
      command === "get in touch" ||
      command === "how can i contact you" ||
      command === "how do i contact you" ||
      command === "how can i reach you"
    ) {
      addHistory(
        command,
        COMMANDS.contact.output
      );
      return;
    }

    // Identity
    if (
      command === "who" ||
      command === "identity"
    ) {
      addHistory(command, [
        "ankit",
        "",
        "DevOps Engineer",
      ]);
      return;
    }

    // ls
    if (
      command === "ls" ||
      command === "list" ||
      command === "list files"
    ) {
      addHistory(command, [
        "about/",
        "skills/",
        "projects/",
        "experience/",
        "certifications/",
        "contact/",
      ]);
      return;
    }

    // pwd
    if (
      command === "pwd" ||
      command === "where am i"
    ) {
      addHistory(command, [
        "/home/ankit/portfolio",
      ]);
      return;
    }

    // Date
    if (
      command === "date" ||
      command === "what date is it"
    ) {
      addHistory(command, [
        new Date().toString(),
      ]);
      return;
    }

    // Sudo
    if (
      command === "sudo" ||
      command.startsWith("sudo ")
    ) {
      addHistory(command, [
        "Nice try 😄",
        "",
        "This portfolio doesn't require sudo.",
      ]);
      return;
    }

    // Greeting
    if (
      command === "hello" ||
      command === "hi" ||
      command === "hey"
    ) {
      addHistory(command, [
        "Hey! 👋",
        "",
        "Welcome to Ankit's DevOps Terminal.",
        'Type "help" to explore.',
      ]);
      return;
    }

    // Thanks
    if (
      command === "thanks" ||
      command === "thank you"
    ) {
      addHistory(command, [
        "You're welcome! 🚀",
      ]);
      return;
    }

    // Unknown command
    addHistory(command, [
      `command not found: ${command}`,
      "",
      'Type "help" to see available commands.',
    ]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    executeCommand(input);
    setInput("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();

      if (commandHistory.length === 0) {
        return;
      }

      const newIndex =
        historyIndex === -1
          ? commandHistory.length - 1
          : Math.max(historyIndex - 1, 0);

      setHistoryIndex(newIndex);
      setInput(commandHistory[newIndex]);
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();

      if (historyIndex === -1) {
        return;
      }

      const newIndex = historyIndex + 1;

      if (newIndex >= commandHistory.length) {
        setHistoryIndex(-1);
        setInput("");
        return;
      }

      setHistoryIndex(newIndex);
      setInput(commandHistory[newIndex]);
    }

    if (e.key === "Escape") {
      setOpen(false);
    }
  };

  const runQuickCommand = (command) => {
    executeCommand(command);
    setInput("");

    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  // Terminal is controlled by FloatingTools
  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
      <div
        className={`flex w-full flex-col overflow-hidden rounded-2xl border border-slate-700 bg-[#080d19] shadow-2xl ${
          maximized
            ? "h-[calc(100vh-2rem)] max-w-none"
            : "h-[600px] max-w-4xl"
        }`}
      >
        {/* Header */}
        <div className="flex shrink-0 items-center justify-between border-b border-slate-800 bg-slate-900/90 px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="flex gap-1.5">
              <span className="h-3 w-3 rounded-full bg-red-400" />
              <span className="h-3 w-3 rounded-full bg-yellow-400" />
              <span className="h-3 w-3 rounded-full bg-green-400" />
            </div>

            <span className="font-mono text-xs text-slate-400 sm:text-sm">
              ankit@portfolio:~
            </span>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() =>
                setMaximized((prev) => !prev)
              }
              className="rounded-md p-2 text-slate-500 transition hover:bg-white/5 hover:text-white"
              aria-label={
                maximized
                  ? "Restore terminal"
                  : "Maximize terminal"
              }
            >
              {maximized ? (
                <FiMinimize2 size={15} />
              ) : (
                <FiMaximize2 size={15} />
              )}
            </button>

            <button
              onClick={() => setOpen(false)}
              className="rounded-md p-2 text-slate-500 transition hover:bg-white/5 hover:text-white"
              aria-label="Close terminal"
            >
              <FiX size={17} />
            </button>
          </div>
        </div>

        {/* Body */}
        <div
          ref={terminalBodyRef}
          onClick={() =>
            inputRef.current?.focus()
          }
          className="flex-1 overflow-y-auto p-5 font-mono text-sm leading-7 sm:p-6"
        >
          <div className="mb-6">
            <p
              className="font-semibold"
              style={{
                color:
                  "var(--theme-primary)",
              }}
            >
              Welcome to Ankit's DevOps Terminal
            </p>

            <p className="text-slate-500">
              Type{" "}
              <span className="text-slate-300">
                help
              </span>{" "}
              to see available commands.
            </p>
          </div>

          {history.map((item, index) => (
            <div
              key={`${item.command}-${index}`}
              className="mb-5"
            >
              <div className="flex gap-2">
                <span
                  style={{
                    color:
                      "var(--theme-primary)",
                  }}
                >
                  $
                </span>

                <span className="break-all text-white">
                  {item.command}
                </span>
              </div>

              <div className="mt-1 pl-4 text-slate-400">
                {item.output.map(
                  (line, lineIndex) => (
                    <div
                      key={lineIndex}
                      className={
                        line === ""
                          ? "h-3"
                          : ""
                      }
                    >
                      {line}
                    </div>
                  )
                )}
              </div>
            </div>
          ))}

          <form
            onSubmit={handleSubmit}
            className="flex items-center gap-2"
          >
            <span
              style={{
                color:
                  "var(--theme-primary)",
              }}
            >
              $
            </span>

            <input
              ref={inputRef}
              value={input}
              onChange={(e) =>
                setInput(e.target.value)
              }
              onKeyDown={handleKeyDown}
              autoComplete="off"
              autoCapitalize="off"
              autoCorrect="off"
              spellCheck="false"
              className="min-w-0 flex-1 bg-transparent text-white outline-none placeholder:text-slate-700"
              placeholder="type a command..."
              aria-label="Terminal command"
            />

            <span
              className="h-5 w-2 animate-pulse"
              style={{
                backgroundColor:
                  "var(--theme-primary)",
              }}
            />
          </form>
        </div>

        {/* Quick Commands */}
        <div className="flex shrink-0 gap-2 overflow-x-auto border-t border-slate-800 bg-slate-900/60 px-4 py-3">
          {[
            "help",
            "about",
            "skills",
            "projects",
            "experience",
            "contact",
          ].map((command) => (
            <button
              key={command}
              onClick={() =>
                runQuickCommand(command)
              }
              className="shrink-0 rounded-md border border-slate-700 px-3 py-1.5 font-mono text-xs text-slate-400 transition"
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor =
                  "rgba(var(--theme-rgb), 0.40)";

                e.currentTarget.style.color =
                  "var(--theme-primary)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor =
                  "";

                e.currentTarget.style.color = "";
              }}
            >
              {command}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}