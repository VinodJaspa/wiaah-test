import React from "react";
import { ChevronDown } from "lucide-react";
import { IoIosArrowDown } from "react-icons/io";

interface FilterSectionProps {
  title: string;
  children: React.ReactNode;
}

const FilterSection: React.FC<FilterSectionProps> = ({ title, children }) => {
  const [isOpen, setIsOpen] = React.useState(true);
  return (
    <div className="border-b py-4">
      <button
        className="flex items-center justify-between w-full text-lg font-semibold text-gray-800"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{title}</span>
        <IoIosArrowDown
          className={`h-5 w-5 transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-96 opacity-100 mt-2" : "max-h-0 opacity-0"
          }`}
      >
        {children}
      </div>
    </div>
  );
};

interface ShopProductFilterProps {
  // Add props to control the filter options if they are dynamic
  priceRange?: { min: number; max: number };
  categories?: { name: string; id: string }[];
  sizes?: string[];
  colors?: string[];
  brands?: string[];
}

export const ShopProductFilter: React.FC<ShopProductFilterProps> = ({
  priceRange,
  categories,
  sizes,
  colors,
  brands,
}) => {
  return (
    <div className="flex flex-col p-6 bg-white rounded-lg shadow-sm w-80">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">Filters</h2>
        <button className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
          Clear Filters
        </button>
      </div>

      <FilterSection title="Category">
        {/* Replace with your actual filter component, e.g., checkboxes, radio buttons */}
        <div className="h-6 w-full bg-gray-200 rounded-full animate-pulse"></div>
      </FilterSection>

      <FilterSection title="Price Range">
        {/* A simple placeholder for a price range slider */}
        <div className="h-2 w-full bg-gray-200 rounded-full relative">
          <div className="h-2 bg-blue-500 rounded-full absolute left-1/4 w-1/2"></div>
        </div>
        <div className="flex justify-between text-xs mt-2 text-gray-500">
          <span>Min: ${priceRange?.min || 0}</span>
          <span>Max: ${priceRange?.max || 1000}</span>
        </div>
      </FilterSection>

      <FilterSection title="Size">
        {/* Placeholder for size options */}
        <div className="h-6 w-full bg-gray-200 rounded-full animate-pulse"></div>
      </FilterSection>

      <FilterSection title="Color">
        {/* Placeholder for color options */}
        <div className="h-6 w-full bg-gray-200 rounded-full animate-pulse"></div>
      </FilterSection>

      <FilterSection title="Brand">
        {/* Placeholder for brand options */}
        <div className="h-6 w-full bg-gray-200 rounded-full animate-pulse"></div>
      </FilterSection>
    </div>
  );
};