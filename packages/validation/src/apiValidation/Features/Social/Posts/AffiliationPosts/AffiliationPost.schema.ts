import { array, number, object, string } from "yup";
import { PostAttachment, PostComment } from "../../Shared/PostRelated.schema";
import { SocialProfileInfoValidationSchema } from "../../Shop";

export const AffiliationPostValidationSchema = object({
  id: string().required(),
  user: SocialProfileInfoValidationSchema.required(),
  price: number().required(),
  title: string().required(),
  createdAt: string().required(),
  attachements: array().of(PostAttachment().required()).min(0).required(),
  commission: number().required(),
  comments: array().of(PostComment().required()).min(0).required(),
  noOfcomments: number().required(),
  noOfLikes: number().required(),
});
