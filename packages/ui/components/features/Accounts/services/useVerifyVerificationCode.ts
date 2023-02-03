import { createGraphqlRequestClient } from "api";
import { Exact, Scalars } from "types";
import { Mutation } from "@features/API";
import { useMutation } from "react-query";

export type ProvideVvcMutationVariables = Exact<{
  pic: Scalars["String"];
}>;

export type ProvideVvcMutation = { __typename?: "Mutation" } & Pick<
  Mutation,
  "provideVVCPicture"
>;

export const useVerifyVerificationCode = () => {
  const client = createGraphqlRequestClient();

  client.setQuery(`
        mutation ProvideVVC(
            $pic:String!
        ){
            provideVVCPicture(
                pic:$pic
            )
        }
    `);

  return useMutation<boolean, unknown, ProvideVvcMutationVariables["pic"]>(
    ["vvc"],
    async (pic) => {
      const res = await client
        .setVariables<ProvideVvcMutationVariables>({
          pic,
        })
        .send<ProvideVvcMutation>();

      return res.data.provideVVCPicture;
    }
  );
};
