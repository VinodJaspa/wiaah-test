import { SocialStoryDataWithUser } from "../Social";

export interface SocialActionData extends SocialStoryDataWithUser {
  likes: number;
  dislikes: number;
  comments: number;
  shares: number;
  title: string;
}
