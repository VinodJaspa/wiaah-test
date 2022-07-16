import {
  FormatedSearchableFilter,
  PaginationFetchedData,
  QueryPaginationInputs,
} from "src";
import { Location } from "api";

export interface ServiceData {
  thumbnail: string;
  name: string;
  location: Location;
  services: string[];
  description: string;
  isNew: boolean;
}

export const getServicesData = async (
  pagination: QueryPaginationInputs,
  filters: FormatedSearchableFilter
): Promise<PaginationFetchedData<ServiceData[]>> => {
  return {
    hasMore: false,
    data: [...Array(8)].map((_, i) => ({
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      name: "D'Luxe Nails",
      location: {
        address: "Rue du Cendrier 14",
        city: "Geneve",
        cords: {
          lat: 50,
          lng: 30,
        },
        country: "switzerland",
        postalCode: 1201,
      },
      isNew: true,
      thumbnail: "/place-3.jpg",
      services: [
        "Manucure Classique",
        "Manucure avec Shellac",
        "Shellac sans Manucure",
      ],
    })),
  };
};
