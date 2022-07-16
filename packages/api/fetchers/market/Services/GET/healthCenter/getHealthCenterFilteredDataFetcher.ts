import { WorkingDate } from "types";
import { randomNum } from "utils";
import {
  FormatedSearchableFilter,
  PaginationFetchedData,
  QueryPaginationInputs,
  HealthCenterPractitioner,
} from "../../../../../";

export interface HealthCenterData {
  centerData: HealthCenterPractitioner;
  workingDates: WorkingDate[];
}

export const getHealthCenterFilteredDataFetcher = async (
  pagination: QueryPaginationInputs,
  filters: FormatedSearchableFilter
): Promise<PaginationFetchedData<HealthCenterData[]>> => {
  return {
    data: [...Array(5)].map(() => ({
      centerData: {
        location: {
          address: "Boulvard James-Fazy 4",
          city: "Geneve",
          cords: {
            lat: randomNum(100),
            lng: randomNum(100),
          },
          country: "france",
          postalCode: 1201,
        },
        name: "Dr Charlene Kasaven",
        photo:
          "https://img.freepik.com/premium-photo/mature-doctor-hospital_256588-179.jpg?w=2000",
        specialty: "Dentist",
      },
      workingDates: [
        {
          date: Date.now(),
          workingHoursRanges: [...Array(2)].map(() => ({
            from: Date.now(),
            to: Date.now(),
          })),
        },
        {
          date: Date.now(),
          workingHoursRanges: [...Array(1)].map(() => ({
            from: Date.now(),
            to: Date.now(),
          })),
        },
        {
          date: Date.now(),
          workingHoursRanges: [...Array(2)].map(() => ({
            from: Date.now(),
            to: Date.now(),
          })),
        },
        {
          date: Date.now(),
          workingHoursRanges: [...Array(1)].map(() => ({
            from: Date.now(),
            to: Date.now(),
          })),
        },
        {
          date: Date.now(),
          workingHoursRanges: [...Array(2)].map(() => ({
            from: Date.now(),
            to: Date.now(),
          })),
        },
      ],
    })),
    hasMore: true,
  };
};
