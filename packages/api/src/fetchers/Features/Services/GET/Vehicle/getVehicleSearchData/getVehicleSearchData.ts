import {
  FormatedSearchableFilter,
  InValidDataSchemaError,
  QueryPaginationInputs,
} from "api";
import { AsyncReturnType } from "types";
import { randomNum } from "utils";
import {
  CheckValidation,
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
  filters: FormatedSearchableFilter
): Promise<VehicleSearchDataApiResponse> => {
  const data: AsyncReturnType<typeof getVehicleSearchDataFetcher> = {
    hasMore: false,
    data: [...Array(pagination.take)].map((_, i) => ({
      id: `${i}`,
      name: "Lucky Dip Car",
      pricePerDay: 111,
      cancelationPolicies: [],
      thumbnail:
        "https://hips.hearstapps.com/hmg-prod/images/2023-mclaren-artura-101-1655218102.jpg?crop=1.00xw:0.847xh;0,0.153xh&resize=1200:*",

      vehicleProps: [
        {
          type: "a/c",
          value: true,
        },
        {
          type: "gps",
          value: true,
        },
        {
          type: "passengers",
          value: 5,
        },
        {
          type: "windows",
          value: 4,
        },
        {
          type: "bags",
          value: 3,
        },
      ],
    })),
    total: randomNum(500),
  };

  return CheckValidation(VehicleSearchApiResponseValidationSchema, data);
};
