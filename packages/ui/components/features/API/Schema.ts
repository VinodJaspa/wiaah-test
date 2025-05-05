import { IconType } from "react-icons";
import { ServiceCategoryFilterInput } from "./gql/generated";

export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never;
    };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string | number; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: any; output: any };
  /** The `Upload` scalar type represents a file upload. */
  Upload: { input: any; output: any };
};

export type AcceptReceivedOrderInput = {
  id: Scalars["ID"]["input"];
};

export type AcceptRequestedOrderInput = {
  id: Scalars["ID"]["input"];
};

export type Account = {
  __typename?: "Account";
  Membership?: Maybe<Membership>;
  accountType: AccountType;
  companyRegisterationNumber?: Maybe<Scalars["String"]["output"]>;
  createdAt: Scalars["DateTime"]["output"];
  currency: Scalars["String"]["output"];
  email: Scalars["String"]["output"];
  firstName: Scalars["String"]["output"];
  id: Scalars["ID"]["output"];
  ips: Array<Scalars["String"]["output"]>;
  lang: Scalars["String"]["output"];
  lastActiveAt: Scalars["String"]["output"];
  lastName: Scalars["String"]["output"];
  membership?: Maybe<Membership>;
  membershipId?: Maybe<Scalars["ID"]["output"]>;
  phone?: Maybe<Scalars["String"]["output"]>;
  photo?: Maybe<Scalars["String"]["output"]>;
  profile?: Maybe<Profile>;
  service: Service;
  shop?: Maybe<Shop>;
  status: AccountStatus;
  stripeId?: Maybe<Scalars["String"]["output"]>;
  subscribedPlan?: Maybe<MembershipSubscription>;
  updatedAt: Scalars["DateTime"]["output"];
  verified: Scalars["Boolean"]["output"];
};

export type AccountDeletionRequest = {
  __typename?: "AccountDeletionRequest";
  account: Account;
  accountId: Scalars["ID"]["output"];
  createdAt: Scalars["String"]["output"];
  id: Scalars["ID"]["output"];
  status: AccountDeletionRequestStatus;
  updatedAt: Scalars["String"]["output"];
};

export enum AccountDeletionRequestStatus {
  Approved = "approved",
  Pending = "pending",
  Rejected = "rejected",
}

export enum AccountGenderEnum {
  Female = "female",
  Male = "male",
}

export type AccountInputData = {
  __typename?: "AccountInputData";
  firstName: Scalars["String"]["output"];
  lastName: Scalars["String"]["output"];
  password: Scalars["String"]["output"];
};

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
  Mod = "mod",
  Seller = "seller",
}

export type AccountVerification = {
  __typename?: "AccountVerification";
  acceptedById?: Maybe<Scalars["ID"]["output"]>;
  categoryId: Scalars["ID"]["output"];
  createdAt: Scalars["DateTime"]["output"];
  fullName: Scalars["String"]["output"];
  id: Scalars["ID"]["output"];
  idPhoto: Scalars["String"]["output"];
  knownAs: Scalars["String"]["output"];
  status: AccountVerificationStatus;
  updatedAt: Scalars["DateTime"]["output"];
  userId: Scalars["ID"]["output"];
  username: Scalars["String"]["output"];
};

export enum AccountVerificationStatus {
  Accepted = "accepted",
  Pending = "pending",
  Rejected = "rejected",
}

export type Action = {
  __typename?: "Action";
  audio?: Maybe<Audio>;
  audioId?: Maybe<Scalars["String"]["output"]>;
  comments: Scalars["Int"]["output"];
  commentsVisibility: CommentsVisibility;
  cover: Scalars["String"]["output"];
  effect?: Maybe<Effect>;
  effectId?: Maybe<Scalars["String"]["output"]>;
  followedBy: Array<Profile>;
  id: Scalars["ID"]["output"];
  link: Scalars["String"]["output"];
  location: PostLocation;
  musicId?: Maybe<Scalars["String"]["output"]>;
  profile: Profile;
  reactionNum: Scalars["Int"]["output"];
  shares: Scalars["Int"]["output"];
  src: Scalars["String"]["output"];
  tags: Array<PostTag>;
  thumbnail: Scalars["String"]["output"];
  userId: Scalars["ID"]["output"];
  views: Scalars["Int"]["output"];
  visibility: PostVisibility;
};

export type ActionTopHashtagResponse = {
  __typename?: "ActionTopHashtagResponse";
  commented?: Maybe<Action>;
  liked?: Maybe<Action>;
  shared?: Maybe<Action>;
  viewed?: Maybe<Action>;
};

export enum ActionType {
  Comment = "comment",
  Duet = "duet",
  Stitch = "stitch",
}

export enum ActiveStatus {
  Active = "active",
  DoNotDisturb = "doNotDisturb",
  Idle = "idle",
  InActive = "inActive",
}

export type AddContactInput = {
  gmail?: InputMaybe<Scalars["String"]["input"]>;
  outlook?: InputMaybe<Scalars["String"]["input"]>;
  whatsapp?: InputMaybe<Scalars["String"]["input"]>;
  yahoo?: InputMaybe<Scalars["String"]["input"]>;
};

export type AddShoppingCartItemInput = {
  attributes?: InputMaybe<Array<CartItemAttributeInput>>;
  itemId: Scalars["ID"]["input"];
  quantity: Scalars["Int"]["input"];
  shippingRuleId: Scalars["ID"]["input"];
  type: ShoppingCartItemType;
};

export type AdminCreateAdminAccountInput = {
  birthDate: Scalars["String"]["input"];
  confirmPassword: Scalars["String"]["input"];
  email: Scalars["String"]["input"];
  firstName: Scalars["String"]["input"];
  gender: AccountGenderEnum;
  lastName: Scalars["String"]["input"];
  password: Scalars["String"]["input"];
  photo: Scalars["String"]["input"];
  type: StaffAccountType;
};

export type AdminDeleteServiceInput = {
  deletionReason: Scalars["String"]["input"];
  id: Scalars["ID"]["input"];
};

export type AdminGetAccountProductsInput = {
  accountId: Scalars["ID"]["input"];
  condition?: InputMaybe<ProductCondition>;
  pagination: GqlPaginationInput;
  price?: InputMaybe<Scalars["Float"]["input"]>;
  productId?: InputMaybe<Scalars["ID"]["input"]>;
  qty?: InputMaybe<Scalars["Int"]["input"]>;
  seller?: InputMaybe<Scalars["String"]["input"]>;
  status?: InputMaybe<ProductStatus>;
  title?: InputMaybe<Scalars["String"]["input"]>;
  type?: InputMaybe<ProductType>;
  updatedAt?: InputMaybe<Scalars["String"]["input"]>;
};

export type AdminGetBookingsInput = {
  buyer?: InputMaybe<Scalars["String"]["input"]>;
  dateAdded?: InputMaybe<Scalars["String"]["input"]>;
  id?: InputMaybe<Scalars["String"]["input"]>;
  pagination: GqlPaginationInput;
  seller?: InputMaybe<Scalars["String"]["input"]>;
  status?: InputMaybe<BookedServiceStatus>;
  total?: InputMaybe<Scalars["Float"]["input"]>;
  type?: InputMaybe<Scalars["String"]["input"]>;
};

export type AdminGetContentCommentsInput = {
  contentId: Scalars["ID"]["input"];
  contentType: ContentHostType;
  pagination: GqlPaginationInput;
};

export type AdminGetCurrenciesInput = {
  code?: InputMaybe<Scalars["String"]["input"]>;
  enabled?: InputMaybe<Scalars["Boolean"]["input"]>;
  pagination: GqlPaginationInput;
  rate?: InputMaybe<Scalars["Float"]["input"]>;
  title?: InputMaybe<Scalars["String"]["input"]>;
};

export type AdminGetDesignsInput = {
  name?: InputMaybe<Scalars["String"]["input"]>;
  pagination: GqlPaginationInput;
  placement?: InputMaybe<DesignPlacement>;
  type?: InputMaybe<DesignType>;
};

export type AdminGetDishsInput = {
  city?: InputMaybe<Scalars["String"]["input"]>;
  country?: InputMaybe<Scalars["String"]["input"]>;
  name?: InputMaybe<Scalars["String"]["input"]>;
  pagination: GqlPaginationInput;
  sales?: InputMaybe<Scalars["Int"]["input"]>;
  seller?: InputMaybe<Scalars["String"]["input"]>;
  type?: InputMaybe<RestaurantDishType>;
};

export type AdminGetIdentitiyVerificationRequestsInput = {
  pagination: GqlPaginationInput;
};

export type AdminGetLanguagesInput = {
  code?: InputMaybe<Scalars["String"]["input"]>;
  locale?: InputMaybe<Scalars["String"]["input"]>;
  name?: InputMaybe<Scalars["String"]["input"]>;
  pagination: GqlPaginationInput;
  sortOrder?: InputMaybe<Scalars["Int"]["input"]>;
};

export type AdminGetMembershipsInput = {
  name?: InputMaybe<Scalars["String"]["input"]>;
  pagination: GqlPaginationInput;
  sortOrder?: InputMaybe<Scalars["Int"]["input"]>;
};

export type AdminGetMembersipSubscriptionInput = {
  expiryDate?: InputMaybe<Scalars["String"]["input"]>;
  name?: InputMaybe<Scalars["String"]["input"]>;
  nextPaymentDate?: InputMaybe<Scalars["String"]["input"]>;
  pagination: GqlPaginationInput;
  status?: InputMaybe<MembershipSubscriptionStatus>;
  username?: InputMaybe<Scalars["String"]["input"]>;
};

export type AdminGetProfessionInput = {
  accounts?: InputMaybe<Scalars["Int"]["input"]>;
  name?: InputMaybe<Scalars["String"]["input"]>;
  pagination: GqlPaginationInput;
};

export type AdminGetReturnedOrdersInput = {
  buyerName?: InputMaybe<Scalars["String"]["input"]>;
  pagination: GqlPaginationInput;
  price?: InputMaybe<Scalars["Float"]["input"]>;
  productName?: InputMaybe<Scalars["String"]["input"]>;
  qty?: InputMaybe<Scalars["Int"]["input"]>;
  reason?: InputMaybe<Scalars["String"]["input"]>;
  sellerName?: InputMaybe<Scalars["String"]["input"]>;
  shippingAmount?: InputMaybe<Scalars["Float"]["input"]>;
};

export type AdminGetSellerSalesInput = {
  accountId: Scalars["String"]["input"];
  pagination: GqlPaginationInput;
};

export type AdminGetShippingGeoZoneRulesInput = {
  description?: InputMaybe<Scalars["String"]["input"]>;
  name?: InputMaybe<Scalars["String"]["input"]>;
  pagination: GqlPaginationInput;
};

export type AdminGetSiteInformationsInput = {
  name?: InputMaybe<Scalars["String"]["input"]>;
  pagination: GqlPaginationInput;
  sortOrder?: InputMaybe<Scalars["Int"]["input"]>;
};

export type AdminGetStaffAccountsInput = {
  email?: InputMaybe<Scalars["String"]["input"]>;
  lastActivity?: InputMaybe<Scalars["String"]["input"]>;
  name?: InputMaybe<Scalars["String"]["input"]>;
  pagination: GqlPaginationInput;
  role?: InputMaybe<StaffAccountType>;
  status?: InputMaybe<AccountStatus>;
};

export type AdminGetTaxRatesInput = {
  name?: InputMaybe<Scalars["String"]["input"]>;
  pagination: GqlPaginationInput;
  rate?: InputMaybe<Scalars["Float"]["input"]>;
};

export type AdminGetUserFinancialAccounts = {
  accountId: Scalars["String"]["input"];
};

export type AdminGetUserReturnedOrdersInput = {
  accountId: Scalars["ID"]["input"];
  pagination: GqlPaginationInput;
};

export type AdminNewsfeedPost = {
  __typename?: "AdminNewsfeedPost";
  affiliation?: Maybe<Affiliation>;
  affiliationId?: Maybe<Scalars["String"]["output"]>;
  attachments: Array<Scalars["String"]["output"]>;
  comments: Scalars["Int"]["output"];
  commentsVisibility: CommentsVisibility;
  content: Scalars["String"]["output"];
  createdAt: Scalars["String"]["output"];
  enableComments: Scalars["Boolean"]["output"];
  hashtags?: Maybe<Array<Hashtag>>;
  id: Scalars["ID"]["output"];
  isCommented: Scalars["Boolean"]["output"];
  isLiked: Scalars["Boolean"]["output"];
  isSaved: Scalars["Boolean"]["output"];
  location?: Maybe<PostLocation>;
  mentions?: Maybe<Array<PostMention>>;
  pinned: Scalars["Boolean"]["output"];
  productIds?: Maybe<Array<Scalars["String"]["output"]>>;
  products?: Maybe<Array<Product>>;
  publisher?: Maybe<Profile>;
  reactionNum: Scalars["Int"]["output"];
  service?: Maybe<Service>;
  serviceId?: Maybe<Scalars["String"]["output"]>;
  shares: Scalars["Int"]["output"];
  tags?: Maybe<Array<PostTag>>;
  thumbnail: Scalars["String"]["output"];
  title: Scalars["String"]["output"];
  type: PostType;
  updatedAt: Scalars["String"]["output"];
  userId: Scalars["ID"]["output"];
  views: Scalars["Int"]["output"];
  visibility: PostVisibility;
};

export type AdminSendMailToUsersInput = {
  message: Scalars["String"]["input"];
  subject: Scalars["String"]["input"];
  userType: MailUserType;
};

export type AdminUpdateAdminAccountInput = {
  birthDate?: InputMaybe<Scalars["String"]["input"]>;
  confirmPassword?: InputMaybe<Scalars["String"]["input"]>;
  email?: InputMaybe<Scalars["String"]["input"]>;
  firstName?: InputMaybe<Scalars["String"]["input"]>;
  gender?: InputMaybe<AccountGenderEnum>;
  id: Scalars["ID"]["input"];
  lastName?: InputMaybe<Scalars["String"]["input"]>;
  password?: InputMaybe<Scalars["String"]["input"]>;
  photo?: InputMaybe<Scalars["String"]["input"]>;
  type?: InputMaybe<StaffAccountType>;
};

export type Affiliation = {
  __typename?: "Affiliation";
  commision: Scalars["Float"]["output"];
  createdAt: Scalars["DateTime"]["output"];
  expireAt: Scalars["DateTime"]["output"];
  id: Scalars["ID"]["output"];
  itemId: Scalars["ID"]["output"];
  itemType: Scalars["String"]["output"];
  product?: Maybe<Product>;
  seller: Account;
  sellerId: Scalars["ID"]["output"];
  service?: Maybe<Service>;
  status: AffiliationStatus;
  updatedAt: Scalars["DateTime"]["output"];
};

export type AffiliationPost = {
  __typename?: "AffiliationPost";
  affiliation: Affiliation;
  affiliationId: Scalars["ID"]["output"];
  comments: Scalars["Int"]["output"];
  commentsVisibility: CommentsVisibility;
  createdAt: Scalars["String"]["output"];
  id: Scalars["ID"]["output"];
  location?: Maybe<PostLocation>;
  reactionNum: Scalars["Int"]["output"];
  shares: Scalars["Int"]["output"];
  updatedAt: Scalars["String"]["output"];
  user?: Maybe<Account>;
  userId: Scalars["ID"]["output"];
  views: Scalars["Int"]["output"];
  visibility: PostVisibility;
};

export type AffiliationPurchase = {
  __typename?: "AffiliationPurchase";
  affiliation: Affiliation;
  affiliationId: Scalars["ID"]["output"];
  affiliator: Account;
  affiliatorId: Scalars["ID"]["output"];
  createdAt: Scalars["DateTime"]["output"];
  id: Scalars["ID"]["output"];
  itemId: Scalars["ID"]["output"];
  itemType: Scalars["String"]["output"];
  paidCommissionAmount: Scalars["Float"]["output"];
  paidCommissionPercent: Scalars["Float"]["output"];
  product?: Maybe<Product>;
  purchaser: Account;
  purchaserId: Scalars["ID"]["output"];
  seller: Account;
  sellerId: Scalars["ID"]["output"];
  service?: Maybe<Service>;
};

export enum AffiliationStatus {
  Active = "active",
  InActive = "inActive",
}

export type ApplyVoucherInput = {
  voucherCode: Scalars["String"]["input"];
};

export type AskForRefundInput = {
  amount?: InputMaybe<Scalars["Float"]["input"]>;
  fullAmount?: InputMaybe<Scalars["Boolean"]["input"]>;
  opened: Scalars["Boolean"]["input"];
  orderItemId: Scalars["ID"]["input"];
  qty: Scalars["Int"]["input"];
  reason?: InputMaybe<Scalars["String"]["input"]>;
  type: RefundType;
};

export type Attachment = {
  __typename?: "Attachment";
  marketingTags: Array<MarketingTag>;
  src: Scalars["String"]["output"];
  type: AttachmentType;
};

export type AttachmentInput = {
  marketingTags: Array<AttachmentMarketingTagInput>;
  src: Scalars["String"]["input"];
  type: AttachmentType;
};

export type AttachmentMarketingTagInput = {
  id: Scalars["String"]["input"];
  type: MarketingTagType;
  x: Scalars["Float"]["input"];
  y: Scalars["Float"]["input"];
};

export enum AttachmentType {
  Img = "image",
  Text = "text",
  Vid = "video",
}

export type Audio = {
  __typename?: "Audio";
  authorUserId: Scalars["ID"]["output"];
  createdAt: Scalars["String"]["output"];
  id: Scalars["ID"]["output"];
  name: Scalars["String"]["output"];
  src?: Maybe<Scalars["String"]["output"]>;
  updatedAt: Scalars["String"]["output"];
  uploadId: Scalars["ID"]["output"];
  usage: Scalars["Int"]["output"];
};

export type AudioCursorPaginationResponse = {
  __typename?: "AudioCursorPaginationResponse";
  cursor?: Maybe<Scalars["String"]["output"]>;
  data: Array<Audio>;
  hasMore: Scalars["Boolean"]["output"];
  nextCursor?: Maybe<Scalars["String"]["output"]>;
  total: Scalars["Int"]["output"];
};

export type Balance = {
  __typename?: "Balance";
  allTimeEarnings: Scalars["Float"]["output"];
  balanceCurrency: Scalars["String"]["output"];
  cashbackBalance: Scalars["Float"]["output"];
  convertedCashbackBalance: Scalars["Float"]["output"];
  id: Scalars["ID"]["output"];
  ownerId: Scalars["ID"]["output"];
  pendingBalance: Scalars["Float"]["output"];
  withdrawableBalance: Scalars["Float"]["output"];
};

export type BanCitiesInput = {
  citiesIds: Array<Scalars["ID"]["input"]>;
};

export type BannedCity = {
  __typename?: "BannedCity";
  bannedFor: Scalars["String"]["output"];
  city: City;
  cityId: Scalars["ID"]["output"];
  id: Scalars["ID"]["output"];
};

export type BannedCountry = {
  __typename?: "BannedCountry";
  cities: Array<BannedCity>;
  country: Country;
  id: Scalars["ID"]["output"];
  isoCode: Scalars["String"]["output"];
};

export type BeautyCenter = {
  _typename?: "BeatuyCenter";
  beauty_center_typeId: Scalars["ID"]["input"];
  id: Scalars["ID"]["output"];
  ownerId: Scalars["ID"]["input"];
  payment_methods: Array<ServicePaymentMethod>;
  rating: Scalars["Float"]["input"];
  status: ServiceStatus;
  title: Scalars["String"]["input"];
  totalReviews: Scalars["Int"]["input"];
  type_of_seller: ServiceTypeOfSeller;
  createdAt: Scalars["DateTime"]["input"];
  updatedAt: Scalars["DateTime"]["input"];
  vat: Scalars["Float"]["input"];
};

export type BeautyCenterTreatmentCategory = {
  __typename?: "BeautyCenterTreatmentCategory";
  createdAt: Scalars["DateTime"]["output"];
  createdById: Scalars["ID"]["output"];
  id: Scalars["ID"]["output"];
  title: Scalars["String"]["output"];
  updatedAt: Scalars["DateTime"]["output"];
};

export type BillingAccount = {
  __typename?: "BillingAccount";
  businessType?: Maybe<BillingAccountBusinessType>;
  company?: Maybe<BillingAccountCompany>;
  companyMembers?: Maybe<Array<CompanyPerson>>;
  individual?: Maybe<BillingAccountIndividual>;
};

export type BillingAccountAddress = {
  __typename?: "BillingAccountAddress";
  city: Scalars["String"]["output"];
  country: Scalars["String"]["output"];
  line1: Scalars["String"]["output"];
  postal_code: Scalars["String"]["output"];
  state: Scalars["String"]["output"];
};

export type BillingAccountAddressInput = {
  city: Scalars["String"]["input"];
  country: Scalars["String"]["input"];
  line1: Scalars["String"]["input"];
  postal_code: Scalars["String"]["input"];
  state: Scalars["String"]["input"];
};

export type BillingAccountBusinessProfileInput = {
  mcc: Scalars["String"]["input"];
  name: Scalars["String"]["input"];
  url: Scalars["String"]["input"];
};

export enum BillingAccountBusinessType {
  Company = "company",
  Individual = "individual",
}

export type BillingAccountCompany = {
  __typename?: "BillingAccountCompany";
  address?: Maybe<PartialBillingAccountAddress>;
  name?: Maybe<Scalars["String"]["output"]>;
  phone?: Maybe<Scalars["String"]["output"]>;
  tax_id?: Maybe<Scalars["String"]["output"]>;
};

export type BillingAccountCompanyInput = {
  address: BillingAccountAddressInput;
  name: Scalars["String"]["input"];
  phone: Scalars["String"]["input"];
  tax_id: Scalars["String"]["input"];
};

export type BillingAccountDateOfBirth = {
  __typename?: "BillingAccountDateOfBirth";
  day: Scalars["Int"]["output"];
  month: Scalars["Int"]["output"];
  year: Scalars["Int"]["output"];
};

export type BillingAccountDateOfBirthInput = {
  day: Scalars["Int"]["input"];
  month: Scalars["Int"]["input"];
  year: Scalars["Int"]["input"];
};

export type BillingAccountIndividual = {
  __typename?: "BillingAccountIndividual";
  address?: Maybe<BillingAccountAddress>;
  dob?: Maybe<BillingAccountDateOfBirth>;
  email?: Maybe<Scalars["String"]["output"]>;
  first_name?: Maybe<Scalars["String"]["output"]>;
  id_number?: Maybe<Scalars["String"]["output"]>;
  last_name?: Maybe<Scalars["String"]["output"]>;
  phone?: Maybe<Scalars["String"]["output"]>;
  ssn_last_4?: Maybe<Scalars["String"]["output"]>;
};

export type BillingAccountIndividualInput = {
  address: BillingAccountAddressInput;
  dob: BillingAccountDateOfBirthInput;
  email: Scalars["String"]["input"];
  first_name: Scalars["String"]["input"];
  id_number: Scalars["String"]["input"];
  last_name: Scalars["String"]["input"];
  phone: Scalars["String"]["input"];
  ssn_last_4: Scalars["String"]["input"];
};

export type BillingAddress = {
  __typename?: "BillingAddress";
  address: Scalars["String"]["output"];
  address2: Scalars["String"]["output"];
  city: Scalars["String"]["output"];
  country: Scalars["String"]["output"];
  createdAt: Scalars["String"]["output"];
  firstName: Scalars["String"]["output"];
  id: Scalars["ID"]["output"];
  lastName: Scalars["String"]["output"];
  phone: Scalars["String"]["output"];
  postalCode: Scalars["String"]["output"];
  state: Scalars["String"]["output"];
  updatedAt: Scalars["String"]["output"];
  userId: Scalars["ID"]["output"];
};

export type Block = {
  __typename?: "Block";
  blockedAt: Scalars["DateTime"]["output"];
  blockedProfile?: Maybe<Profile>;
  blockedUserId: Scalars["ID"]["output"];
  id: Scalars["ID"]["output"];
};

export type BlockedUser = {
  __typename?: "BlockedUser";
  blockedAt: Scalars["DateTime"]["output"];
  blockedProfileId: Scalars["ID"]["output"];
  blockerProfileId: Scalars["ID"]["output"];
  id: Scalars["ID"]["output"];
};

export type BookServiceInput = {
  checkin: Scalars["DateTime"]["input"];
  checkout: Scalars["DateTime"]["input"];
  dishsIds: Scalars["ID"]["input"];
  extrasIds: Scalars["ID"]["input"];
  guests: Scalars["Int"]["input"];
  serviceId: Scalars["ID"]["input"];
  treatmentsIds: Scalars["ID"]["input"];
};

export type BookedService = {
  __typename?: "BookedService";
  buyer: Account;
  cashback: Discount;
  cashbackId?: Maybe<Scalars["String"]["output"]>;
  checkin: Scalars["DateTime"]["output"];
  checkout?: Maybe<Scalars["DateTime"]["output"]>;
  discount: Cashback;
  discountId?: Maybe<Scalars["String"]["output"]>;
  duration?: Maybe<Scalars["Int"]["output"]>;
  extrasIds?: Maybe<Array<Scalars["ID"]["output"]>>;
  guests: Scalars["Int"]["output"];
  id: Scalars["ID"]["output"];
  insurance?: Maybe<Insurance>;
  originalTotal?: Maybe<Scalars["Int"]["output"]>;
  ownerId: Scalars["ID"]["output"];
  payment?: Maybe<Scalars["String"]["output"]>;
  providerId: Scalars["ID"]["output"];
  seller: Account;
  service?: Maybe<Service>;
  serviceId: Array<Scalars["ID"]["output"]>;
  status: BookedServiceStatus;
  total?: Maybe<Scalars["Int"]["output"]>;
  type: ServiceType;
};

export enum BookedServiceStatus {
  CanceledByBuyer = "canceled_by_buyer",
  Completed = "completed",
  Continuing = "continuing",
  Paid = "paid",
  Pending = "pending",
  Restitute = "restitute",
}

export type BookingCost = {
  __typename?: "BookingCost";
  deposit: Scalars["Float"]["output"];
  extras: Scalars["Float"]["output"];
  services: Array<BookingCostService>;
  subTotal: Scalars["Float"]["output"];
  total: Scalars["Float"]["output"];
  vatAmount: Scalars["Float"]["output"];
  vatPercent: Scalars["Float"]["output"];
};

export type BookingCostService = {
  __typename?: "BookingCostService";
  qty: Scalars["Int"]["output"];
  service: Service;
};

export enum BusinessType {
  Company = "company",
  Individual = "individual",
}

export type CameraFilter = {
  __typename?: "CameraFilter";
  createdAt: Scalars["String"]["output"];
  filterStylesJSON: Scalars["String"]["output"];
  id: Scalars["ID"]["output"];
  name: Scalars["String"]["output"];
  status: CameraFilterStatus;
  thumbnail: Scalars["String"]["output"];
  updatedAt: Scalars["String"]["output"];
  usage: Scalars["Int"]["output"];
};

export enum CameraFilterStatus {
  Active = "active",
  InActive = "inActive",
}

export type CameraFiltersCursorResponse = {
  __typename?: "CameraFiltersCursorResponse";
  cursor?: Maybe<Scalars["String"]["output"]>;
  data: Array<CameraFilter>;
  hasMore: Scalars["Boolean"]["output"];
  nextCursor?: Maybe<Scalars["String"]["output"]>;
  total: Scalars["Int"]["output"];
};

export type CartItem = {
  __typename?: "CartItem";
  attributes: Array<CartItemAttribute>;
  checkin?: Maybe<Scalars["String"]["output"]>;
  checkout?: Maybe<Scalars["String"]["output"]>;
  color?: Maybe<Scalars["String"]["output"]>;
  guests?: Maybe<Scalars["Int"]["output"]>;
  id: Scalars["String"]["output"];
  itemId: Scalars["ID"]["output"];
  itemType: ShoppingCartItemType;
  ownerId: Scalars["String"]["output"];
  product?: Maybe<Product>;
  service?: Maybe<Service>;
  shippingRule: ShippingRule;
  shippingRuleId?: Maybe<Scalars["ID"]["output"]>;
  size?: Maybe<Scalars["String"]["output"]>;
};

export type CartItemAttribute = {
  __typename?: "CartItemAttribute";
  id: Scalars["String"]["output"];
  value: Array<Scalars["String"]["output"]>;
};

export type CartItemAttributeInput = {
  id: Scalars["String"]["input"];
  value: Array<Scalars["String"]["input"]>;
};

export type CashBackInput = {
  amount: Scalars["Int"]["input"];
  type: CashbackType;
  units: Scalars["Int"]["input"];
};

export type Cashback = {
  __typename?: "Cashback";
  amount: Scalars["Int"]["output"];
  id: Scalars["ID"]["output"];
  type: CashbackType;
  units: Scalars["Int"]["output"];
};

export enum CashbackType {
  Cash = "cash",
  Percent = "percent",
}

export type Category = {
  __typename?: "Category";
  id: Scalars["ID"]["output"];
  name: Scalars["String"]["output"];
  parantId?: Maybe<Scalars["ID"]["output"]>;
  sales: Scalars["Int"]["output"];
  sortOrder: Scalars["Int"]["output"];
  status: ProductCategoryStatus;
};

export type CategoryCursorResponse = {
  __typename?: "CategoryCursorResponse";
  cursor?: Maybe<Scalars["String"]["output"]>;
  data: Array<Category>;
  hasMore: Scalars["Boolean"]["output"];
  nextCursor?: Maybe<Scalars["String"]["output"]>;
  total: Scalars["Int"]["output"];
};

export type ChangePasswordInput = {
  confirmNewPassword: Scalars["String"]["input"];
  currentPassword: Scalars["String"]["input"];
  newPassword: Scalars["String"]["input"];
};

export type ChatMessage = {
  __typename?: "ChatMessage";
  attachments: Array<MessageAttachment>;
  content: Scalars["String"]["output"];
  createdAt: Scalars["DateTime"]["output"];
  id: Scalars["ID"]["output"];
  mentions: Array<Account>;
  mentionsUserIds: Array<Scalars["ID"]["output"]>;
  roomId: Scalars["ID"]["output"];
  seenBy: Array<ChatMessageSeenBy>;
  seenByUsers: Array<Account>;
  updatedAt: Scalars["DateTime"]["output"];
  user: Account;
  userId: Scalars["ID"]["output"];
};

export type ChatMessageSeenBy = {
  __typename?: "ChatMessageSeenBy";
  seenAt: Scalars["String"]["output"];
  userId: Scalars["String"]["output"];
};

export type ChatRoom = {
  __typename?: "ChatRoom";
  createdAt: Scalars["DateTime"]["output"];
  id: Scalars["ID"]["output"];
  members: Array<Account>;
  membersUserIds: Array<Scalars["ID"]["output"]>;
  messages: Array<ChatMessage>;
  roomType: RoomTypes;
  unSeenMessages: Scalars["Int"]["output"];
  updatedAt: Scalars["DateTime"]["output"];
};

export type ChatRoomMessagesArgs = {
  args: GqlPaginationInput;
};

export type City = {
  __typename?: "City";
  code: Scalars["String"]["output"];
  country: Country;
  countryId: Scalars["ID"]["output"];
  id: Scalars["ID"]["output"];
  name: Scalars["String"]["output"];
  cityId: Scalars["ID"]["input"];
};

