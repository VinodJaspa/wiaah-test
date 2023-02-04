import { createGraphqlRequestClient } from "api";
import { Exact, Scalars } from "types";
import { useMutation } from "react-query";
import { GqlStatusResponse } from "@features/API";

export type LoginAsMutationVariables = Exact<{
  id: Scalars["String"];
}>;

export type LoginAsMutation = { __typename?: "Mutation" } & {
  loginAs: { __typename?: "GqlStatusResponse" } & Pick<
    GqlStatusResponse,
    "code" | "message" | "success"
  >;
};

export const useLoginAsAccount = () => {
  const client = createGraphqlRequestClient();

  client.setQuery(`
    mutation loginAs(
    $id:String!
){
    loginAs(
        userId:$id
    ){
        code
        message
        success
    }
}
    `);

  return useMutation<GqlStatusResponse, unknown, LoginAsMutationVariables>(
    ["loginAs"],
    async (data) => {
      const res = await client
        .setVariables<LoginAsMutationVariables>({
          id: data.id,
        })
        .send<LoginAsMutation>();

      return res.data.loginAs;
    }
  );
};
