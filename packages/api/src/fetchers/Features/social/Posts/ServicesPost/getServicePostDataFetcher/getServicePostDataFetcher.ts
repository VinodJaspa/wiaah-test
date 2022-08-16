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
const sentence =
  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley";

export const getServicePostDataFetcher = async (
  filters: FormatedSearchableFilter
): Promise<ServicePostApiResponseData> => {
  const res: AsyncReturnType<typeof getServicePostDataFetcher> = {
    data: {
      id: "123",
      label: "label",
      name: "service post",
      attachments: [
        { src: "/shop-2.jpeg", type: "image" },
        { src: "/video.mp4", type: "video" },
      ],
      type: "hotel",
      content: sentence.substring(0, randomNum(sentence.length)),
      profileInfo: {
        accountType: "seller",
        id: "1263",
        name: "seller name",
        public: true,
        thumbnail: "/shop-2.jpeg",
        verified: true,
      },
      price: randomNum(123),
      rate: randomNum(159),
      views: randomNum(153),
      hashtags: ["fashion", "gaming"],
      cashback: { amount: 15, type: "cash" },
      discount: randomNum(20),
      postInteraction: {
        likes: randomNum(300),
        comments: randomNum(100),
      },
    },
  };

  return CheckValidation(ServicePostDataApiResponseValidationSchema, res);
};
