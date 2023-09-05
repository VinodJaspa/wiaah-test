import { db } from "../db";
import { faker } from "@faker-js/faker";

export const seedProductCategories = async (): Promise<string[]> => {
  await db.products.productCategoryCollection.insertMany(
    [...Array(5)].map((_, i) => ({
      name: [
        {
          langId: "en",
          value: faker.word.noun(),
        },
      ],
      sortOrder: faker.number.int(10),
      status: "active",
      thumbnail: "",
      sales: faker.number.int(1500),
      metaTagTitle: [
        {
          langId: "en",
          value: faker.word.noun(),
        },
      ],
      metaTagDescription: [
        {
          langId: "en",
          value: faker.word.noun(),
        },
      ],
      attributeIds: [],
    }))
  );

  const categories = await db.products.productCategoryCollection
    .find()
    .toArray();

  return categories.map((v) => v._id.toHexString());
};

export const seedProducts = async (options: {
  sellersIds?: string[];
  categories: string[];
}) => {
  await db.products.productsCollection.insertMany(
    [...Array(10)].map(() => ({
      sellerId: (options?.sellersIds || [])[
        faker.number.int(options?.sellersIds?.length || 1)
      ],
      vendor_external_link: null,
      todayProductClickId: null,
      type: ["goods", "digital"][faker.number.int({ max: 1, min: 0 })],
      hashtags: [...Array(faker.number.int({ max: 10, min: 1 }))].map(() =>
        faker.word.noun()
      ),
      title: [
        {
          langId: "en",
          value: faker.lorem.paragraph(40),
        },
      ],
      description: [
        {
          langId: "en",
          value: faker.lorem.paragraph(120),
        },
      ],
      price: faker.number.int(2000),
      status: "active",
      suspensionReason: null,
      usageStatus: ["new", "used"][faker.number.int(1)],
      vat: faker.number.int(25),
      categoryId: options.categories.at(
        faker.number.int(options.categories.length)
      ),
      attributesIds: [],
      stock: faker.number.int(100),
      rate: faker.number.int(5),
      reviews: faker.number.int(100),
      rateStarCount: faker.number.int(500),
      brand: faker.company.buzzNoun(),
      discountId: null,
      cashbackId: null,
      shippingRulesIds: [],
      presentations: [
        {
          type: "image",
          src: faker.image.url(),
        },
      ],
      thumbnail: faker.image.url(),
      visibility: "public",
      sales: faker.number.int(50),
      earnings: faker.number.int(5000),
      totalOrdered: faker.number.int(100),
      totalDiscounted: faker.number.int(100),
      totalDiscountedAmount: faker.number.int(1000),
      unitsRefunded: faker.number.int(100),
      positiveFeedback: faker.number.int(100),
      negitiveFeedback: faker.number.int(100),
      views: faker.number.int(1000),
      createdAt: new Date(),
      updatedAt: new Date(),
      discount: null,
      condition: ["new", "used", "recondition"][faker.number.int(2)],
      sizes: ["s", "m", "l"],
      colors: [...Array(faker.number.int(10))].map(() => faker.color.rgb()),
    }))
  );

  const prods = await db.products.productsCollection.find().toArray();

  return prods.map((v) => v._id.toHexString());
};
