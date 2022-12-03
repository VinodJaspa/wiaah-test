import {
  FormatedSearchableFilter,
  PaginationFetchedData,
  QueryPaginationInputs,
  InValidDataSchemaError,
} from "api";
import { AsyncReturnType } from "types";
import { randomNum } from "utils";
import {
  CheckValidation,
  InferType,
  TypeOf,
  VehiclePickupLocationsApiResponseValidationSchema,
  VehiclePickupLocationValidationSchema,
} from "validation";

export type VehiclePickupLocation = InferType<
  typeof VehiclePickupLocationValidationSchema
>;

export type VehiclePickUpLocationResponseData = InferType<
  typeof VehiclePickupLocationsApiResponseValidationSchema
>;

export const getVehicleSearchPickupLocationsFetcher = async (
  pagination: QueryPaginationInputs,
  filters: FormatedSearchableFilter
): Promise<VehiclePickUpLocationResponseData> => {
  const data: AsyncReturnType<typeof getVehicleSearchPickupLocationsFetcher> = {
    hasMore: false,
    data: [...Array(10)].map(() => ({ address: "address", city: "city" })),
    total: randomNum(500),
  };

  CheckValidation(VehiclePickupLocationsApiResponseValidationSchema, data);

  return data;
};
