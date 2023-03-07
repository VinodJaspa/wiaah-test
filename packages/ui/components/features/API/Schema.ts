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
  Membership: Membership;
  balance: Balance;
  companyRegisterationNumber?: Maybe<Scalars["String"]>;
  createdAt: Scalars["DateTime"];
  email: Scalars["String"];
  firstName: Scalars["String"];
  id: Scalars["ID"];
  ips: Array<Scalars["String"]>;
  lastActiveAt: Scalars["String"];
  lastName: Scalars["String"];
  membership?: Maybe<Membership>;
  membershipId?: Maybe<Scalars["ID"]>;
  phone?: Maybe<Scalars["String"]>;
  photo?: Maybe<Scalars["String"]>;
  profile?: Maybe<Profile>;
  shop: Shop;
  status: AccountStatus;
  stripeId?: Maybe<Scalars["String"]>;
  subscribedPlan: MembershipSubscription;
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
  Approved = "approved",
  Pending = "pending",
  Rejected = "rejected",
}

export type AccountInputData = {
  __typename?: "AccountInputData";
  firstName: Scalars["String"];
  lastName: Scalars["String"];
  password: Scalars["String"];
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

export type Action = {
  __typename?: "Action";
  attachment: Attachment;
  comments: Scalars["Int"];
  commentsVisibility: CommentsVisibility;
  id: Scalars["ID"];
  location: PostLocation;
  reactionNum: Scalars["Int"];
  shares: Scalars["Int"];
  userId: Scalars["ID"];
  visibility: PostVisibility;
};

export enum ActiveStatus {
  Active = "active",
  DoNotDisturb = "doNotDisturb",
  Idle = "idle",
  InActive = "inActive",
}

export type AddContactInput = {
  gmail?: Maybe<Scalars["String"]>;
  outlook?: Maybe<Scalars["String"]>;
  whatsapp?: Maybe<Scalars["String"]>;
  yahoo?: Maybe<Scalars["String"]>;
};

export type AddShoppingCartProductItemInput = {
  itemId: Scalars["ID"];
  quantity: Scalars["Int"];
  shippingRuleId: Scalars["ID"];
};

export type AddWishlistItemInput = {
  itemId: Scalars["ID"];
  itemType: WishlistItemType;
  sellerId: Scalars["ID"];
};

export type AdminCreateAdminAccountInput = {
  birthDate: Scalars["String"];
  confirmPassword: Scalars["String"];
  email: Scalars["String"];
  firstName: Scalars["String"];
  lastName: Scalars["String"];
  password: Scalars["String"];
  photo: Scalars["String"];
  type: StaffAccountType;
};

export type AdminDeleteServiceInput = {
  deletionReason: Scalars["String"];
  id: Scalars["ID"];
};

export type AdminGetAccountProductsInput = {
  accountId: Scalars["ID"];
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

export type AdminGetBookingsInput = {
  buyer?: Maybe<Scalars["String"]>;
  dateAdded?: Maybe<Scalars["String"]>;
  id?: Maybe<Scalars["String"]>;
  pagination: GqlPaginationInput;
  seller?: Maybe<Scalars["String"]>;
  status?: Maybe<BookedServiceStatus>;
  total?: Maybe<Scalars["Float"]>;
  type?: Maybe<Scalars["String"]>;
};

export type AdminGetContentCommentsInput = {
  contentId: Scalars["ID"];
  contentType: ContentHostType;
  pagination: GqlPaginationInput;
};

export type AdminGetCurrenciesInput = {
  code?: Maybe<Scalars["String"]>;
  enabled?: Maybe<Scalars["Boolean"]>;
  pagination: GqlPaginationInput;
  rate?: Maybe<Scalars["Float"]>;
  title?: Maybe<Scalars["String"]>;
};

export type AdminGetDesignsInput = {
  name?: Maybe<Scalars["String"]>;
  pagination: GqlPaginationInput;
  placement?: Maybe<DesignPlacement>;
  type?: Maybe<DesignType>;
};

export type AdminGetLanguagesInput = {
  code?: Maybe<Scalars["String"]>;
  locale?: Maybe<Scalars["String"]>;
  name?: Maybe<Scalars["String"]>;
  pagination: GqlPaginationInput;
  sortOrder?: Maybe<Scalars["Int"]>;
};

export type AdminGetMembershipsInput = {
  name?: Maybe<Scalars["String"]>;
  pagination: GqlPaginationInput;
  sortOrder?: Maybe<Scalars["Int"]>;
};

export type AdminGetMembersipSubscriptionInput = {
  expiryDate?: Maybe<Scalars["String"]>;
  name?: Maybe<Scalars["String"]>;
  nextPaymentDate?: Maybe<Scalars["String"]>;
  pagination: GqlPaginationInput;
  status?: Maybe<MembershipSubscriptionStatus>;
  username?: Maybe<Scalars["String"]>;
};

export type AdminGetProfessionInput = {
  accounts?: Maybe<Scalars["Int"]>;
  name?: Maybe<Scalars["String"]>;
  pagination: GqlPaginationInput;
};

export type AdminGetReturnedOrdersInput = {
  buyerName?: Maybe<Scalars["String"]>;
  pagination: GqlPaginationInput;
  price?: Maybe<Scalars["Float"]>;
  productName?: Maybe<Scalars["String"]>;
  qty?: Maybe<Scalars["Int"]>;
  reason?: Maybe<Scalars["String"]>;
  sellerName?: Maybe<Scalars["String"]>;
  shippingAmount?: Maybe<Scalars["Float"]>;
};

export type AdminGetSellerSalesInput = {
  accountId: Scalars["String"];
  pagination: GqlPaginationInput;
};

export type AdminGetShippingGeoZoneRulesInput = {
  description?: Maybe<Scalars["String"]>;
  name?: Maybe<Scalars["String"]>;
  pagination: GqlPaginationInput;
};

export type AdminGetSiteInformationsInput = {
  name?: Maybe<Scalars["String"]>;
  pagination: GqlPaginationInput;
  sortOrder?: Maybe<Scalars["Int"]>;
};

export type AdminGetStaffAccountsInput = {
  email?: Maybe<Scalars["String"]>;
  lastActivity?: Maybe<Scalars["String"]>;
  name?: Maybe<Scalars["String"]>;
  pagination: GqlPaginationInput;
  role?: Maybe<StaffAccountType>;
  status?: Maybe<AccountStatus>;
};

export type AdminGetTaxRatesInput = {
  name?: Maybe<Scalars["String"]>;
  pagination: GqlPaginationInput;
  rate?: Maybe<Scalars["Float"]>;
};

export type AdminGetUserFinancialAccounts = {
  accountId: Scalars["String"];
};

export type AdminGetUserReturnedOrdersInput = {
  accountId: Scalars["ID"];
  pagination: GqlPaginationInput;
};

export type AdminGetUserWishlistInput = {
  accountId: Scalars["String"];
  pagination: GqlPaginationInput;
};


export type AdminSendMailToUsersInput = {
  message: Scalars["String"];
  subject: Scalars["String"];
  userType: MailUserType;
};

export type AdminUpdateAdminAccountInput = {
  birthDate?: Maybe<Scalars["String"]>;
  confirmPassword?: Maybe<Scalars["String"]>;
  email?: Maybe<Scalars["String"]>;
  firstName?: Maybe<Scalars["String"]>;
  id: Scalars["ID"];
  lastName?: Maybe<Scalars["String"]>;
  password?: Maybe<Scalars["String"]>;
  photo?: Maybe<Scalars["String"]>;
  type?: Maybe<StaffAccountType>;
};

export type Affiliation = {
  __typename?: "Affiliation";
  commision: Scalars["Float"];
  createdAt: Scalars["DateTime"];
  expireAt: Scalars["DateTime"];
  id: Scalars["ID"];
  itemId: Scalars["ID"];
  itemType: Scalars["String"];
  product?: Maybe<Product>;
  seller: Account;
  sellerId: Scalars["ID"];
  service?: Maybe<Service>;
  status: AffiliationStatus;
  updatedAt: Scalars["DateTime"];
};

export type AffiliationPost = {
  __typename?: "AffiliationPost";
  affiliation: Affiliation;
  affiliationId: Scalars["ID"];
  comments: Scalars["Int"];
  commentsVisibility: CommentsVisibility;
  createdAt: Scalars["String"];
  id: Scalars["ID"];
  location?: Maybe<PostLocation>;
  reactionNum: Scalars["Int"];
  shares: Scalars["Int"];
  updatedAt: Scalars["String"];
  user?: Maybe<Account>;
  userId: Scalars["ID"];
  views: Scalars["Int"];
  visibility: PostVisibility;
};

export type AffiliationPurchase = {
  __typename?: "AffiliationPurchase";
  affiliation: Affiliation;
  affiliationId: Scalars["ID"];
  affiliator: Account;
  affiliatorId: Scalars["ID"];
  createdAt: Scalars["DateTime"];
  id: Scalars["ID"];
  itemId: Scalars["ID"];
  itemType: Scalars["String"];
  paidCommissionAmount: Scalars["Float"];
  paidCommissionPercent: Scalars["Float"];
  product?: Maybe<Product>;
  purchaser: Account;
  purchaserId: Scalars["ID"];
  seller: Account;
  sellerId: Scalars["ID"];
  service?: Maybe<Service>;
};

export enum AffiliationStatus {
  Active = "active",
  InActive = "inActive",
}

export type ApplyVoucherInput = {
  voucherCode: Scalars["String"];
};

export type AskForRefundInput = {
  amount?: Maybe<Scalars["Float"]>;
  fullAmount?: Maybe<Scalars["Boolean"]>;
  id: Scalars["ID"];
  orderItemId: Scalars["ID"];
  qty: Scalars["Int"];
  reason?: Maybe<Scalars["String"]>;
  type: RefundType;
};

export type Attachment = {
  __typename?: "Attachment";
  marketingTags: Array<MarketingTag>;
  src: Scalars["String"];
  type: AttachmentType;
};

export type AttachmentInput = {
  marketingTags: Array<AttachmentMarketingTagInput>;
  src: Scalars["String"];
  type: AttachmentType;
};

export type AttachmentMarketingTagInput = {
  id: Scalars["String"];
  type: MarketingTagType;
  x: Scalars["Float"];
  y: Scalars["Float"];
};

export enum AttachmentType {
  Img = "img",
  Text = "text",
  Vid = "vid",
}

export type Balance = {
  __typename?: "Balance";
  allTimeEarnings: Scalars["Float"];
  balanceCurrency: Scalars["String"];
  cashbackBalance: Scalars["Float"];
  convertedCashbackBalance: Scalars["Float"];
  id: Scalars["ID"];
  ownerId: Scalars["ID"];
  pendingBalance: Scalars["Float"];
  withdrawableBalance: Scalars["Float"];
};

export type BanCitiesInput = {
  citiesIds: Array<Scalars["ID"]>;
};

export type BannedCity = {
  __typename?: "BannedCity";
  bannedFor: Scalars["String"];
  city: City;
  cityId: Scalars["ID"];
  id: Scalars["ID"];
};

export type BannedCountry = {
  __typename?: "BannedCountry";
  cities: Array<BannedCity>;
  country: Country;
  id: Scalars["ID"];
  isoCode: Scalars["String"];
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
  treatments: Array<Treatment>;
  type_of_seller: ServiceTypeOfSeller;
  updatedAt: Scalars["DateTime"];
  vat: Scalars["Float"];
  workingHours?: Maybe<WorkingSchedule>;
};

export type BeautyCenterTreatmentCategory = {
  __typename?: "BeautyCenterTreatmentCategory";
  createdAt: Scalars["DateTime"];
  createdById: Scalars["ID"];
  id: Scalars["ID"];
  title: Scalars["String"];
  updatedAt: Scalars["DateTime"];
};

export type BillingAddress = {
  __typename?: "BillingAddress";
  address: Scalars["String"];
  address2: Scalars["String"];
  city: Scalars["String"];
  country: Scalars["String"];
  firstName: Scalars["String"];
  id: Scalars["ID"];
  lastName: Scalars["String"];
  ownerId: Scalars["ID"];
  phone: Scalars["String"];
  postalCode: Scalars["String"];
  state: Scalars["String"];
};

export type BillingAddressCollection = {
  __typename?: "BillingAddressCollection";
  billingAddresses: Array<BillingAddress>;
  id: Scalars["ID"];
  lastUsedId: Scalars["ID"];
  ownerId: Scalars["ID"];
};

export type Block = {
  __typename?: "Block";
  blockedAt: Scalars["DateTime"];
  blockedProfile?: Maybe<Profile>;
  blockedUserId: Scalars["ID"];
  id: Scalars["ID"];
};

export type BlockedUser = {
  __typename?: "BlockedUser";
  blockedAt: Scalars["DateTime"];
  blockedProfileId: Scalars["ID"];
  blockerProfileId: Scalars["ID"];
  id: Scalars["ID"];
};

export type BookBeautycenterServiceInput = {
  cancelationPolicyId: Scalars["ID"];
  checkin: Scalars["DateTime"];
  guests: Scalars["Int"];
  serviceId: Scalars["ID"];
  treatmentsIds: Array<Scalars["ID"]>;
};

export type BookHealthCenterServiceInput = {
  cancelationPolicyId: Scalars["ID"];
  checkin: Scalars["DateTime"];
  doctorId: Scalars["ID"];
  guests: Scalars["Int"];
  serviceId: Scalars["ID"];
};

export type BookHotelRoomInput = {
  cancelationPolicyId: Scalars["ID"];
  checkin: Scalars["DateTime"];
  checkout: Scalars["DateTime"];
  extrasIds: Array<Scalars["ID"]>;
  guests: Scalars["Int"];
  roomId: Scalars["ID"];
  serviceId: Scalars["ID"];
};

export type BookRestaurantInput = {
  cancelationPolicyId: Scalars["ID"];
  checkin: Scalars["DateTime"];
  dishsIds: Array<Scalars["ID"]>;
  duration: Scalars["Int"];
  guests: Scalars["Int"];
  serviceId: Scalars["ID"];
};

export type BookVehicleServiceInput = {
  cancelationPolicyId: Scalars["ID"];
  checkin: Scalars["DateTime"];
  guests: Scalars["Int"];
  serviceId: Scalars["ID"];
  treatmentsIds: Array<Scalars["ID"]>;
};

export type BookedService = {
  __typename?: "BookedService";
  beautyCenter?: Maybe<BeautyCenter>;
  buyer: Account;
  cancelationPolicyId: Scalars["ID"];
  cashback: Discount;
  cashbackId?: Maybe<Scalars["String"]>;
  checkin: Scalars["DateTime"];
  checkout?: Maybe<Scalars["DateTime"]>;
  discount: Cashback;
  discountId?: Maybe<Scalars["String"]>;
  dishs: Array<Dish>;
  dishsIds?: Maybe<Array<Scalars["ID"]>>;
  doctor: Doctor;
  doctorId?: Maybe<Scalars["ID"]>;
  duration?: Maybe<Scalars["Int"]>;
  extrasIds?: Maybe<Array<Scalars["ID"]>>;
  guests: Scalars["Int"];
  healthCenter?: Maybe<HealthCenter>;
  id: Scalars["ID"];
  ownerId: Scalars["ID"];
  payment?: Maybe<Scalars["String"]>;
  providerId: Scalars["ID"];
  restaurant?: Maybe<Restaurant>;
  room?: Maybe<HotelRoom>;
  roomId?: Maybe<Scalars["ID"]>;
  seller: Account;
  service: Service;
  serviceId: Scalars["ID"];
  status: BookedServiceStatus;
  treatments: Array<Treatment>;
  treatmentsIds?: Maybe<Array<Scalars["ID"]>>;
  type: Scalars["String"];
  vehicle?: Maybe<Vehicle>;
};

export enum BookedServiceStatus {
  CanceledByBuyer = "canceled_by_buyer",
  CanceledBySeller = "canceled_by_seller",
  Completed = "completed",
  Continuing = "continuing",
  Pending = "pending",
  Restitute = "restitute",
}

export type CartProduct = {
  __typename?: "CartProduct";
  id: Scalars["String"];
  product?: Maybe<Product>;
  productId: Scalars["ID"];
  shippingRule?: Maybe<ShippingRule>;
  shippingRuleId: Scalars["ID"];
};

export type CashBackInput = {
  amount: Scalars["Int"];
  type: CashbackType;
  units: Scalars["Int"];
};

export type Cashback = {
  __typename?: "Cashback";
  amount: Scalars["Int"];
  id: Scalars["ID"];
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

export type ChangePasswordInput = {
  confirmNewPassword: Scalars["String"];
  currentPassword: Scalars["String"];
  newPassword: Scalars["String"];
};

export type ChatMessage = {
  __typename?: "ChatMessage";
  attachments: Array<MessageAttachment>;
  content: Scalars["String"];
  createdAt: Scalars["DateTime"];
  id: Scalars["ID"];
  mentions: Array<Account>;
  mentionsUserIds: Array<Scalars["ID"]>;
  roomId: Scalars["ID"];
  updatedAt: Scalars["DateTime"];
  user: Account;
  userId: Scalars["ID"];
};

export type ChatRoom = {
  __typename?: "ChatRoom";
  createdAt: Scalars["DateTime"];
  id: Scalars["ID"];
  members: Array<Account>;
  membersUserIds: Array<Scalars["ID"]>;
  messages: Array<ChatMessage>;
  roomType: RoomTypes;
  unSeenMessages: Scalars["Int"];
  updatedAt: Scalars["DateTime"];
};

export type ChatRoomMessagesArgs = {
  args: GqlPaginationInput;
};

export type City = {
  __typename?: "City";
  code: Scalars["String"];
  country: Country;
  countryId: Scalars["ID"];
  id: Scalars["ID"];
  name: Scalars["String"];
};

export type Comment = {
  __typename?: "Comment";
  attachment: Attachment;
  author?: Maybe<Profile>;
  authorProfileId: Scalars["String"];
  commentedAt: Scalars["DateTime"];
  content: Scalars["String"];
  createdAt: Scalars["String"];
  hostId: Scalars["ID"];
  hostType: ContentHostType;
  id: Scalars["ID"];
  likes: Scalars["Int"];
  replies: Scalars["Int"];
  updatedAt: Scalars["String"];
  userId: Scalars["String"];
};

export type CommentMentionInput = {
  profileId: Scalars["ID"];
  userId: Scalars["ID"];
};

export enum CommentsVisibility {
  Hidden = "hidden",
  Public = "public",
}

export enum CommissionOn {
  ExternalClick = "external_click",
  Revenue = "revenue",
  Sale = "sale",
}

export enum CommissionType {
  Fixed = "fixed",
  Percentage = "percentage",
}

export type Community = {
  __typename?: "Community";
  action?: Maybe<Action>;
  id: Scalars["ID"];
  newsfeed?: Maybe<NewsfeedPost>;
  newsfeedPost?: Maybe<NewsfeedPost>;
  type: Scalars["String"];
};

export type ConfirmPasswordChangeInput = {
  confirmNewPassword: Scalars["String"];
  email: Scalars["String"];
  newPassword: Scalars["String"];
  verificationCode: Scalars["String"];
};

export enum ContentHostType {
  Action = "action",
  Comment = "comment",
  PostNewsfeed = "post_newsfeed",
  PostService = "post_service",
  PostShop = "post_shop",
  Story = "story",
}

export type ContentReaction = {
  __typename?: "ContentReaction";
  hostId: Scalars["ID"];
  id: Scalars["ID"];
  reactedAt: Scalars["DateTime"];
  reactedBy?: Maybe<Profile>;
  reactedByProfileId: Scalars["ID"];
  reactionType: ContentReactionType;
  userId: Scalars["ID"];
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
  hostId: Scalars["ID"];
  hostType: ContentHostType;
  id: Scalars["ID"];
  sharedAt: Scalars["DateTime"];
  sharedBy?: Maybe<Profile>;
  sharedByProfileId: Scalars["ID"];
  sharedByUserId: Scalars["ID"];
};

export type ContentSharePaginationResponse = {
  __typename?: "ContentSharePaginationResponse";
  data: Array<ContentShare>;
  hasMore: Scalars["Boolean"];
  total: Scalars["Int"];
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

export type Country = {
  __typename?: "Country";
  cities: Array<City>;
  code: Scalars["String"];
  id: Scalars["ID"];
  name: Scalars["String"];
};

export type CreateAccountInput = {
  accountType: RegisterAccountType;
  birthDate: Scalars["String"];
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

export type CreateActionInput = {
  attachment: AttachmentInput;
  commentsVisibility?: Maybe<CommentsVisibility>;
  location?: Maybe<PostLocationInput>;
};

export type CreateAffiliationInput = {
  commision: Scalars["Float"];
  expireAt: Scalars["String"];
  itemId: Scalars["ID"];
  itemType: Scalars["String"];
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

export type CreateBlockInput = {
  userId: Scalars["ID"];
};

export type CreateCategoryInput = {
  name: Scalars["String"];
  parantId?: Maybe<Scalars["ID"]>;
  sortOrder: Scalars["Int"];
  status: ProductCategoryStatus;
};

export type CreateCommentInput = {
  attachment?: Maybe<AttachmentInput>;
  authorProfileId: Scalars["ID"];
  authorUserId: Scalars["ID"];
  content: Scalars["String"];
  contentId: Scalars["ID"];
  contentType: ContentHostType;
  mentions: Array<CommentMentionInput>;
};

export type CreateContentShareInput = {
  contentId: Scalars["ID"];
  contentType: ContentHostType;
};

export type CreateFilterInput = {
  name: Array<StringTranslationField>;
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
  addressProofBill: Scalars["String"];
  dateOfBirth: Scalars["String"];
  firstName: Scalars["String"];
  fullAddress: Scalars["String"];
  id_back: Scalars["String"];
  id_front: Scalars["String"];
  lastName: Scalars["String"];
};

export type CreateLanguageInput = {
  code: Scalars["String"];
  enabled: Scalars["Boolean"];
  locale: Scalars["String"];
  name: Scalars["String"];
  sortOrder: Scalars["Int"];
};

export type CreateMaintenanceInput = {
  from: Scalars["String"];
  to: Scalars["String"];
  url: Scalars["String"];
};

export type CreateMembershipInput = {
  commissionOn: CommissionOn;
  includings: Array<MembershipIncludedItemInput>;
  name: Scalars["String"];
  recurring: Scalars["Float"];
  sortOrder: Scalars["Int"];
  turnover_rules: Array<MembershipTurnoverRuleInput>;
};

export type CreateMembershipPaymentIntentInput = {
  membershipId: Scalars["ID"];
};

export type CreateMessageAttachmentInput = {
  id: Scalars["ID"];
  src: Scalars["String"];
  type: MessageAttachmentType;
};

export type CreateMessageInput = {
  attachments?: Maybe<Array<CreateMessageAttachmentInput>>;
  content: Scalars["String"];
  roomId?: Maybe<Scalars["ID"]>;
  userId?: Maybe<Scalars["ID"]>;
};

export type CreateNewsfeedPostInput = {
  attachments: Array<AttachmentInput>;
  content: Scalars["String"];
  hashtags: Array<HashtagInput>;
  location?: Maybe<PostLocationInput>;
  tags: Array<PostTagInput>;
  title: Scalars["String"];
  visibility?: Maybe<PostVisibility>;
};

export type CreateProductInput = {
  attributes: Array<ProductAttributeInput>;
  brand: Scalars["String"];
  cashback: CashBackInput;
  categoryId: Scalars["ID"];
  condition: ProductCondition;
  description: StringTranslationField;
  discount: DiscountInput;
  presentations: Array<ProductPresentationInput>;
  price: Scalars["Float"];
  status?: Maybe<ProductStatus>;
  stock: Scalars["Int"];
  thumbnail: Scalars["String"];
  title: Array<StringTranslationField>;
  type: ProductType;
  vat: Scalars["Float"];
  visibility: VisibilityEnum;
};

export type CreateProductReviewInput = {
  message: Scalars["String"];
  productId: Scalars["ID"];
  rate: Scalars["Float"];
};

export type CreateProfessionInput = {
  sortOrder: Scalars["Int"];
  status: ProfessionStatus;
  title: Scalars["String"];
};

export type CreateProfileInput = {
  bio?: Maybe<Scalars["String"]>;
  photo: Scalars["String"];
  profession: Scalars["String"];
  username: Scalars["String"];
  visibility?: Maybe<ProfileVisibility>;
};

export type CreateReactionInput = {
  authorProfileId: Scalars["ID"];
  contentId: Scalars["ID"];
  contentType: ContentHostType;
};

export type CreateReportInput = {
  contentId: Scalars["ID"];
  message: Scalars["String"];
  type: ReportType;
};

export type CreateRequiredActionInput = {
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
  sortOrder: Scalars["Int"];
  thumbnail: Scalars["String"];
};

export type CreateShippingAddressInput = {
  firstname: Scalars["String"];
  instractions?: Maybe<Scalars["String"]>;
  lastname: Scalars["String"];
  location: LocationInput;
  ownerId: Scalars["ID"];
  phone?: Maybe<Scalars["String"]>;
  zipCode?: Maybe<Scalars["String"]>;
};

export type CreateShippingGeoZone = {
  country: Scalars["String"];
  shippingTypeRuleId: Scalars["ID"];
  zone: Scalars["String"];
};

export type CreateShippingRuleGeoZoneInput = {
  country: Scalars["String"];
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
  zones: Array<CreateShippingRuleGeoZoneInput>;
};

export type CreateShopInput = {
  banner: Scalars["String"];
  description: Scalars["String"];
  location: LocationInput;
  name: Scalars["String"];
  storeType: Array<StoreType>;
  targetGenders: Array<TargetGenders>;
  typeOfSeller: TypeOfSeller;
  vat?: Maybe<VatSettingsPartialInput>;
  vendorType: Array<VendorType>;
};

export type CreateSiteInformationInput = {
  description: Scalars["String"];
  route: Scalars["String"];
  slug: Scalars["String"];
  sortOrder: Scalars["Int"];
  title: Scalars["String"];
};

export type CreateStoryInput = {
  affiliationPostId?: Maybe<Scalars["ID"]>;
  attachment?: Maybe<AttachmentInput>;
  content?: Maybe<Scalars["String"]>;
  newsfeedPostId?: Maybe<Scalars["ID"]>;
  productId?: Maybe<Scalars["ID"]>;
  servicePostId?: Maybe<Scalars["ID"]>;
  shopPostId?: Maybe<Scalars["ID"]>;
  tags?: Maybe<Array<PostTagInput>>;
};

export type CreateTaxRateInput = {
  appliedOnCountryIds: Array<Scalars["String"]>;
  percent: Scalars["Float"];
  title: Scalars["String"];
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

export type CreateVoucherInput = {
  amount: Scalars["Float"];
  code: Scalars["String"];
  currency: Scalars["String"];
};

export type Currency = {
  __typename?: "Currency";
  code: Scalars["String"];
  enabled: Scalars["Boolean"];
  exchangeRate: Scalars["Float"];
  id: Scalars["ID"];
  name: Scalars["String"];
  symbol: Scalars["String"];
  updatedAt: Scalars["DateTime"];
};

export type DeactivateVoucherInput = {
  code: Scalars["String"];
};

export type DeclineAppointmentInput = {
  id: Scalars["ID"];
  reason: Scalars["String"];
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

export type DeleteStoryInput = {
  storyId: Scalars["ID"];
};

export type DeleteTreatmentCategoriesInput = {
  ids: Array<Scalars["ID"]>;
};

export type DeleteTreatmentCategoryInput = {
  id: Scalars["ID"];
};

export type DeleteVoucherInput = {
  voucherCode: Scalars["String"];
};

export type Design = {
  __typename?: "Design";
  createdAt: Scalars["String"];
  id: Scalars["ID"];
  name: Scalars["String"];
  placement: Array<Scalars["String"]>;
  src: Scalars["String"];
  type: DesignType;
  updatedAt: Scalars["String"];
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
  amount: Scalars["Int"];
  id: Scalars["ID"];
  units: Scalars["Int"];
};

export type DiscountInput = {
  amount: Scalars["Int"];
  units: Scalars["Int"];
};

export type Dish = {
  __typename?: "Dish";
  id: Scalars["ID"];
  ingredients: Array<Scalars["String"]>;
  name: Scalars["String"];
  price: Scalars["Float"];
  thumbnail: Scalars["String"];
};

export type Doctor = {
  __typename?: "Doctor";
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

export type FinancialAccount = {
  __typename?: "FinancialAccount";
  financialId: Scalars["String"];
  id: Scalars["ID"];
  label: Scalars["String"];
  ownerId: Scalars["ID"];
  type: FinancialAccountType;
};

export enum FinancialAccountType {
  Stripe = "stripe",
}

export type Follow = {
  __typename?: "Follow";
  followedAt: Scalars["DateTime"];
  followerProfile?: Maybe<Profile>;
  followerProfileId: Scalars["ID"];
  followingProfile?: Maybe<Profile>;
  followingProfileId: Scalars["ID"];
  id: Scalars["ID"];
};

export type FollowProfileInput = {
  profileId: Scalars["String"];
};

export type ForgotPasswordEmailInput = {
  email: Scalars["String"];
};

export type FriendSuggestion = {
  __typename?: "FriendSuggestion";
  accounts: Array<Account>;
};

export type GetAccountDeletionRequestsInput = {
  dateAdded?: Maybe<Scalars["String"]>;
  email?: Maybe<Scalars["String"]>;
  pagination: GqlPaginationInput;
  status?: Maybe<AccountDeletionRequestStatus>;
  username?: Maybe<Scalars["String"]>;
};

export type GetAddableHashtagsInput = {
  pagination: GqlPaginationInput;
};

export type GetAdminFilteredNewsfeedPostsInput = {
  comments?: Maybe<Scalars["Int"]>;
  date?: Maybe<Scalars["String"]>;
  id?: Maybe<Scalars["String"]>;
  legend?: Maybe<Scalars["String"]>;
  likes?: Maybe<Scalars["Int"]>;
  pagination: GqlPaginationInput;
  shares?: Maybe<Scalars["Int"]>;
  username?: Maybe<Scalars["String"]>;
  views?: Maybe<Scalars["Int"]>;
};

export type GetAdminFilteredStoriesInput = {
  comments?: Maybe<Scalars["Int"]>;
  date?: Maybe<Scalars["String"]>;
  id?: Maybe<Scalars["String"]>;
  legend?: Maybe<Scalars["String"]>;
  likes?: Maybe<Scalars["Int"]>;
  shares?: Maybe<Scalars["Int"]>;
  username?: Maybe<Scalars["String"]>;
  views?: Maybe<Scalars["Int"]>;
};

export type GetAdminFitleredProductReviewsInput = {
  buyer?: Maybe<Scalars["String"]>;
  dateAdded?: Maybe<Scalars["String"]>;
  id?: Maybe<Scalars["String"]>;
  pagination: GqlPaginationInput;
  product?: Maybe<Scalars["String"]>;
  rating?: Maybe<Scalars["Int"]>;
  review?: Maybe<Scalars["String"]>;
  seller?: Maybe<Scalars["String"]>;
};

export type GetAdminPendingSellersInput = {
  CRN?: Maybe<Scalars["String"]>;
  dateCreated?: Maybe<Scalars["String"]>;
  email?: Maybe<Scalars["String"]>;
  name?: Maybe<Scalars["String"]>;
  pagination: GqlPaginationInput;
};

export type GetAffiliationHistoryInput = {
  pagination: GqlPaginationInput;
};

export type GetAffiliationPostInput = {
  id: Scalars["String"];
};

export type GetBannedCountriesAdminInput = {
  city?: Maybe<Scalars["String"]>;
  country?: Maybe<Scalars["String"]>;
  pagination: GqlPaginationInput;
  type: Scalars["String"];
};

export type GetBookingsHistoryAdminInput = {
  accountType: Scalars["String"];
  pagination: GqlPaginationInput;
  q: Scalars["String"];
  status?: Maybe<BookedServiceStatus>;
  userId: Scalars["ID"];
};

export type GetBookingsHistoryInput = {
  pagination: GqlPaginationInput;
  q: Scalars["String"];
  status?: Maybe<BookedServiceStatus>;
};

export type GetBuyersAccountsInput = {
  balance?: Maybe<Scalars["Float"]>;
  date?: Maybe<Scalars["String"]>;
  email?: Maybe<Scalars["String"]>;
  id?: Maybe<Scalars["String"]>;
  ip?: Maybe<Scalars["String"]>;
  name?: Maybe<Scalars["String"]>;
  pagination: GqlPaginationInput;
  status?: Maybe<AccountStatus>;
  visits?: Maybe<Scalars["Int"]>;
};

export type GetCititesInput = {
  countryid: Scalars["ID"];
  name: Scalars["String"];
};

export type GetCommunityPostsInput = {
  q: Scalars["String"];
};

export type GetContentCommentsInput = {
  cursor?: Maybe<Scalars["String"]>;
  id: Scalars["ID"];
  take?: Maybe<Scalars["Int"]>;
};

export type GetDesignByPlacementInput = {
  pagination: GqlPaginationInput;
  placement: DesignPlacement;
};

export type GetFilteredAffiliationHistoryInput = {
  affiliation_link?: Maybe<Scalars["String"]>;
  affiliator?: Maybe<Scalars["String"]>;
  commission?: Maybe<Scalars["Float"]>;
  money_generated?: Maybe<Scalars["Float"]>;
  pagination: GqlPaginationInput;
  price?: Maybe<Scalars["Float"]>;
  purchasedAfter?: Maybe<Scalars["String"]>;
  purchasedBefore?: Maybe<Scalars["String"]>;
  purchaser?: Maybe<Scalars["String"]>;
  seller?: Maybe<Scalars["String"]>;
  title?: Maybe<Scalars["String"]>;
};

export type GetFilteredAffiliationsInput = {
  commission?: Maybe<Scalars["Float"]>;
  createdAfter?: Maybe<Scalars["DateTime"]>;
  createdBefore?: Maybe<Scalars["DateTime"]>;
  link?: Maybe<Scalars["String"]>;
  pagination: GqlPaginationInput;
  price?: Maybe<Scalars["Float"]>;
  seller?: Maybe<Scalars["String"]>;
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

export type GetFilteredHashtagsInput = {
  createdAt?: Maybe<Scalars["String"]>;
  pagination: GqlPaginationInput;
  status?: Maybe<HashtagStatus>;
  tag?: Maybe<Scalars["String"]>;
  usage?: Maybe<Scalars["Int"]>;
};

export type GetFilteredNewsletterInput = {
  email?: Maybe<Scalars["String"]>;
  pagination: GqlPaginationInput;
};

export type GetFilteredOrdersInput = {
  buyer?: Maybe<Scalars["String"]>;
  date_from?: Maybe<Scalars["String"]>;
  date_to?: Maybe<Scalars["String"]>;
  id?: Maybe<Scalars["String"]>;
  pagination: GqlPaginationInput;
  payment_method?: Maybe<Scalars["String"]>;
  price?: Maybe<Scalars["Float"]>;
  qty?: Maybe<Scalars["Int"]>;
  seller?: Maybe<Scalars["String"]>;
  status?: Maybe<OrderStatusEnum>;
  total?: Maybe<Scalars["Float"]>;
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
  type?: Maybe<ProductType>;
  usageStatus?: Maybe<ProductUsageStatus>;
};

export type GetFilteredSellersAccountsInput = {
  balance?: Maybe<Scalars["Float"]>;
  city?: Maybe<Scalars["String"]>;
  country?: Maybe<Scalars["String"]>;
  date?: Maybe<Scalars["String"]>;
  email?: Maybe<Scalars["String"]>;
  id?: Maybe<Scalars["String"]>;
  ip?: Maybe<Scalars["String"]>;
  name?: Maybe<Scalars["String"]>;
  pagination: GqlPaginationInput;
  plan?: Maybe<Scalars["String"]>;
  products?: Maybe<Scalars["Int"]>;
  sales?: Maybe<Scalars["Int"]>;
  status?: Maybe<AccountStatus>;
  visits?: Maybe<Scalars["Int"]>;
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

export type GetFilteredVouchers = {
  currency?: Maybe<Scalars["String"]>;
  date?: Maybe<Scalars["String"]>;
  name?: Maybe<Scalars["String"]>;
  pagination: GqlPaginationInput;
  price?: Maybe<Scalars["Float"]>;
  status?: Maybe<VoucherStatus>;
  voucherNumber?: Maybe<Scalars["Int"]>;
};

export type GetFiltersInput = {
  name?: Maybe<Scalars["String"]>;
  sortOrder?: Maybe<Scalars["Int"]>;
};

export type GetHashtagNewsfeedPostsInput = {
  profileId: Scalars["ID"];
  tag: Scalars["String"];
  userId: Scalars["ID"];
};

export type GetHashtagTopServicePostsInput = {
  tag: Scalars["String"];
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

export type GetMessagesByRoomIdInput = {
  pagination: GqlCursorPaginationInput;
  roomId: Scalars["ID"];
};

export type GetMyAffiliationsInput = {
  pagination: GqlPaginationInput;
};

export type GetMyBlocklistInput = {
  pagination: GqlPaginationInput;
};

export type GetMyBookingsInput = {
  date: Scalars["String"];
  searchPeriod: MyBookingsSearchPeriod;
};

export type GetMyFriendSuggestionsInput = {
  pagination: GqlPaginationInput;
  q?: Maybe<Scalars["String"]>;
};

export type GetMyNewsfeedPostsInput = {
  pagination: GqlPaginationInput;
};

export type GetMyOrdersInput = {
  pagination: GqlPaginationInput;
  status?: Maybe<OrderStatusEnum>;
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
  distance: Scalars["Float"];
  lat: Scalars["Float"];
  lon: Scalars["Float"];
};

export type GetNewsfeedPostsByUserIdInput = {
  pagination: GqlPaginationInput;
  userId: Scalars["ID"];
};

export type GetPlaceSuggestionInput = {
  pagination: GqlPaginationInput;
};

export type GetProfileFollowersMetaInput = {
  pagination: GqlPaginationInput;
  profileId: Scalars["String"];
};

export type GetRecentStoriesInput = {
  pagination: GqlPaginationInput;
};

export type GetRecommendedAffiliationPostsInput = {
  pagination: GqlPaginationInput;
};

export type GetRecommendedServicePostsInput = {
  pagination: GqlPaginationInput;
  serviceType: Scalars["String"];
};

export type GetRefundableOrdersInput = {
  pagination: GqlPaginationInput;
};

export type GetReportsInput = {
  comments?: Maybe<Scalars["String"]>;
  id?: Maybe<Scalars["String"]>;
  legend?: Maybe<Scalars["String"]>;
  likes?: Maybe<Scalars["String"]>;
  pagination: GqlPaginationInput;
  publishDate?: Maybe<Scalars["String"]>;
  reason?: Maybe<Scalars["String"]>;
  shares?: Maybe<Scalars["String"]>;
  status?: Maybe<Scalars["String"]>;
  type?: Maybe<ReportType>;
  views?: Maybe<Scalars["String"]>;
};

export type GetRestaurantInput = {
  id: Scalars["ID"];
};

export type GetSalesDurningPeriodInput = {
  address?: Maybe<Scalars["String"]>;
  buyer?: Maybe<Scalars["String"]>;
  pagination: GqlPaginationInput;
  productName?: Maybe<Scalars["String"]>;
  qty?: Maybe<Scalars["Int"]>;
  searchPeriod?: Maybe<OrderSearchPeriod>;
  seller?: Maybe<Scalars["String"]>;
  status?: Maybe<OrderStatusEnum>;
};

export type GetShopRecommendedPostsInput = {
  q?: Maybe<Scalars["String"]>;
};

export type GetStorySeenByInput = {
  pagination: GqlPaginationInput;
  q?: Maybe<Scalars["String"]>;
  storyId: Scalars["ID"];
};

export type GetTopHashtagsInput = {
  pagination: GqlPaginationInput;
  q?: Maybe<Scalars["String"]>;
};

export type GetTransactionsAdminInput = {
  amount?: Maybe<Scalars["Float"]>;
  description?: Maybe<Scalars["String"]>;
  id?: Maybe<Scalars["String"]>;
  pagination?: Maybe<GqlPaginationInput>;
  seller?: Maybe<Scalars["String"]>;
  status?: Maybe<TransactionStatus>;
};

export type GetTransactionsInput = {
  pagination: GqlPaginationInput;
  status?: Maybe<TransactionStatus>;
};

export type GetUserActionsInput = {
  pagination: GqlPaginationInput;
  userId: Scalars["ID"];
};

export type GetUserAffiliationPostsInput = {
  pagination: GqlPaginationInput;
  userId: Scalars["ID"];
};

export type GetUserAffiliationsInput = {
  id: Scalars["ID"];
  pagination: GqlPaginationInput;
};

export type GetUserAffiliationsPurchasesInput = {
  id: Scalars["ID"];
  pagination: GqlPaginationInput;
};

export type GetUserOrders = {
  accountType: Scalars["String"];
  pagination: GqlPaginationInput;
  q: Scalars["String"];
  status?: Maybe<OrderStatusEnum>;
  userId: Scalars["String"];
};

export type GetUserProductPostsInput = {
  authorId: Scalars["ID"];
  pagination: GqlPaginationInput;
};

export type GetUserServicesPostsInput = {
  pagination: GqlCursorPaginationInput;
  userId: Scalars["ID"];
};

export type GetVehiclesInput = {
  pagination: GqlPaginationInput;
  q: Scalars["String"];
};

export type GetVouchersInput = {
  status?: Maybe<VoucherStatus>;
};

export type GetWithdrawalRequestsAdminInput = {
  accountType?: Maybe<WithdrawalAccountType>;
  amount?: Maybe<Scalars["Float"]>;
  email?: Maybe<Scalars["String"]>;
  id?: Maybe<Scalars["ID"]>;
  name?: Maybe<Scalars["String"]>;
  pagination: GqlPaginationInput;
  processedAt?: Maybe<Scalars["String"]>;
  requestedAt?: Maybe<Scalars["String"]>;
  shop?: Maybe<Scalars["String"]>;
  status?: Maybe<WithdrawalStatus>;
};

export type GqlCursorPaginationInput = {
  cursor?: Maybe<Scalars["String"]>;
  take: Scalars["Int"];
};

export type GqlPaginationInput = {
  page: Scalars["Int"];
  take: Scalars["Int"];
};

export type GqlStatusResponse = {
  __typename?: "GqlStatusResponse";
  code: Scalars["Int"];
  message?: Maybe<Scalars["String"]>;
  success: Scalars["Boolean"];
};

export type Hashtag = {
  __typename?: "Hashtag";
  createdAt: Scalars["DateTime"];
  createdBy: Account;
  createdById: Scalars["String"];
  id: Scalars["ID"];
  tag: Scalars["String"];
  updatedAt: Scalars["DateTime"];
  usage: Scalars["Int"];
};

export type HashtagInput = {
  tag: Scalars["String"];
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
  doctors?: Maybe<Array<Doctor>>;
  id: Scalars["ID"];
  name: Scalars["String"];
};

export type HideContentInput = {
  id: Scalars["ID"];
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

export type InvoiceRecord = {
  __typename?: "InvoiceRecord";
  id: Scalars["ID"];
  overdue: Scalars["Float"];
  paid: Scalars["Float"];
  period: Scalars["String"];
  total: Scalars["Float"];
  type: InvoiceRecordTypes;
  unPaid: Scalars["Float"];
};

export enum InvoiceRecordTypes {
  Day = "day",
  Month = "month",
  Year = "year",
}

export type Language = {
  __typename?: "Language";
  code: Scalars["String"];
  enabled: Scalars["Boolean"];
  id: Scalars["ID"];
  locale: Scalars["String"];
  name: Scalars["String"];
  sortOrder: Scalars["Int"];
};

export type LikeStoryInput = {
  storyId: Scalars["ID"];
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
  lat?: Maybe<Scalars["Float"]>;
  long?: Maybe<Scalars["Float"]>;
  state: Scalars["String"];
};

export type LoginDto = {
  email: Scalars["String"];
  password: Scalars["String"];
};

export type LoginWithOtpInput = {
  email: Scalars["String"];
  otp: Scalars["String"];
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
  from: Scalars["String"];
  id: Scalars["ID"];
  to: Scalars["String"];
  url: Scalars["String"];
};

export type MarketingTag = {
  __typename?: "MarketingTag";
  id: Scalars["ID"];
  product: Product;
  service: Service;
  type: MarketingTagType;
  x: Scalars["Float"];
  y: Scalars["Float"];
};

export enum MarketingTagType {
  Product = "product",
  Service = "service",
}

export type Membership = {
  __typename?: "Membership";
  commissionOn: CommissionOn;
  id: Scalars["ID"];
  includings: Array<MembershipIncludedItem>;
  name: Scalars["String"];
  priceId?: Maybe<Scalars["String"]>;
  recurring: Scalars["Float"];
  sortOrder: Scalars["Int"];
  turnover_rules: Array<MembershipTurnoverRule>;
};

export type MembershipIncludedItem = {
  __typename?: "MembershipIncludedItem";
  title: Scalars["String"];
};

export type MembershipIncludedItemInput = {
  title: Scalars["String"];
};

export type MembershipSubscription = {
  __typename?: "MembershipSubscription";
  endAt: Scalars["String"];
  membership: Membership;
  membershipId: Scalars["ID"];
  startAt: Scalars["String"];
  status: MembershipSubscriptionStatus;
  subscriber: Account;
  usage: Scalars["Float"];
  userId: Scalars["ID"];
};

export enum MembershipSubscriptionStatus {
  Active = "active",
  Expired = "expired",
  Pending = "pending",
}

export type MembershipTurnoverRule = {
  __typename?: "MembershipTurnoverRule";
  commission: Scalars["Float"];
  commissionType: CommissionType;
  id: Scalars["ID"];
  membershipId: Scalars["ID"];
  priceId?: Maybe<Scalars["String"]>;
  usage: Scalars["Float"];
};

export type MembershipTurnoverRuleInput = {
  commission: Scalars["Float"];
  commissionType: CommissionType;
  usage: Scalars["Float"];
};

export type MessageAttachment = {
  __typename?: "MessageAttachment";
  id: Scalars["ID"];
  src: Scalars["String"];
  type: MessageAttachmentType;
};

export enum MessageAttachmentType {
  Image = "image",
  Story = "story",
  VideoMessage = "videoMessage",
  VoiceMessage = "voiceMessage",
}

export type Mutation = {
  __typename?: "Mutation";
  AddWishlistItem: Scalars["Boolean"];
  BookBeautyCenterService: BookedService;
  BookHealthCenter: BookedService;
  BookHotelRoom: BookedService;
  BookRestaurant: BookedService;
  BookVehicle: BookedService;
  RemoveWishlistItem: Scalars["Boolean"];
  UpdateDesign: Scalars["Boolean"];
  acceptAccountDeletionRequest: Scalars["Boolean"];
  acceptAppointment: Scalars["Boolean"];
  acceptInsurancePayBackRequest: Scalars["Boolean"];
  acceptReceivedOrder: Scalars["Boolean"];
  acceptRefundRequest: Scalars["Boolean"];
  acceptRequestedOrder: Scalars["Boolean"];
  acceptSellerAccount: Scalars["Boolean"];
  activateRestaurant: Restaurant;
  addNewBillingAddress: BillingAddress;
  addProductToCart: CartProduct;
  adminCancelOrder: Scalars["Boolean"];
  adminCreateStaffAccount: Scalars["Boolean"];
  adminDeleteNewsfeedPost: Scalars["Boolean"];
  adminDeleteProduct: Scalars["Boolean"];
  adminDeleteProductReview: Scalars["Boolean"];
  adminDeleteService: Scalars["Boolean"];
  adminDeleteUserWishlistItem: Scalars["Boolean"];
  adminEditAccount: Account;
  adminLogin: GqlStatusResponse;
  adminRemvoeBlock: Scalars["Boolean"];
  adminUpdateAccountWorkingSchedule: WorkingSchedule;
  adminUpdateAffiliation: Scalars["Boolean"];
  adminUpdateProductReview: Scalars["Boolean"];
  adminUpdateServiceById: Scalars["Boolean"];
  adminUpdateStaffAccount: Scalars["Boolean"];
  applyVoucher: ShoppingCart;
  askForRefund: Scalars["Boolean"];
  banBuyersCities: Scalars["Boolean"];
  banSellersCities: Scalars["Boolean"];
  blockUser: Scalars["Boolean"];
  cancelServiceReservation: Scalars["Boolean"];
  changeMyNewsletterSettings: Scalars["Boolean"];
  changePassword: Scalars["Boolean"];
  changeUserNewsletterSettings: Scalars["Boolean"];
  clearBalance: Scalars["Boolean"];
  clearShoppingCart: ShoppingCart;
  clearVouchers: Scalars["Boolean"];
  createAction: Scalars["Boolean"];
  createBeautyCenter: BeautyCenter;
  createBeautyCenterTreatmentCategory: BeautyCenterTreatmentCategory;
  createCartPaymentIntent: PaymentIntent;
  createComment: Comment;
  createConnectedAccount: Scalars["String"];
  createFilter: Filter;
  createHealthCenter: HealthCenter;
  createHealthCenterSpeciality: HealthCenterSpecialty;
  createHotelService: Hotel;
  createInitialCurrencies: Array<Currency>;
  createLanguage: Scalars["Boolean"];
  createMaintenancePage: Scalars["Boolean"];
  createMembership: Scalars["Boolean"];
  createMembershipSubscriptionPaymentIntent: PaymentIntent;
  createNewAffiliationProduct: Affiliation;
  createNewProduct: Product;
  createNewsfeedPost: NewsfeedPost;
  createProductCategory: Category;
  createProfession: Scalars["Boolean"];
  createProfile: Profile;
  createReaction: Scalars["Boolean"];
  createRequiredAction: RequiredAction;
  createRestaurantService: Restaurant;
  createServiceCategory: ServiceCategory;
  createShippingAddress: Scalars["Boolean"];
  createShippingRule: ShippingRule;
  createShippingTypeRule: Scalars["Boolean"];
  createShippingTypeRuleGeoZone: Scalars["Boolean"];
  createShop: Shop;
  createSiteInformations: SiteInformation;
  createStory: Scalars["Boolean"];
  createTaxRate: Scalars["Boolean"];
  createVehicle: VehicleService;
  createVoucher: Voucher;
  deActivateVoucher: Voucher;
  declineAppointment: Scalars["Boolean"];
  declineSellerAccount: Scalars["Boolean"];
  deleteAffiliation: Affiliation;
  deleteBeautyCenter: Scalars["Boolean"];
  deleteBeautyCenterServices: Scalars["Boolean"];
  deleteBillingAddress: BillingAddress;
  deleteFilter: Filter;
  deleteMaintenancePage: Scalars["Boolean"];
  deleteMyProfile: Profile;
  deleteProduct: Product;
  deleteProductCategory: Category;
  deleteRestaurant: Restaurant;
  deleteShippingAddress: Scalars["Boolean"];
  deleteShippingRule: ShippingRule;
  deleteStory: Story;
  deleteVoucher: Scalars["Boolean"];
  disableComingSoon: Scalars["Boolean"];
  disableMaintenanceMode: Scalars["Boolean"];
  editAccount: Account;
  editNewsfeedPostAdmin: Scalars["Boolean"];
  enableComingSoon: Scalars["Boolean"];
  enableMaintenanceMode: Scalars["Boolean"];
  followProfile: Scalars["Boolean"];
  getMyAccount: Account;
  getProductVendorLink: Scalars["String"];
  hideContent: Scalars["Boolean"];
  likeStory: Scalars["Boolean"];
  login: GqlStatusResponse;
  loginAs: GqlStatusResponse;
  processWithdrawalRequest: Scalars["Boolean"];
  provideVVCPicture: Scalars["Boolean"];
  refuseAccountVerification: Scalars["Boolean"];
  refuseInsurancePayBackRequest: Scalars["Boolean"];
  register: Scalars["String"];
  rejectAccountDeletionRequest: Scalars["Boolean"];
  rejectReceivedOrder: Scalars["Boolean"];
  rejectRefundRequest: Scalars["Boolean"];
  rejectRequestedOrder: Scalars["Boolean"];
  removeAllShops: Scalars["Boolean"];
  removeComment: Comment;
  removeItemFromCart: Scalars["Boolean"];
  removeNewsfeedPost: NewsfeedPost;
  removeNewsletterSubscriber: Scalars["Boolean"];
  removeReaction: ContentReaction;
  removeReport: Scalars["Boolean"];
  removeRequiredAction: RequiredAction;
  removeReview: ProductReview;
  removeServiceCategory: ServiceCategory;
  reportContent: Scalars["Boolean"];
  requestAccountDeletion: Scalars["Boolean"];
  requestAccountVerification: Scalars["Boolean"];
  requestIdVerification: Scalars["String"];
  requestInsurancePayBack: Scalars["Boolean"];
  resendRegisterationCode: Scalars["Boolean"];
  resetPassword: Scalars["Boolean"];
  reviewProduct: ProductReview;
  sendFollowRequest: Scalars["Boolean"];
  sendGeneralMail: Scalars["Boolean"];
  sendMessage: ChatMessage;
  shareContent: ContentShare;
  suspenseAccount: Scalars["Boolean"];
  suspenseContent: Scalars["Boolean"];
  suspenseReportedContent: Scalars["Boolean"];
  unBanBuyersCities: Scalars["Boolean"];
  unBanSellersCities: Scalars["Boolean"];
  unFollow: Scalars["Boolean"];
  unblockUser: Scalars["Boolean"];
  updateAccountPrivacySettings: PrivacySettings;
  updateAffiliation: Affiliation;
  updateBeautyCenter: BeautyCenter;
  updateBeautyCenterAdmin: Scalars["Boolean"];
  updateBillingAddress: BillingAddress;
  updateComment: Comment;
  updateCurrenciesRates: Array<Currency>;
  updateCurrency: Scalars["Boolean"];
  updateFilter: Filter;
  updateHashtag: Hashtag;
  updateHealthCenter: HealthCenter;
  updateHealthCenterAdmin: Scalars["Boolean"];
  updateHotelAdmin: Scalars["Boolean"];
  updateLanguage: Scalars["Boolean"];
  updateMembership: Scalars["Boolean"];
  updateMyContact: Scalars["Boolean"];
  updateMyCookiesSettings: Scalars["Boolean"];
  updateMyPrivacySettings: PrivacySettings;
  updateMyProfile: Profile;
  updateMyShop: Shop;
  updateMyWorkingSchedule: WorkingSchedule;
  updateNewsfeedPost: NewsfeedPost;
  updateProduct: Product;
  updateProductAdmin: Scalars["Boolean"];
  updateProductCategory: Category;
  updateProfession: Scalars["Boolean"];
  updateProfile: Profile;
  updateRequiredAction: RequiredAction;
  updateRestaurant: Restaurant;
  updateRestaurantAdmin: Scalars["Boolean"];
  updateServiceCategory: ServiceCategory;
  updateShippingAddress: Scalars["Boolean"];
  updateShippingRule: ShippingRule;
  updateShippingTypeRule: Scalars["Boolean"];
  updateSiteInformations: SiteInformation;
  updateSocialLinks: Scalars["Boolean"];
  updateTaxRate: Scalars["Boolean"];
  updateTreatmentCategories: Array<BeautyCenterTreatmentCategory>;
  updateUserLocation: Scalars["Boolean"];
  updateVehicleAdmin: Scalars["Boolean"];
  uploadProductPresentations: Scalars["Boolean"];
  verifyEmail: Scalars["Boolean"];
  verifyLoginOTP: GqlStatusResponse;
  verifyNewPassword: Scalars["Boolean"];
  withdraw: Scalars["Boolean"];
};

export type MutationAddWishlistItemArgs = {
  addWishlistItemInput: AddWishlistItemInput;
};

export type MutationBookBeautyCenterServiceArgs = {
  bookBeautyCenterInput: BookBeautycenterServiceInput;
};

export type MutationBookHealthCenterArgs = {
  bookHealthCenterInput: BookHealthCenterServiceInput;
};

export type MutationBookHotelRoomArgs = {
  bookHotelRoomInput: BookHotelRoomInput;
};

export type MutationBookRestaurantArgs = {
  bookRestarantInput: BookRestaurantInput;
};

export type MutationBookVehicleArgs = {
  bookVehicle: BookVehicleServiceInput;
};

export type MutationRemoveWishlistItemArgs = {
  removeWishlistItemInput: RemoveWishlistItemInput;
};

export type MutationUpdateDesignArgs = {
  args: UpdateDesignInput;
};

export type MutationAcceptAccountDeletionRequestArgs = {
  id: Scalars["String"];
};

export type MutationAcceptAppointmentArgs = {
  id: Scalars["ID"];
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

export type MutationAddProductToCartArgs = {
  addItemToCartArgs: AddShoppingCartProductItemInput;
};

export type MutationAdminCancelOrderArgs = {
  id: Scalars["String"];
};

export type MutationAdminCreateStaffAccountArgs = {
  args: AdminCreateAdminAccountInput;
};

export type MutationAdminDeleteNewsfeedPostArgs = {
  id: Scalars["String"];
};

export type MutationAdminDeleteProductArgs = {
  id: Scalars["String"];
  reason: Scalars["String"];
};

export type MutationAdminDeleteProductReviewArgs = {
  id: Scalars["String"];
};

export type MutationAdminDeleteServiceArgs = {
  args: AdminDeleteServiceInput;
};

export type MutationAdminDeleteUserWishlistItemArgs = {
  accountId: Scalars["String"];
};

export type MutationAdminEditAccountArgs = {
  editAccountInput: UpdateSellerAccountAdminInput;
};

export type MutationAdminLoginArgs = {
  args: LoginDto;
};

export type MutationAdminRemvoeBlockArgs = {
  id: Scalars["String"];
};

export type MutationAdminUpdateAccountWorkingScheduleArgs = {
  accountId: Scalars["String"];
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
  id: Scalars["String"];
};

export type MutationChangeMyNewsletterSettingsArgs = {
  args: UpdateNewsletterInput;
};

export type MutationChangePasswordArgs = {
  changePasswordInput: ChangePasswordInput;
};

export type MutationChangeUserNewsletterSettingsArgs = {
  accountId: Scalars["String"];
  args: UpdateNewsletterInput;
};

export type MutationCreateActionArgs = {
  args: CreateActionInput;
};

export type MutationCreateBeautyCenterArgs = {
  createBeautyCenterArgs: CreateBeautyCenterInput;
};

export type MutationCreateBeautyCenterTreatmentCategoryArgs = {
  createBeautyCenterTreatmentCategory: CreateBeautyCenterTreatmentCategoryInput;
};

export type MutationCreateCommentArgs = {
  createCommentInput: CreateCommentInput;
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

export type MutationCreateRestaurantServiceArgs = {
  createRestaurantArgs: CreateRestaurantInput;
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

export type MutationCreateVehicleArgs = {
  createVehicleInput: CreateVehicleServiceInput;
};

export type MutationCreateVoucherArgs = {
  createVoucherArgs: CreateVoucherInput;
};

export type MutationDeActivateVoucherArgs = {
  deActivateVoucherArgs: DeactivateVoucherInput;
};

export type MutationDeclineAppointmentArgs = {
  args: DeclineAppointmentInput;
};

export type MutationDeclineSellerAccountArgs = {
  args: DeclineSellerAccountRequest;
};

export type MutationDeleteAffiliationArgs = {
  id: Scalars["ID"];
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

export type MutationDeleteMaintenancePageArgs = {
  id: Scalars["String"];
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

export type MutationDeleteShippingAddressArgs = {
  id: Scalars["String"];
};

export type MutationDeleteShippingRuleArgs = {
  id: Scalars["ID"];
};

export type MutationDeleteStoryArgs = {
  deleteStoryInput: DeleteStoryInput;
};

export type MutationDeleteVoucherArgs = {
  deleteVoucherArgs: DeleteVoucherInput;
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

export type MutationGetProductVendorLinkArgs = {
  productId: Scalars["String"];
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
  userId: Scalars["String"];
};

export type MutationProcessWithdrawalRequestArgs = {
  id: Scalars["String"];
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

export type MutationRejectAccountDeletionRequestArgs = {
  id: Scalars["String"];
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
  id: Scalars["Int"];
};

export type MutationRemoveItemFromCartArgs = {
  removeItemFromCartArgs: RemoveShoppingCartItemInput;
};

export type MutationRemoveNewsfeedPostArgs = {
  id: Scalars["Int"];
};

export type MutationRemoveNewsletterSubscriberArgs = {
  id: Scalars["ID"];
};

export type MutationRemoveReactionArgs = {
  removeReactionArgs: RemoveReactionInput;
};

export type MutationRemoveReportArgs = {
  id: Scalars["String"];
};

export type MutationRemoveRequiredActionArgs = {
  id: Scalars["Int"];
};

export type MutationRemoveReviewArgs = {
  id: Scalars["ID"];
};

export type MutationRemoveServiceCategoryArgs = {
  serviceCategoryId: Scalars["String"];
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
  bookId: Scalars["ID"];
};

export type MutationResendRegisterationCodeArgs = {
  email: Scalars["String"];
};

export type MutationResetPasswordArgs = {
  ResetPasswordArgs: ForgotPasswordEmailInput;
};

export type MutationReviewProductArgs = {
  args: CreateProductReviewInput;
};

export type MutationSendFollowRequestArgs = {
  profileId: Scalars["String"];
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

export type MutationSuspenseAccountArgs = {
  args: SuspenseAccountAdminInput;
};

export type MutationSuspenseContentArgs = {
  suspenseContentArgs: SuspenseContentInput;
};

export type MutationSuspenseReportedContentArgs = {
  id: Scalars["String"];
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

export type MutationUnblockUserArgs = {
  args: CreateBlockInput;
};

export type MutationUpdateAccountPrivacySettingsArgs = {
  args: UpdateMyPrivacyInput;
  id: Scalars["String"];
};

export type MutationUpdateAffiliationArgs = {
  args: UpdateAffiliationInput;
};

export type MutationUpdateBeautyCenterArgs = {
  updateBeautyCenter: UpdateBeautyCenterInput;
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

export type MutationUpdateHashtagArgs = {
  args: UpdateHashtagInput;
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

export type MutationUpdateMyProfileArgs = {
  updateProfileInput: UpdateProfileInput;
};

export type MutationUpdateMyShopArgs = {
  updateMyShopInput: UpdateShopInput;
};

export type MutationUpdateMyWorkingScheduleArgs = {
  args: UpdateWorkingScheduleInput;
};

export type MutationUpdateNewsfeedPostArgs = {
  updateNewsfeedPostInput: UpdateNewsfeedPostInput;
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

export type MutationUpdateRestaurantArgs = {
  updateRestaurantArgs: UpdateRestaurantInput;
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

export type MutationUpdateSiteInformationsArgs = {
  args: UpdateSiteInformationInput;
};

export type MutationUpdateSocialLinksArgs = {
  args: UpdateSiteSocialInput;
};

export type MutationUpdateTaxRateArgs = {
  args: UpdateTaxRateInput;
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

export enum MyBookingsSearchPeriod {
  Day = "day",
  Month = "month",
  Week = "week",
}

export type NewsfeedHashtagSearch = {
  __typename?: "NewsfeedHashtagSearch";
  mostCommentedPost: NewsfeedPost;
  mostLikedPost: NewsfeedPost;
  mostLikedVideo: NewsfeedPost;
  mostViewedVideo: NewsfeedPost;
};

export type NewsfeedPost = {
  __typename?: "NewsfeedPost";
  attachments: Array<Attachment>;
  authorProfileId: Scalars["ID"];
  comments: Scalars["Int"];
  content: Scalars["String"];
  createdAt: Scalars["String"];
  hashtags: Array<Hashtag>;
  id: Scalars["ID"];
  location?: Maybe<PostLocation>;
  mentions: Array<PostMention>;
  publisher?: Maybe<Profile>;
  reactionNum: Scalars["Int"];
  shares: Scalars["Int"];
  tags: Array<PostTag>;
  title: Scalars["String"];
  updatedAt: Scalars["String"];
  userId: Scalars["ID"];
  views: Scalars["Int"];
};

export type NewsletterSettings = {
  __typename?: "NewsletterSettings";
  feedback: Scalars["Boolean"];
  news: Scalars["Boolean"];
  product: Scalars["Boolean"];
  reminder: Scalars["Boolean"];
};

export type NewsletterSubscriber = {
  __typename?: "NewsletterSubscriber";
  createdAt: Scalars["String"];
  emailSettings: NewsletterSettings;
  id: Scalars["ID"];
  ownerId: Scalars["ID"];
  updatedAt: Scalars["String"];
  user: Account;
};

export type OpenTime = {
  __typename?: "OpenTime";
  from: Scalars["DateTime"];
  to: Scalars["DateTime"];
};

export type Order = {
  __typename?: "Order";
  billing: BillingAddress;
  billingAddressId: Scalars["String"];
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
  affiliator: Account;
  affiliatorId?: Maybe<Scalars["String"]>;
  buyer: Account;
  cashback?: Maybe<Scalars["Float"]>;
  createdAt: Scalars["String"];
  discount?: Maybe<Scalars["Float"]>;
  discountAmount?: Maybe<Scalars["Float"]>;
  id: Scalars["ID"];
  order: Order;
  orderId: Scalars["String"];
  paid?: Maybe<Scalars["Float"]>;
  paidAt?: Maybe<Scalars["String"]>;
  product?: Maybe<Product>;
  qty: Scalars["Int"];
  refundable: Scalars["Boolean"];
  rejectReason?: Maybe<Scalars["String"]>;
  seller: Account;
  status: OrderStatusEnum;
  updatedAt: Scalars["String"];
};

export enum OrderSearchPeriod {
  Day = "day",
  Month = "month",
  Week = "week",
}

export type OrderStatus = {
  __typename?: "OrderStatus";
  of: OrderStatusEnum;
  rejectReason?: Maybe<Scalars["String"]>;
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
  hasMore: Scalars["Boolean"];
  total: Scalars["Int"];
};

export type PaymentIntent = {
  __typename?: "PaymentIntent";
  client_secret: Scalars["String"];
};

export type Place = {
  __typename?: "Place";
  id: Scalars["ID"];
  type: Scalars["String"];
};

export type PlaceSuggestions = {
  __typename?: "PlaceSuggestions";
  places: Array<Place>;
};

export type PostLocation = {
  __typename?: "PostLocation";
  address?: Maybe<Scalars["String"]>;
  city: Scalars["String"];
  country: Scalars["String"];
  state?: Maybe<Scalars["String"]>;
};

export type PostLocationInput = {
  address?: Maybe<Scalars["String"]>;
  city: Scalars["String"];
  country: Scalars["String"];
  state?: Maybe<Scalars["String"]>;
};

export type PostMention = {
  __typename?: "PostMention";
  userId: Scalars["ID"];
};

export type PostTag = {
  __typename?: "PostTag";
  userId: Scalars["ID"];
};

export type PostTagInput = {
  userId: Scalars["String"];
};

export enum PostVisibility {
  Followers = "followers",
  Following = "following",
  Hidden = "hidden",
  Public = "public",
}

export enum PresentationType {
  Image = "image",
  Video = "video",
}

export type PrivacySettings = {
  __typename?: "PrivacySettings";
  hideCommentsNum: Scalars["Boolean"];
  hideLikesNum: Scalars["Boolean"];
  hideViewsNum: Scalars["Boolean"];
  id: Scalars["ID"];
  privateAccount: Scalars["Boolean"];
  userId: Scalars["ID"];
};

export type Product = {
  __typename?: "Product";
  attributes: Array<ProductAttribute>;
  brand: Scalars["String"];
  cashback: Cashback;
  cashbackId?: Maybe<Scalars["String"]>;
  category?: Maybe<Category>;
  categoryId: Scalars["ID"];
  condition: ProductCondition;
  createdAt: Scalars["String"];
  description: Scalars["String"];
  discount: Discount;
  discountId?: Maybe<Scalars["String"]>;
  earnings: Scalars["Float"];
  hashtags: Array<Scalars["String"]>;
  id: Scalars["ID"];
  negitiveFeedback: Scalars["Int"];
  positiveFeedback: Scalars["Int"];
  presentations: Array<ProductPresentation>;
  price: Scalars["Float"];
  rate: Scalars["Int"];
  reviews: Scalars["Int"];
  sales: Scalars["Int"];
  seller: Account;
  sellerId: Scalars["ID"];
  shippingDetails?: Maybe<ShippingDetails>;
  shippingRulesIds: Array<Scalars["ID"]>;
  shopId: Scalars["ID"];
  status: ProductStatus;
  stock: Scalars["Int"];
  thumbnail: Scalars["String"];
  title: Scalars["String"];
  totalDiscounted: Scalars["Int"];
  totalDiscountedAmount: Scalars["Int"];
  totalOrdered: Scalars["Int"];
  unitsRefunded: Scalars["Int"];
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

export enum ProductCondition {
  New = "new",
  Recondition = "recondition",
  Used = "used",
}

export type ProductFilterGroupValue = {
  __typename?: "ProductFilterGroupValue";
  name: Scalars["String"];
  sortOrder: Scalars["Int"];
};

export type ProductFilterGroupValueInput = {
  name: Array<StringTranslationField>;
  sortOrder: Scalars["Int"];
};

export type ProductPost = {
  __typename?: "ProductPost";
  comments: Scalars["Int"];
  commentsVisibility: CommentsVisibility;
  createdAt: Scalars["String"];
  id: Scalars["ID"];
  location?: Maybe<PostLocation>;
  product: Product;
  productId: Scalars["ID"];
  reactionNum: Scalars["Int"];
  shares: Scalars["Int"];
  updatedAt: Scalars["String"];
  user?: Maybe<Account>;
  userId: Scalars["ID"];
  views: Scalars["Int"];
  visibility: PostVisibility;
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

export type ProductReview = {
  __typename?: "ProductReview";
  createdAt: Scalars["DateTime"];
  id: Scalars["ID"];
  message: Scalars["String"];
  product: Product;
  productId: Scalars["ID"];
  rate: Scalars["Float"];
  reviewer: Account;
  reviewerId: Scalars["ID"];
  updatedAt: Scalars["DateTime"];
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

export type Profession = {
  __typename?: "Profession";
  id: Scalars["ID"];
  sortOrder: Scalars["Int"];
  title: Scalars["String"];
  usage: Scalars["Int"];
};

export type Profile = {
  __typename?: "Profile";
  activeStatus: ActiveStatus;
  bio: Scalars["String"];
  coverPhoto: Scalars["String"];
  createdAt: Scalars["DateTime"];
  followers: Scalars["Int"];
  followersData?: Maybe<Array<Follow>>;
  following: Scalars["Int"];
  followingData?: Maybe<Array<Follow>>;
  id: Scalars["ID"];
  lastActive: Scalars["DateTime"];
  ownerId: Scalars["ID"];
  photo: Scalars["String"];
  profession: Scalars["String"];
  publications: Scalars["Int"];
  updatedAt: Scalars["DateTime"];
  user?: Maybe<Account>;
  username: Scalars["String"];
  verified: Scalars["Boolean"];
  visibility: ProfileVisibility;
  visits: Scalars["Int"];
};

export type ProfileMeta = {
  __typename?: "ProfileMeta";
  id: Scalars["ID"];
  photo: Scalars["String"];
  username: Scalars["String"];
};

export type ProfileMetaPaginatedResponse = {
  __typename?: "ProfileMetaPaginatedResponse";
  data: Array<ProfileMeta>;
  hasMore: Scalars["Boolean"];
  total: Scalars["Int"];
};

export type ProfilePaginatedResponse = {
  __typename?: "ProfilePaginatedResponse";
  data: Array<Profile>;
  hasMore: Scalars["Boolean"];
  total: Scalars["Int"];
};

export enum ProfileVisibility {
  Followers = "followers",
  Private = "private",
  Public = "public",
}

export type Query = {
  __typename?: "Query";
  MyShoppingCart: ShoppingCart;
  MyWishlist: Wishlist;
  acceptAccountVerification: Scalars["Boolean"];
  adminGetAccount: Account;
  adminGetAccountBookingHistory: Array<BookedService>;
  adminGetAccountOrderById: Order;
  adminGetAccountPrivacySettings: PrivacySettings;
  adminGetAccountProducts: Array<Product>;
  adminGetAccountSavedPosts: UserSavedPostsGroup;
  adminGetAccountService: Service;
  adminGetAccountWorkingSchedule: WorkingSchedule;
  adminGetBannedCountry: BannedCountry;
  adminGetBookings: Array<BookedService>;
  adminGetContentComments: Array<Comment>;
  adminGetCurrencies: Array<Currency>;
  adminGetDesigns: Array<Design>;
  adminGetFilteredProductReviews: Array<ProductReview>;
  adminGetHashtag: Array<Hashtag>;
  adminGetLanguages: Array<Language>;
  adminGetMembershipSubscriptions: Array<MembershipSubscription>;
  adminGetMemberships: Array<Membership>;
  adminGetProduct?: Maybe<Product>;
  adminGetProfessions: Array<Profession>;
  adminGetRawService?: Maybe<ServiceShopRaw>;
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
  adminGetUserWishlist: Array<WishedItem>;
  canAccessRoom: Scalars["Boolean"];
  findAll: ProfilePaginatedResponse;
  getAccountDeletionRequests: Array<AccountDeletionRequest>;
  getAccountVerificationRequests: Array<AccountVerification>;
  getAction: Array<Action>;
  getAddableHashtags: Hashtag;
  getAdminFilteredProducts: Array<Product>;
  getAdminFilteredStories: Array<Story>;
  getAdminProductsFilter: Filter;
  getAdminProductsFilters: Array<Filter>;
  getAdminProfile: Profile;
  getAffiliationPost: AffiliationPost;
  getAllServices: Array<Service>;
  getAllShares: ContentSharePaginationResponse;
  getAllShops: Array<Shop>;
  getAllVehicles: Array<VehicleService>;
  getAuthorAffiliationPosts: Array<AffiliationPost>;
  getBannedCountries: Array<BannedCountry>;
  getBeautyCenterById: BeautyCenter;
  getBeautyCenterTreatmentCategories: Array<BeautyCenterTreatmentCategory>;
  getBeautyCenterTreatmentCategoriesByIds: Array<BeautyCenterTreatmentCategory>;
  getBookedServiceDetails: BookedService;
  getBookingHistory: Array<BookedService>;
  getChatRoom: ChatRoom;
  getCitites: Array<City>;
  getCommunityPosts: Array<Community>;
  getConnectedAccounts: Scalars["Boolean"];
  getContentComments: Array<Comment>;
  getCookiesSettings: Array<CookiesSetting>;
  getCountries: Array<Country>;
  getCurrencies: Array<Currency>;
  getCurrencyData: Currency;
  getDesignByPlacement: Array<Design>;
  getFilteredAffiliations: Array<Affiliation>;
  getFilteredAffiliationsHistory: Array<AffiliationPurchase>;
  getFilteredBeuatyCenterTreatments: Array<Treatment>;
  getFilteredBuyers: Array<Account>;
  getFilteredNewsfeedPosts: Array<NewsfeedPost>;
  getFilteredOrders: Array<Order>;
  getFilteredProductCategories: Array<Category>;
  getFilteredSellers: Array<Account>;
  getFilteredServiceCategories: Array<ServiceCategory>;
  getFilteredServices: Array<ServiceDiscovery>;
  getFilteredShops: Array<Shop>;
  getFilteredVouchers: Array<Voucher>;
  getFollowersByProfileId: ProfileMetaPaginatedResponse;
  getFollowingByProfileId: ProfileMetaPaginatedResponse;
  getHashtagTopAffiliationPost?: Maybe<HashtagTopAffiliationPost>;
  getHashtagTopServicePosts: ServicePostHashtagSearch;
  getHealthCenter: HealthCenter;
  getHotelService: Hotel;
  getHotels: Array<Hotel>;
  getInsurances: Array<Insurance>;
  getInvoiceRecord: InvoiceRecord;
  getLanguages: Array<Language>;
  getLatestOrders: Array<Order>;
  getLocalisation: Localization;
  getMaintenancePages: Array<Maintenance>;
  getMyAffiliations: Array<Affiliation>;
  getMyBalance: Balance;
  getMyBillingAddressCollection: BillingAddressCollection;
  getMyBlockList: Array<Block>;
  getMyBookings: Array<BookedService>;
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
  getMyReturnedOrders: Array<Refund>;
  getMySavedPosts: UserSavedPostsGroup;
  getMySellerProductsRating: SellerProductsRating;
  getMyShippingAddress: Array<ShippingAddress>;
  getMyShippingRules: Array<ShippingRule>;
  getMyStories: Array<Story>;
  getMyTransactions: Array<Transaction>;
  getMyVouchers: Array<Voucher>;
  getMyWithdrawalRequests: Array<WithdrawalRequest>;
  getMyWorkingSchedule: WorkingSchedule;
  getNearShops: Array<Shop>;
  getNewletterSubscribers: Array<NewsletterSubscriber>;
  getNewsfeedHashtagPosts: NewsfeedHashtagSearch;
  getNewsfeedPostById: NewsfeedPost;
  getNewsfeedPostsByUserId: Array<NewsfeedPost>;
  getOrder: Order;
  getPendingSellers: Array<Account>;
  getPlaceSuggestions: PlaceSuggestions;
  getPlaces: Localization;
  getProduct: Product;
  getProductById: Product;
  getProductCategories: Array<Category>;
  getProductReviewById: Array<ProductReview>;
  getProductsFilters: Array<Filter>;
  getProfessions: Array<Profession>;
  getProfile: Profile;
  getProfileNewsfeedPosts: Array<NewsfeedPost>;
  getRecentSales: Array<OrderItem>;
  getRecentStories: Array<RecentStory>;
  getRecommendedAffiliationPosts: Array<AffiliationPost>;
  getRecommendedProductPosts: Array<ProductPost>;
  getRecommendedServicePosts: Array<ServicePost>;
  getRefundableOrders: Array<Order>;
  getRegistrations: Array<Registeration>;
  getReports: Array<Report>;
  getRestaurant: Restaurant;
  getRestaurants: Array<Restaurant>;
  getRoomMessages: Array<ChatMessage>;
  getSalesDurningPeriod: Array<OrderItem>;
  getServiceCategories: Array<ServiceCategory>;
  getServiceCategoryById: ServiceCategory;
  getServiceCategoryBySlug: ServiceCategory;
  getServiceInsuranceHistory: Array<Insurance>;
  getServicePost: ServicePost;
  getShippingGeoZoneRules: Array<ShippingTypeRule>;
  getShippingRuleGeoZones: Array<ShippingRuleGeoZone>;
  getShippingTypeRule: ShippingTypeRule;
  getShopById: Shop;
  getSiteInfomrationsOfPlacement: Array<SiteInformation>;
  getStory: Story;
  getStoryViews: Array<StoryView>;
  getSubscriableMemberships: Array<Membership>;
  getTopHashtagNewsfeed: TopHashtagNewsfeedPosts;
  getTopHashtagPosts: HashtagProductPost;
  getTopHashtags: Array<Hashtag>;
  getUserActions: Array<Action>;
  getUserAffiliationHistory: Array<AffiliationPurchase>;
  getUserAffiliations: Array<Affiliation>;
  getUserAffiliationsPurchases: Array<AffiliationPurchase>;
  getUserBookingHistory: Array<BookedService>;
  getUserOrders: Array<Order>;
  getUserPrevStory: Story;
  getUserProductPosts: Array<ProductPost>;
  getUserServicePosts: Array<ServicePost>;
  getUserStory: Story;
  getUserWishelist: Array<WishedItem>;
  getVehicleServicebyId: VehicleService;
  getWisherslist: Array<Wisherslist>;
  getWithdrawCurrencies: Array<WithdrawCurrency>;
  getWithdrawalRequests: Array<WithdrawalRequest>;
  isFollowed: Scalars["Boolean"];
  isMaintenance: Scalars["Boolean"];
  myProfile: Profile;
  requiredAction: RequiredAction;
  requiredActions: Array<RequiredAction>;
  searchFilteredRestaurant: Array<Restaurant>;
  searchHashtags: SearchHashtag;
  searchHealthCenterDoctors: Array<Doctor>;
  searchHealthCenters: Array<HealthCenter>;
  searchHotelRooms: Array<HotelRoom>;
  searchPopularUsers: ProfilePaginatedResponse;
  searchUsers: SearchUsers;
  updateComment: PaginationCommentsResponse;
};

export type QueryAcceptAccountVerificationArgs = {
  id: Scalars["String"];
};

export type QueryAdminGetAccountArgs = {
  id: Scalars["String"];
};

export type QueryAdminGetAccountBookingHistoryArgs = {
  accountId: Scalars["String"];
  accountType: Scalars["String"];
  args: GetBookingsHistoryInput;
};

export type QueryAdminGetAccountOrderByIdArgs = {
  id: Scalars["String"];
};

export type QueryAdminGetAccountPrivacySettingsArgs = {
  id: Scalars["String"];
};

export type QueryAdminGetAccountProductsArgs = {
  args: AdminGetAccountProductsInput;
};

export type QueryAdminGetAccountSavedPostsArgs = {
  accountId: Scalars["String"];
  args: GetMySavedPostsInput;
};

export type QueryAdminGetAccountServiceArgs = {
  accountId: Scalars["String"];
};

export type QueryAdminGetAccountWorkingScheduleArgs = {
  accountId: Scalars["String"];
};

export type QueryAdminGetBannedCountryArgs = {
  id: Scalars["String"];
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

export type QueryAdminGetProductArgs = {
  id: Scalars["String"];
};

export type QueryAdminGetProfessionsArgs = {
  args: AdminGetProfessionInput;
};

export type QueryAdminGetRawServiceArgs = {
  id: Scalars["String"];
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
  id: Scalars["String"];
};

export type QueryAdminGetTaxRatesArgs = {
  args: AdminGetTaxRatesInput;
};

export type QueryAdminGetTransationsArgs = {
  args: GetTransactionsAdminInput;
};

export type QueryAdminGetUserBlockListArgs = {
  accountId: Scalars["String"];
  args: GetMyBlocklistInput;
};

export type QueryAdminGetUserBookingsArgs = {
  accountId: Scalars["String"];
  args: GetMyBookingsInput;
};

export type QueryAdminGetUserFinancialAccountsArgs = {
  args: AdminGetUserFinancialAccounts;
};

export type QueryAdminGetUserNewsletterSettingsArgs = {
  accountId: Scalars["String"];
};

export type QueryAdminGetUserReturnedOrdersArgs = {
  args: AdminGetUserReturnedOrdersInput;
};

export type QueryAdminGetUserWishlistArgs = {
  accountId: Scalars["String"];
};

export type QueryCanAccessRoomArgs = {
  roomId: Scalars["ID"];
};

export type QueryGetAccountDeletionRequestsArgs = {
  args: GetAccountDeletionRequestsInput;
};

export type QueryGetActionArgs = {
  id: Scalars["String"];
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
  id: Scalars["String"];
};

export type QueryGetAdminProductsFiltersArgs = {
  getFiltersArgs: GetFiltersInput;
};

export type QueryGetAdminProfileArgs = {
  id: Scalars["String"];
};

export type QueryGetAffiliationPostArgs = {
  args: GetAffiliationPostInput;
};

export type QueryGetAllServicesArgs = {
  args: GetFilteredServicesInput;
};

export type QueryGetAllVehiclesArgs = {
  args: GetVehiclesInput;
};

export type QueryGetAuthorAffiliationPostsArgs = {
  args: GetUserAffiliationPostsInput;
};

export type QueryGetBannedCountriesArgs = {
  args: GetBannedCountriesAdminInput;
};

export type QueryGetBeautyCenterByIdArgs = {
  id: Scalars["String"];
};

export type QueryGetBeautyCenterTreatmentCategoriesByIdsArgs = {
  ids: Array<Scalars["String"]>;
};

export type QueryGetBookedServiceDetailsArgs = {
  id: Scalars["String"];
};

export type QueryGetBookingHistoryArgs = {
  args: GetBookingsHistoryInput;
};

export type QueryGetChatRoomArgs = {
  roomId: Scalars["String"];
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

export type QueryGetCountriesArgs = {
  name: Scalars["String"];
};

export type QueryGetCurrencyDataArgs = {
  currencyCode: Scalars["String"];
};

export type QueryGetDesignByPlacementArgs = {
  args: GetDesignByPlacementInput;
};

export type QueryGetFilteredAffiliationsArgs = {
  filters: GetFilteredAffiliationsInput;
};

export type QueryGetFilteredAffiliationsHistoryArgs = {
  filters: GetFilteredAffiliationHistoryInput;
};

export type QueryGetFilteredBeuatyCenterTreatmentsArgs = {
  args: SearchFilteredBeautyCenterInput;
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

export type QueryGetFilteredVouchersArgs = {
  args: GetFilteredVouchers;
};

export type QueryGetFollowersByProfileIdArgs = {
  getFollowersMetaInput: GetProfileFollowersMetaInput;
};

export type QueryGetFollowingByProfileIdArgs = {
  getFollowingMetaInput: GetProfileFollowersMetaInput;
};

export type QueryGetHashtagTopAffiliationPostArgs = {
  tag: Scalars["String"];
};

export type QueryGetHashtagTopServicePostsArgs = {
  args: GetHashtagTopServicePostsInput;
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

export type QueryGetInvoiceRecordArgs = {
  period: Scalars["String"];
};

export type QueryGetLatestOrdersArgs = {
  take?: Maybe<Scalars["Int"]>;
};

export type QueryGetLocalisationArgs = {
  getLocalisationInput: GetLocalizationInput;
};

export type QueryGetMyAffiliationsArgs = {
  args: GetMyAffiliationsInput;
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

export type QueryGetMyTransactionsArgs = {
  myTransactionsArgs: GetTransactionsInput;
};

export type QueryGetMyVouchersArgs = {
  getMyVouchersInput?: Maybe<GetVouchersInput>;
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
  id: Scalars["String"];
};

export type QueryGetNewsfeedPostsByUserIdArgs = {
  args: GetNewsfeedPostsByUserIdInput;
};

export type QueryGetOrderArgs = {
  id: Scalars["String"];
};

export type QueryGetPendingSellersArgs = {
  args: GetAdminPendingSellersInput;
};

export type QueryGetPlaceSuggestionsArgs = {
  args: GetPlaceSuggestionInput;
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

export type QueryGetProductReviewByIdArgs = {
  id: Scalars["String"];
};

export type QueryGetProfileArgs = {
  id: Scalars["String"];
};

export type QueryGetProfileNewsfeedPostsArgs = {
  getUserNewsfeedPosts: GetNewsfeedPostsByUserIdInput;
};

export type QueryGetRecentSalesArgs = {
  count?: Maybe<Scalars["Int"]>;
};

export type QueryGetRecentStoriesArgs = {
  getRecentStoryInput?: Maybe<GetRecentStoriesInput>;
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

export type QueryGetRefundableOrdersArgs = {
  args: GetRefundableOrdersInput;
};

export type QueryGetReportsArgs = {
  getReportsArgs: GetReportsInput;
};

export type QueryGetRestaurantArgs = {
  getRestaurantArgs: GetRestaurantInput;
};

export type QueryGetRoomMessagesArgs = {
  args: GetMessagesByRoomIdInput;
};

export type QueryGetSalesDurningPeriodArgs = {
  args: GetSalesDurningPeriodInput;
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

export type QueryGetServicePostArgs = {
  id: Scalars["String"];
};

export type QueryGetShippingGeoZoneRulesArgs = {
  args: AdminGetShippingGeoZoneRulesInput;
};

export type QueryGetShippingRuleGeoZonesArgs = {
  id: Scalars["String"];
};

export type QueryGetShippingTypeRuleArgs = {
  id: Scalars["String"];
};

export type QueryGetShopByIdArgs = {
  id: Scalars["String"];
};

export type QueryGetSiteInfomrationsOfPlacementArgs = {
  placement: Scalars["String"];
};

export type QueryGetStoryArgs = {
  storyId: Scalars["String"];
};

export type QueryGetStoryViewsArgs = {
  getStoryViewsInput: GetStorySeenByInput;
};

export type QueryGetTopHashtagPostsArgs = {
  tag: Scalars["String"];
};

export type QueryGetTopHashtagsArgs = {
  args: GetTopHashtagsInput;
};

export type QueryGetUserActionsArgs = {
  args: GetUserActionsInput;
};

export type QueryGetUserAffiliationHistoryArgs = {
  id: Scalars["String"];
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

export type QueryGetUserOrdersArgs = {
  args: GetUserOrders;
};

export type QueryGetUserPrevStoryArgs = {
  storyId: Scalars["String"];
};

export type QueryGetUserProductPostsArgs = {
  args: GetUserProductPostsInput;
};

export type QueryGetUserServicePostsArgs = {
  args: GetUserServicesPostsInput;
};

export type QueryGetUserStoryArgs = {
  userId: Scalars["String"];
};

export type QueryGetUserWishelistArgs = {
  args: AdminGetUserWishlistInput;
};

export type QueryGetVehicleServicebyIdArgs = {
  id: Scalars["String"];
};

export type QueryGetWithdrawalRequestsArgs = {
  args: GetWithdrawalRequestsAdminInput;
};

export type QueryIsFollowedArgs = {
  profileId: Scalars["String"];
};

export type QueryIsMaintenanceArgs = {
  url: Scalars["String"];
};

export type QueryRequiredActionArgs = {
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

export type QuerySearchPopularUsersArgs = {
  args: SearchPopularProfilesInput;
};

export type QuerySearchUsersArgs = {
  searchUserInput: SearchUserInput;
};

export type QueryUpdateCommentArgs = {
  updateCommentInput: UpdateCommentInput;
};

export type RecentStory = {
  __typename?: "RecentStory";
  newStory: Scalars["Boolean"];
  user?: Maybe<Account>;
  userId: Scalars["ID"];
};

export type Refund = {
  __typename?: "Refund";
  amount: Scalars["Float"];
  fullAmount: Scalars["Boolean"];
  id: Scalars["ID"];
  orderItemId: Scalars["ID"];
  product: Product;
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

export type Registeration = {
  __typename?: "Registeration";
  accountInputData: AccountInputData;
  email: Scalars["String"];
  id: Scalars["ID"];
  verificationToken: Scalars["String"];
};

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

export type RemoveReactionInput = {
  contentId: Scalars["ID"];
  contentType: ContentHostType;
};

export type RemoveShoppingCartItemInput = {
  itemId: Scalars["ID"];
  type: Scalars["String"];
};

export type RemoveWishlistItemInput = {
  itemId: Scalars["ID"];
};

export type Report = {
  __typename?: "Report";
  contentId: Scalars["String"];
  createdAt: Scalars["DateTime"];
  id: Scalars["ID"];
  message: Scalars["String"];
  post: NewsfeedPost;
  product: Product;
  profile: Profile;
  reportedBy: Profile;
  reportedById: Scalars["ID"];
  service: Service;
  status: ReportStatus;
  type: ReportType;
  updatedAt: Scalars["DateTime"];
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

export type RestaurantMenu = {
  __typename?: "RestaurantMenu";
  dishs: Array<Dish>;
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

export type ReturnedOrder = {
  __typename?: "ReturnedOrder";
  amount: Scalars["Float"];
  fullAmount: Scalars["Float"];
  id: Scalars["ID"];
  orderItem: OrderItem;
  orderItemId: Scalars["ID"];
  reason: Scalars["String"];
  rejectReason?: Maybe<Scalars["String"]>;
  status: RefundStatusType;
  type: RefundType;
};

export enum RoomTypes {
  Group = "group",
  Private = "private",
}

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

export type SearchPopularProfilesInput = {
  cursor?: Maybe<Scalars["String"]>;
  q: Scalars["String"];
  take?: Maybe<Scalars["Int"]>;
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

export type SellerProductsRating = {
  __typename?: "SellerProductsRating";
  givenStars: Scalars["Float"];
  id: Scalars["ID"];
  rating: Scalars["Float"];
  reviews: Scalars["Int"];
};

export type Service = {
  __typename?: "Service";
  contact: ServiceContact;
  hashtags: Array<Scalars["String"]>;
  id: Scalars["ID"];
  location: ServiceLocation;
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
  description: Array<TranslationText>;
  filters: Array<ServiceCategoryFilter>;
  id: Scalars["ID"];
  metaTagDescription: Array<TranslationText>;
  metaTagKeywords: Array<TranslationText>;
  metaTagTitle: Array<TranslationText>;
  name: Array<TranslationText>;
  seo: Array<TranslationText>;
  slug: Scalars["String"];
  sortOrder: Scalars["Int"];
  status: ServiceCategoryStatus;
  thumbnail: Scalars["String"];
};

export type ServiceCategoryFilter = {
  __typename?: "ServiceCategoryFilter";
  filterGroupName: Array<TranslationText>;
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
  name: Array<TranslationText>;
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
  value: Scalars["Float"];
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

export type ServicePost = {
  __typename?: "ServicePost";
  comments: Scalars["Int"];
  commentsVisibility: CommentsVisibility;
  createdAt: Scalars["String"];
  id: Scalars["ID"];
  location: PostLocation;
  reactionNum: Scalars["Int"];
  service?: Maybe<Service>;
  serviceId: Scalars["ID"];
  serviceType: TypeOfService;
  shares: Scalars["Int"];
  updatedAt: Scalars["String"];
  user?: Maybe<Account>;
  userId: Scalars["ID"];
  views: Scalars["Int"];
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
  doctors?: Maybe<Array<Doctor>>;
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
  treatments?: Maybe<Array<Treatment>>;
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
  firstname: Scalars["String"];
  id: Scalars["ID"];
  instractions?: Maybe<Scalars["String"]>;
  lastname: Scalars["String"];
  location: Location;
  ownerId: Scalars["ID"];
  phone?: Maybe<Scalars["String"]>;
  zipCode?: Maybe<Scalars["String"]>;
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
  zone: Scalars["String"];
};

export enum ShippingType {
  ClickAndCollect = "click_and_collect",
  Paid = "paid",
}

export type ShippingTypeRule = {
  __typename?: "ShippingTypeRule";
  description: Scalars["String"];
  id: Scalars["ID"];
  name: Scalars["String"];
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
  typeOfSeller: TypeOfSeller;
  updatedAt: Scalars["DateTime"];
  vat?: Maybe<VatSettings>;
  vendorType: Array<VendorType>;
  verified: Scalars["Boolean"];
};

export type ShoppingCart = {
  __typename?: "ShoppingCart";
  appliedVoucherId?: Maybe<Scalars["ID"]>;
  cartProduct?: Maybe<Array<CartProduct>>;
  cartServices?: Maybe<Array<BookedService>>;
  id: Scalars["ID"];
  ownerId: Scalars["ID"];
};

export type SiteInformation = {
  __typename?: "SiteInformation";
  descirption: Scalars["String"];
  id: Scalars["ID"];
  placements: Array<Scalars["String"]>;
  route: Scalars["String"];
  slug: Scalars["String"];
  sortOrder: Scalars["Int"];
  title: Scalars["String"];
};

export type SpecialDayWorkingHours = {
  __typename?: "SpecialDayWorkingHours";
  date: Scalars["String"];
  workingHours: ServiceDayWorkingHours;
};

export type SpecialDayWorkingHoursInput = {
  date: Scalars["String"];
  workingHours: ServiceDayWorkingHoursInput;
};

export enum StaffAccountType {
  Admin = "admin",
  Moderator = "moderator",
}

export enum StoreType {
  Product = "product",
  Service = "service",
}

export type Story = {
  __typename?: "Story";
  affiliationPost?: Maybe<AffiliationPost>;
  attachements?: Maybe<Attachment>;
  content?: Maybe<Scalars["String"]>;
  createdAt: Scalars["DateTime"];
  id: Scalars["ID"];
  newsfeedPost?: Maybe<NewsfeedPost>;
  publisher?: Maybe<Profile>;
  publisherId: Scalars["ID"];
  reactionsNum: Scalars["Int"];
  referenceId?: Maybe<Scalars["ID"]>;
  servicePost?: Maybe<ServicePost>;
  shopPost?: Maybe<ProductPost>;
  type: StoryType;
  updatedAt: Scalars["DateTime"];
  views: Array<StoryView>;
  viewsCount: Scalars["Int"];
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
  createdAt: Scalars["DateTime"];
  id: Scalars["ID"];
  story?: Maybe<Story>;
  storyId: Scalars["ID"];
  viewer?: Maybe<Account>;
  viewerId: Scalars["ID"];
};

export type StringTranslationField = {
  langId: Scalars["String"];
  value: Scalars["String"];
};

export type SuspenseAccountAdminInput = {
  rejectReason?: Maybe<Scalars["String"]>;
  userId: Scalars["ID"];
};

export type SuspenseContentInput = {
  id: Scalars["ID"];
  type: Scalars["String"];
};

export enum TargetGenders {
  Female = "female",
  Male = "male",
}

export type TaxRate = {
  __typename?: "TaxRate";
  appliedOnCountries: Array<Country>;
  appliedOnCountryIds: Array<Scalars["String"]>;
  id: Scalars["ID"];
  percent: Scalars["Float"];
  title: Scalars["String"];
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
  amount: Scalars["Int"];
  createdAt: Scalars["DateTime"];
  currency: Scalars["String"];
  description: Scalars["String"];
  from: Scalars["String"];
  fromUser: Account;
  id: Scalars["ID"];
  paymentType: Scalars["String"];
  status: TransactionStatus;
  toUser: Account;
  updatedAt: Scalars["DateTime"];
  userId: Scalars["ID"];
};

export enum TransactionStatus {
  Failed = "failed",
  Pending = "pending",
  Success = "success",
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

export type Treatment = {
  __typename?: "Treatment";
  category?: Maybe<BeautyCenterTreatmentCategory>;
  discount: ServiceDiscount;
  duration: Array<Scalars["Int"]>;
  id: Scalars["ID"];
  price: Scalars["Float"];
  title: Scalars["String"];
  treatmentCategoryId: Scalars["ID"];
};

export enum TypeOfSeller {
  Individual = "individual",
  Professional = "professional",
}

export enum TypeOfService {
  BeautyCenterTreatment = "beautyCenterTreatment",
  HealthCenterTreatment = "healthCenterTreatment",
  HolidayRental = "holidayRental",
  HotelRoom = "hotelRoom",
  RestaurantMenu = "restaurantMenu",
  Vehicle = "vehicle",
}

export type UnFollowProfileInput = {
  profileId: Scalars["String"];
};

export type UpdateAccountInput = {
  accountType?: Maybe<RegisterAccountType>;
  birthDate?: Maybe<Scalars["String"]>;
  companyRegisterationNumber?: Maybe<Scalars["String"]>;
  confirmPassword?: Maybe<Scalars["String"]>;
  email?: Maybe<Scalars["String"]>;
  firstName?: Maybe<Scalars["String"]>;
  lastName?: Maybe<Scalars["String"]>;
  password?: Maybe<Scalars["String"]>;
};

export type UpdateAffiliationAdminInput = {
  commision?: Maybe<Scalars["Float"]>;
  expireAt?: Maybe<Scalars["String"]>;
  id: Scalars["ID"];
  itemId?: Maybe<Scalars["ID"]>;
  itemType?: Maybe<Scalars["String"]>;
  sellerId: Scalars["ID"];
};

export type UpdateAffiliationInput = {
  commision?: Maybe<Scalars["Float"]>;
  expireAt?: Maybe<Scalars["String"]>;
  id: Scalars["ID"];
  itemId?: Maybe<Scalars["ID"]>;
  itemType?: Maybe<Scalars["String"]>;
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

export type UpdateCommentInput = {
  content?: Maybe<Scalars["String"]>;
  id: Scalars["ID"];
  mentions?: Maybe<Array<CommentMentionInput>>;
};

export type UpdateCurrencyInput = {
  code: Scalars["String"];
  enabled?: Maybe<Scalars["Boolean"]>;
  exchangeRate?: Maybe<Scalars["Float"]>;
  name?: Maybe<Scalars["String"]>;
  symbol?: Maybe<Scalars["String"]>;
};

export type UpdateDesignInput = {
  id: Scalars["ID"];
  name?: Maybe<Scalars["String"]>;
  placement?: Maybe<Array<DesignPlacement>>;
  src?: Maybe<Scalars["String"]>;
  type?: Maybe<DesignType>;
};

export type UpdateFilterInput = {
  id: Scalars["ID"];
  name?: Maybe<Array<StringTranslationField>>;
  sortOrder?: Maybe<Scalars["Int"]>;
  values?: Maybe<Array<ProductFilterGroupValueInput>>;
};

export type UpdateHashtagInput = {
  status?: Maybe<HashtagStatus>;
  tag: Scalars["String"];
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

export type UpdateLanguageInput = {
  code?: Maybe<Scalars["String"]>;
  enabled?: Maybe<Scalars["Boolean"]>;
  id: Scalars["ID"];
  locale?: Maybe<Scalars["String"]>;
  name?: Maybe<Scalars["String"]>;
  sortOrder?: Maybe<Scalars["Int"]>;
};

export type UpdateMembershipIncludedItemInput = {
  title: Scalars["String"];
};

export type UpdateMembershipInput = {
  comissionOn?: Maybe<CommissionOn>;
  id: Scalars["ID"];
  includings?: Maybe<Array<UpdateMembershipIncludedItemInput>>;
  name?: Maybe<Scalars["String"]>;
  turnover_rules?: Maybe<Array<UpdateMembershipTurnoverRuleInput>>;
};

export type UpdateMembershipTurnoverRuleInput = {
  commission?: Maybe<Scalars["Float"]>;
  id: Scalars["ID"];
  price?: Maybe<Scalars["Float"]>;
  turnover_amount?: Maybe<Scalars["Float"]>;
};

export type UpdateMyPrivacyInput = {
  hideCommentsNum?: Maybe<Scalars["Boolean"]>;
  hideLikesNum?: Maybe<Scalars["Boolean"]>;
  hideViewsNum?: Maybe<Scalars["Boolean"]>;
  privateAccount?: Maybe<Scalars["Boolean"]>;
};

export type UpdateNewsfeedPostInput = {
  attachments?: Maybe<Array<AttachmentInput>>;
  content?: Maybe<Scalars["String"]>;
  hashtags?: Maybe<Array<HashtagInput>>;
  id: Scalars["ID"];
  location?: Maybe<PostLocationInput>;
  tags?: Maybe<Array<PostTagInput>>;
  title?: Maybe<Scalars["String"]>;
  visibility?: Maybe<PostVisibility>;
};

export type UpdateNewsletterInput = {
  feedback?: Maybe<Scalars["Boolean"]>;
  news?: Maybe<Scalars["Boolean"]>;
  product?: Maybe<Scalars["Boolean"]>;
  reminder?: Maybe<Scalars["Boolean"]>;
};

export type UpdatePostAdminInput = {
  attachments?: Maybe<Array<AttachmentInput>>;
  content?: Maybe<Scalars["String"]>;
  hashtags?: Maybe<Array<HashtagInput>>;
  id: Scalars["ID"];
  location?: Maybe<PostLocationInput>;
  tags?: Maybe<Array<PostTagInput>>;
  title?: Maybe<Scalars["String"]>;
  userId: Scalars["ID"];
  visibility?: Maybe<PostVisibility>;
};

export type UpdateProductInput = {
  attributes?: Maybe<Array<ProductAttributeInput>>;
  brand?: Maybe<Scalars["String"]>;
  cashback?: Maybe<CashBackInput>;
  categoryId?: Maybe<Scalars["ID"]>;
  condition?: Maybe<ProductCondition>;
  description?: Maybe<StringTranslationField>;
  discount?: Maybe<DiscountInput>;
  id: Scalars["ID"];
  presentations?: Maybe<Array<ProductPresentationInput>>;
  price?: Maybe<Scalars["Float"]>;
  status?: Maybe<ProductStatus>;
  stock?: Maybe<Scalars["Int"]>;
  thumbnail?: Maybe<Scalars["String"]>;
  title?: Maybe<Array<StringTranslationField>>;
  type?: Maybe<ProductType>;
  vat?: Maybe<Scalars["Float"]>;
  visibility?: Maybe<VisibilityEnum>;
};

export type UpdateProductReviewInput = {
  id: Scalars["ID"];
  message?: Maybe<Scalars["String"]>;
  productId?: Maybe<Scalars["ID"]>;
  rate?: Maybe<Scalars["Float"]>;
};

export type UpdateProfessionInput = {
  id: Scalars["ID"];
  sortOrder?: Maybe<Scalars["Int"]>;
  status?: Maybe<ProfessionStatus>;
  title?: Maybe<Scalars["String"]>;
};

export type UpdateProfileAdminInput = {
  bio?: Maybe<Scalars["String"]>;
  photo?: Maybe<Scalars["String"]>;
  profession?: Maybe<Scalars["String"]>;
  profileId?: Maybe<Scalars["ID"]>;
  username?: Maybe<Scalars["String"]>;
  visibility?: Maybe<ProfileVisibility>;
};

export type UpdateProfileInput = {
  bio?: Maybe<Scalars["String"]>;
  photo?: Maybe<Scalars["String"]>;
  profession?: Maybe<Scalars["String"]>;
  username?: Maybe<Scalars["String"]>;
  visibility?: Maybe<ProfileVisibility>;
};

export type UpdateRequiredActionInput = {
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
  birthDate?: Maybe<Scalars["String"]>;
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
  sortOrder?: Maybe<Scalars["Int"]>;
  status?: Maybe<ServiceCategoryStatus>;
  thumbnail?: Maybe<Scalars["String"]>;
};

export type UpdateServiceInput = {
  id: Scalars["String"];
  type?: Maybe<ServiceType>;
};

export type UpdateShippingAddressInput = {
  firstname?: Maybe<Scalars["String"]>;
  id: Scalars["ID"];
  instractions?: Maybe<Scalars["String"]>;
  lastname?: Maybe<Scalars["String"]>;
  location?: Maybe<LocationInput>;
  ownerId?: Maybe<Scalars["ID"]>;
  phone?: Maybe<Scalars["String"]>;
  zipCode?: Maybe<Scalars["String"]>;
};

export type UpdateShippingRuleGeoZoneInput = {
  country?: Maybe<Scalars["String"]>;
  id: Scalars["String"];
  zone?: Maybe<Scalars["String"]>;
};

export type UpdateShippingRuleInput = {
  cost?: Maybe<Scalars["Float"]>;
  countries?: Maybe<Array<ShippingCountryInput>>;
  deliveryTimeRange?: Maybe<ShippingDeliveryTimeRangeInput>;
  id: Scalars["ID"];
  name?: Maybe<Scalars["String"]>;
  shippingType?: Maybe<ShippingType>;
};

export type UpdateShippingTypeRuleInput = {
  description?: Maybe<Scalars["String"]>;
  id: Scalars["String"];
  name?: Maybe<Scalars["String"]>;
  type?: Maybe<ShippingType>;
  zones?: Maybe<Array<UpdateShippingRuleGeoZoneInput>>;
};

export type UpdateShopInput = {
  banner?: Maybe<Scalars["String"]>;
  description?: Maybe<Scalars["String"]>;
  location?: Maybe<LocationInput>;
  name?: Maybe<Scalars["String"]>;
  storeType?: Maybe<Array<StoreType>>;
  targetGenders?: Maybe<Array<TargetGenders>>;
  typeOfSeller?: Maybe<TypeOfSeller>;
  vat?: Maybe<VatSettingsPartialInput>;
  vendorType?: Maybe<Array<VendorType>>;
};

export type UpdateSiteInformationInput = {
  description?: Maybe<Scalars["String"]>;
  id: Scalars["ID"];
  route?: Maybe<Scalars["String"]>;
  slug?: Maybe<Scalars["String"]>;
  sortOrder?: Maybe<Scalars["Int"]>;
  title?: Maybe<Scalars["String"]>;
};

export type UpdateSiteSocialInput = {
  socialLinks: Array<UpdateSocialLink>;
};

export type UpdateSocialLink = {
  label: Scalars["String"];
  link: Scalars["String"];
  placements: Array<Scalars["String"]>;
};

export type UpdateTaxRateInput = {
  appliedOnCountryIds?: Maybe<Array<Scalars["String"]>>;
  id: Scalars["ID"];
  percent?: Maybe<Scalars["Float"]>;
  title?: Maybe<Scalars["String"]>;
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

export type UserSavedPostsGroup = {
  __typename?: "UserSavedPostsGroup";
  id: Scalars["ID"];
  posts: Array<NewsfeedPost>;
  userId: Scalars["ID"];
};

export type VatSettings = {
  __typename?: "VatSettings";
  VatID: Scalars["String"];
  location: Location;
};

export type VatSettingsPartialInput = {
  VatID?: Maybe<Scalars["String"]>;
  location?: Maybe<LocationInput>;
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

export type VerifyEmailDto = {
  verificationCode: Scalars["String"];
};

export enum VisibilityEnum {
  Hidden = "hidden",
  Public = "public",
}

export type Voucher = {
  __typename?: "Voucher";
  amount: Scalars["Float"];
  code: Scalars["String"];
  createdAt: Scalars["String"];
  currency: Scalars["String"];
  id: Scalars["ID"];
  ownerId: Scalars["ID"];
  status: VoucherStatus;
  user: Account;
};

export enum VoucherStatus {
  Active = "active",
  InActive = "inActive",
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

export type WishedItem = {
  __typename?: "WishedItem";
  id: Scalars["ID"];
  itemId: Scalars["String"];
  itemType: WishlistItemType;
  product: Product;
  service: Service;
  userId: Scalars["ID"];
};

export type Wisher = {
  __typename?: "Wisher";
  userId: Scalars["String"];
};

export type Wisherslist = {
  __typename?: "Wisherslist";
  id: Scalars["ID"];
  itemId: Scalars["ID"];
  sellerId: Scalars["ID"];
  wishers: Array<Wisher>;
  wishersCount: Scalars["Int"];
};

export type Wishlist = {
  __typename?: "Wishlist";
  id: Scalars["ID"];
  ownerId: Scalars["ID"];
  wishedItems: Array<WishlistItem>;
};

export type WishlistItem = {
  __typename?: "WishlistItem";
  itemId: Scalars["ID"];
  itemType: WishlistItemType;
  product?: Maybe<Product>;
  service?: Maybe<Service>;
};

export enum WishlistItemType {
  Product = "product",
  Service = "service",
}

export type WithdrawCurrency = {
  __typename?: "WithdrawCurrency";
  code: Scalars["String"];
  currency: Currency;
};

export type WithdrawInput = {
  amount: Scalars["Float"];
  currency: Scalars["String"];
  methodId: Scalars["String"];
};

export enum WithdrawalAccountType {
  Buyer = "BUYER",
  Seller = "SELLER",
}

export type WithdrawalRequest = {
  __typename?: "WithdrawalRequest";
  amount: Scalars["Float"];
  financialAccount: FinancialAccount;
  financialAccountId: Scalars["String"];
  id: Scalars["ID"];
  processedAt: Scalars["String"];
  requestedAt: Scalars["String"];
  status: WithdrawalStatus;
  user: Account;
  userId: Scalars["ID"];
};

export enum WithdrawalStatus {
  Pending = "pending",
  Processed = "processed",
  Refused = "refused",
}

export type WorkingSchedule = {
  __typename?: "WorkingSchedule";
  id: Scalars["ID"];
  specialDays: Array<SpecialDayWorkingHours>;
  weekdays: WeekdaysWorkingHours;
};

export enum ProfessionStatus {
  Active = "active",
  InActive = "inActive",
}

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
