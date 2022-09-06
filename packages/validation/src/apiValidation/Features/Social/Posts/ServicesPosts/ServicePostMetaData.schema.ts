import {
  CreatePaginationApiResponseValidationSchemaOf,
  Location,
} from "../../../../SharedSchema";
import { number, object, string } from "yup";
import { PostAttachments } from "../../Shared/PostRelated.schema";

export const ServicePostMetaDataValidationSchema = object({
  id: string().required(),
  name: string().required(),
  attachments: PostAttachments().required(),
  label: string().required(),
  type: string().required(),
  rate: number().required(),
  price: number().required(),
  location: Location().required(),
  reviews: number().required(),
});

export const ServicePostsMetaDataApiResponseValidationSchema =
  CreatePaginationApiResponseValidationSchemaOf(
    ServicePostMetaDataValidationSchema
  );
