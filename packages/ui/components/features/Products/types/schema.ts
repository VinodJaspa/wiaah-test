type Maybe<T> = T | null;
type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
/** All built-in and custom scalars, mapped to their actual values */
type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: any;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export type Category = {
  __typename?: "Category";
  id: Scalars["ID"];
  name: Scalars["String"];
  sortOrder: Scalars["Int"];
  status: ProductCategoryStatus;
  parantId: Scalars["ID"];
};

export enum ProductCategoryStatus {
  Active = "active",
  InActive = "inActive",
}

export type ShippingDetails = {
  __typename?: "ShippingDetails";
  country: Scalars["String"];
  shippingRulesIds: Array<Scalars["String"]>;
};

export type ProductPresentation = {
  __typename?: "ProductPresentation";
  type: PresentationType;
  src: Scalars["String"];
};

export enum PresentationType {
  Video = "video",
  Image = "image",
}

export type CashBack = {
  __typename?: "CashBack";
  units: Scalars["Int"];
  amount: Scalars["Int"];
  type: CashbackType;
};

export enum CashbackType {
  Percent = "percent",
  Cash = "cash",
}

export type Discount = {
  __typename?: "Discount";
  units: Scalars["Int"];
  amount: Scalars["Int"];
};

export type ProductAttribute = {
  __typename?: "ProductAttribute";
  name: Scalars["String"];
  values: Array<Scalars["String"]>;
};

export type Product = {
  __typename?: "Product";
  id: Scalars["ID"];
  sellerId: Scalars["ID"];
  vendor_external_link: Scalars["String"];
  title: Scalars["String"];
  description: Scalars["String"];
  shopId: Scalars["ID"];
  categoryId: Scalars["ID"];
  category?: Maybe<Category>;
  attributes: Array<ProductAttribute>;
  stock: Scalars["Int"];
  discount: Discount;
  cashback: CashBack;
  presentations: Array<ProductPresentation>;
  rate: Scalars["Int"];
  brand: Scalars["String"];
  price: Scalars["Float"];
  visibility: VisibilityEnum;
  shippingRulesIds: Array<Scalars["ID"]>;
  shippingDetails?: Maybe<ShippingDetails>;
  reviews: Scalars["Int"];
  sales: Scalars["Int"];
  vat: Scalars["Float"];
  status: ProductStatus;
  usageStatus: ProductUsageStatus;
  createdAt: Scalars["String"];
  updatedAt: Scalars["String"];
};

export enum VisibilityEnum {
  Hidden = "hidden",
  Public = "public",
}

export enum ProductStatus {
  Suspended = "suspended",
  Active = "active",
  Pasued = "pasued",
  Pending = "pending",
  Deleted = "deleted",
}

export enum ProductUsageStatus {
  Used = "used",
  New = "new",
}

export type MyProduct = {
  __typename?: "MyProduct";
  id: Scalars["ID"];
  sellerId: Scalars["ID"];
  vendor_external_link: Scalars["String"];
  title: Scalars["String"];
  description: Scalars["String"];
  shopId: Scalars["ID"];
  categoryId: Scalars["ID"];
  category?: Maybe<Category>;
  attributes: Array<ProductAttribute>;
  stock: Scalars["Int"];
  discount: Discount;
  cashback: CashBack;
  presentations: Array<ProductPresentation>;
  rate: Scalars["Int"];
  brand: Scalars["String"];
  price: Scalars["Float"];
  visibility: VisibilityEnum;
  shippingRulesIds: Array<Scalars["ID"]>;
  shippingDetails?: Maybe<ShippingDetails>;
  reviews: Scalars["Int"];
  sales: Scalars["Int"];
  vat: Scalars["Float"];
  status: ProductStatus;
  usageStatus: ProductUsageStatus;
  createdAt: Scalars["String"];
  updatedAt: Scalars["String"];
  earnings: Scalars["Float"];
};

export type ProductFilterGroupValue = {
  __typename?: "ProductFilterGroupValue";
  name: Scalars["String"];
  sortOrder: Scalars["Int"];
};

export type Filter = {
  __typename?: "Filter";
  id: Scalars["ID"];
  name: Scalars["String"];
  values: Array<ProductFilterGroupValue>;
  sortOrder: Scalars["Int"];
};

export type Location = {
  __typename?: "Location";
  lat: Scalars["Float"];
  long: Scalars["Float"];
  address: Scalars["String"];
  country: Scalars["String"];
  city: Scalars["String"];
  state: Scalars["String"];
};

