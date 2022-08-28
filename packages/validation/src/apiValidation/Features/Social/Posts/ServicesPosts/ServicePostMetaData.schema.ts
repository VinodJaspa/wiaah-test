import { CreatePaginationApiResponseValidationSchemaOf } from "../../../../SharedSchema";
import { object, string } from "yup";
import { PostAttachments } from "../../Shared/PostRelated.schema";

export const ServicePostMetaDataValidationSchema = object({
  id: string().required(),
  name: string().required(),
  attachments: PostAttachments().required(),
  label: string().required(),
  type: string().required(),
});

export const ServicePostsMetaDataApiResponseValidationSchema =
  CreatePaginationApiResponseValidationSchemaOf(
    ServicePostMetaDataValidationSchema
  );
