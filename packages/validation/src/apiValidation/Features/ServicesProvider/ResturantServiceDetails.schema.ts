import { createApiResponseValidationSchema } from "../../SharedSchema";
import { HotelServiceProviderPolicicesValidationSchema } from "../../";
import { array, number, object } from "yup";
import {
  CommonServiceDataSchema,
  ResturantMenuListValidationSchema,
} from "../";

export const ResturantServiceDetailsValidationSchema =
  CommonServiceDataSchema.concat(
    object({
      menus: array().of(ResturantMenuListValidationSchema).min(0).required(),
      policies: HotelServiceProviderPolicicesValidationSchema,
      tablePrice: number().required(),
    })
  );

export const ResturantServiceApiDataResponseValidationSchema =
  createApiResponseValidationSchema(ResturantServiceDetailsValidationSchema);
