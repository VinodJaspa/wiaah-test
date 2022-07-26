import {
  createApiResponseValidationSchema,
  Location,
} from "../../SharedSchema";
import { boolean, number, object, string } from "yup";

export const ShopDetialsValidationSchema = object({
  name: string().required(),
  id: string().required(),
  description: string().required(),
  rating: number().required(),
  createdAt: string().required(),
  thumbnail: string().required(),
  verified: boolean().required(),
  location: Location().required(),
});

export const ShopDetialsApiResponseValidationSchema =
  createApiResponseValidationSchema(ShopDetialsValidationSchema);
