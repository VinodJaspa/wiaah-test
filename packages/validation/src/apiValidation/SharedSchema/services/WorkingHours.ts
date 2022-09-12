import { object, string, number, mixed } from "yup";

export type WeekDays =
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday"
  | "Sunday";

const weekDays: WeekDays[] = [
  "Friday",
  "Monday",
  "Saturday",
  "Sunday",
  "Thursday",
  "Tuesday",
  "Wednesday",
];

const workingHourTimeValidationSchema = object({
  hour: number().min(0).max(24).required(),
  minutes: number()
    .min(0)
    .when("hour", {
      is: (val: number) => val > 23,
      then: (schema) => schema.max(0),
      otherwise: (schema) => schema.max(60),
    })
    .required(),
});

export const dayWorkingPeriodValidationSchema = object({
  weekDay: mixed<WeekDays>().oneOf(weekDays).required(),
  from: string().required(),
  to: string().required(),
});
