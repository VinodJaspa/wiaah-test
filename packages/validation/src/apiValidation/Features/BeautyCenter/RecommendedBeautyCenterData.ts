import { CreatePaginationValidationSchemaOf, Rating } from "../../SharedSchema";
import { array, number, object, string } from "yup";

export const RecommendedBeautyCenterData = object({
  name: string().required(),
  rate: Rating().required(),
  reviews: number().required(),
  owners: array().of(string().required()).min(0).required(),
  thumbnail: string().required(),
});

export const RecommendedBeautyCenterApiResponseData =
  CreatePaginationValidationSchemaOf(
    array().of(RecommendedBeautyCenterData).min(0).required()
  );
