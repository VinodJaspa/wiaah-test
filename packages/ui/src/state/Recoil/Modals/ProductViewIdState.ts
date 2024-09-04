import { atom } from "recoil";

export const ProductViewState = atom<{
  productType: "service" | "product";
  productId: string;
} | null>({
  key: `ProductViewState_${Date.now()}`,
  default: null,
});
