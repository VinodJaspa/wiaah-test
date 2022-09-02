import {
  FormatedSearchableFilter,
  PaginationFetchedData,
  QueryPaginationInputs,
} from "src";
import { randomNum } from "utils";
import { HealthCenterPractitioner } from "./getHealthCenterSearchData";

// export interface HealthCenterFilteredData {
//   name: string;
//   photo: string;
//   location: Location;
//   specialty: string;
// }

const specialtiesPh: string[] = [
  "Lorem Ipsum is simply dummy text of the printing and",
  "typesetting industry",
  "Lorem Ipsum has been the industry's",
  "standard dummy text ever since",
  "the 1500s, when an",
];
const practitioners: HealthCenterPractitioner[] = [...Array(50)].map(
  (_, i) => ({
    reviews: 150,
    id: `${i}`,
    rate: randomNum(5),
    location: {
      address: "address",
      city: "city",
      cords: {
        lat: 15,
        lng: 15,
      },
      country: "country",
      postalCode: 1234,
      countryCode: "CH",
      state: "Geneve",
    },
    name: "Pharaoh medical center",
    photo:
      "https://www.guthrie.org/sites/default/files/2021-11/cortland-medical-center.jpg",
    specialty: "ophthalmology",
  })
);

export const getHealthCenterPractitionersFilteredDataFetcher = async (
  pagination: QueryPaginationInputs,
  filters: FormatedSearchableFilter
): Promise<PaginationFetchedData<HealthCenterPractitioner[]>> => {
  return {
    data: practitioners.slice(0, pagination.take),
    hasMore: false,
    total: randomNum(5000),
  };
};
