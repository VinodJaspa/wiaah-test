import { number, object, string } from "yup";

export const ServiceCancelationPolicy = object({
  duration: number().required(),
  cost: number().required(),
  id: string().required(),
});
