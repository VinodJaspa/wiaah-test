import { faker } from "@faker-js/faker";
import { createTranslationValue } from "../../e2e/const";
import { db } from "../db";
import { ObjectId } from "mongodb";

export const seedServices = async () => {
  const accounts = await db.accounts.accountsCollection
    .find({
      type: "seller",
    })
    .toArray();

  const services = await db.services.servicesCollection.insertMany(
    accounts.map((acc) => ({
      sellerId: acc._id,
      name: createTranslationValue(faker.word.noun()),
      description: createTranslationValue(faker.lorem.lines(1)),
      price: faker.number.float(50),
      thumbnail: faker.image.url(),
      rating: faker.number.float(5),
      reviews: faker.number.int(500),
      discount: {
        value: faker.number.int(40),
        units: faker.number.int(5),
      },
      cancelable: false,
      cancelationPolicy: ["simple", "moderate", "strict"][
        faker.number.int(3) - 1
      ],
      type: [
        "hotel",
        "holiday_rentals",
        "health_center",
        "beauty_center",
        "vehicle",
      ][faker.number.int(5) - 1],
      createdAt: new Date(),
      updatedAt: new Date(),
      status: "active",
      presentations: [
        {
          type: "img",
          src: faker.image.url(),
        },
      ],
      policies: createTranslationValue([
        {
          policyTitle: faker.lorem.lines(1),
          terms: [faker.lorem.lines(2)],
        },
      ]),
      payment_methods: [...Array(faker.number.int(6))].map(() => {
        return ["credit_card", "visa", "mastercard", "check", "cash"][
          faker.number.int(6)
        ];
      }),
      vat: faker.number.float(30),
      hashtags: [faker.word.noun()],
      includedServices: createTranslationValue([faker.word.noun()]),
      popularAmenities: createTranslationValue([faker.word.noun()]),
      extras: [
        {
          name: createTranslationValue(faker.word.noun()),
          cost: faker.number.int(),
          id: new ObjectId().toHexString(),
        },
      ],
      includedAmenities: createTranslationValue([faker.word.noun()]),
      measurements: {
        inFeet: faker.number.int(),
        inMeter: faker.number.int(),
      },
      dailyPrices: {
        mo: faker.number.int(),
        tu: faker.number.int(),
        we: faker.number.int(),
        th: faker.number.int(),
        fr: faker.number.int(),
        sa: faker.number.int(),
        su: faker.number.int(),
      },
      dailyPrice: true,
      beds: faker.number.int(10),
      num_of_rooms: faker.number.int(10),
      bedrooms: faker.number.int(10),
      units: faker.number.int(50),
      typeOfPlace: "entire",
      propertyType: "house",
      adaptedFor: [...Array(faker.number.int(3))].map(
        () => ["newBorn", "children", "wheelchair"][faker.number.int(3)]
      ),
      restriction: [...Array(faker.number.int(3))].map(
        () => ["event", "smoking", "pets"][faker.number.int(3)]
      ),
      speakingLanguages: [...Array(faker.number.int(3))].map(
        () => ["EN", "FR", "GE", "GD"][faker.number.int(4)]
      ),
      ingredients: createTranslationValue([faker.word.noun()]),
    }))
  );
};
