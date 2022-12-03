import { object } from "yup";
import {
  CreatePaginationApiResponseValidationSchemaOf,
  locationValidationSchema,
} from "../../../../SharedSchema";
import { ServicePostMetaDataValidationSchema } from "./ServicePostMetaData.schema";

export const ServicePostOnMapValidationSchema =
  ServicePostMetaDataValidationSchema.concat(
    object({ location: locationValidationSchema })
  );

export const ServicePostsOnMapApiResponseValidationSchema =
  CreatePaginationApiResponseValidationSchemaOf(
    ServicePostOnMapValidationSchema
  );
