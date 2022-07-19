import * as yup from "yup";
import { PaginationReturnDataValidationSchema } from "../../../../";

export const HealthCentersApiDataValidationSchema = yup.object().shape({
  ...PaginationReturnDataValidationSchema,
});
