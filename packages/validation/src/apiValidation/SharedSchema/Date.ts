import { object, date, mixed, string, number } from "yup";

export const dateRange = () =>
  object({
    from: string().required(),
    to: string().required(),
  });
