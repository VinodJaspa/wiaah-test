import { Exact } from "types";
import { createGraphqlRequestClient } from "api";
import { useQuery } from "react-query";
import {
  Membership,
  MembershipIncludedItem,
  MembershipTurnoverRule,
} from "@features/API";
import { CommissionOn, CommissionType } from "@features/API";
import { Recurring } from "@features/Membership/schema";

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
    const mockRes: GetMembershipsQuery["getSubscriableMemberships"] = [
      {
        id: "test",
        commissionOn: CommissionOn.Sale,
        includings: [
          {
            title: "20% commission on sales",
          },
        ],
        name: "Free",
        priceId: "test",
        recurring: 31,
        turnover_rules: [
          {
            commission: 5,
            commissionType: CommissionType.Percentage,
            id: "test",
            membershipId: "test",
            priceId: "test",
            usage: 10000,
          },
          {
            commission: 5,
            commissionType: CommissionType.Fixed,
            id: "test",
            membershipId: "test",
            priceId: "test",
            usage: 10000,
          },
        ],
      },
      {
        id: "Pay",
        commissionOn: CommissionOn.Sale,
        includings: [
          {
            title: "5% commission on sales",
          },
          {
            title: "5$ fixed commission on sales",
          },
        ],
        name: "Pay",
        priceId: "test",
        recurring: 31,
        turnover_rules: [
          {
            commission: 5,
            commissionType: CommissionType.Percentage,
            id: "test",
            membershipId: "test",
            priceId: "test",
            usage: 10000,
          },
          {
            commission: 5,
            commissionType: CommissionType.Fixed,
            id: "test",
            membershipId: "test",
            priceId: "test",
            usage: 50,
          },
        ],
      },
      {
        id: "Pay Per Click",
        commissionOn: CommissionOn.ExternalClick,
        includings: [
          {
            title: "let users shop through your own website",
          },
          {
            title: "commssion on external link click",
          },
        ],
        name: "Pay Per Click",
        priceId: "test",
        recurring: 31,
        turnover_rules: [
          {
            commission: 0.001,
            commissionType: CommissionType.Fixed,
            id: "test",
            membershipId: "test",
            priceId: "test",
            usage: 50,
          },
        ],
      },
    ];

    return mockRes;

    const res = await client.send<GetMembershipsQuery>();

    return res.data.getSubscriableMemberships || [];
  });
};
