export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
  Upload: any;
};

export type AcceptReceivedOrderInput = {
  id: Scalars["ID"];
};

export type AcceptRequestedOrderInput = {
  id: Scalars["ID"];
};

export type Account = {
  __typename?: "Account";
  companyRegisterationNumber?: Maybe<Scalars["String"]>;
  createdAt: Scalars["DateTime"];
  email: Scalars["String"];
  firstName: Scalars["String"];
  id: Scalars["ID"];
  lastName: Scalars["String"];
  membershipId?: Maybe<Scalars["ID"]>;
  photo?: Maybe<Scalars["String"]>;
  stripeId?: Maybe<Scalars["String"]>;
  type: AccountType;
  updatedAt: Scalars["DateTime"];
  verified: Scalars["Boolean"];
};

export type AccountDeletionRequest = {
  __typename?: "AccountDeletionRequest";
  account: Account;
  accountId: Scalars["ID"];
  createdAt: Scalars["String"];
  id: Scalars["ID"];
  status: AccountDeletionRequestStatus;
  updatedAt: Scalars["String"];
};

export enum AccountDeletionRequestStatus {
  Deleted = "deleted",
  Pending = "pending",
}

export enum AccountStatus {
  Active = "active",
  InActive = "inActive",
  Pending = "pending",
  Refused = "refused",
  Suspended = "suspended",
}

export enum AccountType {
  Admin = "admin",
  Buyer = "buyer",
  Seller = "seller",
}

export type AccountVerification = {
  __typename?: "AccountVerification";
  acceptedById?: Maybe<Scalars["ID"]>;
  categoryId: Scalars["ID"];
  createdAt: Scalars["DateTime"];
  fullName: Scalars["String"];
  id: Scalars["ID"];
  idPhoto: Scalars["String"];
  knownAs: Scalars["String"];
  status: AccountVerificationStatus;
  updatedAt: Scalars["DateTime"];
  userId: Scalars["ID"];
  username: Scalars["String"];
};

export enum AccountVerificationStatus {
  Accepted = "accepted",
  Pending = "pending",
  Rejected = "rejected",
}

export type AddContactInput = {
  gmail?: Maybe<Scalars["String"]>;
  outlook?: Maybe<Scalars["String"]>;
  whatsapp?: Maybe<Scalars["String"]>;
  yahoo?: Maybe<Scalars["String"]>;
};

export type AdminDeleteServiceInput = {
  deletionReason: Scalars["String"];
  id: Scalars["ID"];
};

export type AskForRefundInput = {
  amount?: Maybe<Scalars["Float"]>;
  fullAmount?: Maybe<Scalars["Boolean"]>;
  id: Scalars["ID"];
  qty: Scalars["Int"];
  reason?: Maybe<Scalars["String"]>;
  type: RefundType;
};

export type BeautyCenter = {
  __typename?: "BeautyCenter";
  beauty_center_typeId: Scalars["ID"];
  cancelationPolicies: Array<ServiceCancelationPolicy>;
  contact: ServiceContact;
  createdAt: Scalars["DateTime"];
  id: Scalars["ID"];
  location: ServiceLocation;
  owner?: Maybe<Account>;
  ownerId: Scalars["ID"];
  payment_methods: Array<ServicePaymentMethod>;
  policies: Array<ServicePolicy>;
  presentations: Array<ServicePresentation>;
  rating: Scalars["Float"];
  serviceMetaInfo: ServiceMetaInfo;
  status: ServiceStatus;
  title: Scalars["String"];
  totalReviews: Scalars["Int"];
  treatments: Array<BeautyCenterTreatment>;
  type_of_seller: ServiceTypeOfSeller;
  updatedAt: Scalars["DateTime"];
  vat: Scalars["Float"];
  workingHours?: Maybe<WorkingSchedule>;
};

export type BeautyCenterTreatment = {
  __typename?: "BeautyCenterTreatment";
  category?: Maybe<BeautyCenterTreatmentCategory>;
  discount: ServiceDiscount;
  duration: Array<Scalars["Int"]>;
  id: Scalars["ID"];
  price: Scalars["Float"];
  title: Scalars["String"];
  treatmentCategoryId: Scalars["ID"];
};

export type BeautyCenterTreatmentCategory = {
  __typename?: "BeautyCenterTreatmentCategory";
  createdAt: Scalars["DateTime"];
  createdById: Scalars["ID"];
  id: Scalars["ID"];
  title: Scalars["String"];
  updatedAt: Scalars["DateTime"];
};

export type CashBack = {
  __typename?: "CashBack";
  amount: Scalars["Int"];
  type: CashbackType;
  units: Scalars["Int"];
};

export type CashBackInput = {
  amount: Scalars["Int"];
  type: CashbackType;
  units: Scalars["Int"];
};

export enum CashbackType {
  Cash = "cash",
  Percent = "percent",
}

export type Category = {
  __typename?: "Category";
  id: Scalars["ID"];
  name: Scalars["String"];
  parantId: Scalars["ID"];
  sortOrder: Scalars["Int"];
  status: ProductCategoryStatus;
};

export type CookiesSetting = {
  __typename?: "CookiesSetting";
  benefits: Array<Scalars["String"]>;
  cons: Array<Scalars["String"]>;
  description: Scalars["String"];
  id: Scalars["ID"];
  required: Scalars["Boolean"];
  title: Scalars["String"];
};

export type CreateAccountInput = {
  accountType: RegisterAccountType;
  confirmPassword: Scalars["String"];
  email: Scalars["String"];
  firstName: Scalars["String"];
  lastName: Scalars["String"];
  password: Scalars["String"];
};

export type CreateAccountVerificationInput = {
  categoryId: Scalars["ID"];
  fullName: Scalars["String"];
  idPhoto: Scalars["String"];
  knownAs: Scalars["String"];
  username: Scalars["String"];
};

export type CreateBeautyCenterInput = {
  beauty_center_typeId: Scalars["ID"];
  cancelationPolicies: Array<ServiceCancelationPolicyInput>;
  location: ServiceLocationInput;
  payment_methods: Array<ServicePaymentMethod>;
  policies: Array<ServicePolicyTranslatedInput>;
  presentations: Array<ServicePresentationInput>;
  serviceMetaInfo: Array<ServiceMetaInfoTranslationInput>;
  title: Array<TranslationTextInput>;
  treatments: Array<CreateBeautyCenterTreatmentInput>;
  type_of_seller: ServiceTypeOfSeller;
  vat: Scalars["Float"];
};

export type CreateBeautyCenterTreatmentCategoryInput = {
  title: Array<TranslationTextInput>;
};

export type CreateBeautyCenterTreatmentInput = {
  discount: ServiceDiscountInput;
  duration: Array<Scalars["Int"]>;
  price: Scalars["Float"];
  title: Array<TranslationTextInput>;
  treatmentCategoryId: Scalars["ID"];
};

export type CreateCategoryInput = {
  name: Scalars["String"];
  parantId?: Maybe<Scalars["ID"]>;
  sortOrder: Scalars["Int"];
  status: ProductCategoryStatus;
};

export type CreateFilterInput = {
  name: Scalars["String"];
  sortOrder: Scalars["Int"];
  values: Array<ProductFilterGroupValueInput>;
};

export type CreateHealthCenterInput = {
  cancelationPolicies: Array<ServiceCancelationPolicyInput>;
  contact: ServiceContactInput;
  doctors: Array<HealthCenterDoctorInput>;
  location: ServiceLocationInput;
  payment_methods: Array<ServicePaymentMethod>;
  policies: Array<ServicePolicyTranslatedInput>;
  presentations: Array<ServicePresentationInput>;
  serviceMetaInfo: Array<ServiceMetaInfoTranslationInput>;
  vat: Scalars["Float"];
};

export type CreateHealthCenterSpecialityInput = {
  description: Array<TranslationTextInput>;
  name: Array<TranslationTextInput>;
};

export type CreateHotelInput = {
  contact: ServiceContactInput;
  location: ServiceLocationInput;
  policies: Array<ServicePolicyTranslatedInput>;
  presentations: Array<ServicePresentationInput>;
  rooms: Array<HotelRoomInput>;
  serviceMetaInfo: Array<ServiceMetaInfoTranslationInput>;
};

export type CreateIdentityVerificationInput = {
  dateOfBirth: Scalars["String"];
  firstName: Scalars["String"];
  fullAddress: Scalars["String"];
  id_back: Scalars["String"];
  id_front: Scalars["String"];
  lastName: Scalars["String"];
};

export type CreateProductInput = {
  attributes: Array<ProductAttributeInput>;
  brand: Scalars["String"];
  cashback: CashBackInput;
  categoryId: Scalars["ID"];
  description: Scalars["String"];
  discount: DiscountInput;
  presentations: Array<ProductPresentationInput>;
  price: Scalars["Float"];
  status?: Maybe<ProductStatus>;
  stock: Scalars["Int"];
  thumbnail: Scalars["String"];
  title: Scalars["String"];
  type: ProductType;
  vat: Scalars["Float"];
  visibility: VisibilityEnum;
};

export type CreateRequiredActionInput = {
  exampleField: Scalars["Int"];
};

export type CreateRestInput = {
  exampleField: Scalars["Int"];
};

export type CreateRestaurantInput = {
  contact: ServiceContactInput;
  cuisinesTypeId: Scalars["ID"];
  establishmentTypeId: Scalars["ID"];
  location: ServiceLocationInput;
  menus: Array<RestaurantMenuInput>;
  michelin_guide_stars: Scalars["Int"];
  payment_methods: Array<ServicePaymentMethod>;
  policies: Array<ServicePolicyTranslatedInput>;
  presentations: Array<ServicePresentationInput>;
  serviceMetaInfo: Array<ServiceMetaInfoTranslationInput>;
  setting_and_ambianceId: Scalars["ID"];
  status?: Maybe<ServiceStatus>;
  vat: Scalars["Int"];
};

export type CreateServiceCategoryInput = {
  description: TranslationTextInput;
  filters: Array<ServiceCategoryFilterInput>;
  metaTagDescription: TranslationTextInput;
  metaTagKeywords: TranslationTextInput;
  metaTagTitle: TranslationTextInput;
  name: Array<TranslationTextInput>;
  seo: TranslationTextInput;
  slug: Scalars["String"];
  thumbnail: Scalars["String"];
};

export type CreateShippingGeoZone = {
  country: Scalars["String"];
  shippingTypeRuleId: Scalars["ID"];
  zone: Scalars["String"];
};

export type CreateShippingRuleInput = {
  cost: Scalars["Float"];
  countries: Array<ShippingCountryInput>;
  deliveryTimeRange: ShippingDeliveryTimeRangeInput;
  name: Scalars["String"];
  shippingType: ShippingType;
};

