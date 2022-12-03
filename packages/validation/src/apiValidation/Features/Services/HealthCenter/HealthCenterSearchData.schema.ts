import { object, array } from "yup";
import { CreatePaginationValidationSchemaOf } from "../../../SharedSchema";
import { HealthCenterSpecialtySearchValidationSchema } from "./HealthCenterSpecialty.schema";
import { HealthCenterPractitionerSearchDataValidationSchema } from "./HealthCenterPractitionerData.schema";

export const HealthCenterSuggestionsValidationSchema = object()
  .required()
  .shape({
    specialties: array()
      .required()
      .of(HealthCenterSpecialtySearchValidationSchema),
    practitioners: array()
      .required()
      .of(HealthCenterPractitionerSearchDataValidationSchema),
  });

export const HealthCenterSuggestionsApiDataValidationSchema =
  CreatePaginationValidationSchemaOf(HealthCenterSuggestionsValidationSchema);
