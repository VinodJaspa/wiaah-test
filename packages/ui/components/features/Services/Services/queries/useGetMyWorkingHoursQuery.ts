import {
  Exact,
  Maybe,
  ServiceDayWorkingHours,
  SpecialDayWorkingHours,
  WorkingSchedule,
} from "@features/API";
import { createGraphqlRequestClient } from "@UI/../api";
import { useQuery } from "react-query";

export type GetMyWorkingScheduleQueryVariables = Exact<{
  [key: string]: never;
}>;

export type GetMyWorkingScheduleQuery = { __typename?: "Query" } & {
  getMyWorkingSchedule: { __typename?: "WorkingSchedule" } & Pick<
    WorkingSchedule,
    "id"
  > & {
      specialDays: Array<
        { __typename?: "SpecialDayWorkingHours" } & Pick<
          SpecialDayWorkingHours,
          "date"
        > & {
            workingHours: { __typename?: "ServiceDayWorkingHours" } & Pick<
              ServiceDayWorkingHours,
              "periods"
            >;
          }
      >;
      weekdays: { __typename?: "WeekdaysWorkingHours" } & {
        fr?: Maybe<
          { __typename?: "ServiceDayWorkingHours" } & Pick<
            ServiceDayWorkingHours,
            "periods"
          >
        >;
        mo?: Maybe<
          { __typename?: "ServiceDayWorkingHours" } & Pick<
            ServiceDayWorkingHours,
            "periods"
          >
        >;
        sa?: Maybe<
          { __typename?: "ServiceDayWorkingHours" } & Pick<
            ServiceDayWorkingHours,
            "periods"
          >
        >;
        su?: Maybe<
          { __typename?: "ServiceDayWorkingHours" } & Pick<
            ServiceDayWorkingHours,
            "periods"
          >
        >;
        th?: Maybe<
          { __typename?: "ServiceDayWorkingHours" } & Pick<
            ServiceDayWorkingHours,
            "periods"
          >
        >;
        tu?: Maybe<
          { __typename?: "ServiceDayWorkingHours" } & Pick<
            ServiceDayWorkingHours,
            "periods"
          >
        >;
        we?: Maybe<
          { __typename?: "ServiceDayWorkingHours" } & Pick<
            ServiceDayWorkingHours,
            "periods"
          >
        >;
      };
    };
};

export const useGetMyWorkingHoursQuery = () => {
  const client = createGraphqlRequestClient();

  client.setQuery(`
query getMyWorkingSchedule {
  getMyWorkingSchedule {
    id
    specialDays{
      date
      workingHours{
        periods
      }
    }
    weekdays{
      fr{
        periods
      }
      mo{
        periods
      }
      sa{
        periods
      }
      su{
        periods
      }
      th{
        periods
      }
      tu{
        periods
      }
      we{
        periods
      }
    }
  }
}
    `);

  return useQuery(["my-working-hours"], async () => {
    const res = await client.send<GetMyWorkingScheduleQuery>();

    return res.data.getMyWorkingSchedule;
  });
};
