import { useRecoilState } from "recoil";
import { ProductViewState } from "ui";

export const useProductViewModal = () => {
  const [product, setProduct] = useRecoilState(ProductViewState);

  function showProduct(Product: typeof product) {
    setProduct(Product);
  }

  function closeProduct() {
    setProduct(null);
  }

  return {
    product,
    showProduct,
    closeProduct,
  };
};
