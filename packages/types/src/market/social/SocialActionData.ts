import { ShopSocialProfileInfo, SocialStoryDataWithUser } from "./Social";
export interface SocialActionData extends SocialStoryDataWithUser {
  id: string;
  likes: number;
  dislikes: number;
  comments: number;
  shares: number;
  title: string;
  storyType: "text" | "video" | "image";
  url: string;
  storyCreationDate: string;
  storyViews: number;
  storySrc: string;
  user: ShopSocialProfileInfo;
}
