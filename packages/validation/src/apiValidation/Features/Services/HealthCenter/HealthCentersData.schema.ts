import * as yup from "yup";
import { PaginationReturnDataValidationSchema } from "validation";

export const HealthCentersApiDataValidationSchema = yup.object().shape({
  ...PaginationReturnDataValidationSchema,
});
