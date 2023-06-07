import {
  Exact,
  UpdateWorkingScheduleInput,
  WorkingSchedule,
} from "@features/API";
import { createGraphqlRequestClient } from "api";
import { useMutation, useQuery } from "react-query";

export type UpdateWorkingScheduleMutationVariables = Exact<{
  args: UpdateWorkingScheduleInput;
}>;

export type UpdateWorkingScheduleMutation = { __typename?: "Mutation" } & {
  updateMyWorkingSchedule: { __typename?: "WorkingSchedule" } & Pick<
    WorkingSchedule,
    "id"
  >;
};

export const useUpdateWeekWorkingHoursMutation = () => {
  const client = createGraphqlRequestClient();

  client.setQuery(`
    mutation updateWorkingSchedule(
  $args:UpdateWorkingScheduleInput!
){
  updateMyWorkingSchedule(
    args:$args
  ){id}
}
    `);

  return useMutation<
    UpdateWorkingScheduleMutation["updateMyWorkingSchedule"],
    unknown,
    UpdateWorkingScheduleInput
  >(["update-week-workung-hours"], async (data) => {
    const res = await client
      .setVariables<UpdateWorkingScheduleMutationVariables>({
        args: data,
      })
      .send<UpdateWorkingScheduleMutation>();

    return res.data.updateMyWorkingSchedule;
  });
};