export type CreateShippingTypeRuleInput = {
  description: Scalars["String"];
  name: Scalars["String"];
  type: ShippingType;
};

export type CreateShopInput = {
  banner: Scalars["String"];
  description: Scalars["String"];
  location: LocationInput;
  name: Scalars["String"];
  storeType: Array<StoreType>;
  targetGenders: Array<TargetGenders>;
  vendorType: Array<VendorType>;
};

export type CreateVehicleInput = {
  brand: Scalars["String"];
  cancelationPolicies: Array<ServiceCancelationPolicyInput>;
  insurance: Scalars["Float"];
  model: Scalars["String"];
  presentations: Array<ServicePresentationInput>;
  price: Scalars["Float"];
  properties: CreateVehiclePropertiesInput;
  title: Array<TranslationTextInput>;
  typeId: Scalars["ID"];
};

export type CreateVehiclePropertiesInput = {
  airCondition: Scalars["Boolean"];
  gpsAvailable: Scalars["Boolean"];
  lugaggeCapacity: Scalars["Int"];
  maxSpeedInKm: Scalars["Int"];
  seats: Scalars["Int"];
  windows: Scalars["Int"];
};

export type CreateVehicleServiceInput = {
  contact: ServiceContactInput;
  location: ServiceLocationInput;
  payment_methods: Array<ServicePaymentMethod>;
  policies: Array<ServicePolicyTranslatedInput>;
  presentations: Array<ServicePresentationInput>;
  serviceMetaInfo: Array<ServiceMetaInfoTranslationInput>;
  vat: Scalars["Float"];
  vehicles: Array<CreateVehicleInput>;
};

export type DeclineSellerAccountRequest = {
  id: Scalars["ID"];
  reason: Scalars["String"];
};

export type DeleteAccountRequestInput = {
  password: Scalars["String"];
  reason: Scalars["String"];
  sendData?: Maybe<Scalars["Boolean"]>;
};

export type DeleteRestaurantInput = {
  id: Scalars["String"];
};

export type DeleteTreatmentCategoriesInput = {
  ids: Array<Scalars["ID"]>;
};

export type DeleteTreatmentCategoryInput = {
  id: Scalars["ID"];
};

export type Discount = {
  __typename?: "Discount";
  amount: Scalars["Int"];
  units: Scalars["Int"];
};

export type DiscountInput = {
  amount: Scalars["Int"];
  units: Scalars["Int"];
};

export type Filter = {
  __typename?: "Filter";
  id: Scalars["ID"];
  name: Scalars["String"];
  sortOrder: Scalars["Int"];
  values: Array<ProductFilterGroupValue>;
};

export type FilteredShopsInput = {
  city?: Maybe<Scalars["String"]>;
  country?: Maybe<Scalars["String"]>;
  pagination: GqlPaginationInput;
  storeType?: Maybe<StoreType>;
  targetGender?: Maybe<TargetGenders>;
  vendorType?: Maybe<VendorType>;
};

export type GetAccountDeletionRequestsInput = {
  dateAdded?: Maybe<Scalars["String"]>;
  email?: Maybe<Scalars["String"]>;
  pagination: GqlPaginationInput;
  status?: Maybe<AccountDeletionRequestStatus>;
  username?: Maybe<Scalars["String"]>;
};

export type GetBuyersAccountsInput = {
  balance?: Maybe<Scalars["Float"]>;
  date?: Maybe<Scalars["String"]>;
  email?: Maybe<Scalars["String"]>;
  id?: Maybe<Scalars["String"]>;
  name?: Maybe<Scalars["String"]>;
  pagination: GqlPaginationInput;
  status?: Maybe<AccountStatus>;
};

export type GetFilteredCategoriesInput = {
  name?: Maybe<Scalars["String"]>;
  sortOrder?: Maybe<Scalars["String"]>;
};

export type GetFilteredCategory = {
  name?: Maybe<Scalars["String"]>;
  pagination: GqlPaginationInput;
  sortOrder?: Maybe<Scalars["Int"]>;
};

export type GetFilteredOrdersInput = {
  buyer: Scalars["String"];
  date_from: Scalars["String"];
  date_to: Scalars["String"];
  pagination: GqlPaginationInput;
  payment_method: Scalars["String"];
  price: Scalars["Float"];
  qty: Scalars["Int"];
  seller: Scalars["String"];
};

export type GetFilteredProductsAdminInput = {
  pagination: GqlPaginationInput;
  price?: Maybe<Scalars["Float"]>;
  productId?: Maybe<Scalars["ID"]>;
  qty?: Maybe<Scalars["Int"]>;
  seller?: Maybe<Scalars["String"]>;
  status?: Maybe<ProductStatus>;
  title?: Maybe<Scalars["String"]>;
  type?: Maybe<ProductType>;
  updatedAt?: Maybe<Scalars["String"]>;
  usageStatus?: Maybe<ProductUsageStatus>;
};

export type GetFilteredProductsInput = {
  brands?: Maybe<Array<Scalars["ID"]>>;
  categories?: Maybe<Array<Scalars["ID"]>>;
  colors?: Maybe<Array<Scalars["String"]>>;
  inStock?: Maybe<Scalars["Boolean"]>;
  maxPrice?: Maybe<Scalars["Float"]>;
  minPrice?: Maybe<Scalars["Float"]>;
  pagination: GqlPaginationInput;
  ratings?: Maybe<Array<Scalars["Int"]>>;
  size?: Maybe<Array<Scalars["String"]>>;
  usageStatus?: Maybe<ProductUsageStatus>;
};

export type GetFilteredSellersAccountsInput = {
  balance?: Maybe<Scalars["Float"]>;
  date?: Maybe<Scalars["String"]>;
  email?: Maybe<Scalars["String"]>;
  id?: Maybe<Scalars["String"]>;
  name?: Maybe<Scalars["String"]>;
  pagination: GqlPaginationInput;
  products?: Maybe<Scalars["Int"]>;
  sales?: Maybe<Scalars["Int"]>;
  status?: Maybe<AccountStatus>;
};

export type GetFilteredServicesAdminInput = {
  id?: Maybe<Scalars["ID"]>;
  pagination: GqlPaginationInput;
  price?: Maybe<Scalars["Float"]>;
  sellerId?: Maybe<Scalars["ID"]>;
  sellerName?: Maybe<Scalars["String"]>;
  status?: Maybe<ServiceStatus>;
  title?: Maybe<Scalars["String"]>;
  type: ServiceType;
  updatedAt?: Maybe<Scalars["String"]>;
};

export type GetFilteredServicesInput = {
  pagination: GqlPaginationInput;
};

export type GetFiltersInput = {
  name?: Maybe<Scalars["String"]>;
  sortOrder?: Maybe<Scalars["Int"]>;
};

export type GetHotelServiceArgs = {
  id: Scalars["ID"];
};

export type GetInsurancesHistoryInput = {
  amount?: Maybe<Scalars["Float"]>;
  buyer?: Maybe<Scalars["String"]>;
  id?: Maybe<Scalars["ID"]>;
  pagination: GqlPaginationInput;
  seller?: Maybe<Scalars["String"]>;
  service?: Maybe<Scalars["String"]>;
  status?: Maybe<ServiceInsuranceStatusEnum>;
  thumbnail?: Maybe<Scalars["String"]>;
};

export type GetInsurancesInput = {
  pagination: GqlPaginationInput;
  status: ServiceInsuranceStatusEnum;
};

export type GetLocalizationInput = {
  query: Scalars["String"];
};

export type GetMyOrdersInput = {
  pagination: GqlPaginationInput;
  status?: Maybe<OrderStatusEnum>;
};

export type GetMyReturnedOrdersInput = {
  pagination: GqlPaginationInput;
};

export type GetNearShopsInput = {
  distance: Scalars["Float"];
  lat: Scalars["Float"];
  lon: Scalars["Float"];
};

export type GetRestaurantInput = {
  id: Scalars["ID"];
};

export type GetTopHashtagsInput = {
  pagination: GqlPaginationInput;
  q?: Maybe<Scalars["String"]>;
};

export type GetUserOrders = {
  accountType: Scalars["String"];
  pagination: GqlPaginationInput;
  q: Scalars["String"];
  status?: Maybe<OrderStatusEnum>;
  userId: Scalars["String"];
};

export type GetVehiclesInput = {
  pagination: GqlPaginationInput;
  q: Scalars["String"];
};

export type GqlPaginationInput = {
  page: Scalars["Int"];
  take: Scalars["Int"];
};

export type Hashtag = {
  __typename?: "Hashtag";
  createdAt: Scalars["DateTime"];
  id: Scalars["ID"];
  name: Scalars["String"];
  updatedAt: Scalars["DateTime"];
  usage: Scalars["Int"];
};

export type HealthCenter = {
  __typename?: "HealthCenter";
  cancelationPolicies: Array<ServiceCancelationPolicy>;
  contact: ServiceContact;
  doctors: Array<HealthCenterDoctor>;
  id: Scalars["ID"];
  location: ServiceLocation;
  owner?: Maybe<Account>;
  ownerId: Scalars["ID"];
  payment_methods: Array<ServicePaymentMethod>;
  policies: Array<ServicePolicy>;
  presentations: Array<ServicePresentation>;
  rating: Scalars["Float"];
  serviceMetaInfo: ServiceMetaInfo;
  status: ServiceStatus;
  totalReviews: Scalars["Int"];
  vat: Scalars["Float"];
  workingHours: WorkingSchedule;
};

export type HealthCenterDoctor = {
  __typename?: "HealthCenterDoctor";
  availablityStatus: HealthCenterDoctorAvailablityStatus;
  description: Scalars["String"];
  healthCenter?: Maybe<HealthCenter>;
  healthCenterId: Scalars["ID"];
  id: Scalars["ID"];
  name: Scalars["String"];
  price: Scalars["Float"];
  rating: Scalars["Float"];
  speciality?: Maybe<HealthCenterSpecialty>;
  specialityId: Scalars["ID"];
  thumbnail: Scalars["String"];
};

export enum HealthCenterDoctorAvailablityStatus {
  Available = "available",
  Unavailable = "unavailable",
}

export type HealthCenterDoctorInput = {
  availablityStatus: HealthCenterDoctorAvailablityStatus;
  description: Array<TranslationTextInput>;
  name: Scalars["String"];
  price: Scalars["Float"];
  specialityId: Scalars["ID"];
  thumbnail: Scalars["String"];
};

export type HealthCenterSpecialty = {
  __typename?: "HealthCenterSpecialty";
  description: Scalars["String"];
  doctors?: Maybe<Array<HealthCenterDoctor>>;
  id: Scalars["ID"];
  name: Scalars["String"];
};

