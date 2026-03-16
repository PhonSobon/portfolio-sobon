export default function AuthorList({ authors }) {
  const hasStars = authors.some((a) => a.star);

  return (
    <span>
      {authors.map((a, i) => (
        <span key={i}>
          {a.self ? <em>{a.name}</em> : <span>{a.name}</span>}
          {hasStars && a.star && <sup>*</sup>}
          {i < authors.length - 1 && ", "}
        </span>
      ))}
      {hasStars && (
        <sup className="ml-0.5">*</sup>
      )}
    </span>
  );
}
