import { getRandomImage } from "placeholder";
import { randomNum } from "utils";
import { LocationCords } from "../hotels";

export type Location = {
  address: string;
  postalCode: number;
  country: string;
  city: string;
  cords: LocationCords;
};

export interface RecommendedResturantData {
  name: string;
  rate: number;
  reviewsCount: number;
  isGoodDeal: boolean;
  thumbnails: string[];
  averagePrice: number;
  location: Location;
  discount: {
    amount: number;
    rule: string;
  };
}

export const getRecommendedResturantsFetcher = async (
  take: number,
  page: number
): Promise<RecommendedResturantData[]> => {
  return [...Array(8)].map((_, i) => ({
    averagePrice: randomNum(100),
    name: "Le bruit qui court",
    isGoodDeal: true,
    rate: parseInt(`${randomNum(9)}.${randomNum(9)}`),
    reviewsCount: randomNum(600),
    thumbnails: [
      getRandomImage(),
      getRandomImage(),
      getRandomImage(),
      getRandomImage(),
    ],
    location: {
      address: "69ter rue damremont",
      postalCode: 75018,
      city: "paris",
      country: "France",
      cords: {
        lat: 43.546,
        lng: 65.424,
      },
    },
    discount: {
      amount: 50,
      rule: "sur la carte",
    },
  }));
};
