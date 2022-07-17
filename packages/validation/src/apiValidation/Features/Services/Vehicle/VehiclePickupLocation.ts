import {
  PaginationReturnDataValidationSchema,
  PaginationDataIndexKey,
} from "validation";
import { object, string, number, array, ArraySchema } from "yup";
import { PaginationConstants } from "../../../index";

console.log("index key 2 ", typeof PaginationReturnDataValidationSchema);
export const VehiclePickupLocationValidationSchema = object({
  address: string().required(),
  city: string().required(),
}).required();

export const VehiclePickupLocationsApiResponseValidationSchema = object({
  ...PaginationReturnDataValidationSchema,
  ["data"]: array().of(VehiclePickupLocationValidationSchema).min(0).required(),
}).required();