export type Hotel = {
  __typename?: "Hotel";
  contact: ServiceContact;
  createdAt: Scalars["DateTime"];
  id: Scalars["ID"];
  location: ServiceLocation;
  owner: Account;
  ownerId: Scalars["ID"];
  policies: Array<ServicePolicy>;
  presentations: Array<ServicePresentation>;
  rooms: Array<HotelRoom>;
  serviceMetaInfo: ServiceMetaInfo;
  updatedAt: Scalars["DateTime"];
  workingHours?: Maybe<WorkingSchedule>;
};

export type HotelRoom = {
  __typename?: "HotelRoom";
  bathrooms: Scalars["Int"];
  beds: Scalars["Int"];
  cancelationPolicies: Array<ServiceCancelationPolicy>;
  createdAt: Scalars["DateTime"];
  dailyPrice: Scalars["Boolean"];
  dailyPrices?: Maybe<ServiceDailyPrices>;
  description: Scalars["String"];
  discount: ServiceDiscount;
  extras?: Maybe<Array<ServiceExtra>>;
  hotel?: Maybe<Hotel>;
  hotelId: Scalars["ID"];
  id: Scalars["ID"];
  includedAmenities?: Maybe<Array<Scalars["String"]>>;
  includedServices?: Maybe<Array<Scalars["String"]>>;
  measurements: ServicePropertyMeasurements;
  num_of_rooms: Scalars["Int"];
  popularAmenities?: Maybe<Array<ServiceAmenity>>;
  presentations: Array<ServicePresentation>;
  pricePerNight: Scalars["Int"];
  rating: Scalars["Float"];
  reviews: Scalars["Int"];
  sellerId: Scalars["ID"];
  title: Scalars["String"];
  updatedAt: Scalars["DateTime"];
};

export type HotelRoomInput = {
  bathrooms: Scalars["Int"];
  beds: Scalars["Int"];
  cancelationPolicies: Array<ServiceCancelationPolicyInput>;
  dailyPrice: Scalars["Boolean"];
  dailyPrices?: Maybe<ServiceDailyPricesInput>;
  discount: ServiceDiscountInput;
  extras: Array<ServiceExtraInput>;
  includedAmenities: Array<ServiceIncludedAmenitiesInput>;
  includedServices: Array<ServiceIncludedServicesInput>;
  insurance: Scalars["Float"];
  measurements: ServicePropertyMeasurementsInput;
  num_of_rooms: Scalars["Int"];
  popularAmenities: Array<ServiceAmenitiesInput>;
  presentations: Array<ServicePresentationInput>;
  pricePerNight: Scalars["Int"];
  roomMetaInfo: Array<HotelRoomTranslationMetaInfoInput>;
};

export type HotelRoomMetaInfoInput = {
  description: Scalars["String"];
  title: Scalars["String"];
};

export type HotelRoomTranslationMetaInfoInput = {
  langId: Scalars["String"];
  value: HotelRoomMetaInfoInput;
};

export type Insurance = {
  __typename?: "Insurance";
  amount: Scalars["Float"];
  buyerId: Scalars["ID"];
  createdAt: Scalars["DateTime"];
  id: Scalars["ID"];
  itemId: Scalars["ID"];
  itemType: Scalars["String"];
  sellerId: Scalars["ID"];
  status: ServiceInsuranceStatusEnum;
  updatedAt: Scalars["DateTime"];
};

export type Localization = {
  __typename?: "Localization";
  city: Scalars["String"];
  id: Scalars["ID"];
  isOpen: Scalars["Boolean"];
  openTime: OpenTime;
  propertyType: Scalars["String"];
  seller?: Maybe<Seller>;
  sellerId: Scalars["ID"];
  thumbnail: Scalars["String"];
};

export type Location = {
  __typename?: "Location";
  address: Scalars["String"];
  city: Scalars["String"];
  country: Scalars["String"];
  lat: Scalars["Float"];
  long: Scalars["Float"];
  state: Scalars["String"];
};

export type LocationInput = {
  address: Scalars["String"];
  city: Scalars["String"];
  country: Scalars["String"];
  lat: Scalars["Float"];
  long: Scalars["Float"];
  state: Scalars["String"];
};

export type Mutation = {
  __typename?: "Mutation";
  acceptInsurancePayBackRequest: Scalars["Boolean"];
  acceptReceivedOrder: Scalars["Boolean"];
  acceptRefundRequest: Scalars["Boolean"];
  acceptRequestedOrder: Scalars["Boolean"];
  acceptSellerAccount: Scalars["Boolean"];
  activateRestaurant: Restaurant;
  adminDeleteProduct: Scalars["Boolean"];
  adminDeleteService: Scalars["Boolean"];
  adminEditAccount: Account;
  askForRefund: Scalars["Boolean"];
  createBeautyCenter: BeautyCenter;
  createBeautyCenterTreatmentCategory: BeautyCenterTreatmentCategory;
  createFilter: Filter;
  createHealthCenter: HealthCenter;
  createHealthCenterSpeciality: HealthCenterSpecialty;
  createHotelService: Hotel;
  createNewProduct: Product;
  createProductCategory: Category;
  createProductsPh: Scalars["Boolean"];
  createRequiredAction: RequiredAction;
  createRest: Rest;
  createRestaurantService: Restaurant;
  createServiceCategory: ServiceCategory;
  createShippingRule: ShippingRule;
  createShippingTypeRule: Scalars["Boolean"];
  createShippingTypeRuleGeoZone: Scalars["Boolean"];
  createShop: Shop;
  createVehicle: VehicleService;
  declineSellerAccount: Scalars["Boolean"];
  deleteAllProducts: Scalars["Boolean"];
  deleteBeautyCenter: Scalars["Boolean"];
  deleteBeautyCenterServices: Scalars["Boolean"];
  deleteFilter: Filter;
  deleteProduct: Product;
  deleteProductCategory: Category;
  deleteRestaurant: Restaurant;
  deleteShippingRule: ShippingRule;
  editAccount: Account;
  getMyAccount: Account;
  getProductVendorLink: Scalars["String"];
  provideVVCPicture: Scalars["Boolean"];
  refuseAccountVerification: Scalars["Boolean"];
  refuseInsurancePayBackRequest: Scalars["Boolean"];
  register: Scalars["String"];
  rejectReceivedOrder: Scalars["Boolean"];
  rejectRefundRequest: Scalars["Boolean"];
  rejectRequestedOrder: Scalars["Boolean"];
  removeAllShops: Scalars["Boolean"];
  removeRequiredAction: RequiredAction;
  removeRest: Rest;
  removeServiceCategory: ServiceCategory;
  requestAccountDeletion: Scalars["Boolean"];
  requestAccountVerification: Scalars["Boolean"];
  requestIdVerification: Scalars["String"];
  requestInsurancePayBack: Scalars["Boolean"];
  suspenseAccount: Scalars["Boolean"];
  updateBeautyCenter: BeautyCenter;
  updateBeautyCenterAdmin: Scalars["Boolean"];
  updateFilter: Filter;
  updateHealthCenter: HealthCenter;
  updateHealthCenterAdmin: Scalars["Boolean"];
  updateHotelAdmin: Scalars["Boolean"];
  updateMyContact: Scalars["Boolean"];
  updateMyCookiesSettings: Scalars["Boolean"];
  updateMyShop: Shop;
  updateMyWorkingSchedule: WorkingSchedule;
  updateProduct: Product;
  updateProductAdmin: Scalars["Boolean"];
  updateProductCategory: Category;
  updateRequiredAction: RequiredAction;
  updateRest: Rest;
  updateRestaurant: Restaurant;
  updateRestaurantAdmin: Scalars["Boolean"];
  updateServiceCategory: ServiceCategory;
  updateShippingRule: ShippingRule;
  updateTreatmentCategories: Array<BeautyCenterTreatmentCategory>;
  updateUserLocation: Scalars["Boolean"];
  updateVehicleAdmin: Scalars["Boolean"];
  uploadProductPresentations: Scalars["Boolean"];
};

export type MutationAcceptInsurancePayBackRequestArgs = {
  bookId: Scalars["ID"];
};

export type MutationAcceptReceivedOrderArgs = {
  args: AcceptReceivedOrderInput;
};

export type MutationAcceptRefundRequestArgs = {
  id: Scalars["ID"];
};

export type MutationAcceptRequestedOrderArgs = {
  args: AcceptRequestedOrderInput;
};

export type MutationAcceptSellerAccountArgs = {
  id: Scalars["String"];
};

export type MutationActivateRestaurantArgs = {
  id: Scalars["Int"];
};

export type MutationAdminDeleteProductArgs = {
  id: Scalars["String"];
  reason: Scalars["String"];
};

export type MutationAdminDeleteServiceArgs = {
  args: AdminDeleteServiceInput;
};

export type MutationAdminEditAccountArgs = {
  editAccountInput: UpdateSellerAccountAdminInput;
};

export type MutationAskForRefundArgs = {
  askForRefundArgs: AskForRefundInput;
};

export type MutationCreateBeautyCenterArgs = {
  createBeautyCenterArgs: CreateBeautyCenterInput;
};

export type MutationCreateBeautyCenterTreatmentCategoryArgs = {
  createBeautyCenterTreatmentCategory: CreateBeautyCenterTreatmentCategoryInput;
};

export type MutationCreateFilterArgs = {
  createFilterGroupArgs?: Maybe<CreateFilterInput>;
};

export type MutationCreateHealthCenterArgs = {
  createHealthCenterArgs: CreateHealthCenterInput;
};

export type MutationCreateHealthCenterSpecialityArgs = {
  createHealthCenterSpecialityArgs: CreateHealthCenterSpecialityInput;
};

export type MutationCreateHotelServiceArgs = {
  createHotelServiceArgs: CreateHotelInput;
};

export type MutationCreateNewProductArgs = {
  createNewProductInput: CreateProductInput;
};

export type MutationCreateProductCategoryArgs = {
  createCategoryInput: CreateCategoryInput;
};

export type MutationCreateRequiredActionArgs = {
  createRequiredActionInput: CreateRequiredActionInput;
};

export type MutationCreateRestArgs = {
  createRestInput: CreateRestInput;
};

export type MutationCreateRestaurantServiceArgs = {
  createRestaurantArgs: CreateRestaurantInput;
};

export type MutationCreateServiceCategoryArgs = {
  createServiceCategoryArgs: CreateServiceCategoryInput;
};

export type MutationCreateShippingRuleArgs = {
  createShippingRuleArgs: CreateShippingRuleInput;
};

