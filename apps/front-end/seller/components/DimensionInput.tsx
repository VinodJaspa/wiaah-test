export default function DimensionInput({ label }) {
    return (
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700">{label}</label>
        <div className="flex gap-2">
          <input
            placeholder="Length"
            className="w-full border border-gray-300 px-4 py-2 rounded-md text-sm"
          />
          <input
            placeholder="Width"
            className="w-full border border-gray-300 px-4 py-2 rounded-md text-sm"
          />
        </div>
      </div>
    );
  }
  