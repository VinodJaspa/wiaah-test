import { Heart } from "lucide-react";
import React from "react";
import { useRouting } from "routing";
import { successToast } from "utils";

export interface ProductCardProps {
  id: string;
  name: string;
  description?: string;
  price: string;
  oldPrice?: string;
  off?: number;
  cashBack?: string;
  rating?: number;
  reviews?: number;
  image: string;
  category?: string;
  type?: string;
  onAddToCart?: (id: string) => void;
  onToggleFavorite?: (id: string) => void;
}

export const ProductCardMarket: React.FC<ProductCardProps> = ({
  id,
  name,
  description,
  price,
  oldPrice,
  off,
  cashBack,
  rating,
  reviews,
  image,
  category,
  onAddToCart,
  onToggleFavorite,
}) => {
  const { visit } = useRouting();
  const [isFav, setIsFav] = React.useState(false);

  const handleFavorite = () => {
    setIsFav(!isFav);
    onToggleFavorite?.(id);
  };

  const handleAddToCart = () => {
    successToast("Item succesfully added to cart!")
    onAddToCart?.(id);
  };

  const handleViewDetails = () => {
    visit((r) => r.visitProduct(id));
  };

  return (
    <div className="bg-white rounded-xl border hover:shadow-md transition flex flex-col h-full">
      {/* Image + heart */}
      <div className="relative group">
        <img
          src={image}
          alt={name}
          className="w-full h-40 object-cover rounded-lg bg-gray-50"
        />

        {/* Heart button */}
        <button
          className="absolute top-2 right-2 bg-white p-1 rounded-full border hover:bg-gray-100 z-10"
          onClick={handleFavorite}
        >
          <Heart size={18} className={isFav ? "text-red-500" : "text-gray-500"} />
        </button>

        {/* View Details Button (center overlay) */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
          <button
            className="px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded"
            onClick={handleViewDetails}
          >
            View Details
          </button>
        </div>
      </div>

      <div className="p-2 flex flex-col flex-1">
        {/* Name & description */}
        <h3 className="font-semibold text-gray-900 text-sm mt-2 line-clamp-2">
          {name}
        </h3>
        <p className="text-xs text-gray-500 mt-1 line-clamp-2">{description}</p>

        {/* Rating */}
        <div className="flex items-center gap-1 text-yellow-500 text-xs mt-1">
          ★ {rating}
          <span className="text-gray-400">• ({reviews} Reviews)</span>
        </div>

        {/* Price + Add to cart button */}
        <div className="mt-auto pt-2 border-t border-gray-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <span className="font-bold text-xs">{price}</span>
          <button
            className="w-full sm:w-auto px-3 py-2 border rounded-full text-sm font-medium hover:bg-gray-100"
            onClick={handleAddToCart}
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};
