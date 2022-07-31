import { number, object } from "yup";

export const DiscountUnits = () =>
  object({
    amount: number().min(0).max(100).required(),
    units: number().min(0).required(),
  });