export type Comment = {
  __typename?: "Comment";
  attachment: Attachment;
  author?: Maybe<Profile>;
  authorProfileId: Scalars["String"]["output"];
  commentedAt: Scalars["DateTime"]["output"];
  content: Scalars["String"]["output"];
  createdAt: Scalars["String"]["output"];
  hostId: Scalars["ID"]["output"];
  hostType: ContentHostType;
  id: Scalars["ID"]["output"];
  likes: Scalars["Int"]["output"];
  replies: Scalars["Int"]["output"];
  updatedAt: Scalars["String"]["output"];
  userId: Scalars["String"]["output"];
};

export type CommentMentionInput = {
  profileId: Scalars["ID"]["input"];
  userId: Scalars["ID"]["input"];
};

export type CommentsCursorPaginationResponse = {
  __typename?: "CommentsCursorPaginationResponse";
  cursor?: Maybe<Scalars["String"]["output"]>;
  data: Array<Comment>;
  hasMore: Scalars["Boolean"]["output"];
  nextCursor?: Maybe<Scalars["String"]["output"]>;
  total: Scalars["Int"]["output"];
};

export enum CommentsVisibility {
  Hidden = "hidden",
  Public = "public",
}

export enum CommissionOn {
  ExternalClick = "external_click",
  Revenue = "revenue",
}

export enum CommissionType {
  Fixed = "fixed",
  Percentage = "percentage",
}

export type Community = {
  __typename?: "Community";
  action?: Maybe<Action>;
  id: Scalars["ID"]["output"];
  newsfeed?: Maybe<NewsfeedPost>;
  newsfeedPost?: Maybe<NewsfeedPost>;
  type: Scalars["String"]["output"];
};

export type CompanyPerson = {
  __typename?: "CompanyPerson";
  address?: Maybe<PartialBillingAccountAddress>;
  dob?: Maybe<PartialBillingAccountDateOfBirth>;
  email?: Maybe<Scalars["String"]["output"]>;
  first_name?: Maybe<Scalars["String"]["output"]>;
  id?: Maybe<Scalars["String"]["output"]>;
  id_number?: Maybe<Scalars["String"]["output"]>;
  last_name?: Maybe<Scalars["String"]["output"]>;
  phone?: Maybe<Scalars["String"]["output"]>;
  relationship?: Maybe<PartialCompanyPersonRelationship>;
};

export type ConfirmPasswordChangeInput = {
  confirmNewPassword: Scalars["String"]["input"];
  email: Scalars["String"]["input"];
  newPassword: Scalars["String"]["input"];
  verificationCode: Scalars["String"]["input"];
};

export enum ContentHostType {
  Action = "action",
  ChatMessage = "chat_message",
  Comment = "comment",
  PostAffiliation = "post_affiliation",
  PostNewsfeed = "post_newsfeed",
  PostService = "post_service",
  PostShop = "post_shop",
  Story = "story",
}

export type ContentReaction = {
  __typename?: "ContentReaction";
  hostId: Scalars["ID"]["output"];
  id: Scalars["ID"]["output"];
  reactedAt: Scalars["DateTime"]["output"];
  reactedBy?: Maybe<Profile>;
  reactedByUserId: Scalars["ID"]["output"];
  reactionType: ContentReactionType;
  userId: Scalars["ID"]["output"];
};

export enum ContentReactionType {
  Angry = "angry",
  Funny = "funny",
  Like = "like",
  Love = "love",
  Sad = "sad",
}

export type ContentShare = {
  __typename?: "ContentShare";
  hostId: Scalars["ID"]["output"];
  hostType: ContentHostType;
  id: Scalars["ID"]["output"];
  sharedAt: Scalars["DateTime"]["output"];
  sharedBy?: Maybe<Profile>;
  sharedByProfileId: Scalars["ID"]["output"];
  sharedByUserId: Scalars["ID"]["output"];
};

export type ContentSharePaginationResponse = {
  __typename?: "ContentSharePaginationResponse";
  data: Array<ContentShare>;
  hasMore: Scalars["Boolean"]["output"];
  total: Scalars["Int"]["output"];
};

export type ContentView = {
  __typename?: "ContentView";
  contentOnwerId: Scalars["String"]["output"];
  contentType: ContentHostType;
  createdAt: Scalars["String"]["output"];
  id: Scalars["String"]["output"];
  updatedAt: Scalars["String"]["output"];
  viewerId: Scalars["String"]["output"];
};

export type CookiesSetting = {
  __typename?: "CookiesSetting";
  benefits: Array<Scalars["String"]["output"]>;
  cons: Array<Scalars["String"]["output"]>;
  description: Scalars["String"]["output"];
  id: Scalars["ID"]["output"];
  required: Scalars["Boolean"]["output"];
  title: Scalars["String"]["output"];
};

export type Country = {
  __typename?: "Country";
  cities: Array<City>;
  code: Scalars["String"]["output"];
  id: Scalars["ID"]["output"];
  name: Scalars["String"]["output"];
};

export type CreateAccountInput = {
  accountType: RegisterAccountType;
  birthDate: Scalars["String"]["input"];
  confirmPassword: Scalars["String"]["input"];
  email: Scalars["String"]["input"];
  firstName: Scalars["String"]["input"];
  gender: AccountGenderEnum;
  lastName: Scalars["String"]["input"];
  password: Scalars["String"]["input"];
  phone?: InputMaybe<Scalars["String"]["input"]>;
};

export type CreateAccountVerificationInput = {
  categoryId: Scalars["ID"]["input"];
  fullName: Scalars["String"]["input"];
  idPhoto: Scalars["String"]["input"];
  knownAs: Scalars["String"]["input"];
  username: Scalars["String"]["input"];
};

export type CreateActionInput = {
  allowedActions: Array<ActionType>;
  commentsVisibility?: InputMaybe<CommentsVisibility>;
  coverUploadId: Scalars["String"]["input"];
  link?: InputMaybe<Scalars["String"]["input"]>;
  location?: InputMaybe<PostLocationInput>;
  mentions?: InputMaybe<Array<Scalars["String"]["input"]>>;
  srcUploadId: Scalars["String"]["input"];
  tags?: InputMaybe<Array<Scalars["String"]["input"]>>;
  thumbnailUploadId: Scalars["String"]["input"];
};

export type CreateAffiliationInput = {
  commision: Scalars["Float"]["input"];
  expireAt: Scalars["String"]["input"];
  itemId: Scalars["ID"]["input"];
  itemType: Scalars["String"]["input"];
};

export type CreateBillingAccountInput = {
  business_type: BillingAccountBusinessType;
  company?: InputMaybe<BillingAccountCompanyInput>;
  companyMembers?: InputMaybe<Array<CreateCompanyPersonInput>>;
  individual?: InputMaybe<BillingAccountIndividualInput>;
};

export type CreateBlockInput = {
  userId: Scalars["ID"]["input"];
};

export type CreateCategoryInput = {
  metaTagDescription: Array<TranslationTextInput>;
  metaTagKeywords: Array<TranslationTextInput>;
  metaTagTitle: Array<TranslationTextInput>;
  name: Array<TranslationTextInput>;
  parantId?: InputMaybe<Scalars["ID"]["input"]>;
  sortOrder: Scalars["Int"]["input"];
  status: ProductCategoryStatus;
};

export type CreateCommentInput = {
  attachment?: InputMaybe<AttachmentInput>;
  authorProfileId: Scalars["ID"]["input"];
  authorUserId: Scalars["ID"]["input"];
  content: Scalars["String"]["input"];
  contentId: Scalars["ID"]["input"];
  contentType: ContentHostType;
  mentions: Array<CommentMentionInput>;
};

export type CreateCompanyPersonInput = {
  address: BillingAccountAddressInput;
  dob: BillingAccountDateOfBirthInput;
  email: Scalars["String"]["input"];
  first_name: Scalars["String"]["input"];
  id: Scalars["String"]["input"];
  id_number: Scalars["String"]["input"];
  last_name: Scalars["String"]["input"];
  phone: Scalars["String"]["input"];
  relationship: CreateCompanyPersonRelationshipInput;
};

export type CreateCompanyPersonRelationshipInput = {
  director?: InputMaybe<Scalars["Boolean"]["input"]>;
  executive?: InputMaybe<Scalars["Boolean"]["input"]>;
  owner?: InputMaybe<Scalars["Boolean"]["input"]>;
  representative?: InputMaybe<Scalars["Boolean"]["input"]>;
  title?: InputMaybe<Scalars["String"]["input"]>;
};

export type CreateContentShareInput = {
  contentId: Scalars["ID"]["input"];
  contentType: ContentHostType;
};

export type CreateFilterInput = {
  name: Array<StringTranslationField>;
  sortOrder: Scalars["Int"]["input"];
  values: Array<ProductFilterGroupValueInput>;
};

export type CreateFinancialAccountInput = {
  bank_country?: InputMaybe<Scalars["String"]["input"]>;
  bank_number?: InputMaybe<Scalars["String"]["input"]>;
  card_cvc?: InputMaybe<Scalars["String"]["input"]>;
  card_exp_month?: InputMaybe<Scalars["String"]["input"]>;
  card_exp_year?: InputMaybe<Scalars["String"]["input"]>;
  card_number?: InputMaybe<Scalars["String"]["input"]>;
  currency: Scalars["String"]["input"];
  label?: InputMaybe<Scalars["String"]["input"]>;
  type: FinancialAccountType;
};

export type CreateIdentityVerificationInput = {
  addressProofBill: Scalars["String"]["input"];
  dateOfBirth: Scalars["String"]["input"];
  firstName: Scalars["String"]["input"];
  fullAddress: Scalars["String"]["input"];
  id_back: Scalars["String"]["input"];
  id_front: Scalars["String"]["input"];
  lastName: Scalars["String"]["input"];
};

export type CreateLanguageInput = {
  code: Scalars["String"]["input"];
  enabled: Scalars["Boolean"]["input"];
  locale: Scalars["String"]["input"];
  name: Scalars["String"]["input"];
  sortOrder: Scalars["Int"]["input"];
};

export type CreateMaintenanceInput = {
  from: Scalars["String"]["input"];
  to: Scalars["String"]["input"];
  url: Scalars["String"]["input"];
};

export type CreateMembershipInput = {
  includings: Array<MembershipIncludedItemInput>;
  name: Scalars["String"]["input"];
  recurring: MembershipRecurring;
  sortOrder: Scalars["Int"]["input"];
  turnover_rules: Array<MembershipTurnoverRuleInput>;
};

export type CreateMembershipPaymentIntentInput = {
  membershipId: Scalars["ID"]["input"];
};

export type CreateMessageAttachmentInput = {
  id: Scalars["ID"]["input"];
  src: Scalars["String"]["input"];
  type: MessageAttachmentType;
};

export type CreateMessageInput = {
  attachments?: InputMaybe<Array<CreateMessageAttachmentInput>>;
  content: Scalars["String"]["input"];
  roomId?: InputMaybe<Scalars["ID"]["input"]>;
  userId?: InputMaybe<Scalars["ID"]["input"]>;
};

export type CreateNewsfeedPostInput = {
  affiliationId?: InputMaybe<Scalars["String"]["input"]>;
  attachments: Array<Scalars["String"]["input"]>;
  commentsVisibility?: InputMaybe<CommentsVisibility>;
  content: Scalars["String"]["input"];
  enableComments?: InputMaybe<Scalars["Boolean"]["input"]>;
  hashtags: Array<HashtagInput>;
  location?: InputMaybe<PostLocationInput>;
  productIds?: InputMaybe<Array<Scalars["String"]["input"]>>;
  serviceId?: InputMaybe<Scalars["String"]["input"]>;
  tags: Array<PostTagInput>;
  title: Scalars["String"]["input"];
  type?: InputMaybe<PostType>;
  visibility?: InputMaybe<PostVisibility>;
};

export type CreatePinnedContentInput = {
  contentId: Scalars["ID"]["input"];
  userId: Scalars["ID"]["input"];
};

export type CreateProductAttributeInput = {
  displayType: ProductAttributeDisplayType;
  name: Array<TranslationTextInput>;
  selectionType: ProductAttributeSelectionType;
  values: Array<ProductAttributeValueInput>;
};

export type CreateProductInput = {
  attributes: Array<ProductAttributeInput>;
  brand: Scalars["String"]["input"];
  cashback: CashBackInput;
  categoryId: Scalars["ID"]["input"];
  colors: Array<Scalars["String"]["input"]>;
  condition: ProductCondition;
  description: Array<StringTranslationField>;
  discount: DiscountInput;
  external_link?: InputMaybe<Scalars["String"]["input"]>;
  presentations: Array<Scalars["Upload"]["input"]>;
  price: Scalars["Float"]["input"];
  sizes: Array<ProductSize>;
  stock: Scalars["Int"]["input"];
  thumbnail: Scalars["String"]["input"];
  title: Array<StringTranslationField>;
  type: ProductType;
  vat: Scalars["Float"]["input"];
  visibility: VisibilityEnum;
};

export type CreateProductReviewInput = {
  message: Scalars["String"]["input"];
  productId: Scalars["ID"]["input"];
  rate: Scalars["Float"]["input"];
};

export type CreateProfessionInput = {
  sortOrder: Scalars["Int"]["input"];
  status: ProfessionStatus;
  title: Scalars["String"]["input"];
};

export type CreateProfileInput = {
  bio?: InputMaybe<Scalars["String"]["input"]>;
  gender: ProfileReachedGender;
  photo: Scalars["String"]["input"];
  profession: Scalars["String"]["input"];
  username: Scalars["String"]["input"];
  visibility?: InputMaybe<ProfileVisibility>;
};

export type CreateReactionInput = {
  contentId: Scalars["ID"]["input"];
  contentType: ContentHostType;
};

export type CreateReportInput = {
  contentId: Scalars["ID"]["input"];
  message: Scalars["String"]["input"];
  type: ReportType;
};

export type CreateRequiredActionInput = {
  /** Example field (placeholder) */
  exampleField: Scalars["Int"]["input"];
};

export type CreateServiceCategoryInput = {
  description: TranslationTextInput;
  filters: Array<ServiceCategoryFilterValueInput>;
  metaTagDescription: TranslationTextInput;
  metaTagKeywords: TranslationTextInput;
  metaTagTitle: TranslationTextInput;
  name: Array<TranslationTextInput>;
  seo: TranslationTextInput;
  sortOrder: Scalars["Int"]["input"];
  thumbnail: Scalars["String"]["input"];
  type: ServiceType;
};

export type CreateServiceInput = {
  adaptedFor?: InputMaybe<Array<ServiceAdaptation>>;
  airCondition?: InputMaybe<Scalars["Boolean"]["input"]>;
  availableAppointments?: InputMaybe<Array<Scalars["String"]["input"]>>;
  bathrooms?: InputMaybe<Scalars["Int"]["input"]>;
  beds?: InputMaybe<Scalars["Int"]["input"]>;
  brand?: InputMaybe<Scalars["String"]["input"]>;
  cancelable: Scalars["Boolean"]["input"];
  cancelationPolicy?: InputMaybe<ServiceCancelationType>;
  cleaningFee?: InputMaybe<Scalars["Float"]["input"]>;
  dailyPrice?: InputMaybe<Scalars["Boolean"]["input"]>;
  dailyPrices?: InputMaybe<ServiceDailyPricesInput>;
  deposit?: InputMaybe<Scalars["Boolean"]["input"]>;
  depositAmount?: InputMaybe<Scalars["Int"]["input"]>;
  description: Array<TranslationTextInput>;
  duration?: InputMaybe<Scalars["Int"]["input"]>;
  extras?: InputMaybe<Array<ServiceExtraInput>>;
  gpsAvailable?: InputMaybe<Scalars["Boolean"]["input"]>;
  hashtags: Array<Scalars["String"]["input"]>;
  includedAmenities?: InputMaybe<Array<TranslationTextInput>>;
  ingredients?: InputMaybe<Array<TranslationTextArrayInput>>;
  isExternal: Scalars["Boolean"]["input"];
  lugaggeCapacity?: InputMaybe<Scalars["Int"]["input"]>;
  maxSpeedInKm?: InputMaybe<Scalars["Int"]["input"]>;
  measurements?: InputMaybe<ServicePropertyMeasurementsInput>;
  menuType?: InputMaybe<RestaurantDishType>;
  model?: InputMaybe<Scalars["String"]["input"]>;
  name: Array<TranslationTextInput>;
  num_of_rooms?: InputMaybe<Scalars["Int"]["input"]>;
  policies: Array<ServicePolicyTranslatedInput>;
  popularAmenities?: InputMaybe<Array<TranslationTextInput>>;
  price: Scalars["Float"]["input"];
  propertyType?: InputMaybe<RentalPropertyType>;
  restriction?: InputMaybe<Array<ServiceRestriction>>;
  seats?: InputMaybe<Scalars["Int"]["input"]>;
  sessionDurationMins?: InputMaybe<Scalars["Int"]["input"]>;
  speakingLanguages: Array<DoctorSpeakingLanguage>;
  specialityId?: InputMaybe<Scalars["ID"]["input"]>;
  thumbnail: Scalars["Upload"]["input"];
  treatmentCategoryId?: InputMaybe<Scalars["ID"]["input"]>;
  typeOfPlace?: InputMaybe<RentalTypeOfPlace>;
  title: Scalars["String"]["input"];
  units?: InputMaybe<Scalars["Int"]["input"]>;
  vat: Scalars["Float"]["input"];
  vehicleCategoryId?: InputMaybe<Scalars["String"]["input"]>;
  windows?: InputMaybe<Scalars["Int"]["input"]>;
};

export type CreateShippingAddressInput = {
  firstname: Scalars["String"]["input"];
  instractions?: InputMaybe<Scalars["String"]["input"]>;
  lastname: Scalars["String"]["input"];
  lat: Scalars["Float"]["input"];
  lng: Scalars["Float"]["input"];
  location: LocationInput;
  ownerId: Scalars["ID"]["input"];
  phone?: InputMaybe<Scalars["String"]["input"]>;
  zipCode?: InputMaybe<Scalars["String"]["input"]>;
};

export type CreateShippingGeoZone = {
  country: Scalars["String"]["input"];
  shippingTypeRuleId: Scalars["ID"]["input"];
  zone: Scalars["String"]["input"];
};

export type CreateShippingRuleGeoZoneInput = {
  country: Scalars["String"]["input"];
  zone: Scalars["String"]["input"];
};

export type CreateShippingRuleInput = {
  cost: Scalars["Float"]["input"];
  countries: Array<ShippingCountryInput>;
  deliveryTimeRange: ShippingDeliveryTimeRangeInput;
  destination: ShippingDestination;
  name: Scalars["String"]["input"];
  shippingCompanyName: Scalars["String"]["input"];
  shippingType: ShippingType;
};

export type CreateShippingTypeRuleInput = {
  description: Scalars["String"]["input"];
  name: Scalars["String"]["input"];
  type: ShippingType;
  zones: Array<CreateShippingRuleGeoZoneInput>;
};

export type CreateShopInput = {
  banner: Scalars["String"]["input"];
  businessType: BusinessType;
  description: Array<TranslationTextInput>;
  email: Scalars["String"]["input"];
  hashtags: Array<Scalars["String"]["input"]>;
  images: Array<Scalars["String"]["input"]>;
  location: LocationInput;
  name: Array<TranslationTextInput>;
  payment_methods: Array<ShopPaymentMethod>;
  phone: Scalars["String"]["input"];
  status: ShopStatus;
  storeCategoryId?: InputMaybe<Scalars["String"]["input"]>;
  storeFor: Array<StoreFor>;
  storeType: StoreType;
  targetGenders: Array<TargetGenders>;
  thumbnail: Scalars["String"]["input"];
  type?: InputMaybe<ServiceType>;
  vat?: InputMaybe<VatSettingsPartialInput>;
  vidoes: Array<Scalars["String"]["input"]>;
};

export type CreateSiteInformationInput = {
  description: Scalars["String"]["input"];
  route: Scalars["String"]["input"];
  slug: Scalars["String"]["input"];
  sortOrder: Scalars["Int"]["input"];
  title: Scalars["String"]["input"];
};

export type CreateStoryInput = {
  affiliationPostId?: InputMaybe<Scalars["ID"]["input"]>;
  attachment?: InputMaybe<AttachmentInput>;
  content?: InputMaybe<Scalars["String"]["input"]>;
  newsfeedPostId?: InputMaybe<Scalars["ID"]["input"]>;
  productId?: InputMaybe<Scalars["ID"]["input"]>;
  servicePostId?: InputMaybe<Scalars["ID"]["input"]>;
  shopPostId?: InputMaybe<Scalars["ID"]["input"]>;
  tags?: InputMaybe<Array<PostTagInput>>;
};

export type CreateTaxRateInput = {
  appliedOnCountryIds: Array<Scalars["String"]["input"]>;
  percent: Scalars["Float"]["input"];
  title: Scalars["String"]["input"];
};

export type CreateVehiclePropertiesInput = {
  airCondition: Scalars["Boolean"]["input"];
  gpsAvailable: Scalars["Boolean"]["input"];
  lugaggeCapacity: Scalars["Int"]["input"];
  maxSpeedInKm: Scalars["Int"]["input"];
  seats: Scalars["Int"]["input"];
  windows: Scalars["Int"]["input"];
};

export type Currency = {
  __typename?: "Currency";
  code: Scalars["String"]["output"];
  enabled: Scalars["Boolean"]["output"];
  exchangeRate: Scalars["Float"]["output"];
  id: Scalars["ID"]["output"];
  name: Scalars["String"]["output"];
  symbol: Scalars["String"]["output"];
  updatedAt: Scalars["DateTime"]["output"];
};

export type DeclineAppointmentInput = {
  id: Scalars["ID"]["input"];
  reason: Scalars["String"]["input"];
};

export type DeclineSellerAccountRequest = {
  id: Scalars["ID"]["input"];
  reason: Scalars["String"]["input"];
};

export type DeleteAccountRequestInput = {
  password: Scalars["String"]["input"];
  reason: Scalars["String"]["input"];
  sendData?: InputMaybe<Scalars["Boolean"]["input"]>;
};

export type DeleteStoryInput = {
  storyId: Scalars["ID"]["input"];
};

export type Design = {
  __typename?: "Design";
  createdAt: Scalars["String"]["output"];
  distenation: Scalars["String"]["output"];
  id: Scalars["ID"]["output"];
  name: Scalars["String"]["output"];
  placement: Array<Scalars["String"]["output"]>;
  src: Scalars["String"]["output"];
  type: DesignType;
  updatedAt: Scalars["String"]["output"];
};

export enum DesignPlacement {
  Homepage = "homepage",
}

export enum DesignType {
  Collaboration = "collaboration",
  Partner = "partner",
  Slideshow = "slideshow",
}

export type Discount = {
  __typename?: "Discount";
  amount: Scalars["Int"]["output"];
  id: Scalars["ID"]["output"];
  units: Scalars["Int"]["output"];
};

export type DiscountInput = {
  amount: Scalars["Int"]["input"];
  units: Scalars["Int"]["input"];
};

export type Dish = {
  __typename?: "Dish";
  id: Scalars["ID"]["output"];
  ingredients: Array<Scalars["String"]["output"]>;
  menu: RestaurantMenu;
  menuId: Scalars["ID"]["output"];
  name: Scalars["String"]["output"];
  price: Scalars["Float"]["output"];
  sales: Scalars["Int"]["output"];
  thumbnail: Scalars["String"]["output"];
  type: RestaurantDishType;
};

export type Doctor = {
  __typename?: "Doctor";
  availablityStatus: HealthCenterDoctorAvailablityStatus;
  description: Scalars["String"]["output"];
  healthCenter?: Maybe<HealthCenter>;
  healthCenterId: Scalars["ID"]["output"];
  id: Scalars["ID"]["output"];
  name: Scalars["String"]["output"];
  price: Scalars["Float"]["output"];
  rating: Scalars["Float"]["output"];
  speciality?: Maybe<HealthCenterSpecialty>;
  specialityId: Scalars["ID"]["output"];
  thumbnail: Scalars["String"]["output"];
};

export enum DoctorSpeakingLanguage {
  En = "EN",
  Fr = "FR",
  Gd = "GD",
  Ge = "GE",
}

export type Effect = {
  __typename?: "Effect";
  id: Scalars["ID"]["output"];
  name: Scalars["String"]["output"];
  status: EffectStatus;
  thumbnail: Scalars["String"]["output"];
  usage: Scalars["Int"]["output"];
};

export type EffectCursorPaginationResponse = {
  __typename?: "EffectCursorPaginationResponse";
  cursor?: Maybe<Scalars["String"]["output"]>;
  data: Array<Effect>;
  hasMore: Scalars["Boolean"]["output"];
  nextCursor?: Maybe<Scalars["String"]["output"]>;
  total: Scalars["Int"]["output"];
};

export enum EffectSearchTerm {
  Cateogry = "cateogry",
  New = "new",
  Recommended = "recommended",
}

export enum EffectStatus {
  Active = "active",
  InActive = "inActive",
}

export type Filter = {
  __typename?: "Filter";
  id: Scalars["ID"]["output"];
  name: Scalars["String"]["output"];
  sortOrder: Scalars["Int"]["output"];
  values: Array<ProductFilterGroupValue>;
};

export type FilteredShopsCursorInput = {
  businessType?: InputMaybe<BusinessType>;
  categoryQuery?: InputMaybe<Scalars["String"]["input"]>;
  city?: InputMaybe<Scalars["String"]["input"]>;
  country?: InputMaybe<Scalars["String"]["input"]>;
  cursor?: InputMaybe<Scalars["String"]["input"]>;
  locationQuery?: InputMaybe<Scalars["String"]["input"]>;
  searchQuery?: InputMaybe<Scalars["String"]["input"]>;
  storeType?: InputMaybe<StoreType>;
  take: Scalars["Int"]["input"];
  targetGender?: InputMaybe<TargetGenders>;
};

export type FilteredShopsInput = {
  businessType?: InputMaybe<BusinessType>;
  categoryQuery?: InputMaybe<Scalars["String"]["input"]>;
  city?: InputMaybe<Scalars["String"]["input"]>;
  country?: InputMaybe<Scalars["String"]["input"]>;
  locationQuery?: InputMaybe<Scalars["String"]["input"]>;
  pagination: GqlPaginationInput;
  searchQuery?: InputMaybe<Scalars["String"]["input"]>;
  storeType?: InputMaybe<StoreType>;
  targetGender?: InputMaybe<TargetGenders>;
};

export type FinancialAccount = {
  __typename?: "FinancialAccount";
  bank_country?: Maybe<Scalars["String"]["output"]>;
  bank_number?: Maybe<Scalars["String"]["output"]>;
  cardLast4?: Maybe<Scalars["String"]["output"]>;
  card_cvc?: Maybe<Scalars["String"]["output"]>;
  card_exp_month?: Maybe<Scalars["String"]["output"]>;
  card_exp_year?: Maybe<Scalars["String"]["output"]>;
  currency: Scalars["String"]["output"];
  financialId: Scalars["String"]["output"];
  id: Scalars["ID"]["output"];
  label: Scalars["String"]["output"];
  ownerId: Scalars["ID"]["output"];
  type: FinancialAccountType;
};

export enum FinancialAccountType {
  Bank = "bank",
  Card = "card",
}

export type Follow = {
  __typename?: "Follow";
  followedAt: Scalars["DateTime"]["output"];
  followerUserId: Scalars["ID"]["output"];
  followingUserId: Scalars["ID"]["output"];
  id: Scalars["ID"]["output"];
};

export type FollowProfileInput = {
  profileId: Scalars["String"]["input"];
};

export type ForgotPasswordEmailInput = {
  email: Scalars["String"]["input"];
};

export type FriendSuggestion = {
  __typename?: "FriendSuggestion";
  accounts: Array<Account>;
};

export type GetAccountDeletionRequestsInput = {
  dateAdded?: InputMaybe<Scalars["String"]["input"]>;
  email?: InputMaybe<Scalars["String"]["input"]>;
  pagination: GqlPaginationInput;
  status?: InputMaybe<AccountDeletionRequestStatus>;
  username?: InputMaybe<Scalars["String"]["input"]>;
};

export type GetAccountVerificationRequestsInput = {
  pagination: GqlPaginationInput;
};

export type GetActionByAudioIdInput = {
  cursor?: InputMaybe<Scalars["String"]["input"]>;
  id: Scalars["ID"]["input"];
  take: Scalars["Int"]["input"];
};

export type GetActionsByEffectIdInput = {
  cursor?: InputMaybe<Scalars["String"]["input"]>;
  id: Scalars["ID"]["input"];
  take: Scalars["Int"]["input"];
};

export type GetActionsCursorResponse = {
  __typename?: "GetActionsCursorResponse";
  cursor?: Maybe<Scalars["String"]["output"]>;
  data: Array<Action>;
  hasMore: Scalars["Boolean"]["output"];
  nextCursor?: Maybe<Scalars["String"]["output"]>;
  total: Scalars["Int"]["output"];
};

export type GetAddableHashtagsInput = {
  pagination: GqlCursorPaginationInput;
  q?: InputMaybe<Scalars["String"]["input"]>;
};

export type GetAdminFilteredNewsfeedPostsInput = {
  comments?: InputMaybe<Scalars["Int"]["input"]>;
  date?: InputMaybe<Scalars["String"]["input"]>;
  id?: InputMaybe<Scalars["String"]["input"]>;
  legend?: InputMaybe<Scalars["String"]["input"]>;
  likes?: InputMaybe<Scalars["Int"]["input"]>;
  pagination: GqlPaginationInput;
  shares?: InputMaybe<Scalars["Int"]["input"]>;
  username?: InputMaybe<Scalars["String"]["input"]>;
  views?: InputMaybe<Scalars["Int"]["input"]>;
};

export type GetAdminFilteredStoriesInput = {
  comments?: InputMaybe<Scalars["Int"]["input"]>;
  date?: InputMaybe<Scalars["String"]["input"]>;
  id?: InputMaybe<Scalars["String"]["input"]>;
  legend?: InputMaybe<Scalars["String"]["input"]>;
  likes?: InputMaybe<Scalars["Int"]["input"]>;
  shares?: InputMaybe<Scalars["Int"]["input"]>;
  username?: InputMaybe<Scalars["String"]["input"]>;
  views?: InputMaybe<Scalars["Int"]["input"]>;
};

export type GetAdminFitleredProductReviewsInput = {
  buyer?: InputMaybe<Scalars["String"]["input"]>;
  dateAdded?: InputMaybe<Scalars["String"]["input"]>;
  id?: InputMaybe<Scalars["String"]["input"]>;
  pagination: GqlPaginationInput;
  product?: InputMaybe<Scalars["String"]["input"]>;
  rating?: InputMaybe<Scalars["Int"]["input"]>;
  review?: InputMaybe<Scalars["String"]["input"]>;
  seller?: InputMaybe<Scalars["String"]["input"]>;
};

export type GetAdminPendingSellersInput = {
  CRN?: InputMaybe<Scalars["String"]["input"]>;
  dateCreated?: InputMaybe<Scalars["String"]["input"]>;
  email?: InputMaybe<Scalars["String"]["input"]>;
  name?: InputMaybe<Scalars["String"]["input"]>;
  pagination: GqlPaginationInput;
};

export type GetAdminProductAttributesPaginationInput = {
  name: Scalars["String"]["input"];
  pagination: GqlPaginationInput;
};

export type GetAffiliationHistoryInput = {
  pagination: GqlPaginationInput;
};

export type GetAffiliationPostInput = {
  id: Scalars["String"]["input"];
};

export type GetBannedCountriesAdminInput = {
  city?: InputMaybe<Scalars["String"]["input"]>;
  country?: InputMaybe<Scalars["String"]["input"]>;
  pagination: GqlPaginationInput;
  type: Scalars["String"]["input"];
};

