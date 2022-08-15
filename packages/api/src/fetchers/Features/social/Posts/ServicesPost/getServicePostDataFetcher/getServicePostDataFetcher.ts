import { FormatedSearchableFilter } from "src/types";
import { AsyncReturnType } from "types";
import { randomNum } from "utils";
import {
  ServicePostDataValidationSchema,
  ServicePostDataApiResponseValidationSchema,
  InferType,
  CheckValidation,
} from "validation";

export type ServicePostDetails = InferType<
  typeof ServicePostDataValidationSchema
>;
export type ServicePostApiResponseData = InferType<
  typeof ServicePostDataApiResponseValidationSchema
>;

export const getServicePostDataFetcher = async (
  filters: FormatedSearchableFilter
): Promise<ServicePostApiResponseData> => {
  const res: AsyncReturnType<typeof getServicePostDataFetcher> = {
    data: {
      id: "123",
      label: "label",
      name: "service post",
      thumbnail: "/place-2.jpg",
      type: "hotel",
      profileInfo: {
        accountType: "seller",
        id: "1263",
        name: "seller name",
        public: true,
        thumbnail: "/shop-2.jpeg",
        verified: true,
      },
      hashtags: ["fashion", "gaming"],
      postInteraction: {
        likes: randomNum(300),
        comments: randomNum(100),
      },
    },
  };

  return CheckValidation(ServicePostDataApiResponseValidationSchema, res);
};
