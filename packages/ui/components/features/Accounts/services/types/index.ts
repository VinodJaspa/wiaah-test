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
};

export type Account = {
  __typename?: "Account";
  id: Scalars["ID"];
  stripeId?: Maybe<Scalars["String"]>;
  membershipId?: Maybe<Scalars["ID"]>;
  firstName: Scalars["String"];
  lastName: Scalars["String"];
  email: Scalars["String"];
  createdAt: Scalars["DateTime"];
  updatedAt: Scalars["DateTime"];
  type: AccountType;
  verified: Scalars["Boolean"];
  companyRegisterationNumber?: Maybe<Scalars["String"]>;
  photo?: Maybe<Scalars["String"]>;
};

export enum AccountType {
  Admin = "admin",
  Seller = "seller",
  Buyer = "buyer",
}

export type AccountDeletionRequest = {
  __typename?: "AccountDeletionRequest";
  id: Scalars["ID"];
  account: Account;
  accountId: Scalars["ID"];
  createdAt: Scalars["String"];
  updatedAt: Scalars["String"];
  status: AccountDeletionRequestStatus;
};

export enum AccountDeletionRequestStatus {
  Pending = "pending",
  Deleted = "deleted",
}

export type AccountVerification = {
  __typename?: "AccountVerification";
  id: Scalars["ID"];
  createdAt: Scalars["DateTime"];
  updatedAt: Scalars["DateTime"];
  userId: Scalars["ID"];
  status: AccountVerificationStatus;
  acceptedById?: Maybe<Scalars["ID"]>;
  username: Scalars["String"];
  fullName: Scalars["String"];
  knownAs: Scalars["String"];
  categoryId: Scalars["ID"];
  idPhoto: Scalars["String"];
};

export enum AccountVerificationStatus {
  Pending = "pending",
  Rejected = "rejected",
  Accepted = "accepted",
}

export type CookiesSetting = {
  __typename?: "CookiesSetting";
  id: Scalars["ID"];
  title: Scalars["String"];
  description: Scalars["String"];
  required: Scalars["Boolean"];
  benefits: Array<Scalars["String"]>;
  cons: Array<Scalars["String"]>;
};

export type UserCookiesSettings = {
  __typename?: "UserCookiesSettings";
  id: Scalars["ID"];
  userId: Scalars["ID"];
  acceptedCookiesIds: Array<Scalars["String"]>;
  acceptedRequired: Scalars["Boolean"];
};

export type RequiredAction = {
  __typename?: "RequiredAction";
  /** Example field (placeholder) */
  exampleField: Scalars["Int"];
};

export type UserContact = {
  __typename?: "UserContact";
  gmail?: Maybe<Scalars["String"]>;
  yahoo?: Maybe<Scalars["String"]>;
  whatsapp?: Maybe<Scalars["String"]>;
  outlook?: Maybe<Scalars["String"]>;
};

export type Query = {
  __typename?: "Query";
  requiredActions: Array<RequiredAction>;
  requiredAction: RequiredAction;
  getMyContacts: UserContact;
  getAccountVerificationRequests: Array<AccountVerification>;
  acceptAccountVerification: Scalars["Boolean"];
  getCookiesSettings: Array<CookiesSetting>;
  getMyCookiesSettings: UserCookiesSettings;
  getFilteredSellers: Array<Account>;
  getFilteredBuyers: Array<Account>;
  adminGetAccount: Account;
  getPendingSellers: Array<Account>;
  getAccountDeletionRequests: Array<AccountDeletionRequest>;
};

export type QueryRequiredActionArgs = {
  id: Scalars["Int"];
};

export type QueryAcceptAccountVerificationArgs = {
  id: Scalars["String"];
};

export type QueryGetFilteredSellersArgs = {
  getSellersInput: GetFilteredSellersAccountsInput;
};

export type QueryGetFilteredBuyersArgs = {
  getBuyersInput: GetBuyersAccountsInput;
};

export type QueryAdminGetAccountArgs = {
  id: Scalars["String"];
};

export type QueryGetPendingSellersArgs = {
  pagination: GqlPaginationInput;
};

export type QueryGetAccountDeletionRequestsArgs = {
  args: GetAccountDeletionRequestsInput;
};

export type GetFilteredSellersAccountsInput = {
  pagination: GqlPaginationInput;
  name?: Maybe<Scalars["String"]>;
  id?: Maybe<Scalars["String"]>;
  products?: Maybe<Scalars["Int"]>;
  sales?: Maybe<Scalars["Int"]>;
  email?: Maybe<Scalars["String"]>;
  status?: Maybe<AccountStatus>;
  date?: Maybe<Scalars["String"]>;
  balance?: Maybe<Scalars["Float"]>;
};

export type GqlPaginationInput = {
  page: Scalars["Int"];
  take: Scalars["Int"];
};

export enum AccountStatus {
  Active = "active",
  Pending = "pending",
  InActive = "inActive",
  Suspended = "suspended",
  Refused = "refused",
}

export type GetBuyersAccountsInput = {
  pagination: GqlPaginationInput;
  name?: Maybe<Scalars["String"]>;
  id?: Maybe<Scalars["String"]>;
  email?: Maybe<Scalars["String"]>;
  status?: Maybe<AccountStatus>;
  date?: Maybe<Scalars["String"]>;
  balance?: Maybe<Scalars["Float"]>;
};

export type GetAccountDeletionRequestsInput = {
  username?: Maybe<Scalars["String"]>;
  email?: Maybe<Scalars["String"]>;
  status?: Maybe<AccountDeletionRequestStatus>;
  dateAdded?: Maybe<Scalars["String"]>;
  pagination: GqlPaginationInput;
};

