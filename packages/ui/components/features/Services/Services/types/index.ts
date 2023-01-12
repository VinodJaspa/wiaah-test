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
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: any;
};

export type ServiceCategoryFilterValue = {
  __typename?: "ServiceCategoryFilterValue";
  name: Scalars["String"];
  filteringValue: Scalars["String"];
  sortOrder: Scalars["Int"];
};

export type ServiceCategoryFilter = {
  __typename?: "ServiceCategoryFilter";
  filterGroupName: Scalars["String"];
  filteringKey: Scalars["String"];
  sortOrder: Scalars["Int"];
  filterValues: Array<ServiceCategoryFilterValue>;
};

export type Category = {
  __typename?: "Category";
  id: Scalars["ID"];
  name: Scalars["String"];
  filters: Array<ServiceCategoryFilter>;
};

export type ServicePresentation = {
  __typename?: "ServicePresentation";
  type: ServicePresentationType;
  src: Scalars["String"];
};

export enum ServicePresentationType {
  Img = "img",
  Vid = "vid",
}

export type ServicePolicy = {
  __typename?: "ServicePolicy";
  policyTitle: Scalars["String"];
  terms: Array<Scalars["String"]>;
};

export type ServiceMetaInfo = {
  __typename?: "ServiceMetaInfo";
  title: Scalars["String"];
  description: Scalars["String"];
  metaTagDescription: Scalars["String"];
  metaTagKeywords: Array<Scalars["String"]>;
  hashtags: Array<Scalars["String"]>;
};

export type ServiceDailyPrices = {
  __typename?: "ServiceDailyPrices";
  mo: Scalars["Int"];
  tu: Scalars["Int"];
  we: Scalars["Int"];
  th: Scalars["Int"];
  fr: Scalars["Int"];
  sa: Scalars["Int"];
  su: Scalars["Int"];
};

export type ServiceDiscount = {
  __typename?: "ServiceDiscount";
  value: Scalars["Int"];
  units: Scalars["Int"];
};

export type ServiceAmenity = {
  __typename?: "ServiceAmenity";
  value: Scalars["String"];
  label: Scalars["String"];
};

export type ServiceCancelationPolicy = {
  __typename?: "ServiceCancelationPolicy";
  duration: Scalars["Int"];
  cost: Scalars["Int"];
};

export type ServiceExtra = {
  __typename?: "ServiceExtra";
  name: Scalars["String"];
  cost: Scalars["Int"];
};

export type ServicePropertyMeasurements = {
  __typename?: "ServicePropertyMeasurements";
  inFeet: Scalars["Int"];
  inMeter: Scalars["Int"];
};

export type ServiceLocation = {
  __typename?: "ServiceLocation";
  address: Scalars["String"];
  country: Scalars["String"];
  state: Scalars["String"];
  city: Scalars["String"];
  lat: Scalars["Float"];
  lon: Scalars["Float"];
  postalCode: Scalars["Int"];
};

export type HotelRoom = {
  __typename?: "HotelRoom";
  id: Scalars["ID"];
  hotel?: Maybe<Hotel>;
  hotelId: Scalars["ID"];
  sellerId: Scalars["ID"];
  title: Scalars["String"];
  description: Scalars["String"];
  createdAt: Scalars["DateTime"];
  updatedAt: Scalars["DateTime"];
  pricePerNight: Scalars["Int"];
  dailyPrice: Scalars["Boolean"];
  presentations: Array<ServicePresentation>;
  dailyPrices?: Maybe<ServiceDailyPrices>;
  rating: Scalars["Float"];
  reviews: Scalars["Int"];
  discount: ServiceDiscount;
  includedServices?: Maybe<Array<Scalars["String"]>>;
  popularAmenities?: Maybe<Array<ServiceAmenity>>;
  cancelationPolicies: Array<ServiceCancelationPolicy>;
  extras?: Maybe<Array<ServiceExtra>>;
  includedAmenities?: Maybe<Array<Scalars["String"]>>;
  beds: Scalars["Int"];
  bathrooms: Scalars["Int"];
  num_of_rooms: Scalars["Int"];
  measurements: ServicePropertyMeasurements;
};

export type ServiceDayWorkingHours = {
  __typename?: "ServiceDayWorkingHours";
  periods: Array<Scalars["String"]>;
};

export type WeekdaysWorkingHours = {
  __typename?: "WeekdaysWorkingHours";
  mo?: Maybe<ServiceDayWorkingHours>;
  tu?: Maybe<ServiceDayWorkingHours>;
  we?: Maybe<ServiceDayWorkingHours>;
  th?: Maybe<ServiceDayWorkingHours>;
  fr?: Maybe<ServiceDayWorkingHours>;
  sa?: Maybe<ServiceDayWorkingHours>;
  su?: Maybe<ServiceDayWorkingHours>;
};

export type WorkingSchedule = {
  __typename?: "WorkingSchedule";
  id: Scalars["ID"];
  weekdays: WeekdaysWorkingHours;
};

export type ServiceContact = {
  __typename?: "ServiceContact";
  address: Scalars["String"];
  country: Scalars["String"];
  state?: Maybe<Scalars["String"]>;
  city: Scalars["String"];
  email: Scalars["String"];
  phone: Scalars["String"];
};

export type Account = {
  __typename?: "Account";
  id: Scalars["ID"];
};

