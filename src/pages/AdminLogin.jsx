import { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { motion } from "framer-motion";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY
);

export default function AdminLogin({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    const { data, error } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      });

    if (error) {
      setError("Invalid email or password.");
      setLoading(false);
      return;
    }

    onLogin(data.session);

    setLoading(false);
  };

  return (
    <section className="min-h-screen bg-[#020617] flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="
          w-full
          max-w-md
          rounded-2xl
          border
          border-slate-800
          bg-[#080d19]
          p-8
          shadow-2xl
        "
      >
        <div
          className="
            mx-auto
            mb-5
            flex
            h-14
            w-14
            items-center
            justify-center
            rounded-xl
            text-xl
          "
          style={{
            backgroundColor:
              "rgba(var(--theme-rgb), 0.10)",
            color: "var(--theme-primary)",
          }}
        >
          🔐
        </div>

        <h1 className="text-center text-2xl font-bold text-white">
          Admin Dashboard
        </h1>

        <p className="mt-2 text-center text-sm text-slate-500">
          Sign in to manage your subscribers.
        </p>

        <form
          onSubmit={handleLogin}
          className="mt-8 space-y-5"
        >
          <div>
            <label className="mb-2 block text-sm text-slate-400">
              Email
            </label>

            <input
              type="email"
              required
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              className="
                w-full
                rounded-lg
                border
                border-slate-800
                bg-slate-950
                px-4
                py-3
                text-white
                outline-none
                focus:border-[var(--theme-primary)]
              "
              placeholder="admin@example.com"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-slate-400">
              Password
            </label>

            <input
              type="password"
              required
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              className="
                w-full
                rounded-lg
                border
                border-slate-800
                bg-slate-950
                px-4
                py-3
                text-white
                outline-none
                focus:border-[var(--theme-primary)]
              "
              placeholder="••••••••"
            />
          </div>

          {error && (
            <div className="
              rounded-lg
              border
              border-red-500/20
              bg-red-500/5
              px-4
              py-3
              text-sm
              text-red-400
            ">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="
              w-full
              rounded-lg
              px-5
              py-3
              font-semibold
              text-slate-950
              transition
              hover:scale-[1.01]
              disabled:opacity-60
            "
            style={{
              backgroundColor:
                "var(--theme-primary)",
            }}
          >
            {loading ? "Signing in..." : "Sign In →"}
          </button>
        </form>
      </motion.div>
    </section>
  );
}