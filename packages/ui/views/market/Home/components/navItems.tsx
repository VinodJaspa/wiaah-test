import React from "react";

// ✅ Navigation Component
export function CategoryNav() {
  const categories = [
    "Headphones",
    "Clothing",
    "Electronics",
    "Gadgets",
    "Home and Kitchen",
    "Beauty",
    "Stationery",
    "Stationery",
  ];

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
        <div className="flex items-center gap-6 overflow-x-auto whitespace-nowrap">
          <button className="text-xl font-medium">☰ All</button>
          {categories.map((item, index) => (
            <button
              key={index}
              className="text-gray-700 hover:text-black transition"
            >
              {item}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}