export type Hotel = {
  __typename?: "Hotel";
  owner: Account;
  id: Scalars["ID"];
  ownerId: Scalars["ID"];
  createdAt: Scalars["DateTime"];
  updatedAt: Scalars["DateTime"];
  location: ServiceLocation;
  presentations: Array<ServicePresentation>;
  policies: Array<ServicePolicy>;
  serviceMetaInfo: ServiceMetaInfo;
  rooms: Array<HotelRoom>;
  contact: ServiceContact;
  workingHours?: Maybe<WorkingSchedule>;
};

export type RestaurantMenu = {
  __typename?: "RestaurantMenu";
  id: Scalars["ID"];
  name: Scalars["String"];
  dishs: Array<RestaurantDish>;
};

export type RestaurantDish = {
  __typename?: "RestaurantDish";
  id: Scalars["ID"];
  name: Scalars["String"];
  price: Scalars["Float"];
  ingredients: Array<Scalars["String"]>;
  thumbnail: Scalars["String"];
};

export type Restaurant = {
  __typename?: "Restaurant";
  owner: Account;
  contact: ServiceContact;
  workingHours?: Maybe<WorkingSchedule>;
  id: Scalars["ID"];
  ownerId: Scalars["ID"];
  vat: Scalars["Int"];
  status: ServiceStatus;
  location: ServiceLocation;
  presentations: Array<ServicePresentation>;
  policies: Array<ServicePolicy>;
  rating: Scalars["Float"];
  reviews: Scalars["Int"];
  cancelationPolicies: Array<ServiceCancelationPolicy>;
  serviceMetaInfo: ServiceMetaInfo;
  payment_methods: Array<ServicePaymentMethods>;
  menus: Array<RestaurantMenu>;
  lowest_price: Scalars["Float"];
  highest_price: Scalars["Float"];
  setting_and_ambianceId: Scalars["ID"];
  establishmentTypeId: Scalars["ID"];
  cuisinesTypeId: Scalars["ID"];
  michelin_guide_stars: Scalars["Int"];
};

export enum ServiceStatus {
  InActive = "inActive",
  Active = "active",
  Suspended = "suspended",
}

export enum ServicePaymentMethods {
  CreditCard = "credit_card",
  Visa = "visa",
  Mastercard = "mastercard",
  Check = "check",
  Cash = "cash",
}

export type BeautyCenterTreatmentCategory = {
  __typename?: "BeautyCenterTreatmentCategory";
  id: Scalars["ID"];
  createdById: Scalars["ID"];
  createdAt: Scalars["DateTime"];
  updatedAt: Scalars["DateTime"];
  title: Scalars["String"];
};

export type BeautyCenterTreatment = {
  __typename?: "BeautyCenterTreatment";
  id: Scalars["ID"];
  treatmentCategoryId: Scalars["ID"];
  category?: Maybe<BeautyCenterTreatmentCategory>;
  title: Scalars["String"];
  price: Scalars["Float"];
  duration: Array<Scalars["Int"]>;
  discount: ServiceDiscount;
};

export type BeautyCenter = {
  __typename?: "BeautyCenter";
  id: Scalars["ID"];
  contact: ServiceContact;
  ownerId: Scalars["ID"];
  owner?: Maybe<Account>;
  createdAt: Scalars["DateTime"];
  updatedAt: Scalars["DateTime"];
  vat: Scalars["Float"];
  rating: Scalars["Float"];
  totalReviews: Scalars["Int"];
  beauty_center_typeId: Scalars["ID"];
  status: ServiceStatus;
  title: Scalars["String"];
  location: ServiceLocation;
  presentations: Array<ServicePresentation>;
  policies: Array<ServicePolicy>;
  serviceMetaInfo: ServiceMetaInfo;
  payment_methods: Array<ServicePaymentMethods>;
  cancelationPolicies: Array<ServiceCancelationPolicy>;
  type_of_seller: ServiceTypeOfSeller;
  treatments: Array<BeautyCenterTreatment>;
  workingHours?: Maybe<WorkingSchedule>;
};

export enum ServiceTypeOfSeller {
  Individual = "individual",
  Professional = "professional",
}

export type HealthCenterSpecialty = {
  __typename?: "HealthCenterSpecialty";
  id: Scalars["ID"];
  doctors?: Maybe<Array<HealthCenterDoctor>>;
  name: Scalars["String"];
  description: Scalars["String"];
};

export type HealthCenterDoctor = {
  __typename?: "HealthCenterDoctor";
  id: Scalars["ID"];
  healthCenter?: Maybe<HealthCenter>;
  speciality?: Maybe<HealthCenterSpecialty>;
  healthCenterId: Scalars["ID"];
  specialityId: Scalars["ID"];
  rating: Scalars["Float"];
  name: Scalars["String"];
  thumbnail: Scalars["String"];
  price: Scalars["Float"];
  description: Scalars["String"];
  availablityStatus: HealthCenterDoctorAvailablityStatus;
};

export enum HealthCenterDoctorAvailablityStatus {
  Available = "available",
  Unavailable = "unavailable",
}

