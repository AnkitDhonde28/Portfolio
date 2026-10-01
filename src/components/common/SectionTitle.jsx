export default function SectionTitle({
  badge,
  title,
  highlight,
  subtitle,
}) {
  return (
    <div className="text-center mb-16">

      {/* Badge */}
      {badge && (
        <span
          className="
            inline-block
            px-4
            py-1
            rounded-full
            text-sm
            font-semibold
            tracking-wider
            uppercase
          "
          style={{
            backgroundColor:
              "rgba(var(--theme-rgb), 0.10)",
            color: "var(--theme-primary)",
            border:
              "1px solid rgba(var(--theme-rgb), 0.20)",
          }}
        >
          {badge}
        </span>
      )}

      {/* Heading */}
      <h2 className="text-4xl md:text-5xl font-bold mt-4">
        {title}{" "}
        <span
          style={{
            color: "var(--theme-primary)",
          }}
        >
          {highlight}
        </span>
      </h2>

      {/* Subtitle */}
      {subtitle && (
        <p className="text-slate-400 mt-5 max-w-2xl mx-auto leading-7">
          {subtitle}
        </p>
      )}

    </div>
  );
}