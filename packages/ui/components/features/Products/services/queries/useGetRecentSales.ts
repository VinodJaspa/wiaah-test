import { getRandomName, isDev, randomNum } from "utils";
import {
  Account,
  Exact,
  Maybe,
  OrderItem,
  Scalars,
} from "../../../../features/API";
import { createGraphqlRequestClient } from "api";
import { useQuery } from "react-query";

export type GetRecentsalesQueryVariables = Exact<{
  take?: Maybe<Scalars["Int"]["input"]>;
}>;

export type GetRecentsalesQuery = { __typename?: "Query" } & {
  getRecentSales: Array<
    { __typename?: "OrderItem" } & Pick<
      OrderItem,
      "id" | "paid" | "createdAt"
    > & {
      buyer: { __typename?: "Account" } & Pick<
        Account,
        "firstName" | "photo" | "lastName"
      >;
    }
  >;
};

export const AdminGetRecentSalesQueryKey = (
  args: GetRecentsalesQueryVariables["take"],
) => ["get-recent-sales", { args }];

export const AdminGetRecentSalesQueryFetcher = async (
  args: GetRecentsalesQueryVariables["take"],
) => {
  const client = createGraphqlRequestClient();

  client.setQuery(`
query GetRecentsales($take:Int){
  getRecentSales(count:$take){
    id
    paid
    createdAt
    buyer{
      firstName
      lastName
      photo
    }
  }
}
    `);

  const res = await client
    .setVariables<GetRecentsalesQueryVariables>({ take: args })
    .send<GetRecentsalesQuery>();
  return res.data.getRecentSales;
};

export const useGetAdminRecentSalesQuery = (
  args: GetRecentsalesQueryVariables["take"],
) => {
  return useQuery(AdminGetRecentSalesQueryKey(args), () => {
    if (isDev) {
      const res: GetRecentsalesQuery["getRecentSales"] = [...Array(10)].map(
        (_, i) => ({
          id: i.toString(),
          buyer: {
            firstName: getRandomName().firstName,
            lastName: getRandomName().lastName,
            photo: `/profile (${i % 7}).jfif`,
          },
          createdAt: new Date().toString(),
          paid: randomNum(150),
        }),
      );

      return res;
    }

    return AdminGetRecentSalesQueryFetcher(args);
  });
};

const FAKE_RECENT_SALES = [
  {
    __typename: "OrderItem",
    id: "orderItem1",
    paid: true,
    createdAt: "2024-07-12T10:00:00Z",
    buyer: {
      __typename: "Account",
      firstName: "John",
      lastName: "Doe",
      photo: "https://example.com/photos/john.jpg",
    },
  },
  {
    __typename: "OrderItem",
    id: "orderItem2",
    paid: false,
    createdAt: "2024-07-11T15:30:00Z",
    buyer: {
      __typename: "Account",
      firstName: "Jane",
      lastName: "Smith",
      photo: "https://example.com/photos/jane.jpg",
    },
  },
];
