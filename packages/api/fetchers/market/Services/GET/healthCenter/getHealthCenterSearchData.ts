import { getRandomImage } from "placeholder";
import { FormatedSearchableFilter } from "src";
import { randomNum } from "utils";
import { Location } from "../resturant";

export interface HealthCenterSpecialty {
  title: string;
  photo?: string;
}

export interface HealthCenterPractitioner {
  name: string;
  photo: string;
  location: Location;
  specialty: string;
}

export interface HealthCenterSearchSuggistionsData {
  specialties: HealthCenterSpecialty[];
  practitioners: HealthCenterPractitioner[];
}

const specialtiesPh: string[] = [
  "Lorem Ipsum is simply dummy text of the printing and",
  "typesetting industry",
  "Lorem Ipsum has been the industry's",
  "standard dummy text ever since",
  "the 1500s, when an",
];

export const getHealthCenterSearchData = async (
  filters: FormatedSearchableFilter
): Promise<HealthCenterSearchSuggistionsData> => {
  const specialties: HealthCenterSpecialty[] = [...Array(50)].map(() => ({
    title: specialtiesPh[randomNum(specialtiesPh.length)],
    photo: randomNum(10) > 5 ? getRandomImage() : undefined,
  }));
  const practitioners: HealthCenterPractitioner[] = [...Array(50)].map(() => ({
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
  const searchQuery = filters["search_query"] || "";
  return {
    specialties: specialties.filter((s) =>
      s.title.includes(typeof searchQuery === "string" ? searchQuery : "")
    ),
    practitioners: practitioners.filter((p) =>
      p.name.includes(typeof searchQuery === "string" ? searchQuery : "")
    ),
  };
};
