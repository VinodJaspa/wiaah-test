import { CreatePaginationApiResponseValidationSchemaOf } from "../../../SharedSchema";
import { ServicesType } from "types";
import { mixed, object, string } from "yup";

export type SerivceStatus = "active" | "inActive" | "pending" | "banned";

export const MyServiceValidationSchema = object({
  id: string().required(),
  title: string().required(),
  type: mixed<ServicesType>()
    .oneOf([
      "beauty_center",
      "general",
      "health_center",
      "holidays_rentals",
      "hotel",
      "resturant",
      "vehicle",
    ])
    .required(),
  status: mixed<SerivceStatus>()
    .oneOf(["active", "banned", "pending", "inActive"])
    .required(),
  thumbnail: string().required(),
});

export const MyServicesApiResponseValidationSchema =
  CreatePaginationApiResponseValidationSchemaOf(MyServiceValidationSchema);
