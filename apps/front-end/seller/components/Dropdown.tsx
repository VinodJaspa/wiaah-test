export default function Dropdown({ label, options = [], ...props }) {
    return (
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700">{label}</label>
        <select
          className="border border-gray-300 px-4 py-2 rounded-md text-sm"
          {...props}
        >
          <option value="">Select</option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>
    );
  }
  