import {
  CreatePaginationApiResponseValidationSchemaOf,
  Location,
} from "../../../SharedSchema";
import { ServicesType } from "types";
import { array, boolean, InferType, mixed, number, object, string } from "yup";
import { WorkingDateValidationSchema } from "../HealthCenter";
import { HotelAmenitesValidationSchema } from "../Hotels";
import { ServiceCancelationPolicies } from "../common";
import { RuledDiscount } from "../Resturant";
import { VehicleProprtieValidationSchema } from "../Vehicle";

export type SerivceStatus = "active" | "inActive" | "pending" | "banned";
export const ServicesTypeValidationSchema = mixed<ServicesType>().oneOf([
  "beauty_center",
  "general",
  "health_center",
  "holidays_rentals",
  "hotel",
  "restaurant",
  "vehicle",
]);

type MyServicesValidationSchemaTypes =
  | InferType<typeof HotelMyServiceValidationSchema>
  | InferType<typeof RestaurantMyServiceValidationSchema>
  | InferType<typeof HealthCenterMyServiceValidationSchema>
  | InferType<typeof BeautyCenterMyServiceValidationSchema>
  | InferType<typeof VehicleMyServiceValidationSchema>
  | InferType<typeof HolidayRentalsMyServiceValidationSchema>;

export const ServicesTypes = () => ServicesTypeValidationSchema;

export const commonMyServiceValidationSchema = object({
  id: string().required(),
  title: string().required(),
  thumbnail: string().required(),
  provider: string().required(),
  description: string().required(),
});

export const HotelMyServiceValidationSchema = commonMyServiceValidationSchema
  .concat(ServiceCancelationPolicies)
  .concat(HotelAmenitesValidationSchema)
  .concat(
    object({
      pricePerNight: number().required(),
      type: mixed<"hotel">().oneOf(["hotel"]).required(),
      extras: array().of(string().required()).min(0).required(),
      location: Location().required(),
    })
  );

export const RestaurantMyServiceValidationSchema =
  commonMyServiceValidationSchema.concat(
    object({
      type: mixed<"restaurant">().oneOf(["restaurant"]).required(),
      averagePrice: number().required(),
      discount: RuledDiscount().required(),
      isGoodDeal: boolean().required(),
      location: Location().required(),
      name: string().required(),
      rate: number().min(0).max(5).required(),
      reviewsCount: number().required(),
      tags: array().of(string().required()).min(0).required(),
      thumbnails: array().of(string().required()).min(0).required(),
    })
  );

export const HealthCenterMyServiceValidationSchema =
  commonMyServiceValidationSchema.concat(
    object({
      type: mixed<"health_center">().oneOf(["health_center"]).required(),
      location: Location().required(),
      specialty: string().required(),
      workingDates: array().of(WorkingDateValidationSchema).min(0).required(),
    })
  );

export const BeautyCenterMyServiceValidationSchema =
  commonMyServiceValidationSchema.concat(
    object({
      type: mixed<"beauty_center">().oneOf(["beauty_center"]).required(),
      name: string().required(),
      owners: array().of(string().required()).min(0).required(),
      rate: number().min(0).max(5).required(),
      reviews: number().required(),
    })
  );

export const VehicleMyServiceValidationSchema = commonMyServiceValidationSchema
  .concat(ServiceCancelationPolicies)
  .concat(
    object({
      type: mixed<"vehicle">().oneOf(["vehicle"]).required(),
      pricePerDay: number().required(),
      vehicleProps: array()
        .of(VehicleProprtieValidationSchema.required())
        .min(0)
        .required(),
      location: Location().required(),
    })
  );

export const HolidayRentalsMyServiceValidationSchema =
  commonMyServiceValidationSchema
    .concat(ServiceCancelationPolicies)
    .concat(HotelAmenitesValidationSchema)
    .concat(
      object({
        pricePerNight: number().required(),
        type: mixed<"holiday_rentals">().oneOf(["holiday_rentals"]).required(),
        extras: array().of(string().required()).min(0).required(),
        location: Location().required(),
      })
    );

export const MyServiceValidationSchema =
  mixed<MyServicesValidationSchemaTypes>()
    .test({
      name: "Service Data",
      message() {
        return `service type and data doesnt match`;
      },
      test: (data) => {
        if (!data) return false;
        const { type } = data;
        switch (type) {
          case "hotel":
            HotelMyServiceValidationSchema.validateSync(data);
            break;
          case "restaurant":
            RestaurantMyServiceValidationSchema.validateSync(data);
            break;
          case "health_center":
            HealthCenterMyServiceValidationSchema.validateSync(data);
            break;
          case "beauty_center":
            BeautyCenterMyServiceValidationSchema.validateSync(data);
            break;
          case "holiday_rentals":
            HolidayRentalsMyServiceValidationSchema.validateSync(data);
            break;
          case "vehicle":
            VehicleMyServiceValidationSchema.validateSync(data);
            break;
          default:
            return false;
        }
        return true;
      },
    })
    .required();

export const MyServicesApiResponseValidationSchema =
  CreatePaginationApiResponseValidationSchemaOf(MyServiceValidationSchema);
