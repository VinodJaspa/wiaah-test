import ImageTopbadge from "@UI/components/shadcn-components/components/imageTopbadge";
import { Heart } from "lucide-react";
import React from "react";
import { useTranslation } from "react-i18next";
import { IoHeartOutline, IoHeart, IoTrash } from "react-icons/io5"; // Keep these for existing functionality, though the SS only shows Heart
import { useRouting } from "routing";
import { usePreferedCurrency } from "state"; // Assuming this hook provides currency symbol

// Assuming these are simple components that render an image, price, and rate.
// You might need to adjust their props based on your actual implementation.
const Image = ({ src, alt, className }: { src: string; alt: string; className?: string }) => (
  <img src={src} alt={alt} className={className} />
);
const PriceDisplay = ({ price, currencySymbol, oldPrice, discount }: { price: number; currencySymbol: string; oldPrice?: number; discount?: number }) => (
  <div className="flex items-baseline gap-2">
    <span className="text-sm font-bold text-gray-900">
      {currencySymbol}{price.toFixed(2)}
    </span>
    {oldPrice && (
      <span className="text-sm text-gray-500 line-through">
        {currencySymbol}{oldPrice.toFixed(2)}
      </span>
    )}
    {discount && (
      <span className="text-sm font-semibold text-red-500 ml-auto">
        Save {discount}%
      </span>
    )}
  </div>
);
const Rate = ({ rating, className }: { rating: number; className?: string }) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  return (
    <div className={`flex text-yellow-400 ${className}`}>
      {Array.from({ length: fullStars }).map((_, i) => (
        <span key={`full-${i}`}>★</span>
      ))}
      {halfStar && <span className="text-gray-300">★</span>} {/* You can use a half-star icon if available */}
      {Array.from({ length: emptyStars }).map((_, i) => (
        <span key={`empty-${i}`} className="text-gray-300">★</span>
      ))}
      <span className="text-gray-500 text-sm ml-1">({rating.toFixed(1)})</span>
    </div>
  );
};


export interface ProductCardProps {
  buttonText?: string; // This will now be "Add to cart" on hover
  full?: boolean; // Controls width, but `w-full` in grid handles most cases
  liked?: boolean;
  onLike?: (id: string) => void;
  onButtonClick?: (id: string) => void; // This is now the "Add to cart" button click
  id: string;
  price: number;
  oldPrice?: number; // Added for explicit old price
  thumbnail: string;
  cashback?: number; // In percentage
  discount?: number; // In percentage
  rate: number;
  name: string;
}

export const ProductSearchViewCard: React.FC<ProductCardProps> = ({
  id,
  price,
  oldPrice,
  thumbnail,
  liked,
  cashback,
  discount,
  rate,
  name,
  onLike,
  onButtonClick,
}) => {
  const { preferedCurrency } = usePreferedCurrency(); // Assuming this hook works
  const [isFav, setIsFav] = React.useState(liked || false);
  const [hovered, setHovered] = React.useState(false);
 const { visit } = useRouting();

  const handleLikeClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click
    setIsFav(!isFav);
    onLike?.(id);
  };

  const handleAddToCartClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click
    onButtonClick?.(id);
  };
  const handleViewDetails = () => {
    visit((r) => r.visitProduct(id));
  };
  const { t } = useTranslation();
  return (
    <div
      className="group relative flex flex-col w-full bg-white rounded-lg overflow-hidden cursor-pointer shadow-sm hover:shadow-lg transition-shadow duration-300"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      // Assuming the whole card is clickable for product details
      onClick={() => console.log("Navigate to product details:", id)}
    >
      {/* Product Image and Overlays */}
      <div className="relative w-full aspect-square overflow-hidden bg-gray-50"> {/* aspect-square to maintain ratio */}
        <Image className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" src={thumbnail} alt={name} />

        {/* Cashback Badge */}
        {cashback && (
          <ImageTopbadge text={`${cashback}% ${t("Cashback")}`} />
       
        )}

        {/* Heart Icon */}
        <button
          className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md z-10"
          onClick={handleLikeClick}
        >
          <Heart
            size={18}
            className={isFav ? "text-red-500 fill-red-500" : "text-gray-500"}
          />
        </button>

        {/* "Add to cart" button on hover */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
          <button
            className="px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded"
            onClick={handleViewDetails}
          >
            View Details
          </button>
        </div>
      </div>

      {/* Product Details */}
      <div className="flex flex-col p-4 space-y-1">
      <h3 className="font-semibold text-gray-900 text-sm mt-2 line-clamp-2">
          {name}
        </h3>
        {/* <p className="text-xs text-gray-500 mt-1 line-clamp-2">{description}</p> */}
        <div className="flex items-center space-x-1">
          <Rate className="text-sm" rating={rate} />
        </div>

        <PriceDisplay
          price={price}
          currencySymbol={preferedCurrency.currencySymbol}
          oldPrice={oldPrice}
          discount={discount}
        />
        
      </div>
    </div>
  );
};