export type GetBookingCostInput = {
  adults?: InputMaybe<Scalars["Int"]["input"]>;
  checkinDate: Scalars["String"]["input"];
  checkinTime?: InputMaybe<Scalars["String"]["input"]>;
  checkoutDate?: InputMaybe<Scalars["String"]["input"]>;
  children?: InputMaybe<Scalars["Int"]["input"]>;
  extrasIds?: InputMaybe<Array<Scalars["String"]["input"]>>;
  servicesIds: Array<Scalars["String"]["input"]>;
};

export type GetBookingsHistoryAdminInput = {
  accountType: Scalars["String"]["input"];
  pagination: GqlPaginationInput;
  q: Scalars["String"]["input"];
  status?: InputMaybe<BookedServiceStatus>;
  userId: Scalars["ID"]["input"];
};

export type GetBookingsHistoryInput = {
  pagination: GqlPaginationInput;
  q: Scalars["String"]["input"];
  status?: InputMaybe<BookedServiceStatus>;
};

export type GetBuyersAccountsInput = {
  balance?: InputMaybe<Scalars["Float"]["input"]>;
  date?: InputMaybe<Scalars["String"]["input"]>;
  email?: InputMaybe<Scalars["String"]["input"]>;
  id?: InputMaybe<Scalars["String"]["input"]>;
  ip?: InputMaybe<Scalars["String"]["input"]>;
  name?: InputMaybe<Scalars["String"]["input"]>;
  pagination: GqlPaginationInput;
  status?: InputMaybe<AccountStatus>;
  visits?: InputMaybe<Scalars["Int"]["input"]>;
};

export type GetCameraFiltersInput = {
  categoryId: Scalars["ID"]["input"];
  cursor?: InputMaybe<Scalars["String"]["input"]>;
  take: Scalars["Int"]["input"];
};

export type GetCititesInput = {
  countryid: Scalars["ID"]["input"];
  name: Scalars["String"]["input"];
};

export type GetCommunityPostsInput = {
  q: Scalars["String"]["input"];
};

export type GetContentCommentsInput = {
  cursor?: InputMaybe<Scalars["String"]["input"]>;
  id: Scalars["ID"]["input"];
  take?: InputMaybe<Scalars["Int"]["input"]>;
};

export type GetContentTaggedProfilesInput = {
  contentId: Scalars["String"]["input"];
  contentType: Scalars["String"]["input"];
};

export type GetDesignByPlacementInput = {
  pagination: GqlPaginationInput;
  placement: DesignPlacement;
};

export type GetFilteredAffiliationHistoryInput = {
  affiliation_link?: InputMaybe<Scalars["String"]["input"]>;
  affiliator?: InputMaybe<Scalars["String"]["input"]>;
  commission?: InputMaybe<Scalars["Float"]["input"]>;
  money_generated?: InputMaybe<Scalars["Float"]["input"]>;
  pagination: GqlPaginationInput;
  price?: InputMaybe<Scalars["Float"]["input"]>;
  purchasedAfter?: InputMaybe<Scalars["String"]["input"]>;
  purchasedBefore?: InputMaybe<Scalars["String"]["input"]>;
  purchaser?: InputMaybe<Scalars["String"]["input"]>;
  seller?: InputMaybe<Scalars["String"]["input"]>;
  title?: InputMaybe<Scalars["String"]["input"]>;
};

export type GetFilteredAffiliationsInput = {
  commission?: InputMaybe<Scalars["Float"]["input"]>;
  createdAfter?: InputMaybe<Scalars["DateTime"]["input"]>;
  createdBefore?: InputMaybe<Scalars["DateTime"]["input"]>;
  link?: InputMaybe<Scalars["String"]["input"]>;
  pagination: GqlPaginationInput;
  price?: InputMaybe<Scalars["Float"]["input"]>;
  seller?: InputMaybe<Scalars["String"]["input"]>;
};

export type GetFilteredCategoriesInput = {
  name?: InputMaybe<Scalars["String"]["input"]>;
  sortOrder?: InputMaybe<Scalars["String"]["input"]>;
};

export type GetFilteredCategory = {
  name?: InputMaybe<Scalars["String"]["input"]>;
  pagination: GqlPaginationInput;
  sortOrder?: InputMaybe<Scalars["Int"]["input"]>;
};

export type GetFilteredHashtagsInput = {
  createdAt?: InputMaybe<Scalars["String"]["input"]>;
  pagination: GqlPaginationInput;
  status?: InputMaybe<HashtagStatus>;
  tag?: InputMaybe<Scalars["String"]["input"]>;
  usage?: InputMaybe<Scalars["Int"]["input"]>;
};

export type GetFilteredNewsletterInput = {
  email?: InputMaybe<Scalars["String"]["input"]>;
  pagination: GqlPaginationInput;
};

export type GetFilteredOrdersInput = {
  buyer?: InputMaybe<Scalars["String"]["input"]>;
  date_from?: InputMaybe<Scalars["String"]["input"]>;
  date_to?: InputMaybe<Scalars["String"]["input"]>;
  id?: InputMaybe<Scalars["String"]["input"]>;
  pagination: GqlPaginationInput;
  payment_method?: InputMaybe<Scalars["String"]["input"]>;
  price?: InputMaybe<Scalars["Float"]["input"]>;
  qty?: InputMaybe<Scalars["Int"]["input"]>;
  seller?: InputMaybe<Scalars["String"]["input"]>;
  status?: InputMaybe<OrderStatusEnum>;
  total?: InputMaybe<Scalars["Float"]["input"]>;
};

export type GetFilteredProductsAdminInput = {
  condition?: InputMaybe<ProductCondition>;
  pagination: GqlPaginationInput;
  price?: InputMaybe<Scalars["Float"]["input"]>;
  productId?: InputMaybe<Scalars["ID"]["input"]>;
  qty?: InputMaybe<Scalars["Int"]["input"]>;
  seller?: InputMaybe<Scalars["String"]["input"]>;
  status?: InputMaybe<ProductStatus>;
  title?: InputMaybe<Scalars["String"]["input"]>;
  type?: InputMaybe<ProductType>;
  updatedAt?: InputMaybe<Scalars["String"]["input"]>;
};

export type GetFilteredProductsInput = {
  brands?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  categories?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  colors?: InputMaybe<Array<Scalars["String"]["input"]>>;
  condition?: InputMaybe<ProductCondition>;
  inStock?: InputMaybe<Scalars["Boolean"]["input"]>;
  maxPrice?: InputMaybe<Scalars["Float"]["input"]>;
  minPrice?: InputMaybe<Scalars["Float"]["input"]>;
  pagination: GqlPaginationInput;
  ratings?: InputMaybe<Array<Scalars["Int"]["input"]>>;
  size?: InputMaybe<Array<Scalars["String"]["input"]>>;
  type?: InputMaybe<ProductType>;
};

export type GetFilteredRefundsInput = {
  addedDate?: InputMaybe<Scalars["String"]["input"]>;
  buyer?: InputMaybe<Scalars["String"]["input"]>;
  comment?: InputMaybe<Scalars["String"]["input"]>;
  dateModified?: InputMaybe<Scalars["String"]["input"]>;
  orderId?: InputMaybe<Scalars["String"]["input"]>;
  pagination: GqlPaginationInput;
  product?: InputMaybe<Scalars["String"]["input"]>;
  refundId?: InputMaybe<Scalars["String"]["input"]>;
  seller?: InputMaybe<Scalars["String"]["input"]>;
  status?: InputMaybe<RefundStatusType>;
};

export type GetFilteredSellersAccountsInput = {
  balance?: InputMaybe<Scalars["Float"]["input"]>;
  city?: InputMaybe<Scalars["String"]["input"]>;
  country?: InputMaybe<Scalars["String"]["input"]>;
  date?: InputMaybe<Scalars["String"]["input"]>;
  email?: InputMaybe<Scalars["String"]["input"]>;
  id?: InputMaybe<Scalars["String"]["input"]>;
  ip?: InputMaybe<Scalars["String"]["input"]>;
  name?: InputMaybe<Scalars["String"]["input"]>;
  pagination: GqlPaginationInput;
  plan?: InputMaybe<Scalars["String"]["input"]>;
  products?: InputMaybe<Scalars["Int"]["input"]>;
  sales?: InputMaybe<Scalars["Int"]["input"]>;
  status?: InputMaybe<AccountStatus>;
  visits?: InputMaybe<Scalars["Int"]["input"]>;
};

export type GetFilteredServicesAdminInput = {
  id?: InputMaybe<Scalars["ID"]["input"]>;
  pagination: GqlPaginationInput;
  price?: InputMaybe<Scalars["Float"]["input"]>;
  sellerId?: InputMaybe<Scalars["ID"]["input"]>;
  sellerName?: InputMaybe<Scalars["String"]["input"]>;
  status?: InputMaybe<ServiceStatus>;
  title?: InputMaybe<Scalars["String"]["input"]>;
  type: ServiceType;
  updatedAt?: InputMaybe<Scalars["String"]["input"]>;
};

export type GetFiltersInput = {
  name?: InputMaybe<Scalars["String"]["input"]>;
  sortOrder?: InputMaybe<Scalars["Int"]["input"]>;
};

export type GetHashtagNewsfeedPostsInput = {
  profileId: Scalars["ID"]["input"];
  tag: Scalars["String"]["input"];
  userId: Scalars["ID"]["input"];
};

export type GetHashtagTopServicePostsInput = {
  tag: Scalars["String"]["input"];
};

export type GetInsurancesHistoryInput = {
  amount?: InputMaybe<Scalars["Float"]["input"]>;
  buyer?: InputMaybe<Scalars["String"]["input"]>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
  pagination: GqlPaginationInput;
  seller?: InputMaybe<Scalars["String"]["input"]>;
  service?: InputMaybe<Scalars["String"]["input"]>;
  status?: InputMaybe<ServiceInsuranceStatusEnum>;
  thumbnail?: InputMaybe<Scalars["String"]["input"]>;
};

export type GetInsurancesInput = {
  pagination: GqlPaginationInput;
  status: ServiceInsuranceStatusEnum;
};

export type GetLocalizationInput = {
  query: Scalars["String"]["input"];
};

export type GetMessagesByRoomIdInput = {
  pagination: GqlCursorPaginationInput;
  roomId: Scalars["ID"]["input"];
};

export type GetMyBlocklistInput = {
  pagination: GqlPaginationInput;
};

export type GetMyBookingsInput = {
  date: Scalars["String"]["input"];
  days: Scalars["Int"]["input"];
};

export type GetMyFriendSuggestionsInput = {
  pagination: GqlPaginationInput;
  q?: InputMaybe<Scalars["String"]["input"]>;
};

export type GetMyNewsfeedPostsInput = {
  pagination: GqlPaginationInput;
  type?: PostType;
};

export type GetMyOrdersInput = {
  pagination: GqlPaginationInput;
  status?: InputMaybe<OrderStatusEnum>;
};

export type GetMyProfileFollowersMetaInput = {
  pagination: GqlPaginationInput;
};

export type GetMyReturnedOrdersInput = {
  pagination: GqlPaginationInput;
};

export type GetMyReviewsInput = {
  pagination: GqlPaginationInput;
};

export type GetMySavedPostsInput = {
  pagination: GqlPaginationInput;
};

export type GetMyWithdrawalRequestsInput = {
  pagination: GqlPaginationInput;
};

export type GetNearShopsInput = {
  distance?: InputMaybe<Scalars["Float"]["input"]>;
  lat: Scalars["Float"]["input"];
  lon: Scalars["Float"]["input"];
  storeType?: InputMaybe<StoreType>;
  take?: InputMaybe<Scalars["Int"]["input"]>;
};

export type GetNewsfeedPostsByUserIdInput = {
  pagination: GqlPaginationInput;
  type: PostType;
  userId: Scalars["ID"]["input"];
};

export type GetPlaceSuggestionInput = {
  pagination: GqlPaginationInput;
};

export type GetPostsByHashtagInput = {
  cursor?: InputMaybe<Scalars["String"]["input"]>;
  hashtag: Scalars["String"]["input"];
  postType: PostType;
  take: Scalars["Int"]["input"];
};

export type GetProductCategoriesCursorPaginationInput = {
  cursor?: InputMaybe<Scalars["String"]["input"]>;
  take: Scalars["Int"]["input"];
};

export type GetProfileFollowersMetaCursorInput = {
  cursor?: InputMaybe<Scalars["String"]["input"]>;
  take: Scalars["Int"]["input"];
  userId: Scalars["String"]["input"];
};

export type GetProfileFollowersMetaInput = {
  pagination: GqlPaginationInput;
  profileId: Scalars["String"]["input"];
};

export type GetProfilePopularStoriesViewsInput = {
  date: Scalars["String"]["input"];
  profileId: Scalars["ID"]["input"];
  userId: Scalars["ID"]["input"];
};

export type GetProfileStatisticsInput = {
  profileId: Scalars["ID"]["input"];
  sinceHours: Scalars["Int"]["input"];
  userId: Scalars["ID"]["input"];
};

export type GetProfileVisitsDetailsInput = {
  country: Scalars["String"]["input"];
  profileId: Scalars["ID"]["input"];
  visitsOrderBy: Scalars["Int"]["input"];
};

export type GetRecentStoriesInput = {
  pagination: GqlPaginationInput;
};

export type GetRecommendedAffiliationPostsInput = {
  pagination: GqlPaginationInput;
};

export type GetRecommendedServicePostsInput = {
  pagination: GqlPaginationInput;
  serviceType: Scalars["String"]["input"];
};

export type GetRecommendedServicesInput = {
  cursor?: InputMaybe<Scalars["String"]["input"]>;
  take: Scalars["Int"]["input"];
  type: ServiceType;
};

export type GetRefundableOrdersInput = {
  pagination: GqlPaginationInput;
};

export type GetReportsInput = {
  comments?: InputMaybe<Scalars["String"]["input"]>;
  id?: InputMaybe<Scalars["String"]["input"]>;
  legend?: InputMaybe<Scalars["String"]["input"]>;
  likes?: InputMaybe<Scalars["String"]["input"]>;
  pagination: GqlPaginationInput;
  publishDate?: InputMaybe<Scalars["String"]["input"]>;
  reason?: InputMaybe<Scalars["String"]["input"]>;
  shares?: InputMaybe<Scalars["String"]["input"]>;
  status?: InputMaybe<Scalars["String"]["input"]>;
  type?: InputMaybe<ReportType>;
  views?: InputMaybe<Scalars["String"]["input"]>;
};

export type GetSalesDurningPeriodInput = {
  address?: InputMaybe<Scalars["String"]["input"]>;
  buyer?: InputMaybe<Scalars["String"]["input"]>;
  pagination: GqlPaginationInput;
  productName?: InputMaybe<Scalars["String"]["input"]>;
  qty?: InputMaybe<Scalars["Int"]["input"]>;
  searchPeriod?: InputMaybe<OrderSearchPeriod>;
  seller?: InputMaybe<Scalars["String"]["input"]>;
  status?: InputMaybe<OrderStatusEnum>;
};

export type GetSellerProductsInput = {
  idCursor?: InputMaybe<Scalars["String"]["input"]>;
  sellerId: Scalars["ID"]["input"];
  take: Scalars["Int"]["input"];
};

export type GetSellerRecentOrdersInput = {
  pagination: GqlPaginationInput;
  sellerId: Scalars["String"]["input"];
};

export type GetSellerRecentOrdersResponse = {
  __typename?: "GetSellerRecentOrdersResponse";
  cursor?: Maybe<Scalars["String"]["output"]>;
  data: Array<OrderItem>;
  hasMore: Scalars["Boolean"]["output"];
  nextCursor?: Maybe<Scalars["String"]["output"]>;
  total: Scalars["Int"]["output"];
};

export type GetSellerTopSellingProductsInput = {
  pagination: GqlPaginationInput;
  sellerId: Scalars["String"]["input"];
};

export type GetShippingRulesInput = {
  page: Scalars["Int"]["input"];
  take: Scalars["Int"]["input"];
};

export type GetShopRecommendedPostsInput = {
  q?: InputMaybe<Scalars["String"]["input"]>;
};

export type GetSiteProfitInput = {
  period: StatsRetrivePeriod;
  type: ProfitStatsType;
};

export type GetStorySeenByInput = {
  pagination: GqlPaginationInput;
  q?: InputMaybe<Scalars["String"]["input"]>;
  storyId: Scalars["ID"]["input"];
};

export type GetTopEffectsInput = {
  categoryId?: InputMaybe<Scalars["ID"]["input"]>;
  cursor?: InputMaybe<Scalars["String"]["input"]>;
  effetSearchTerm: EffectSearchTerm;
  search?: InputMaybe<Scalars["String"]["input"]>;
  take: Scalars["Int"]["input"];
};

export type GetTopHashtagsInput = {
  pagination: GqlPaginationInput;
  q?: InputMaybe<Scalars["String"]["input"]>;
};

export type GetTopProfilePostsInput = {
  pagination: GqlPaginationInput;
  sinceHours: Scalars["Int"]["input"];
  userId: Scalars["ID"]["input"];
};

export type GetTopSalesProductsByCategoryPaginationInput = {
  categoryId?: InputMaybe<Scalars["String"]["input"]>;
  pagination: GqlPaginationInput;
};

export type GetTransactionsAdminInput = {
  amount?: InputMaybe<Scalars["Float"]["input"]>;
  description?: InputMaybe<Scalars["String"]["input"]>;
  id?: InputMaybe<Scalars["String"]["input"]>;
  pagination?: InputMaybe<GqlPaginationInput>;
  seller?: InputMaybe<Scalars["String"]["input"]>;
  status?: InputMaybe<TransactionStatus>;
};

export type GetTransactionsInput = {
  pagination: GqlPaginationInput;
  status?: InputMaybe<TransactionStatus>;
};

export type GetUserActionsInput = {
  cursor?: InputMaybe<Scalars["String"]["input"]>;
  take: Scalars["Int"]["input"];
  userId: Scalars["ID"]["input"];
};

export type GetUserAffiliationPostsInput = {
  pagination: GqlPaginationInput;
  userId: Scalars["ID"]["input"];
};

export type GetUserAffiliationsInput = {
  pagination: GqlPaginationInput;
  userId: Scalars["ID"]["input"];
};

export type GetUserAffiliationsPurchasesInput = {
  id: Scalars["ID"]["input"];
  pagination: GqlPaginationInput;
};

export type GetUserOrders = {
  accountType: Scalars["String"]["input"];
  pagination: GqlPaginationInput;
  q: Scalars["String"]["input"];
  status?: InputMaybe<OrderStatusEnum>;
  userId: Scalars["String"]["input"];
};

export type GetUserProductPostsInput = {
  authorId: Scalars["ID"]["input"];
  pagination: GqlPaginationInput;
};

export type GetUserServicesPostsInput = {
  pagination: GqlCursorPaginationInput;
  userId: Scalars["ID"]["input"];
};

export type GetUserStoryInput = {
  cursor?: InputMaybe<Scalars["String"]["input"]>;
  dir: Scalars["Int"]["input"];
  nextCursor?: InputMaybe<Scalars["String"]["input"]>;
  userId: Scalars["String"]["input"];
};

export type GetWithdrawalRequestsAdminInput = {
  accountType?: InputMaybe<WithdrawalAccountType>;
  amount?: InputMaybe<Scalars["Float"]["input"]>;
  email?: InputMaybe<Scalars["String"]["input"]>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
  name?: InputMaybe<Scalars["String"]["input"]>;
  pagination: GqlPaginationInput;
  processedAt?: InputMaybe<Scalars["String"]["input"]>;
  requestedAt?: InputMaybe<Scalars["String"]["input"]>;
  shop?: InputMaybe<Scalars["String"]["input"]>;
  status?: InputMaybe<WithdrawalStatus>;
};

export type GqlCursorPaginationInput = {
  cursor?: InputMaybe<Scalars["String"]["input"]>;
  take: Scalars["Int"]["input"];
};

export type GqlPaginationInput = {
  page: Scalars["Int"]["input"];
  take: Scalars["Int"]["input"];
};

export type GqlStatusResponse = {
  __typename?: "GqlStatusResponse";
  code: Scalars["Int"]["output"];
  message?: Maybe<Scalars["String"]["output"]>;
  success: Scalars["Boolean"]["output"];
};

export type Hashtag = {
  __typename?: "Hashtag";
  createdAt: Scalars["DateTime"]["output"];
  createdBy: Account;
  createdById: Scalars["String"]["output"];
  id: Scalars["ID"]["output"];
  tag: Scalars["String"]["output"];
  updatedAt: Scalars["DateTime"]["output"];
  usage: Scalars["Int"]["output"];
};

export type HashtagInput = {
  tag: Scalars["String"]["input"];
};

export type HashtagProductPost = {
  __typename?: "HashtagProductPost";
  commented?: Maybe<ProductPost>;
  liked?: Maybe<ProductPost>;
  shared?: Maybe<ProductPost>;
  viewed?: Maybe<ProductPost>;
};

export enum HashtagStatus {
  Active = "active",
  Suspended = "suspended",
}

export type HashtagTopAffiliationPost = {
  __typename?: "HashtagTopAffiliationPost";
  commented?: Maybe<AffiliationPost>;
  liked?: Maybe<AffiliationPost>;
  shared?: Maybe<AffiliationPost>;
  viewed?: Maybe<AffiliationPost>;
};

export type HealthCenter = {
  __typename?: "HealthCenter";
  cancelationPolicies: Array<ServiceCancelationPolicy>;
  contact: ServiceContact;
  doctors: Array<Doctor>;
  id: Scalars["ID"]["output"];
  location: ServiceLocation;
  owner?: Maybe<Account>;
  ownerId: Scalars["ID"]["output"];
  payment_methods: Array<ServicePaymentMethod>;
  policies: Array<ServicePolicy>;
  presentations: Array<ServicePresentation>;
  rating: Scalars["Float"]["output"];
  serviceMetaInfo: ServiceMetaInfo;
  status: ServiceStatus;
  totalReviews: Scalars["Int"]["output"];
  vat: Scalars["Float"]["output"];
};

export enum HealthCenterDoctorAvailablityStatus {
  Available = "available",
  Unavailable = "unavailable",
}

export type HealthCenterSpecialty = {
  __typename?: "HealthCenterSpecialty";
  description: Scalars["String"]["output"];
  doctors?: Maybe<Array<Doctor>>;
  id: Scalars["ID"]["output"];
  name: Scalars["String"]["output"];
};

export type HideContentInput = {
  id: Scalars["ID"]["input"];
};

export type Hotel = {
  __typename?: "Hotel";
  contact: ServiceContact;
  createdAt: Scalars["DateTime"]["output"];
  id: Scalars["ID"]["output"];
  location: ServiceLocation;
  owner: Account;
  ownerId: Scalars["ID"]["output"];
  policies: Array<ServicePolicy>;
  presentations: Array<ServicePresentation>;
  rooms: Array<HotelRoom>;
  serviceMetaInfo: ServiceMetaInfo;
  updatedAt: Scalars["DateTime"]["output"];
  workingHours?: Maybe<ServiceWorkingSchedule>;
};

export type HotelAvailablity = {
  __typename?: "HotelAvailablity";
  bookedDates: Array<Scalars["String"]["output"]>;
};

export type HotelRoom = {
  __typename?: "HotelRoom";
  adaptedFor?: Maybe<Array<ServiceAdaptation>>;
  bathrooms: Scalars["Int"]["output"];
  beds: Scalars["Int"]["output"];
  cancelationPolicies: Array<ServiceCancelationPolicy>;
  createdAt: Scalars["DateTime"]["output"];
  dailyPrice: Scalars["Boolean"]["output"];
  dailyPrices?: Maybe<ServiceDailyPrices>;
  description: Scalars["String"]["output"];
  discount: ServiceDiscount;
  extras?: Maybe<Array<ServiceExtra>>;
  hotel?: Maybe<Hotel>;
  hotelId: Scalars["ID"]["output"];
  id: Scalars["ID"]["output"];
  includedAmenities?: Maybe<Array<Scalars["String"]["output"]>>;
  includedServices?: Maybe<Array<Scalars["String"]["output"]>>;
  measurements: ServicePropertyMeasurements;
  num_of_rooms: Scalars["Int"]["output"];
  popularAmenities?: Maybe<Array<ServiceAmenity>>;
  presentations: Array<ServicePresentation>;
  pricePerNight: Scalars["Int"]["output"];
  rating: Scalars["Float"]["output"];
  reviews: Scalars["Int"]["output"];
  sellerId: Scalars["ID"]["output"];
  title: Scalars["String"]["output"];
  updatedAt: Scalars["DateTime"]["output"];
  thumbnail: Scalars["String"]["output"];
  fees?: boolean;
};

export type HotelRoomMetaInfoInput = {
  description: Scalars["String"]["input"];
  title: Scalars["String"]["input"];
};

export type HotelRoomTranslationMetaInfoInput = {
  langId: Scalars["String"]["input"];
  value: HotelRoomMetaInfoInput;
};

export type IdentityVerification = {
  __typename?: "IdentityVerification";
  VVC: Scalars["String"]["output"];
  VVCPicture: Scalars["String"]["output"];
  acceptedById: Scalars["ID"]["output"];
  addressProofBill: Scalars["String"]["output"];
  createdAt: Scalars["DateTime"]["output"];
  dateOfBirth: Scalars["DateTime"]["output"];
  firstName: Scalars["String"]["output"];
  fullAddress: Scalars["String"]["output"];
  id: Scalars["ID"]["output"];
  id_back: Scalars["String"]["output"];
  id_front: Scalars["String"]["output"];
  lastName: Scalars["String"]["output"];
  updatedAt: Scalars["DateTime"]["output"];
  userId: Scalars["ID"]["output"];
};

export type Insurance = {
  __typename?: "Insurance";
  amount: Scalars["Float"]["output"];
  bookId: Scalars["ID"]["output"];
  buyerId: Scalars["ID"]["output"];
  createdAt: Scalars["DateTime"]["output"];
  id: Scalars["ID"]["output"];
  sellerId: Scalars["ID"]["output"];
  status: ServiceInsuranceStatusEnum;
  updatedAt: Scalars["DateTime"]["output"];
};

export type InvoiceRecord = {
  __typename?: "InvoiceRecord";
  id: Scalars["ID"]["output"];
  overdue: Scalars["Float"]["output"];
  paid: Scalars["Float"]["output"];
  period: Scalars["String"]["output"];
  total: Scalars["Float"]["output"];
  type: InvoiceRecordTypes;
  unPaid: Scalars["Float"]["output"];
};

export enum InvoiceRecordTypes {
  Day = "day",
  Month = "month",
  Year = "year",
}

export type Language = {
  __typename?: "Language";
  code: Scalars["String"]["output"];
  enabled: Scalars["Boolean"]["output"];
  id: Scalars["ID"]["output"];
  locale: Scalars["String"]["output"];
  name: Scalars["String"]["output"];
  sortOrder: Scalars["Int"]["output"];
};

export type LikeStoryInput = {
  storyId: Scalars["ID"]["input"];
};

export type Localization = {
  __typename?: "Localization";
  city: Scalars["String"]["output"];
  id: Scalars["ID"]["output"];
  isOpen: Scalars["Boolean"]["output"];
  openTime: OpenTime;
  propertyType: Scalars["String"]["output"];
  seller?: Maybe<Seller>;
  sellerId: Scalars["ID"]["output"];
  thumbnail: Scalars["String"]["output"];
};

export type Location = {
  __typename?: "Location";
  address: Scalars["String"]["output"];
  city: Scalars["String"]["output"];
  country: Scalars["String"]["output"];
  postalCode: Scalars["String"]["output"];
  state: Scalars["String"]["output"];
};

export type LocationInput = {
  address: Scalars["String"]["input"];
  city: Scalars["String"]["input"];
  country: Scalars["String"]["input"];
  countryCode?: Scalars["String"]["input"];
  lat?: InputMaybe<Scalars["Float"]["input"]>;
  long?: InputMaybe<Scalars["Float"]["input"]>;
  postalCode: Scalars["String"]["input"];
  state: Scalars["String"]["input"];
};

export type LoginDto = {
  email: Scalars["String"]["input"];
  password: Scalars["String"]["input"];
};

export type LoginWithOtpInput = {
  email: Scalars["String"]["input"];
  otp: Scalars["String"]["input"];
};

export enum MailUserType {
  All = "all",
  Buyers = "buyers",
  Service = "service",
  Shops = "shops",
  Subscribers = "subscribers",
}

export type Maintenance = {
  __typename?: "Maintenance";
  from: Scalars["String"]["output"];
  id: Scalars["ID"]["output"];
  to: Scalars["String"]["output"];
  url: Scalars["String"]["output"];
};

export type MarketingTag = {
  __typename?: "MarketingTag";
  id: Scalars["ID"]["output"];
  product: Product;
  service: Service;
  type: MarketingTagType;
  x: Scalars["Float"]["output"];
  y: Scalars["Float"]["output"];
};

export enum MarketingTagType {
  Product = "product",
  Service = "service",
}

export type Membership = {
  __typename?: "Membership";
  id: Scalars["ID"]["output"];
  includings: Array<MembershipIncludedItem>;
  name: Scalars["String"]["output"];
  priceIds: Array<Scalars["String"]["output"]>;
  recurring: MembershipRecurring;
  sortOrder: Scalars["Int"]["output"];
  turnover_rules: Array<MembershipTurnoverRule>;
};

export type MembershipIncludedItem = {
  __typename?: "MembershipIncludedItem";
  title: Scalars["String"]["output"];
};

export type MembershipIncludedItemInput = {
  title: Scalars["String"]["input"];
};

export enum MembershipRecurring {
  Day = "day",
  Month = "month",
  Week = "week",
  Year = "year",
}

export enum MediaType {
  Video = "video",
  Image = "image",
}

export type MembershipSubscription = {
  __typename?: "MembershipSubscription";
  endAt: Scalars["String"]["output"];
  membership: Membership;
  membershipId: Scalars["ID"]["output"];
  startAt: Scalars["String"]["output"];
  status: MembershipSubscriptionStatus;
  subscriber: Account;
  usage: Scalars["Float"]["output"];
  userId: Scalars["ID"]["output"];
};

export enum MembershipSubscriptionStatus {
  Active = "active",
  Expired = "expired",
  Pending = "pending",
}

export type MembershipTurnoverRule = {
  __typename?: "MembershipTurnoverRule";
  commission: Scalars["Float"]["output"];
  commissionOn?: Maybe<CommissionOn>;
  commissionType: CommissionType;
  id: Scalars["ID"]["output"];
  key: Scalars["String"]["output"];
  membershipId: Scalars["ID"]["output"];
  type: MembershipTurnoverRuleType;
  usage?: Maybe<Scalars["Float"]["output"]>;
};

export type MembershipTurnoverRuleInput = {
  commission: Scalars["Float"]["input"];
  commissionOn: CommissionOn;
  commissionType: CommissionType;
  key: Scalars["String"]["input"];
  type: MembershipTurnoverRuleType;
  usage?: InputMaybe<Scalars["Float"]["input"]>;
};

export enum MembershipTurnoverRuleType {
  Flat = "flat",
  Usage = "usage",
}

export type MessageAttachment = {
  __typename?: "MessageAttachment";
  id: Scalars["ID"]["output"];
  src: Scalars["String"]["output"];
  type: MessageAttachmentType;
};

export enum MessageAttachmentType {
  Image = "image",
  Story = "story",
  VideoMessage = "videoMessage",
  VoiceMessage = "voiceMessage",
}

