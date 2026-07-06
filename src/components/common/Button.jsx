export default function Button({
  children,
  href,
  variant = "primary",
  icon,
}) {
  const variants = {
    primary:
      "bg-cyan-500 hover:bg-cyan-400 text-white shadow-lg hover:scale-105",

    secondary:
      "border border-cyan-500 hover:bg-cyan-500 hover:text-white",

    ghost:
      "hover:bg-slate-800",
  };

  const classes = `
      inline-flex
      items-center
      gap-2
      px-6
      py-3
      rounded-2xl
      font-semibold
      transition-all
      duration-300
      ${variants[variant]}
  `;

  if (href) {
    return (
      <a href={href} className={classes}>
        {icon}
        {children}
      </a>
    );
  }

  return (
    <button className={classes}>
      {icon}
      {children}
    </button>
  );
}