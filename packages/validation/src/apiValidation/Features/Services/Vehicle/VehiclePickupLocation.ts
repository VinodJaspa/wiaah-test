import { CreatePaginationValidationSchemaOf } from "../../../SharedSchema";
import { object, string, array } from "yup";

export const VehiclePickupLocationValidationSchema = object({
  address: string().required(),
  city: string().required(),
}).required();

const arraySchema = array()
  .of(VehiclePickupLocationValidationSchema)
  .min(0)
  .required();

export const VehiclePickupLocationsApiResponseValidationSchema =
  CreatePaginationValidationSchemaOf(arraySchema);
