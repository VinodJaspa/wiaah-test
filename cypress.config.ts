import { defineConfig } from "cypress";
import {
  db,
  resetDB,
  seedAccounts,
  socialPostsSeeder,
  socialProfileSeeder,
  login,
  SocialFollowSeeder,
  SeedDBResponse,
  seedProductCategories,
  seedProducts,
  ServiceType,
} from "./cypress/tasks";
import { ObjectId } from "mongodb";

export default defineConfig({
  e2e: {
    scrollBehavior: "center",
    setupNodeEvents(on, config) {
      on("task", {
        async seedDb(): Promise<SeedDBResponse> {
          try {
            await resetDB();
            const accIds = await seedAccounts();
            console.log({ accIds });
            const profiles = await socialProfileSeeder(accIds);
            console.log({ profiles });
            const posts = await Promise.all(
              profiles.map((profile) =>
                socialPostsSeeder({
                  accountId: profile["ownerId"],
                })
              )
            );

            console.log({ posts });

            const categories = await seedProductCategories();
            console.log({ categories });
            const products = await seedProducts({
              sellersIds: accIds,
              categories: categories.map((v) => v._id.toHexString()),
            });
            console.log({ products });

            return {
              accountsIds: accIds,
              profilesIds: profiles.map((v) => v._id.toHexString()),
              socialPostsIds: posts.reduce(
                (acc, curr) => [...acc, ...curr],
                []
              ),
              productCategories: categories.map((v) => ({
                id: v._id.toHexString(),
                name: v.name[0].value,
              })),
              products: products.map((v) => ({
                id: v._id.toHexString(),
                name: v.title[0].value,
                categoryId: v.categoryId,
              })),
            };
          } catch (error) {
            console.log("seeding db error", error);
            return {} as SeedDBResponse;
          }
        },
        async seedSocialFollow(options: { from: string; to?: string }) {
          const randomFollowe = await db.accounts.accountsCollection.findOne({
            _id: {
              $not: {
                $eq: new ObjectId(options.from),
              },
            },
          });

          if (options?.to || randomFollowe) {
            await SocialFollowSeeder({
              followerId: options.from,
              userId: options?.to || randomFollowe?._id.toHexString() || "",
            });
            return null;
          } else {
            throw new Error("failed to seed follower");
          }
        },

        resetDb: async () => {
          await resetDB();
          return null;
        },
        login: async (
          {
            type,
            email,
            serviceType,
          }: {
            type: string;
            email: string;
            serviceType?: ServiceType;
          } = { type: "seller", email: "test1@wiaah.com" }
        ) => {
          let accId;
          if (serviceType) {
            const shop = await db.products.shopProductCollection.findOne({
              type: serviceType,
            });

            accId = shop?.ownerId;
          }

          const account = await db.accounts.accountsCollection.findOne({
            _id: accId,
          });

          if (!account || !account.email) return null;
          return login(account.email, "test_password");
        },
      });
    },
  },
});
