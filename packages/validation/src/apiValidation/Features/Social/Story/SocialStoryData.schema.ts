import { number, object, string } from "yup";

// export type StoryType =
//   | "text"
//   | "image"
//   | "video"
//   | "newsFeedPost"
//   | "shopPost"
//   | "affiliationPost"
//   | "action";

// export const storyTypes: StoryType[] = [
//   "action",
//   "affiliationPost",
//   "image",
//   "newsFeedPost",
//   "shopPost",
//   "text",
//   "video",
// ];

export const SocialStoryDataValidationSchema = object({
  id: string().required(),
  storySrc: string().optional(),
  content: string().required(),
  views: number().required(),
  user: object({
    name: string().required(),
    thumbnail: string().required(),
  }),
});
