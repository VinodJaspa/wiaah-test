import { createApiResponseValidationSchema } from "../../../SharedSchema";
import { array, number, object, string } from "yup";
import { ServiceCancelationPolicy } from "../common";

export const CheckoutServiceDataValidationSchema = object({
  id: string().required(),
  title: string().required(),
  thumbnail: string().required(),
  rate: number().min(0).max(5).required(),
  reviews: number().required(),
  refundingRule: ServiceCancelationPolicy,
  rateReason: string().required(),
  bookedDates: object({
    checkin: string().required(),
    checkout: string().required(),
  }),
  extras: array().of(string().required()).min(0).required(),
});

export const ServiceCheckoutDataApiResponseValidationSchema =
  createApiResponseValidationSchema(
    object({
      bookedServices: array()
        .of(CheckoutServiceDataValidationSchema)
        .min(0)
        .required(),
    })
  );
