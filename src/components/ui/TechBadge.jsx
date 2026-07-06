export default function TechBadge({
  icon,
  title,
  className = "",
}) {
  return (
    <div
      className={`
      absolute
      bg-slate-900/80
      backdrop-blur-lg
      border
      border-white/10
      rounded-xl
      px-4
      py-3
      shadow-xl
      ${className}
      `}
    >
      <div className="flex items-center gap-2">

        <span className="text-xl">

          {icon}

        </span>

        <span className="font-medium">

          {title}

        </span>

      </div>
    </div>
  );
}