import { Exact } from "types";
import { createGraphqlRequestClient } from "api";
import { useQuery } from "react-query";
import {
  Membership,
  MembershipIncludedItem,
  MembershipTurnoverRule,
} from "@features/Membership/services/schema";

export type GetMembershipsQueryVariables = Exact<{ [key: string]: never }>;

export type GetMembershipsQuery = { __typename?: "Query" } & {
  getSubscriableMemberships: Array<
    { __typename?: "Membership" } & Pick<
      Membership,
      "id" | "commissionOn" | "name" | "priceId" | "recurring"
    > & {
        includings: Array<
          { __typename?: "MembershipIncludedItem" } & Pick<
            MembershipIncludedItem,
            "title"
          >
        >;
        turnover_rules: Array<
          { __typename?: "MembershipTurnoverRule" } & Pick<
            MembershipTurnoverRule,
            | "commission"
            | "commissionType"
            | "id"
            | "membershipId"
            | "priceId"
            | "usage"
          >
        >;
      }
  >;
};

export const useGetMembershipsQuery = () => {
  const client = createGraphqlRequestClient();

  client.setQuery(`
    query getMemberships {
        getSubscriableMemberships {
            id
            includings{
                title
            }
            commissionOn
            name
            priceId
            recurring
            turnover_rules{
                commission
                commissionType
                id
                membershipId
                priceId
                usage
            }
        }
    }
    `);

  return useQuery(["get-memberships"], async () => {
    const res = await client.send<GetMembershipsQuery>();

    return res.data.getSubscriableMemberships || [];
  });
};
