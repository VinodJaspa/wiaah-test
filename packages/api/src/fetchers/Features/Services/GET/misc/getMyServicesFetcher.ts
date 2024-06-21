import { QueryPaginationInputs } from "../../../../../types/index";
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
    data: [...Array(10)].map(() => ({
      id: "1",
      title: "hotel service",
      description: "hotel service description",
      pricePerNight: 150,
      thumbnail: "/shop-2.jpeg",
      provider: "hotel service provider",
      type: "hotel",
      amenites: [{ name: "Bar", slug: "bar" }],
      cancelationPolicies: [{ cost: 15, duration: 2, id: "" }],
      extras: ["pool", "parking", "restaurant"],
      location: {
        address: "address",
        city: "city",
        lat: 456,
        lon: 45,
        country: "country",
        countryCode: "US",
        postalCode: 12345,
        state: "state",
      },
    })),
    //   {
    //     id: "2",
    //     title: "restaurant service",
    //     description: "restaruant service description",
    //     type: "restaurant",
    //     provider: "restaurant provider name",
    //     thumbnail: "/place-2.jpeg",
    //     location: {
    //       address: "address",
    //       city: "city",
    //       cords: {
    //         lat: 456,
    //         lng: 45,
    //       },
    //       country: "country",
    //       countryCode: "US",
    //       postalCode: 12345,
    //       state: "state",
    //     },

    //   },
    //   {
    //     id: "3",
    //     title: "health center service",
    //     description: "health center service description",
    //     type: "health_center",
    //     provider: "health center provider name",
    //     thumbnail: "/doctor.jpg",
    //     location: {
    //       address: "address",
    //       city: "city",
    //       cords: {
    //         lat: 456,
    //         lng: 45,
    //       },
    //       country: "country",
    //       countryCode: "US",
    //       postalCode: 12345,
    //       state: "state",
    //     },
    //     specialty:"Eye",
    //     workingDates:[]
    //   },
    //   {
    //     id: "4",
    //     title: "beauty center service",
    //     description: "beauty center service description",
    //     type: "beauty_center",
    //     provider: "beauty center provider name",
    //     thumbnail: "/place-2.jpeg",
    //     name: "beauty center name",
    //     owners: ["owner 1", "owner 2"],
    //     rate: 4.8,
    //     reviews: 2655,
    //   },
    //   {
    //     id: "5",
    //     title: "Holiday rentals service",
    //     description: "holiday rentals service description",
    //     type: "holiday_rentals",
    //     provider: "provider name",
    //     thumbnail: "/shop-3.jpeg",
    //     pricePerNight: 150,
    //     amenites: [],
    //     cancelationPolicies: [],
    //     extras: [],
    //     location: {
    //       address: "address",
    //       city: "city",
    //       cords: {
    //         lat: 456,
    //         lng: 45,
    //       },
    //       country: "country",
    //       countryCode: "US",
    //       postalCode: 12345,
    //       state: "state",
    //     },
    //   },
    //   {
    //     id: "6",
    //     title: "vehicle service",
    //     description: "vehicle service description",
    //     type: "vehicle",
    //     provider: "provider name",
    //     thumbnail: "/shop-3.jpeg",
    //     cancelationPolicies: [],
    //     location: {
    //       address: "address",
    //       city: "city",
    //       cords: {
    //         lat: 456,
    //         lng: 45,
    //       },
    //       country: "country",
    //       countryCode: "US",
    //       postalCode: 12345,
    //       state: "state",
    //     },
    //     pricePerDay:15,
    //     vehicleProps:[]
    //   },
    // ],
  };

  return res;
};
