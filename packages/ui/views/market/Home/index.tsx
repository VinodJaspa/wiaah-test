import React, { useState } from "react";
import { CategoryTabs } from "./components/CategoryTabs";
import { ProductCard } from "@blocks";
import { HorizontalScrollSection } from "./sections/HorizontalScrollSection";
import { ProductCardMarket } from "./components/ProductCard";
import { RecommendedSection } from "./sections/RecommendedSection";
import HeroBanner from "./sections/heroBanner";

import {
  products,
  bestPlayers,
  placesNearYou,
  mostViewedVideos,
  recommendedProducts,
} from "./facker";
// Sample Data
const categories = ["All", "Headphones", "Clothing", "Electronics", "Gadgets", "Home and Kitchen"];



export default function HomePageMarket() {
  const [activeCategory, setActiveCategory] = useState("All");
console.log(products ,"ducts");

  const filteredProducts =
    activeCategory === "All"
      ? products
      : products.filter((p) => p.category === activeCategory);

  return (
    <div className="p-6 space-y-10">
      <HeroBanner />
      {/* Best sales by categories */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">Best sales by categories</h2>
          <button className="px-4 py-2 border rounded-full text-sm hover:bg-gray-100">
            Filter by ▼
          </button>
        </div>
        <CategoryTabs
          categories={categories}
          active={activeCategory}
          onSelect={setActiveCategory}
        />
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {filteredProducts.map((p, idx) => (
            <ProductCardMarket key={idx} {...p} />
          ))}
        </div>
      </div>

      {/* Best Players */}
      <HorizontalScrollSection
        title="Best Players"
        items={bestPlayers}
        buttonLabel="Add to cart"
        onButtonClick={() => alert("Added to cart")}
      />

      {/* Places near you */}
      =
      <HorizontalScrollSection
        title="Places near you" items={placesNearYou}
        buttonLabel="Add to cart"
        onButtonClick={() => alert("Added to cart")}
      />

      {/* Most viewed videos */}
      <HorizontalScrollSection
        title="Most viewed videos" items={mostViewedVideos}
        buttonLabel="Add to cart"
        onButtonClick={() => alert("Added to cart")}
        />


        {/* Recommended for you */}
      <RecommendedSection title="Recommended for you" products={recommendedProducts} />
    </div>
  );
}
