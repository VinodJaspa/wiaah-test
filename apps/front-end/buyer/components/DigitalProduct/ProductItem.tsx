// components/ProductItem.tsx
import React from "react";

interface ProductItemProps {
  imageSrc: string;
  title: string;
  orderId: string;
  onViewDetails: () => void;
  onDownload: () => void;
}

const ProductItem: React.FC<ProductItemProps> = ({
  imageSrc,
  title,
  orderId,
  onViewDetails,
  onDownload,
}) => {
  return (
    <div className="flex justify-between items-center py-4">
      <div className="flex items-center gap-4">
        <img src={imageSrc} alt={title} className="w-12 h-12 rounded-md" />
        <div>
          <h4 className="font-medium">{title}</h4>
          <p className="text-gray-500 text-sm">Order #{orderId}</p>
        </div>
      </div>
      <div className="flex gap-3">
        <button
          onClick={onViewDetails}
          className="px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded"
        >
          View Details
        </button>
        <button
          onClick={onDownload}
          className="px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded"
        >
          Download
        </button>
      </div>
    </div>
  );
};

export default ProductItem;
