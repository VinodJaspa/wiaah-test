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
      return this.db.collection("Product") as Collection<Product>;
    },
    get productCategoryCollection() {
      return this.db.collection(
        "ProductCategory"
      ) as Collection<ProductsCategory>;
    },
  },
};

export const resetDB = async () => {
  await Promise.all(Object.values(db).map((db) => db.db.dropDatabase()));
};

export const seedDB = () => {};

interface ProductsCategory {
  name: {
    langId: string;
    value: string;
  }[];
  sortOrder: number;
  status: string;
  thumbnail: string;
  sales: number;
  metaTagTitle: {
    langId: string;
    value: string;
  }[];
  metaTagDescription: {
    langId: string;
    value: string;
  }[];
  attributeIds: any[];
}

interface Product {
  sellerId: string;
  vendor_external_link: null;
  todayProductClickId: null;
  type: string;
  hashtags: string[];
  title: { langId: string; value: string }[];
  description: { langId: string; value: string }[];
  price: number;
  status: string;
  suspensionReason: null;
  usageStatus: string;
  vat: number;
  categoryId: string;
  attributesIds: string[];
  stock: number;
  rate: number;
  reviews: number;
  rateStarCount: number;
  brand: string;
  discountId: null;
  cashbackId: null;
  shippingRulesIds: string[];
  presentations: { type: string; src: string }[];
  thumbnail: string;
  visibility: string;
  sales: number;
  earnings: number;
  totalOrdered: number;
  totalDiscounted: number;
  totalDiscountedAmount: number;
  unitsRefunded: number;
  positiveFeedback: number;
  // negativeFeedback: number;
  views: number;
  createdAt: Date;
  updatedAt: Date;
  discount: null;
  condition: string;
  sizes: string[];
  colors: string[];
}
