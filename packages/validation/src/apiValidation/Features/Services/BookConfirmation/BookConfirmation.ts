import { createApiResponseValidationSchema } from "../../../SharedSchema";
import { ServiceCheckoutDataValidationTester } from "../Checkout";
import { object, string } from "yup";
import {
  ServiceReachOutDataValidationSchema,
  ServiceWorkingDaysValidationSchema,
} from "../common";

export const BookConfirmationValidationSchema = object({
  propertyData: ServiceCheckoutDataValidationTester,
  bookedId: string().required(),
  reactOut: ServiceReachOutDataValidationSchema.required(),
}).concat(ServiceWorkingDaysValidationSchema);

export const BookConfirmationApiResponseValidationSchema =
  createApiResponseValidationSchema(BookConfirmationValidationSchema);
