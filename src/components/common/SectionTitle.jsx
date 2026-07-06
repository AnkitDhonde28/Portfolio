export default function SectionTitle({
  badge,
  title,
  highlight,
  subtitle,
}) {
  return (
    <div className="text-center mb-16">

      {badge && (
        <span className="inline-block px-4 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-sm font-semibold tracking-wider uppercase">
          {badge}
        </span>
      )}

      <h2 className="text-4xl md:text-5xl font-bold mt-4">
        {title}{" "}
        <span className="text-cyan-400">
          {highlight}
        </span>
      </h2>

      {subtitle && (
        <p className="text-slate-400 mt-5 max-w-2xl mx-auto leading-7">
          {subtitle}
        </p>
      )}

    </div>
  );
}