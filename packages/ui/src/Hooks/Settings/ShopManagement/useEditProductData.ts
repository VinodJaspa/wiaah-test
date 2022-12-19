import { useRecoilState } from "recoil";
import { EditProductState } from "@UI";

export const useEditProductData = () => {
  const [product, setProduct] = useRecoilState(EditProductState);
  const isNewProduct = product === null;

  function EditProduct(productId: string) {
    if (typeof productId === "string") {
      setProduct(productId);
    }
  }

  function AddNewProduct() {
    setProduct(null);
  }

  function cancel() {
    setProduct(undefined);
  }

  return {
    product,
    isNewProduct,
    AddNewProduct,
    EditProduct,
    cancel,
  };
};
