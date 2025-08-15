import React from "react";
import { RecommendedSection } from "../sections/RecommendedSection";


export default function RecommendedPage() {
  const recommendedProducts = [
    {
      name: "Beats SoundScape Elite",
      price: "$500.99",
      rating: 4.5,
      reviews: 1200,
      image: "/images/dress-red.jpg",
    },
    {
      name: "Beats SoundScape Elite",
      price: "$500.99",
      rating: 4.5,
      reviews: 1200,
      image: "/images/dress-yellow.jpg",
    },
    // ... add all images
  ];

  return (
    <div className="p-6">
      <RecommendedSection
        title="Recommended for you"
        products={recommendedProducts}
      />
    </div>
  );
}