export enum MessagingSettings {
  All = "all",
  Follow = "follow",
  Off = "off",
}

export type Mutation = {
  __typename?: "Mutation";
  BookService: BookedService;
  UpdateDesign: Scalars["Boolean"]["output"];
  UploadActionCover: Scalars["String"]["output"];
  acceptAccountDeletionRequest: Scalars["Boolean"]["output"];
  acceptAppointment: Scalars["Boolean"]["output"];
  acceptInsurancePayBackRequest: Scalars["Boolean"]["output"];
  acceptReceivedOrder: Scalars["Boolean"]["output"];
  acceptRefundRequest: Scalars["Boolean"]["output"];
  acceptRequestedOrder: Scalars["Boolean"]["output"];
  acceptSellerAccount: Scalars["Boolean"]["output"];
  addNewBillingAddress: Scalars["Boolean"]["output"];
  addProductToCart: CartItem;
  addWishListItem: Scalars["Boolean"]["output"];
  adminCancelOrder: Scalars["Boolean"]["output"];
  adminCloseRefund: Scalars["Boolean"]["output"];
  adminConfirmRefund: Scalars["Boolean"]["output"];
  adminCreateStaffAccount: Scalars["Boolean"]["output"];
  adminDeleteComment: Scalars["Boolean"]["output"];
  adminDeleteNewsfeedPost: Scalars["Boolean"]["output"];
  adminDeleteProduct: Scalars["Boolean"]["output"];
  adminDeleteProductReview: Scalars["Boolean"]["output"];
  adminDeleteService: Scalars["Boolean"]["output"];
  adminEditAccount: Account;
  adminLogin: GqlStatusResponse;
  adminRemvoeBlock: Scalars["Boolean"]["output"];
  adminUpdateAccountWorkingSchedule: ShopWorkingSchedule;
  adminUpdateAffiliation: Scalars["Boolean"]["output"];
  adminUpdateProductReview: Scalars["Boolean"]["output"];
  adminUpdateServiceById: Scalars["Boolean"]["output"];
  adminUpdateStaffAccount: Scalars["Boolean"]["output"];
  applyVoucher: ShoppingCart;
  askForRefund: Scalars["Boolean"]["output"];
  banBuyersCities: Scalars["Boolean"]["output"];
  banSellersCities: Scalars["Boolean"]["output"];
  blockUser: Scalars["Boolean"]["output"];
  cancelServiceReservation: Scalars["Boolean"]["output"];
  changeMyNewsletterSettings: Scalars["Boolean"]["output"];
  changePassword: Scalars["Boolean"]["output"];
  changeUserNewsletterSettings: Scalars["Boolean"]["output"];
  clearBalance: Scalars["Boolean"]["output"];
  clearShoppingCart: ShoppingCart;
  createAction: Scalars["Boolean"]["output"];
  createAttribute: Scalars["Boolean"]["output"];
  createCartPaymentIntent: PaymentIntent;
  createComment: Comment;
  createConnectedAccount: Scalars["String"]["output"];
  createFilter: Filter;
  createFinancialAccount: Scalars["Boolean"]["output"];
  createInitialCurrencies: Array<Currency>;
  createLanguage: Scalars["Boolean"]["output"];
  createMaintenancePage: Scalars["Boolean"]["output"];
  createMembership: Scalars["Boolean"]["output"];
  createMembershipSubscriptionPaymentIntent: PaymentIntent;
  createNewAffiliationProduct: Affiliation;
  createNewProduct: Product;
  createNewsfeedPost: NewsfeedPost;
  createProductCategory: Scalars["Boolean"]["output"];
  createProfession: Scalars["Boolean"]["output"];
  createProfile: Profile;
  createReaction: Scalars["Boolean"]["output"];
  createRequiredAction: RequiredAction;
  createSavesCollection: Scalars["Boolean"]["output"];
  createService: Scalars["Boolean"]["output"];
  createServiceCategory: ServiceCategory;
  createShippingAddress: Scalars["Boolean"]["output"];
  createShippingRule: ShippingRule;
  createShippingTypeRule: Scalars["Boolean"]["output"];
  createShippingTypeRuleGeoZone: Scalars["Boolean"]["output"];
  createShop: Shop;
  createSiteInformations: SiteInformation;
  createStory: Scalars["Boolean"]["output"];
  createTaxRate: Scalars["Boolean"]["output"];
  declineAppointment: Scalars["Boolean"]["output"];
  declineSellerAccount: Scalars["Boolean"]["output"];
  deleteAffiliation: Affiliation;
  deleteBillingAddress: Scalars["Boolean"]["output"];
  deleteFilter: Filter;
  deleteFinancialAccount: Scalars["Boolean"]["output"];
  deleteMaintenancePage: Scalars["Boolean"]["output"];
  deleteMyProfile: Profile;
  deleteProduct: Product;
  deleteProductCategory: Scalars["Boolean"]["output"];
  deleteSavesCollection: Scalars["Boolean"]["output"];
  deleteService: Scalars["Boolean"]["output"];
  deleteShippingAddress: Scalars["Boolean"]["output"];
  deleteShippingRule: ShippingRule;
  deleteStory: Story;
  disableComingSoon: Scalars["Boolean"]["output"];
  disableMaintenanceMode: Scalars["Boolean"]["output"];
  editAccount: Account;
  editNewsfeedPostAdmin: Scalars["Boolean"]["output"];
  enableComingSoon: Scalars["Boolean"]["output"];
  enableMaintenanceMode: Scalars["Boolean"]["output"];
  followProfile: Scalars["Boolean"]["output"];
  hideContent: Scalars["Boolean"]["output"];
  likeStory: Scalars["Boolean"]["output"];
  login: GqlStatusResponse;
  loginAs: GqlStatusResponse;
  pinContent: Scalars["Boolean"]["output"];
  processWithdrawalRequest: Scalars["Boolean"]["output"];
  provideVVCPicture: Scalars["Boolean"]["output"];
  refundInsurance: Scalars["Boolean"]["output"];
  refuseAccountVerification: Scalars["Boolean"]["output"];
  refuseInsurancePayBackRequest: Scalars["Boolean"]["output"];
  register: Scalars["String"]["output"];
  rejectAccountDeletionRequest: Scalars["Boolean"]["output"];
  rejectReceivedOrder: Scalars["Boolean"]["output"];
  rejectRefundRequest: Scalars["Boolean"]["output"];
  rejectRequestedOrder: Scalars["Boolean"]["output"];
  removeAllShops: Scalars["Boolean"]["output"];
  removeComment: Comment;
  removeNewsfeedPost: NewsfeedPost;
  removeNewsletterSubscriber: Scalars["Boolean"]["output"];
  removeProductFromCart: Scalars["Boolean"]["output"];
  removeReaction: ContentReaction;
  removeReport: Scalars["Boolean"]["output"];
  removeRequiredAction: RequiredAction;
  removeReview: ProductReview;
  removeServiceCategory: ServiceCategory;
  removeWishlistItem: Scalars["Boolean"]["output"];
  reportContent: Scalars["Boolean"]["output"];
  requestAccountDeletion: Scalars["Boolean"]["output"];
  requestAccountVerification: Scalars["Boolean"]["output"];
  requestIdVerification: Scalars["String"]["output"];
  requestInsurancePayBack: Scalars["Boolean"]["output"];
  resendRegisterationCode: Scalars["Boolean"]["output"];
  resetPassword: Scalars["Boolean"]["output"];
  reviewProduct: ProductReview;
  savePost: Scalars["Boolean"]["output"];
  sendFollowRequest: Scalars["Boolean"]["output"];
  sendGeneralMail: Scalars["Boolean"]["output"];
  sendMessage: ChatMessage;
  shareContent: ContentShare;
  subscribeMembership?: Maybe<Scalars["String"]["output"]>;
  subscribeToNewsletter: Scalars["Boolean"]["output"];
  suspenseAccount: Scalars["Boolean"]["output"];
  suspenseContent: Scalars["Boolean"]["output"];
  suspenseReportedContent: Scalars["Boolean"]["output"];
  toggleSaveService: Scalars["Boolean"]["output"];
  unBanBuyersCities: Scalars["Boolean"]["output"];
  unBanSellersCities: Scalars["Boolean"]["output"];
  unFollow: Scalars["Boolean"]["output"];
  unPinContent: Scalars["Boolean"]["output"];
  unblockUser: Scalars["Boolean"]["output"];
  unsubscribe: Scalars["Boolean"]["output"];
  updateAccountPrivacySettings: PrivacySettings;
  updateAffiliation: Affiliation;
  updateAttribute: Scalars["Boolean"]["output"];
  updateBeautyCenterAdmin: Scalars["Boolean"]["output"];
  updateBillingAddress: Scalars["Boolean"]["output"];
  updateComment: Comment;
  updateCurrenciesRates: Array<Currency>;
  updateCurrency: Scalars["Boolean"]["output"];
  updateFilter: Filter;
  updateFinancialAccount: Scalars["Boolean"]["output"];
  updateHashtag: Hashtag;
  updateHealthCenterAdmin: Scalars["Boolean"]["output"];
  updateHotelAdmin: Scalars["Boolean"]["output"];
  updateLanguage: Scalars["Boolean"]["output"];
  updateMembership: Scalars["Boolean"]["output"];
  updateMyContact: Scalars["Boolean"]["output"];
  updateMyCookiesSettings: Scalars["Boolean"]["output"];
  updateMyPrivacySettings: PrivacySettings;
  updateMyWorkingSchedule: ShopWorkingSchedule;
  updateNewsfeedPost: NewsfeedPost;
  updatePayoutAccount: Scalars["Boolean"]["output"];
  updateProduct: Product;
  updateProductAdmin: Scalars["Boolean"]["output"];
  updateProductCategory: Scalars["Boolean"]["output"];
  updateProfession: Scalars["Boolean"]["output"];
  updateProfile: Profile;
  updateRequiredAction: RequiredAction;
  updateRestaurantAdmin: Scalars["Boolean"]["output"];
  updateServiceCategory: ServiceCategory;
  updateShippingAddress: Scalars["Boolean"]["output"];
  updateShippingRule: ShippingRule;
  updateShippingTypeRule: Scalars["Boolean"]["output"];
  updateShop: Shop;
  updateSiteInformations: SiteInformation;
  updateSocialLinks: Scalars["Boolean"]["output"];
  updateTaxRate: Scalars["Boolean"]["output"];
  updateUserLocation: Scalars["Boolean"]["output"];
  updateUserProfile: Profile;
  updateVehicleAdmin: Scalars["Boolean"]["output"];
  uploadActionVideo: Scalars["String"]["output"];
  uploadFile: Scalars["Boolean"]["output"];
  uploadStripeBankDocument: Scalars["String"]["output"];
  verifyEmail: Scalars["Boolean"]["output"];
  verifyLoginOTP: GqlStatusResponse;
  verifyNewPassword: Scalars["Boolean"]["output"];
  withdraw: Scalars["Boolean"]["output"];
};

export type MutationBookServiceArgs = {
  args: BookServiceInput;
};

export type MutationUpdateDesignArgs = {
  args: UpdateDesignInput;
};

export type MutationUploadActionCoverArgs = {
  file: Scalars["Upload"]["input"];
};

export type MutationAcceptAccountDeletionRequestArgs = {
  id: Scalars["String"]["input"];
};

export type MutationAcceptAppointmentArgs = {
  id: Scalars["ID"]["input"];
};

export type MutationAcceptInsurancePayBackRequestArgs = {
  bookId: Scalars["ID"]["input"];
};

export type MutationAcceptReceivedOrderArgs = {
  args: AcceptReceivedOrderInput;
};

export type MutationAcceptRefundRequestArgs = {
  id: Scalars["ID"]["input"];
};

export type MutationAcceptRequestedOrderArgs = {
  args: AcceptRequestedOrderInput;
};

export type MutationAcceptSellerAccountArgs = {
  id: Scalars["String"]["input"];
};

export type MutationAddProductToCartArgs = {
  addItemToCartArgs: AddShoppingCartItemInput;
};

export type MutationAdminCancelOrderArgs = {
  id: Scalars["String"]["input"];
};

export type MutationAdminCloseRefundArgs = {
  id: Scalars["String"]["input"];
};

export type MutationAdminConfirmRefundArgs = {
  id: Scalars["String"]["input"];
};

export type MutationAdminCreateStaffAccountArgs = {
  args: AdminCreateAdminAccountInput;
};

export type MutationAdminDeleteCommentArgs = {
  commentId: Scalars["String"]["input"];
};

export type MutationAdminDeleteNewsfeedPostArgs = {
  id: Scalars["String"]["input"];
};

export type MutationAdminDeleteProductArgs = {
  id: Scalars["String"]["input"];
  reason: Scalars["String"]["input"];
};

export type MutationAdminDeleteProductReviewArgs = {
  id: Scalars["String"]["input"];
};

export type MutationAdminDeleteServiceArgs = {
  args: AdminDeleteServiceInput;
};

export type MutationAdminEditAccountArgs = {
  editAccountInput: UpdateSellerAccountAdminInput;
};

export type MutationAdminLoginArgs = {
  args: LoginDto;
};

export type MutationAdminRemvoeBlockArgs = {
  id: Scalars["String"]["input"];
};

export type MutationAdminUpdateAccountWorkingScheduleArgs = {
  accountId: Scalars["String"]["input"];
  args: UpdateWorkingScheduleInput;
};

export type MutationAdminUpdateAffiliationArgs = {
  updateAffilaition: UpdateAffiliationAdminInput;
};

export type MutationAdminUpdateProductReviewArgs = {
  args: UpdateProductReviewInput;
};

export type MutationAdminUpdateServiceByIdArgs = {
  args: UpdateServiceInput;
};

export type MutationAdminUpdateStaffAccountArgs = {
  args: AdminUpdateAdminAccountInput;
};

export type MutationApplyVoucherArgs = {
  args: ApplyVoucherInput;
};

export type MutationAskForRefundArgs = {
  askForRefundArgs: AskForRefundInput;
};

export type MutationBanBuyersCitiesArgs = {
  args: BanCitiesInput;
};

export type MutationBanSellersCitiesArgs = {
  args: BanCitiesInput;
};

export type MutationBlockUserArgs = {
  args: CreateBlockInput;
};

export type MutationCancelServiceReservationArgs = {
  id: Scalars["String"]["input"];
};

export type MutationChangeMyNewsletterSettingsArgs = {
  args: UpdateNewsletterInput;
};

export type MutationChangePasswordArgs = {
  changePasswordInput: ChangePasswordInput;
};

export type MutationChangeUserNewsletterSettingsArgs = {
  accountId: Scalars["String"]["input"];
  args: UpdateNewsletterInput;
};

export type MutationCreateActionArgs = {
  args: CreateActionInput;
};

export type MutationCreateAttributeArgs = {
  args: CreateProductAttributeInput;
};

export type MutationCreateCommentArgs = {
  createCommentInput: CreateCommentInput;
};

export type MutationCreateFilterArgs = {
  createFilterGroupArgs?: InputMaybe<CreateFilterInput>;
};

export type MutationCreateFinancialAccountArgs = {
  args: CreateFinancialAccountInput;
  userId: Scalars["String"]["input"];
};

export type MutationCreateLanguageArgs = {
  args: CreateLanguageInput;
};

export type MutationCreateMaintenancePageArgs = {
  args: CreateMaintenanceInput;
};

export type MutationCreateMembershipArgs = {
  args: CreateMembershipInput;
};

export type MutationCreateMembershipSubscriptionPaymentIntentArgs = {
  args: CreateMembershipPaymentIntentInput;
};

export type MutationCreateNewAffiliationProductArgs = {
  args: CreateAffiliationInput;
};

export type MutationCreateNewProductArgs = {
  createNewProductInput: CreateProductInput;
};

export type MutationCreateNewsfeedPostArgs = {
  createNewsfeedPostInput: CreateNewsfeedPostInput;
};

export type MutationCreateProductCategoryArgs = {
  createCategoryInput: CreateCategoryInput;
};

export type MutationCreateProfessionArgs = {
  args: CreateProfessionInput;
};

export type MutationCreateProfileArgs = {
  createProfileInput: CreateProfileInput;
};

export type MutationCreateReactionArgs = {
  CreateReactionInput: CreateReactionInput;
};

export type MutationCreateRequiredActionArgs = {
  createRequiredActionInput: CreateRequiredActionInput;
};

export type MutationCreateSavesCollectionArgs = {
  name: Scalars["String"]["input"];
};

export type MutationCreateServiceArgs = {
  args: CreateServiceInput;
};

export type MutationCreateServiceCategoryArgs = {
  createServiceCategoryArgs: CreateServiceCategoryInput;
};

