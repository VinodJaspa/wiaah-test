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
  photo?:string;
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
export type PostAttachmentTypes = string;

export interface PostAttachment {
  type: PostAttachmentTypes;
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
}

export type PostCardInfo =  {
  profileInfo: ProfileInfo;
  postInfo: PostInfo;
}

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
  createdAt:string
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
