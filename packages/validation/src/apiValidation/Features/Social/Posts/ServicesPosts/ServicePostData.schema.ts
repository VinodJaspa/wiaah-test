import { createApiResponseValidationSchema } from "../../../../SharedSchema";
import { array, object, string } from "yup";
import { SocialProfileInfoValidationSchema } from "../../Shop";
import {
  HashTags,
  PostInteractionsValidationSchema,
} from "../../Shared/PostRelated.schema";

export const ServicePostDataValidationSchema = object({
  id: string().required(),
  name: string().required(),
  thumbnail: string().required(),
  label: string().required(),
  type: string().required(),
  hashtags: HashTags().required(),
  profileInfo: SocialProfileInfoValidationSchema.required(),
  postInteraction: PostInteractionsValidationSchema.required(),
});

export const ServicePostDataApiResponseValidationSchema =
  createApiResponseValidationSchema(ServicePostDataValidationSchema);