export type HealthCenter = {
  __typename?: "HealthCenter";
  owner?: Maybe<Account>;
  contact: ServiceContact;
  id: Scalars["ID"];
  ownerId: Scalars["ID"];
  vat: Scalars["Float"];
  rating: Scalars["Float"];
  totalReviews: Scalars["Int"];
  location: ServiceLocation;
  status: ServiceStatus;
  presentations: Array<ServicePresentation>;
  policies: Array<ServicePolicy>;
  serviceMetaInfo: ServiceMetaInfo;
  payment_methods: Array<ServicePaymentMethods>;
  cancelationPolicies: Array<ServiceCancelationPolicy>;
  doctors: Array<HealthCenterDoctor>;
  workingHours: WorkingSchedule;
};

export type VehicleProperties = {
  __typename?: "VehicleProperties";
  seats: Scalars["Int"];
  windows: Scalars["Int"];
  maxSpeedInKm: Scalars["Int"];
  lugaggeCapacity: Scalars["Int"];
  gpsAvailable: Scalars["Boolean"];
  airCondition: Scalars["Boolean"];
};

export type Vehicle = {
  __typename?: "Vehicle";
  id: Scalars["ID"];
  title: Scalars["String"];
  presentations: Array<ServicePresentation>;
  brand: Scalars["String"];
  model: Scalars["String"];
  price: Scalars["Int"];
  cancelationPolicies: Array<ServiceCancelationPolicy>;
  properties: VehicleProperties;
};

export type VehicleService = {
  __typename?: "VehicleService";
  id: Scalars["ID"];
  ownerId: Scalars["ID"];
  owner: Account;
  workingHours: WorkingSchedule;
  contact: ServiceContact;
  createdAt: Scalars["DateTime"];
  updatedAt: Scalars["DateTime"];
  vat: Scalars["Float"];
  rating: Scalars["Float"];
  totalReviews: Scalars["Int"];
  location: ServiceLocation;
  presentations: Array<ServicePresentation>;
  policies: Array<ServicePolicy>;
  serviceMetaInfo: ServiceMetaInfo;
  payment_methods: Array<ServicePaymentMethods>;
  cancelationPolicies: Array<ServiceCancelationPolicy>;
  vehicles: Array<Vehicle>;
};

export type Service = {
  __typename?: "Service";
  id: Scalars["ID"];
  serviceType: ServiceType;
  title: Scalars["String"];
  price: Scalars["Float"];
  rating: Scalars["Float"];
  thumbnail: Scalars["String"];
};

export enum ServiceType {
  Hotel = "hotel",
  HolidayRentals = "holiday_rentals",
  Restaurant = "restaurant",
  HealthCenter = "health_center",
  BeautyCenter = "beauty_center",
  Vehicle = "vehicle",
}

export type Insurance = {
  __typename?: "Insurance";
  id: Scalars["ID"];
  itemId: Scalars["ID"];
  buyerId: Scalars["ID"];
  sellerId: Scalars["ID"];
  itemType: Scalars["String"];
  amount: Scalars["Float"];
  status: ServiceInsuranceStatusEnum;
  createdAt: Scalars["DateTime"];
  updatedAt: Scalars["DateTime"];
};

export enum ServiceInsuranceStatusEnum {
  Pending = "pending",
  Paid = "paid",
  Requested = "requested",
  Refused = "refused",
  Refunded = "refunded",
}

export type ServiceDiscovery = {
  __typename?: "ServiceDiscovery";
  id: Scalars["ID"];
  thumbnail: Scalars["String"];
  title: Scalars["String"];
  sellerName: Scalars["String"];
  sellerId: Scalars["ID"];
  price: Array<Scalars["Float"]>;
  type: ServiceType;
  status: ServiceStatus;
  updatedAt: Scalars["String"];
};

export type Query = {
  __typename?: "Query";
  getAllServices: Array<Service>;
  getMyWorkingSchedule: WorkingSchedule;
  getInsurances: Array<Insurance>;
  getServiceInsuranceHistory: Array<Insurance>;
  getFilteredServices: Array<ServiceDiscovery>;
  getServiceCategoryById: Category;
  getServiceCategories: Array<Category>;
  getHotels: Array<Hotel>;
  getHotelService: Hotel;
  searchHotelRooms: Array<HotelRoom>;
  getRestaurants: Array<Restaurant>;
  getRestaurant: Restaurant;
  searchFilteredRestaurant: Array<Restaurant>;
  getHealthCenter: HealthCenter;
  searchHealthCenters: Array<HealthCenter>;
  searchHealthCenterDoctors: Array<HealthCenterDoctor>;
  getBeautyCenterById: BeautyCenter;
  getFilteredBeuatyCenterTreatments: Array<BeautyCenterTreatment>;
  getBeautyCenterTreatmentCategories: Array<BeautyCenterTreatmentCategory>;
  getBeautyCenterTreatmentCategoriesByIds: Array<BeautyCenterTreatmentCategory>;
  getAllVehicles: Array<VehicleService>;
  getVehicleServicebyId: VehicleService;
};

export type QueryGetAllServicesArgs = {
  args: GetFilteredServicesInput;
};

export type QueryGetInsurancesArgs = {
  args: GetInsurancesInput;
};

export type QueryGetServiceInsuranceHistoryArgs = {
  args: GetInsurancesHistoryInput;
};

export type QueryGetFilteredServicesArgs = {
  args: GetFilteredServicesAdminInput;
};

export type QueryGetServiceCategoryByIdArgs = {
  categoryId: Scalars["String"];
};

export type QueryGetServiceCategoriesArgs = {
  args?: Maybe<GetFilteredCategoriesInput>;
};

export type QueryGetHotelServiceArgs = {
  getHotelServiceArgs: GetHotelServiceArgs;
};

