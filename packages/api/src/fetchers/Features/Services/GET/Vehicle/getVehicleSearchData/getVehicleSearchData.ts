import { FormatedSearchableFilter, QueryPaginationInputs } from "api";
import { AsyncReturnType } from "types";
import { randomNum } from "utils";
import {
  InferType,
  VehicleSearchDataValidationSchema,
  VehicleSearchApiResponseValidationSchema,
  VehicleProprtieValidationSchema,
} from "validation";

export type { AllVehicleProps } from "validation";

export type VehiclePropertie = InferType<
  typeof VehicleProprtieValidationSchema
>;

export type VehicleSearchData = InferType<
  typeof VehicleSearchDataValidationSchema
>;

export type VehicleSearchDataApiResponse = InferType<
  typeof VehicleSearchApiResponseValidationSchema
>;

export const getVehicleSearchDataFetcher = async (
  pagination: QueryPaginationInputs,
  filters: FormatedSearchableFilter,
): Promise<VehicleSearchDataApiResponse> => {
  const data: AsyncReturnType<typeof getVehicleSearchDataFetcher> = {
    hasMore: false,
    data: [...Array(pagination.take)].map((_, i) => ({
      id: `${i}`,
      title: "Lucky Dip Car",
      price: 111,
      cancelationPolicies: [
        { duration: 24, cost: 50, id: "policy1" },
        { duration: 48, cost: 25, id: "policy2" },
      ],
      thumbnail:
        "https://hips.hearstapps.com/hmg-prod/images/2023-mclaren-artura-101-1655218102.jpg?crop=1.00xw:0.847xh;0,0.153xh&resize=1200:*",

      properties: {
        seats: 5,
        windows: 4,
        lugaggeCapacity: 4,
        maxSpeedInKm: 120,
        airCondition: true,
        gpsAvailable: true,
      },
      pricePerDay: 100,
      name: "Car Model A",
      vehicleProps: [
        { type: "passengers", value: 4 },
        { type: "windows", value: 4 },
        { type: "bags", value: 2 },
        { type: "a/c", value: true },
        { type: "gps", value: true },
      ],
    })),
    total: randomNum(500),
  };

  return data;
};
