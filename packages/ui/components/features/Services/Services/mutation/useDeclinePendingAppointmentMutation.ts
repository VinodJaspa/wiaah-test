import { DeclineAppointmentInput, Exact, Mutation } from "@features/API";
import { createGraphqlRequestClient } from "api";
import { useMutation } from "react-query";

export type DeclinePendingAppointmentMutationVariables = Exact<{
  args: DeclineAppointmentInput;
}>;

export type DeclinePendingAppointmentMutation = {
  __typename?: "Mutation";
} & Pick<Mutation, "declineAppointment">;

export const useDeclinePendingAppointmentMutation = () => {
  const client = createGraphqlRequestClient();

  client.setQuery(`
    mutation declinePendingAppointment(
        $args:DeclineAppointmentInput!
    ){
        declineAppointment(args:$args)
    }
    `);

  return useMutation<
    boolean,
    unknown,
    DeclinePendingAppointmentMutationVariables["args"]
  >(["decline-pending-appointment"], async (data) => {
    const res = await client
      .setVariables<DeclinePendingAppointmentMutationVariables>({
        args: data,
      })
      .send<DeclinePendingAppointmentMutation>();

    return res.data.declineAppointment;
  });
};