export type QuerySearchHotelRoomsArgs = {
  searchHotelRoomsArgs: SearchHotelRoomLocationInput;
};

export type QueryGetRestaurantArgs = {
  getRestaurantArgs: GetRestaurantInput;
};

export type QuerySearchFilteredRestaurantArgs = {
  filtersInput: SearchFilteredRestaurantInput;
};

export type QueryGetHealthCenterArgs = {
  serviceId: Scalars["String"];
};

export type QuerySearchHealthCentersArgs = {
  searchHealthCenterArgs: SearchHealthCenterInput;
};

export type QuerySearchHealthCenterDoctorsArgs = {
  searchHealthCenterArgs: SearchHealthCenterInput;
};

export type QueryGetBeautyCenterByIdArgs = {
  id: Scalars["String"];
};

export type QueryGetFilteredBeuatyCenterTreatmentsArgs = {
  args: SearchFilteredBeautyCenterInput;
};

export type QueryGetBeautyCenterTreatmentCategoriesByIdsArgs = {
  ids: Array<Scalars["String"]>;
};

export type QueryGetAllVehiclesArgs = {
  args: GetVehiclesInput;
};

export type QueryGetVehicleServicebyIdArgs = {
  id: Scalars["String"];
};

export type GetFilteredServicesInput = {
  pagination: GqlPaginationInput;
};

export type GqlPaginationInput = {
  page: Scalars["Int"];
  take: Scalars["Int"];
};

export type GetInsurancesInput = {
  pagination: GqlPaginationInput;
  status: ServiceInsuranceStatusEnum;
};

export type GetInsurancesHistoryInput = {
  id?: Maybe<Scalars["ID"]>;
  thumbnail?: Maybe<Scalars["String"]>;
  seller?: Maybe<Scalars["String"]>;
  buyer?: Maybe<Scalars["String"]>;
  service?: Maybe<Scalars["String"]>;
  status?: Maybe<ServiceInsuranceStatusEnum>;
  amount?: Maybe<Scalars["Float"]>;
  pagination: GqlPaginationInput;
};

export type GetFilteredServicesAdminInput = {
  id: Scalars["ID"];
  title: Scalars["String"];
  sellerName: Scalars["String"];
  sellerId: Scalars["ID"];
  price: Scalars["Float"];
  type: ServiceType;
  status: ServiceStatus;
  updatedAt: Scalars["String"];
};

export type GetFilteredCategoriesInput = {
  name?: Maybe<Scalars["String"]>;
  sortOrder?: Maybe<Scalars["String"]>;
};

export type GetHotelServiceArgs = {
  id: Scalars["ID"];
};

export type SearchHotelRoomLocationInput = {
  pagination?: Maybe<GqlPaginationInput>;
  query?: Maybe<Scalars["String"]>;
  property_type?: Maybe<Scalars["String"]>;
  num_of_rooms?: Maybe<Scalars["Int"]>;
  num_of_beds?: Maybe<Scalars["Int"]>;
  hotel_class?: Maybe<Scalars["Int"]>;
  rating?: Maybe<Scalars["Int"]>;
  minPrice?: Maybe<Scalars["Float"]>;
  maxPrice?: Maybe<Scalars["Float"]>;
};

export type GetRestaurantInput = {
  id: Scalars["ID"];
};

export type SearchFilteredRestaurantInput = {
  pagination?: Maybe<GqlPaginationInput>;
  establishmentTypeId?: Maybe<Scalars["ID"]>;
  cusinesTypeId?: Maybe<Scalars["ID"]>;
  settingAndAmbinaceId?: Maybe<Scalars["ID"]>;
  foodType?: Maybe<Scalars["String"]>;
  paymentMethods?: Maybe<Array<ServicePaymentMethods>>;
  rating?: Maybe<Scalars["Int"]>;
  minPrice?: Maybe<Scalars["Float"]>;
  maxPrice?: Maybe<Scalars["Int"]>;
  query?: Maybe<Scalars["String"]>;
};

export type SearchHealthCenterInput = {
  pagination?: Maybe<GqlPaginationInput>;
  query?: Maybe<Scalars["String"]>;
  specialistType?: Maybe<Scalars["String"]>;
  speakingLanguage?: Maybe<Scalars["String"]>;
  payment_methods?: Maybe<Array<ServicePaymentMethods>>;
  rate?: Maybe<Scalars["Int"]>;
  minPrice?: Maybe<Scalars["Float"]>;
  maxPrice?: Maybe<Scalars["Float"]>;
};

export type SearchFilteredBeautyCenterInput = {
  pagination?: Maybe<GqlPaginationInput>;
  typeOfSeller?: Maybe<Scalars["String"]>;
  beautyCenterTypeId?: Maybe<Scalars["ID"]>;
  beautySalonTypeId?: Maybe<Scalars["ID"]>;
  treatmentTypeId?: Maybe<Scalars["ID"]>;
  cancelationOption?: Maybe<Scalars["Boolean"]>;
  rating?: Maybe<Scalars["Int"]>;
  minPrice?: Maybe<Scalars["Float"]>;
  maxPrice?: Maybe<Scalars["Float"]>;
  query?: Maybe<Scalars["String"]>;
};

export type GetVehiclesInput = {
  pagination: GqlPaginationInput;
  q: Scalars["String"];
};

