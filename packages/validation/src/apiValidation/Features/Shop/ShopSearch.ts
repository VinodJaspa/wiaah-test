import {
  CreatePaginationApiResponseValidationSchemaOf,
  Location,
} from "../../SharedSchema";
import { array, number, object, string } from "yup";

export const CategoryValidationSchema = object({
  name: string().required(),
  icon: string().required(),
});

export const ShopMapSearchDataValidationSchema = object({
  id: string().required(),
  thumbnail: string().required(),
  name: string().required(),
  rate: number().required(),
  categories: array().of(CategoryValidationSchema.required()).min(0).required(),
  location: Location().required(),
  description: string().required(),
  reviews: number().required(),
  price: number().required(),
});

export const ShopsMapSearchDataApiResponseValidationSchema =
  CreatePaginationApiResponseValidationSchemaOf(
    ShopMapSearchDataValidationSchema,
  );
