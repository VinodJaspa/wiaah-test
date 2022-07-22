import {
  locationValidationSchema,
  Rating,
  dateRange,
  CreatePaginationValidationSchemaOf,
} from "../../../SharedSchema";
import { string, number, object, array } from "yup";

export const HotelMetaDataValidationSchema = object({
  name: string().required(),
  id: string().required(),
  provider: string().required(),
  thumbnail: string().required(),
  location: locationValidationSchema,
  rate: Rating().required(),
  description: string().required(),
  price: number().min(0).required(),
  date: dateRange().required(),
});

export const HotelsMetaDataApiResponseValidationSchema =
  CreatePaginationValidationSchemaOf(
    array().of(HotelMetaDataValidationSchema).min(0).required()
  );