export type MutationCreateShippingTypeRuleArgs = {
  args: CreateShippingTypeRuleInput;
};

export type MutationCreateShippingTypeRuleGeoZoneArgs = {
  args: CreateShippingGeoZone;
};

export type MutationCreateShopArgs = {
  createShopInput: CreateShopInput;
};

export type MutationCreateVehicleArgs = {
  createVehicleInput: CreateVehicleServiceInput;
};

export type MutationDeclineSellerAccountArgs = {
  args: DeclineSellerAccountRequest;
};

export type MutationDeleteBeautyCenterArgs = {
  deleteBeautyCenter: DeleteTreatmentCategoryInput;
};

export type MutationDeleteBeautyCenterServicesArgs = {
  deleteBeautyCenterServices: DeleteTreatmentCategoriesInput;
};

export type MutationDeleteFilterArgs = {
  deleteFilterId: Scalars["String"];
};

export type MutationDeleteProductArgs = {
  productId: Scalars["ID"];
};

export type MutationDeleteProductCategoryArgs = {
  deleteCategoryId: Scalars["String"];
};

export type MutationDeleteRestaurantArgs = {
  deleteRestaurantArgs: DeleteRestaurantInput;
};

export type MutationDeleteShippingRuleArgs = {
  id: Scalars["ID"];
};

export type MutationEditAccountArgs = {
  editAccountInput: UpdateAccountInput;
};

export type MutationGetProductVendorLinkArgs = {
  productId: Scalars["String"];
};

export type MutationProvideVvcPictureArgs = {
  pic: Scalars["String"];
};

export type MutationRefuseAccountVerificationArgs = {
  args: RefuseAccountVerificationRequest;
};

export type MutationRefuseInsurancePayBackRequestArgs = {
  bookId: Scalars["ID"];
};

export type MutationRegisterArgs = {
  RegisterInput: CreateAccountInput;
};

export type MutationRejectReceivedOrderArgs = {
  args: RejectReceivedOrderInput;
};

export type MutationRejectRefundRequestArgs = {
  args: RejectRefundRequestInput;
};

export type MutationRejectRequestedOrderArgs = {
  args: RejectRequestedOrderInput;
};

export type MutationRemoveRequiredActionArgs = {
  id: Scalars["Int"];
};

export type MutationRemoveRestArgs = {
  id: Scalars["Int"];
};

export type MutationRemoveServiceCategoryArgs = {
  serviceCategoryId: Scalars["String"];
};

export type MutationRequestAccountDeletionArgs = {
  args: DeleteAccountRequestInput;
};

export type MutationRequestAccountVerificationArgs = {
  args: CreateAccountVerificationInput;
};

export type MutationRequestIdVerificationArgs = {
  requestInput: CreateIdentityVerificationInput;
};

export type MutationRequestInsurancePayBackArgs = {
  bookId: Scalars["ID"];
};

export type MutationSuspenseAccountArgs = {
  args: SuspenseAccountAdminInput;
};

export type MutationUpdateBeautyCenterArgs = {
  updateBeautyCenter: UpdateBeautyCenterInput;
};

export type MutationUpdateBeautyCenterAdminArgs = {
  args: UpdateBeautyCenterAdminInput;
};

export type MutationUpdateFilterArgs = {
  updateFilterArgs: UpdateFilterInput;
};

export type MutationUpdateHealthCenterArgs = {
  updateHealthCenterArgs: UpdateHealthCenterInput;
};

export type MutationUpdateHealthCenterAdminArgs = {
  args: UpdateHealthCenterAdminInput;
};

export type MutationUpdateHotelAdminArgs = {
  args: UpdateHotelAdminInput;
};

export type MutationUpdateMyContactArgs = {
  args: AddContactInput;
};

export type MutationUpdateMyCookiesSettingsArgs = {
  args: UpdateUserCookiesSettingsInput;
};

export type MutationUpdateMyShopArgs = {
  updateMyShopInput: UpdateShopInput;
};

export type MutationUpdateMyWorkingScheduleArgs = {
  args: UpdateWorkingScheduleInput;
};

export type MutationUpdateProductArgs = {
  updateProductArgs: UpdateProductInput;
};

export type MutationUpdateProductAdminArgs = {
  args: UpdateProductInput;
};

export type MutationUpdateProductCategoryArgs = {
  updateCategoryArgs: UpdateCategoryInput;
};

export type MutationUpdateRequiredActionArgs = {
  updateRequiredActionInput: UpdateRequiredActionInput;
};

export type MutationUpdateRestArgs = {
  updateRestInput: UpdateRestInput;
};

export type MutationUpdateRestaurantArgs = {
  updateRestaurantArgs: UpdateRestaurantInput;
};

export type MutationUpdateRestaurantAdminArgs = {
  args: UpdateRestaurantAdminInput;
};

export type MutationUpdateServiceCategoryArgs = {
  updateServiceCategoryArgs: UpdateServiceCategoryInput;
};

export type MutationUpdateShippingRuleArgs = {
  updateShippingRuleArgs: UpdateShippingRuleInput;
};

export type MutationUpdateTreatmentCategoriesArgs = {
  updateTreatmentCategoriesArgs: UpdateTreatmentCategoriesInput;
};

export type MutationUpdateUserLocationArgs = {
  updateLocation: UpdateUserLocationInput;
};

export type MutationUpdateVehicleAdminArgs = {
  args: UpdateVehicleAdminInput;
};

export type MutationUploadProductPresentationsArgs = {
  files: Array<Scalars["Upload"]>;
};

export type OpenTime = {
  __typename?: "OpenTime";
  from: Scalars["DateTime"];
  to: Scalars["DateTime"];
};

export type Order = {
  __typename?: "Order";
  buyer?: Maybe<Account>;
  buyerId: Scalars["ID"];
  createdAt: Scalars["DateTime"];
  id: Scalars["ID"];
  items: Array<OrderItem>;
  paid: Scalars["Float"];
  seller?: Maybe<Account>;
  sellerId: Scalars["ID"];
  shipping: ShippingRule;
  shippingAddress: ShippingAddress;
  shippingAddressId: Scalars["String"];
  shippingMethodId: Scalars["String"];
  status: OrderStatus;
  updatedAt: Scalars["DateTime"];
};

export type OrderItem = {
  __typename?: "OrderItem";
  id: Scalars["ID"];
  product?: Maybe<Product>;
  qty: Scalars["Int"];
};

export type OrderStatus = {
  __typename?: "OrderStatus";
  of: OrderStatusEnum;
  rejectReason?: Maybe<Scalars["String"]>;
};

export enum OrderStatusEnum {
  Compeleted = "compeleted",
  Paid = "paid",
  Pending = "pending",
  RejectedByBuyer = "rejectedByBuyer",
  RejectedBySeller = "rejectedBySeller",
  Shipping = "shipping",
}

export enum PresentationType {
  Image = "image",
  Video = "video",
}

export type Product = {
  __typename?: "Product";
  attributes: Array<ProductAttribute>;
  brand: Scalars["String"];
  cashback: CashBack;
  category?: Maybe<Category>;
  categoryId: Scalars["ID"];
  createdAt: Scalars["String"];
  description: Scalars["String"];
  discount: Discount;
  earnings: Scalars["Float"];
  hashtags: Array<Scalars["String"]>;
  id: Scalars["ID"];
  presentations: Array<ProductPresentation>;
  price: Scalars["Float"];
  rate: Scalars["Int"];
  reviews: Scalars["Int"];
  sales: Scalars["Int"];
  sellerId: Scalars["ID"];
  shippingDetails?: Maybe<ShippingDetails>;
  shippingRulesIds: Array<Scalars["ID"]>;
  shopId: Scalars["ID"];
  status: ProductStatus;
  stock: Scalars["Int"];
  thumbnail: Scalars["String"];
  title: Scalars["String"];
  updatedAt: Scalars["String"];
  usageStatus: ProductUsageStatus;
  vat: Scalars["Float"];
  vendor_external_link: Scalars["String"];
  visibility: VisibilityEnum;
};

export type ProductAttribute = {
  __typename?: "ProductAttribute";
  name: Scalars["String"];
  values: Array<Scalars["String"]>;
};

export type ProductAttributeInput = {
  name: Scalars["String"];
  values: Array<Scalars["String"]>;
};

export enum ProductCategoryStatus {
  Active = "active",
  InActive = "inActive",
}

export type ProductFilterGroupValue = {
  __typename?: "ProductFilterGroupValue";
  name: Scalars["String"];
  sortOrder: Scalars["Int"];
};

export type ProductFilterGroupValueInput = {
  name: Scalars["String"];
  sortOrder: Scalars["Int"];
};

export type ProductPresentation = {
  __typename?: "ProductPresentation";
  src: Scalars["String"];
  type: PresentationType;
};

export type ProductPresentationInput = {
  src: Scalars["String"];
  type: PresentationType;
};

export enum ProductStatus {
  Active = "active",
  Deleted = "deleted",
  Pasued = "pasued",
  Pending = "pending",
  Suspended = "suspended",
}

export enum ProductType {
  Digital = "digital",
  Goods = "goods",
}

export enum ProductUsageStatus {
  New = "new",
  Used = "used",
}

