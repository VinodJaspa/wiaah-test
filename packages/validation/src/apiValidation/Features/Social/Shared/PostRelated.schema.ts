import { array, mixed, number, object, string } from "yup";
import { SocialProfileInfoValidationSchema } from "../Shop";

export const HashTag = () => string();
export const HashTags = () => array().of(string().required()).min(0).required();

export type PostAttachmentType = "video" | "image";

export const PostAttachment = () =>
  object({
    type: mixed<PostAttachmentType>().oneOf(["image", "video"]).required(),
    src: string().required(),
  });

export const PostInteractionsValidationSchema = object({
  likes: number().min(0).required(),
  comments: number().min(0).required(),
});
