import { createApiResponseValidationSchema } from "../../SharedSchema";
import { array, number, object, string } from "yup";
import {
  CommonServiceDataSchema,
  ServiceCancelationPolicies,
} from "../Services/common";
import { WorkingDateValidationSchema } from "../Services/HealthCenter";

export const HealthCenterDoctorMetaDataValidationSchema = object({
  id: string().required(),
  name: string().required(),
  specialty: string().required(),
  photo: string().required(),
  price: number().required(),
});

export const HealthCenterDetailsValidationSchema =
  CommonServiceDataSchema.concat(ServiceCancelationPolicies).concat(
    object({
      doctors: array()
        .of(HealthCenterDoctorMetaDataValidationSchema)
        .min(0)
        .required(),
      workingDates: array().of(WorkingDateValidationSchema).min(0).required(),
    }).required()
  );

export const HealthCenterDetailtsApiResponseValidationSchema =
  createApiResponseValidationSchema(HealthCenterDetailsValidationSchema);
