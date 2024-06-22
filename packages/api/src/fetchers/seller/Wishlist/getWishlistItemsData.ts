import { WishlistItem } from "types";
import { products } from "ui";
export const getWishlistItemsData = async (): Promise<WishlistItem[]> => {
  return [
    {
      id: "item1",
      name: "Sample Product",
      price: 99.99,
      imgUrl: "https://example.com/product.jpg",
      type: "product",
      currency: "USD",
      currencySymbol: "$",
      colors: ["Red", "Blue", "Green"],
      liked: true,
      cashback: "5% Cashback",
      discount: 10,
      oldPrice: 109.99,
      rating: 4.5,
    },
  ];
};
