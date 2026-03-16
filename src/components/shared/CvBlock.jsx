export default function CvBlock({ items }) {
  return (
    <div>
      {items.map((item, index) => (
        <div
          key={index}
          className="grid grid-cols-[120px_1fr] gap-x-5 gap-y-1 py-3.5 border-b border-gray-100 items-start"
        >
          <div className="text-xs text-gray-400 whitespace-nowrap pt-0.5">{item.period}</div>
          <div>
            <div className="text-sm font-semibold text-[#1a1a1a] mb-0.5">{item.title}</div>
            <div className="text-sm text-gray-500 leading-relaxed">{item.detail}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
