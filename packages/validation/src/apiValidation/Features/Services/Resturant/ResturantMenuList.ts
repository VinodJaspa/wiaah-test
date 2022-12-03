import { array, number, object, string } from "yup";

const MenuItemValidationSchema = object({
  title: string().required(),
  price: number().required(),
  id: string().required(),
  thumbnail: string().required(),
  ingredients: array().of(string().required()).min(0).required(),
});

export const ResturantMenuListValidationSchema = object({
  listTitle: string().required(),
  menuItems: array().of(MenuItemValidationSchema).min(0).required(),
});