export type Mutation = {
  __typename?: "Mutation";
  updateMyWorkingSchedule: WorkingSchedule;
  requestInsurancePayBack: Scalars["Boolean"];
  refuseInsurancePayBackRequest: Scalars["Boolean"];
  acceptInsurancePayBackRequest: Scalars["Boolean"];
  updateHotelAdmin: Scalars["Boolean"];
  updateRestaurantAdmin: Restaurant;
  updateHealthCentertAdmin: Scalars["Boolean"];
  updateBeautyCenterAdmin: Scalars["Boolean"];
  updateVehicleAdmin: Scalars["Boolean"];
  createServiceCategory: Category;
  updateServiceCategory: Category;
  removeServiceCategory: Category;
  createHotelService: Hotel;
  createRestaurantService: Restaurant;
  updateRestaurant: Restaurant;
  deleteRestaurant: Restaurant;
  activateRestaurant: Restaurant;
  createHealthCenter: HealthCenter;
  updateHealthCenter: HealthCenter;
  createHealthCenterSpeciality: HealthCenterSpecialty;
  createBeautyCenter: BeautyCenter;
  updateBeautyCenter: BeautyCenter;
  deleteBeautyCenter: Scalars["Boolean"];
  createBeautyCenterTreatmentCategory: BeautyCenterTreatmentCategory;
  deleteBeautyCenterServices: Scalars["Boolean"];
  updateTreatmentCategories: Array<BeautyCenterTreatmentCategory>;
  createVehicle: VehicleService;
};

export type MutationUpdateMyWorkingScheduleArgs = {
  args: UpdateWorkingScheduleInput;
};

export type MutationRequestInsurancePayBackArgs = {
  bookId: Scalars["ID"];
};

export type MutationRefuseInsurancePayBackRequestArgs = {
  bookId: Scalars["ID"];
};

export type MutationAcceptInsurancePayBackRequestArgs = {
  bookId: Scalars["ID"];
};

export type MutationUpdateRestaurantAdminArgs = {
  updateRestaurantArgs: UpdateRestaurantAdminInput;
};

export type MutationCreateServiceCategoryArgs = {
  createServiceCategoryArgs: CreateCategoryInput;
};

export type MutationUpdateServiceCategoryArgs = {
  updateServiceCategoryArgs: UpdateCategoryInput;
};

export type MutationRemoveServiceCategoryArgs = {
  serviceCategoryId: Scalars["String"];
};

export type MutationCreateHotelServiceArgs = {
  createHotelServiceArgs: CreateHotelInput;
};

export type MutationCreateRestaurantServiceArgs = {
  createRestaurantArgs: CreateRestaurantInput;
};

export type MutationUpdateRestaurantArgs = {
  updateRestaurantArgs: UpdateRestaurantInput;
};

export type MutationDeleteRestaurantArgs = {
  deleteRestaurantArgs: DeleteRestaurantInput;
};

export type MutationActivateRestaurantArgs = {
  id: Scalars["Int"];
};

export type MutationCreateHealthCenterArgs = {
  createHealthCenterArgs: CreateHealthCenterInput;
};

export type MutationUpdateHealthCenterArgs = {
  updateHealthCenterArgs: UpdateHealthCenterInput;
};

export type MutationCreateHealthCenterSpecialityArgs = {
  createHealthCenterSpecialityArgs: CreateHealthCenterSpecialityInput;
};

export type MutationCreateBeautyCenterArgs = {
  createBeautyCenterArgs: CreateBeautyCenterInput;
};

export type MutationUpdateBeautyCenterArgs = {
  updateBeautyCenter: UpdateBeautyCenterInput;
};

export type MutationDeleteBeautyCenterArgs = {
  deleteBeautyCenter: DeleteTreatmentCategoryInput;
};

export type MutationCreateBeautyCenterTreatmentCategoryArgs = {
  createBeautyCenterTreatmentCategory: CreateBeautyCenterTreatmentCategoryInput;
};

export type MutationDeleteBeautyCenterServicesArgs = {
  deleteBeautyCenterServices: DeleteTreatmentCategoriesInput;
};

export type MutationUpdateTreatmentCategoriesArgs = {
  updateTreatmentCategoriesArgs: UpdateTreatmentCategoriesInput;
};

export type MutationCreateVehicleArgs = {
  createVehicleInput: CreateVehicleServiceInput;
};

export type UpdateWorkingScheduleInput = {
  weekdays?: Maybe<UpdateWeekdaysWorkingHoursInput>;
  specialDays?: Maybe<Array<SpecialDayWorkingHoursInput>>;
};

export type UpdateWeekdaysWorkingHoursInput = {
  mo?: Maybe<ServiceDayWorkingHoursInput>;
  tu?: Maybe<ServiceDayWorkingHoursInput>;
  we?: Maybe<ServiceDayWorkingHoursInput>;
  th?: Maybe<ServiceDayWorkingHoursInput>;
  fr?: Maybe<ServiceDayWorkingHoursInput>;
  sa?: Maybe<ServiceDayWorkingHoursInput>;
  su?: Maybe<ServiceDayWorkingHoursInput>;
};

export type ServiceDayWorkingHoursInput = {
  periods: Array<Scalars["String"]>;
};

export type SpecialDayWorkingHoursInput = {
  date: Scalars["String"];
  workingHours: ServiceDayWorkingHoursInput;
};

