import {
  CreatePaginationApiResponseValidationSchemaOf,
  Location,
} from "../../../SharedSchema";
import { boolean, number, object, string } from "yup";
import { ServicesTypeValidationSchema } from "../../Services";

export const ServiceOnMapLocationDataValidationSchema = object({
  serviceType: ServicesTypeValidationSchema.required(),
  serviceData: object({
    rating: number().required(),
    price: number().required(),
    discount: number().required(),
    title: string().required(),
    location: Location().required(),
    thumbnail: string().required(),
    label: string().required(),
    reviews: number().required(),
    id: string().required(),
  }),
  sellerInfo: object({
    name: string().required(),
    profession: string().required(),
    thumbnail: string().required(),
    verified: boolean().required(),
  }),
});

export const ServicesOnMapLocationsApiResponseValidationSchema =
  CreatePaginationApiResponseValidationSchemaOf(
    ServiceOnMapLocationDataValidationSchema.required()
  );
