export default function Card({
  children,
  className = "",
}) {
  return (
    <div
      className={`
        bg-slate-900/70
        backdrop-blur-xl
        border
        border-white/10
        rounded-3xl
        p-6
        shadow-[0_10px_40px_rgba(0,0,0,.35)]
        hover:border-cyan-500
        hover:-translate-y-1
        transition-all
        duration-300
        ${className}
      `}
    >
      {children}
    </div>
  );
}