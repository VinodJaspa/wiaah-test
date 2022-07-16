import { getRandomImage } from "placeholder";
import { randomNum } from "utils";
import { lats, lngs, LocationCords } from "../hotels";

export type Location = {
  address: string;
  postalCode: number;
  state?: string;
  country: string;
  city: string;
  cords: LocationCords;
};

export interface ResturantMetaDataType {
  id: string;
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
): Promise<ResturantMetaDataType[]> => {
  return [...Array(16)].map((_, i) => ({
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
      cords: {
        lat: lats[randomNum(lats.length)],
        lng: lngs[randomNum(lngs.length)],
      },
    },
    discount: {
      amount: 50,
      rule: "sur la carte",
    },
  }));
};
