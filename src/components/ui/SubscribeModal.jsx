import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* =========================================================
   EMAIL VALIDATION
========================================================= */

const isValidEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(
    email.trim()
  );
};

export default function SubscribeModal() {
  const [open, setOpen] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  /* =========================================================
     SHOW MODAL AFTER 18 SECONDS
  ========================================================= */

  useEffect(() => {
    const alreadySubscribed =
      localStorage.getItem("portfolio-subscribed");

    // Don't show again if this browser already subscribed
    if (alreadySubscribed === "true") {
      return;
    }

    const timer = setTimeout(() => {
      setOpen(true);
    }, 18000);

    return () => clearTimeout(timer);
  }, []);

  /* =========================================================
     HANDLE SUBMIT
  ========================================================= */

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setSuccess(false);

    /* =======================================================
       CLEAN INPUT
    ======================================================= */

    const cleanName = name.trim();
    const cleanEmail = email.trim().toLowerCase();

    /* =======================================================
       NAME VALIDATION
    ======================================================= */

    if (!cleanName) {
      setMessage("Please enter your name.");
      return;
    }

    if (cleanName.length < 2) {
      setMessage("Please enter a valid name.");
      return;
    }

    /* =======================================================
       EMAIL VALIDATION
    ======================================================= */

    if (!cleanEmail) {
      setMessage("Please enter your email address.");
      return;
    }

    if (!isValidEmail(cleanEmail)) {
      setMessage("Please enter a valid email address.");
      return;
    }

    /* =======================================================
       START SUBMITTING
    ======================================================= */

    setSubmitting(true);

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          name: cleanName,
          email: cleanEmail,
        }),
      });

      /* =====================================================
         SAFELY READ RESPONSE
      ===================================================== */

      let data = {};

      try {
        data = await response.json();
      } catch {
        data = {};
      }

      /* =====================================================
         API ERROR
      ===================================================== */

      if (!response.ok) {
        setSuccess(false);

        setMessage(
          data.message ||
            "Unable to subscribe right now. Please try again."
        );

        return;
      }

      /* =====================================================
         SUCCESS
      ===================================================== */

      setSuccess(true);

      setMessage(
        data.message ||
          "You're subscribed successfully!"
      );

      /* =====================================================
         SAVE SUBSCRIPTION STATUS LOCALLY
      ===================================================== */

      localStorage.setItem(
        "portfolio-subscribed",
        "true"
      );

      /* =====================================================
         CLEAR FORM
      ===================================================== */

      setName("");
      setEmail("");

      /* =====================================================
         CLOSE MODAL AFTER SUCCESS
      ===================================================== */

      setTimeout(() => {
        setOpen(false);
      }, 1800);
    } catch (error) {
      console.error(
        "Subscription error:",
        error
      );

      setSuccess(false);

      setMessage(
        "Unable to subscribe right now. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  /* =========================================================
     UI
  ========================================================= */

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="
            fixed
            inset-0
            z-[200]
            flex
            items-center
            justify-center
            bg-black/70
            px-4
            backdrop-blur-sm
          "
        >
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.95,
              y: 20,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              scale: 0.95,
              y: 20,
            }}
            transition={{
              duration: 0.25,
            }}
            className="
              relative
              w-full
              max-w-md
              overflow-hidden
              rounded-2xl
              border
              border-slate-800
              bg-[#080d19]
              p-6
              shadow-2xl
              sm:p-8
            "
          >
            {/* =================================================
                GLOW
            ================================================= */}

            <div
              className="
                pointer-events-none
                absolute
                -right-20
                -top-20
                h-40
                w-40
                rounded-full
                blur-3xl
              "
              style={{
                backgroundColor:
                  "rgba(var(--theme-rgb), 0.12)",
              }}
            />

            {/* =================================================
                CONTENT
            ================================================= */}

            <div className="relative">
              {/* Icon */}

              <div
                className="
                  mb-5
                  flex
                  h-12
                  w-12
                  items-center
                  justify-center
                  rounded-xl
                  text-xl
                "
                style={{
                  backgroundColor:
                    "rgba(var(--theme-rgb), 0.10)",
                  color:
                    "var(--theme-primary)",
                }}
              >
                🚀
              </div>

              {/* Heading */}

              <h2 className="text-2xl font-bold text-white">
                Stay Connected
              </h2>

              <p className="mt-3 text-sm leading-6 text-slate-400">
                Like what you see? Subscribe and get
                notified about my latest DevOps projects,
                technical articles and portfolio updates.
              </p>

              {/* =================================================
                  FORM
              ================================================= */}

              <form
                onSubmit={handleSubmit}
                className="mt-6 space-y-4"
              >
                {/* =================================================
                    NAME
                ================================================= */}

                <div>
                  <label className="mb-2 block text-sm text-slate-400">
                    Your name
                  </label>

                  <input
                    type="text"
                    value={name}
                    onChange={(e) =>
                      setName(e.target.value)
                    }
                    placeholder="Enter your name"
                    required
                    maxLength={100}
                    disabled={
                      submitting || success
                    }
                    autoComplete="name"
                    className="
                      w-full
                      rounded-lg
                      border
                      border-slate-800
                      bg-slate-950
                      px-4
                      py-3
                      text-sm
                      text-white
                      outline-none
                      transition
                      placeholder:text-slate-700
                      focus:border-[var(--theme-primary)]
                      disabled:cursor-not-allowed
                      disabled:opacity-60
                    "
                  />
                </div>

                {/* =================================================
                    EMAIL
                ================================================= */}

                <div>
                  <label className="mb-2 block text-sm text-slate-400">
                    Your email
                  </label>

                  <input
                    type="email"
                    value={email}
                    onChange={(e) =>
                      setEmail(e.target.value)
                    }
                    placeholder="you@example.com"
                    required
                    maxLength={254}
                    disabled={
                      submitting || success
                    }
                    autoComplete="email"
                    className="
                      w-full
                      rounded-lg
                      border
                      border-slate-800
                      bg-slate-950
                      px-4
                      py-3
                      text-sm
                      text-white
                      outline-none
                      transition
                      placeholder:text-slate-700
                      focus:border-[var(--theme-primary)]
                      disabled:cursor-not-allowed
                      disabled:opacity-60
                    "
                  />
                </div>

                {/* =================================================
                    CONSENT
                ================================================= */}

                <label className="flex gap-3 text-xs leading-5 text-slate-500">
                  <input
                    type="checkbox"
                    required
                    disabled={
                      submitting || success
                    }
                    className="
                      mt-1
                      accent-[var(--theme-primary)]
                    "
                  />

                  <span>
                    I agree to receive portfolio
                    updates by email. I can
                    unsubscribe anytime.
                  </span>
                </label>

                {/* =================================================
                    MESSAGE
                ================================================= */}

                {message && (
                  <div
                    className={`rounded-lg border px-4 py-3 text-sm ${
                      success
                        ? "border-emerald-500/20 bg-emerald-500/5 text-emerald-400"
                        : "border-red-500/20 bg-red-500/5 text-red-400"
                    }`}
                  >
                    {message}
                  </div>
                )}

                {/* =================================================
                    BUTTON
                ================================================= */}

                <button
                  type="submit"
                  disabled={
                    submitting || success
                  }
                  className="
                    w-full
                    rounded-lg
                    px-5
                    py-3
                    font-semibold
                    text-slate-950
                    transition
                    hover:scale-[1.01]
                    disabled:cursor-not-allowed
                    disabled:opacity-60
                  "
                  style={{
                    backgroundColor:
                      "var(--theme-primary)",

                    boxShadow:
                      "0 0 25px rgba(var(--theme-rgb), 0.15)",
                  }}
                >
                  {success
                    ? "Subscribed ✓"
                    : submitting
                    ? "Subscribing..."
                    : "Subscribe →"}
                </button>
              </form>

              {/* =================================================
                  FOOTER
              ================================================= */}

              <p className="mt-4 text-center text-[11px] text-slate-700">
                No spam • Unsubscribe anytime
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}