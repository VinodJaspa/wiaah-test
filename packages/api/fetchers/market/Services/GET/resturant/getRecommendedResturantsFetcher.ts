import { randomNum } from "utils";
import { lats, lngs, LocationCords } from "../hotels";
import {
  CheckValidation,
  InferType,
  ResturantMetaDataValidationSchema,
  ResturantsMetaDataApiResponseValidationSchema,
} from "validation";
import { AsyncReturnType } from "types";
import { FormatedSearchableFilter, QueryPaginationInputs } from "src";

export type Location = {
  address: string;
  postalCode: number;
  state?: string;
  country: string;
  city: string;
  cords: LocationCords;
};

export type ResturantMetaDataType = InferType<
  typeof ResturantMetaDataValidationSchema
>;

export type getRecommendedResturantsFetcherResponseType = InferType<
  typeof ResturantsMetaDataApiResponseValidationSchema
>;

export const getRecommendedResturantsFetcher = async (
  pagination: QueryPaginationInputs,
  filters: FormatedSearchableFilter
): Promise<getRecommendedResturantsFetcherResponseType> => {
  const res: AsyncReturnType<typeof getRecommendedResturantsFetcher> = {
    data: [...Array(16)].map((_, i) => ({
      id: `${i}`,
      averagePrice: randomNum(100),
      name: "Le bruit qui court",
      isGoodDeal: true,
      rate: parseInt(`${randomNum(9)}.${randomNum(9)}`),
      reviewsCount: randomNum(600),
      thumbnails: [
        "/place-2.jpg",
        "/place-2.jpg",
        "/place-2.jpg",
        "/place-2.jpg",
      ],
      location: {
        address: "69ter rue damremont",
        postalCode: 75018,
        city: "paris",
        country: "France",
        state: "geneve",
        cords: {
          lat: lats[randomNum(lats.length)],
          lng: lngs[randomNum(lngs.length)],
        },
        countryCode: "CHF",
      },
      discount: {
        amount: 50,
        rule: "sur la carte",
      },
      tags: ["italian", "healthy", "pizza"],
    })),
    hasMore: false,
    total: randomNum(5000),
  };

  return CheckValidation(ResturantsMetaDataApiResponseValidationSchema, res);
};
