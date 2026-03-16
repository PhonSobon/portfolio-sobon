export default function TagPill({ tag, label }) {
  const text = tag || label;
  return (
    <span className="inline-block text-[0.72rem] bg-gray-100 text-gray-600 border border-border rounded px-2 py-0.5">
      {text}
    </span>
  );
}
