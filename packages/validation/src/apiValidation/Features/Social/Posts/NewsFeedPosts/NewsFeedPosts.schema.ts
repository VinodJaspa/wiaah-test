import { array, number, object, string } from "yup";
import { PostComment } from "../../Comments";
import { HashTag, PostAttachment } from "../../Shared/PostRelated.schema";

export const NewsFeedPostDataValidationSchema = object({
  createdAt: string().required(),
  id: string().required(),
  content: string().required(),
  hashTags: array().of(HashTag().required()).min(0).required(),
  views: number().required(),
  attachments: array().of(PostAttachment().required()),
  numberOfLikes: number().required(),
  numberOfComments: number().required(),
  comments: array().of(PostComment().required()).min(0).required(),
});
