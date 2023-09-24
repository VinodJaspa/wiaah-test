import { faker } from "@faker-js/faker";
import { createTranslationValue } from "../../e2e/const";
import {
  BusinessType,
  ServiceType,
  ShopPaymentMethods,
  ShopStatus,
  StoreFor,
  StoreType,
  TargetGenders,
  db,
} from "../db";

export async function seedServiceShops(accountsIds: string[]) {
  for (const accId of accountsIds) {
    await db.products.shopProductCollection.insertOne({
      ownerId: accId,
      name: createTranslationValue(faker.company.name()),
      banner: faker.image.url(),
      businessType: BusinessType.Individual,
      createdAt: new Date(),
      description: createTranslationValue(faker.lorem.lines(1)),
      email: `test-shop-${accId.slice(0, 5)}@email.com`,
      images: [faker.image.url(), faker.image.url()],
      geoLocation: {
        coordinates: [faker.location.latitude(), faker.location.longitude()],
        type: "Point",
      },
      hashtags: [faker.word.noun(), faker.word.noun(), faker.word.noun()],
      location: {
        address: faker.location.streetAddress(),
        city: faker.location.city(),
        country: faker.location.country(),
        countryCode: faker.location.countryCode(),
        postalCode: faker.location.zipCode(),
        state: faker.location.state(),
        address2: faker.location.secondaryAddress(),
      },
      payment_methods: [ShopPaymentMethods.Cash, ShopPaymentMethods.Visa],
      phone: faker.phone.number(),
      rating: faker.number.int(),
      reviews: faker.number.int(),
      score: faker.number.int(),
      status: ShopStatus.Active,
      storeFor: [StoreFor.Men, StoreFor.Women],
      storeType: StoreType.Product,
      targetGenders: [TargetGenders.Female, TargetGenders.Male],
      thumbnail: faker.image.url(),
      updatedAt: new Date(),
      verified: true,
      videos: [],
      type: ServiceType.Hotel,
    });
  }
}
