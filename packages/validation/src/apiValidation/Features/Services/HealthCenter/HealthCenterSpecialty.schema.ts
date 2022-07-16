import { object, string } from "yup";

export const HealthCenterSpecialtySearchValidationSchema = object().shape({
  title: string().required(),
});

export const HealthCenterSpecialtyDataValidationSchema = object().shape({
  title: string().required(),
});
