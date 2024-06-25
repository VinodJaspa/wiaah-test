import { Exact } from "types";
import { createGraphqlRequestClient } from "api";
import { useQuery } from "react-query";
import {
  Membership,
  MembershipIncludedItem,
  MembershipRecurring,
  MembershipTurnoverRule,
} from "@features/API";
import { CommissionOn, CommissionType } from "@features/API";
import { Recurring } from "@features/Membership/schema";

export type GetMembershipsQueryVariables = Exact<{ [key: string]: never }>;

export type GetMembershipsQuery = { __typename?: "Query" } & {
  getSubscriableMemberships: Array<
    { __typename?: "Membership" } & Pick<
      Membership,
      "id" | "name" | "priceIds" | "recurring"
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
          "commission" | "commissionType" | "id" | "membershipId" | "usage"
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
        includings: [
          {
            title: "20% commission on sales",
          },
        ],
        name: "Free",
        priceIds: ["test"],
        recurring: MembershipRecurring.Month,
        turnover_rules: [
          {
            commission: 5,
            commissionType: CommissionType.Percentage,
            id: "test",
            membershipId: "test",
            usage: 10000,
          },
          {
            commission: 5,
            commissionType: CommissionType.Fixed,
            id: "test",
            membershipId: "test",
            usage: 10000,
          },
        ],
      },
      {
        id: "Pay",
        includings: [
          {
            title: "5% commission on sales",
          },
          {
            title: "20$ fixed monthly fee",
          },
        ],
        name: "Pay",
        priceIds: ["test"],
        recurring: MembershipRecurring.Month,
        turnover_rules: [
          {
            commission: 5,
            commissionType: CommissionType.Percentage,
            id: "test",
            membershipId: "test",
            usage: 10000,
          },
          {
            commission: 5,
            commissionType: CommissionType.Fixed,
            id: "test",
            membershipId: "test",
            usage: 50,
          },
        ],
      },
      {
        id: "Pay Per Click",
        includings: [
          {
            title: "let users shop through your own website",
          },
          {
            title: "commssion on external link click",
          },
        ],
        name: "Pay Per Click",
        priceIds: ["test"],
        recurring: MembershipRecurring.Month,
        turnover_rules: [
          {
            commission: 0.001,
            commissionType: CommissionType.Fixed,
            id: "test",
            membershipId: "test",
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
