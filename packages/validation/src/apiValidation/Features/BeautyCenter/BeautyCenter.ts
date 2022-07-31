import { createApiResponseValidationSchema } from "../../SharedSchema";
import { array, number, object, string } from "yup";
import {
  CommonServiceDataSchema,
  ServiceCancelationPolicies,
} from "../Services";

export const beautyCenterTreatmentValidationSchema = object({
  category: string().required(),
  title: string().required(),
  price: number().required(),
  durationInMinutes: array().of(number().required()).min(1).max(2).required(),
  discount: number().required(),
});

export const BeautyCenterDetailsValidationSchema =
  CommonServiceDataSchema.concat(ServiceCancelationPolicies).concat(
    object({
      treatments: array()
        .of(beautyCenterTreatmentValidationSchema)
        .min(0)
        .required(),
    }).required()
  );

export const BeautyCenterDetailsApiResponseValidationSchema =
  createApiResponseValidationSchema(BeautyCenterDetailsValidationSchema);
