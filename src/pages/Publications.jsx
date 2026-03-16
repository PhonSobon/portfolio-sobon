import { useData } from "../context/DataContext";
import PubCard from "../components/shared/PubCard";

export default function Publications() {
  const { data } = useData();
  const { publications } = data;

  const years = [...new Set(publications.map((p) => p.year))].sort((a, b) => b - a);
  const hasStar = publications.some((p) => p.authors?.some((a) => a.star));

  if (publications.length === 0) {
    return (
      <p className="text-sm text-gray-400 py-10 text-center">No publications yet.</p>
    );
  }

  return (
    <div>
      {years.map((year) => (
        <div key={year}>
          <h2 className="font-garamond text-2xl font-bold border-b border-border pb-1.5 mt-8 mb-1">
            {year}
          </h2>
          {publications
            .filter((p) => p.year === year)
            .map((pub) => (
              <PubCard key={pub.id} pub={pub} />
            ))}
        </div>
      ))}
      {hasStar && (
        <p className="text-xs text-gray-400 mt-4">
          <sup>*</sup> Equal contribution.
        </p>
      )}
    </div>
  );
}
