export * from "./accounts.seeder";
export * from "./social.seeder";
export * from "./products.seeder";

export interface SeedDBResponse {
  accountsIds: string[];
  profilesIds: string[];
  socialPostsIds: string[];
  productCategoriesIds: string[];
  productsIds: string[];
}
