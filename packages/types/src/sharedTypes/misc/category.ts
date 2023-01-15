export type Category = {
  id: string;
  name: string;
  subCategories: Category[];
};
