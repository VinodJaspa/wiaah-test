import { Heart } from "lucide-react";

interface ProductCardProps {
  name: string;
  description: string;
  price: string;
  rating: number;
  reviews: number;
  image: string;
}

export const ProductCardMarket: React.FC<ProductCardProps> = ({
  name,
  description,
  price,
  rating,
  reviews,
  image,
}) => {
  return (
    <div className="bg-white rounded-xl border hover:shadow-md transition flex flex-col h-full">
      {/* Image + heart */}
      <div className="relative">
        <img
          src={image}
          alt={name}
          className="w-full h-40 object-cover rounded-lg bg-gray-50"
        />
        <button className="absolute top-2 right-2 bg-white p-1 rounded-full border hover:bg-gray-100">
          <Heart size={18} className="text-gray-500" />
        </button>
      </div>

      <div className="p-2 flex flex-col flex-1">
        {/* Name & description */}
        <h3 className="font-semibold text-gray-900 text-sm mt-2 line-clamp-2">{name}</h3>
        <p className="text-xs text-gray-500 mt-1 line-clamp-2">{description}</p>

        {/* Rating */}
        <div className="flex items-center gap-1 text-yellow-500 text-xs mt-1">
          ★ {rating}
          <span className="text-gray-400">• ({reviews} Reviews)</span>
        </div>

        {/* Price + Add to cart button */}
        <div className="mt-auto pt-2 border-t border-gray-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <span className="font-bold text-xs">{price}</span>
          <button className="w-full sm:w-auto px-3 py-2 border rounded-full text-sm font-medium hover:bg-gray-100">
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};
