import { Account } from "@features/Accounts";
import { Product } from "@features/Products/types";
import { Service } from "@features/Services/Services/types";

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

export type Affiliation = {
  __typename?: "Affiliation";
  id: Scalars["ID"];
  sellerId: Scalars["ID"];
  itemId: Scalars["ID"];
  status: AffiliationStatus;
  itemType: Scalars["String"];
  commision: Scalars["Float"];
  createdAt: Scalars["DateTime"];
  updatedAt: Scalars["DateTime"];
  expireAt: Scalars["DateTime"];
  product?: Maybe<Product>;
  service?: Maybe<Service>;
};

export enum AffiliationStatus {
  Active = "active",
  InActive = "inActive",
}

export type AffiliationPurchase = {
  __typename?: "AffiliationPurchase";
  id: Scalars["ID"];
  itemId: Scalars["ID"];
  itemType: Scalars["String"];
  service?: Maybe<Service>;
  product?: Maybe<Product>;
  sellerId: Scalars["ID"];
  affiliatorId: Scalars["ID"];
  purchaserId: Scalars["ID"];
  createdAt: Scalars["DateTime"];
  paidCommissionPercent: Scalars["Float"];
  paidCommissionAmount: Scalars["Float"];
  seller: Account;
  purchaser: Account;
  affiliator: Account;
};

export type Query = {
  __typename?: "Query";
  getMyProductsAffiliationHistory: Array<AffiliationPurchase>;
  getUserAffiliationHistory: Array<AffiliationPurchase>;
  getUserAffiliationsPurchases: Array<AffiliationPurchase>;
  getFilteredAffiliationsHistory: Array<AffiliationPurchase>;
  getUserAffiliations: Array<Affiliation>;
  getFilteredAffiliations: Array<Affiliation>;
  getMyAffiliations: Array<Affiliation>;
};

export type QueryGetMyProductsAffiliationHistoryArgs = {
  args: GetAffiliationHistoryInput;
};

export type QueryGetUserAffiliationHistoryArgs = {
  id: Scalars["String"];
};

export type QueryGetUserAffiliationsPurchasesArgs = {
  args: GetUserAffiliationsPurchasesInput;
};

export type QueryGetFilteredAffiliationsHistoryArgs = {
  filters: GetFilteredAffiliationHistoryInput;
};

export type QueryGetUserAffiliationsArgs = {
  args: GetUserAffiliationsInput;
};

export type QueryGetFilteredAffiliationsArgs = {
  filters: GetFilteredAffiliationsInput;
};

export type QueryGetMyAffiliationsArgs = {
  args: GetMyAffiliationsInput;
};

export type GetAffiliationHistoryInput = {
  pagination: GqlPaginationInput;
};

export type GqlPaginationInput = {
  page: Scalars["Int"];
  take: Scalars["Int"];
};

export type GetUserAffiliationsPurchasesInput = {
  pagination: GqlPaginationInput;
  id: Scalars["ID"];
};

export type GetFilteredAffiliationHistoryInput = {
  seller?: Maybe<Scalars["String"]>;
  purchaser?: Maybe<Scalars["String"]>;
  price?: Maybe<Scalars["Float"]>;
  title?: Maybe<Scalars["String"]>;
  affiliator?: Maybe<Scalars["String"]>;
  commission?: Maybe<Scalars["Float"]>;
  money_generated?: Maybe<Scalars["Float"]>;
  purchasedBefore?: Maybe<Scalars["String"]>;
  purchasedAfter?: Maybe<Scalars["String"]>;
  affiliation_link?: Maybe<Scalars["String"]>;
  pagination: GqlPaginationInput;
};

export type GetUserAffiliationsInput = {
  pagination: GqlPaginationInput;
  id: Scalars["ID"];
};

export type GetFilteredAffiliationsInput = {
  seller: Scalars["String"];
  commission: Scalars["Float"];
  price: Scalars["Float"];
  link: Scalars["String"];
  createdBefore: Scalars["DateTime"];
  createdAfter: Scalars["DateTime"];
};

export type GetMyAffiliationsInput = {
  pagination: GqlPaginationInput;
};

export type Mutation = {
  __typename?: "Mutation";
  updateAffiliation: Affiliation;
  createNewAffiliationProduct: Affiliation;
  deleteAffiliation: Affiliation;
};

export type MutationUpdateAffiliationArgs = {
  args: UpdateAffiliationInput;
};

export type MutationCreateNewAffiliationProductArgs = {
  args: CreateAffiliationInput;
};

export type MutationDeleteAffiliationArgs = {
  id: Scalars["ID"];
};

export type UpdateAffiliationInput = {
  itemId?: Maybe<Scalars["ID"]>;
  itemType?: Maybe<Scalars["String"]>;
  commision?: Maybe<Scalars["Float"]>;
  expireAt?: Maybe<Scalars["String"]>;
  id: Scalars["ID"];
};

export type CreateAffiliationInput = {
  itemId: Scalars["ID"];
  itemType: Scalars["String"];
  commision: Scalars["Float"];
  expireAt: Scalars["String"];
};
