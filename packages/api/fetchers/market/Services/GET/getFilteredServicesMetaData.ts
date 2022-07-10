import { getRandomImage } from "placeholder";
import { FormatedSearchableFilter } from "../../../../index";
import { DateRange } from "types";
import { randomNum } from "utils";
import { FilterType, SearchFilterType } from "./getServiceSearchFilters";

export interface FilteredServiceMetaDataType {
  title: string;
  thumbnail: string;
  provider: string;
  rate: number;
  serviceClass: number;
  description: string;
  reviews: number;
  id: string;
  totalPrice: number;
  pricePerNight: number;
  taxesAndFeesIncluded: boolean;
  date: DateRange;
  location: {
    lat: number;
    lng: number;
  };
}

export const getFilteredServicesMetaData = async (
  filters: FormatedSearchableFilter
): Promise<FilteredServiceMetaDataType[]> => {
  const data: FilteredServiceMetaDataType[] = [...Array(15)].map(() => ({
    title:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
    provider: "Crowne Plaza",
    rate: 4.8,
    serviceClass: 3.5,
    thumbnail: getRandomImage(),
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae, deserunt odio quisquam qui sit corrupti ab est voluptas sunt quis nesciunt facilis a debitis eius mollitia quasi eum beatae autem.",
    reviews: randomNum(500),
    id: "1564546",
    date: {
      from: Date.now(),
      to: Date.now(),
    },
    pricePerNight: 150,
    taxesAndFeesIncluded: true,
    totalPrice: 5000,
    location: {
      lng: randomNum(100),
      lat: randomNum(100),
    },
  }));
  return data;
};
