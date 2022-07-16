import * as yup from "yup";
import { PaginationReturnDataValidationSchema } from "src";

export const HealthCentersApiDataValidationSchema = yup.object().shape({
  ...PaginationReturnDataValidationSchema,
});
