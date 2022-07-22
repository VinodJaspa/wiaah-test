import { array, number, object, string } from "yup";

const MenuItemValidationSchema = object({
  title: string().required(),
  price: number().required(),
});

export const ResturantMenuListValidationSchema = object({
  listTitle: string().required(),
  menuItems: array().of(MenuItemValidationSchema).min(0).required(),
});
