import { array, mixed, number, object, string } from "yup";
import { CreatePaginationValidationSchemaOf } from "../../../SharedSchema";
import { HealthCenterPractitionerDataValidationSchema } from "./HealthCenterPractitionerData.schema";

export const DateTypeValidationSchema = mixed<string | number>().required();

export const WorkingHoursRangeValidationSchema = object({
  from: DateTypeValidationSchema,
  to: DateTypeValidationSchema,
});

export const WorkingDateValidationSchema = object({
  date: DateTypeValidationSchema,
  workingHoursRanges: array()
    .of(WorkingHoursRangeValidationSchema)
    .min(0)
    .required(),
});

export const HealthCentersValidationSchema = object({
  centerData: HealthCenterPractitionerDataValidationSchema,
  workingDates: array().of(WorkingDateValidationSchema).min(0).required(),
});

export const HealthCentersApiDataValidationSchema =
  CreatePaginationValidationSchemaOf(array().of(HealthCentersValidationSchema));
