import { createApiResponseValidationSchema } from "../../SharedSchema";
import { array, object } from "yup";
import {
  CommonServiceDataSchema,
  VehicleSearchDataValidationSchema,
} from "../Services";
import { HotelServiceDetailsValidationSchema } from "../ServicesProvider";

export const vehicleServiceProviderDetailsValidationSchema =
  CommonServiceDataSchema.concat(
    object({
      vehicles: array().of(VehicleSearchDataValidationSchema).min(0).required(),
    }).required()
  );

export const vehicleServiceProviderDetailsApiResponseValidationSchema =
  createApiResponseValidationSchema(
    vehicleServiceProviderDetailsValidationSchema
  );
