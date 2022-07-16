import { object, array } from "yup";
import { CreatePaginationValidationSchemaOf } from "src";
import { HealthCenterSpecialtySearchValidationSchema } from "./HealthCenterSpecialty.schema";
import { HealthCenterPractitionerSearchDataValidationSchema } from "./HealthCenterPractitionerData.schema";

export const HealthCenterSuggestionsValidationSchema = object().shape({
  specialties: array(HealthCenterSpecialtySearchValidationSchema),
  practitioners: array(HealthCenterPractitionerSearchDataValidationSchema),
});

export const HealthCenterSuggestionsApiDataValidationSchema =
  CreatePaginationValidationSchemaOf(HealthCenterSuggestionsValidationSchema);
