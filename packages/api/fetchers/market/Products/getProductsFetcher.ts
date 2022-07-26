import { getRandomImage } from "placeholder";
import { FormatedSearchableFilter, QueryPaginationInputs } from "src";
import { AsyncReturnType } from "types";
import { randomNum } from "utils";
import {
  CheckValidation,
  ProductsApiResponseValidationSchema,
  ProductValidationSchema,
} from "validation";
import { InferType } from "yup";

export type ProductType = InferType<typeof ProductValidationSchema>;

export type GetProductsFetcherResponseType = InferType<
  typeof ProductsApiResponseValidationSchema
>;

export const getProductsFetcher = async (
  pagination: QueryPaginationInputs,
  filters: FormatedSearchableFilter
): Promise<GetProductsFetcherResponseType> => {
  const res: AsyncReturnType<typeof getProductsFetcher> = {
    hasMore: pagination.page * pagination.take >= 50,
    total: 50,
    data: [...Array(50)].map(() => ({
      id: "12~3",
      shopId: "1234",
      colors: ["red", "black", "yellow"],
      discount: 15,
      cashback: {
        amount: 5,
        type: "cash",
      },
      liked: randomNum(10) > 5,
      name: "product",
      price: randomNum(300),
      rating: randomNum(5),
      thumbnail: getRandomImage(),
    })),
  };
  return CheckValidation(ProductsApiResponseValidationSchema, res);
};
