import { getRandomName, isDev, randomNum } from "@UI/../utils/src";
import { Account, Exact, Maybe, OrderItem, Scalars } from "@features/API";
import { createGraphqlRequestClient } from "api";
import { useQuery } from "react-query";

export type GetRecentsalesQueryVariables = Exact<{
  take?: Maybe<Scalars["Int"]>;
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
  args: GetRecentsalesQueryVariables["take"]
) => ["get-recent-sales", { args }];

export const AdminGetRecentSalesQueryFetcher = async (
  args: GetRecentsalesQueryVariables["take"]
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
  args: GetRecentsalesQueryVariables["take"]
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
        })
      );

      return res;
    }

    return AdminGetRecentSalesQueryFetcher(args);
  });
};
