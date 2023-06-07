import { createGraphqlRequestClient } from "api";
import { Exact, Mutation, Scalars } from "@features/API";
import { useMutation } from "react-query";

export type PaybackInsuranceMutationVariables = Exact<{
  id: Scalars["ID"];
}>;

export type PaybackInsuranceMutation = { __typename?: "Mutation" } & Pick<
  Mutation,
  "refundInsurance"
>;

export const usePaybackServiceInsuranceMutation = () =>
  useMutation<boolean, any, PaybackInsuranceMutationVariables>(
    ["payback-service-inSurance"],
    async (args) => {
      const client = createGraphqlRequestClient();

      const res = await client
        .setQuery(
          `
mutation paybackInsurance($id:ID!){
  refundInsurance(id:$id)
}
    `
        )
        .setVariables<PaybackInsuranceMutationVariables>(args)
        .send<PaybackInsuranceMutation>();

      return res.data.refundInsurance;
    }
  );
