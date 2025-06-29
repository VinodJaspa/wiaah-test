import { CashBack } from "types";
import { FlagIconCode } from "react-flag-kit";

export interface ProfileInfo {
  id: string;
  verifed?: boolean;
  name: string;
  thumbnail: string;
  accountType: "seller" | "buyer";
  public: boolean;
  profession?: string;
  photo?: string;
}

export interface ShopSocialProfileInfo extends ProfileInfo {
  publications: number;
  subscriptions: number;
  subscribers: number;
  countryCode: string;
  location: string;
  bio?: string;
  links?: string[];
  isFollowed: boolean;
  profileCoverPhoto: string;
}
export interface SubscribersUserInfo {
  id: string;
  name: string;
  avatar: string;
  profileUrl: string;
}

export interface PostAttachment {
  type: string;
  src: string;
  postLocation?: string;
}

export interface CommentData {
  user: ProfileInfo;
  createdAt: string;
  content: string;
  hashTags?: string[];
  description?: string;
}

export interface PostComment {
  id: string;
  user: ProfileInfo;
  replies: number;
  likes: number;
  createdAt: string;
  content: string;
  attachment?: PostAttachment | null;
  hashTags?: string[];
}

export interface PostInfo {
  createdAt: string;
  id: string;
  content?: string;
  tags: string[];
  views?: number;
  attachments?: PostAttachment[];
  numberOfLikes: number;
  numberOfComments: number;
  numberOfShares: number;
  comments?: PostComment[];
  thumbnail?: string;
  postType?: string;
}

export enum AccountType {
  Admin = "admin",
  Buyer = "buyer",
  Mod = "mod",
  Seller = "seller",
  Guest = "guest",
 
}

export type PostCardInfo = {
  profileInfo: ProfileInfo;
  postInfo: PostInfo;
};

export interface Interaction {
  type: Interactions;
}

export type ShareMotheds =
  | "story"
  | "followers"
  | "facebook"
  | "twitter"
  | "whatsapp"
  | "pinterest";

export type Interactions =
  | "like"
  | "share"
  | "comment"
  | "rate"
  | "addToCart"
  | "saveToWL"
  | "book"
  | "moreOpts";

export interface ShopCardInfo {
  id: string;
  attachments: PostAttachment[];
  rating: number;
  type: "product" | "service";
  cashback: CashBack;
  discount: CashBack;
  user: ProfileInfo;
  title: string;
  price: number;
  oldPrice: number;
  views?: number;
  likes: number;
  noOfComments: number;
  comments: PostComment[];
  url: string;
  createdAt: string;
  shares?: number;
}

export interface AffiliationOfferCardInfo {
  views?: number;
  user: ProfileInfo;
  id: string;
  commission: number;
  price: number;
  affiliationLink: string;
  attachments: PostAttachment[];
  name: string;
  createdAt: string;
  comments?: PostComment[];
  showComments?: boolean;
  noOfComments: number;
  noOfLikes: number;
  url: string;
}

export interface HashTagCardInfo {
  title: string;
  postInfo: PostInfo;
  profileInfo: ProfileInfo;
}

export interface SocialStoryData {
  id: string;
  storyType:
    | "text"
    | "image"
    | "video"
    | "newsFeedPost"
    | "shopPost"
    | "affiliationPost"
    | "action"
    | "servicePost";
  storySrc?: string;
  storyText?: string;
  storyCreationDate: string;
  storyViews: number;
}

export interface SocialStoryContentData
  extends Pick<
    SocialStoryData,
    "storyType" | "storySrc" | "storyText" | "id"
  > {}

export interface SocialStoryDataWithUser extends SocialStoryData {
  user: ProfileInfo;
}

export interface StorySeenByUserInfo {
  photoSrc: string;
  name: string;
}
export type ProductAttribute = {
  __typename?: "ProductAttribute";
  displayType: ProductAttributeDisplayType;
  id: string;
  name: string;
  selectionType: ProductAttributeSelectionType;
  values: Array<ProductAttributeValue>;
};

export type ProductAttributeValue = {
  __typename?: "ProductAttributeValue";
  id: string;
  name: string;
  price?: number;
  value: string;
};

export enum ProductAttributeDisplayType {
  Color = "color",
  Text = "text",
}

export enum ProductAttributeSelectionType {
  Multiple = "multiple",
  Single = "single",
}
export enum ProductCondition {
  New = "new",
  Recondition = "recondition",
  Used = "used",
}
export type Discount = {
  __typename?: "Discount";
  amount: string;
  id: string;
  units: number;
};
export type ProductPresentation = {
  __typename?: "ProductPresentation";
  src: string;
  type: PresentationType;
};

export enum PresentationType {
  Image = "image",
  Video = "video",
}
export type ProductSelectAttribute = {
  __typename?: "ProductSelectAttribute";
  id: string;
  values: string[];
};
export enum ShippingType {
  ClickAndCollect = "click_and_collect",
  Free = "free",
  Paid = "paid",
}
export type ShippingDeliveryTimeRange = {
  from: number;
  to: number;
};
export type ShippingDetails = {
  __typename?: "ShippingDetails";
  available: boolean;
  cost?: number;
  country: string;
  deliveryTimeRange?: ShippingDeliveryTimeRange;
  shippingRulesIds: string[];
  shippingTypes?: ShippingType[];
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
export enum ProductUsageStatus {
  New = "new",
  Used = "used",
}
export enum VisibilityEnum {
  Hidden = "hidden",
  Public = "public",
}

export enum CashbackType {
  Cash = "cash",
  Percent = "percent",
}

export enum AccountStatus {
  Active = "active",
  InActive = "inActive",
  Pending = "pending",
  Refused = "refused",
  Suspended = "suspended",
}

export enum AffiliationStatus {
  Active = "active",
  InActive = "inActive",
}
