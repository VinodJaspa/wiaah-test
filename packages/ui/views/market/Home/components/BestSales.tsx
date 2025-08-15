// pages/BestSales.tsx
import React, { useState } from "react";
import { CategoryTabs } from "../components/CategoryTabs";
import {  ProductCardMarket } from "../components/ProductCard";

const products = [
  {
    name: "Beats SoundScape Elite",
    description: "True sound, Ultra high bass",
    price: "$500.99",
    rating: 4.5,
    reviews: 1200,
    image: "/images/beats-black.png",
    category: "Headphones",
  },
  {
    name: "Razer Basilisk Hyper Sound",
    description: "True sound, Ultra high bass",
    price: "$500.99",
    rating: 4.5,
    reviews: 2000,
    image: "/images/razer-green.png",
    category: "Electronics",
  },
  // ... Add more
];

const categories = ["All", "Headphones", "Clothing", "Electronics", "Gadgets", "Home and Kitchen"];

export default function BestSales() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProducts =
    activeCategory === "All"
      ? products
      : products.filter((p) => p.category === activeCategory);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <h2 className="text-xl font-bold">Best sales by categories</h2>
        <button className="px-4 py-2 border rounded-full text-sm hover:bg-gray-100">
          Filter by ▼
        </button>
      </div>

      {/* Category Tabs */}
      <CategoryTabs
        categories={categories}
        active={activeCategory}
        onSelect={setActiveCategory}
      />

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map((p, idx) => (
          <ProductCardMarket key={idx} {...p} />
        ))}
      </div>
    </div>
  );
}
