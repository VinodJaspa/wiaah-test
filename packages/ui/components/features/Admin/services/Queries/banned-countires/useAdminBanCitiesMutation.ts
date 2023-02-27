import { BanCitiesInput, Exact, Mutation } from "@features/API";
import { createGraphqlRequestClient } from "@UI/../api";
import { useMutation } from "react-query";

export type AdminBanSellersMutationVariables = Exact<{
  args: BanCitiesInput;
}>;

export type AdminBanSellersMutation = { __typename?: "Mutation" } & Pick<
  Mutation,
  "banSellersCities"
>;

export const useAdminBanSellersCitites = () => {
  const client = createGraphqlRequestClient();

  client.setQuery(`
mutation adminBanSellers($args:BanCitiesInput!){
  banSellersCities(args:$args)
}
    `);

  return useMutation<
    AdminBanSellersMutation["banSellersCities"],
    unknown,
    AdminBanSellersMutationVariables["args"]
  >(["admin-ban-sellers-cities"], async (args) => {
    const res = await client
      .setVariables<AdminBanSellersMutationVariables>({ args })
      .send<AdminBanSellersMutation>();
    return res.data.banSellersCities;
  });
};

export type AdminBanBuyersMutationVariables = Exact<{
  args: BanCitiesInput;
}>;

export type AdminBanBuyersMutation = { __typename?: "Mutation" } & Pick<
  Mutation,
  "banBuyersCities"
>;

export const useAdminBanBuyersCitites = () => {
  const client = createGraphqlRequestClient();

  client.setQuery(`
    mutation adminBanBuyers($args:BanCitiesInput!){
  banBuyersCities(args:$args)
}
    `);

  return useMutation<
    AdminBanBuyersMutation["banBuyersCities"],
    unknown,
    AdminBanBuyersMutationVariables["args"]
  >(["admin-ban-buyers-cities"], async (args) => {
    const res = await client
      .setVariables<AdminBanBuyersMutationVariables>({ args })
      .send<AdminBanBuyersMutation>();
    return res.data.banBuyersCities;
  });
};
