export * from "./accounts.seeder";
export * from "./social.seeder";
export * from "./products.seeder";

export interface SeedDBResponse {
  accountsIds: string[];
  profilesIds: string[];
  socialPostsIds: string[];
  productCategories: {
    name: string;
    id: string;
  }[];
  products: {
    id: string;
    name: string;
    categoryId: string;
  }[];
}
