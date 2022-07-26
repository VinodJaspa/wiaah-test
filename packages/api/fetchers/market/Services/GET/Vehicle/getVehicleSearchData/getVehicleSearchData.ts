import {
  FormatedSearchableFilter,
  InValidDataSchemaError,
  QueryPaginationInputs,
} from "api";
import { AsyncReturnType } from "types";
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
    total: 50,
    data: [...Array(pagination.take)].map(() => ({
      name: "Lucky Dip Car",
      pricePerDay: 111,
      thumbnail:
        "https://www.autocar.co.uk/sites/autocar.co.uk/files/images/car-reviews/first-drives/legacy/1_rangerover_tracking.jpg",

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
  };

  return await CheckValidation(
    VehicleSearchApiResponseValidationSchema,
    data,
    InValidDataSchemaError
  );
};
