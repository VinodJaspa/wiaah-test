import { HiOutlineSearch } from "react-icons/hi";

export default function SearchInput() {
  return (
    <div className="flex items-center gap-2 bg-gray-100 rounded-xl px-3 py-2 w-full h-10">
      <HiOutlineSearch className="text-gray-400 text-base" />
      <input
        type="text"
        placeholder="Search products"
        className="bg-transparent w-full text-sm text-gray-700 placeholder-gray-400 border-none focus:ring-0 focus:outline-none"
      />
    </div>
  );
}
