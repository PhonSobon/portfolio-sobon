import { useData } from "../../context/DataContext";

const TABS = [
  { id: "about", label: "About" },
  { id: "publications", label: "Publications" },
  { id: "blog", label: "Blog" },
  { id: "cv", label: "Open Source" },
];

export default function Navbar({ activeTab, setActiveTab }) {
  const { data } = useData();
  const showName = activeTab !== "about";

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-border h-14 flex items-center justify-center">
      <div className="w-full max-w-3xl px-6 md:px-10 flex items-center justify-between">
        {showName && (
          <button
            className="font-garamond text-lg font-semibold text-[#1a1a1a] hover:text-accent transition-colors"
            onClick={() => setActiveTab("about")}
          >
            {data.me.name}
          </button>
        )}
        {!showName && <div />}
        <div className="flex items-center gap-1">
          {TABS.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`px-3 py-1.5 text-sm rounded transition-colors ${
                activeTab === id
                  ? "text-accent font-semibold"
                  : "text-gray-500 hover:text-[#1a1a1a]"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
