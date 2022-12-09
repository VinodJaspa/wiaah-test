import { atom } from "recoil";

export const ProductViewState = atom<{
  productType: "service" | "product";
  productId: string;
} | null>({
  key: "ProductViewState",
  default: null,
});
