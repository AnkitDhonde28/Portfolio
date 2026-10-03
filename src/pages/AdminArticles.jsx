import { useEffect, useState } from "react";

export default function AdminArticles({ session, onLogout }) {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadArticles = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch("/api/articles", {
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "Failed to load articles"
        );
      }

      setArticles(data.articles || []);
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (session) {
      loadArticles();
    }
  }, [session]);

  const createNewArticle = () => {
    window.history.pushState(
      {},
      "",
      "/admin/articles/new"
    );

    window.dispatchEvent(new PopStateEvent("popstate"));
  };

  const editArticle = (id) => {
    window.history.pushState(
      {},
      "",
      `/admin/articles/${id}`
    );

    window.dispatchEvent(new PopStateEvent("popstate"));
  };

  const goSubscribers = () => {
    window.history.pushState(
      {},
      "",
      "/admin/subscribers"
    );

    window.dispatchEvent(new PopStateEvent("popstate"));
  };

  const handleDelete = async (article) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${article.title}"?\n\nThis action cannot be undone.`
    );

    if (!confirmed) return;

    try {
      setError("");

      const response = await fetch(
        `/api/articles/${article.id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${session.access_token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "Failed to delete article."
        );
      }

      // Remove it from the screen immediately
      setArticles((current) =>
        current.filter(
          (item) => item.id !== article.id
        )
      );
    } catch (error) {
      console.error("Delete article error:", error);

      setError(
        error.message ||
        "Failed to delete article."
      );
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* =====================================================
          HEADER
      ===================================================== */}

      <header className="border-b border-slate-800 bg-slate-950/95">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-cyan-400">
              Admin Panel
            </p>

            <h1 className="text-2xl font-bold mt-1">
              Learning Articles
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={goSubscribers}
              className="px-4 py-2 rounded-lg border border-slate-700 text-sm text-slate-300 hover:border-cyan-400 hover:text-cyan-400 transition"
            >
              Subscribers
            </button>

            <button
              onClick={onLogout}
              className="px-4 py-2 rounded-lg border border-red-500/30 text-sm text-red-400 hover:bg-red-500/10 transition"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* =====================================================
          CONTENT
      ===================================================== */}

      <main className="max-w-7xl mx-auto px-6 py-10">
        {/* TOP BAR */}

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h2 className="text-xl font-semibold">
              Your Articles
            </h2>

            <p className="text-sm text-slate-500 mt-1">
              Create, edit and publish your technical
              learning articles.
            </p>
          </div>

          <button
            onClick={createNewArticle}
            className="px-5 py-3 rounded-xl bg-cyan-500 text-slate-950 font-semibold hover:bg-cyan-400 transition"
          >
            + New Article
          </button>
        </div>

        {/* =================================================
            ERROR
        ================================================= */}

        {error && (
          <div className="mb-6 rounded-xl border border-red-500/30 bg-red-500/10 px-5 py-4 text-red-400">
            {error}
          </div>
        )}

        {/* =================================================
            LOADING
        ================================================= */}

        {loading && (
          <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-10 text-center">
            <p className="text-cyan-400 text-sm tracking-widest uppercase">
              Loading articles...
            </p>
          </div>
        )}

        {/* =================================================
            EMPTY STATE
        ================================================= */}

        {!loading && articles.length === 0 && (
          <div className="rounded-2xl border border-dashed border-slate-700 bg-slate-900/30 p-12 text-center">
            <div className="text-4xl mb-4">
              📝
            </div>

            <h3 className="text-lg font-semibold">
              No articles yet
            </h3>

            <p className="text-slate-500 text-sm mt-2 mb-6">
              Create your first learning article.
            </p>

            <button
              onClick={createNewArticle}
              className="px-5 py-3 rounded-xl bg-cyan-500 text-slate-950 font-semibold"
            >
              Create Article
            </button>
          </div>
        )}

        {/* =================================================
            ARTICLE LIST
        ================================================= */}

        {!loading && articles.length > 0 && (
          <div className="space-y-4">
            {articles.map((article) => (
              <article
                key={article.id}
                className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 hover:border-slate-700 transition"
              >
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
                  {/* ARTICLE INFO */}

                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className="text-xs uppercase tracking-wider text-cyan-400">
                        {article.category}
                      </span>

                      <span
                        className={`text-xs px-2 py-1 rounded-full ${article.status === "published"
                            ? "bg-emerald-500/10 text-emerald-400"
                            : "bg-yellow-500/10 text-yellow-400"
                          }`}
                      >
                        {article.status}
                      </span>
                    </div>

                    <h3 className="text-lg font-semibold truncate">
                      {article.title}
                    </h3>

                    <p className="text-sm text-slate-500 mt-1">
                      /{article.slug}
                    </p>

                    <p className="text-xs text-slate-600 mt-2">
                      Updated{" "}
                      {article.updated_at
                        ? new Date(
                          article.updated_at
                        ).toLocaleString()
                        : "—"}
                    </p>
                  </div>

                  {/* ACTIONS */}

                  <div className="flex items-center gap-3">
                    {/* View */}
                    <button
                      onClick={() => {
                        window.location.hash =
                          `learning/${article.slug}`;
                      }}
                      className="
      rounded-lg
      border
      border-slate-700
      px-4
      py-2
      text-sm
      text-slate-300
      transition
      hover:border-cyan-400
      hover:text-cyan-400
    "
                    >
                      View
                    </button>

                    {/* Edit */}
                    <button
                      onClick={() => {
                        window.history.pushState(
                          {},
                          "",
                          `/admin/articles/${article.id}`
                        );

                        window.dispatchEvent(
                          new PopStateEvent("popstate")
                        );
                      }}
                      className="
      rounded-lg
      bg-slate-800
      px-4
      py-2
      text-sm
      text-white
      transition
      hover:bg-slate-700
    "
                    >
                      Edit
                    </button>

                    {/* Delete */}
                    <button
                      onClick={() => handleDelete(article)}
                      className="
      rounded-lg
      border
      border-red-500/30
      bg-red-500/5
      px-4
      py-2
      text-sm
      text-red-400
      transition
      hover:border-red-500
      hover:bg-red-500/10
    "
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}