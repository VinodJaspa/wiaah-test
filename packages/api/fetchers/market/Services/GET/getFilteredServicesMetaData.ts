import { getRandomImage } from "placeholder";
import { FormatedSearchableFilter } from "../../../../index";
import { DateRange } from "types";
import { randomNum } from "utils";
import { FilterType, SearchFilterType } from "./getServiceSearchFilters";

export type LocationCords = {
  lat: number;
  lng: number;
};

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
  location: LocationCords;
}

const lats = [
  45.464664, 45.45, 45.433334, 45.449998, 45.416669, 45.499999, 45.466667,
  45.583334, 45.400001, 45.586668, 45.318611,
];
const lngs = [
  9.18854, 9.166667, 9.133333, 9.166667, 9.166667, 9.15, 9.1, 9.183333, 9.1,
  9.1775, 9.130556,
];

export const getFilteredServicesMetaData = async (
  filters: FormatedSearchableFilter
): Promise<FilteredServiceMetaDataType[]> => {
  console.log("filters", filters);

  const data: FilteredServiceMetaDataType[] = [...Array(15)].map((_, i) => ({
    title:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
    provider: "Crowne Plaza",
    rate: 4.8,
    serviceClass: 3.5,
    thumbnail: getRandomImage(),
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae, deserunt odio quisquam qui sit corrupti ab est voluptas sunt quis nesciunt facilis a debitis eius mollitia quasi eum beatae autem.",
    reviews: randomNum(500),
    id: `${1564546 * i}`,
    date: {
      from: Date.now(),
      to: Date.now(),
    },
    pricePerNight: randomNum(3000),
    taxesAndFeesIncluded: true,
    totalPrice: 5000,
    location: {
      lng: lngs[randomNum(lngs.length)],
      lat: lats[randomNum(lats.length)],
    },
  }));
  if ("id" in filters) {
    return data.filter((d) => d.id === filters.id);
  }
  return data;
};
