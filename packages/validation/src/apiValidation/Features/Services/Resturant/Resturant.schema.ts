import {
  CreatePaginationValidationSchemaOf,
  Location,
} from "../../../SharedSchema";
import { array, boolean, number, object, string } from "yup";

export const DiscountWithRuleValidationSchema = object({
  amount: number().required(),
  rule: string().required(),
});

export const RuledDiscount = () => DiscountWithRuleValidationSchema;

export const ResturantMetaDataValidationSchema = object({
  id: string().required(),
  name: string().required(),
  rate: number().required(),
  reviewsCount: number().required(),
  isGoodDeal: boolean().required(),
  thumbnails: array().of(string().required()).min(0).required(),
  averagePrice: number().required(),
  location: Location(),
  discount: RuledDiscount().required(),
  tags: array().of(string()).min(0).required(),
});

export const ResturantsMetaDataApiResponseValidationSchema =
  CreatePaginationValidationSchemaOf(
    array().of(ResturantMetaDataValidationSchema).min(0).required()
  );
