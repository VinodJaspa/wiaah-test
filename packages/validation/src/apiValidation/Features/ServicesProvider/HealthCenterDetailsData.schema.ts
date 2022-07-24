import { createApiResponseValidationSchema } from "../../SharedSchema";
import { array, object, string } from "yup";
import { CommonServiceDataSchema } from "../Services/common";
import { HotelServiceProviderPolicicesValidationSchema } from "./ServicesProvider";

export const HealthCenterDoctorMetaDataValidationSchema = object({
  id: string().required(),
  name: string().required(),
  specialty: string().required(),
  photo: string().required(),
});

export const HealthCenterDetailsValidationSchema =
  CommonServiceDataSchema.concat(
    object({
      policies: HotelServiceProviderPolicicesValidationSchema,
      doctors: array()
        .of(HealthCenterDoctorMetaDataValidationSchema)
        .min(0)
        .required(),
    }).required()
  );

export const HealthCenterDetailtsApiResponseValidationSchema =
  createApiResponseValidationSchema(HealthCenterDetailsValidationSchema);
