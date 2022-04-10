import { CashBack } from "./CartSummary";

export interface ProfileInfo {
  id: string;
  verifed?: boolean;
  name: string;
  thumbnail: string;
  accountType: "seller" | "buyer";
}

export interface ShopScoialProfileInfo extends ProfileInfo {
  publications: number;
  subscriptions: number;
  subscribers: number;
  countryCode: string;
  location: string;
}
export interface SubscribersUserInfo {
  id: string;
  name: string;
  avatar: string;
  profileUrl: string;
}

export interface PostAttachment {
  type: "image" | "video";
  src: string;
}

export interface PostComment {
  user: ProfileInfo;
  replies: number;
  likes: number;
  createdAt: string;
  content: string;
  attachment?: PostAttachment | null;
}

export interface PostInfo {
  createdAt: string;
  id: string;
  content?: string;
  tags: string[];
  attachment?: PostAttachment;
  numberOfLikes: number;
  numberOfComments: number;
  comments?: PostComment[];
}

export interface PostCardInfo {
  profileInfo: ProfileInfo;
  postInfo: PostInfo;
}

export interface Interaction {
  type: Interactions;
}

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
  attachment: PostAttachment;
  rating: number;
  type: "product" | "service";
  cashback: CashBack;
  discount: CashBack;
  user: ProfileInfo;
  title: string;
  price: number;
  oldPrice: number;
  views: number;
  likes: number;
  noOfComments: number;
  comments: PostComment[];
}

export interface AffiliationOfferCardInfo {
  user: ProfileInfo;
  commission: number;
  price: number;
  affiliationLink: string;
  attachment: PostAttachment;
  name: string;
  createdAt: string;
  comments?: PostComment[];
  showComments?: boolean;
  noOfComments: number;
  noOfLikes: number;
}
