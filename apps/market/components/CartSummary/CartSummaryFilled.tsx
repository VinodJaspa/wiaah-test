import React from "react";
import { CartSummaryItem } from "types/market/CartSummary";

export interface CartSummaryFilledProps {
  items: CartSummaryItem[];
}

const CartSummaryFilled: React.FC<CartSummaryFilledProps> = ({ items }) => {
  return <div></div>;
};

export default CartSummaryFilled;
