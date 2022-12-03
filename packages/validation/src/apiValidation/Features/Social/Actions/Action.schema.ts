import { mixed, number, object, string } from "yup";

export type ActionType = "text" | "video" | "image";

export const ActionValidationSchema = object({
  id: string().required(),
  likes: number().required(),
  dislikes: number().required(),
  comments: number().required(),
  shares: number().required(),
  title: string().required(),
  actionType: mixed<ActionType>().oneOf(["image", "text", "video"]),
});
