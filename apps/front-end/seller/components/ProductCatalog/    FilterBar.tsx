import { HiChevronDown } from "react-icons/hi";

export default function FilterBar() {
  return (
    <div className="flex items-center gap-3 mb-4">
      {/* Status Dropdown */}
      <div className="relative">
        <select
          className="appearance-none border-none h-10 px-4 pr-10 text-sm text-gray-700 bg-gray-100 rounded-xl focus:outline-none focus:ring-0"
        >
          <option className="bg-white text-gray-700">Status</option>
  <option className="bg-white text-gray-700">Online</option>
  <option className="bg-white text-gray-700">Out of Stock</option>
        </select>
        <HiChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none" />
      </div>

      {/* Category Dropdown */}
      <div className="relative">
        <select
          className="appearance-none border-none h-10 px-4 pr-10 text-sm text-gray-700 bg-gray-100 rounded-xl focus:outline-none focus:ring-0"
        >
          <option>Category</option>
          <option>Audio</option>
          <option>Books</option>
        </select>
        <HiChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none" />
      </div>
    </div>
  );
}