export type Shop = {
  __typename?: "Shop";
  id: Scalars["ID"];
  name: Scalars["String"];
  ownerId: Scalars["String"];
  location: Location;
  description: Scalars["String"];
  banner: Scalars["String"];
  verified: Scalars["Boolean"];
  storeType: Array<StoreType>;
  vendorType: Array<VendorType>;
  targetGenders: Array<TargetGenders>;
  createdAt: Scalars["DateTime"];
  updatedAt: Scalars["DateTime"];
};

export enum StoreType {
  Product = "product",
  Service = "service",
}

export enum VendorType {
  Profissional = "profissional",
  Individual = "individual",
}

export enum TargetGenders {
  Male = "male",
  Female = "female",
}

export type ShippingCountry = {
  __typename?: "ShippingCountry";
  name: Scalars["String"];
  code: Scalars["String"];
};

export type ShippingDeliveryTimeRange = {
  __typename?: "ShippingDeliveryTimeRange";
  from: Scalars["Int"];
  to: Scalars["Int"];
};

export type ShippingRule = {
  __typename?: "ShippingRule";
  id: Scalars["ID"];
  sellerId: Scalars["ID"];
  name: Scalars["String"];
  countries: Array<ShippingCountry>;
  cost: Scalars["Float"];
  shippingTypes: Array<ShippingType>;
  deliveryTimeRange: ShippingDeliveryTimeRange;
};

export enum ShippingType {
  Paid = "paid",
  ClickAndCollect = "click_and_collect",
}

export type ShippingRuleGeoZone = {
  __typename?: "ShippingRuleGeoZone";
  id: Scalars["ID"];
  country: Scalars["String"];
  shippingTypeRuleId: Scalars["ID"];
};

export type ShippingTypeRule = {
  __typename?: "ShippingTypeRule";
  id: Scalars["ID"];
  type: ShippingType;
  zones: Array<ShippingRuleGeoZone>;
};

export type Query = {
  __typename?: "Query";
  getNearShops: Array<Shop>;
  getAllShops: Array<Shop>;
  getShopById: Shop;
  getFilteredShops: Array<Shop>;
  getProductById: Product;
  getProducts: Array<Product>;
  getProduct: Product;
  getMyProducts: Array<MyProduct>;
  getProductCategories: Array<Category>;
  getFilteredProductCategories: Array<Category>;
  getAdminProductsFilters: Array<Filter>;
  getProductsFilters: Array<Filter>;
  getAdminFilteredProducts: Array<Product>;
  adminGetProduct?: Maybe<Product>;
  getShippingGeoZoneRules: Array<ShippingTypeRule>;
  getShippingRuleGeoZones: Array<ShippingRuleGeoZone>;
};

export type QueryGetNearShopsArgs = {
  GetNearShopsInput: GetNearShopsInput;
};

export type QueryGetShopByIdArgs = {
  id: Scalars["String"];
};

export type QueryGetFilteredShopsArgs = {
  filteredShopsArgs: FilteredShopsInput;
};

export type QueryGetProductByIdArgs = {
  id: Scalars["String"];
};

export type QueryGetProductsArgs = {
  filterInput: GetFilteredProductsInput;
};

export type QueryGetProductArgs = {
  id: Scalars["ID"];
};

export type QueryGetMyProductsArgs = {
  args: GqlPaginationInput;
};

export type QueryGetFilteredProductCategoriesArgs = {
  args?: Maybe<GetFilteredCategory>;
};

export type QueryGetAdminProductsFiltersArgs = {
  getFiltersArgs: GetFiltersInput;
};

export type QueryGetAdminFilteredProductsArgs = {
  args: GetFilteredProductsAdminInput;
};

export type QueryAdminGetProductArgs = {
  id: Scalars["String"];
};

export type QueryGetShippingRuleGeoZonesArgs = {
  id: Scalars["String"];
};

export type GetNearShopsInput = {
  lat: Scalars["Float"];
  lon: Scalars["Float"];
  distance: Scalars["Float"];
};

export type FilteredShopsInput = {
  storeType?: Maybe<StoreType>;
  vendorType?: Maybe<VendorType>;
  targetGender?: Maybe<TargetGenders>;
  country?: Maybe<Scalars["String"]>;
  city?: Maybe<Scalars["String"]>;
  pagination: GqlPaginationInput;
};

export type GqlPaginationInput = {
  page: Scalars["Int"];
  take: Scalars["Int"];
};

export type GetFilteredProductsInput = {
  categories?: Maybe<Array<Scalars["ID"]>>;
  minPrice?: Maybe<Scalars["Float"]>;
  maxPrice?: Maybe<Scalars["Float"]>;
  brands?: Maybe<Array<Scalars["ID"]>>;
  ratings?: Maybe<Array<Scalars["Int"]>>;
  colors?: Maybe<Array<Scalars["String"]>>;
  size?: Maybe<Array<Scalars["String"]>>;
  inStock?: Maybe<Scalars["Boolean"]>;
  usageStatus?: Maybe<ProductUsageStatus>;
  pagination: GqlPaginationInput;
};

