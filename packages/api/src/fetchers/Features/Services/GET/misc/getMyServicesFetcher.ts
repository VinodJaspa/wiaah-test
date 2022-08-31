import { QueryPaginationInputs } from "src/types";
import { AsyncReturnType } from "types";
import {
  InferType,
  MyServiceValidationSchema,
  MyServicesApiResponseValidationSchema,
  CheckValidation,
} from "validation";

export type MyServiceData = InferType<typeof MyServiceValidationSchema>;

export const getMyServicesFetcher = async (
  pagination: QueryPaginationInputs
): Promise<InferType<typeof MyServicesApiResponseValidationSchema>> => {
  const res: AsyncReturnType<typeof getMyServicesFetcher> = {
    hasMore: false,
    total: 150,
    data: [],
  };

  return CheckValidation(MyServicesApiResponseValidationSchema, res);
};
