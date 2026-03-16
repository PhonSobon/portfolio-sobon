import AuthorList from "./AuthorList";

const BADGE_STYLES = {
  Oral: "bg-red-50 text-red-700",
  Highlight: "bg-blue-50 text-blue-700",
  Workshop: "bg-green-50 text-green-700",
};

export default function PubCard({ pub }) {
  return (
    <div className="grid grid-cols-[100px_1fr] gap-5 py-5 border-b border-border items-start">
      {/* Thumbnail */}
      <div className="w-[100px] h-[70px] bg-gray-100 border border-border rounded flex items-center justify-center overflow-hidden flex-shrink-0">
        {pub.preview ? (
          <img src={pub.preview} alt={pub.title} className="w-full h-full object-cover" />
        ) : (
          <span className="text-[10px] text-gray-400 text-center px-1 leading-tight tracking-wide">
            No preview
          </span>
        )}
      </div>

      {/* Details */}
      <div>
        {pub.badges?.map((b) => (
          <span
            key={b}
            className={`inline-block text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded mr-1.5 mb-1 ${
              BADGE_STYLES[b] || "bg-gray-100 text-gray-600"
            }`}
          >
            {b}
          </span>
        ))}
        <div className="font-garamond text-[1.08rem] font-semibold leading-snug text-[#1a1a1a] mb-1">
          {pub.title}
        </div>
        <div className="text-sm text-gray-500 mb-1">
          <AuthorList authors={pub.authors} />
        </div>
        <div className="text-sm text-gray-500 italic mb-1">
          {pub.venue} · {pub.year}
        </div>
        {pub.links?.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-2">
            {pub.links.map((l) => (
              <a
                key={l.label}
                href={l.url}
                target="_blank"
                rel="noreferrer"
                className="text-[0.75rem] text-accent border border-accent rounded px-2 py-0.5 hover:bg-accent hover:text-white transition-colors"
              >
                {l.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