export type GetFilteredCategory = {
  pagination: GqlPaginationInput;
  name?: Maybe<Scalars["String"]>;
  sortOrder?: Maybe<Scalars["Int"]>;
};

export type GetFiltersInput = {
  name?: Maybe<Scalars["String"]>;
  sortOrder?: Maybe<Scalars["Int"]>;
};

export type GetFilteredProductsAdminInput = {
  title?: Maybe<Scalars["String"]>;
  seller?: Maybe<Scalars["String"]>;
  productId?: Maybe<Scalars["ID"]>;
  price?: Maybe<Scalars["Float"]>;
  qty?: Maybe<Scalars["Int"]>;
  status?: Maybe<ProductStatus>;
  updatedAt?: Maybe<Scalars["String"]>;
  type?: Maybe<ProductType>;
  usageStatus?: Maybe<ProductUsageStatus>;
  pagination: GqlPaginationInput;
};

export enum ProductType {
  Goods = "goods",
  Digital = "digital",
}

export type Mutation = {
  __typename?: "Mutation";
  createShop: Shop;
  removeAllShops: Scalars["Boolean"];
  updateMyShop: Shop;
  getProductVendorLink: Scalars["String"];
  createNewProduct: Product;
  updateProduct: Product;
  deleteAllProducts: Scalars["Boolean"];
  createProductsPh: Scalars["Boolean"];
  uploadProductPresentations: Scalars["Boolean"];
  deleteProduct: Product;
  createProductCategory: Category;
  deleteProductCategory: Category;
  updateProductCategory: Category;
  createFilter: Filter;
  updateFilter: Filter;
  deleteFilter: Filter;
  updateProductAdmin: Scalars["Boolean"];
  adminDeleteProduct: Scalars["Boolean"];
  createShippingTypeRuleGeoZone: Scalars["Boolean"];
  createShippingTypeRule: Scalars["Boolean"];
  createShippingRule: ShippingRule;
  updateShippingRule: ShippingRule;
  deleteShippingRule: ShippingRule;
};

export type MutationCreateShopArgs = {
  createShopInput: CreateShopInput;
};

export type MutationUpdateMyShopArgs = {
  updateMyShopInput: UpdateShopInput;
};

export type MutationGetProductVendorLinkArgs = {
  productId: Scalars["String"];
};

export type MutationCreateNewProductArgs = {
  createNewProductInput: CreateProductInput;
};

export type MutationUpdateProductArgs = {
  updateProductArgs: UpdateProductInput;
};

export type MutationUploadProductPresentationsArgs = {
  files: Array<Scalars["Upload"]>;
};

export type MutationDeleteProductArgs = {
  productId: Scalars["ID"];
};

export type MutationCreateProductCategoryArgs = {
  createCategoryInput: CreateCategoryInput;
};

export type MutationDeleteProductCategoryArgs = {
  deleteCategoryId: Scalars["String"];
};

export type MutationUpdateProductCategoryArgs = {
  updateCategoryArgs: UpdateCategoryInput;
};

export type MutationCreateFilterArgs = {
  createFilterGroupArgs?: Maybe<CreateFilterInput>;
};

export type MutationUpdateFilterArgs = {
  updateFilterArgs: UpdateFilterInput;
};

export type MutationDeleteFilterArgs = {
  deleteFilterId: Scalars["String"];
};

export type MutationUpdateProductAdminArgs = {
  args: UpdateProductInput;
};

export type MutationAdminDeleteProductArgs = {
  id: Scalars["String"];
  reason: Scalars["String"];
};

export type MutationCreateShippingTypeRuleGeoZoneArgs = {
  args: CreateShippingGeoZone;
};

export type MutationCreateShippingTypeRuleArgs = {
  args: CreateShippingTypeRuleInput;
};

export type MutationCreateShippingRuleArgs = {
  createShippingRuleArgs: CreateShippingRuleInput;
};

export type MutationUpdateShippingRuleArgs = {
  updateShippingRuleArgs: UpdateShippingRuleInput;
};

export type MutationDeleteShippingRuleArgs = {
  id: Scalars["ID"];
};

export type CreateShopInput = {
  name: Scalars["String"];
  banner: Scalars["String"];
  description: Scalars["String"];
  location: LocationInput;
  storeType: Array<StoreType>;
  vendorType: Array<VendorType>;
  targetGenders: Array<TargetGenders>;
};