export type Query = {
  __typename?: "Query";
  acceptAccountVerification: Scalars["Boolean"];
  adminGetAccount: Account;
  adminGetProduct?: Maybe<Product>;
  adminGetRawService?: Maybe<ServiceShopRaw>;
  getAccountDeletionRequests: Array<AccountDeletionRequest>;
  getAccountVerificationRequests: Array<AccountVerification>;
  getAdminFilteredProducts: Array<Product>;
  getAdminProductsFilters: Array<Filter>;
  getAllServices: Array<Service>;
  getAllShops: Array<Shop>;
  getAllVehicles: Array<VehicleService>;
  getBeautyCenterById: BeautyCenter;
  getBeautyCenterTreatmentCategories: Array<BeautyCenterTreatmentCategory>;
  getBeautyCenterTreatmentCategoriesByIds: Array<BeautyCenterTreatmentCategory>;
  getCookiesSettings: Array<CookiesSetting>;
  getFilteredBeuatyCenterTreatments: Array<BeautyCenterTreatment>;
  getFilteredBuyers: Array<Account>;
  getFilteredOrders: Array<Order>;
  getFilteredProductCategories: Array<Category>;
  getFilteredSellers: Array<Account>;
  getFilteredServiceCategories: Array<ServiceCategory>;
  getFilteredServices: Array<ServiceDiscovery>;
  getFilteredShops: Array<Shop>;
  getHealthCenter: HealthCenter;
  getHotelService: Hotel;
  getHotels: Array<Hotel>;
  getInsurances: Array<Insurance>;
  getLocalisation: Localization;
  getMyContacts: UserContact;
  getMyCookiesSettings: UserCookiesSettings;
  getMyOrders: Array<Order>;
  getMyProducts: Array<Product>;
  getMyReturnedOrders: Array<Refund>;
  getMyShippingAddress: Array<ShippingAddress>;
  getMyShippingRules: Array<ShippingRule>;
  getMyWorkingSchedule: WorkingSchedule;
  getNearShops: Array<Shop>;
  getOrder: Order;
  getPendingSellers: Array<Account>;
  getPlaces: Localization;
  getProduct: Product;
  getProductById: Product;
  getProductCategories: Array<Category>;
  getProductsFilters: Array<Filter>;
  getRestaurant: Restaurant;
  getRestaurants: Array<Restaurant>;
  getServiceCategories: Array<ServiceCategory>;
  getServiceCategoryById: ServiceCategory;
  getServiceCategoryBySlug: ServiceCategory;
  getServiceInsuranceHistory: Array<Insurance>;
  getShippingGeoZoneRules: Array<ShippingTypeRule>;
  getShippingRuleGeoZones: Array<ShippingRuleGeoZone>;
  getShopById: Shop;
  getTopHashtags: Array<Hashtag>;
  getUserOrders: Array<Order>;
  getVehicleServicebyId: VehicleService;
  requiredAction: RequiredAction;
  requiredActions: Array<RequiredAction>;
  rest: Rest;
  searchFilteredRestaurant: Array<Restaurant>;
  searchHashtags: SearchHashtag;
  searchHealthCenterDoctors: Array<HealthCenterDoctor>;
  searchHealthCenters: Array<HealthCenter>;
  searchHotelRooms: Array<HotelRoom>;
  searchUsers: SearchUsers;
};

export type QueryAcceptAccountVerificationArgs = {
  id: Scalars["String"];
};

export type QueryAdminGetAccountArgs = {
  id: Scalars["String"];
};

export type QueryAdminGetProductArgs = {
  id: Scalars["String"];
};

export type QueryAdminGetRawServiceArgs = {
  id: Scalars["String"];
};

export type QueryGetAccountDeletionRequestsArgs = {
  args: GetAccountDeletionRequestsInput;
};

export type QueryGetAdminFilteredProductsArgs = {
  args: GetFilteredProductsAdminInput;
};

export type QueryGetAdminProductsFiltersArgs = {
  getFiltersArgs: GetFiltersInput;
};

export type QueryGetAllServicesArgs = {
  args: GetFilteredServicesInput;
};

export type QueryGetAllVehiclesArgs = {
  args: GetVehiclesInput;
};

export type QueryGetBeautyCenterByIdArgs = {
  id: Scalars["String"];
};

export type QueryGetBeautyCenterTreatmentCategoriesByIdsArgs = {
  ids: Array<Scalars["String"]>;
};

export type QueryGetFilteredBeuatyCenterTreatmentsArgs = {
  args: SearchFilteredBeautyCenterInput;
};

export type QueryGetFilteredBuyersArgs = {
  getBuyersInput: GetBuyersAccountsInput;
};

export type QueryGetFilteredOrdersArgs = {
  args: GetFilteredOrdersInput;
};

export type QueryGetFilteredProductCategoriesArgs = {
  args?: Maybe<GetFilteredCategory>;
};

export type QueryGetFilteredSellersArgs = {
  getSellersInput: GetFilteredSellersAccountsInput;
};

export type QueryGetFilteredServiceCategoriesArgs = {
  args?: Maybe<GetFilteredCategoriesInput>;
};

export type QueryGetFilteredServicesArgs = {
  args: GetFilteredServicesAdminInput;
};

export type QueryGetFilteredShopsArgs = {
  filteredShopsArgs: FilteredShopsInput;
};

export type QueryGetHealthCenterArgs = {
  serviceId: Scalars["String"];
};

export type QueryGetHotelServiceArgs = {
  getHotelServiceArgs: GetHotelServiceArgs;
};

export type QueryGetInsurancesArgs = {
  args: GetInsurancesInput;
};

export type QueryGetLocalisationArgs = {
  getLocalisationInput: GetLocalizationInput;
};

export type QueryGetMyOrdersArgs = {
  getMyOrdersArgs: GetMyOrdersInput;
};

export type QueryGetMyProductsArgs = {
  filterInput: GetFilteredProductsInput;
};

export type QueryGetMyReturnedOrdersArgs = {
  args: GetMyReturnedOrdersInput;
};

export type QueryGetNearShopsArgs = {
  GetNearShopsInput: GetNearShopsInput;
};

export type QueryGetOrderArgs = {
  id: Scalars["String"];
};

export type QueryGetPendingSellersArgs = {
  pagination: GqlPaginationInput;
};

export type QueryGetPlacesArgs = {
  placeQuery: Scalars["String"];
};

export type QueryGetProductArgs = {
  id: Scalars["ID"];
};

export type QueryGetProductByIdArgs = {
  id: Scalars["String"];
};

export type QueryGetRestaurantArgs = {
  getRestaurantArgs: GetRestaurantInput;
};

export type QueryGetServiceCategoryByIdArgs = {
  categoryId: Scalars["String"];
};

export type QueryGetServiceCategoryBySlugArgs = {
  slug: Scalars["String"];
};

export type QueryGetServiceInsuranceHistoryArgs = {
  args: GetInsurancesHistoryInput;
};

export type QueryGetShippingRuleGeoZonesArgs = {
  id: Scalars["String"];
};

export type QueryGetShopByIdArgs = {
  id: Scalars["String"];
};

export type QueryGetTopHashtagsArgs = {
  args: GetTopHashtagsInput;
};

export type QueryGetUserOrdersArgs = {
  args: GetUserOrders;
};

export type QueryGetVehicleServicebyIdArgs = {
  id: Scalars["String"];
};

export type QueryRequiredActionArgs = {
  id: Scalars["Int"];
};

export type QueryRestArgs = {
  id: Scalars["Int"];
};

export type QuerySearchFilteredRestaurantArgs = {
  filtersInput: SearchFilteredRestaurantInput;
};

export type QuerySearchHashtagsArgs = {
  query: Scalars["String"];
};

export type QuerySearchHealthCenterDoctorsArgs = {
  searchHealthCenterArgs: SearchHealthCenterInput;
};

export type QuerySearchHealthCentersArgs = {
  searchHealthCenterArgs: SearchHealthCenterInput;
};

export type QuerySearchHotelRoomsArgs = {
  searchHotelRoomsArgs: SearchHotelRoomLocationInput;
};

export type QuerySearchUsersArgs = {
  searchUserInput: SearchUserInput;
};

export type Refund = {
  __typename?: "Refund";
  amount: Scalars["Float"];
  fullAmount: Scalars["Boolean"];
  id: Scalars["ID"];
  product: Product;
  productId: Scalars["ID"];
  qty: Scalars["Int"];
  reason: Scalars["String"];
  rejectReason?: Maybe<Scalars["String"]>;
  requestedById: Scalars["ID"];
  sellerId: Scalars["ID"];
  status: RefundStatusType;
  type: RefundType;
};

export enum RefundStatusType {
  Accept = "accept",
  Pending = "pending",
  Reject = "reject",
}

export enum RefundType {
  Credit = "credit",
  Money = "money",
}

export type RefuseAccountVerificationRequest = {
  id: Scalars["ID"];
  reason: Scalars["String"];
};

export enum RegisterAccountType {
  Buyer = "buyer",
  Seller = "seller",
}

export type RejectReceivedOrderInput = {
  id: Scalars["ID"];
  rejectReason: Scalars["String"];
};

export type RejectRefundRequestInput = {
  id: Scalars["ID"];
  reason?: Maybe<Scalars["String"]>;
};

export type RejectRequestedOrderInput = {
  id: Scalars["ID"];
  rejectReason: Scalars["String"];
};

export type RequiredAction = {
  __typename?: "RequiredAction";
  exampleField: Scalars["Int"];
};

export type Rest = {
  __typename?: "Rest";
  exampleField: Scalars["Int"];
};

export type Restaurant = {
  __typename?: "Restaurant";
  cancelationPolicies: Array<ServiceCancelationPolicy>;
  contact: ServiceContact;
  cuisinesTypeId: Scalars["ID"];
  establishmentTypeId: Scalars["ID"];
  highest_price: Scalars["Float"];
  id: Scalars["ID"];
  location: ServiceLocation;
  lowest_price: Scalars["Float"];
  menus: Array<RestaurantMenu>;
  michelin_guide_stars: Scalars["Int"];
  owner: Account;
  ownerId: Scalars["ID"];
  payment_methods: Array<ServicePaymentMethod>;
  policies: Array<ServicePolicy>;
  presentations: Array<ServicePresentation>;
  rating: Scalars["Float"];
  reviews: Scalars["Int"];
  serviceMetaInfo: ServiceMetaInfo;
  setting_and_ambianceId: Scalars["ID"];
  status: ServiceStatus;
  vat: Scalars["Int"];
  workingHours?: Maybe<WorkingSchedule>;
};

export type RestaurantDish = {
  __typename?: "RestaurantDish";
  id: Scalars["ID"];
  ingredients: Array<Scalars["String"]>;
  name: Scalars["String"];
  price: Scalars["Float"];
  thumbnail: Scalars["String"];
};

export type RestaurantMenu = {
  __typename?: "RestaurantMenu";
  dishs: Array<RestaurantDish>;
  id: Scalars["ID"];
  name: Scalars["String"];
};

export type RestaurantMenuDishInput = {
  ingredients: Array<TranslationTextArrayInput>;
  name: Array<TranslationTextInput>;
  price: Scalars["Int"];
  thumbnail: Scalars["String"];
};

export type RestaurantMenuInput = {
  dishs: Array<RestaurantMenuDishInput>;
  name: Array<TranslationTextInput>;
};

export type SearchFilteredBeautyCenterInput = {
  beautyCenterTypeId?: Maybe<Scalars["ID"]>;
  beautySalonTypeId?: Maybe<Scalars["ID"]>;
  cancelationOption?: Maybe<Scalars["Boolean"]>;
  maxPrice?: Maybe<Scalars["Float"]>;
  minPrice?: Maybe<Scalars["Float"]>;
  pagination?: Maybe<GqlPaginationInput>;
  query?: Maybe<Scalars["String"]>;
  rating?: Maybe<Scalars["Int"]>;
  treatmentTypeId?: Maybe<Scalars["ID"]>;
  typeOfSeller?: Maybe<Scalars["String"]>;
};

