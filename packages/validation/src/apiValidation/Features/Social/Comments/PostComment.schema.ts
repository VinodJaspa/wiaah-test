import { CreatePaginationApiResponseValidationSchemaOf } from "../../../SharedSchema";
import { array, InferType, number, object, string } from "yup";
import { PostAttachment } from "../Shared/PostRelated.schema";
import { SocialProfileInfoValidationSchema } from "../Shop";

export const PostCommentValidationSchema = object({
  id: string().required(),
  user: SocialProfileInfoValidationSchema,
  createdAt: string().required(),
  content: string().required(),
  hashTags: array().of(string().required()).min(0).required(),
  replies: number().required(),
  likes: number().required(),
  attachment: PostAttachment().optional(),
});

export const PostComment = () => PostCommentValidationSchema;

export const PostCommentsApiResponseValidationSchema =
  CreatePaginationApiResponseValidationSchemaOf(PostCommentValidationSchema);
