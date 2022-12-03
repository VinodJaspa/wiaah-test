import { CreatePaginationValidationSchemaOf } from "../../SharedSchema";
import { array, boolean, mixed, number, object, string } from "yup";

export type CashbackType = "percent" | "cash";

export const CashbackValidationSchema = object({
  amount: number().required(),
  type: mixed<CashbackType>()
    .oneOf<CashbackType>(["cash", "percent"])
    .required(),
});

export const Cashback = () => CashbackValidationSchema;

export const ProductValidationSchema = object({
  id: string().required(),
  shopId: string().required(),
  name: string().required(),
  price: number().required(),
  thumbnail: string().required(),
  colors: array().of(string().required()).min(0).required(),
  liked: boolean().required(),
  cashback: Cashback().required(),
  discount: number().required(),
  rating: number().required(),
});

export const ProductsApiResponseValidationSchema =
  CreatePaginationValidationSchemaOf(
    array().of(ProductValidationSchema.required()).min(0).required()
  );
