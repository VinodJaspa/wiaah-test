import { Exact, Mutation, Scalars } from "@features/API";
import { createGraphqlRequestClient } from "@UI/../api";
import { useMutation, useQuery } from "react-query";

export type AcceptPendingAppointmentMutationVariables = Exact<{
  id: Scalars["ID"];
}>;

export type AcceptPendingAppointmentMutation = {
  __typename?: "Mutation";
} & Pick<Mutation, "acceptAppointment">;

export const useAcceptPendingAppointmentMutation = () => {
  const client = createGraphqlRequestClient();

  client.setQuery(`
    mutation acceptPendingAppointment(
  $id:ID!
){
  acceptAppointment(
    id:$id
  )
}
    `);

  return useMutation<
    boolean,
    unknown,
    AcceptPendingAppointmentMutationVariables["id"]
  >(["accept-pending-appointment"], async (id) => {
    const res = await client
      .setVariables<AcceptPendingAppointmentMutationVariables>({
        id,
      })
      .send<AcceptPendingAppointmentMutation>();

    return res.data.acceptAppointment;
  });
};
