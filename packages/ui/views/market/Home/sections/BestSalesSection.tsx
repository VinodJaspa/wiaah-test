
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ProductCardMarket } from "../components/ProductCard";
import { CategoryTabs } from "../components/CategoryTabs";

export default function BestSalesSection({
  categories,
  activeCategory,
  setActiveCategory,
  filteredProducts
}) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <h2 className="text-2xl font-bold text-center">Best sales by categories</h2>

      {/* Categories with arrows */}
      <div className="flex items-center justify-center gap-2">
        <button className="p-2 bg-black text-white rounded-full hover:bg-gray-800">
          <ChevronLeft size={18} />
        </button>

        <CategoryTabs
          categories={categories}
          active={activeCategory}
          onSelect={setActiveCategory}
        />

        <button className="p-2 bg-black text-white rounded-full hover:bg-gray-800">
          <ChevronRight size={18} />
        </button>
      </div>

      {/* Section title + filter */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Headphones for you</h3>
        <button className="px-4 py-1 border rounded-full text-sm hover:bg-gray-100 flex items-center gap-1">
          Filter by
          <span className="text-lg">⌄</span>
        </button>
      </div>

      {/* Product grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {filteredProducts.map((p, idx) => (
          <ProductCardMarket key={idx} {...p} />
        ))}
      </div>
    </div>
  );
}
