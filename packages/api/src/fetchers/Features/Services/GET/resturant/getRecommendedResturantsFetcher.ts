import { randomNum } from "utils";
import { lats, lons as lngs } from "api";
import {
  CheckValidation,
  InferType,
  ResturantMetaDataValidationSchema,
  ResturantsMetaDataApiResponseValidationSchema,
  locationValidationSchema,
} from "validation";
import { AsyncReturnType } from "types";
import { FormatedSearchableFilter, QueryPaginationInputs } from "api";

export type Location = InferType<typeof locationValidationSchema>;

// {
//   address: string;
//   postalCode: number;
//   state?: string;
//   country: string;
//   city: string;
//   cords: LocationCords;
// };

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
    data: [...Array(15)].map((_, i) => ({
      id: `${i}`,
      averagePrice: randomNum(100),
      name: "Le bruit qui court",
      isGoodDeal: true,
      rate: randomNum(5),
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
        lat: lats[randomNum(lats.length)],
        lon: lngs[randomNum(lngs.length)],
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