export type SearchFilteredRestaurantInput = {
  cusinesTypeId?: Maybe<Scalars["ID"]>;
  establishmentTypeId?: Maybe<Scalars["ID"]>;
  foodType?: Maybe<Scalars["String"]>;
  maxPrice?: Maybe<Scalars["Int"]>;
  minPrice?: Maybe<Scalars["Float"]>;
  pagination?: Maybe<GqlPaginationInput>;
  paymentMethods?: Maybe<Array<ServicePaymentMethod>>;
  query?: Maybe<Scalars["String"]>;
  rating?: Maybe<Scalars["Int"]>;
  settingAndAmbinaceId?: Maybe<Scalars["ID"]>;
};

export type SearchHashtag = {
  __typename?: "SearchHashtag";
  ids: Array<Scalars["ID"]>;
  tags?: Maybe<Array<Hashtag>>;
};

export type SearchHealthCenterInput = {
  maxPrice?: Maybe<Scalars["Float"]>;
  minPrice?: Maybe<Scalars["Float"]>;
  pagination?: Maybe<GqlPaginationInput>;
  payment_methods?: Maybe<Array<ServicePaymentMethod>>;
  query?: Maybe<Scalars["String"]>;
  rate?: Maybe<Scalars["Int"]>;
  speakingLanguage?: Maybe<Scalars["String"]>;
  specialistType?: Maybe<Scalars["String"]>;
};

export type SearchHotelRoomLocationInput = {
  hotel_class?: Maybe<Scalars["Int"]>;
  maxPrice?: Maybe<Scalars["Float"]>;
  minPrice?: Maybe<Scalars["Float"]>;
  num_of_beds?: Maybe<Scalars["Int"]>;
  num_of_rooms?: Maybe<Scalars["Int"]>;
  pagination?: Maybe<GqlPaginationInput>;
  property_type?: Maybe<Scalars["String"]>;
  query?: Maybe<Scalars["String"]>;
  rating?: Maybe<Scalars["Int"]>;
};

export type SearchUserInput = {
  query: Scalars["String"];
};

export type SearchUsers = {
  __typename?: "SearchUsers";
  resloveUsers: Array<Account>;
  users?: Maybe<Array<Account>>;
  usersIds: Array<Scalars["ID"]>;
};

export type Seller = {
  __typename?: "Seller";
  id: Scalars["ID"];
  name: Scalars["String"];
  thumbnail: Scalars["String"];
};

export type Service = {
  __typename?: "Service";
  hashtags: Array<Scalars["String"]>;
  id: Scalars["ID"];
  presentation?: Maybe<Array<ServicePresentation>>;
  price: Scalars["Float"];
  rating: Scalars["Float"];
  serviceType: ServiceType;
  thumbnail: Scalars["String"];
  title: Scalars["String"];
};

export type ServiceAmenitiesInput = {
  label: Array<ServiceAmenitiesLabelTranslationInput>;
  value: Scalars["String"];
};

export type ServiceAmenitiesLabelTranslationInput = {
  langId: Scalars["String"];
  value: Scalars["String"];
};

export type ServiceAmenity = {
  __typename?: "ServiceAmenity";
  label: Scalars["String"];
  value: Scalars["String"];
};

export type ServiceCancelationPolicy = {
  __typename?: "ServiceCancelationPolicy";
  cost: Scalars["Int"];
  duration: Scalars["Int"];
};

export type ServiceCancelationPolicyInput = {
  cost: Scalars["Int"];
  duration: Scalars["Int"];
};

export type ServiceCategory = {
  __typename?: "ServiceCategory";
  description: TranslationText;
  filters: Array<ServiceCategoryFilter>;
  id: Scalars["ID"];
  metaTagDescription: TranslationText;
  metaTagKeywords: TranslationText;
  metaTagTitle: TranslationText;
  name: Scalars["String"];
  seo: TranslationText;
  slug: Scalars["String"];
  sortOrder: Scalars["Int"];
  status: ServiceCategoryStatus;
  thumbnail: Scalars["String"];
};

export type ServiceCategoryFilter = {
  __typename?: "ServiceCategoryFilter";
  filterGroupName: Scalars["String"];
  filterValues: Array<ServiceCategoryFilterValue>;
  filteringKey: Scalars["String"];
  sortOrder: Scalars["Int"];
};

export type ServiceCategoryFilterInput = {
  filterGroupName: Array<TranslationTextInput>;
  filterValues: Array<ServiceCategoryFilterValueInput>;
  filteringKey: Scalars["String"];
  sortOrder: Scalars["Int"];
};

export type ServiceCategoryFilterValue = {
  __typename?: "ServiceCategoryFilterValue";
  filteringValue: Scalars["String"];
  name: Scalars["String"];
  sortOrder: Scalars["Int"];
};

export type ServiceCategoryFilterValueInput = {
  filteringValue: Scalars["String"];
  name: Array<TranslationTextInput>;
  sortOrder: Scalars["Int"];
};

export enum ServiceCategoryStatus {
  Active = "active",
  InActive = "inActive",
}

export type ServiceContact = {
  __typename?: "ServiceContact";
  address: Scalars["String"];
  city: Scalars["String"];
  country: Scalars["String"];
  email: Scalars["String"];
  phone: Scalars["String"];
  state?: Maybe<Scalars["String"]>;
};

export type ServiceContactInput = {
  address: Scalars["String"];
  city: Scalars["String"];
  country: Scalars["String"];
  email: Scalars["String"];
  phone: Scalars["String"];
  state?: Maybe<Scalars["String"]>;
};

export type ServiceDailyPrices = {
  __typename?: "ServiceDailyPrices";
  fr: Scalars["Int"];
  mo: Scalars["Int"];
  sa: Scalars["Int"];
  su: Scalars["Int"];
  th: Scalars["Int"];
  tu: Scalars["Int"];
  we: Scalars["Int"];
};

export type ServiceDailyPricesInput = {
  fr: Scalars["Int"];
  mo: Scalars["Int"];
  sa: Scalars["Int"];
  su: Scalars["Int"];
  th: Scalars["Int"];
  tu: Scalars["Int"];
  we: Scalars["Int"];
};

export type ServiceDayWorkingHours = {
  __typename?: "ServiceDayWorkingHours";
  periods: Array<Scalars["String"]>;
};

export type ServiceDayWorkingHoursInput = {
  periods: Array<Scalars["String"]>;
};

export type ServiceDiscount = {
  __typename?: "ServiceDiscount";
  units: Scalars["Int"];
  value: Scalars["Int"];
};

export type ServiceDiscountInput = {
  units: Scalars["Int"];
  value: Scalars["Int"];
};

export type ServiceDiscovery = {
  __typename?: "ServiceDiscovery";
  id: Scalars["ID"];
  price: Array<Scalars["Float"]>;
  sellerId: Scalars["ID"];
  sellerName: Scalars["String"];
  status: ServiceStatus;
  thumbnail: Scalars["String"];
  title: Scalars["String"];
  type: ServiceType;
  updatedAt: Scalars["String"];
};

export type ServiceExtra = {
  __typename?: "ServiceExtra";
  cost: Scalars["Int"];
  name: Scalars["String"];
};

export type ServiceExtraInput = {
  cost: Scalars["Int"];
  name: Array<ServiceExtraNameTranslationInput>;
};

export type ServiceExtraNameTranslationInput = {
  langId: Scalars["String"];
  value: Scalars["String"];
};

export type ServiceIncludedAmenitiesInput = {
  langId: Scalars["String"];
  value: Array<Scalars["String"]>;
};

export type ServiceIncludedServicesInput = {
  langId: Scalars["String"];
  value: Array<Scalars["String"]>;
};

export enum ServiceInsuranceStatusEnum {
  Paid = "paid",
  Pending = "pending",
  Refunded = "refunded",
  Refused = "refused",
  Requested = "requested",
}

export type ServiceLocation = {
  __typename?: "ServiceLocation";
  address: Scalars["String"];
  city: Scalars["String"];
  country: Scalars["String"];
  lat: Scalars["Float"];
  lon: Scalars["Float"];
  postalCode: Scalars["Int"];
  state: Scalars["String"];
};

export type ServiceLocationInput = {
  address: Scalars["String"];
  city: Scalars["String"];
  country: Scalars["String"];
  lat: Scalars["Float"];
  lon: Scalars["Float"];
  postalCode: Scalars["Int"];
  state: Scalars["String"];
};

export type ServiceMetaInfo = {
  __typename?: "ServiceMetaInfo";
  description: Scalars["String"];
  hashtags: Array<Scalars["String"]>;
  metaTagDescription: Scalars["String"];
  metaTagKeywords: Array<Scalars["String"]>;
  title: Scalars["String"];
};

export type ServiceMetaInfoInput = {
  description: Scalars["String"];
  hashtags: Array<Scalars["String"]>;
  metaTagDescription: Scalars["String"];
  metaTagKeywords: Array<Scalars["String"]>;
  title: Scalars["String"];
};

export type ServiceMetaInfoTranslation = {
  __typename?: "ServiceMetaInfoTranslation";
  langId: Scalars["String"];
  value: ServiceMetaInfo;
};

export type ServiceMetaInfoTranslationInput = {
  langId: Scalars["String"];
  value: ServiceMetaInfoInput;
};

export enum ServicePaymentMethod {
  Cash = "cash",
  Check = "check",
  CreditCard = "credit_card",
  Mastercard = "mastercard",
  Visa = "visa",
}

export type ServicePolicy = {
  __typename?: "ServicePolicy";
  policyTitle: Scalars["String"];
  terms: Array<Scalars["String"]>;
};

export type ServicePolicyInput = {
  policyTitle: Scalars["String"];
  terms: Array<Scalars["String"]>;
};

export type ServicePolicyTranslatedInput = {
  langId: Scalars["String"];
  value: Array<ServicePolicyInput>;
};

export type ServicePresentation = {
  __typename?: "ServicePresentation";
  src: Scalars["String"];
  type: ServicePresentationType;
};

export type ServicePresentationInput = {
  src: Scalars["String"];
  type: ServicePresentationType;
};

export enum ServicePresentationType {
  Img = "img",
  Vid = "vid",
}

export type ServicePropertyMeasurements = {
  __typename?: "ServicePropertyMeasurements";
  inFeet: Scalars["Int"];
  inMeter: Scalars["Int"];
};

export type ServicePropertyMeasurementsInput = {
  inFeet: Scalars["Int"];
  inMeter: Scalars["Int"];
};

