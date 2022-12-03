import { QueryPaginationInputs } from "src/types";
import { AsyncReturnType } from "types";
import {
  InferType,
  MyServiceValidationSchema,
  MyServicesApiResponseValidationSchema,
  CheckValidation,
  HotelMyServiceValidationSchema,
  RestaurantMyServiceValidationSchema,
  HealthCenterMyServiceValidationSchema,
  HolidayRentalsMyServiceValidationSchema,
  BeautyCenterMyServiceValidationSchema,
  VehicleMyServiceValidationSchema,
} from "validation";

export type HotelMyServiceDataType = InferType<
  typeof HotelMyServiceValidationSchema
>;
export type RestaurantMyServiceDataType = InferType<
  typeof RestaurantMyServiceValidationSchema
>;
export type HealthCenterMyServiceDataType = InferType<
  typeof HealthCenterMyServiceValidationSchema
>;
export type BeautyCenterMyServiceDataType = InferType<
  typeof BeautyCenterMyServiceValidationSchema
>;
export type VehicleMyServiceDataType = InferType<
  typeof VehicleMyServiceValidationSchema
>;
export type HolidayRentalsMyServiceDataType = InferType<
  typeof HolidayRentalsMyServiceValidationSchema
>;

export type MyServiceData = InferType<typeof MyServiceValidationSchema>;

export const getMyServicesFetcher = async (
  pagination: QueryPaginationInputs
): Promise<InferType<typeof MyServicesApiResponseValidationSchema>> => {
  const res: AsyncReturnType<typeof getMyServicesFetcher> = {
    hasMore: false,
    total: 150,
    data: [
      {
        id: "1",
        title: "hotel service",
        description: "hotel service description",
        pricePerNight: 150,
        thumbnail: "/shop-2.jpeg",
        provider: "hotel service provider",
        type: "hotel",
      },
      {
        id: "2",
        title: "restaurant service",
        description: "restaruant service description",
        type: "restaurant",
        provider: "restaurant provider name",
        thumbnail: "/place-2.jpeg",
      },
      {
        id: "3",
        title: "health center service",
        description: "health center service description",
        type: "health_center",
        provider: "health center provider name",
        thumbnail: "/doctor.jpg",
      },
      {
        id: "4",
        title: "beauty center service",
        description: "beauty center service description",
        type: "beauty_center",
        provider: "beauty center provider name",
        thumbnail: "/place-2.jpeg",
        name: "beauty center name",
        owners: ["owner 1", "owner 2"],
        rate: 4.8,
        reviews: 2655,
      },
      {
        id: "5",
        title: "Holiday rentals service",
        description: "holiday rentals service description",
        type: "holiday_rentals",
        provider: "provider name",
        thumbnail: "/shop-3.jpeg",
        pricePerNight: 150,
      },
      {
        id: "6",
        title: "vehicle service",
        description: "vehicle service description",
        type: "vehicle",
        provider: "provider name",
        thumbnail: "/shop-3.jpeg",
      },
    ],
  };

  return CheckValidation(MyServicesApiResponseValidationSchema, res);
};
