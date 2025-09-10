import React from 'react';
import { Heart } from 'lucide-react';

interface ProductCardProps {
  id: string;
  image: string;
  name: string;
  price: string;
  oldPrice: string;
  discount: string;
  rating: number;
  cashback: boolean;
  onToggleFavorite: (id: string) => void;
  onProductClick: (id: string) => void;
}

export const ProductSearchViewCardMarket: React.FC<ProductCardProps> = ({
  id,
  image,
  name,
  price,
  oldPrice,
  discount,
  rating,
  cashback,
  onToggleFavorite,
  onProductClick,
}) => {
  const [isFav, setIsFav] = React.useState(false);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFav(!isFav);
    onToggleFavorite(id);
  };

  const handleCardClick = () => {
    onProductClick(id);
  };

  const renderStars = (rate: number) => {
    const fullStars = Math.floor(rate);
    const halfStar = rate % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    return (
      <div className="flex text-yellow-400 text-sm">
        {Array.from({ length: fullStars }).map((_, i) => (
          <span key={`full-${i}`}>★</span>
        ))}
        {halfStar && <span className="text-gray-300">★</span>}
        {Array.from({ length: emptyStars }).map((_, i) => (
          <span key={`empty-${i}`} className="text-gray-300">★</span>
        ))}
      </div>
    );
  };

  return (
    <div 
      className="group relative flex flex-col w-full bg-white rounded-lg overflow-hidden cursor-pointer shadow-sm hover:shadow-lg transition-shadow duration-300"
      onClick={handleCardClick}
    >
      {/* Product Image and Overlays */}
      <div className="relative w-full aspect-square overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {cashback && (
          <span className="absolute top-2 left-2 px-2 py-1 text-xs font-semibold bg-white rounded-full shadow-md">
            5% Cashback
          </span>
        )}
        <button
          className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md z-10"
          onClick={handleFavoriteClick}
        >
          <Heart 
            size={18} 
            className={isFav ? "text-red-500 fill-red-500" : "text-gray-500"} 
          />
        </button>
      </div>

      {/* Product Details */}
      <div className="flex flex-col p-4">
        <h3 className="text-lg font-semibold text-gray-800 line-clamp-2">{name}</h3>
        <div className="flex items-center space-x-1 mt-1">
          {renderStars(rating)}
          <span className="text-gray-500 text-sm">({rating.toFixed(1)})</span>
        </div>
        
        <div className="mt-2 flex items-baseline justify-between">
          <span className="text-xl font-bold text-gray-900">{price}</span>
          <span className="text-sm text-gray-500 line-through">{oldPrice}</span>
        </div>
        <span className="text-red-500 text-sm font-semibold">{discount}</span>
      </div>
    </div>
  );
};