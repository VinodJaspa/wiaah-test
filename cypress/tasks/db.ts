import { Collection, MongoClient } from "mongodb";

export const mongodbTestClient = new MongoClient(
  "mongodb+srv://kerlos:1234@cluster0.4voto.mongodb.net/?retryWrites=true&w=majority"
);

export const db = {
  social: {
    db: mongodbTestClient.db("wiaah-social"),
    get newsfeedCollection() {
      return this.db.collection("NewsfeedPost") as Collection;
    },
    get profileCollection() {
      return this.db.collection("Profile") as Collection;
    },
    get followCollection() {
      return this.db.collection("Follow") as Collection;
    },
  },
  accounts: {
    db: mongodbTestClient.db("wiaah-accounts"),
    get accountsCollection() {
      return this.db.collection("Account") as Collection;
    },
  },
  affiliation: {
    db: mongodbTestClient.db("wiaah-affiliations"),
  },
  products: {
    db: mongodbTestClient.db("wiaah-products"),
    get productsCollection() {
      return this.db.collection("Product") as Collection;
    },
    get productCategoryCollection() {
      return this.db.collection("ProductCategory") as Collection;
    },
  },
};

export const resetDB = async () => {
  await Promise.all(Object.values(db).map((db) => db.db.dropDatabase()));
};

export const seedDB = () => {};