export type UpdateRestaurantAdminInput = {
  vat?: Maybe<Scalars["Int"]>;
  status?: Maybe<ServiceStatus>;
  location?: Maybe<ServiceLocationInput>;
  presentations?: Maybe<Array<ServicePresentationInput>>;
  policies?: Maybe<Array<ServicePolicyTranslatedInput>>;
  serviceMetaInfo?: Maybe<Array<ServiceMetaInfoTranslationInput>>;
  payment_methods?: Maybe<Array<ServicePaymentMethods>>;
  menus?: Maybe<Array<UpdateRestaurantMenuInput>>;
  establishmentTypeId?: Maybe<Scalars["ID"]>;
  cuisinesTypeId?: Maybe<Scalars["ID"]>;
  setting_and_ambianceId?: Maybe<Scalars["ID"]>;
  michelin_guide_stars?: Maybe<Scalars["Int"]>;
  dishs?: Maybe<Array<UpdateRestaurantMenuDishInput>>;
  id: Scalars["ID"];
};

export type ServiceLocationInput = {
  address: Scalars["String"];
  country: Scalars["String"];
  state: Scalars["String"];
  city: Scalars["String"];
  lat: Scalars["Float"];
  lon: Scalars["Float"];
  postalCode: Scalars["Int"];
};

export type ServicePresentationInput = {
  type: ServicePresentationType;
  src: Scalars["String"];
};

export type ServicePolicyTranslatedInput = {
  langId: Scalars["String"];
  value: Array<ServicePolicyInput>;
};

export type ServicePolicyInput = {
  policyTitle: Scalars["String"];
  terms: Array<Scalars["String"]>;
};

export type ServiceMetaInfoTranslationInput = {
  langId: Scalars["String"];
  value: ServiceMetaInfoInput;
};

export type ServiceMetaInfoInput = {
  title: Scalars["String"];
  description: Scalars["String"];
  metaTagDescription: Scalars["String"];
  metaTagKeywords: Array<Scalars["String"]>;
  hashtags: Array<Scalars["String"]>;
};

export type UpdateRestaurantMenuInput = {
  id: Scalars["ID"];
  name: Array<TranslationTextInput>;
  dishs: Array<UpdateRestaurantMenuDishInput>;
};

export type TranslationTextInput = {
  langId: Scalars["String"];
  value: Scalars["String"];
};

export type UpdateRestaurantMenuDishInput = {
  id: Scalars["ID"];
  name: Array<TranslationTextInput>;
  price: Scalars["Int"];
  ingredients: Array<TranslationTextArrayInput>;
  thumbnail: Scalars["String"];
};

export type TranslationTextArrayInput = {
  langId: Scalars["String"];
  value: Array<Scalars["String"]>;
};

export type CreateCategoryInput = {
  name: Array<TranslationTextInput>;
  filters: Array<ServiceCategoryFilterInput>;
};

export type ServiceCategoryFilterInput = {
  filterGroupName: Array<TranslationTextInput>;
  filteringKey: Scalars["String"];
  sortOrder: Scalars["Int"];
  filterValues: Array<ServiceCategoryFilterValueInput>;
};

export type ServiceCategoryFilterValueInput = {
  name: Array<TranslationTextInput>;
  filteringValue: Scalars["String"];
  sortOrder: Scalars["Int"];
};

export type UpdateCategoryInput = {
  name?: Maybe<Array<TranslationTextInput>>;
  filters?: Maybe<Array<ServiceCategoryFilterInput>>;
  id: Scalars["String"];
};

export type CreateHotelInput = {
  contact: ServiceContactInput;
  presentations: Array<ServicePresentationInput>;
  location: ServiceLocationInput;
  policies: Array<ServicePolicyTranslatedInput>;
  serviceMetaInfo: Array<ServiceMetaInfoTranslationInput>;
  rooms: Array<HotelRoomInput>;
};

export type ServiceContactInput = {
  address: Scalars["String"];
  country: Scalars["String"];
  state?: Maybe<Scalars["String"]>;
  city: Scalars["String"];
  email: Scalars["String"];
  phone: Scalars["String"];
};

export type HotelRoomInput = {
  roomMetaInfo: Array<HotelRoomTranslationMetaInfoInput>;
  pricePerNight: Scalars["Int"];
  dailyPrice: Scalars["Boolean"];
  dailyPrices?: Maybe<ServiceDailyPricesInput>;
  discount: ServiceDiscountInput;
  includedServices: Array<ServiceIncludedServicesInput>;
  popularAmenities: Array<ServiceAmenitiesInput>;
  cancelationPolicies: Array<ServiceCancelationPolicyInput>;
  beds: Scalars["Int"];
  bathrooms: Scalars["Int"];
  extras: Array<ServiceExtraInput>;
  num_of_rooms: Scalars["Int"];
  includedAmenities: Array<ServiceIncludedAmenitiesInput>;
  measurements: ServicePropertyMeasurementsInput;
  insurance: Scalars["Float"];
  presentations: Array<ServicePresentationInput>;
};

export type HotelRoomTranslationMetaInfoInput = {
  langId: Scalars["String"];
  value: HotelRoomMetaInfoInput;
};

export type HotelRoomMetaInfoInput = {
  title: Scalars["String"];
  description: Scalars["String"];
};

export type ServiceDailyPricesInput = {
  mo: Scalars["Int"];
  tu: Scalars["Int"];
  we: Scalars["Int"];
  th: Scalars["Int"];
  fr: Scalars["Int"];
  sa: Scalars["Int"];
  su: Scalars["Int"];
};

