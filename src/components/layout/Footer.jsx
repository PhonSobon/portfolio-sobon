import { useData } from "../../context/DataContext";

export default function Footer({ setIsAdmin }) {
  const { data } = useData();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border py-5 text-center text-xs text-gray-400 tracking-wide">
      © {year} {data.me.name}. All rights reserved.
      {" · "}
      <button
        onClick={() => setIsAdmin(true)}
        className="text-gray-300 hover:text-gray-400 transition-colors"
        title="Admin"
      >
        admin
      </button>
    </footer>
  );
}
