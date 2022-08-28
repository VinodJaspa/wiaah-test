import { createApiResponseValidationSchema } from "../../SharedSchema";
import { array, InferType, mixed, number, object, string } from "yup";

export const stringDate = () =>
  mixed<string>().test({
    name: "date",
    message: "date must be a valid string date",
    test: (v) => !isNaN(Date.parse(v || "")),
  });

export type CartSummaryItem =
  | {
      type: "product";
      data: InferType<typeof ShoppingCartProductItemDataValidationSchema>;
    }
  | {
      type: "service";
      data: InferType<typeof ShoppingCartServiceItemDataValidationSchema>;
    };

export const ShoppingCartProductItemDataValidationSchema = object({
  id: string().required(),
  name: string().required(),
  price: number().required(),
  qty: number().required(),
  thumbnail: string().required(),
});

export const ShoppingCartServiceItemDataValidationSchema = object({
  id: string().required(),
  name: string().required(),
  price: number().required(),
  thumbnail: string().required(),
  at: stringDate(),
  serviceType: string().required(),
});

export const ShoppingCartItemData = mixed<CartSummaryItem>()
  .test({
    name: "Cart Summary Item",
    message: "Cart Summary Item type and data doesnt match",
    test: (v) => {
      try {
        console.log(v);
        if (!v) return false;
        switch (v?.type) {
          case "product":
            ShoppingCartProductItemDataValidationSchema.validateSync(v.data);
            break;
          case "service":
            ShoppingCartServiceItemDataValidationSchema.validateSync(v.data);
            break;
          default:
            return false;
        }
        return true;
      } catch {
        return false;
      }
    },
  })
  .required();

export const ShoppingCartApiResponseValidationSchema =
  createApiResponseValidationSchema(
    array().of(ShoppingCartItemData.required()).min(0).required()
  );
