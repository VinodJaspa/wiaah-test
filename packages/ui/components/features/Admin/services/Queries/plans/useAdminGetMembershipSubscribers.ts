import {
  Account,
  AdminGetMembersipSubscriptionInput,
  Exact,
  Membership,
  MembershipSubscription,
  MembershipTurnoverRule,
} from "@features/API";
import { createGraphqlRequestClient } from "api";
import { useQuery } from "react-query";

export type AdminGetMembershipSubscribersQueryVariables = Exact<{
  args: AdminGetMembersipSubscriptionInput;
}>;

export type AdminGetMembershipSubscribersQuery = { __typename?: "Query" } & {
  adminGetMembershipSubscriptions: Array<
    { __typename?: "MembershipSubscription" } & Pick<
      MembershipSubscription,
      "endAt" | "membershipId" | "startAt" | "userId" | "usage" | "status"
    > & {
        membership: { __typename?: "Membership" } & Pick<
          Membership,
          "commissionOn" | "name" | "recurring" | "sortOrder" | "id"
        > & {
            turnover_rules: Array<
              { __typename?: "MembershipTurnoverRule" } & Pick<
                MembershipTurnoverRule,
                "commission" | "commissionType" | "id" | "priceId" | "usage"
              >
            >;
          };
        subscriber: { __typename?: "Account" } & Pick<
          Account,
          "firstName" | "lastName"
        >;
      }
  >;
};

type args = AdminGetMembershipSubscribersQueryVariables["args"];

export const adminGetMembershipSubscribersQueryKey = (args: args) => [
  "admin-get-membership-subscribers",
  { args },
];

export const adminGetMembershipSubscribersQueryFetcher = async (args: args) => {
  const client = createGraphqlRequestClient();

  client.setQuery(`
query adminGetMembershipSubscribers(
  $args:AdminGetMembersipSubscriptionInput!
){
  adminGetMembershipSubscriptions(
    args:$args
  ){
    endAt
    membershipId
    startAt
    userId
    usage
    membership{
      commissionOn
      name
      recurring
      sortOrder
      id
      turnover_rules {
        commission
        commissionType
        id
        priceId
        usage
      }
    }
    status
    subscriber {
      firstName
      lastName
    }
  }
}
`);

  const res = await client
    .setVariables<AdminGetMembershipSubscribersQueryVariables>({
      args,
    })
    .send<AdminGetMembershipSubscribersQuery>();

  return res.data.adminGetMembershipSubscriptions;
};

export const useAdminGetMembershipSubscriptionQuery = (args: args) =>
  useQuery(adminGetMembershipSubscribersQueryKey(args), () =>
    adminGetMembershipSubscribersQueryFetcher(args)
  );
