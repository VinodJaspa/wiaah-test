import React, { useRef } from 'react';
import { AiOutlineDoubleLeft } from "react-icons/ai";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";

interface CategoryTabsProps {
  categories: string[];
  active: string;
  onSelect: (category: string) => void;
}

export const CategoryTabs: React.FC<CategoryTabsProps> = ({
  categories,
  active,
  onSelect,
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const { scrollLeft, clientWidth } = scrollContainerRef.current;
      const scrollAmount = clientWidth / 2; // Scroll half a screen width
      const newScrollLeft = direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount;
      
      scrollContainerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="relative flex items-center w-full justify-between">
      {/* Left scroll button */}
      <button 
        onClick={() => scroll('left')}
        className="flex items-center justify-center p-2 rounded-full border bg-white shadow-md text-gray-700 hover:bg-gray-100 transition focus:outline-none"
      >
        <AiOutlineDoubleLeft />
      </button>

      {/* Scrollable tabs container */}
      <div 
        ref={scrollContainerRef} 
        className="flex-1 flex justify-center overflow-x-auto scrollbar-hide px-2"
      >
        <div className="flex gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => onSelect(cat)}
              className={`px-4 py-2 rounded-full border text-sm font-medium whitespace-nowrap transition ${
                active === cat
                  ? "bg-black text-white border-black"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Right scroll button */}
      <button 
        onClick={() => scroll('right')}
        className="flex items-center justify-center p-2 rounded-full border bg-white shadow-md text-gray-700 hover:bg-gray-100 transition focus:outline-none"
      >
        <MdKeyboardDoubleArrowRight />
      </button>
    </div>
  );
};
