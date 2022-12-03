import { createApiResponseValidationSchema } from "../../../../SharedSchema";
import { array, number, object, string } from "yup";
import { SocialProfileInfoValidationSchema } from "../../Shop";
import {
  HashTags,
  PostAttachment,
  PostInteractionsValidationSchema,
} from "../../Shared/PostRelated.schema";
import { Cashback } from "../../../Products";

export const ServicePostDataValidationSchema = object({
  id: string().required(),
  name: string().required(),
  attachements: array().of(PostAttachment().required()).min(0).required(),
  label: string().required(),
  type: string().required(),
  content: string().required(),
  hashtags: HashTags().required(),
  discount: number().required(),
  cashback: Cashback().required(),
  views: number().required(),
  price: number().required(),
  rate: number().required(),
  createdAt: string(),
  profileInfo: SocialProfileInfoValidationSchema.required(),
  postInteraction: PostInteractionsValidationSchema.required(),
});

export const ServicePostDataApiResponseValidationSchema =
  createApiResponseValidationSchema(ServicePostDataValidationSchema);
