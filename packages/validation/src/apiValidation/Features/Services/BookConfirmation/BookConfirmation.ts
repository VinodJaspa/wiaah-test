import { createApiResponseValidationSchema } from "../../../SharedSchema";
import { CheckoutDataValidationTester } from "../Checkout";
import { array, object, string } from "yup";
import {
  ServiceReachOutDataValidationSchema,
  ServiceWorkingDaysValidationSchema,
} from "../common";

const periodsValidationSchema = array()
  .of(string().required())
  .length(2)
  .required();

// Define the validation schema for each weekday
const weekdayValidationSchema = object().shape({
  periods: periodsValidationSchema,
});

// Define the validation schema for the weekdays object
const weekdaysValidationSchema = object().shape({
  mo: weekdayValidationSchema,
  tu: weekdayValidationSchema,
  we: weekdayValidationSchema,
  th: weekdayValidationSchema,
  fr: weekdayValidationSchema,
  sa: weekdayValidationSchema,
  su: weekdayValidationSchema,
});

// Define the validation schema for the workingHours object
const workingHoursValidationSchema = object().shape({
  id: string().required(),
  weekdays: weekdaysValidationSchema,
});

// Define the validation schema for the entire BookConfirmationWorkingDays object
export const BookConfirmationWorkingDaysValidationSchema = object().shape({
  workingHours: workingHoursValidationSchema,
});

export const BookConfirmationValidationSchema = object({
  propertyData: CheckoutDataValidationTester,
  bookedId: string().required(),
  reactOut: ServiceReachOutDataValidationSchema.required(),
  workingDays: BookConfirmationWorkingDaysValidationSchema.required(),
});

export const BookConfirmationApiResponseValidationSchema =
  createApiResponseValidationSchema(BookConfirmationValidationSchema);
