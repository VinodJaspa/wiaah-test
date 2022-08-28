import { FormatedSearchableFilter, QueryPaginationInputs } from "src/types";
import { AsyncReturnType } from "types";
import { randomNum } from "utils";
import {
  CheckValidation,
  InferType,
  ServicePostMetaDataValidationSchema,
  ServicePostsMetaDataApiResponseValidationSchema,
} from "validation";

export type ServicePostMetaDataType = InferType<
  typeof ServicePostMetaDataValidationSchema
>;

export type getServicePostsMetaDataApiResponse = InferType<
  typeof ServicePostsMetaDataApiResponseValidationSchema
>;

export const getServicePostsMetaDataFetcher = (
  filters: FormatedSearchableFilter,
  pagination: QueryPaginationInputs
): Promise<getServicePostsMetaDataApiResponse> => {
  const res: AsyncReturnType<typeof getServicePostsMetaDataFetcher> = {
    hasMore: false,
    total: randomNum(163),
    data: [...Array(15)].map((_, i) => ({
      id: "123" + i,
      attachments: [
        { src: "/shop-2.jpeg", type: "image" },
        { src: "/video.mp4", type: "video" },
      ],
      label: "service label",
      name: "service name",
      type: "seller",
    })),
  };

  return CheckValidation(ServicePostsMetaDataApiResponseValidationSchema, res);
};
