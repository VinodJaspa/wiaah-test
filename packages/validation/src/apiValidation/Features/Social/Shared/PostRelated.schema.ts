import { array, mixed, number, object, string } from "yup";
import { SocialProfileInfoValidationSchema } from "../Shop";

export const HashTag = () => string();

export type PostAttachmentType = "video" | "image";

export const PostAttachment = () =>
  object({
    type: mixed<PostAttachmentType>().oneOf(["image", "video"]),
    src: string().required(),
  });

export const PostCommentValidationSchema = object({
  id: string().required(),
  user: SocialProfileInfoValidationSchema,
  createdAt: string().required(),
  content: string().required(),
  hashTags: array().of(string().required()).min(0).required(),
  replies: number().required(),
  likes: number().required(),
  attachment: PostAttachment().required(),
});

export const PostComment = () => PostCommentValidationSchema;
