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
}

export const getFilteredServicesMetaData = async (
  filters: SearchFilterType[]
): Promise<FilteredServiceMetaDataType[]> => {
  const data = [...Array(15)].map(() => ({
    title: "some random apertemant title",
    provider: "provider",
    rate: 4.8,
    serviceClass: 3.5,
    thumbnail: "/shop-2.jpeg",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae, deserunt odio quisquam qui sit corrupti ab est voluptas sunt quis nesciunt facilis a debitis eius mollitia quasi eum beatae autem.",
    reviews: randomNum(500),
  }));
  return data;
};
