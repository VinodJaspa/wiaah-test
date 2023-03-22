import { Exact, Maybe } from "types";
import { createGraphqlRequestClient } from "api";
import { useQuery } from "react-query";
import {
  Membership,
  MembershipSubscription,
  MembershipTurnoverRule,
} from "@features/Membership/schema";
import { CommissionType } from "@features/API";

export type GetMyMembershipQueryVariables = Exact<{ [key: string]: never }>;

export type GetMyMembershipQuery = { __typename?: "Query" } & {
  getMyMembership?: Maybe<
    { __typename?: "MembershipSubscription" } & Pick<
      MembershipSubscription,
      "userId" | "endAt" | "membershipId" | "startAt"
    > & {
        membership: { __typename?: "Membership" } & Pick<Membership, "name"> & {
            turnover_rules: Array<
              { __typename?: "MembershipTurnoverRule" } & Pick<
                MembershipTurnoverRule,
                "commission" | "commissionType"
              >
            >;
          };
      }
  >;
};

export const useGetMyMembershipQuery = () => {
  const client = createGraphqlRequestClient();

  client.setQuery(`
    query getMyMembership {
      getMyMembership {
          userId
          endAt
          membershipId
          startAt
          membership{
              name
              turnover_rules {
                  commission
                  commissionType
              }
          }
      }
    }
  `);

  return useQuery(["my-membership"], async () => {
    const mockRes: GetMyMembershipQuery["getMyMembership"] = {
      endAt: new Date().toString(),
      membership: {
        name: "Pay Per Click",
        turnover_rules: [
          {
            commissionType: CommissionType.Percentage,
            commission: 10,
          },
          {
            commissionType: CommissionType.Percentage,
            commission: 10,
          },
        ],
      },
      membershipId: "testid",
      startAt: new Date().toString(),
      userId: "testid",
    };

    return mockRes;
    const res = await client.send<GetMyMembershipQuery>();

    return res.data.getMyMembership;
  });
};
