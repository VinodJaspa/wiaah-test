import { CreatePaginationApiResponseValidationSchemaOf } from "../../../../SharedSchema";
import { object, string } from "yup";
import {
  HashTags,
  PostInteractionsValidationSchema,
} from "../../Shared/PostRelated.schema";
import { SocialProfileInfoValidationSchema } from "../../Shop";

export const ServicesPostsValidationSchema = object({
  id: string().required(),
  name: string().required(),
  thumbnail: string().required(),
  label: string().required(),
  type: string().required(),
  hashtags: HashTags(),
  content: string().required(),
  user: SocialProfileInfoValidationSchema.required(),
  postInteraction: PostInteractionsValidationSchema.required(),
});

export const ServicesPostsApiResponseValidationSchema =
  CreatePaginationApiResponseValidationSchemaOf(ServicesPostsValidationSchema);