export type ServiceShopRaw = {
  __typename?: "ServiceShopRaw";
  cancelationPolicies: Array<ServiceCancelationPolicy>;
  contact: ServiceContact;
  createdAt: Scalars["String"];
  cuisinesTypeId?: Maybe<Scalars["String"]>;
  doctors?: Maybe<Array<HealthCenterDoctor>>;
  establishmentTypeId?: Maybe<Scalars["String"]>;
  highest_price: Scalars["Float"];
  id: Scalars["ID"];
  location: ServiceLocation;
  lowest_price: Scalars["Float"];
  menus?: Maybe<Array<RestaurantMenu>>;
  michelin_guide_stars?: Maybe<Scalars["Int"]>;
  ownerId: Scalars["ID"];
  payment_methods: Array<ServicePaymentMethod>;
  policies: Array<ServiceTranslationPolicy>;
  presentations: Array<ServicePresentation>;
  rating: Scalars["Float"];
  reviews: Scalars["Int"];
  rooms?: Maybe<Array<HotelRoom>>;
  serviceMetaInfo: Array<ServiceMetaInfoTranslation>;
  setting_and_ambianceId?: Maybe<Scalars["String"]>;
  status: ServiceStatus;
  suspensionReason?: Maybe<Scalars["String"]>;
  treatments?: Maybe<Array<BeautyCenterTreatment>>;
  type: ServiceType;
  type_of_seller: ServiceTypeOfSeller;
  updatedAt: Scalars["String"];
  vat: Scalars["Float"];
  vehicle?: Maybe<Array<Vehicle>>;
  workingHours?: Maybe<WorkingSchedule>;
};

export enum ServiceStatus {
  Active = "active",
  InActive = "inActive",
  Suspended = "suspended",
}

export type ServiceTranslationPolicy = {
  __typename?: "ServiceTranslationPolicy";
  langId: Scalars["String"];
  value: Array<ServicePolicy>;
};

export enum ServiceType {
  BeautyCenter = "beauty_center",
  HealthCenter = "health_center",
  HolidayRentals = "holiday_rentals",
  Hotel = "hotel",
  Restaurant = "restaurant",
  Vehicle = "vehicle",
}

export enum ServiceTypeOfSeller {
  Individual = "individual",
  Professional = "professional",
}

export type ShippingAddress = {
  __typename?: "ShippingAddress";
  id: Scalars["ID"];
  location: Location;
  ownerId: Scalars["ID"];
};

export type ShippingCountry = {
  __typename?: "ShippingCountry";
  code: Scalars["String"];
  name: Scalars["String"];
};

export type ShippingCountryInput = {
  code: Scalars["String"];
  name: Scalars["String"];
};

export type ShippingDeliveryTimeRange = {
  __typename?: "ShippingDeliveryTimeRange";
  from: Scalars["Int"];
  to: Scalars["Int"];
};

export type ShippingDeliveryTimeRangeInput = {
  from: Scalars["Int"];
  to: Scalars["Int"];
};

export type ShippingDetails = {
  __typename?: "ShippingDetails";
  available: Scalars["Boolean"];
  cost?: Maybe<Scalars["Float"]>;
  country: Scalars["String"];
  deliveryTimeRange?: Maybe<ShippingDeliveryTimeRange>;
  shippingRulesIds: Array<Scalars["ID"]>;
  shippingTypes?: Maybe<Array<ShippingType>>;
};

export type ShippingRule = {
  __typename?: "ShippingRule";
  cost: Scalars["Float"];
  countries: Array<ShippingCountry>;
  deliveryTimeRange: ShippingDeliveryTimeRange;
  id: Scalars["ID"];
  name: Scalars["String"];
  sellerId: Scalars["ID"];
  shippingType: ShippingType;
};

export type ShippingRuleGeoZone = {
  __typename?: "ShippingRuleGeoZone";
  country: Scalars["String"];
  id: Scalars["ID"];
  shippingTypeRuleId: Scalars["ID"];
};

export enum ShippingType {
  ClickAndCollect = "click_and_collect",
  Paid = "paid",
}

export type ShippingTypeRule = {
  __typename?: "ShippingTypeRule";
  id: Scalars["ID"];
  type: ShippingType;
  zones: Array<ShippingRuleGeoZone>;
};

export type Shop = {
  __typename?: "Shop";
  banner: Scalars["String"];
  createdAt: Scalars["DateTime"];
  description: Scalars["String"];
  id: Scalars["ID"];
  location: Location;
  name: Scalars["String"];
  ownerId: Scalars["String"];
  storeType: Array<StoreType>;
  targetGenders: Array<TargetGenders>;
  updatedAt: Scalars["DateTime"];
  vendorType: Array<VendorType>;
  verified: Scalars["Boolean"];
};

export type SpecialDayWorkingHoursInput = {
  date: Scalars["String"];
  workingHours: ServiceDayWorkingHoursInput;
};

export enum StoreType {
  Product = "product",
  Service = "service",
}

export type SuspenseAccountAdminInput = {
  rejectReason?: Maybe<Scalars["String"]>;
  userId: Scalars["ID"];
};

export enum TargetGenders {
  Female = "female",
  Male = "male",
}

export type TranslationText = {
  __typename?: "TranslationText";
  langId: Scalars["String"];
  value: Scalars["String"];
};

export type TranslationTextArrayInput = {
  langId: Scalars["String"];
  value: Array<Scalars["String"]>;
};

export type TranslationTextInput = {
  langId: Scalars["String"];
  value: Scalars["String"];
};

export type UpdateAccountInput = {
  accountType?: Maybe<RegisterAccountType>;
  companyRegisterationNumber?: Maybe<Scalars["String"]>;
  confirmPassword?: Maybe<Scalars["String"]>;
  email?: Maybe<Scalars["String"]>;
  firstName?: Maybe<Scalars["String"]>;
  lastName?: Maybe<Scalars["String"]>;
  password?: Maybe<Scalars["String"]>;
};

export type UpdateBeautyCenterInput = {
  beauty_center_typeId?: Maybe<Scalars["ID"]>;
  cancelationPolicies?: Maybe<Array<ServiceCancelationPolicyInput>>;
  id: Scalars["ID"];
  payment_methods?: Maybe<Array<ServicePaymentMethod>>;
  policies?: Maybe<Array<ServicePolicyTranslatedInput>>;
  presentations?: Maybe<Array<ServicePresentationInput>>;
  serviceMetaInfo?: Maybe<Array<ServiceMetaInfoTranslationInput>>;
  title?: Maybe<Array<TranslationTextInput>>;
  treatments?: Maybe<Array<UpdateBeautyCenterTreatmentInput>>;
  type_of_seller?: Maybe<ServiceTypeOfSeller>;
  vat?: Maybe<Scalars["Float"]>;
};

export type UpdateBeautyCenterTreatmentInput = {
  discount?: Maybe<ServiceDiscountInput>;
  duration?: Maybe<Array<Scalars["Int"]>>;
  id: Scalars["ID"];
  price?: Maybe<Scalars["Float"]>;
  title?: Maybe<Array<TranslationTextInput>>;
  treatmentCategoryId?: Maybe<Scalars["ID"]>;
};

export type UpdateCategoryInput = {
  id: Scalars["ID"];
  name?: Maybe<Scalars["String"]>;
  parantId?: Maybe<Scalars["ID"]>;
  sortOrder?: Maybe<Scalars["Int"]>;
  status?: Maybe<ProductCategoryStatus>;
};

export type UpdateFilterInput = {
  id: Scalars["ID"];
  name?: Maybe<Scalars["String"]>;
  sortOrder?: Maybe<Scalars["Int"]>;
  values?: Maybe<Array<ProductFilterGroupValueInput>>;
};

export type UpdateHealthCenterInput = {
  cancelationPolicies?: Maybe<Array<ServiceCancelationPolicyInput>>;
  id: Scalars["ID"];
  payment_methods?: Maybe<Array<ServicePaymentMethod>>;
  policies?: Maybe<Array<ServicePolicyTranslatedInput>>;
  presentations?: Maybe<Array<ServicePresentationInput>>;
  serviceMetaInfo?: Maybe<Array<ServiceMetaInfoTranslationInput>>;
  status?: Maybe<ServiceStatus>;
  vat?: Maybe<Scalars["Float"]>;
};

export type UpdateHotelRoomAdminInput = {
  bathrooms?: Maybe<Scalars["Int"]>;
  beds?: Maybe<Scalars["Int"]>;
  cancelationPolicies?: Maybe<Array<ServiceCancelationPolicyInput>>;
  dailyPrice?: Maybe<Scalars["Boolean"]>;
  dailyPrices?: Maybe<ServiceDailyPricesInput>;
  discount?: Maybe<ServiceDiscountInput>;
  extras?: Maybe<Array<ServiceExtraInput>>;
  id: Scalars["ID"];
  includedAmenities?: Maybe<Array<ServiceIncludedAmenitiesInput>>;
  includedServices?: Maybe<Array<ServiceIncludedServicesInput>>;
  insurance?: Maybe<Scalars["Float"]>;
  measurements?: Maybe<ServicePropertyMeasurementsInput>;
  num_of_rooms?: Maybe<Scalars["Int"]>;
  popularAmenities?: Maybe<Array<ServiceAmenitiesInput>>;
  presentations?: Maybe<Array<ServicePresentationInput>>;
  pricePerNight?: Maybe<Scalars["Int"]>;
  roomMetaInfo?: Maybe<Array<HotelRoomTranslationMetaInfoInput>>;
};

export type UpdateProductInput = {
  attributes?: Maybe<Array<ProductAttributeInput>>;
  brand?: Maybe<Scalars["String"]>;
  cashback?: Maybe<CashBackInput>;
  categoryId?: Maybe<Scalars["ID"]>;
  description?: Maybe<Scalars["String"]>;
  discount?: Maybe<DiscountInput>;
  id: Scalars["ID"];
  presentations?: Maybe<Array<ProductPresentationInput>>;
  price?: Maybe<Scalars["Float"]>;
  status?: Maybe<ProductStatus>;
  stock?: Maybe<Scalars["Int"]>;
  thumbnail?: Maybe<Scalars["String"]>;
  title?: Maybe<Scalars["String"]>;
  type?: Maybe<ProductType>;
  vat?: Maybe<Scalars["Float"]>;
  visibility?: Maybe<VisibilityEnum>;
};

export type UpdateRequiredActionInput = {
  exampleField?: Maybe<Scalars["Int"]>;
  id: Scalars["Int"];
};

export type UpdateRestInput = {
  exampleField?: Maybe<Scalars["Int"]>;
  id: Scalars["Int"];
};

