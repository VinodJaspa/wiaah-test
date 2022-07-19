import { object, date, mixed, string, number } from "yup";

export const dateRange = () =>
  object({
    from: mixed().oneOf([string(), number()]),
    to: mixed().oneOf([string(), number()]),
  });
