import { Exact, Maybe } from "types";
import { createGraphqlRequestClient } from "api";
import { useQuery } from "react-query";
import {
  Membership,
  MembershipSubscription,
  MembershipTurnoverRule,
  MembershipTurnoverRuleType,
} from "@features/API";
import { CommissionType } from "@features/API";
import { isDev, randomNum } from "@UI/../utils/src";

export type GetMyMembershipQueryVariables = Exact<{ [key: string]: never }>;

export type GetMyMembershipQuery = { __typename?: "Query" } & {
  getMyMembership?: Maybe<
    { __typename?: "MembershipSubscription" } & Pick<
      MembershipSubscription,
      "userId" | "endAt" | "membershipId" | "startAt" | "usage"
    > & {
        membership: { __typename?: "Membership" } & Pick<Membership, "name"> & {
            turnover_rules: Array<
              { __typename?: "MembershipTurnoverRule" } & Pick<
                MembershipTurnoverRule,
                | "commission"
                | "commissionType"
                | "id"
                | "type"
                | "usage"
                | "key"
                | "commissionOn"
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
        	usage
          membership{
              name
              turnover_rules {
                  commission
                  commissionOn
                  commissionType
                	id
                	type
                	usage
                key
              }
          }
      }
    }
  `);

  return useQuery(["my-membership"], async () => {
    if (isDev) {
      const mockRes: GetMyMembershipQuery["getMyMembership"] = {
        endAt: new Date().toString(),
        membership: {
          name: "Pay Per Click",
          turnover_rules: [
            {
              commissionType: CommissionType.Percentage,
              commission: 10,
              id: "",
              type: MembershipTurnoverRuleType.Flat,
              key: "1",
            },
            {
              commissionType: CommissionType.Percentage,
              commission: 10,
              id: "",
              usage: 165,
              type: MembershipTurnoverRuleType.Usage,
              key: "5",
            },
          ],
        },
        usage: randomNum(1000),
        membershipId: "testid",
        startAt: new Date().toString(),
        userId: "testid",
      };
      return mockRes;
    }

    const res = await client.send<GetMyMembershipQuery>();

    return res.data.getMyMembership;
  });
};
