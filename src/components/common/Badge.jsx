export default function Badge({ text }) {
  return (
    <span className="bg-cyan-500/10 text-cyan-400 px-3 py-1 rounded-full text-sm font-medium">
      {text}
    </span>
  );
}