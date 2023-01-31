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
};

export type MembershipTurnoverRule = {
  __typename?: "MembershipTurnoverRule";
  id: Scalars["ID"];
  membershipId: Scalars["ID"];
  priceId?: Maybe<Scalars["String"]>;
  usage: Scalars["Float"];
  commission: Scalars["Float"];
  commissionType: CommissionType;
};

export enum CommissionType {
  Fixed = "fixed",
  Percentage = "percentage",
}

export type MembershipIncludedItem = {
  __typename?: "MembershipIncludedItem";
  title: Scalars["String"];
};

export type Membership = {
  __typename?: "Membership";
  id: Scalars["ID"];
  name: Scalars["String"];
  priceId?: Maybe<Scalars["String"]>;
  commissionOn: CommissionOn;
  recurring: Recurring;
  turnover_rules: Array<MembershipTurnoverRule>;
  includings: Array<MembershipIncludedItem>;
};

export enum CommissionOn {
  ExternalClick = "external_click",
  Sale = "sale",
  Revenue = "revenue",
}

export enum Recurring {
  Day = "day",
  Month = "month",
  Week = "week",
  Year = "year",
}

export type Account = {
  __typename?: "Account";
  membershipId?: Maybe<Scalars["ID"]>;
  membership?: Maybe<Membership>;
  Membership: Membership;
};

export type MembershipSubscription = {
  __typename?: "MembershipSubscription";
  userId: Scalars["ID"];
  membershipId: Scalars["ID"];
  membership: Membership;
  startAt: Scalars["String"];
  endAt: Scalars["String"];
};

export type Query = {
  __typename?: "Query";
  getSubscriableMemberships: Array<Membership>;
  getMyMembership?: Maybe<MembershipSubscription>;
};

export type Mutation = {
  __typename?: "Mutation";
  createMembership: Membership;
  updateMembership: Membership;
};

export type MutationCreateMembershipArgs = {
  args: CreateMembershipInput;
};

export type MutationUpdateMembershipArgs = {
  args: UpdateMembershipInput;
};

export type CreateMembershipInput = {
  name: Scalars["String"];
  commissionOn: CommissionOn;
  recurring: Recurring;
  turnover_rules: Array<MembershipTurnoverRuleInput>;
  includings: Array<MembershipIncludedItemInput>;
};

export type MembershipTurnoverRuleInput = {
  usage: Scalars["Float"];
  commission: Scalars["Float"];
  commissionType: CommissionType;
};

export type MembershipIncludedItemInput = {
  title: Scalars["String"];
};

export type UpdateMembershipInput = {
  name?: Maybe<Scalars["String"]>;
  comissionOn?: Maybe<CommissionOn>;
  includings?: Maybe<Array<UpdateMembershipIncludedItemInput>>;
  id: Scalars["ID"];
  turnover_rules?: Maybe<Array<UpdateMembershipTurnoverRuleInput>>;
};

export type UpdateMembershipIncludedItemInput = {
  title: Scalars["String"];
};

export type UpdateMembershipTurnoverRuleInput = {
  turnover_amount?: Maybe<Scalars["Float"]>;
  price?: Maybe<Scalars["Float"]>;
  commission?: Maybe<Scalars["Float"]>;
  id: Scalars["ID"];
};
