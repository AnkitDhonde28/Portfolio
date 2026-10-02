import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { motion } from "framer-motion";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY
);

export default function AdminSubscribers({
  session,
  onLogout,
}) {
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchSubscribers = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        "/api/subscribers",
        {
          headers: {
            Authorization: `Bearer ${session.access_token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Unable to fetch subscribers"
        );
      }

      setSubscribers(data.subscribers || []);
    } catch (error) {
      console.error(error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscribers();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    onLogout();
  };

  return (
    <section className="min-h-screen bg-[#020617] px-4 py-24 sm:px-6">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="
          flex
          flex-col
          gap-5
          sm:flex-row
          sm:items-center
          sm:justify-between
        ">
          <div>
            <p
              className="text-sm font-medium"
              style={{
                color: "var(--theme-primary)",
              }}
            >
              ADMIN PANEL
            </p>

            <h1 className="
              mt-2
              text-3xl
              font-bold
              text-white
              sm:text-4xl
            ">
              Subscribers
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              Manage your portfolio subscribers.
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="
              rounded-lg
              border
              border-slate-800
              px-4
              py-2.5
              text-sm
              text-slate-400
              transition
              hover:border-red-500/30
              hover:text-red-400
            "
          >
            Logout
          </button>
        </div>

        {/* Stats */}
        <div className="mt-10 grid gap-4 sm:grid-cols-3">

          <StatCard
            title="Total Subscribers"
            value={subscribers.length}
            icon="👥"
          />

          <StatCard
            title="Latest Subscriber"
            value={
              subscribers.length
                ? new Date(
                    subscribers[0].subscribed_at
                  ).toLocaleDateString("en-IN")
                : "—"
            }
            icon="🚀"
          />

          <StatCard
            title="Status"
            value="Active"
            icon="●"
          />

        </div>

        {/* Table */}
        <div className="
          mt-8
          overflow-hidden
          rounded-2xl
          border
          border-slate-800
          bg-[#080d19]
        ">

          <div className="
            flex
            items-center
            justify-between
            border-b
            border-slate-800
            px-5
            py-4
          ">
            <h2 className="font-semibold text-white">
              Subscriber List
            </h2>

            <button
              onClick={fetchSubscribers}
              className="
                text-sm
                text-slate-500
                transition
                hover:text-[var(--theme-primary)]
              "
            >
              ↻ Refresh
            </button>
          </div>

          {loading && (
            <div className="p-10 text-center text-slate-500">
              Loading subscribers...
            </div>
          )}

          {error && (
            <div className="p-10 text-center text-red-400">
              {error}
            </div>
          )}

          {!loading &&
            !error &&
            subscribers.length === 0 && (
              <div className="
                p-12
                text-center
                text-slate-500
              ">
                No subscribers yet.
              </div>
            )}

          {!loading &&
            !error &&
            subscribers.length > 0 && (
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="
                      border-b
                      border-slate-800
                      text-xs
                      uppercase
                      tracking-wider
                      text-slate-600
                    ">
                      <th className="px-5 py-4">
                        #
                      </th>

                      <th className="px-5 py-4">
                        Name
                      </th>

                      <th className="px-5 py-4">
                        Email
                      </th>

                      <th className="px-5 py-4">
                        Subscribed
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {subscribers.map(
                      (subscriber, index) => (
                        <tr
                          key={subscriber.id}
                          className="
                            border-b
                            border-slate-800/60
                            transition
                            hover:bg-slate-900/40
                          "
                        >
                          <td className="
                            px-5
                            py-4
                            text-sm
                            text-slate-600
                          ">
                            {index + 1}
                          </td>

                          <td className="
                            px-5
                            py-4
                            text-sm
                            font-medium
                            text-white
                          ">
                            {subscriber.name}
                          </td>

                          <td className="
                            px-5
                            py-4
                            text-sm
                            text-slate-400
                          ">
                            {subscriber.email}
                          </td>

                          <td className="
                            px-5
                            py-4
                            text-sm
                            text-slate-500
                          ">
                            {new Date(
                              subscriber.subscribed_at
                            ).toLocaleString("en-IN", {
                              dateStyle: "medium",
                              timeStyle: "short",
                            })}
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </div>
            )}
        </div>
      </div>
    </section>
  );
}

function StatCard({ title, value, icon }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="
        rounded-2xl
        border
        border-slate-800
        bg-[#080d19]
        p-5
      "
    >
      <div className="flex items-center justify-between">
        <span className="text-sm text-slate-500">
          {title}
        </span>

        <span
          style={{
            color: "var(--theme-primary)",
          }}
        >
          {icon}
        </span>
      </div>

      <div className="mt-4 text-2xl font-bold text-white">
        {value}
      </div>
    </motion.div>
  );
}
