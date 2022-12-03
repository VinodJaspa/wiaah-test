import React from "react";
import { PriceDisplay } from "ui";

export interface BookedMenuCardProps {
  title: string;
  qty: number;
  price: number;
}

export const BookedMenuCard: React.FC<BookedMenuCardProps> = ({
  price,
  qty,
  title,
}) => {
  return (
    <div className={`flex justify-between gap-2 items-center py-4`}>
      <div className="flex items-center gap-4">
        <span className="text-primary font-bold">{qty}x</span>
        <p className="font-semibold">{title}</p>
      </div>
      <PriceDisplay className="font-bold" price={price} />
    </div>
  );
};
