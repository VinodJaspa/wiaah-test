import { AsyncReturnType } from "types";
import {
  InferType,
  HotelAmenitesApiResponseValidationSchema,
  CheckValidation,
} from "validation";

export type HotelAmenite = string;
export type HotelAmenitesApiResponse = InferType<
  typeof HotelAmenitesApiResponseValidationSchema
>;

export const getHotelAmenitesFetcher =
  async (): Promise<HotelAmenitesApiResponse> => {
    const res: AsyncReturnType<typeof getHotelAmenitesFetcher> = {
      data: {
        amenites: [
          { name: "Pool", slug: "pool" },
          { name: "Park", slug: "park" },
          { name: "Free-Wifi", slug: "free-wifi" },
        ],
      },
    };

    return CheckValidation(HotelAmenitesApiResponseValidationSchema, res);
  };
