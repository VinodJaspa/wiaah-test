import React from "react";
interface OrderCardProps {
    id: string;
    total: string;
    image: string;
    handleOrderDetails:()=> void;
  }
  
  export default function OrderCard({ id, total, image,handleOrderDetails }: OrderCardProps) {
    return (
      <div className="flex justify-between items-center py-4 border-b" onClick={handleOrderDetails}>
        <div>
          <h3 className="font-semibold">Order #{id}</h3>
          <p className="text-sm text-gray-500">Shop: Sarah Miller | Total: ${total}</p>
          <button className="mt-2 px-4 py-1 rounded-md bg-gray-100 text-sm font-medium">
            View Details
          </button>
        </div>
        <img src={image} alt={`Order ${id}`} className="w-32 h-24 object-cover rounded-md" />
      </div>
    );
  }
  