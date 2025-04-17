import { createApiResponseValidationSchema } from "../../SharedSchema";

import { array, number, object } from "yup";
import {
  CommonServiceDataSchema,
  ResturantMenuListValidationSchema,
  ServiceCancelationPolicies,
} from "../";

export const ResturantServiceDetailsValidationSchema =
  CommonServiceDataSchema.concat(ServiceCancelationPolicies).concat(
    object({
      menus: array().of(ResturantMenuListValidationSchema).min(0).required(),
      tablePrice: number().required(),
      vatPercent: number().required(),
    })
  );

export const ResturantServiceApiDataResponseValidationSchema =
  createApiResponseValidationSchema(ResturantServiceDetailsValidationSchema);
