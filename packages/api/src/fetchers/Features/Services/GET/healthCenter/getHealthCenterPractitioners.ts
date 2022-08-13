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
    name: specialtiesPh[randomNum(specialtiesPh.length)],
    photo:
      "https://img.freepik.com/premium-photo/mature-doctor-hospital_256588-179.jpg?w=2000",
    specialty: "Dentist",
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