export type UpdateRestaurantInput = {
  cuisinesTypeId?: Maybe<Scalars["ID"]>;
  dishs?: Maybe<Array<UpdateRestaurantMenuDishInput>>;
  establishmentTypeId?: Maybe<Scalars["ID"]>;
  id: Scalars["ID"];
  location?: Maybe<ServiceLocationInput>;
  menus?: Maybe<Array<UpdateRestaurantMenuInput>>;
  michelin_guide_stars?: Maybe<Scalars["Int"]>;
  payment_methods?: Maybe<Array<ServicePaymentMethod>>;
  policies?: Maybe<Array<ServicePolicyTranslatedInput>>;
  presentations?: Maybe<Array<ServicePresentationInput>>;
  serviceMetaInfo?: Maybe<Array<ServiceMetaInfoTranslationInput>>;
  setting_and_ambianceId?: Maybe<Scalars["ID"]>;
  status?: Maybe<ServiceStatus>;
  vat?: Maybe<Scalars["Int"]>;
};

export type UpdateRestaurantMenuDishInput = {
  id: Scalars["ID"];
  ingredients: Array<TranslationTextArrayInput>;
  name: Array<TranslationTextInput>;
  price: Scalars["Int"];
  thumbnail: Scalars["String"];
};

export type UpdateRestaurantMenuInput = {
  dishs: Array<UpdateRestaurantMenuDishInput>;
  id: Scalars["ID"];
  name: Array<TranslationTextInput>;
};

export type UpdateSellerAccountAdminInput = {
  accountType?: Maybe<RegisterAccountType>;
  companyRegisterationNumber?: Maybe<Scalars["String"]>;
  confirmPassword?: Maybe<Scalars["String"]>;
  email?: Maybe<Scalars["String"]>;
  firstName?: Maybe<Scalars["String"]>;
  id: Scalars["ID"];
  lastName?: Maybe<Scalars["String"]>;
  password?: Maybe<Scalars["String"]>;
};

export type UpdateServiceCategoryInput = {
  description?: Maybe<TranslationTextInput>;
  filters?: Maybe<Array<ServiceCategoryFilterInput>>;
  id: Scalars["String"];
  metaTagDescription?: Maybe<TranslationTextInput>;
  metaTagKeywords?: Maybe<TranslationTextInput>;
  metaTagTitle?: Maybe<TranslationTextInput>;
  name?: Maybe<Array<TranslationTextInput>>;
  seo?: Maybe<TranslationTextInput>;
  slug?: Maybe<Scalars["String"]>;
  thumbnail?: Maybe<Scalars["String"]>;
};

export type UpdateShippingRuleInput = {
  cost?: Maybe<Scalars["Float"]>;
  countries?: Maybe<Array<ShippingCountryInput>>;
  deliveryTimeRange?: Maybe<ShippingDeliveryTimeRangeInput>;
  id: Scalars["ID"];
  name?: Maybe<Scalars["String"]>;
  shippingType?: Maybe<ShippingType>;
};

export type UpdateShopInput = {
  banner?: Maybe<Scalars["String"]>;
  description?: Maybe<Scalars["String"]>;
  location?: Maybe<LocationInput>;
  name?: Maybe<Scalars["String"]>;
  storeType?: Maybe<Array<StoreType>>;
  targetGenders?: Maybe<Array<TargetGenders>>;
  vendorType?: Maybe<Array<VendorType>>;
};

export type UpdateTreatmentCategoriesInput = {
  ids: Array<Scalars["ID"]>;
  title?: Maybe<Array<TranslationTextInput>>;
};

export type UpdateUserCookiesSettingsInput = {
  ids: Array<Scalars["ID"]>;
};

export type UpdateUserLocationInput = {
  lat: Scalars["Float"];
  lon: Scalars["Float"];
};

export type UpdateWeekdaysWorkingHoursInput = {
  fr?: Maybe<ServiceDayWorkingHoursInput>;
  mo?: Maybe<ServiceDayWorkingHoursInput>;
  sa?: Maybe<ServiceDayWorkingHoursInput>;
  su?: Maybe<ServiceDayWorkingHoursInput>;
  th?: Maybe<ServiceDayWorkingHoursInput>;
  tu?: Maybe<ServiceDayWorkingHoursInput>;
  we?: Maybe<ServiceDayWorkingHoursInput>;
};

export type UpdateWorkingScheduleInput = {
  specialDays?: Maybe<Array<SpecialDayWorkingHoursInput>>;
  weekdays?: Maybe<UpdateWeekdaysWorkingHoursInput>;
};

export type UserContact = {
  __typename?: "UserContact";
  gmail?: Maybe<Scalars["String"]>;
  outlook?: Maybe<Scalars["String"]>;
  whatsapp?: Maybe<Scalars["String"]>;
  yahoo?: Maybe<Scalars["String"]>;
};

export type UserCookiesSettings = {
  __typename?: "UserCookiesSettings";
  acceptedCookiesIds: Array<Scalars["String"]>;
  acceptedRequired: Scalars["Boolean"];
  id: Scalars["ID"];
  userId: Scalars["ID"];
};

export type Vehicle = {
  __typename?: "Vehicle";
  brand: Scalars["String"];
  cancelationPolicies: Array<ServiceCancelationPolicy>;
  id: Scalars["ID"];
  model: Scalars["String"];
  presentations: Array<ServicePresentation>;
  price: Scalars["Int"];
  properties: VehicleProperties;
  title: Scalars["String"];
};

export type VehicleProperties = {
  __typename?: "VehicleProperties";
  airCondition: Scalars["Boolean"];
  gpsAvailable: Scalars["Boolean"];
  lugaggeCapacity: Scalars["Int"];
  maxSpeedInKm: Scalars["Int"];
  seats: Scalars["Int"];
  windows: Scalars["Int"];
};

export type VehicleService = {
  __typename?: "VehicleService";
  cancelationPolicies: Array<ServiceCancelationPolicy>;
  contact: ServiceContact;
  createdAt: Scalars["DateTime"];
  id: Scalars["ID"];
  location: ServiceLocation;
  owner: Account;
  ownerId: Scalars["ID"];
  payment_methods: Array<ServicePaymentMethod>;
  policies: Array<ServicePolicy>;
  presentations: Array<ServicePresentation>;
  rating: Scalars["Float"];
  serviceMetaInfo: ServiceMetaInfo;
  totalReviews: Scalars["Int"];
  updatedAt: Scalars["DateTime"];
  vat: Scalars["Float"];
  vehicles: Array<Vehicle>;
  workingHours: WorkingSchedule;
};

export enum VendorType {
  Individual = "individual",
  Profissional = "profissional",
}

export enum VisibilityEnum {
  Hidden = "hidden",
  Public = "public",
}

export type WeekdaysWorkingHours = {
  __typename?: "WeekdaysWorkingHours";
  fr?: Maybe<ServiceDayWorkingHours>;
  mo?: Maybe<ServiceDayWorkingHours>;
  sa?: Maybe<ServiceDayWorkingHours>;
  su?: Maybe<ServiceDayWorkingHours>;
  th?: Maybe<ServiceDayWorkingHours>;
  tu?: Maybe<ServiceDayWorkingHours>;
  we?: Maybe<ServiceDayWorkingHours>;
};

export type WorkingSchedule = {
  __typename?: "WorkingSchedule";
  id: Scalars["ID"];
  weekdays: WeekdaysWorkingHours;
};

export type UpdateBeautyCenterAdminInput = {
  beauty_center_typeId?: Maybe<Scalars["ID"]>;
  cancelationPolicies?: Maybe<Array<ServiceCancelationPolicyInput>>;
  id: Scalars["ID"];
  payment_methods?: Maybe<Array<ServicePaymentMethod>>;
  policies?: Maybe<Array<ServicePolicyTranslatedInput>>;
  presentations?: Maybe<Array<ServicePresentationInput>>;
  serviceMetaInfo?: Maybe<Array<ServiceMetaInfoTranslationInput>>;
  title?: Maybe<Array<TranslationTextInput>>;
  treatments?: Maybe<Array<UpdateBeautyCenterTreatmentInput>>;
  type_of_seller?: Maybe<ServiceTypeOfSeller>;
  vat?: Maybe<Scalars["Float"]>;
};

export type UpdateHealthCenterAdminInput = {
  cancelationPolicies?: Maybe<Array<ServiceCancelationPolicyInput>>;
  id: Scalars["ID"];
  payment_methods?: Maybe<Array<ServicePaymentMethod>>;
  policies?: Maybe<Array<ServicePolicyTranslatedInput>>;
  presentations?: Maybe<Array<ServicePresentationInput>>;
  serviceMetaInfo?: Maybe<Array<ServiceMetaInfoTranslationInput>>;
  status?: Maybe<ServiceStatus>;
  vat?: Maybe<Scalars["Float"]>;
};

export type UpdateHotelAdminInput = {
  id: Scalars["ID"];
  location?: Maybe<ServiceLocationInput>;
  policies?: Maybe<Array<ServicePolicyTranslatedInput>>;
  presentations?: Maybe<Array<ServicePresentationInput>>;
  rooms?: Maybe<Array<UpdateHotelRoomAdminInput>>;
  serviceMetaInfo?: Maybe<Array<ServiceMetaInfoTranslationInput>>;
};

export type UpdateRestaurantAdminInput = {
  cuisinesTypeId?: Maybe<Scalars["ID"]>;
  dishs?: Maybe<Array<UpdateRestaurantMenuDishInput>>;
  establishmentTypeId?: Maybe<Scalars["ID"]>;
  id: Scalars["ID"];
  location?: Maybe<ServiceLocationInput>;
  menus?: Maybe<Array<UpdateRestaurantMenuInput>>;
  michelin_guide_stars?: Maybe<Scalars["Int"]>;
  payment_methods?: Maybe<Array<ServicePaymentMethod>>;
  policies?: Maybe<Array<ServicePolicyTranslatedInput>>;
  presentations?: Maybe<Array<ServicePresentationInput>>;
  serviceMetaInfo?: Maybe<Array<ServiceMetaInfoTranslationInput>>;
  setting_and_ambianceId?: Maybe<Scalars["ID"]>;
  status?: Maybe<ServiceStatus>;
  vat?: Maybe<Scalars["Int"]>;
};

export type UpdateVehicleAdminInput = {
  brand?: Maybe<Scalars["String"]>;
  cancelationPolicies?: Maybe<Array<ServiceCancelationPolicyInput>>;
  id: Scalars["ID"];
  insurance?: Maybe<Scalars["Float"]>;
  model?: Maybe<Scalars["String"]>;
  presentations?: Maybe<Array<ServicePresentationInput>>;
  price?: Maybe<Scalars["Float"]>;
  properties?: Maybe<CreateVehiclePropertiesInput>;
  title?: Maybe<Array<TranslationTextInput>>;
  typeId?: Maybe<Scalars["ID"]>;
};
