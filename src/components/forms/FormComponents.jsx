export function FormInput({ label, value, onChange, type = "text", placeholder, id }) {
  return (
    <div className="mb-6">
      <label htmlFor={id} className="block text-sm font-semibold mb-2">{label}</label>
      <input
        id={id}
        type={type}
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-accent"
      />
    </div>
  );
}

export function FormTextarea({ label, value, onChange, rows = 3 }) {
  return (
    <div className="mb-6">
      <label className="block text-sm font-semibold mb-2">{label}</label>
      <textarea
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        rows={rows}
        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-accent"
      />
    </div>
  );
}

export function FormSelect({ label, value, onChange, options }) {
  return (
    <div>
      <label className="block text-sm font-semibold mb-2">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-accent"
      >
        {options.map((opt) => (
          <option key={opt}>{opt}</option>
        ))}
      </select>
    </div>
  );
}

export function Button({ onClick, variant = "primary", children }) {
  const styles = {
    primary: "px-6 py-2 bg-accent text-white rounded font-semibold hover:bg-blue-700",
    secondary: "px-6 py-2 bg-gray-300 text-gray-800 rounded font-semibold hover:bg-gray-400",
    danger: "px-3 py-1 bg-red-100 text-red-700 rounded text-sm hover:bg-red-200",
    success: "px-3 py-1 bg-blue-100 text-blue-700 rounded text-sm hover:bg-blue-200",
    small: "px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300",
  };
  return (
    <button onClick={onClick} className={styles[variant]}>
      {children}
    </button>
  );
}

export function ListItem({ title, subtitle, onEdit, onDelete }) {
  return (
    <div className="p-4 border border-gray-200 rounded flex justify-between items-start">
      <div>
        <h4 className="font-semibold">{title}</h4>
        <p className="text-sm text-gray-600">{subtitle}</p>
      </div>
      <div className="flex gap-2">
        <Button onClick={onEdit} variant="success">
          Edit
        </Button>
        <Button onClick={onDelete} variant="danger">
          Delete
        </Button>
      </div>
    </div>
  );
}
