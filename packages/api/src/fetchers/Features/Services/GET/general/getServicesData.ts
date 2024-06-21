import {
  FormatedSearchableFilter,
  QueryPaginationInputs,
} from "../../../../../types/index";
import {
  CheckValidation,
  generalServicesApiValidationSchema,
  generalServicesDataValidationSchema,
  InferType,
} from "validation";
import { AsyncReturnType } from "types";
import { randomNum } from "utils";

export type ServiceData = InferType<typeof generalServicesDataValidationSchema>;

export type GeneralServicesApisResponse = InferType<
  typeof generalServicesApiValidationSchema
>;

export const getGeneralServicesData = async (
  pagination: QueryPaginationInputs,
  filters: FormatedSearchableFilter
): Promise<GeneralServicesApisResponse> => {
  const res: AsyncReturnType<typeof getGeneralServicesData> = {
    hasMore: false,
    data: [...Array(pagination.take)].map((_, i) => ({
      id: `${i}`,
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      name: "D'Luxe Nails",
      location: {
        address: "Rue du Cendrier 14",
        city: "Geneve",
        lat: 50,
        lon: 30,
        country: "switzerland",
        postalCode: 1201,
        countryCode: "CH",
        state: "Geneve",
      },
      isNew: true,
      thumbnail: "/place-3.jpg",
      services: [
        "Manucure Classique",
        "Manucure avec Shellac",
        "Shellac sans Manucure",
      ],
    })),
    total: randomNum(5000),
  };
  return CheckValidation(generalServicesApiValidationSchema, res);
};
