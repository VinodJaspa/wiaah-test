import { AsyncReturnType } from "types";
import {
  CheckValidation,
  InferType,
  ShoppingCartApiResponseValidationSchema,
  ShoppingCartItemData,
} from "validation";

export type ShoppingCartItemType = InferType<typeof ShoppingCartItemData>;

export const getMyShoppingCartFetcher = (): Promise<
  InferType<typeof ShoppingCartApiResponseValidationSchema>
> => {
  const res: AsyncReturnType<typeof getMyShoppingCartFetcher> = {
    data: [
      {
        data: {
          id: "12",
          name: "product name",
          price: 25,
          qty: 2,
          thumbnail: "/shop-2.jpeg",
        },
        type: "product",
      },
      {
        type: "service",
        data: {
          id: "123",
          at: new Date().toString(),
          name: "Service name",
          price: 31,
          thumbnail: "/shop.jpeg",
          serviceType: "Hotel",
        },
      },
      {
        type: "service",
        data: {
          id: "123",
          at: new Date().toString(),
          name: "Service name",
          price: 31,
          thumbnail: "/shop.jpeg",
          serviceType: "Restaurant",
        },
      },
    ],
  };
  return CheckValidation(ShoppingCartApiResponseValidationSchema, res);
};
