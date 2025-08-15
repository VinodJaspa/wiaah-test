import { useState, useRef, useEffect } from "react";
import { IoFilterOutline } from "react-icons/io5";

// The CustomFilter component
export const CustomFilter = ({ options, selected, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleToggle = () => setIsOpen(!isOpen);
  const handleSelect = (option) => {
    onSelect(option);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block w-full sm:w-auto" ref={dropdownRef}>
      {/* Main button */}
      <button
        onClick={handleToggle}
        className={`
          flex items-center justify-between gap-2 w-full sm:w-auto px-3 sm:px-4 py-2.5 rounded-full
          border border-gray-300 text-gray-700 font-medium text-xs sm:text-sm
          transition-all hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400
          ${isOpen ? "bg-gray-200" : "bg-gray-100"}
        `}
      >
        <span>{selected?.label || "Filter by"}</span>
        <IoFilterOutline className="text-base sm:text-lg" />
      </button>

      {/* Dropdown menu */}
      {isOpen && (
        <div className="absolute top-full mt-2 w-full sm:w-48 left-0 sm:left-auto sm:right-auto rounded-lg shadow-lg bg-white border border-gray-200 z-10 max-h-60 overflow-auto">
          <ul className="py-1">
            {options.map((option) => (
              <li key={option.value}>
                <button
                  onClick={() => handleSelect(option)}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition"
                >
                  {option.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