export type ServiceDiscountInput = {
  value: Scalars["Int"];
  units: Scalars["Int"];
};

export type ServiceIncludedServicesInput = {
  langId: Scalars["String"];
  value: Array<Scalars["String"]>;
};

export type ServiceAmenitiesInput = {
  value: Scalars["String"];
  label: Array<ServiceAmenitiesLabelTranslationInput>;
};

export type ServiceAmenitiesLabelTranslationInput = {
  langId: Scalars["String"];
  value: Scalars["String"];
};

export type ServiceCancelationPolicyInput = {
  duration: Scalars["Int"];
  cost: Scalars["Int"];
};

export type ServiceExtraInput = {
  name: Array<ServiceExtraNameTranslationInput>;
  cost: Scalars["Int"];
};

export type ServiceExtraNameTranslationInput = {
  langId: Scalars["String"];
  value: Scalars["String"];
};

export type ServiceIncludedAmenitiesInput = {
  langId: Scalars["String"];
  value: Array<Scalars["String"]>;
};

export type ServicePropertyMeasurementsInput = {
  inFeet: Scalars["Int"];
  inMeter: Scalars["Int"];
};

export type CreateRestaurantInput = {
  contact: ServiceContactInput;
  vat: Scalars["Int"];
  status?: Maybe<ServiceStatus>;
  location: ServiceLocationInput;
  presentations: Array<ServicePresentationInput>;
  policies: Array<ServicePolicyTranslatedInput>;
  serviceMetaInfo: Array<ServiceMetaInfoTranslationInput>;
  payment_methods: Array<ServicePaymentMethods>;
  menus: Array<RestaurantMenuInput>;
  establishmentTypeId: Scalars["ID"];
  cuisinesTypeId: Scalars["ID"];
  setting_and_ambianceId: Scalars["ID"];
  michelin_guide_stars: Scalars["Int"];
};

export type RestaurantMenuInput = {
  name: Array<TranslationTextInput>;
  dishs: Array<RestaurantMenuDishInput>;
};

export type RestaurantMenuDishInput = {
  name: Array<TranslationTextInput>;
  price: Scalars["Int"];
  ingredients: Array<TranslationTextArrayInput>;
  thumbnail: Scalars["String"];
};

export type UpdateRestaurantInput = {
  vat?: Maybe<Scalars["Int"]>;
  status?: Maybe<ServiceStatus>;
  location?: Maybe<ServiceLocationInput>;
  presentations?: Maybe<Array<ServicePresentationInput>>;
  policies?: Maybe<Array<ServicePolicyTranslatedInput>>;
  serviceMetaInfo?: Maybe<Array<ServiceMetaInfoTranslationInput>>;
  payment_methods?: Maybe<Array<ServicePaymentMethods>>;
  menus?: Maybe<Array<UpdateRestaurantMenuInput>>;
  establishmentTypeId?: Maybe<Scalars["ID"]>;
  cuisinesTypeId?: Maybe<Scalars["ID"]>;
  setting_and_ambianceId?: Maybe<Scalars["ID"]>;
  michelin_guide_stars?: Maybe<Scalars["Int"]>;
  dishs?: Maybe<Array<UpdateRestaurantMenuDishInput>>;
  id: Scalars["ID"];
};

export type DeleteRestaurantInput = {
  id: Scalars["String"];
};

export type CreateHealthCenterInput = {
  vat: Scalars["Float"];
  presentations: Array<ServicePresentationInput>;
  policies: Array<ServicePolicyTranslatedInput>;
  location: ServiceLocationInput;
  serviceMetaInfo: Array<ServiceMetaInfoTranslationInput>;
  payment_methods: Array<ServicePaymentMethods>;
  cancelationPolicies: Array<ServiceCancelationPolicyInput>;
  contact: ServiceContactInput;
  doctors: Array<HealthCenterDoctorInput>;
};

export type HealthCenterDoctorInput = {
  specialityId: Scalars["ID"];
  name: Scalars["String"];
  thumbnail: Scalars["String"];
  price: Scalars["Float"];
  description: Array<TranslationTextInput>;
  availablityStatus: HealthCenterDoctorAvailablityStatus;
};

export type UpdateHealthCenterInput = {
  vat?: Maybe<Scalars["Float"]>;
  presentations?: Maybe<Array<ServicePresentationInput>>;
  policies?: Maybe<Array<ServicePolicyTranslatedInput>>;
  serviceMetaInfo?: Maybe<Array<ServiceMetaInfoTranslationInput>>;
  payment_methods?: Maybe<Array<ServicePaymentMethods>>;
  cancelationPolicies?: Maybe<Array<ServiceCancelationPolicyInput>>;
  status?: Maybe<ServiceStatus>;
  id: Scalars["ID"];
};

export type CreateHealthCenterSpecialityInput = {
  name: Array<TranslationTextInput>;
  description: Array<TranslationTextInput>;
};

export type CreateBeautyCenterInput = {
  vat: Scalars["Float"];
  beauty_center_typeId: Scalars["ID"];
  title: Array<TranslationTextInput>;
  location: ServiceLocationInput;
  presentations: Array<ServicePresentationInput>;
  policies: Array<ServicePolicyTranslatedInput>;
  serviceMetaInfo: Array<ServiceMetaInfoTranslationInput>;
  payment_methods: Array<ServicePaymentMethods>;
  cancelationPolicies: Array<ServiceCancelationPolicyInput>;
  type_of_seller: ServiceTypeOfSeller;
  treatments: Array<CreateBeautyCenterTreatmentInput>;
};

