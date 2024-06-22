import {
  FormatedSearchableFilter,
  InValidDataSchemaError,
  PaginationFetchedData,
  QueryPaginationInputs,
} from "api";
import { AsyncReturnType } from "types";
import {
  HealthCenterSuggestionsApiDataValidationSchema,
  CheckValidation,
  HealthCenterPractitionerDataValidationSchema,
  InferType,
} from "validation";
import { randomNum } from "utils";

export interface HealthCenterSpecialtyTitle {
  title: string;
}

export type HealthCenterPractitioner = InferType<
  typeof HealthCenterPractitionerDataValidationSchema
>;

export interface HealthCenterSearchSuggistionsData {
  specialties: HealthCenterSpecialtyTitle[];
  practitioners: HealthCenterPractitioner[];
}

export const specialtiesPh: string[] = [
  "Lorem Ipsum is simply dummy text of the printing and",
  "typesetting industry",
  "Lorem Ipsum has been the industry's",
  "standard dummy text ever since",
  "the 1500s, when an",
];

export const getHealthCenterSearchData = async (
  pagination: QueryPaginationInputs,
  filters: FormatedSearchableFilter
): Promise<PaginationFetchedData<HealthCenterSearchSuggistionsData>> => {
  const specialties: HealthCenterSpecialtyTitle[] = [...Array(50)].map(() => ({
    title: specialtiesPh[randomNum(specialtiesPh.length)],
    photo: undefined,
  }));
  const practitioners: HealthCenterPractitioner[] = [...Array(50)].map(
    (_, i) => ({
      reviews: 150,
      location: {
        address: "address",
        city: "city",
        lat: 15,
        lon: 15,
        country: "france",
        countryCode: "FR",
        postalCode: 1322,
        state: "Geneve",
      },
      id: `${i}`,
      rate: randomNum(15),
      name: specialtiesPh[randomNum(specialtiesPh.length)],
      photo:
        "https://img.freepik.com/premium-photo/mature-doctor-hospital_256588-179.jpg?w=2000",
      specialty: "Dentist",
    })
  );
  const searchQuery = filters["search_query"] || "";
  const data: AsyncReturnType<typeof getHealthCenterSearchData> = {
    hasMore: true,
    total: randomNum(5000),
    data: {
      specialties: specialties
        .filter((s) =>
          s.title.includes(typeof searchQuery === "string" ? searchQuery : "")
        )
        .slice(
          pagination.page * pagination.take,
          (pagination.page + 1) * pagination.take
        ),
      practitioners: practitioners
        .filter((p) =>
          p.name.includes(typeof searchQuery === "string" ? searchQuery : "")
        )
        .slice(
          pagination.page * pagination.take,
          (pagination.page + 1) * pagination.take
        ),
    },
  };

  CheckValidation(
    HealthCenterSuggestionsApiDataValidationSchema,
    data,
    InValidDataSchemaError
  );

  return data;
};
