import { number } from "yup";

export const Rating = (maxRate: number = 5) => number().min(0).max(maxRate);
