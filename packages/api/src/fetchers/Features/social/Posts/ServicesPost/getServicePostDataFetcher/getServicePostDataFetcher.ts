import { FormatedSearchableFilter } from "../../../../../../types/index";
import { AsyncReturnType } from "types";
import { getRandomName, randomNum } from "utils";
import {
  ServicePostDataValidationSchema,
  ServicePostDataApiResponseValidationSchema,
  InferType,
  CheckValidation,
  PostAttachmentValidationSchema,
  SocialAccountTypeEnum,
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
      hashtags: ["hash"],
      discount: 50,
      price: 55,
      views: 4,
      cashback: { amount: 3, type: "cash" },
      rate: 4.5,
      postInteraction: { likes: 4, comments: 1 },
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
        id: "user_123456", // Predefined ID
        userId: "user_john_doe", // Predefined user ID
        verified: true, // Set verification to true
        name: "John Doe", // Predefined name
        thumbnail: "https://example.com/avatar.jpg", // Predefined thumbnail URL
        accountType: "seller", // Predefined social account type (assuming SocialAccountTypeEnum is defined)
        public: true, // Set profile to public
        location: {
          address: "1600 Pennsylvania Ave NW", // Required string
          city: "Washington", // Required string
          lat: 38.8977, // Required number (latitude)
          lon: -77.0369, // Required number (longitude)
          state: "DC", // Optional string (state)
          country: "USA", // Required string (country)
          postalCode: 20500, // Required string (postal code) - can be adjusted for different formats
          countryCode: "US", // Required string (country code)
        },
        profession: "Software Engineer", // Predefined profession
        publications: 50, // Predefined number of publications
        subscriptions: 200, // Predefined number of subscriptions
        subscribers: 1000, // Predefined number of subscribers
        bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.", // Predefined bio
        links: ["https://www.example.com", "https://anotherwebsite.com"], // Predefined links
        isFollowed: false, // Set follower status to false
        profileCoverPhoto: "https://example.com/cover_photo.jpg", // Predefined cover photo URL
      },
    },
  };

  return res;
};
