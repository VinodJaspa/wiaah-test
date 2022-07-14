import { getRandomImage } from "placeholder";
import {
  FormatedSearchableFilter,
  PaginationFetchedData,
  QueryPaginationInputs,
} from "src";
import { randomNum } from "utils";
import { Location } from "../resturant";

export interface HealthCenterFilteredData {
  name: string;
  photo: string;
  location: Location;
  specialty: string;
}

// export interface HealthCenterSpecialty {
//   title: string;
//   photo?: string;
// }

// export interface HealthCenterPractitioner {
//   name: string;
//   photo: string;
//   location: Location;
//   specialty: string;
// }

// export interface HealthCenterSearchSuggistionsData {
//   specialties: HealthCenterSpecialty[];
//   practitioners: HealthCenterPractitioner[];
// }
const specialtiesPh: string[] = [
  "Lorem Ipsum is simply dummy text of the printing and",
  "typesetting industry",
  "Lorem Ipsum has been the industry's",
  "standard dummy text ever since",
  "the 1500s, when an",
];
const practitioners: HealthCenterFilteredData[] = [...Array(50)].map(() => ({
  location: {
    address: "address",
    city: "city",
    cords: {
      lat: 15,
      lng: 15,
    },
    country: "country",
    postalCode: 1234,
  },
  name: specialtiesPh[randomNum(specialtiesPh.length)],
  photo:
    "https://img.freepik.com/premium-photo/mature-doctor-hospital_256588-179.jpg?w=2000",
  specialty: "Dentist",
}));

export const getHealthCenterPractitionersFilteredDataFetcher = async (
  pagination: QueryPaginationInputs,
  filters: FormatedSearchableFilter
): Promise<PaginationFetchedData<HealthCenterFilteredData[]>> => {
  return {
    data: practitioners.slice(0, pagination.take),
    hasMore: false,
  };
};
