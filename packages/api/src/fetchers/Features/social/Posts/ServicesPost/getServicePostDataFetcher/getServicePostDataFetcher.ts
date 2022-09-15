import { FormatedSearchableFilter } from "src/types";
import { AsyncReturnType } from "types";
import { randomNum } from "utils";
import {
  ServicePostDataValidationSchema,
  ServicePostDataApiResponseValidationSchema,
  InferType,
  CheckValidation,
  PostAttachmentValidationSchema,
} from "validation";

export type ServicePostDetails = InferType<
  typeof ServicePostDataValidationSchema
>;

export type SocialPostAttachment = InferType<
  typeof PostAttachmentValidationSchema
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
      createdAt: new Date().toString(),
      attachements: [
        {
          src: "https://images.unsplash.com/photo-1625602812206-5ec545ca1231?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8YW1lcmljYW4lMjBob3VzZXN8ZW58MHx8MHx8&w=1000&q=80",
          type: "image",
        },
        { src: "/video.mp4", type: "video" },
      ],
      type: "hotel",
      content: sentence.substring(0, randomNum(sentence.length)),
      profileInfo: {
        profession: "profession",
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
