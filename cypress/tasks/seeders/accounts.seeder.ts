import { db } from "../db";
import { hash } from "bcrypt";

export const seedAccounts: () => Promise<string[]> = async () => {
  const pass = await hash("test_password", 12);
  await db.accounts.accountsCollection.insertMany(
    [...Array(5)].map((_, i) => ({
      firstName: "test first",
      lastName: "test last",
      email: `test${i}@wiaah.com`,
      emailVerified: true,
      password: pass,
      online: false,
      lastActiveAt: new Date(),
      accountType: "seller",
      gender: "male",
      verified: true,
      status: "active",
      idVerified: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      lang: "en",
      currency: "usd",
      phoneVerified: true,
      ips: [],
      birthDate: new Date(),
    }))
  );

  const accounts = await db.accounts.accountsCollection.find().toArray();

  return accounts.map((v) => v._id.toHexString());
};
