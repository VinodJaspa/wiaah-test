import React from "react";
import { ProductCardMarket } from "../components/ProductCard";

interface Product {
  name: string;
  price: string;
  rating: number;
  reviews?: number;
  image: string;
  id:string;
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
    <div className="">
      {/* Title */}
      <h2 className="text-base sm:text-lg md:text-xl font-bold text-start mb-4">
        {title}
      </h2>

      {/* Grid of products */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        {products.map((p, idx) => (
          <ProductCardMarket
            key={idx}
            name={p.name}
            description=""
            price={p.price}
            rating={p.rating}
            reviews={p.reviews}
            image={p.image}
            id={p?.id}
          />
        ))}
      </div>
    </div>
  );
};
