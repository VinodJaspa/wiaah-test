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
    get shopProductCollection() {
      return this.db.collection("Shop") as Collection<Shop>;
    },
  },
  services: {
    db: mongodbTestClient.db("wiaah-services"),
    get servicesCollection() {
      return this.db.collection("Service") as Collection<Service>;
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

interface Service {}

interface Shop {
  ownerId: string;
  name: TranslationText[];
  description: TranslationText[];
  banner: string;
  verified: boolean;
  createdAt: Date;
  updatedAt: Date;
  phone: string;
  email: string;
  thumbnail: string;
  location: Location;
  geoLocation: GeoLocation;
  storeType: StoreType;
  storeCategoryId?: string;
  businessType: BusinessType;
  storeFor: StoreFor[];
  targetGenders: TargetGenders[];
  vat?: VatSettings;
  status: ShopStatus;
  payment_methods: ShopPaymentMethods[];
  type?: ServiceType;
  videos: string[];
  images: string[];
  reviews: number;
  rating: number;
  hashtags: string[];
  score: number;
}

interface GeoLocation {
  type: GeoLocationType;
  coordinates: number[];
}

type GeoLocationType = "Point";

type TranslationText = {
  langId: string;
  value: string;
};

export enum StoreType {
  Product = "product",
  Service = "service",
}

export enum BusinessType {
  Company = "company",
  Individual = "individual",
}

export enum TargetGenders {
  Male = "male",
  Female = "female",
}

interface VatSettings {
  VatID?: string;
  location?: Location;
}

export enum ShopPaymentMethods {
  CreditCard = "credit_card",
  Visa = "visa",
  Mastercard = "mastercard",
  Check = "check",
  Cash = "cash",
}

export enum ShopStatus {
  InActive = "inActive",
  Active = "active",
  Suspended = "suspended",
}

interface Location {
  countryCode: string;
  country: string;
  city: string;
  state: string;
  address: string;
  address2?: string;
  postalCode: string;
}

export enum ServiceType {
  Hotel = "hotel",
  HolidayRentals = "holiday_rentals",
  Restaurant = "restaurant",
  HealthCenter = "health_center",
  BeautyCenter = "beauty_center",
  Vehicle = "vehicle",
}

export enum StoreFor {
  Men = "men",
  Women = "women",
  Children = "children",
  Babies = "babies",
}