export type MutationCreateShippingAddressArgs = {
  args: CreateShippingAddressInput;
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

export type MutationCreateSiteInformationsArgs = {
  args: CreateSiteInformationInput;
};

export type MutationCreateStoryArgs = {
  createStoryInput: CreateStoryInput;
};

export type MutationCreateTaxRateArgs = {
  args: CreateTaxRateInput;
};

export type MutationDeclineAppointmentArgs = {
  args: DeclineAppointmentInput;
};

export type MutationDeclineSellerAccountArgs = {
  args: DeclineSellerAccountRequest;
};

export type MutationDeleteAffiliationArgs = {
  id: Scalars["ID"]["input"];
};

export type MutationDeleteFilterArgs = {
  deleteFilterId: Scalars["String"]["input"];
};

export type MutationDeleteFinancialAccountArgs = {
  accountId: Scalars["String"]["input"];
  userId: Scalars["String"]["input"];
};

export type MutationDeleteMaintenancePageArgs = {
  id: Scalars["String"]["input"];
};

export type MutationDeleteProductArgs = {
  productId: Scalars["ID"]["input"];
};

export type MutationDeleteProductCategoryArgs = {
  deleteCategoryId: Scalars["String"];
};

export type MutationDeleteServiceArgs = {
  id: Scalars["String"]["input"];
};

export type MutationDeleteShippingAddressArgs = {
  id: Scalars["String"]["input"];
};

export type MutationDeleteShippingRuleArgs = {
  id: Scalars["ID"]["input"];
};

export type MutationDeleteStoryArgs = {
  deleteStoryInput: DeleteStoryInput;
};

export type MutationEditAccountArgs = {
  editAccountInput: UpdateAccountInput;
};

export type MutationEditNewsfeedPostAdminArgs = {
  args: UpdatePostAdminInput;
};

export type MutationFollowProfileArgs = {
  followUserInput: FollowProfileInput;
};

export type MutationHideContentArgs = {
  args: HideContentInput;
};

export type MutationLikeStoryArgs = {
  likeStoryInput: LikeStoryInput;
};

export type MutationLoginArgs = {
  LoginInput: LoginDto;
};

export type MutationLoginAsArgs = {
  userId: Scalars["String"]["input"];
};

export type MutationPinContentArgs = {
  args: CreatePinnedContentInput;
};

export type MutationProcessWithdrawalRequestArgs = {
  id: Scalars["String"]["input"];
};

export type MutationProvideVvcPictureArgs = {
  pic: Scalars["String"]["input"];
};

export type MutationRefundInsuranceArgs = {
  id: Scalars["ID"]["input"];
};

export type MutationRefuseAccountVerificationArgs = {
  args: RefuseAccountVerificationRequest;
};

export type MutationRefuseInsurancePayBackRequestArgs = {
  bookId: Scalars["ID"]["input"];
};

export type MutationRegisterArgs = {
  RegisterInput: CreateAccountInput;
};

export type MutationRejectAccountDeletionRequestArgs = {
  id: Scalars["String"]["input"];
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

export type MutationRemoveCommentArgs = {
  id: Scalars["Int"]["input"];
};

export type MutationRemoveNewsfeedPostArgs = {
  id: Scalars["Int"]["input"];
};

export type MutationRemoveNewsletterSubscriberArgs = {
  id: Scalars["ID"]["input"];
};

export type MutationRemoveProductFromCartArgs = {
  removeItemFromCartArgs: RemoveShoppingCartItemInput;
};

export type MutationRemoveReactionArgs = {
  removeReactionArgs: RemoveReactionInput;
};

export type MutationRemoveReportArgs = {
  id: Scalars["String"]["input"];
};

export type MutationRemoveRequiredActionArgs = {
  id: Scalars["Int"]["input"];
};

export type MutationRemoveReviewArgs = {
  id: Scalars["ID"]["input"];
};

export type MutationRemoveServiceCategoryArgs = {
  serviceCategoryId: Scalars["String"]["input"];
};

export type MutationReportContentArgs = {
  reportContentArgs: CreateReportInput;
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
  bookId: Scalars["ID"]["input"];
};

export type MutationResetPasswordArgs = {
  ResetPasswordArgs: ForgotPasswordEmailInput;
};

export type MutationReviewProductArgs = {
  args: CreateProductReviewInput;
};

export type MutationSavePostArgs = {
  collectionId: Scalars["String"]["input"];
  postId: Scalars["String"]["input"];
};

export type MutationSendFollowRequestArgs = {
  profileId: Scalars["String"]["input"];
};

export type MutationSendGeneralMailArgs = {
  args: AdminSendMailToUsersInput;
};

export type MutationSendMessageArgs = {
  sendMessageInput: CreateMessageInput;
};

export type MutationShareContentArgs = {
  createContentShareInput: CreateContentShareInput;
};

export type MutationSubscribeMembershipArgs = {
  membershipId: Scalars["String"]["input"];
};

export type MutationSubscribeToNewsletterArgs = {
  email: Scalars["String"]["input"];
  name: Scalars["String"]["input"];
};

export type MutationSuspenseAccountArgs = {
  args: SuspenseAccountAdminInput;
};

export type MutationSuspenseContentArgs = {
  suspenseContentArgs: SuspenseContentInput;
};

export type MutationSuspenseReportedContentArgs = {
  id: Scalars["String"]["input"];
};

export type MutationToggleSaveServiceArgs = {
  serviceId: Scalars["String"]["input"];
};

export type MutationUnBanBuyersCitiesArgs = {
  args: BanCitiesInput;
};

export type MutationUnBanSellersCitiesArgs = {
  args: BanCitiesInput;
};

export type MutationUnFollowArgs = {
  unFollowProfileInput: UnFollowProfileInput;
};

export type MutationUnPinContentArgs = {
  args: CreatePinnedContentInput;
};

export type MutationUnblockUserArgs = {
  args: CreateBlockInput;
};

export type MutationUpdateAccountPrivacySettingsArgs = {
  args: UpdateMyPrivacyInput;
  id: Scalars["String"]["input"];
};

export type MutationUpdateAffiliationArgs = {
  args: UpdateAffiliationInput;
};

export type MutationUpdateAttributeArgs = {
  args: UpdateProductAttributeInput;
};

export type MutationUpdateBeautyCenterAdminArgs = {
  args: UpdateBeautyCenterAdminInput;
};

export type MutationUpdateCommentArgs = {
  updateCommentInput: UpdateCommentInput;
};

export type MutationUpdateCurrencyArgs = {
  updateCurrencyArgs: UpdateCurrencyInput;
};

export type MutationUpdateFilterArgs = {
  updateFilterArgs: UpdateFilterInput;
};

export type MutationUpdateFinancialAccountArgs = {
  args: UpdateFinancialAccountInput;
  userId: Scalars["String"]["input"];
};

export type MutationUpdateHashtagArgs = {
  args: UpdateHashtagInput;
};

export type MutationUpdateHealthCenterAdminArgs = {
  args: UpdateHealthCenterAdminInput;
};

export type MutationUpdateHotelAdminArgs = {
  args: UpdateHotelAdminInput;
};

export type MutationUpdateLanguageArgs = {
  args: UpdateLanguageInput;
};

export type MutationUpdateMembershipArgs = {
  args: UpdateMembershipInput;
};

export type MutationUpdateMyContactArgs = {
  args: AddContactInput;
};

export type MutationUpdateMyCookiesSettingsArgs = {
  args: UpdateUserCookiesSettingsInput;
};

export type MutationUpdateMyPrivacySettingsArgs = {
  args: UpdateMyPrivacyInput;
};

export type MutationUpdateMyWorkingScheduleArgs = {
  args: UpdateWorkingScheduleInput;
};

export type MutationUpdateNewsfeedPostArgs = {
  updateNewsfeedPostInput: UpdateNewsfeedPostInput;
};

export type MutationUpdatePayoutAccountArgs = {
  args: CreateBillingAccountInput;
  stripeId?: InputMaybe<Scalars["String"]["input"]>;
  userId: Scalars["String"]["input"];
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

export type MutationUpdateProfessionArgs = {
  args: UpdateProfessionInput;
};

export type MutationUpdateProfileArgs = {
  updateProfileInput: UpdateProfileAdminInput;
};

export type MutationUpdateRequiredActionArgs = {
  updateRequiredActionInput: UpdateRequiredActionInput;
};

export type MutationUpdateRestaurantAdminArgs = {
  args: UpdateRestaurantAdminInput;
};

export type MutationUpdateServiceCategoryArgs = {
  updateServiceCategoryArgs: UpdateServiceCategoryInput;
};

export type MutationUpdateShippingAddressArgs = {
  args: UpdateShippingAddressInput;
};

export type MutationUpdateShippingRuleArgs = {
  updateShippingRuleArgs: UpdateShippingRuleInput;
};

export type MutationUpdateShippingTypeRuleArgs = {
  args: UpdateShippingTypeRuleInput;
};

export type MutationUpdateShopArgs = {
  args: UpdateUserShopInput;
};

export type MutationUpdateSiteInformationsArgs = {
  args: UpdateSiteInformationInput;
};

export type MutationUpdateSocialLinksArgs = {
  args: UpdateSiteSocialInput;
};

export type MutationUpdateTaxRateArgs = {
  args: UpdateTaxRateInput;
};

export type MutationUpdateUserLocationArgs = {
  updateLocation: UpdateUserLocationInput;
};

export type MutationUpdateUserProfileArgs = {
  args: UpdateProfileInput;
};

export type MutationUpdateVehicleAdminArgs = {
  args: UpdateVehicleAdminInput;
};

export type MutationUploadActionVideoArgs = {
  src: Scalars["Upload"]["input"];
};

export type MutationUploadFileArgs = {
  file: TestUploadFile;
};

export type MutationUploadStripeBankDocumentArgs = {
  doc: Scalars["Upload"]["input"];
  test: Scalars["String"]["input"];
};

export type MutationVerifyEmailArgs = {
  EmailVerificationInput: VerifyEmailDto;
};

export type MutationVerifyLoginOtpArgs = {
  args: LoginWithOtpInput;
};

export type MutationVerifyNewPasswordArgs = {
  verifyNewPassword: ConfirmPasswordChangeInput;
};

export type MutationWithdrawArgs = {
  args: WithdrawInput;
};

export type MyBookings = {
  __typename?: "MyBookings";
  cursor?: Maybe<Scalars["String"]["output"]>;
  data: Array<BookedService>;
  take: Scalars["Int"]["output"];
};

export type NewsfeedHashtagSearch = {
  __typename?: "NewsfeedHashtagSearch";
  mostCommentedPost: NewsfeedPost;
  mostLikedPost: NewsfeedPost;
  mostLikedVideo: NewsfeedPost;
  mostViewedVideo: NewsfeedPost;
};

export type NewsfeedPost = {
  __typename?: "NewsfeedPost";
  affiliation?: Maybe<Affiliation>;
  affiliationId?: Maybe<Scalars["String"]["output"]>;
  attachments: Array<Scalars["String"]["output"]>;
  comments: Scalars["Int"]["output"];
  commentsVisibility: CommentsVisibility;
  content: Scalars["String"]["output"];
  createdAt: Scalars["String"]["output"];
  enableComments: Scalars["Boolean"]["output"];
  hashtags?: Maybe<Array<Hashtag>>;
  id: Scalars["ID"]["output"];
  isCommented: Scalars["Boolean"]["output"];
  isLiked: Scalars["Boolean"]["output"];
  isSaved: Scalars["Boolean"]["output"];
  location?: Maybe<PostLocation>;
  likes: Scalars["Int"]["input"];
  mentions?: Maybe<Array<PostMention>>;
  mediaType?: Maybe<MediaType>;
  pinned: Scalars["Boolean"]["output"];
  productIds?: Maybe<Array<Scalars["String"]["output"]>>;
  products?: Maybe<Array<Product>>;
  publisher?: Maybe<Profile>;
  reactionNum: Scalars["Int"]["output"];
  service?: Maybe<Service>;
  serviceId?: Maybe<Scalars["String"]["output"]>;
  shares: Scalars["Int"]["output"];
  tags?: Maybe<Array<PostTag>>;
  thumbnail: Scalars["String"]["output"];
  title: Scalars["String"]["output"];
  type: PostType;
  updatedAt: Scalars["String"]["output"];
  userId: Scalars["ID"]["output"];
  views: Scalars["Int"]["output"];
};

export type NewsfeedPostsPaginationResponse = {
  __typename?: "NewsfeedPostsPaginationResponse";
  cursor?: Maybe<Scalars["String"]["output"]>;
  data: Array<NewsfeedPost>;
  hasMore: Scalars["Boolean"]["output"];
  nextCursor?: Maybe<Scalars["String"]["output"]>;
  total: Scalars["Int"]["output"];
};

export type NewsletterSettings = {
  __typename?: "NewsletterSettings";
  feedback: Scalars["Boolean"]["output"];
  news: Scalars["Boolean"]["output"];
  product: Scalars["Boolean"]["output"];
  reminder: Scalars["Boolean"]["output"];
};

export type NewsletterSubscriber = {
  __typename?: "NewsletterSubscriber";
  createdAt: Scalars["String"]["output"];
  emailSettings: NewsletterSettings;
  id: Scalars["ID"]["output"];
  ownerId: Scalars["ID"]["output"];
  updatedAt: Scalars["String"]["output"];
  user: Account;
};

export type Notification = {
  __typename?: "Notification";
  id: Scalars["String"]["output"];
  userId: Scalars["String"]["output"];
  authorId: Scalars["String"]["output"];
  author: Account;
  authorProfileId: Scalars["String"]["output"];
  createdAt: Scalars["String"]["output"];
  updatedAt: Scalars["String"]["output"];
  type: NotificationType;
  content: Scalars["String"]["output"];
  thumbnail: Scalars["String"]["output"];
};
export type NotificationPaginationResponse = {
  total: Scalars["Int"]["input"];
};
export enum NotificationType {
  FollowRequest = "followRequest",
  Follow = "follow",
  StoryReacted = "storyReacted",
  DmMessage = "DmMessage",
  ShopPromotion = "ShopPromotion",
  PostReacted = "postReacted",
  PostCommented = "postCommented",
  CommentReacted = "commentReacted",
  CommentCommented = "commentCommented",
  PostMention = "postMention",
  CommentMention = "commentMention",
  Info = "info",
  Warning = "warning",
  OrderCanceled = "orderCanceled",
  OrderDelivered = "orderDelivered",
  ActionPosted = "actionPosted",
  LocalizationService = "localizationService",
  LocalizationShop = "localizationShop",
}

export type OpenTime = {
  __typename?: "OpenTime";
  from: Scalars["DateTime"]["output"];
  to: Scalars["DateTime"]["output"];
};

export type Order = {
  __typename?: "Order";
  billing: BillingAddress;
  billingAddressId: Scalars["String"]["output"];
  buyer?: Maybe<Account>;
  buyerId: Scalars["ID"]["output"];
  createdAt: Scalars["DateTime"]["output"];
  id: Scalars["ID"]["output"];
  items: Array<OrderItem>;
  paid: Scalars["Float"]["output"];
  seller?: Maybe<Account>;
  sellerId: Scalars["ID"]["output"];
  shipping: ShippingRule;
  shippingAddress: ShippingAddress;
  shippingAddressId: Scalars["String"]["output"];
  shippingMethodId: Scalars["String"]["output"];
  status: OrderStatus;
  trackingLink?: Maybe<Scalars["String"]["output"]>;
  updatedAt: Scalars["DateTime"]["output"];
};

export type OrderItem = {
  __typename?: "OrderItem";
  affiliator: Account;
  affiliatorId?: Maybe<Scalars["String"]["output"]>;
  buyer: Account;
  cashback?: Maybe<Scalars["Float"]["output"]>;
  createdAt: Scalars["String"]["output"];
  discount?: Maybe<Scalars["Float"]["output"]>;
  discountAmount?: Maybe<Scalars["Float"]["output"]>;
  id: Scalars["ID"]["output"];
  order: Order;
  orderId: Scalars["String"]["output"];
  paid?: Maybe<Scalars["Float"]["output"]>;
  paidAt?: Maybe<Scalars["String"]["output"]>;
  product?: Maybe<Product>;
  qty: Scalars["Int"]["output"];
  refundable: Scalars["Boolean"]["output"];
  rejectReason?: Maybe<Scalars["String"]["output"]>;
  seller: Account;
  status: OrderStatusEnum;
  updatedAt: Scalars["String"]["output"];
};

export enum OrderSearchPeriod {
  Day = "day",
  Month = "month",
  Week = "week",
}

export type OrderStatus = {
  __typename?: "OrderStatus";
  of: OrderStatusEnum;
  rejectReason?: Maybe<Scalars["String"]["output"]>;
};

export enum OrderStatusEnum {
  Canceled = "canceled",
  Compeleted = "compeleted",
  Paid = "paid",
  Pending = "pending",
  RejectedByBuyer = "rejectedByBuyer",
  RejectedBySeller = "rejectedBySeller",
  Shipping = "shipping",
}

export type PaginationCommentsResponse = {
  __typename?: "PaginationCommentsResponse";
  data: Array<Comment>;
  hasMore: Scalars["Boolean"]["output"];
  total: Scalars["Int"]["output"];
};

export type PartialBillingAccountAddress = {
  __typename?: "PartialBillingAccountAddress";
  city?: Maybe<Scalars["String"]["output"]>;
  country?: Maybe<Scalars["String"]["output"]>;
  line1?: Maybe<Scalars["String"]["output"]>;
  postal_code?: Maybe<Scalars["String"]["output"]>;
  state?: Maybe<Scalars["String"]["output"]>;
};

export type PartialBillingAccountDateOfBirth = {
  __typename?: "PartialBillingAccountDateOfBirth";
  day?: Maybe<Scalars["Int"]["output"]>;
  month?: Maybe<Scalars["Int"]["output"]>;
  year?: Maybe<Scalars["Int"]["output"]>;
};

export type PartialCompanyPersonRelationship = {
  __typename?: "PartialCompanyPersonRelationship";
  director?: Maybe<Scalars["Boolean"]["output"]>;
  executive?: Maybe<Scalars["Boolean"]["output"]>;
  owner?: Maybe<Scalars["Boolean"]["output"]>;
  representative?: Maybe<Scalars["Boolean"]["output"]>;
  title?: Maybe<Scalars["String"]["output"]>;
};

export type PaymentIntent = {
  __typename?: "PaymentIntent";
  client_secret: Scalars["String"]["output"];
};

export enum ProductUsageStatus {
  New = "new",
  Used = "used",
}

export type Place = {
  __typename?: "Place";
  id: Scalars["ID"]["output"];
  type: Scalars["String"]["output"];
};

export type PlaceSuggestions = {
  __typename?: "PlaceSuggestions";
  places: Array<Place>;
};

export type PostLocation = {
  __typename?: "PostLocation";
  address?: Maybe<Scalars["String"]["output"]>;
  city: Scalars["String"]["output"];
  country: Scalars["String"]["output"];
  state?: Maybe<Scalars["String"]["output"]>;
};

export type PostLocationInput = {
  address?: InputMaybe<Scalars["String"]["input"]>;
  city: Scalars["String"]["input"];
  country: Scalars["String"]["input"];
  state?: InputMaybe<Scalars["String"]["input"]>;
};

export type PostMention = {
  __typename?: "PostMention";
  userId: Scalars["ID"]["output"];
};

export type PostTag = {
  __typename?: "PostTag";
  userId: Scalars["ID"]["output"];
};

export type PostTagInput = {
  userId: Scalars["String"]["input"];
};

export enum PostType {
  AffiliationPost = "affiliation_post",
  NewsfeedPost = "newsfeed_post",
  ServicePost = "service_post",
  ShopPost = "shop_post",
  Video = "Video",
  Image = "Image",
}

export enum PostVisibility {
  Followers = "followers",
  Following = "following",
  Hidden = "hidden",
  Public = "public",
}

export type PostCardInfo = {
  profileInfo: ProfileInfo;
  postInfo: PostInfo;
};

export type PostInfo = {
  createdAt: Scalars["String"]["input"];
  id: Scalars["String"]["input"];
  content?: Scalars["String"]["input"];
  tags: Array<Scalars["String"]["input"]>;
  views?: Scalars["Int"]["input"];
  attachments?: PostAttachment[];
  numberOfLikes: Scalars["Int"]["input"];
  numberOfComments: Scalars["Int"]["input"];
  numberOfShares: Scalars["Int"]["input"];
  comments?: PostComment[];
  thumbnail?: Scalars["String"]["input"];
};

export interface PostComment {
  id: Scalars["String"]["input"];
  user: ProfileInfo;
  replies: Scalars["Int"]["input"];
  likes: Scalars["Int"]["input"];
  createdAt: Scalars["String"]["input"];
  content: Scalars["String"]["input"];
  attachment?: PostAttachment | null;
  hashTags?: Array<Scalars["String"]["input"]>;
}

export type PostAttachment = {
  type: Scalars["String"]["input"];
  src: Scalars["String"]["input"];
  postLocation?: Scalars["String"]["input"];
};

export type ProfileInfo = {
  id: Scalars["ID"]["output"];
  verifed?: Scalars["Boolean"]["input"];
  name: Scalars["String"]["input"];
  thumbnail: Scalars["String"]["input"];
  accountType: AccountType.Buyer | AccountType.Seller;
  public: Scalars["Boolean"]["input"];
  profession?: Scalars["String"]["input"];
  photo?: Scalars["String"]["input"];
};

export enum PresentationType {
  Image = "image",
  Video = "video",
}

export type PrivacySettings = {
  __typename?: "PrivacySettings";
  hideCommentsNum: Scalars["Boolean"]["output"];
  hideLikesNum: Scalars["Boolean"]["output"];
  hideViewsNum: Scalars["Boolean"]["output"];
  id: Scalars["ID"]["output"];
  initialMessaging: MessagingSettings;
  messageReadStatus: Scalars["Boolean"]["output"];
  privateAccount: Scalars["Boolean"]["output"];
  userId: Scalars["ID"]["output"];
};

export type Product = {
  __typename?: "Product";
  attributes: Array<ProductAttribute>;
  brand: Scalars["String"]["output"];
  cashback: Cashback;
  cashbackId?: Maybe<Scalars["String"]["output"]>;
  category?: Maybe<Category>;
  categoryId: Scalars["ID"]["output"];
  colors: Array<Scalars["String"]["output"]>;
  condition: ProductCondition;
  createdAt: Scalars["String"]["output"];
  description: Scalars["String"]["output"];
  discount: Discount;
  discountId?: Maybe<Scalars["String"]["output"]>;
  earnings: Scalars["Float"]["output"];
  external_clicks: Scalars["Int"]["output"];
  hashtags: Array<Scalars["String"]["output"]>;
  id: Scalars["ID"]["output"];
  isExternalProduct: Scalars["Boolean"]["output"];
  isExternalShopping: Scalars["Boolean"]["output"];
  negitiveFeedback: Scalars["Int"]["output"];
  positiveFeedback: Scalars["Int"]["output"];
  presentations: Array<ProductPresentation>;
  price: Scalars["Float"]["output"];
  rate: Scalars["Int"]["output"];
  reviews: Scalars["Int"]["output"];
  sales: Scalars["Int"]["output"];
  saved: Scalars["Boolean"]["output"];
  selectableAttributes: Array<ProductSelectAttribute>;
  seller: Account;
  sellerId: Scalars["ID"]["output"];
  shippingDetails?: Maybe<ShippingDetails>;
  shippingRulesIds: Array<Scalars["ID"]["output"]>;
  sizes: Array<ProductSize>;
  status: ProductStatus;
  stock: Scalars["Int"]["output"];
  thumbnail: Scalars["String"]["output"];
  title: Scalars["String"]["output"];
  todayProductClickId?: Maybe<Scalars["String"]["output"]>;
  totalDiscounted: Scalars["Int"]["output"];
  totalDiscountedAmount: Scalars["Int"]["output"];
  totalOrdered: Scalars["Int"]["output"];
  unitsRefunded: Scalars["Int"]["output"];
  updatedAt: Scalars["String"]["output"];
  usageStatus: Maybe<ProductUsageStatus>;
  vat: Scalars["Float"]["output"];
  vendor_external_link?: Maybe<Scalars["String"]["output"]>;
  visibility: VisibilityEnum;
};

export type ProductAttribute = {
  __typename?: "ProductAttribute";
  displayType: ProductAttributeDisplayType;
  id: Scalars["ID"]["output"];
  name: Scalars["String"]["output"];
  selectionType: ProductAttributeSelectionType;
  values: Array<ProductAttributeValue>;
};

export enum ProductAttributeDisplayType {
  Color = "color",
  Text = "text",
}

export type ProductAttributeInput = {
  id: Scalars["ID"]["input"];
  values: Array<Scalars["ID"]["input"]>;
};

export enum ProductAttributeSelectionType {
  Multiple = "multiple",
  Single = "single",
}

export type ProductAttributeValue = {
  __typename?: "ProductAttributeValue";
  id: Scalars["ID"]["output"];
  name: Scalars["String"]["output"];
  price?: Maybe<Scalars["Float"]["output"]>;
  value: Scalars["String"]["output"];
};

export type ProductAttributeValueInput = {
  name: Array<TranslationTextInput>;
  value: Scalars["String"]["input"];
  id: Scalars["ID"]["input"];
};

export type ProductAttributesPaginationResponse = {
  __typename?: "ProductAttributesPaginationResponse";
  data: Array<ProductAttribute>;
  hasMore: Scalars["Boolean"]["output"];
  total: Scalars["Int"]["output"];
};

export enum ProductCategoryStatus {
  Active = "active",
  InActive = "inActive",
}

export enum ProductCondition {
  New = "new",
  Recondition = "recondition",
  Used = "used",
}

export type ProductFilterGroupValue = {
  __typename?: "ProductFilterGroupValue";
  name: Scalars["String"]["output"];
  sortOrder: Scalars["Int"]["output"];
};

export type ProductFilterGroupValueInput = {
  name: Array<StringTranslationField>;
  sortOrder: Scalars["Int"]["input"];
};

export type ProductPaginationResponse = {
  __typename?: "ProductPaginationResponse";
  data: Array<Product>;
  hasMore: Scalars["Boolean"]["output"];
  total: Scalars["Int"]["output"];
};

export type ProductPost = {
  __typename?: "ProductPost";
  comments: Scalars["Int"]["output"];
  commentsVisibility: CommentsVisibility;
  createdAt: Scalars["String"]["output"];
  id: Scalars["ID"]["output"];
  location?: Maybe<PostLocation>;
  product: Product;
  productId: Scalars["ID"]["output"];
  reactionNum: Scalars["Int"]["output"];
  shares: Scalars["Int"]["output"];
  updatedAt: Scalars["String"]["output"];
  user?: Maybe<Account>;
  userId: Scalars["ID"]["output"];
  views: Scalars["Int"]["output"];
  visibility: PostVisibility;
};

export type ProductPresentation = {
  __typename?: "ProductPresentation";
  src: Scalars["String"]["output"];
  type: PresentationType;
};

export type ProductPresentationInput = {
  src: Scalars["String"]["input"];
  type: PresentationType;
};

export type ProductRawAttribute = {
  __typename?: "ProductRawAttribute";
  displayType: ProductAttributeDisplayType;
  id: Scalars["ID"]["output"];
  name: Array<TranslationText>;
  selectionType: ProductAttributeSelectionType;
  values: Array<ProductRawAttributeValue>;
};

export type ProductRawAttributeValue = {
  __typename?: "ProductRawAttributeValue";
  name: Array<TranslationText>;
  value: Scalars["String"]["output"];
};

export type ProductReview = {
  __typename?: "ProductReview";
  createdAt: Scalars["DateTime"]["output"];
  id: Scalars["ID"]["output"];
  message: Scalars["String"]["output"];
  product?: Maybe<Product>;
  productId: Scalars["ID"]["output"];
  rate: Scalars["Float"]["output"];
  reviewer?: Maybe<Account>;
  reviewerId: Scalars["ID"]["output"];
  updatedAt: Scalars["DateTime"]["output"];
};

export type ProductSearchPaginationResponse = {
  __typename?: "ProductSearchPaginationResponse";
  data: Array<Product>;
  hasMore: Scalars["Boolean"]["output"];
  total: Scalars["Int"]["output"];
};

export type ProductSelectAttribute = {
  __typename?: "ProductSelectAttribute";
  id: Scalars["ID"]["output"];
  values: Array<Scalars["ID"]["output"]>;
};

export enum ProductSize {
  L = "l",
  M = "m",
  S = "s",
  Xl = "xl",
  Xxl = "xxl",
  Xxxl = "xxxl",
  Xxxxl = "xxxxl",
}

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

export type ProductsCursorPaginationResponse = {
  __typename?: "ProductsCursorPaginationResponse";
  cursor?: Maybe<Scalars["String"]["output"]>;
  data: Array<Product>;
  hasMore: Scalars["Boolean"]["output"];
  nextCursor?: Maybe<Scalars["String"]["output"]>;
  total: Scalars["Int"]["output"];
};

export type Profession = {
  __typename?: "Profession";
  id: Scalars["ID"]["output"];
  sortOrder: Scalars["Int"]["output"];
  title: Scalars["String"]["output"];
  usage: Scalars["Int"]["output"];
};

export type Profile = {
  __typename?: "Profile";
  activeStatus: ActiveStatus;
  bio: Scalars["String"]["output"];
  coverPhoto: Scalars["String"]["output"];
  createdAt: Scalars["DateTime"]["output"];
  followers: Scalars["Int"]["output"];
  followersData?: Maybe<Array<Follow>>;
  following: Scalars["Int"]["output"];
  followingData?: Maybe<Array<Follow>>;
  id: Scalars["ID"]["output"];
  lastActive: Scalars["DateTime"]["output"];
  newStory: Scalars["Boolean"]["output"];
  ownerId: Scalars["ID"]["output"];
  photo: Scalars["String"]["output"];
  profession: Scalars["String"]["output"];
  publications: Scalars["Int"]["output"];
  updatedAt: Scalars["DateTime"]["output"];
  user?: Maybe<Account>;
  username: Scalars["String"]["output"];
  verified: Scalars["Boolean"]["output"];
  visibility: ProfileVisibility;
  visits: Scalars["Int"]["output"];
};

export type ProfileFollow = {
  __typename?: "ProfileFollow";
  activeStatus: ActiveStatus;
  bio: Scalars["String"]["output"];
  coverPhoto: Scalars["String"]["output"];
  createdAt: Scalars["DateTime"]["output"];
  followers: Scalars["Int"]["output"];
  followersData?: Maybe<Array<Follow>>;
  following: Scalars["Int"]["output"];
  followingData?: Maybe<Array<Follow>>;
  id: Scalars["ID"]["output"];
  isFollowed: Scalars["Boolean"]["output"];
  lastActive: Scalars["DateTime"]["output"];
  newStory: Scalars["Boolean"]["output"];
  ownerId: Scalars["ID"]["output"];
  photo: Scalars["String"]["output"];
  profession: Scalars["String"]["output"];
  publications: Scalars["Int"]["output"];
  updatedAt: Scalars["DateTime"]["output"];
  user?: Maybe<Account>;
  username: Scalars["String"]["output"];
  verified: Scalars["Boolean"]["output"];
  visibility: ProfileVisibility;
  visits: Scalars["Int"]["output"];
};

export type ProfileMeta = {
  __typename?: "ProfileMeta";
  id: Scalars["ID"]["output"];
  photo: Scalars["String"]["output"];
  username: Scalars["String"]["output"];
};

export type ProfileMetaCursorPaginatedResponse = {
  __typename?: "ProfileMetaCursorPaginatedResponse";
  cursor?: Maybe<Scalars["String"]["output"]>;
  data: Array<Profile>;
  hasMore: Scalars["Boolean"]["output"];
  nextCursor?: Maybe<Scalars["String"]["output"]>;
  total: Scalars["Int"]["output"];
};

export type ProfileMetaPaginatedResponse = {
  __typename?: "ProfileMetaPaginatedResponse";
  data: Array<Profile>;
  hasMore: Scalars["Boolean"]["output"];
  total: Scalars["Int"]["output"];
};

export type ProfileOverviewStatistics = {
  __typename?: "ProfileOverviewStatistics";
  activity: Scalars["Int"]["output"];
  engaged: Scalars["Int"]["output"];
  reached: Scalars["Int"]["output"];
};

export type ProfilePaginatedResponse = {
  __typename?: "ProfilePaginatedResponse";
  data: Array<Profile>;
  hasMore: Scalars["Boolean"]["output"];
  total: Scalars["Int"]["output"];
};

export type ProfileReachedAudience = {
  __typename?: "ProfileReachedAudience";
  age: Scalars["Int"]["output"];
  createdAt: Scalars["String"]["output"];
  gender: ProfileReachedGender;
  id: Scalars["ID"]["output"];
  profileId: Scalars["ID"]["output"];
  reachedByProfileId: Scalars["ID"]["output"];
};

export enum ProfileReachedGender {
  Female = "female",
  Male = "male",
}

export type ProfileStatistics = {
  __typename?: "ProfileStatistics";
  prev_total_comments: Scalars["Int"]["output"];
  prev_total_followers: Scalars["Int"]["output"];
  prev_total_likes: Scalars["Int"]["output"];
  prev_total_saves: Scalars["Int"]["output"];
  prev_total_visits: Scalars["Int"]["output"];
  total_comments: Scalars["Int"]["output"];
  total_followers: Scalars["Int"]["output"];
  total_likes: Scalars["Int"]["output"];
  total_saves: Scalars["Int"]["output"];
  total_visits: Scalars["Int"]["output"];
};

export enum ProfileVisibility {
  Private = "private",
  Public = "public",
}

export type ProfileVisitDetails = {
  __typename?: "ProfileVisitDetails";
  country: Scalars["String"]["output"];
  visitPercent: Scalars["Float"]["output"];
  visits: Scalars["Int"]["output"];
};

export type ProfileVisitsDetails = {
  __typename?: "ProfileVisitsDetails";
  countries: Array<ProfileVisitDetails>;
};

export enum ProfitStatsType {
  Product = "product",
  Service = "service",
}

export type Query = {
  __typename?: "Query";
  MyShoppingCart: ShoppingCart;
  acceptAccountVerification: Scalars["Boolean"]["output"];
  adminGetAccount: Account;
  adminGetAccountBookingHistory: Array<BookedService>;
  adminGetAccountIdentityVerificationRequests: Array<IdentityVerification>;
  adminGetAccountOrderById: Order;
  adminGetAccountPrivacySettings: PrivacySettings;
  adminGetAccountProducts: Array<Product>;
  adminGetAccountSavedPosts: UserSavedPostsGroup;
  adminGetAccountService: Service;
  adminGetAccountVerification: IdentityVerification;
  adminGetAccountWorkingSchedule: ShopWorkingSchedule;
  adminGetAttributes: ProductAttributesPaginationResponse;
  adminGetBannedCountry: BannedCountry;
  adminGetBookings: Array<BookedService>;
  adminGetContentComments: Array<Comment>;
  adminGetCurrencies: Array<Currency>;
  adminGetDesigns: Array<Design>;
  adminGetDishs: Array<Dish>;
  adminGetFilteredProductReviews: Array<ProductReview>;
  adminGetHashtag: Array<Hashtag>;
  adminGetLanguages: Array<Language>;
  adminGetMembershipSubscriptions: Array<MembershipSubscription>;
  adminGetMemberships: Array<Membership>;
  adminGetNewsfeedPost: AdminNewsfeedPost;
  adminGetProduct?: Maybe<Product>;
  adminGetProductReviewById: ProductReview;
  adminGetProfessions: Array<Profession>;
  adminGetProfileVerificationRequest: AccountVerification;
  adminGetRawService?: Maybe<ServiceShopRaw>;
  adminGetRefundRequest: Refund;
  adminGetReturnedOrders: Array<ReturnedOrder>;
  adminGetSellerSales: Array<OrderItem>;
  adminGetSiteInformations: Array<SiteInformation>;
  adminGetStaffAccounts: Array<Account>;
  adminGetTaxRate: TaxRate;
  adminGetTaxRates: Array<TaxRate>;
  adminGetTransations: Array<Transaction>;
  adminGetUserBlockList: Array<Block>;
  adminGetUserBookings: Array<BookedService>;
  adminGetUserFinancialAccounts: Array<FinancialAccount>;
  adminGetUserNewsletterSettings: NewsletterSettings;
  adminGetUserReturnedOrders: Array<ReturnedOrder>;
  canAccessRoom: Scalars["Boolean"]["output"];
  findAll: ProfilePaginatedResponse;
  generalSearch: Array<Search>;
  getAccountDeletionRequests: Array<AccountDeletionRequest>;
  getAccountVerificationRequests: Array<AccountVerification>;
  getAction: Array<Action>;
  getActionByAudioId: GetActionsCursorResponse;
  getActionByEffectId: GetActionsCursorResponse;
  getAddableHashtags: Array<Hashtag>;
  getAdminFilteredProducts: Array<Product>;
  getAdminFilteredStories: Array<Story>;
  getAdminProductsFilter: Filter;
  getAdminProductsFilters: Array<Filter>;
  getAdminProfile: Profile;
  getAffiliationPost: AffiliationPost;
  getAllShares: ContentSharePaginationResponse;
  getAudienceTrendingHour: Array<ContentView>;
  getAudioById: AudioCursorPaginationResponse;
  getAuthorAffiliationPosts: Array<AffiliationPost>;
  getBannedCountries: Array<BannedCountry>;
  getBookedServiceDetails: BookedService;
  getBookingCost?: Maybe<BookingCost>;
  getBookingHistory: Array<BookedService>;
  getCameraFilterById: CameraFilter;
  getCameraFilters: CameraFiltersCursorResponse;
  getChatRoom: ChatRoom;
  getCitites: Array<City>;
  getCommunityPosts: Array<Community>;
  getConnectedAccounts: Scalars["Boolean"]["output"];
  getContentComments: CommentsCursorPaginationResponse;
  getContentCommentsCount: Scalars["Int"]["output"];
  getContentTaggedProfile?: Maybe<SocialTag>;
  getCookiesSettings: Array<CookiesSetting>;
  getCountries: Array<Country>;
  getCurrencies: Array<Currency>;
  getCurrencyData: Currency;
  getCursorFilteredShops: ShopCursorPaginationResponse;
  getCursorPaginationFollowersByProfileId: ProfileMetaCursorPaginatedResponse;
  getCursorPaginationFollowingsByProfileId: ProfileMetaCursorPaginatedResponse;
  getDesignByPlacement: Array<Design>;
  getEffect?: Maybe<Effect>;
  getFilteredAffiliations: Array<Affiliation>;
  getFilteredAffiliationsHistory: Array<AffiliationPurchase>;
  getFilteredBuyers: Array<Account>;
  getFilteredNewsfeedPosts: Array<NewsfeedPost>;
  getFilteredOrders: Array<Order>;
  getFilteredProductCategories: Array<Category>;
  getFilteredSellers: Array<Account>;
  getFilteredServiceCategories: Array<ServiceCategory>;
  getFilteredServices: Array<ServiceDiscovery>;
  getFilteredShops: Array<Shop>;
  getFollowersByProfileId: ProfileMetaPaginatedResponse;
  getFollowingByProfileId: ProfileMetaPaginatedResponse;
  getHashtagTopAffiliationPost?: Maybe<HashtagTopAffiliationPost>;
  getHashtagTopServicePosts: ServicePostHashtagSearch;
  getHotelAvailablity: HotelAvailablity;
  getInsurances: Array<Insurance>;
  getInvoiceRecord: InvoiceRecord;
  getLanguages: Array<Language>;
  getLatestOrders: Array<Order>;
  getLocalisation: Localization;
  getMaintenancePages: Array<Maintenance>;
  getMyAccount: Account;
  getMyBalance: Balance;
  getMyBillingAddresses: Array<BillingAddress>;
  getMyBlockList: Array<Block>;
  getMyBookings: MyBookings;
  getMyChatRooms: Array<ChatRoom>;
  getMyContacts: UserContact;
  getMyCookiesSettings: UserCookiesSettings;
  getMyFinancialAccounts: Array<FinancialAccount>;
  getMyFollowers: ProfileMetaPaginatedResponse;
  getMyFollowing: ProfileMetaPaginatedResponse;
  getMyFriendSuggestions: FriendSuggestion;
  getMyMembership?: Maybe<MembershipSubscription>;
  getMyNewsfeedPosts: Array<NewsfeedPost>;
  getMyOrders: Array<Order>;
  getMyPrivacySettings: PrivacySettings;
  getMyProductReviews: Array<ProductReview>;
  getMyProducts: Array<Product>;
  getMyProductsAffiliationHistory: Array<AffiliationPurchase>;
  getMyRecommendedAction: Action;
  getMyReturnedOrders: Array<Refund>;
  getMySavedPosts: UserSavedPostsGroup;
  getMySellerProductsRating: SellerProductsRating;
  getMyShippingAddress: Array<ShippingAddress>;
  getMyShippingRules: Array<ShippingRule>;
  getMyStories: Array<Story>;
  getMyTransactions: Array<Transaction>;
  getMyVerificationRequest: IdentityVerification;
  getMyWithdrawalRequests: Array<WithdrawalRequest>;
  getMyWorkingSchedule: ShopWorkingSchedule;
  getNearShops: Array<Shop>;
  getNewletterSubscribers: Array<NewsletterSubscriber>;
  getNewsfeedHashtagPosts: NewsfeedHashtagSearch;
  getNewsfeedPostById: NewsfeedPost;
  getOrder: Order;
  getPendingSellers: Array<Account>;
  getPlaceSuggestions: PlaceSuggestions;
  getPlaces: Localization;
  getPostsByUserId: Array<NewsfeedPost>;
  getProduct: Product;
  getProductAttributesByProductCategory: ProductAttribute;
  getProductById: Product;
  getProductCategories: Array<Category>;
  getProductCategoryById?: Maybe<Category>;
  getProductRecommendation: ProductPaginationResponse;
  getProductsByIds: Array<Product>;
  getProductsFilters: Array<Filter>;
  getProfessions: Array<Profession>;
  getProfile: Profile;
  getProfileDetails: Profile;
  getProfileNewsfeedPosts: Array<NewsfeedPost>;
  getProfileOverviewStatistics: ProfileOverviewStatistics;
  getProfilePopularStoriesViews: StoryView;
  getProfileReachedAudinece: Array<ProfileReachedAudience>;
  getProfileStatistics: ProfileStatistics;
  getProfileVisitsDetails: ProfileVisitsDetails;
  getRawAttribute: ProductRawAttribute;
  getRecentSales: Array<OrderItem>;
  getRecentStories: Array<RecentStory>;
  getRecommendedAffiliationPosts: Array<AffiliationPost>;
  getRecommendedProductPosts: Array<ProductPost>;
  getRecommendedServicePosts: Array<ServicePost>;
  getRecommendedServices: ServicesCursorPaginationResponse;
  getRefundRequests: Array<Refund>;
  getRefundableOrders: Array<Order>;
  getRegistrations: Array<Registeration>;
  getReports: Array<Report>;
  getRoomMessages: Array<ChatMessage>;
  getRoomWithUser: ChatRoom;
  getSalesDurningPeriod: Array<OrderItem>;
  getSellerDailySalesStats: Array<SellerSalesStat>;
  getSellerProducts: ProductsCursorPaginationResponse;
  getSellerRecentOrders: GetSellerRecentOrdersResponse;
  getSellerStats: Array<SellerSalesStat>;
  getSellerTopSellingProducts: ProductsCursorPaginationResponse;
  getServiceCategories: Array<ServiceCategory>;
  getServiceCategoryById: ServiceCategory;
  getServiceCategoryByType: ServiceCategory;
  getServiceCategoryFilters: Array<ServiceFilter>;
  getServiceDetails?: Maybe<Service>;
  getServiceInsuranceHistory: Array<Insurance>;
  getServicePost: ServicePost;
  getServiceRawData: RawService;
  getShippingGeoZoneRules: Array<ShippingTypeRule>;
  getShippingRuleById: ShippingRule;
  getShippingRuleGeoZones: Array<ShippingRuleGeoZone>;
  getShippingTypeRule: ShippingTypeRule;
  getSiteInfomrationsOfPlacement: Array<SiteInformation>;
  getSiteProfit: SiteProfit;
  getSiteSales: Array<SiteSale>;
  getSocialPostById: NewsfeedPost;
  getStory: Story;
  getStoryViews: Array<StoryView>;
  getSubscriableMemberships: Array<Membership>;
  getTopEffects: EffectCursorPaginationResponse;
  getTopHashtagActions: ActionTopHashtagResponse;
  getTopHashtagNewsfeed: TopHashtagNewsfeedPosts;
  getTopHashtagProductPosts: HashtagProductPost;
  getTopHashtags: Array<Hashtag>;
  getTopProductCategories: CategoryCursorResponse;
  getTopProfilePosts: Array<NewsfeedPost>;
  getTopProfileStories: Array<Story>;
  getTopSalesProducts: ProductSearchPaginationResponse;
  getTopShops: Array<Shop>;
  getTrendingHashtagPosts: NewsfeedPostsPaginationResponse;
  getUserAccount: Account;
  getUserActions: GetActionsCursorResponse;
  getUserAffiliationHistory: Array<AffiliationPurchase>;
  getUserAffiliations: Array<Affiliation>;
  getUserAffiliationsPurchases: Array<AffiliationPurchase>;
  getUserBookingHistory: Array<BookedService>;
  getUserMembership?: Maybe<MembershipSubscription>;
  getUserNewsletterSettings: NewsletterSettings;
  getUserOrders: Array<Order>;
  getUserPayoutAccount: BillingAccount;
  getUserPrevStory: Story;
  getUserProductPosts: Array<ProductPost>;
  getUserRawShop: RawShop;
  getUserSaveCollections: Array<SavesCollection>;
  getUserServicePosts: Array<ServicePost>;
  getUserServices: ServicesCursorPaginationResponse;
  getUserServicesByIds: Array<Service>;
  getUserShop: Shop;
  getUserShoppingCartItems: Array<CartItem>;
  getUserStory: StoryCursorPaginationResponse;
  getWithdrawCurrencies: Array<WithdrawCurrency>;
  getWithdrawalRequests: Array<WithdrawalRequest>;
  isFollowed: Scalars["Boolean"]["output"];
  isMaintenance: Scalars["Boolean"]["output"];
  myProfile: Profile;
  requiredAction: RequiredAction;
  requiredActions: Array<RequiredAction>;
  searchHashtags: SearchHashtag;
  searchPopularUsers: ProfilePaginatedResponse;
  searchServices: ServiceSearchResponse;
  searchUsers: SearchUsers;
  sendContactUsMessage: Scalars["Boolean"]["output"];
  updateComment: PaginationCommentsResponse;
};

export type QueryAcceptAccountVerificationArgs = {
  id: Scalars["String"]["input"];
};

export type QueryAdminGetAccountArgs = {
  id: Scalars["String"]["input"];
};

export type QueryAdminGetAccountBookingHistoryArgs = {
  accountId: Scalars["String"]["input"];
  accountType: Scalars["String"]["input"];
  args: GetBookingsHistoryInput;
};

export type QueryAdminGetAccountIdentityVerificationRequestsArgs = {
  args: AdminGetIdentitiyVerificationRequestsInput;
};

export type QueryAdminGetAccountOrderByIdArgs = {
  id: Scalars["String"]["input"];
};

export type QueryAdminGetAccountPrivacySettingsArgs = {
  id: Scalars["String"]["input"];
};

export type QueryAdminGetAccountProductsArgs = {
  args: AdminGetAccountProductsInput;
};

export type QueryAdminGetAccountSavedPostsArgs = {
  accountId: Scalars["String"]["input"];
  args: GetMySavedPostsInput;
};

export type QueryAdminGetAccountServiceArgs = {
  accountId: Scalars["String"]["input"];
};

export type QueryAdminGetAccountVerificationArgs = {
  accountId: Scalars["String"]["input"];
};

export type QueryAdminGetAccountWorkingScheduleArgs = {
  accountId: Scalars["String"]["input"];
};

export type QueryAdminGetAttributesArgs = {
  args: GetAdminProductAttributesPaginationInput;
};

export type QueryAdminGetBannedCountryArgs = {
  id: Scalars["String"]["input"];
};

export type QueryAdminGetBookingsArgs = {
  args: AdminGetBookingsInput;
};

export type QueryAdminGetContentCommentsArgs = {
  args: AdminGetContentCommentsInput;
};

export type QueryAdminGetCurrenciesArgs = {
  args: AdminGetCurrenciesInput;
};

export type QueryAdminGetDesignsArgs = {
  args: AdminGetDesignsInput;
};

export type QueryAdminGetDishsArgs = {
  args: AdminGetDishsInput;
};

export type QueryAdminGetFilteredProductReviewsArgs = {
  args: GetAdminFitleredProductReviewsInput;
};

export type QueryAdminGetHashtagArgs = {
  args: GetFilteredHashtagsInput;
};

export type QueryAdminGetLanguagesArgs = {
  args: AdminGetLanguagesInput;
};

export type QueryAdminGetMembershipSubscriptionsArgs = {
  args: AdminGetMembersipSubscriptionInput;
};

export type QueryAdminGetMembershipsArgs = {
  args: AdminGetMembershipsInput;
};

export type QueryAdminGetNewsfeedPostArgs = {
  id: Scalars["String"]["input"];
};

export type QueryAdminGetProductArgs = {
  id: Scalars["String"]["input"];
};

export type QueryAdminGetProductReviewByIdArgs = {
  id: Scalars["String"]["input"];
};

export type QueryAdminGetProfessionsArgs = {
  args: AdminGetProfessionInput;
};

export type QueryAdminGetProfileVerificationRequestArgs = {
  id: Scalars["String"]["input"];
};

export type QueryAdminGetRawServiceArgs = {
  id: Scalars["String"]["input"];
};

export type QueryAdminGetRefundRequestArgs = {
  id: Scalars["String"]["input"];
};

export type QueryAdminGetReturnedOrdersArgs = {
  args: AdminGetReturnedOrdersInput;
};

export type QueryAdminGetSellerSalesArgs = {
  args: AdminGetSellerSalesInput;
};

export type QueryAdminGetSiteInformationsArgs = {
  args: AdminGetSiteInformationsInput;
};

export type QueryAdminGetStaffAccountsArgs = {
  args: AdminGetStaffAccountsInput;
};

export type QueryAdminGetTaxRateArgs = {
  id: Scalars["String"]["input"];
};

export type QueryAdminGetTaxRatesArgs = {
  args: AdminGetTaxRatesInput;
};

export type QueryAdminGetTransationsArgs = {
  args: GetTransactionsAdminInput;
};

export type QueryAdminGetUserBlockListArgs = {
  accountId: Scalars["String"]["input"];
  args: GetMyBlocklistInput;
};

export type QueryAdminGetUserBookingsArgs = {
  accountId: Scalars["String"]["input"];
  args: GetMyBookingsInput;
};

export type QueryAdminGetUserFinancialAccountsArgs = {
  args: AdminGetUserFinancialAccounts;
};

export type QueryAdminGetUserNewsletterSettingsArgs = {
  accountId: Scalars["String"]["input"];
};

export type QueryAdminGetUserReturnedOrdersArgs = {
  args: AdminGetUserReturnedOrdersInput;
};

export type QueryCanAccessRoomArgs = {
  roomId: Scalars["ID"]["input"];
};

export type QueryGeneralSearchArgs = {
  args: SearchInput;
};

export type QueryGetAccountDeletionRequestsArgs = {
  args: GetAccountDeletionRequestsInput;
};

export type QueryGetAccountVerificationRequestsArgs = {
  args: GetAccountVerificationRequestsInput;
};

export type QueryGetActionArgs = {
  id: Scalars["String"]["input"];
};

export type QueryGetActionByAudioIdArgs = {
  args: GetActionByAudioIdInput;
};

export type QueryGetActionByEffectIdArgs = {
  args: GetActionsByEffectIdInput;
};

export type QueryGetAddableHashtagsArgs = {
  args: GetAddableHashtagsInput;
};

export type QueryGetAdminFilteredProductsArgs = {
  args: GetFilteredProductsAdminInput;
};

export type QueryGetAdminFilteredStoriesArgs = {
  args: GetAdminFilteredStoriesInput;
};

export type QueryGetAdminProductsFilterArgs = {
  id: Scalars["String"]["input"];
};

export type QueryGetAdminProductsFiltersArgs = {
  getFiltersArgs: GetFiltersInput;
};

export type QueryGetAdminProfileArgs = {
  id: Scalars["String"]["input"];
};

export type QueryGetAffiliationPostArgs = {
  args: GetAffiliationPostInput;
};

export type QueryGetAudioByIdArgs = {
  id: Scalars["String"]["input"];
};

export type QueryGetAuthorAffiliationPostsArgs = {
  args: GetUserAffiliationPostsInput;
};

export type QueryGetBannedCountriesArgs = {
  args: GetBannedCountriesAdminInput;
};

export type QueryGetBookedServiceDetailsArgs = {
  id: Scalars["String"]["input"];
};

export type QueryGetBookingCostArgs = {
  args: GetBookingCostInput;
};

export type QueryGetBookingHistoryArgs = {
  args: GetBookingsHistoryInput;
};

export type QueryGetCameraFilterByIdArgs = {
  id: Scalars["String"]["input"];
};

export type QueryGetCameraFiltersArgs = {
  args: GetCameraFiltersInput;
};

export type QueryGetChatRoomArgs = {
  roomId: Scalars["String"]["input"];
};

export type QueryGetCititesArgs = {
  args: GetCititesInput;
};

export type QueryGetCommunityPostsArgs = {
  args: GetCommunityPostsInput;
};

export type QueryGetContentCommentsArgs = {
  getContentCommentsArgs: GetContentCommentsInput;
};

export type QueryGetContentCommentsCountArgs = {
  id: Scalars["String"]["input"];
  type: ContentHostType;
};

export type QueryGetContentTaggedProfileArgs = {
  args: GetContentTaggedProfilesInput;
};

export type QueryGetCountriesArgs = {
  name: Scalars["String"]["input"];
};

export type QueryGetCurrencyDataArgs = {
  currencyCode: Scalars["String"]["input"];
};

export type QueryGetCursorFilteredShopsArgs = {
  args: FilteredShopsCursorInput;
};

export type QueryGetCursorPaginationFollowersByProfileIdArgs = {
  getFollowersMetaInput: GetProfileFollowersMetaCursorInput;
};

export type QueryGetCursorPaginationFollowingsByProfileIdArgs = {
  getFollowersMetaInput: GetProfileFollowersMetaCursorInput;
};

export type QueryGetDesignByPlacementArgs = {
  args: GetDesignByPlacementInput;
};

export type QueryGetEffectArgs = {
  id: Scalars["String"]["input"];
};

export type QueryGetFilteredAffiliationsArgs = {
  filters: GetFilteredAffiliationsInput;
};

export type QueryGetFilteredAffiliationsHistoryArgs = {
  filters: GetFilteredAffiliationHistoryInput;
};

export type QueryGetFilteredBuyersArgs = {
  getBuyersInput: GetBuyersAccountsInput;
};

export type QueryGetFilteredNewsfeedPostsArgs = {
  args: GetAdminFilteredNewsfeedPostsInput;
};

export type QueryGetFilteredOrdersArgs = {
  args: GetFilteredOrdersInput;
};

export type QueryGetFilteredProductCategoriesArgs = {
  args?: InputMaybe<GetFilteredCategory>;
};

export type QueryGetFilteredSellersArgs = {
  getSellersInput: GetFilteredSellersAccountsInput;
};

export type QueryGetFilteredServiceCategoriesArgs = {
  args?: InputMaybe<GetFilteredCategoriesInput>;
};

export type QueryGetFilteredServicesArgs = {
  args: GetFilteredServicesAdminInput;
};

export type QueryGetFilteredShopsArgs = {
  filteredShopsArgs: FilteredShopsInput;
};

export type QueryGetFollowersByProfileIdArgs = {
  getFollowersMetaInput: GetProfileFollowersMetaInput;
};

export type QueryGetFollowingByProfileIdArgs = {
  getFollowingMetaInput: GetProfileFollowersMetaInput;
};

export type QueryGetHashtagTopAffiliationPostArgs = {
  tag: Scalars["String"]["input"];
};

export type QueryGetHashtagTopServicePostsArgs = {
  args: GetHashtagTopServicePostsInput;
};

export type QueryGetHotelAvailablityArgs = {
  id: Scalars["String"]["input"];
  monthDate: Scalars["String"]["input"];
};

export type QueryGetInsurancesArgs = {
  args: GetInsurancesInput;
};

export type QueryGetInvoiceRecordArgs = {
  period: Scalars["String"]["input"];
};

export type QueryGetLatestOrdersArgs = {
  take?: InputMaybe<Scalars["Int"]["input"]>;
};

export type QueryGetLocalisationArgs = {
  getLocalisationInput: GetLocalizationInput;
};

export type QueryGetMyBlockListArgs = {
  args: GetMyBlocklistInput;
};

export type QueryGetMyBookingsArgs = {
  args: GetMyBookingsInput;
};

export type QueryGetMyFollowersArgs = {
  getMyFollowersInput: GetMyProfileFollowersMetaInput;
};

export type QueryGetMyFollowingArgs = {
  getMyFollowersInput: GetMyProfileFollowersMetaInput;
};

export type QueryGetMyFriendSuggestionsArgs = {
  args: GetMyFriendSuggestionsInput;
};

export type QueryGetMyNewsfeedPostsArgs = {
  args: GetMyNewsfeedPostsInput;
};

export type QueryGetMyOrdersArgs = {
  getMyOrdersArgs: GetMyOrdersInput;
};

export type QueryGetMyProductReviewsArgs = {
  args: GetMyReviewsInput;
};

export type QueryGetMyProductsArgs = {
  filterInput: GetFilteredProductsInput;
};

export type QueryGetMyProductsAffiliationHistoryArgs = {
  args: GetAffiliationHistoryInput;
};

export type QueryGetMyReturnedOrdersArgs = {
  args: GetMyReturnedOrdersInput;
};

export type QueryGetMySavedPostsArgs = {
  args: GetMySavedPostsInput;
};

export type QueryGetMyShippingRulesArgs = {
  args: GetShippingRulesInput;
};

export type QueryGetMyTransactionsArgs = {
  myTransactionsArgs: GetTransactionsInput;
};

export type QueryGetMyWithdrawalRequestsArgs = {
  args: GetMyWithdrawalRequestsInput;
};

export type QueryGetNearShopsArgs = {
  GetNearShopsInput: GetNearShopsInput;
};

export type QueryGetNewletterSubscribersArgs = {
  args: GetFilteredNewsletterInput;
};

export type QueryGetNewsfeedHashtagPostsArgs = {
  hashtagSearchInput: GetHashtagNewsfeedPostsInput;
};

export type QueryGetNewsfeedPostByIdArgs = {
  id: Scalars["String"]["input"];
};

export type QueryGetOrderArgs = {
  id: Scalars["String"]["input"];
};

export type QueryGetPendingSellersArgs = {
  args: GetAdminPendingSellersInput;
};

export type QueryGetPlaceSuggestionsArgs = {
  args: GetPlaceSuggestionInput;
};

export type QueryGetPlacesArgs = {
  placeQuery: Scalars["String"]["input"];
};

export type QueryGetPostsByUserIdArgs = {
  args: GetNewsfeedPostsByUserIdInput;
};

export type QueryGetProductArgs = {
  id: Scalars["ID"]["input"];
};

export type QueryGetProductAttributesByProductCategoryArgs = {
  categoryId: Scalars["String"]["input"];
};

export type QueryGetProductByIdArgs = {
  id: Scalars["String"]["input"];
  isClick: Scalars["Boolean"]["input"];
};

export type QueryGetProductCategoryByIdArgs = {
  id: Scalars["String"]["input"];
};

export type QueryGetProductRecommendationArgs = {
  pagination: GqlPaginationInput;
};

export type QueryGetProductsByIdsArgs = {
  ids: Array<Scalars["String"]["input"]>;
};

export type QueryGetProfileArgs = {
  id: Scalars["String"]["input"];
};

export type QueryGetProfileDetailsArgs = {
  userId: Scalars["String"]["input"];
};

export type QueryGetProfileNewsfeedPostsArgs = {
  getUserNewsfeedPosts: GetNewsfeedPostsByUserIdInput;
};

export type QueryGetProfileOverviewStatisticsArgs = {
  args: GetProfileStatisticsInput;
};

export type QueryGetProfilePopularStoriesViewsArgs = {
  args: GetProfilePopularStoriesViewsInput;
};

export type QueryGetProfileReachedAudineceArgs = {
  args: GetProfileStatisticsInput;
};

export type QueryGetProfileStatisticsArgs = {
  args: GetProfileStatisticsInput;
};

export type QueryGetProfileVisitsDetailsArgs = {
  args: GetProfileVisitsDetailsInput;
};

export type QueryGetRawAttributeArgs = {
  id: Scalars["String"]["input"];
};

export type QueryGetRecentSalesArgs = {
  count?: InputMaybe<Scalars["Int"]["input"]>;
};

export type QueryGetRecentStoriesArgs = {
  getRecentStoryInput?: InputMaybe<GetRecentStoriesInput>;
};

export type QueryGetRecommendedAffiliationPostsArgs = {
  args: GetRecommendedAffiliationPostsInput;
};

export type QueryGetRecommendedProductPostsArgs = {
  args: GetShopRecommendedPostsInput;
};

export type QueryGetRecommendedServicePostsArgs = {
  args: GetRecommendedServicePostsInput;
};

export type QueryGetRecommendedServicesArgs = {
  args: GetRecommendedServicesInput;
};

export type QueryGetRefundRequestsArgs = {
  args: GetFilteredRefundsInput;
};

export type QueryGetRefundableOrdersArgs = {
  args: GetRefundableOrdersInput;
};

export type QueryGetReportsArgs = {
  getReportsArgs: GetReportsInput;
};

export type QueryGetRoomMessagesArgs = {
  args: GetMessagesByRoomIdInput;
};

export type QueryGetRoomWithUserArgs = {
  userId: Scalars["String"]["input"];
};

export type QueryGetSalesDurningPeriodArgs = {
  args: GetSalesDurningPeriodInput;
};

export type QueryGetSellerDailySalesStatsArgs = {
  period: Scalars["String"]["input"];
  sellerId: Scalars["String"]["input"];
};

export type QueryGetSellerProductsArgs = {
  args: GetSellerProductsInput;
};

export type QueryGetSellerRecentOrdersArgs = {
  args: GetSellerRecentOrdersInput;
};

export type QueryGetSellerStatsArgs = {
  period: StatsRetrivePeriod;
  sellerId: Scalars["String"]["input"];
  type: SellerSalesType;
};

export type QueryGetSellerTopSellingProductsArgs = {
  args: GetSellerTopSellingProductsInput;
};

export type QueryGetServiceCategoryByIdArgs = {
  categoryId: Scalars["String"]["input"];
};

export type QueryGetServiceCategoryByTypeArgs = {
  type: ServiceType;
};

export type QueryGetServiceCategoryFiltersArgs = {
  category: ServiceType;
};

export type QueryGetServiceDetailsArgs = {
  id: Scalars["String"]["input"];
  isClick: Scalars["Boolean"]["input"];
};

export type QueryGetServiceInsuranceHistoryArgs = {
  args: GetInsurancesHistoryInput;
};

export type QueryGetServicePostArgs = {
  id: Scalars["String"]["input"];
};

export type QueryGetServiceRawDataArgs = {
  id: Scalars["String"]["input"];
};

export type QueryGetShippingGeoZoneRulesArgs = {
  args: AdminGetShippingGeoZoneRulesInput;
};

export type QueryGetShippingRuleByIdArgs = {
  id: Scalars["String"]["input"];
};

export type QueryGetShippingRuleGeoZonesArgs = {
  id: Scalars["String"]["input"];
};

export type QueryGetShippingTypeRuleArgs = {
  id: Scalars["String"]["input"];
};

export type QueryGetSiteInfomrationsOfPlacementArgs = {
  placement: Scalars["String"]["input"];
};

export type QueryGetSiteProfitArgs = {
  args: GetSiteProfitInput;
};

export type QueryGetSiteSalesArgs = {
  args: GetSiteProfitInput;
};

export type QueryGetSocialPostByIdArgs = {
  id: Scalars["String"]["input"];
};

export type QueryGetStoryArgs = {
  storyId: Scalars["String"]["input"];
};

export type QueryGetStoryViewsArgs = {
  getStoryViewsInput: GetStorySeenByInput;
};

export type QueryGetTopEffectsArgs = {
  args: GetTopEffectsInput;
};

export type QueryGetTopHashtagActionsArgs = {
  tag: Scalars["String"]["input"];
};

export type QueryGetTopHashtagNewsfeedArgs = {
  tag: Scalars["String"]["input"];
};

export type QueryGetTopHashtagProductPostsArgs = {
  tag: Scalars["String"]["input"];
};

export type QueryGetTopHashtagsArgs = {
  args: GetTopHashtagsInput;
};

export type QueryGetTopProductCategoriesArgs = {
  args: GetProductCategoriesCursorPaginationInput;
};

export type QueryGetTopProfilePostsArgs = {
  args: GetTopProfilePostsInput;
};

export type QueryGetTopProfileStoriesArgs = {
  args: GetTopProfilePostsInput;
};

export type QueryGetTopSalesProductsArgs = {
  args: GetTopSalesProductsByCategoryPaginationInput;
};

export type QueryGetTopShopsArgs = {
  take: Scalars["Int"]["input"];
};

export type QueryGetTrendingHashtagPostsArgs = {
  args: GetPostsByHashtagInput;
};

export type QueryGetUserAccountArgs = {
  userId: Scalars["String"]["input"];
};

export type QueryGetUserActionsArgs = {
  args: GetUserActionsInput;
};

export type QueryGetUserAffiliationHistoryArgs = {
  id: Scalars["String"]["input"];
};

export type QueryGetUserAffiliationsArgs = {
  args: GetUserAffiliationsInput;
};

export type QueryGetUserAffiliationsPurchasesArgs = {
  args: GetUserAffiliationsPurchasesInput;
};

export type QueryGetUserBookingHistoryArgs = {
  args: GetBookingsHistoryAdminInput;
};

export type QueryGetUserMembershipArgs = {
  id: Scalars["String"]["input"];
};

export type QueryGetUserNewsletterSettingsArgs = {
  accountId: Scalars["String"]["input"];
};

export type QueryGetUserOrdersArgs = {
  args: GetUserOrders;
};

export type QueryGetUserPayoutAccountArgs = {
  stripeId?: InputMaybe<Scalars["String"]["input"]>;
};

export type QueryGetUserPrevStoryArgs = {
  storyId: Scalars["String"]["input"];
};

export type QueryGetUserProductPostsArgs = {
  args: GetUserProductPostsInput;
};

export type QueryGetUserRawShopArgs = {
  userId: Scalars["String"];
};

export type QueryGetUserServicePostsArgs = {
  args: GetUserServicesPostsInput;
};

export type QueryGetUserServicesArgs = {
  pagination: GqlCursorPaginationInput;
  userId: Scalars["String"]["input"];
};

export type QueryGetUserServicesByIdsArgs = {
  sellerId: Scalars["String"]["input"];
  servicesIds: Array<Scalars["String"]["input"]>;
};

export type QueryGetUserShopArgs = {
  userId: Scalars["String"]["input"];
};

export type QueryGetUserShoppingCartItemsArgs = {
  userId: Scalars["String"]["input"];
};

export type QueryGetUserStoryArgs = {
  args: GetUserStoryInput;
};

export type QueryGetWithdrawalRequestsArgs = {
  args: GetWithdrawalRequestsAdminInput;
};

export type QueryIsFollowedArgs = {
  profileId: Scalars["String"]["input"];
};

export type QueryIsMaintenanceArgs = {
  url: Scalars["String"]["input"];
};

export type QueryRequiredActionArgs = {
  id: Scalars["Int"]["input"];
};

export type QuerySearchHashtagsArgs = {
  query: Scalars["String"]["input"];
};

export type QuerySearchPopularUsersArgs = {
  args: SearchPopularProfilesInput;
};

export type QuerySearchServicesArgs = {
  args: SearchServicesInput;
};

export type QuerySearchUsersArgs = {
  searchUserInput: SearchUserInput;
};

export type QuerySendContactUsMessageArgs = {
  args: SendContactUsMessageInput;
};

export type QueryUpdateCommentArgs = {
  updateCommentInput: UpdateCommentInput;
};

export type RawService = {
  __typename?: "RawService";
  description: Array<TranslationText>;
  discount: ServiceDiscount;
  id: Scalars["String"]["output"];
  name: Array<TranslationText>;
  price: Scalars["Float"]["output"];
  rating: Scalars["Float"]["output"];
  reviews: Scalars["Int"]["output"];
  sellerId: Scalars["String"]["output"];
  thumbnail: Scalars["String"]["output"];
};

export type RawShop = {
  __typename?: "RawShop";
  banner: Scalars["String"]["output"];
  businessType: BusinessType;
  createdAt: Scalars["DateTime"]["output"];
  description: Array<TranslationText>;
  email: Scalars["String"]["output"];
  id: Scalars["ID"]["output"];
  images: Array<Scalars["String"]["output"]>;
  location: Location;
  name: Array<TranslationText>;
  ownerId: Scalars["String"]["output"];
  payment_methods: Array<ShopPaymentMethod>;
  phone: Scalars["String"]["output"];
  rating: Scalars["Float"]["output"];
  reviews: Scalars["Int"]["output"];
  status: ShopStatus;
  storeCategoryId: Scalars["String"]["output"];
  storeFor: Array<StoreFor>;
  storeType: StoreType;
  targetGenders: Array<TargetGenders>;
  thumbnail: Scalars["String"]["output"];
  type?: Maybe<ServiceType>;
  updatedAt: Scalars["DateTime"]["output"];
  verified: Scalars["Boolean"]["output"];
  videos: Array<Scalars["String"]["output"]>;
};

export type RecentStory = {
  __typename?: "RecentStory";
  newStory: Scalars["Boolean"]["output"];
  user?: Maybe<Account>;
  userId: Scalars["ID"]["output"];
};

export type Refund = {
  __typename?: "Refund";
  adminStatus: RefundStatusType;
  amount: Scalars["Float"]["output"];
  createdAt: Scalars["String"]["output"];
  fullAmount: Scalars["Boolean"]["output"];
  id: Scalars["ID"]["output"];
  opened: Scalars["Boolean"]["output"];
  orderItem?: Maybe<OrderItem>;
  orderItemId: Scalars["ID"]["output"];
  product: Product;
  qty: Scalars["Int"]["output"];
  reason: Scalars["String"]["output"];
  rejectReason?: Maybe<Scalars["String"]["output"]>;
  requestedById: Scalars["ID"]["output"];
  sellerId: Scalars["ID"]["output"];
  status: RefundStatusType;
  type: RefundType;
  updatedAt: Scalars["String"]["output"];
};

export enum RefundStatusType {
  Accepted = "accepted",
  Closed = "closed",
  Pending = "pending",
  Refunded = "refunded",
  Rejected = "rejected",
}

export enum RefundType {
  Credit = "credit",
  Money = "money",
}

export type RefuseAccountVerificationRequest = {
  id: Scalars["ID"]["input"];
  reason: Scalars["String"]["input"];
};

export enum RegisterAccountType {
  Buyer = "buyer",
  Seller = "seller",
}

export type Registeration = {
  __typename?: "Registeration";
  accountInputData: AccountInputData;
  email: Scalars["String"]["output"];
  id: Scalars["ID"]["output"];
  verificationToken: Scalars["String"]["output"];
};

export type RejectReceivedOrderInput = {
  id: Scalars["ID"]["input"];
  rejectReason: Scalars["String"]["input"];
};

export type RejectRefundRequestInput = {
  id: Scalars["ID"]["input"];
  reason?: InputMaybe<Scalars["String"]["input"]>;
};

export type RejectRequestedOrderInput = {
  id: Scalars["ID"]["input"];
  rejectReason: Scalars["String"]["input"];
};

export type RemoveReactionInput = {
  contentId: Scalars["ID"]["input"];
  contentType: ContentHostType;
};

export type RemoveShoppingCartItemInput = {
  itemId: Scalars["ID"]["input"];
};

export enum RentalPropertyType {
  Appertemant = "appertemant",
  Flat = "flat",
  House = "house",
  Studio = "studio",
  Villa = "villa",
}

export enum RentalTypeOfPlace {
  Entire = "entire",
  Shared = "shared",
}

export type Report = {
  __typename?: "Report";
  contentId: Scalars["String"]["output"];
  createdAt: Scalars["DateTime"]["output"];
  id: Scalars["ID"]["output"];
  message: Scalars["String"]["output"];
  post: NewsfeedPost;
  product: Product;
  profile: Profile;
  reportedBy: Profile;
  reportedById: Scalars["ID"]["output"];
  service: Service;
  status: ReportStatus;
  type: ReportType;
  updatedAt: Scalars["DateTime"]["output"];
};

export enum ReportStatus {
  Clean = "clean",
  Pending = "pending",
  Suspended = "suspended",
}

export enum ReportType {
  Bug = "bug",
  Post = "post",
  Product = "product",
  Profile = "profile",
  Service = "service",
}

export type RequiredAction = {
  __typename?: "RequiredAction";
  /** Example field (placeholder) */
  exampleField: Scalars["Int"]["output"];
};

export type Restaurant = {
  cuisinesTypeId: Scalars["ID"]["input"];
  establishmentTypeId: Scalars["ID"]["input"];
  highest_price: Scalars["Int"]["input"];
  id: Scalars["ID"]["output"];
  lowest_price: Scalars["Int"]["input"];
  michelin_guide_stars: Scalars["Int"]["input"];
  ownerId: Scalars["ID"]["input"];
  payment_methods: Array<ServicePaymentMethod>;
  setting_and_ambianceId: Scalars["ID"]["input"];
  status: ServiceStatus;
  vat: Scalars["Float"]["input"];
};

export enum RestaurantDishType {
  Dessert = "dessert",
  Drinks = "drinks",
  Main = "main",
  Starter = "starter",
}

export type RestaurantMenu = {
  __typename?: "RestaurantMenu";
  dishs: Array<Dish>;
  id: Scalars["ID"]["output"];
  name: Scalars["String"]["output"];
  restaurant: Service;
  restaurantId: Scalars["ID"]["output"];
};

export type ReturnedOrder = {
  __typename?: "ReturnedOrder";
  amount: Scalars["Float"]["output"];
  createdAt: Scalars["String"]["output"];
  fullAmount: Scalars["Float"]["output"];
  id: Scalars["ID"]["output"];
  orderItem: OrderItem;
  orderItemId: Scalars["ID"]["output"];
  reason: Scalars["String"]["output"];
  rejectReason?: Maybe<Scalars["String"]["output"]>;
  status: RefundStatusType;
  type: RefundType;
};

export enum RoomTypes {
  Group = "group",
  Private = "private",
}

export type SalesCategory = {
  __typename?: "SalesCategory";
  categoryId: Scalars["ID"]["output"];
  sales: Scalars["Int"]["output"];
};

export type SavesCollection = {
  __typename?: "SavesCollection";
  createdAt: Scalars["String"]["output"];
  id: Scalars["ID"]["output"];
  name: Scalars["String"]["output"];
  recentSaves: Array<UserSavedPost>;
  updatedAt: Scalars["String"]["output"];
  userId: Scalars["String"]["output"];
};

export type Search = {
  __typename?: "Search";
  thumbnail?: Maybe<Scalars["String"]["output"]>;
  title: Scalars["String"]["output"];
};

export type SearchHashtag = {
  __typename?: "SearchHashtag";
  ids: Array<Scalars["ID"]["output"]>;
  tags?: Maybe<Array<Hashtag>>;
};

export type SearchInput = {
  searchQ: Scalars["String"]["input"];
};

export type SearchPopularProfilesInput = {
  cursor?: InputMaybe<Scalars["String"]["input"]>;
  q: Scalars["String"]["input"];
  take?: InputMaybe<Scalars["Int"]["input"]>;
};

export type SearchServicesFilterInput = {
  id: Scalars["String"]["input"];
  value: Array<Scalars["String"]["input"]>;
};

export type SearchServicesInput = {
  filters: Array<SearchServicesFilterInput>;
  locationQuery?: InputMaybe<Scalars["String"]["input"]>;
  pagination: GqlPaginationInput;
  q?: InputMaybe<Scalars["String"]["input"]>;
};

export type SearchUserInput = {
  query: Scalars["String"]["input"];
};

export type SearchUsers = {
  __typename?: "SearchUsers";
  resloveUsers: Array<Account>;
  users?: Maybe<Array<Account>>;
  usersIds: Array<Scalars["ID"]["output"]>;
};

export type Seller = {
  __typename?: "Seller";
  id: Scalars["ID"]["output"];
  name: Scalars["String"]["output"];
  thumbnail: Scalars["String"]["output"];
};

export type SellerProductsRating = {
  __typename?: "SellerProductsRating";
  givenStars: Scalars["Float"]["output"];
  id: Scalars["ID"]["output"];
  rating: Scalars["Float"]["output"];
  reviews: Scalars["Int"]["output"];
};

export type SellerSalesStat = {
  __typename?: "SellerSalesStat";
  affiliations: Scalars["Int"]["output"];
  affiliationsAmount: Scalars["Float"]["output"];
  id: Scalars["ID"]["output"];
  purchases: Scalars["Int"]["output"];
  purchasesAmount: Scalars["Float"]["output"];
  returns: Scalars["Int"]["output"];
  returnsAmount: Scalars["Float"]["output"];
  sales: Scalars["Int"]["output"];
  salesAmount: Scalars["Float"]["output"];
  salesCategories: Array<SalesCategory>;
  sellerId: Scalars["ID"]["output"];
};

export enum SellerSalesType {
  Product = "product",
  Service = "service",
}

export type SendContactUsMessageInput = {
  email: Scalars["String"]["input"];
  message: Scalars["String"]["input"];
  name: Scalars["String"]["input"];
};

export type Service = {
  __typename?: "Service";
  adaptedFor?: Maybe<Array<ServiceAdaptation>>;
  airCondition?: Maybe<Scalars["Boolean"]["output"]>;
  availableAppointments?: Maybe<Array<Scalars["String"]["output"]>>;
  bathrooms?: Maybe<Scalars["Int"]["output"]>;
  beds?: Maybe<Scalars["Int"]["output"]>;
  brand?: Maybe<Scalars["String"]["output"]>;
  cancelable: Scalars["Boolean"]["output"];
  cancelationPolicy: ServiceCancelationType;
  cancelationPolicies: Maybe<ServiceCancelationPolicy[]>;
  cleaningFee?: Maybe<Scalars["Float"]["output"]>;
  createdAt: Scalars["String"]["output"];
  dailyPrice?: Maybe<Scalars["Boolean"]["output"]>;
  dailyPrices?: Maybe<ServiceDailyPrices>;
  deposit?: Maybe<Scalars["Boolean"]["output"]>;
  depositAmount?: Maybe<Scalars["Int"]["output"]>;
  description: Scalars["String"]["output"];
  discount?: Maybe<ServiceDiscount>;
  duration?: Maybe<Scalars["Int"]["output"]>;
  extras?: Maybe<Array<ServiceExtra>>;
  gpsAvailable?: Maybe<Scalars["Boolean"]["output"]>;
  healthCenterBookedAppointments: Array<Scalars["String"]["output"]>;
  id: Scalars["ID"]["output"];
  includedAmenities?: Maybe<Array<Scalars["String"]["output"]>>;
  includedServices?: Maybe<Array<Scalars["String"]["output"]>>;
  ingredients?: Maybe<Array<Scalars["String"]["output"]>>;
  lugaggeCapacity?: Maybe<Scalars["Int"]["output"]>;
  maxSpeedInKm?: Maybe<Scalars["Int"]["output"]>;
  measurements?: Maybe<ServicePropertyMeasurements>;
  menuType?: Maybe<RestaurantDishType>;
  model?: Maybe<Scalars["String"]["output"]>;
  name: Scalars["String"]["output"];
  num_of_rooms?: Maybe<Scalars["Int"]["output"]>;
  owner: Account;
  popularAmenities?: Maybe<Array<Scalars["String"]["output"]>>;
  price: Scalars["Int"]["output"];
  propertyType?: Maybe<RentalPropertyType>;
  rating: Scalars["Float"]["output"];
  restriction?: Maybe<Array<ServiceRestriction>>;
  reviews: Scalars["Int"]["output"];
  saved: Scalars["Boolean"]["output"];
  seats?: Maybe<Scalars["Int"]["output"]>;
  sellerId: Scalars["ID"]["output"];
  sessionDurationMins?: Maybe<Scalars["Int"]["output"]>;
  shop: Shop;
  speakingLanguages?: Maybe<Array<DoctorSpeakingLanguage>>;
  speciality?: Maybe<Scalars["String"]["output"]>;
  specialityId?: Maybe<Scalars["ID"]["output"]>;
  thumbnail: Scalars["String"]["output"];
  treatmentCategory?: Maybe<Scalars["String"]["output"]>;
  treatmentCategoryId?: Maybe<Scalars["ID"]["output"]>;
  title: Scalars["String"]["input"];
  type: ServiceType;
  typeOfPlace?: Maybe<RentalTypeOfPlace>;
  units?: Maybe<Scalars["Int"]["output"]>;
  updatedAt: Scalars["String"]["output"];
  vehicleCategoryId?: Maybe<Scalars["String"]["output"]>;
  windows?: Maybe<Scalars["Int"]["output"]>;
  workingHours?: Maybe<ServiceWorkingSchedule>;
};

export enum ServiceAdaptation {
  Children = "children",
  NewBorn = "newBorn",
  Wheelchair = "wheelchair",
}

export type ServiceAmenitiesInput = {
  label: Array<ServiceAmenitiesLabelTranslationInput>;
  value: Scalars["String"]["input"];
};

export type ServiceAmenitiesLabelTranslationInput = {
  langId: Scalars["String"]["input"];
  value: Scalars["String"]["input"];
};

export type ServiceAmenity = {
  __typename?: "ServiceAmenity";
  label: Scalars["String"]["output"];
  value: Scalars["String"]["output"];
  slug: Scalars["String"]["output"];
};

export type ServiceCancelationPolicy = {
  __typename?: "ServiceCancelationPolicy";
  id: Scalars["String"]["output"];
  cost: Scalars["Int"]["output"];
  duration: Scalars["Int"]["output"];
};

export type ServiceCancelationPolicyInput = {
  cost: Scalars["Int"]["input"];
  duration: Scalars["Int"]["input"];
};

export enum ServiceCancelationType {
  Moderate = "moderate",
  Simple = "simple",
  Strict = "strict",
}

export type ServiceCategory = {
  __typename?: "ServiceCategory";
  description: Scalars["String"]["output"];
  filters: Array<ServiceCategoryFilterValue>;
  id: Scalars["ID"]["output"];
  metaTagDescription: Scalars["String"]["output"];
  metaTagKeywords: Scalars["String"]["output"];
  metaTagTitle: Scalars["String"]["output"];
  name: Scalars["String"]["output"];
  seo: Scalars["String"]["output"];
  sortOrder: Scalars["Int"]["output"];
  status: ServiceCategoryStatus;
  thumbnail: Scalars["String"]["output"];
  type: ServiceType;
};

export type ServiceCategoryFilterValue = {
  __typename?: "ServiceCategoryFilterValue";
  filteringValue: Scalars["String"]["output"];
  name: Scalars["String"]["output"];
  sortOrder: Scalars["Int"]["output"];
};

export type ServiceCategoryFilterValueInput = {
  filteringValue: Scalars["String"]["input"];
  name: Array<TranslationTextInput>;
  sortOrder: Scalars["Int"]["input"];
};

export enum ServiceCategoryStatus {
  Active = "active",
  InActive = "inActive",
}

export type ServiceContact = {
  __typename?: "ServiceContact";
  address: Scalars["String"]["output"];
  city: Scalars["String"]["output"];
  country: Scalars["String"]["output"];
  email: Scalars["String"]["output"];
  phone: Scalars["String"]["output"];
  state?: Maybe<Scalars["String"]["output"]>;
};

export type ServiceDailyPrices = {
  __typename?: "ServiceDailyPrices";
  fr: Scalars["Int"]["output"];
  mo: Scalars["Int"]["output"];
  sa: Scalars["Int"]["output"];
  su: Scalars["Int"]["output"];
  th: Scalars["Int"]["output"];
  tu: Scalars["Int"]["output"];
  we: Scalars["Int"]["output"];
};

export type ServiceDailyPricesInput = {
  fr: Scalars["Int"]["input"];
  mo: Scalars["Int"]["input"];
  sa: Scalars["Int"]["input"];
  su: Scalars["Int"]["input"];
  th: Scalars["Int"]["input"];
  tu: Scalars["Int"]["input"];
  we: Scalars["Int"]["input"];
};

export type ServiceDayWorkingHoursInput = {
  periods: Array<Scalars["String"]["input"]>;
};

export type ServiceDiscount = {
  __typename?: "ServiceDiscount";
  units: Scalars["Int"]["output"];
  value: Scalars["Float"]["output"];
};

export type ServiceDiscountInput = {
  units: Scalars["Int"]["input"];
  value: Scalars["Int"]["input"];
};

export type ServiceDiscovery = {
  __typename?: "ServiceDiscovery";
  id: Scalars["ID"]["output"];
  price: Array<Scalars["Float"]["output"]>;
  sellerId: Scalars["ID"]["output"];
  sellerName: Scalars["String"]["output"];
  status: ServiceStatus;
  thumbnail: Scalars["String"]["output"];
  title: Scalars["String"]["output"];
  type: ServiceType;
  updatedAt: Scalars["String"]["output"];
};

export type ServiceExtra = {
  __typename?: "ServiceExtra";
  cost: Scalars["Int"]["output"];
  id: Scalars["String"]["output"];
  name: Scalars["String"]["output"];
};

export type ServiceExtraInput = {
  cost: Scalars["Int"]["input"];
  name: Array<ServiceExtraNameTranslationInput>;
};

export type ServiceExtraNameTranslationInput = {
  langId: Scalars["String"]["input"];
  value: Scalars["String"]["input"];
};

export type ServiceFilter = {
  __typename?: "ServiceFilter";
  filterGroupName: Scalars["String"]["output"];
  filterValues: Array<ServiceFilterValue>;
  filteringKey: Scalars["String"]["output"];
  id: Scalars["String"]["output"];
  selectionType: ServiceFilterSelectionType;
  sortOrder: Scalars["Int"]["output"];
};

export enum ServiceFilterSelectionType {
  MultiSelect = "multiSelect",
  Range = "range",
  SingleSelect = "singleSelect",
}

export type ServiceFilterValue = {
  __typename?: "ServiceFilterValue";
  filteringValue: Scalars["String"]["output"];
  name: Scalars["String"]["output"];
  sortOrder: Scalars["Int"]["output"];
};

export type ServiceFilterValueRaw = {
  __typename?: "ServiceFilterValueRaw";
  filteringValue: Scalars["String"]["output"];
  name: Array<TranslationText>;
  sortOrder: Scalars["Int"]["output"];
};

export type ServiceIncludedAmenitiesInput = {
  langId: Scalars["String"]["input"];
  value: Array<Scalars["String"]["input"]>;
};

export type ServiceIncludedServicesInput = {
  langId: Scalars["String"]["input"];
  value: Array<Scalars["String"]["input"]>;
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
  address: Scalars["String"]["output"];
  city: Scalars["String"]["output"];
  country: Scalars["String"]["output"];
  lat: Scalars["Float"]["output"];
  lon: Scalars["Float"]["output"];
  postalCode: Scalars["Int"]["output"];
  state: Scalars["String"]["output"];
};

export type ServiceLocationInput = {
  address: Scalars["String"]["input"];
  city: Scalars["String"]["input"];
  country: Scalars["String"]["input"];
  lat: Scalars["Float"]["input"];
  lon: Scalars["Float"]["input"];
  postalCode: Scalars["Int"]["input"];
  state: Scalars["String"]["input"];
};

export type ServiceMetaInfo = {
  __typename?: "ServiceMetaInfo";
  description: Scalars["String"]["output"];
  hashtags: Array<Scalars["String"]["output"]>;
  metaTagDescription: Scalars["String"]["output"];
  metaTagKeywords: Array<Scalars["String"]["output"]>;
  title: Scalars["String"]["output"];
};

export type ServiceMetaInfoInput = {
  description: Scalars["String"]["input"];
  hashtags: Array<Scalars["String"]["input"]>;
  metaTagDescription: Scalars["String"]["input"];
  metaTagKeywords: Array<Scalars["String"]["input"]>;
  title: Scalars["String"]["input"];
};

export type ServiceMetaInfoTranslation = {
  __typename?: "ServiceMetaInfoTranslation";
  langId: Scalars["String"]["output"];
  value: ServiceMetaInfo;
};

export type ServiceMetaInfoTranslationInput = {
  langId: Scalars["String"]["input"];
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
  policyTitle: Scalars["String"]["output"];
  terms: Array<Scalars["String"]["output"]>;
};

export type ServicePolicyInput = {
  policyTitle: Scalars["String"]["input"];
  terms: Array<Scalars["String"]["input"]>;
};

export type ServicePolicyTranslatedInput = {
  langId: Scalars["String"]["input"];
  value: Array<ServicePolicyInput>;
};

export type ServicePost = {
  __typename?: "ServicePost";
  comments: Scalars["Int"]["output"];
  commentsVisibility: CommentsVisibility;
  createdAt: Scalars["String"]["output"];
  id: Scalars["ID"]["output"];
  location: PostLocation;
  reactionNum: Scalars["Int"]["output"];
  service?: Maybe<Service>;
  serviceId: Scalars["ID"]["output"];
  serviceType: TypeOfService;
  shares: Scalars["Int"]["output"];
  updatedAt: Scalars["String"]["output"];
  user?: Maybe<Account>;
  userId: Scalars["ID"]["output"];
  views: Scalars["Int"]["output"];
  visibility: PostVisibility;
};

export type ServicePostHashtagSearch = {
  __typename?: "ServicePostHashtagSearch";
  commented?: Maybe<ServicePost>;
  liked?: Maybe<ServicePost>;
  shared?: Maybe<ServicePost>;
  viewed?: Maybe<ServicePost>;
};

export type ServicePresentation = {
  __typename?: "ServicePresentation";
  src: Scalars["String"]["output"];
  type: ServicePresentationType;
};

export type ServicePresentationInput = {
  src: Scalars["String"]["input"];
  type: ServicePresentationType;
};

export enum ServicePresentationType {
  Img = "img",
  Vid = "vid",
}

export type ServicePropertyMeasurements = {
  __typename?: "ServicePropertyMeasurements";
  inFeet: Scalars["Int"]["output"];
  inMeter: Scalars["Int"]["output"];
};

export type ServicePropertyMeasurementsInput = {
  inFeet: Scalars["Int"]["input"];
  inMeter: Scalars["Int"]["input"];
};

export enum ServiceRestriction {
  Event = "event",
  Pets = "pets",
  Smoking = "smoking",
}

export type ServiceSearchResponse = {
  __typename?: "ServiceSearchResponse";
  data: Array<Service>;
  hasMore: Scalars["Boolean"]["output"];
  total: Scalars["Int"]["output"];
};

export type ServiceDayWorkingHours = {
  __typename?: "ServiceServiceDayWorkingHours";
  periods: Array<Scalars["String"]["output"]>;
};

export type ServiceShopRaw = {
  __typename?: "ServiceShopRaw";
  cancelationPolicies: Array<ServiceCancelationPolicy>;
  contact: ServiceContact;
  createdAt: Scalars["String"]["output"];
  cuisinesTypeId?: Maybe<Scalars["String"]["output"]>;
  doctors?: Maybe<Array<Doctor>>;
  establishmentTypeId?: Maybe<Scalars["String"]["output"]>;
  highest_price: Scalars["Float"]["output"];
  id: Scalars["ID"]["output"];
  location: ServiceLocation;
  lowest_price: Scalars["Float"]["output"];
  menus?: Maybe<Array<RestaurantMenu>>;
  michelin_guide_stars?: Maybe<Scalars["Int"]["output"]>;
  ownerId: Scalars["ID"]["output"];
  payment_methods: Array<ServicePaymentMethod>;
  policies: Array<ServiceTranslationPolicy>;
  presentations: Array<ServicePresentation>;
  rating: Scalars["Float"]["output"];
  reviews: Scalars["Int"]["output"];
  rooms?: Maybe<Array<HotelRoom>>;
  serviceMetaInfo: Array<ServiceMetaInfoTranslation>;
  setting_and_ambianceId?: Maybe<Scalars["String"]["output"]>;
  status: ServiceStatus;
  suspensionReason?: Maybe<Scalars["String"]["output"]>;
  treatments?: Maybe<Array<Treatment>>;
  type: ServiceType;
  type_of_seller: ServiceTypeOfSeller;
  updatedAt: Scalars["String"]["output"];
  vat: Scalars["Float"]["output"];
  vehicle?: Maybe<Array<Vehicle>>;
  workingHours?: Maybe<ServiceWorkingSchedule>;
};

export enum ServiceStatus {
  Active = "active",
  InActive = "inActive",
  Suspended = "suspended",
}

export type ServiceTranslationPolicy = {
  __typename?: "ServiceTranslationPolicy";
  langId: Scalars["String"]["output"];
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

export type ServiceWeekdaysWorkingHours = {
  __typename?: "ServiceWeekdaysWorkingHours";
  fr?: Maybe<ServiceDayWorkingHours>;
  mo?: Maybe<ServiceDayWorkingHours>;
  sa?: Maybe<ServiceDayWorkingHours>;
  su?: Maybe<ServiceDayWorkingHours>;
  th?: Maybe<ServiceDayWorkingHours>;
  tu?: Maybe<ServiceDayWorkingHours>;
  we?: Maybe<ServiceDayWorkingHours>;
};

export type ServiceWorkingSchedule = {
  __typename?: "ServiceWorkingSchedule";
  id: Scalars["ID"]["output"];
  specialDays: Array<SpecialDayWorkingHours>;
  weekdays: ServiceWeekdaysWorkingHours;
};

export type ServicesCursorPaginationResponse = {
  __typename?: "ServicesCursorPaginationResponse";
  cursor?: Maybe<Scalars["String"]["output"]>;
  data: Array<Service>;
  hasMore: Scalars["Boolean"]["output"];
  nextCursor?: Maybe<Scalars["String"]["output"]>;
  total: Scalars["Int"]["output"];
};

export type ShippingAddress = {
  __typename?: "ShippingAddress";
  firstname: Scalars["String"]["output"];
  id: Scalars["ID"]["output"];
  instractions?: Maybe<Scalars["String"]["output"]>;
  lastname: Scalars["String"]["output"];
  location: Location;
  ownerId: Scalars["ID"]["output"];
  phone?: Maybe<Scalars["String"]["output"]>;
  zipCode?: Maybe<Scalars["String"]["output"]>;
};

export type ShippingCountryInput = {
  code: Scalars["String"]["input"];
};

export type ShippingDeliveryTimeRange = {
  __typename?: "ShippingDeliveryTimeRange";
  from: Scalars["Int"]["output"];
  to: Scalars["Int"]["output"];
};

export type ShippingDeliveryTimeRangeInput = {
  from: Scalars["Int"]["input"];
  to: Scalars["Int"]["input"];
};

export enum ShippingDestination {
  Local = "local",
  National = "national",
}

export type ShippingDetails = {
  __typename?: "ShippingDetails";
  available: Scalars["Boolean"]["output"];
  cost?: Maybe<Scalars["Float"]["output"]>;
  country: Scalars["String"]["output"];
  deliveryTimeRange?: Maybe<ShippingDeliveryTimeRange>;
  shippingRulesIds: Array<Scalars["ID"]["output"]>;
  shippingTypes?: Maybe<Array<ShippingType>>;
};

export type ShippingRule = {
  __typename?: "ShippingRule";
  cost: Scalars["Float"]["output"];
  deliveryTimeRange: ShippingDeliveryTimeRange;
  destination: ShippingDestination;
  id: Scalars["ID"]["output"];
  listing: Scalars["Float"]["output"];
  name: Scalars["String"]["output"];
  sellerId: Scalars["ID"]["output"];
  shippingCompanyName: Scalars["String"]["output"];
  shippingType: ShippingType;
};

export type ShippingRuleGeoZone = {
  __typename?: "ShippingRuleGeoZone";
  country: Scalars["String"]["output"];
  id: Scalars["ID"]["output"];
  shippingTypeRuleId: Scalars["ID"]["output"];
  zone: Scalars["String"]["output"];
};

export enum ShippingType {
  ClickAndCollect = "click_and_collect",
  Free = "free",
  Paid = "paid",
}

export type ShippingTypeRule = {
  __typename?: "ShippingTypeRule";
  description: Scalars["String"]["output"];
  id: Scalars["ID"]["output"];
  name: Scalars["String"]["output"];
  type: ShippingType;
  zones: Array<ShippingRuleGeoZone>;
};

export type Shop = {
  __typename?: "Shop";
  banner: Scalars["String"]["output"];
  businessType: BusinessType;
  createdAt: Scalars["DateTime"]["output"];
  description: Scalars["String"]["output"];
  email: Scalars["String"]["output"];
  id: Scalars["ID"]["output"];
  images: Array<Scalars["String"]["output"]>;
  location: Location;
  name: Scalars["String"]["output"];
  ownerId: Scalars["String"]["output"];
  payment_methods: Array<ShopPaymentMethod>;
  phone: Scalars["String"]["output"];
  profile?: Maybe<Profile>;
  rating: Scalars["Float"]["output"];
  reviews: Scalars["Int"]["output"];
  sellerProfile: Profile;
  status: ShopStatus;
  storeCategory: Scalars["String"]["output"];
  storeCategoryId: Scalars["String"]["output"];
  storeFor: Array<StoreFor>;
  storeType: StoreType;
  targetGenders: Array<TargetGenders>;
  thumbnail: Scalars["String"]["output"];
  type?: Maybe<ServiceType>;
  updatedAt: Scalars["DateTime"]["output"];
  verified: Scalars["Boolean"]["output"];
  videos: Array<Scalars["String"]["output"]>;
  workingSchedule: ShopWorkingSchedule;
};

export type ShopCursorPaginationResponse = {
  __typename?: "ShopCursorPaginationResponse";
  cursor?: Maybe<Scalars["String"]["output"]>;
  data: Array<Shop>;
  hasMore: Scalars["Boolean"]["output"];
  nextCursor?: Maybe<Scalars["String"]["output"]>;
  total: Scalars["Int"]["output"];
};

export type ShopDayWorkingHours = {
  __typename?: "ShopDayWorkingHours";
  periods: Array<Scalars["String"]["output"]>;
};

export enum ShopPaymentMethod {
  Cash = "cash",
  Check = "check",
  CreditCard = "credit_card",
  Mastercard = "mastercard",
  Visa = "visa",
}

export type ShopSpecialDayWorkingHours = {
  __typename?: "ShopSpecialDayWorkingHours";
  date: Scalars["String"]["output"];
  workingHours: ShopDayWorkingHours;
};

export enum ShopStatus {
  Active = "active",
  InActive = "inActive",
  Suspended = "suspended",
}

export type ShopWeekdaysWorkingHours = {
  __typename?: "ShopWeekdaysWorkingHours";
  fr?: Maybe<ShopDayWorkingHours>;
  mo?: Maybe<ShopDayWorkingHours>;
  sa?: Maybe<ShopDayWorkingHours>;
  su?: Maybe<ShopDayWorkingHours>;
  th?: Maybe<ShopDayWorkingHours>;
  tu?: Maybe<ShopDayWorkingHours>;
  we?: Maybe<ShopDayWorkingHours>;
};

export type ShopWorkingSchedule = {
  __typename?: "ShopWorkingSchedule";
  id: Scalars["ID"]["output"];
  isOpen: Scalars["Boolean"]["output"];
  openFrom: Scalars["String"]["output"];
  openTo: Scalars["String"]["output"];
  sellerId: Scalars["ID"]["output"];
  specialDays: Array<ShopSpecialDayWorkingHours>;
  weekdays: ShopWeekdaysWorkingHours;
};

export type ShoppingCart = {
  __typename?: "ShoppingCart";
  appliedVoucherId?: Maybe<Scalars["ID"]["output"]>;
  cartProduct?: Maybe<Array<CartItem>>;
  id: Scalars["ID"]["output"];
  ownerId: Scalars["ID"]["output"];
};

export enum ShoppingCartItemType {
  Product = "product",
  Service = "service",
}

export type SiteInformation = {
  __typename?: "SiteInformation";
  descirption: Scalars["String"]["output"];
  id: Scalars["ID"]["output"];
  placements: Array<Scalars["String"]["output"]>;
  route: Scalars["String"]["output"];
  slug: Scalars["String"]["output"];
  sortOrder: Scalars["Int"]["output"];
  title: Scalars["String"]["output"];
};

export type SiteProfit = {
  __typename?: "SiteProfit";
  affiliations: Scalars["Int"]["output"];
  affiliationsAmount: Scalars["Float"]["output"];
  lastAffiliationsAmount: Scalars["Float"]["output"];
  lastPurchasesAmount: Scalars["Float"]["output"];
  lastRefundsAmount: Scalars["Float"]["output"];
  lastSalesAmount: Scalars["Float"]["output"];
  purchases: Scalars["Int"]["output"];
  purchasesAmount: Scalars["Float"]["output"];
  refunds: Scalars["Int"]["output"];
  refundsAmount: Scalars["Float"]["output"];
  sales: Scalars["Int"]["output"];
  salesAmount: Scalars["Float"]["output"];
};

export type SiteSale = {
  __typename?: "SiteSale";
  createdAt: Scalars["String"]["output"];
  salesAmount: Scalars["Float"]["output"];
};

export type SocialTag = {
  __typename?: "SocialTag";
  contentId: Scalars["String"]["output"];
  taggedProfiles: Array<ProfileFollow>;
  taggedUserIds: Array<Scalars["String"]["output"]>;
};

export type SpecialDayWorkingHours = {
  __typename?: "SpecialDayWorkingHours";
  date: Scalars["String"]["output"];
  workingHours: ServiceDayWorkingHours;
};

export type SpecialDayWorkingHoursInput = {
  date: Scalars["String"]["input"];
  workingHours: ServiceDayWorkingHoursInput;
};

export enum StaffAccountType {
  Admin = "admin",
  Moderator = "moderator",
}

export enum StatsRetrivePeriod {
  Day = "day",
  Month = "month",
  Week = "week",
  Year = "year",
}

export enum StoreFor {
  Babies = "babies",
  Children = "children",
  Men = "men",
  Women = "women",
}

export enum StoreType {
  Product = "product",
  Service = "service",
}

export type Story = {
  __typename?: "Story";
  affiliationPost?: Maybe<AffiliationPost>;
  attachements?: Maybe<Attachment>;
  content?: Maybe<Scalars["String"]["output"]>;
  createdAt: Scalars["DateTime"]["output"];
  id: Scalars["ID"]["output"];
  newsfeedPost?: Maybe<NewsfeedPost>;
  publisher?: Maybe<Profile>;
  publisherId: Scalars["ID"]["output"];
  reactionsNum: Scalars["Int"]["output"];
  referenceId?: Maybe<Scalars["ID"]["output"]>;
  servicePost?: Maybe<ServicePost>;
  shopPost?: Maybe<ProductPost>;
  type: StoryType;
  updatedAt: Scalars["DateTime"]["output"];
  views: Array<StoryView>;
  viewsCount: Scalars["Int"]["output"];
};

export type StoryCursorPaginationResponse = {
  __typename?: "StoryCursorPaginationResponse";
  cursor: Scalars["String"]["output"];
  data: Story;
  hasMore: Scalars["Boolean"]["output"];
  nextCursor: Scalars["String"]["output"];
};

export enum StoryType {
  Affiliation = "affiliation",
  Base = "base",
  Image = "image",
  Post = "post",
  Product = "product",
  Service = "service",
  Text = "text",
  Video = "video",
}

export type StoryView = {
  __typename?: "StoryView";
  createdAt: Scalars["DateTime"]["output"];
  gender: ProfileReachedGender;
  id: Scalars["ID"]["output"];
  story?: Maybe<Story>;
  storyId: Scalars["ID"]["output"];
  viewer?: Maybe<Account>;
  viewerId: Scalars["ID"]["output"];
};

export type StringTranslationField = {
  langId: Scalars["String"]["input"];
  value: Scalars["String"]["input"];
};

export type SuspenseAccountAdminInput = {
  rejectReason?: InputMaybe<Scalars["String"]["input"]>;
  userId: Scalars["ID"]["input"];
};

export type SuspenseContentInput = {
  id: Scalars["ID"]["input"];
  type: Scalars["String"]["input"];
};

export enum TargetGenders {
  Female = "female",
  Male = "male",
}

export type TaxRate = {
  __typename?: "TaxRate";
  appliedOnCountries: Array<Country>;
  appliedOnCountryIds: Array<Scalars["String"]["output"]>;
  id: Scalars["ID"]["output"];
  percent: Scalars["Float"]["output"];
  title: Scalars["String"]["output"];
};

export type TestUploadFile = {
  file: Scalars["Upload"]["input"];
  test: Scalars["String"]["input"];
};

export type TopHashtagNewsfeedPosts = {
  __typename?: "TopHashtagNewsfeedPosts";
  commented: NewsfeedPost;
  liked: NewsfeedPost;
  shared: NewsfeedPost;
  viewed: NewsfeedPost;
};

export type Transaction = {
  __typename?: "Transaction";
  amount: Scalars["Int"]["output"];
  createdAt: Scalars["DateTime"]["output"];
  currency: Scalars["String"]["output"];
  description: Scalars["String"]["output"];
  fromId: Scalars["String"]["output"];
  fromUser: Account;
  id: Scalars["ID"]["output"];
  paymentType: Scalars["String"]["output"];
  status: TransactionStatus;
  toUser: Account;
  updatedAt: Scalars["DateTime"]["output"];
  userId: Scalars["ID"]["output"];
};

export enum TransactionStatus {
  Failed = "failed",
  Pending = "pending",
  Success = "success",
}

export type TranslationText = {
  __typename?: "TranslationText";
  langId: Scalars["String"]["output"];
  value: Scalars["String"]["output"];
};

export type TranslationTextArrayInput = {
  langId: Scalars["String"]["input"];
  value: Array<Scalars["String"]["input"]>;
};

export type TranslationTextInput = {
  langId: Scalars["String"]["input"];
  value: Scalars["String"]["input"];
};

export type Treatment = {
  __typename?: "Treatment";
  beautyCenterServiceId: Scalars["ID"]["output"];
  category?: Maybe<BeautyCenterTreatmentCategory>;
  discount: ServiceDiscount;
  duration: Array<Scalars["Int"]["output"]>;
  id: Scalars["ID"]["output"];
  price: Scalars["Float"]["output"];
  thumbnail: Scalars["String"]["output"];
  title: Scalars["String"]["output"];
  treatmentCategoryId: Scalars["ID"]["output"];
};

export enum TypeOfService {
  BeautyCenterTreatment = "beautyCenterTreatment",
  HealthCenterTreatment = "healthCenterTreatment",
  HolidayRental = "holidayRental",
  HotelRoom = "hotelRoom",
  RestaurantMenu = "restaurantMenu",
  Vehicle = "vehicle",
}

export type UnFollowProfileInput = {
  profileId: Scalars["String"]["input"];
};

export type UpdateAccountInput = {
  birthDate?: InputMaybe<Scalars["String"]["input"]>;
  country?: InputMaybe<Scalars["String"]["input"]>;
  currency?: InputMaybe<Scalars["String"]["input"]>;
  firstName?: InputMaybe<Scalars["String"]["input"]>;
  gender?: InputMaybe<AccountGenderEnum>;
  id: Scalars["ID"]["input"];
  lang?: InputMaybe<Scalars["String"]["input"]>;
  lastName?: InputMaybe<Scalars["String"]["input"]>;
  phone?: InputMaybe<Scalars["String"]["input"]>;
};

export type UpdateAffiliationAdminInput = {
  commision?: InputMaybe<Scalars["Float"]["input"]>;
  expireAt?: InputMaybe<Scalars["String"]["input"]>;
  id: Scalars["ID"]["input"];
  itemId?: InputMaybe<Scalars["ID"]["input"]>;
  itemType?: InputMaybe<Scalars["String"]["input"]>;
  sellerId: Scalars["ID"]["input"];
};

export type UpdateAffiliationInput = {
  commision?: InputMaybe<Scalars["Float"]["input"]>;
  expireAt?: InputMaybe<Scalars["String"]["input"]>;
  id: Scalars["ID"]["input"];
  itemId?: InputMaybe<Scalars["ID"]["input"]>;
  itemType?: InputMaybe<Scalars["String"]["input"]>;
};

export type UpdateBeautyCenterTreatmentInput = {
  discount?: InputMaybe<ServiceDiscountInput>;
  duration?: InputMaybe<Array<Scalars["Int"]["input"]>>;
  id: Scalars["ID"]["input"];
  price?: InputMaybe<Scalars["Float"]["input"]>;
  thumbnail?: InputMaybe<Scalars["Upload"]["input"]>;
  title?: InputMaybe<Array<TranslationTextInput>>;
  treatmentCategoryId?: InputMaybe<Scalars["ID"]["input"]>;
};

export type UpdateCategoryInput = {
  id: Scalars["ID"]["input"];
  metaTagDescription?: InputMaybe<Array<TranslationTextInput>>;
  metaTagKeywords?: InputMaybe<Array<TranslationTextInput>>;
  metaTagTitle?: InputMaybe<Array<TranslationTextInput>>;
  name?: InputMaybe<Array<TranslationTextInput>>;
  parantId?: InputMaybe<Scalars["ID"]["input"]>;
  sortOrder?: InputMaybe<Scalars["Int"]["input"]>;
  status?: InputMaybe<ProductCategoryStatus>;
};

export type UpdateCommentInput = {
  content?: InputMaybe<Scalars["String"]["input"]>;
  id: Scalars["ID"]["input"];
  mentions?: InputMaybe<Array<CommentMentionInput>>;
};

export type UpdateCurrencyInput = {
  code: Scalars["String"]["input"];
  enabled?: InputMaybe<Scalars["Boolean"]["input"]>;
  exchangeRate?: InputMaybe<Scalars["Float"]["input"]>;
  name?: InputMaybe<Scalars["String"]["input"]>;
  symbol?: InputMaybe<Scalars["String"]["input"]>;
};

export type UpdateDesignInput = {
  id: Scalars["ID"]["input"];
  name?: InputMaybe<Scalars["String"]["input"]>;
  placement?: InputMaybe<Array<DesignPlacement>>;
  src?: InputMaybe<Scalars["String"]["input"]>;
  type?: InputMaybe<DesignType>;
};

export type UpdateFilterInput = {
  id: Scalars["ID"]["input"];
  name?: InputMaybe<Array<StringTranslationField>>;
  sortOrder?: InputMaybe<Scalars["Int"]["input"]>;
  values?: InputMaybe<Array<ProductFilterGroupValueInput>>;
};

export type UpdateFinancialAccountInput = {
  bank_country?: InputMaybe<Scalars["String"]["input"]>;
  bank_number?: InputMaybe<Scalars["String"]["input"]>;
  card_cvc?: InputMaybe<Scalars["String"]["input"]>;
  card_exp_month?: InputMaybe<Scalars["String"]["input"]>;
  card_exp_year?: InputMaybe<Scalars["String"]["input"]>;
  card_number?: InputMaybe<Scalars["String"]["input"]>;
  currency?: InputMaybe<Scalars["String"]["input"]>;
  id: Scalars["ID"]["input"];
  label?: InputMaybe<Scalars["String"]["input"]>;
  type?: InputMaybe<FinancialAccountType>;
};

export type UpdateHashtagInput = {
  status?: InputMaybe<HashtagStatus>;
  tag: Scalars["String"]["input"];
};

export type UpdateHotelRoomAdminInput = {
  bathrooms?: InputMaybe<Scalars["Int"]["input"]>;
  beds?: InputMaybe<Scalars["Int"]["input"]>;
  cancelationPolicies?: InputMaybe<Array<ServiceCancelationPolicyInput>>;
  dailyPrice?: InputMaybe<Scalars["Boolean"]["input"]>;
  dailyPrices?: InputMaybe<ServiceDailyPricesInput>;
  discount?: InputMaybe<ServiceDiscountInput>;
  extras?: InputMaybe<Array<ServiceExtraInput>>;
  id: Scalars["ID"]["input"];
  includedAmenities?: InputMaybe<Array<ServiceIncludedAmenitiesInput>>;
  includedServices?: InputMaybe<Array<ServiceIncludedServicesInput>>;
  insurance?: InputMaybe<Scalars["Float"]["input"]>;
  measurements?: InputMaybe<ServicePropertyMeasurementsInput>;
  num_of_rooms?: InputMaybe<Scalars["Int"]["input"]>;
  popularAmenities?: InputMaybe<Array<ServiceAmenitiesInput>>;
  presentations?: InputMaybe<Array<ServicePresentationInput>>;
  pricePerNight?: InputMaybe<Scalars["Int"]["input"]>;
  roomMetaInfo?: InputMaybe<Array<HotelRoomTranslationMetaInfoInput>>;
};

export type UpdateLanguageInput = {
  code?: InputMaybe<Scalars["String"]["input"]>;
  enabled?: InputMaybe<Scalars["Boolean"]["input"]>;
  id: Scalars["ID"]["input"];
  locale?: InputMaybe<Scalars["String"]["input"]>;
  name?: InputMaybe<Scalars["String"]["input"]>;
  sortOrder?: InputMaybe<Scalars["Int"]["input"]>;
};

export type UpdateMembershipIncludedItemInput = {
  title: Scalars["String"]["input"];
};

export type UpdateMembershipInput = {
  comissionOn?: InputMaybe<CommissionOn>;
  id: Scalars["ID"]["input"];
  includings?: InputMaybe<Array<UpdateMembershipIncludedItemInput>>;
  name?: InputMaybe<Scalars["String"]["input"]>;
  turnover_rules?: InputMaybe<Array<UpdateMembershipTurnoverRuleInput>>;
};

export type UpdateMembershipTurnoverRuleInput = {
  commission?: InputMaybe<Scalars["Float"]["input"]>;
  id: Scalars["ID"]["input"];
  price?: InputMaybe<Scalars["Float"]["input"]>;
  turnover_amount?: InputMaybe<Scalars["Float"]["input"]>;
};

export type UpdateMyPrivacyInput = {
  hideCommentsNum?: InputMaybe<Scalars["Boolean"]["input"]>;
  hideLikesNum?: InputMaybe<Scalars["Boolean"]["input"]>;
  hideViewsNum?: InputMaybe<Scalars["Boolean"]["input"]>;
  initialMessaging?: InputMaybe<MessagingSettings>;
  messageReadStatus?: InputMaybe<Scalars["Boolean"]["input"]>;
  privateAccount?: InputMaybe<Scalars["Boolean"]["input"]>;
};

export type UpdateNewsfeedPostInput = {
  affiliationId?: InputMaybe<Scalars["String"]["input"]>;
  attachments?: InputMaybe<Array<Scalars["String"]["input"]>>;
  commentsVisibility?: InputMaybe<CommentsVisibility>;
  content?: InputMaybe<Scalars["String"]["input"]>;
  enableComments?: InputMaybe<Scalars["Boolean"]["input"]>;
  hashtags?: InputMaybe<Array<HashtagInput>>;
  id: Scalars["ID"]["input"];
  location?: InputMaybe<PostLocationInput>;
  productIds?: InputMaybe<Array<Scalars["String"]["input"]>>;
  serviceId?: InputMaybe<Scalars["String"]["input"]>;
  tags?: InputMaybe<Array<PostTagInput>>;
  title?: InputMaybe<Scalars["String"]["input"]>;
  type?: InputMaybe<PostType>;
  visibility?: InputMaybe<PostVisibility>;
};

export type UpdateNewsletterInput = {
  feedback?: InputMaybe<Scalars["Boolean"]["input"]>;
  news?: InputMaybe<Scalars["Boolean"]["input"]>;
  product?: InputMaybe<Scalars["Boolean"]["input"]>;
  reminder?: InputMaybe<Scalars["Boolean"]["input"]>;
};

export type UpdatePostAdminInput = {
  affiliationId?: InputMaybe<Scalars["String"]["input"]>;
  attachments?: InputMaybe<Array<Scalars["String"]["input"]>>;
  commentsVisibility?: InputMaybe<CommentsVisibility>;
  content?: InputMaybe<Scalars["String"]["input"]>;
  enableComments?: InputMaybe<Scalars["Boolean"]["input"]>;
  hashtags?: InputMaybe<Array<HashtagInput>>;
  id: Scalars["ID"]["input"];
  location?: InputMaybe<PostLocationInput>;
  productIds?: InputMaybe<Array<Scalars["String"]["input"]>>;
  serviceId?: InputMaybe<Scalars["String"]["input"]>;
  tags?: InputMaybe<Array<PostTagInput>>;
  title?: InputMaybe<Scalars["String"]["input"]>;
  type?: InputMaybe<PostType>;
  userId: Scalars["ID"]["input"];
  visibility?: InputMaybe<PostVisibility>;
};

export type UpdateProductAttributeInput = {
  displayType?: InputMaybe<ProductAttributeDisplayType>;
  id: Scalars["ID"]["input"];
  name?: InputMaybe<Array<TranslationTextInput>>;
  selectionType?: InputMaybe<ProductAttributeSelectionType>;
  values?: InputMaybe<Array<UpdateProductAttributeValueInput>>;
};

export type UpdateProductAttributeValueInput = {
  id: Scalars["ID"]["input"];
  name?: InputMaybe<Array<TranslationTextInput>>;
  value?: InputMaybe<Scalars["String"]["input"]>;
};

export type UpdateProductInput = {
  attributes?: InputMaybe<Array<ProductAttributeInput>>;
  brand?: InputMaybe<Scalars["String"]["input"]>;
  cashback?: InputMaybe<CashBackInput>;
  categoryId?: InputMaybe<Scalars["ID"]["input"]>;
  colors?: InputMaybe<Array<Scalars["String"]["input"]>>;
  condition?: InputMaybe<ProductCondition>;
  description?: InputMaybe<Array<StringTranslationField>>;
  discount?: InputMaybe<DiscountInput>;
  external_link?: InputMaybe<Scalars["String"]["input"]>;
  id: Scalars["ID"]["input"];
  oldPresentations: Array<ProductPresentationInput>;
  presentations?: InputMaybe<Array<Scalars["Upload"]["input"]>>;
  price?: InputMaybe<Scalars["Float"]["input"]>;
  sizes?: InputMaybe<Array<ProductSize>>;
  stock?: InputMaybe<Scalars["Int"]["input"]>;
  thumbnail?: InputMaybe<Scalars["String"]["input"]>;
  title?: InputMaybe<Array<StringTranslationField>>;
  type?: InputMaybe<ProductType>;
  vat?: InputMaybe<Scalars["Float"]["input"]>;
  visibility?: InputMaybe<VisibilityEnum>;
};

export type UpdateProductReviewInput = {
  id: Scalars["ID"]["input"];
  message?: InputMaybe<Scalars["String"]["input"]>;
  productId?: InputMaybe<Scalars["ID"]["input"]>;
  rate?: InputMaybe<Scalars["Float"]["input"]>;
};

export type UpdateProfessionInput = {
  id: Scalars["ID"]["input"];
  sortOrder?: InputMaybe<Scalars["Int"]["input"]>;
  status?: InputMaybe<ProfessionStatus>;
  title?: InputMaybe<Scalars["String"]["input"]>;
};

export type UpdateProfileAdminInput = {
  accountId?: InputMaybe<Scalars["ID"]["input"]>;
  bio?: InputMaybe<Scalars["String"]["input"]>;
  gender?: InputMaybe<ProfileReachedGender>;
  photo?: InputMaybe<Scalars["String"]["input"]>;
  profession?: InputMaybe<Scalars["String"]["input"]>;
  userId?: InputMaybe<Scalars["String"]["input"]>;
  username?: InputMaybe<Scalars["String"]["input"]>;
  visibility?: InputMaybe<ProfileVisibility>;
};

export type UpdateProfileInput = {
  bio?: InputMaybe<Scalars["String"]["input"]>;
  gender?: InputMaybe<ProfileReachedGender>;
  photo?: InputMaybe<Scalars["String"]["input"]>;
  profession?: InputMaybe<Scalars["String"]["input"]>;
  userId: Scalars["String"]["input"];
  username?: InputMaybe<Scalars["String"]["input"]>;
  visibility?: InputMaybe<ProfileVisibility>;
};

export type UpdateRequiredActionInput = {
  /** Example field (placeholder) */
  exampleField?: InputMaybe<Scalars["Int"]["input"]>;
  id: Scalars["Int"]["input"];
};

export type UpdateRestaurantMenuDishInput = {
  id: Scalars["ID"]["input"];
  ingredients: Array<TranslationTextArrayInput>;
  name: Array<TranslationTextInput>;
  price: Scalars["Int"]["input"];
  thumbnail: Scalars["String"]["input"];
};

export type UpdateRestaurantMenuInput = {
  dishs: Array<UpdateRestaurantMenuDishInput>;
  id: Scalars["ID"]["input"];
  name: Array<TranslationTextInput>;
};

export type UpdateSellerAccountAdminInput = {
  accountType?: InputMaybe<RegisterAccountType>;
  birthDate?: InputMaybe<Scalars["String"]["input"]>;
  email?: InputMaybe<Scalars["String"]["input"]>;
  firstName?: InputMaybe<Scalars["String"]["input"]>;
  gender?: InputMaybe<AccountGenderEnum>;
  id: Scalars["ID"]["input"];
  lastName?: InputMaybe<Scalars["String"]["input"]>;
  password?: InputMaybe<Scalars["String"]["input"]>;
  phone?: InputMaybe<Scalars["String"]["input"]>;
};

export type UpdateServiceCategoryInput = {
  description?: InputMaybe<TranslationTextInput>;
  filters?: InputMaybe<Array<ServiceCategoryFilterInput>>;
  id: Scalars["String"]["input"];
  metaTagDescription?: InputMaybe<TranslationTextInput>;
  metaTagKeywords?: InputMaybe<TranslationTextInput>;
  metaTagTitle?: InputMaybe<TranslationTextInput>;
  name?: InputMaybe<Array<TranslationTextInput>>;
  seo?: InputMaybe<TranslationTextInput>;
  sortOrder?: InputMaybe<Scalars["Int"]["input"]>;
  status?: InputMaybe<ServiceCategoryStatus>;
  thumbnail?: InputMaybe<Scalars["String"]["input"]>;
  type?: InputMaybe<ServiceType>;
};

export type UpdateServiceInput = {
  adaptedFor?: InputMaybe<Array<ServiceAdaptation>>;
  airCondition?: InputMaybe<Scalars["Boolean"]["input"]>;
  availableAppointments?: InputMaybe<Array<Scalars["String"]["input"]>>;
  bathrooms?: InputMaybe<Scalars["Int"]["input"]>;
  beds?: InputMaybe<Scalars["Int"]["input"]>;
  brand?: InputMaybe<Scalars["String"]["input"]>;
  cancelable?: InputMaybe<Scalars["Boolean"]["input"]>;
  cancelationPolicy?: InputMaybe<ServiceCancelationType>;
  cleaningFee?: InputMaybe<Scalars["Float"]["input"]>;
  dailyPrice?: InputMaybe<Scalars["Boolean"]["input"]>;
  dailyPrices?: InputMaybe<ServiceDailyPricesInput>;
  deposit?: InputMaybe<Scalars["Boolean"]["input"]>;
  depositAmount?: InputMaybe<Scalars["Int"]["input"]>;
  description?: InputMaybe<Array<TranslationTextInput>>;
  duration?: InputMaybe<Scalars["Int"]["input"]>;
  extras?: InputMaybe<Array<ServiceExtraInput>>;
  gpsAvailable?: InputMaybe<Scalars["Boolean"]["input"]>;
  hashtags?: InputMaybe<Array<Scalars["String"]["input"]>>;
  id: Scalars["String"]["input"];
  includedAmenities?: InputMaybe<Array<TranslationTextInput>>;
  ingredients?: InputMaybe<Array<TranslationTextArrayInput>>;
  isExternal?: InputMaybe<Scalars["Boolean"]["input"]>;
  lugaggeCapacity?: InputMaybe<Scalars["Int"]["input"]>;
  maxSpeedInKm?: InputMaybe<Scalars["Int"]["input"]>;
  measurements?: InputMaybe<ServicePropertyMeasurementsInput>;
  menuType?: InputMaybe<RestaurantDishType>;
  model?: InputMaybe<Scalars["String"]["input"]>;
  name?: InputMaybe<Array<TranslationTextInput>>;
  num_of_rooms?: InputMaybe<Scalars["Int"]["input"]>;
  policies?: InputMaybe<Array<ServicePolicyTranslatedInput>>;
  popularAmenities?: InputMaybe<Array<TranslationTextInput>>;
  price?: InputMaybe<Scalars["Float"]["input"]>;
  propertyType?: InputMaybe<RentalPropertyType>;
  restriction?: InputMaybe<Array<ServiceRestriction>>;
  seats?: InputMaybe<Scalars["Int"]["input"]>;
  sessionDurationMins?: InputMaybe<Scalars["Int"]["input"]>;
  speakingLanguages?: InputMaybe<Array<DoctorSpeakingLanguage>>;
  specialityId?: InputMaybe<Scalars["ID"]["input"]>;
  thumbnail?: InputMaybe<Scalars["Upload"]["input"]>;
  treatmentCategoryId?: InputMaybe<Scalars["ID"]["input"]>;
  typeOfPlace?: InputMaybe<RentalTypeOfPlace>;
  units?: InputMaybe<Scalars["Int"]["input"]>;
  vat?: InputMaybe<Scalars["Float"]["input"]>;
  vehicleCategoryId?: InputMaybe<Scalars["String"]["input"]>;
  windows?: InputMaybe<Scalars["Int"]["input"]>;
};

export type UpdateShippingAddressInput = {
  firstname?: InputMaybe<Scalars["String"]["input"]>;
  id: Scalars["ID"]["input"];
  instractions?: InputMaybe<Scalars["String"]["input"]>;
  lastname?: InputMaybe<Scalars["String"]["input"]>;
  lat?: InputMaybe<Scalars["Float"]["input"]>;
  lng?: InputMaybe<Scalars["Float"]["input"]>;
  location?: InputMaybe<LocationInput>;
  ownerId?: InputMaybe<Scalars["ID"]["input"]>;
  phone?: InputMaybe<Scalars["String"]["input"]>;
  zipCode?: InputMaybe<Scalars["String"]["input"]>;
};

export type UpdateShippingRuleGeoZoneInput = {
  country?: InputMaybe<Scalars["String"]["input"]>;
  id: Scalars["String"]["input"];
  zone?: InputMaybe<Scalars["String"]["input"]>;
};

export type UpdateShippingRuleInput = {
  cost?: InputMaybe<Scalars["Float"]["input"]>;
  countries?: InputMaybe<Array<ShippingCountryInput>>;
  deliveryTimeRange?: InputMaybe<ShippingDeliveryTimeRangeInput>;
  destination?: InputMaybe<ShippingDestination>;
  id: Scalars["ID"]["input"];
  name?: InputMaybe<Scalars["String"]["input"]>;
  shippingCompanyName?: InputMaybe<Scalars["String"]["input"]>;
  shippingType?: InputMaybe<ShippingType>;
};

export type UpdateShippingTypeRuleInput = {
  description?: InputMaybe<Scalars["String"]["input"]>;
  id: Scalars["String"]["input"];
  name?: InputMaybe<Scalars["String"]["input"]>;
  type?: InputMaybe<ShippingType>;
  zones?: InputMaybe<Array<UpdateShippingRuleGeoZoneInput>>;
};

export type UpdateSiteInformationInput = {
  description?: InputMaybe<Scalars["String"]["input"]>;
  id: Scalars["ID"]["input"];
  route?: InputMaybe<Scalars["String"]["input"]>;
  slug?: InputMaybe<Scalars["String"]["input"]>;
  sortOrder?: InputMaybe<Scalars["Int"]["input"]>;
  title?: InputMaybe<Scalars["String"]["input"]>;
};

export type UpdateSiteSocialInput = {
  socialLinks: Array<UpdateSocialLink>;
};

export type UpdateSocialLink = {
  label: Scalars["String"]["input"];
  link: Scalars["String"]["input"];
  placements: Array<Scalars["String"]["input"]>;
};

export type UpdateTaxRateInput = {
  appliedOnCountryIds?: InputMaybe<Array<Scalars["String"]["input"]>>;
  id: Scalars["ID"]["input"];
  percent?: InputMaybe<Scalars["Float"]["input"]>;
  title?: InputMaybe<Scalars["String"]["input"]>;
};

export type UpdateUserCookiesSettingsInput = {
  ids: Array<Scalars["ID"]["input"]>;
};

export type UpdateUserLocationInput = {
  lat: Scalars["Float"]["input"];
  lon: Scalars["Float"]["input"];
};

export type UpdateUserShopInput = {
  banner?: InputMaybe<Scalars["String"]["input"]>;
  businessType?: InputMaybe<BusinessType>;
  description?: InputMaybe<Array<TranslationTextInput>>;
  email?: InputMaybe<Scalars["String"]["input"]>;
  hashtags?: InputMaybe<Array<Scalars["String"]["input"]>>;
  images?: InputMaybe<Array<Scalars["String"]["input"]>>;
  location?: InputMaybe<LocationInput>;
  name?: InputMaybe<Array<TranslationTextInput>>;
  payment_methods?: InputMaybe<Array<ShopPaymentMethod>>;
  phone?: InputMaybe<Scalars["String"]["input"]>;
  status?: InputMaybe<ShopStatus>;
  storeCategoryId?: InputMaybe<Scalars["String"]["input"]>;
  storeFor?: InputMaybe<Array<StoreFor>>;
  storeType?: InputMaybe<StoreType>;
  targetGenders?: InputMaybe<Array<TargetGenders>>;
  thumbnail?: InputMaybe<Scalars["String"]["input"]>;
  type?: InputMaybe<ServiceType>;
  userId: Scalars["String"]["input"];
  vat?: InputMaybe<VatSettingsPartialInput>;
  vidoes?: InputMaybe<Array<Scalars["String"]["input"]>>;
};

export type UpdateWeekdaysWorkingHoursInput = {
  fr?: InputMaybe<ServiceDayWorkingHoursInput>;
  mo?: InputMaybe<ServiceDayWorkingHoursInput>;
  sa?: InputMaybe<ServiceDayWorkingHoursInput>;
  su?: InputMaybe<ServiceDayWorkingHoursInput>;
  th?: InputMaybe<ServiceDayWorkingHoursInput>;
  tu?: InputMaybe<ServiceDayWorkingHoursInput>;
  we?: InputMaybe<ServiceDayWorkingHoursInput>;
};

export type UpdateWorkingScheduleInput = {
  specialDays?: InputMaybe<Array<SpecialDayWorkingHoursInput>>;
  weekdays?: InputMaybe<UpdateWeekdaysWorkingHoursInput>;
};

export type UserContact = {
  __typename?: "UserContact";
  gmail?: Maybe<Scalars["String"]["output"]>;
  outlook?: Maybe<Scalars["String"]["output"]>;
  whatsapp?: Maybe<Scalars["String"]["output"]>;
  yahoo?: Maybe<Scalars["String"]["output"]>;
};

export type UserCookiesSettings = {
  __typename?: "UserCookiesSettings";
  acceptedCookiesIds: Array<Scalars["String"]["output"]>;
  acceptedRequired: Scalars["Boolean"]["output"];
  id: Scalars["ID"]["output"];
  userId: Scalars["ID"]["output"];
};

export type UserSavedPost = {
  __typename?: "UserSavedPost";
  post: NewsfeedPost;
  postId: Scalars["ID"]["output"];
  postType: PostType;
};

export type UserSavedPostsGroup = {
  __typename?: "UserSavedPostsGroup";
  id: Scalars["ID"]["output"];
  posts: Array<NewsfeedPost>;
  userId: Scalars["ID"]["output"];
};

export type VatSettingsPartialInput = {
  VatID?: InputMaybe<Scalars["String"]["input"]>;
  location?: InputMaybe<LocationInput>;
};

export type Vehicle = {
  __typename?: "Vehicle";
  brand: Scalars["String"]["output"];
  cancelationPolicies: Array<ServiceCancelationPolicy>;
  id: Scalars["ID"]["output"];
  model: Scalars["String"]["output"];
  presentations: Array<ServicePresentation>;
  price: Scalars["Int"]["output"];
  properties: VehicleProperties;
  title: Scalars["String"]["output"];
};

export type VehicleService = {
  createdAt: Scalars["String"]["input"];
  id: Scalars["ID"]["output"];
  ownerId: Scalars["ID"]["output"];
  payment_methods: Array<ServicePaymentMethod>;
  rating: Scalars["Float"]["input"];
  totalReviews: Scalars["Int"]["input"];
  updatedAt: Scalars["String"]["input"];
  vat: Scalars["Float"]["input"];
};

export type VehicleProperties = {
  __typename?: "VehicleProperties";
  airCondition: Scalars["Boolean"]["output"];
  gpsAvailable: Scalars["Boolean"]["output"];
  lugaggeCapacity: Scalars["Int"]["output"];
  maxSpeedInKm: Scalars["Int"]["output"];
  seats: Scalars["Int"]["output"];
  windows: Scalars["Int"]["output"];
};

export type VerifyEmailDto = {
  verificationCode: Scalars["String"]["input"];
};

export enum VisibilityEnum {
  Hidden = "hidden",
  Public = "public",
}

export type WithdrawCurrency = {
  __typename?: "WithdrawCurrency";
  code: Scalars["String"]["output"];
  currency: Currency;
};

export type WithdrawInput = {
  amount: Scalars["Float"]["input"];
  methodId: Scalars["String"]["input"];
};

export enum WithdrawalAccountType {
  Buyer = "BUYER",
  Seller = "SELLER",
}

export type WithdrawalRequest = {
  __typename?: "WithdrawalRequest";
  amount: Scalars["Float"]["output"];
  financialAccount: FinancialAccount;
  financialAccountId: Scalars["String"]["output"];
  id: Scalars["ID"]["output"];
  processedAt: Scalars["String"]["output"];
  requestedAt: Scalars["String"]["output"];
  status: WithdrawalStatus;
  user: Account;
  userId: Scalars["ID"]["output"];
};
export type WishedItem = {
  __typeName?: "WishedItem";
  id: Scalars["ID"]["input"];
  itemId: Scalars["ID"]["input"];
  userId: Scalars["ID"]["input"];
};

export enum WithdrawalStatus {
  Pending = "pending",
  Processed = "processed",
  Refused = "refused",
}

export type Wisher = {
  __typename?: "Wisher";
  userId: Scalars["String"]["input"];
};

export type Wisherslist = {
  __typename?: "Wisherslist";
  id: Scalars["ID"]["input"];
  itemId: Scalars["ID"]["input"];
  sellerId: Scalars["ID"]["input"];
  wishers: Array<Wisher>;
  wishersCount: Scalars["Int"]["input"];
};

export type Wishlist = {
  __typename?: "Wishlist";
  id: Scalars["ID"]["input"];
  ownerId: Scalars["ID"]["input"];
  wishedItems: Array<WishlistItem>;
};

export type WishlistItem = {
  __typename?: "WishlistItem";
  itemId: Scalars["ID"]["output"];
  itemType: WishlistItemType;
  product?: Maybe<Product>;
  service?: Maybe<Service>;
};

export enum WishlistItemType {
  Product = "product",
  Service = "service",
}

export type WorkingSchedule = {
  __typename?: "WorkingSchedule";
  id: Scalars["ID"]["output"];
  specialDays: Array<SpecialDayWorkingHours>;
  weekdays: WeekdaysWorkingHours;
};

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

export enum ProfessionStatus {
  Active = "active",
  InActive = "inActive",
}

export enum UserNotificationEnum {
  on = "on",
  off = "off",
  iFollow = "iFollow",
}

export type UserNotificationSettings = {
  id: Scalars["String"]["input"];
  commentLike: UserNotificationEnum;
  mentions: UserNotificationEnum;
  postComment: UserNotificationEnum;
  postReaction: UserNotificationEnum;
};

export type UpdateBeautyCenterAdminInput = {
  beauty_center_typeId?: InputMaybe<Scalars["ID"]["input"]>;
  cancelationPolicies?: InputMaybe<Array<ServiceCancelationPolicyInput>>;
  id: Scalars["ID"]["input"];
  payment_methods?: InputMaybe<Array<ServicePaymentMethod>>;
  policies?: InputMaybe<Array<ServicePolicyTranslatedInput>>;
  presentations?: InputMaybe<Array<ServicePresentationInput>>;
  serviceMetaInfo?: InputMaybe<Array<ServiceMetaInfoTranslationInput>>;
  title?: InputMaybe<Array<TranslationTextInput>>;
  treatments?: InputMaybe<Array<UpdateBeautyCenterTreatmentInput>>;
  type_of_seller?: InputMaybe<ServiceTypeOfSeller>;
  vat?: InputMaybe<Scalars["Float"]["input"]>;
};

export type UpdateHealthCenterAdminInput = {
  cancelationPolicies?: InputMaybe<Array<ServiceCancelationPolicyInput>>;
  id: Scalars["ID"]["input"];
  payment_methods?: InputMaybe<Array<ServicePaymentMethod>>;
  policies?: InputMaybe<Array<ServicePolicyTranslatedInput>>;
  presentations?: InputMaybe<Array<ServicePresentationInput>>;
  serviceMetaInfo?: InputMaybe<Array<ServiceMetaInfoTranslationInput>>;
  status?: InputMaybe<ServiceStatus>;
  vat?: InputMaybe<Scalars["Float"]["input"]>;
};

export type UpdateHotelAdminInput = {
  id: Scalars["ID"]["input"];
  location?: InputMaybe<ServiceLocationInput>;
  policies?: InputMaybe<Array<ServicePolicyTranslatedInput>>;
  presentations?: InputMaybe<Array<ServicePresentationInput>>;
  rooms?: InputMaybe<Array<UpdateHotelRoomAdminInput>>;
  serviceMetaInfo?: InputMaybe<Array<ServiceMetaInfoTranslationInput>>;
};

export type UpdateRestaurantAdminInput = {
  cuisinesTypeId?: InputMaybe<Scalars["ID"]["input"]>;
  dishs?: InputMaybe<Array<UpdateRestaurantMenuDishInput>>;
  establishmentTypeId?: InputMaybe<Scalars["ID"]["input"]>;
  id: Scalars["ID"]["input"];
  location?: InputMaybe<ServiceLocationInput>;
  menus?: InputMaybe<Array<UpdateRestaurantMenuInput>>;
  michelin_guide_stars?: InputMaybe<Scalars["Int"]["input"]>;
  payment_methods?: InputMaybe<Array<ServicePaymentMethod>>;
  policies?: InputMaybe<Array<ServicePolicyTranslatedInput>>;
  presentations?: InputMaybe<Array<ServicePresentationInput>>;
  serviceMetaInfo?: InputMaybe<Array<ServiceMetaInfoTranslationInput>>;
  setting_and_ambianceId?: InputMaybe<Scalars["ID"]["input"]>;
  status?: InputMaybe<ServiceStatus>;
  vat?: InputMaybe<Scalars["Int"]["input"]>;
};

export type UpdateVehicleAdminInput = {
  brand?: InputMaybe<Scalars["String"]["input"]>;
  cancelationPolicies?: InputMaybe<Array<ServiceCancelationPolicyInput>>;
  id: Scalars["ID"]["input"];
  insurance?: InputMaybe<Scalars["Float"]["input"]>;
  model?: InputMaybe<Scalars["String"]["input"]>;
  presentations?: InputMaybe<Array<ServicePresentationInput>>;
  price?: InputMaybe<Scalars["Float"]["input"]>;
  properties?: InputMaybe<CreateVehiclePropertiesInput>;
  title?: InputMaybe<Array<TranslationTextInput>>;
  typeId?: InputMaybe<Scalars["ID"]["input"]>;
};
