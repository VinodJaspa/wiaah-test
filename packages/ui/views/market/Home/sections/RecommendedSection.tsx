import React from "react";
import { ProductCardMarket } from "../components/ProductCard";

interface Product {
  name: string;
  price: string;
  rating: number;
  reviews?: number;
  image: string;
}

interface RecommendedSectionProps {
  title: string;
  products: Product[];
}

export const RecommendedSection: React.FC<RecommendedSectionProps> = ({
  title,
  products,
}) => {
  return (
    <div className="space-y-6">
      <h2 className="text-lg font-bold text-center">{title}</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {products.map((p, idx) => (
          <ProductCardMarket
            key={idx}
            name={p.name}
            description=""
            price={p.price}
            rating={p.rating}
            reviews={p.reviews}
            image={p.image}
          />
        ))}
      </div>
    </div>
  );
};