export type Mutation = {
  __typename?: "Mutation";
  createRequiredAction: RequiredAction;
  updateRequiredAction: RequiredAction;
  removeRequiredAction: RequiredAction;
  updateMyContact: Scalars["Boolean"];
  requestAccountVerification: Scalars["Boolean"];
  refuseAccountVerification: Scalars["Boolean"];
  updateMyCookiesSettings: Scalars["Boolean"];
  updateUserLocation: Scalars["Boolean"];
  adminEditAccount: Account;
  acceptSellerAccount: Scalars["Boolean"];
  declineSellerAccount: Scalars["Boolean"];
  suspenseAccount: Scalars["Boolean"];
  register: Scalars["String"];
  requestAccountDeletion: Scalars["Boolean"];
  getMyAccount: Account;
  editAccount: Account;
  requestIdVerification: Scalars["String"];
  provideVVCPicture: Scalars["Boolean"];
};

export type MutationCreateRequiredActionArgs = {
  createRequiredActionInput: CreateRequiredActionInput;
};

export type MutationUpdateRequiredActionArgs = {
  updateRequiredActionInput: UpdateRequiredActionInput;
};

export type MutationRemoveRequiredActionArgs = {
  id: Scalars["Int"];
};

export type MutationUpdateMyContactArgs = {
  args: AddContactInput;
};

export type MutationRequestAccountVerificationArgs = {
  args: CreateAccountVerificationInput;
};

export type MutationRefuseAccountVerificationArgs = {
  args: RefuseAccountVerificationRequest;
};

export type MutationUpdateMyCookiesSettingsArgs = {
  args: UpdateUserCookiesSettingsInput;
};

export type MutationUpdateUserLocationArgs = {
  updateLocation: UpdateUserLocationInput;
};

export type MutationAdminEditAccountArgs = {
  editAccountInput: UpdateSellerAccountAdminInput;
};

export type MutationAcceptSellerAccountArgs = {
  id: Scalars["String"];
};

export type MutationDeclineSellerAccountArgs = {
  args: DeclineSellerAccountRequest;
};

export type MutationSuspenseAccountArgs = {
  args: SuspenseAccountAdminInput;
};

export type MutationRegisterArgs = {
  RegisterInput: CreateAccountInput;
};

export type MutationRequestAccountDeletionArgs = {
  args: DeleteAccountRequestInput;
};

export type MutationEditAccountArgs = {
  editAccountInput: UpdateAccountInput;
};

export type MutationRequestIdVerificationArgs = {
  requestInput: CreateIdentityVerificationInput;
};

export type MutationProvideVvcPictureArgs = {
  pic: Scalars["String"];
};

export type CreateRequiredActionInput = {
  /** Example field (placeholder) */
  exampleField: Scalars["Int"];
};

export type UpdateRequiredActionInput = {
  /** Example field (placeholder) */
  exampleField?: Maybe<Scalars["Int"]>;
  id: Scalars["Int"];
};

export type AddContactInput = {
  gmail?: Maybe<Scalars["String"]>;
  yahoo?: Maybe<Scalars["String"]>;
  whatsapp?: Maybe<Scalars["String"]>;
  outlook?: Maybe<Scalars["String"]>;
};

export type CreateAccountVerificationInput = {
  username: Scalars["String"];
  fullName: Scalars["String"];
  knownAs: Scalars["String"];
  categoryId: Scalars["ID"];
  idPhoto: Scalars["String"];
};

export type RefuseAccountVerificationRequest = {
  id: Scalars["ID"];
  reason: Scalars["String"];
};

export type UpdateUserCookiesSettingsInput = {
  ids: Array<Scalars["ID"]>;
};

export type UpdateUserLocationInput = {
  lat: Scalars["Float"];
  lon: Scalars["Float"];
};

export type UpdateSellerAccountAdminInput = {
  firstName?: Maybe<Scalars["String"]>;
  lastName?: Maybe<Scalars["String"]>;
  email?: Maybe<Scalars["String"]>;
  password?: Maybe<Scalars["String"]>;
  confirmPassword?: Maybe<Scalars["String"]>;
  accountType?: Maybe<RegisterAccountType>;
  companyRegisterationNumber?: Maybe<Scalars["String"]>;
  id: Scalars["ID"];
};

export enum RegisterAccountType {
  Seller = "seller",
  Buyer = "buyer",
}

export type DeclineSellerAccountRequest = {
  id: Scalars["ID"];
  reason: Scalars["String"];
};

export type SuspenseAccountAdminInput = {
  userId: Scalars["ID"];
  rejectReason?: Maybe<Scalars["String"]>;
};

export type CreateAccountInput = {
  firstName: Scalars["String"];
  lastName: Scalars["String"];
  email: Scalars["String"];
  password: Scalars["String"];
  confirmPassword: Scalars["String"];
  accountType: RegisterAccountType;
};

export type DeleteAccountRequestInput = {
  reason: Scalars["String"];
  password: Scalars["String"];
  sendData?: Maybe<Scalars["Boolean"]>;
};

export type UpdateAccountInput = {
  firstName?: Maybe<Scalars["String"]>;
  lastName?: Maybe<Scalars["String"]>;
  email?: Maybe<Scalars["String"]>;
  password?: Maybe<Scalars["String"]>;
  confirmPassword?: Maybe<Scalars["String"]>;
  accountType?: Maybe<RegisterAccountType>;
  companyRegisterationNumber?: Maybe<Scalars["String"]>;
};

export type CreateIdentityVerificationInput = {
  firstName: Scalars["String"];
  lastName: Scalars["String"];
  fullAddress: Scalars["String"];
  dateOfBirth: Scalars["String"];
  id_front: Scalars["String"];
  id_back: Scalars["String"];
};
