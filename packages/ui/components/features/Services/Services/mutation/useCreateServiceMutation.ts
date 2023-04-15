import { createGraphqlRequestClient } from "api";
import { ServicesType } from "types";
import { useMutation } from "react-query";
import { CreateServiceInput, Exact, Mutation } from "@features/API";

export type CreateServiceMutationVariables = Exact<{
  args: CreateServiceInput;
}>;

export type CreateServiceMutation = { __typename?: "Mutation" } & Pick<
  Mutation,
  "createService"
>;

export function useCreateServiceMutation<
  TVars extends { serviceType: ServicesType }
>() {
  return useMutation<
    unknown,
    unknown,
    CreateServiceMutationVariables["args"],
    any
  >("createService", (data) => {
    const client = createGraphqlRequestClient();
    client.setQuery(`
mutation createService($args:CreateServiceInput!){
  createService(args:$args)
}
    `);

    return client
      .setVariables<CreateServiceMutationVariables>({ args: data })
      .send<CreateServiceMutation>();
  });
}
