import { createApiResponseValidationSchema } from "../../../SharedSchema";
import { CheckoutDataValidationTester } from "../Checkout";
import { object, string } from "yup";
import {
  ServiceReachOutDataValidationSchema,
  ServiceWorkingDaysValidationSchema,
} from "../common";

export const BookConfirmationValidationSchema = object({
  propertyData: CheckoutDataValidationTester,
  bookedId: string().required(),
  reactOut: ServiceReachOutDataValidationSchema.required(),
}).concat(ServiceWorkingDaysValidationSchema);

export const BookConfirmationApiResponseValidationSchema =
  createApiResponseValidationSchema(BookConfirmationValidationSchema);
