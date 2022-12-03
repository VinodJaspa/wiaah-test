import { dayWorkingPeriodValidationSchema } from "../../../SharedSchema";
import { array, mixed, number, object, string } from "yup";
import { ServiceReachOutDataValidationSchema } from "./ServiceReachOutData";
import { ServiceCancelationPolicy } from "./ServiceCancelationPolicy";

type PresntationMediaType = "video" | "image";
const PresntationMediaTypes: PresntationMediaType[] = ["video", "image"];

const depositValidationSchema = number();

const deposit = () => depositValidationSchema;

export const PresntationMediaValidationSchema = object({
  src: string().required(),
  type: mixed<PresntationMediaType>().oneOf(PresntationMediaTypes).required(),
  thumbnail: string().required(),
}).required();

export const ServiceProviderMetaData = object({
  id: string().required(),
  thumbnail: string().required(),
  name: string().required(),
  rating: number().min(0).max(5).required(),
  description: string().required(),
  reviewsCount: number().min(0).required(),
  proprtyType: string().required(),
  serviceFee: number().required(),
}).required();

export const ServiceHeroImagesValidationSchema = object({
  presintations: array().of(PresntationMediaValidationSchema).required(),
}).required();

export const ServiceWorkingDaysValidationSchema = object({
  workingDays: array()
    .of(dayWorkingPeriodValidationSchema)
    .length(7)
    .required(),
}).required();

export const ServiceCancelationPolicies = object({
  cancelationPolicies: array().of(ServiceCancelationPolicy).min(0).required(),
});

export const ServicePoliciesValidationSchema = object({
  deposit: deposit().required(),
  policies: array().of(
    object({
      policyTitle: string().required(),
      policyTerms: array().of(string()).min(0).required(),
    })
  ),
});

export const CommonServiceDataSchema = ServiceProviderMetaData.concat(
  ServiceHeroImagesValidationSchema
)
  .concat(ServiceWorkingDaysValidationSchema)
  .concat(ServiceReachOutDataValidationSchema)
  .concat(ServicePoliciesValidationSchema);