export type LocationInput = {
  lat: Scalars["Float"];
  long: Scalars["Float"];
  address: Scalars["String"];
  country: Scalars["String"];
  city: Scalars["String"];
  state: Scalars["String"];
};

export type UpdateShopInput = {
  name?: Maybe<Scalars["String"]>;
  banner?: Maybe<Scalars["String"]>;
  description?: Maybe<Scalars["String"]>;
  location?: Maybe<LocationInput>;
  storeType?: Maybe<Array<StoreType>>;
  vendorType?: Maybe<Array<VendorType>>;
  targetGenders?: Maybe<Array<TargetGenders>>;
};

export type CreateProductInput = {
  type: ProductType;
  title: Scalars["String"];
  description: Scalars["String"];
  categoryId: Scalars["ID"];
  attributes: Array<ProductAttributeInput>;
  stock: Scalars["Int"];
  discount: DiscountInput;
  cashback: CashBackInput;
  presentations: Array<ProductPresentationInput>;
  price: Scalars["Float"];
  brand: Scalars["String"];
  visibility: VisibilityEnum;
  status?: Maybe<ProductStatus>;
  vat: Scalars["Float"];
};

export type ProductAttributeInput = {
  name: Scalars["String"];
  values: Array<Scalars["String"]>;
};

export type DiscountInput = {
  units: Scalars["Int"];
  amount: Scalars["Int"];
};

export type CashBackInput = {
  units: Scalars["Int"];
  amount: Scalars["Int"];
  type: CashbackType;
};

export type ProductPresentationInput = {
  type: PresentationType;
  src: Scalars["String"];
};

export type UpdateProductInput = {
  type?: Maybe<ProductType>;
  title?: Maybe<Scalars["String"]>;
  description?: Maybe<Scalars["String"]>;
  categoryId?: Maybe<Scalars["ID"]>;
  attributes?: Maybe<Array<ProductAttributeInput>>;
  stock?: Maybe<Scalars["Int"]>;
  discount?: Maybe<DiscountInput>;
  cashback?: Maybe<CashBackInput>;
  presentations?: Maybe<Array<ProductPresentationInput>>;
  price?: Maybe<Scalars["Float"]>;
  brand?: Maybe<Scalars["String"]>;
  visibility?: Maybe<VisibilityEnum>;
  status?: Maybe<ProductStatus>;
  vat?: Maybe<Scalars["Float"]>;
  id: Scalars["ID"];
};

export type CreateCategoryInput = {
  parantId?: Maybe<Scalars["ID"]>;
  name: Scalars["String"];
  sortOrder: Scalars["Int"];
  status: ProductCategoryStatus;
};

export type UpdateCategoryInput = {
  parantId?: Maybe<Scalars["ID"]>;
  name?: Maybe<Scalars["String"]>;
  sortOrder?: Maybe<Scalars["Int"]>;
  status?: Maybe<ProductCategoryStatus>;
  id: Scalars["ID"];
};

export type CreateFilterInput = {
  name: Scalars["String"];
  sortOrder: Scalars["Int"];
  values: Array<ProductFilterGroupValueInput>;
};

export type ProductFilterGroupValueInput = {
  name: Scalars["String"];
  sortOrder: Scalars["Int"];
};

export type UpdateFilterInput = {
  name?: Maybe<Scalars["String"]>;
  sortOrder?: Maybe<Scalars["Int"]>;
  values?: Maybe<Array<ProductFilterGroupValueInput>>;
  id: Scalars["ID"];
};

export type CreateShippingGeoZone = {
  country: Scalars["String"];
  zone: Scalars["String"];
  shippingTypeRuleId: Scalars["ID"];
};

export type CreateShippingTypeRuleInput = {
  name: Scalars["String"];
  description: Scalars["String"];
  type: ShippingType;
};

export type CreateShippingRuleInput = {
  countries: Array<ShippingCountryInput>;
  name: Scalars["String"];
  cost: Scalars["Float"];
  shippingTypes: Array<ShippingType>;
  deliveryTimeRange: ShippingDeliveryTimeRangeInput;
};

export type ShippingCountryInput = {
  name: Scalars["String"];
  code: Scalars["String"];
};

export type ShippingDeliveryTimeRangeInput = {
  from: Scalars["Int"];
  to: Scalars["Int"];
};

export type UpdateShippingRuleInput = {
  countries?: Maybe<Array<ShippingCountryInput>>;
  name?: Maybe<Scalars["String"]>;
  cost?: Maybe<Scalars["Float"]>;
  shippingTypes?: Maybe<Array<ShippingType>>;
  deliveryTimeRange?: Maybe<ShippingDeliveryTimeRangeInput>;
  id: Scalars["ID"];
};