export type CreateBeautyCenterTreatmentInput = {
  treatmentCategoryId: Scalars["ID"];
  title: Array<TranslationTextInput>;
  price: Scalars["Float"];
  duration: Array<Scalars["Int"]>;
  discount: ServiceDiscountInput;
};

export type UpdateBeautyCenterInput = {
  vat?: Maybe<Scalars["Float"]>;
  beauty_center_typeId?: Maybe<Scalars["ID"]>;
  title?: Maybe<Array<TranslationTextInput>>;
  presentations?: Maybe<Array<ServicePresentationInput>>;
  policies?: Maybe<Array<ServicePolicyTranslatedInput>>;
  serviceMetaInfo?: Maybe<Array<ServiceMetaInfoTranslationInput>>;
  payment_methods?: Maybe<Array<ServicePaymentMethods>>;
  cancelationPolicies?: Maybe<Array<ServiceCancelationPolicyInput>>;
  type_of_seller?: Maybe<ServiceTypeOfSeller>;
  treatments?: Maybe<Array<UpdateBeautyCenterTreatmentInput>>;
  id: Scalars["ID"];
};

export type UpdateBeautyCenterTreatmentInput = {
  treatmentCategoryId?: Maybe<Scalars["ID"]>;
  title?: Maybe<Array<TranslationTextInput>>;
  price?: Maybe<Scalars["Float"]>;
  duration?: Maybe<Array<Scalars["Int"]>>;
  discount?: Maybe<ServiceDiscountInput>;
  id: Scalars["ID"];
};

export type DeleteTreatmentCategoryInput = {
  id: Scalars["ID"];
};

export type CreateBeautyCenterTreatmentCategoryInput = {
  title: Array<TranslationTextInput>;
};

export type DeleteTreatmentCategoriesInput = {
  ids: Array<Scalars["ID"]>;
};

export type UpdateTreatmentCategoriesInput = {
  title?: Maybe<Array<TranslationTextInput>>;
  ids: Array<Scalars["ID"]>;
};

export type CreateVehicleServiceInput = {
  contact: ServiceContactInput;
  vat: Scalars["Float"];
  location: ServiceLocationInput;
  presentations: Array<ServicePresentationInput>;
  policies: Array<ServicePolicyTranslatedInput>;
  serviceMetaInfo: Array<ServiceMetaInfoTranslationInput>;
  payment_methods: Array<ServicePaymentMethods>;
  vehicles: Array<CreateVehicleInput>;
};

export type CreateVehicleInput = {
  typeId: Scalars["ID"];
  title: Array<TranslationTextInput>;
  presentations: Array<ServicePresentationInput>;
  cancelationPolicies: Array<ServiceCancelationPolicyInput>;
  brand: Scalars["String"];
  model: Scalars["String"];
  price: Scalars["Float"];
  properties: CreateVehiclePropertiesInput;
  insurance: Scalars["Float"];
};

export type CreateVehiclePropertiesInput = {
  seats: Scalars["Int"];
  windows: Scalars["Int"];
  maxSpeedInKm: Scalars["Int"];
  lugaggeCapacity: Scalars["Int"];
  gpsAvailable: Scalars["Boolean"];
  airCondition: Scalars["Boolean"];
};

export type GetHotelRoomsQueryVariables = Exact<{
  args: SearchHotelRoomLocationInput;
}>;

export type GetHotelRoomsQuery = { __typename?: "Query" } & {
  searchHotelRooms: Array<
    { __typename?: "HotelRoom" } & Pick<
      HotelRoom,
      | "bathrooms"
      | "beds"
      | "createdAt"
      | "dailyPrice"
      | "description"
      | "hotelId"
      | "id"
      | "includedAmenities"
      | "includedServices"
      | "num_of_rooms"
      | "pricePerNight"
      | "rating"
      | "reviews"
      | "sellerId"
      | "title"
      | "updatedAt"
    > & {
        cancelationPolicies: Array<
          { __typename?: "ServiceCancelationPolicy" } & Pick<
            ServiceCancelationPolicy,
            "cost" | "duration"
          >
        >;
        dailyPrices?: Maybe<
          { __typename?: "ServiceDailyPrices" } & Pick<
            ServiceDailyPrices,
            "fr" | "mo" | "sa" | "su" | "th" | "tu" | "we"
          >
        >;
        discount: { __typename?: "ServiceDiscount" } & Pick<
          ServiceDiscount,
          "units" | "value"
        >;
        extras?: Maybe<
          Array<
            { __typename?: "ServiceExtra" } & Pick<
              ServiceExtra,
              "cost" | "name"
            >
          >
        >;
        measurements: { __typename?: "ServicePropertyMeasurements" } & Pick<
          ServicePropertyMeasurements,
          "inFeet" | "inMeter"
        >;
        popularAmenities?: Maybe<
          Array<
            { __typename?: "ServiceAmenity" } & Pick<
              ServiceAmenity,
              "label" | "value"
            >
          >
        >;
        presentations: Array<
          { __typename?: "ServicePresentation" } & Pick<
            ServicePresentation,
            "src" | "type"
          >
        >;
      }
  >;
};
