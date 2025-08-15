import React, { useState } from "react";
import { CategoryTabs } from "./components/CategoryTabs";
import { ProductCard } from "@blocks";
import { HorizontalScrollSection } from "./sections/HorizontalScrollSection";
import { ProductCardMarket } from "./components/ProductCard";
import { RecommendedSection } from "./sections/RecommendedSection";
import HeroBanner from "./sections/heroBanner";


// Sample Data
const categories = ["All", "Headphones", "Clothing", "Electronics", "Gadgets", "Home and Kitchen"];

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
  // Add all others...
];

const bestPlayers = [
  {
    title: "Fashionista's Choice",
    rating: 4.5,
    image: "/images/player1.jpg",
    buttonLabel: "Add to cart",
    onButtonClick: () => alert("Added to cart"),
  },
  {
    title: "Luxury Bags",
    rating: 4.5,
    image: "/images/player2.jpg",
    buttonLabel: "Add to cart",
    onButtonClick: () => alert("Added to cart"),
  },
  // ...
];

const placesNearYou = [
  {
    title: "Hilton Walt Disney World",
    rating: 4.5,
    image: "/images/hilton1.jpg",
    buttonLabel: "Book now",
    onButtonClick: () => alert("Booked"),
  },
  // ...
];

const mostViewedVideos = [
  {
    title: "Fashionista's Choice",
    rating: 4.5,
    reviews: 1200,
    image: "/images/fashion.jpg",
    buttonLabel: "Add to cart",
    onButtonClick: () => alert("Added to cart"),
    isVideo: true,
  },
  {
    title: "Grand Haven Hotel",
    rating: 4.5,
    reviews: 1200,
    image: "/images/hotel.jpg",
    buttonLabel: "Book now",
    onButtonClick: () => alert("Booked"),
    isVideo: true,
  },
  // ...
];

const recommendedProducts = [
  {
    name: "Beats SoundScape Elite",
    price: "$500.99",
    rating: 4.5,
    reviews: 1200,
    image: "/images/dress-red.jpg",
  },
  // ...
];

export default function HomePageMarket() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProducts =
    activeCategory === "All"
      ? products
      : products.filter((p) => p.category === activeCategory);

  return (
    <div className="p-6 space-y-10">
        <HeroBanner/>
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
      <HorizontalScrollSection title="Best Players" items={bestPlayers} />

      {/* Places near you */}
      <HorizontalScrollSection title="Places near you" items={placesNearYou} />

      {/* Most viewed videos */}
      <HorizontalScrollSection title="Most viewed videos" items={mostViewedVideos} />

      {/* Recommended for you */}
      <RecommendedSection title="Recommended for you" products={recommendedProducts} />
    </div>
  );
}
