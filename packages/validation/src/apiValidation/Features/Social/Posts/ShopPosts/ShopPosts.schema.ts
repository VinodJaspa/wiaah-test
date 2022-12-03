import { array, number, object, string } from "yup";
import { PostAttachment } from "../../Shared/PostRelated.schema";
import { SocialProfileInfoValidationSchema } from "../../../Social";
import { Cashback } from "../../../Products";
import { DiscountUnits } from "../../../../SharedSchema";
import { PostCommentValidationSchema } from "../../Comments/PostComment.schema";
export const ShopPostValidationSchema = object({
  id: string().required(),
  attachments: array().of(PostAttachment().required()).min(0).required(),
  rating: number().required(),
  cashback: Cashback().required(),
  discount: DiscountUnits().required(),
  user: SocialProfileInfoValidationSchema.required(),
  title: string().required(),
  price: number().required(),
  views: number().required(),
  likes: number().required(),
  noOfComments: number().required(),
  comments: array()
    .of(PostCommentValidationSchema.required())
    .min(0)
    .required(),
});
