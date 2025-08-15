import React, { useState } from "react";
import { CategoryTabs } from "./components/CategoryTabs";
import { ProductCard } from "@blocks";
import { HorizontalScrollSection } from "./sections/HorizontalScrollSection";
import { ProductCardMarket } from "./components/ProductCard";
import { RecommendedSection } from "./sections/RecommendedSection";
import HeroBanner from "./sections/heroBanner";
import { IoFilterOutline } from "react-icons/io5";

import {
  products,
  bestPlayers,
  placesNearYou,
  mostViewedVideos,
  recommendedProducts,
} from "./facker";
import { CustomFilter } from "./components/Filter";
import BestShopsSection from "./sections/BestShopsSection";

// Sample Data
const categories = [
  "All",
  "Headphones",
  "Clothing",
  "Electronics",
  "Gadgets",
  "Home and Kitchen",
  "Toys",
  "Sports and Fitness",
  "Automotive",
  "Furniture"
];



export default function HomePageMarket() {
  const [activeCategory, setActiveCategory] = useState("All");
  console.log(products, "ducts");
  const statusOptions = [
    { value: "", label: "Status" },
    { value: "online", label: "Online" },
    { value: "out_of_stock", label: "Out of Stock" },
  ];
  const options = [
    { value: "all", label: "All Products" },
    { value: "electronics", label: "Electronics" },
    { value: "apparel", label: "Apparel" },
    { value: "books", label: "Books" },
    { value: "home", label: "Home Goods" },
  ];

  const [selectedOption, setSelectedOption] = useState(options[0]);
  const filteredProducts =
    activeCategory === "All"
      ? products
      : products.filter((p) => p.category === activeCategory);

  return (
    <div className="p-4 space-y-2">
      <HeroBanner />
      {/* Best sales by categories */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
          <h2 className="text-xl font-bold">Best sales by categories</h2>
          <CustomFilter
            options={options}
            selected={selectedOption}
            onSelect={setSelectedOption}
          />
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

      {/* Best Shops */}
      <div className="space-y-6">

        <BestShopsSection />
      </div>

      {/* Places near you */}

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
