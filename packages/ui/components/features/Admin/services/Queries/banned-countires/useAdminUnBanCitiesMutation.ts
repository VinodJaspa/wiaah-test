import { BanCitiesInput, Exact, Mutation } from "@features/API";
import { createGraphqlRequestClient } from "api";
import { useMutation } from "react-query";

export type AdminUnBanSellerCititesMutationVariables = Exact<{
  args: BanCitiesInput;
}>;

export type AdminUnBanSellerCititesMutation = {
  __typename?: "Mutation";
} & Pick<Mutation, "unBanSellersCities">;

export const useAdminUnBanSellersCitites = async () => {
  const client = createGraphqlRequestClient();

  client.setQuery(`
mutation adminUnBanSellerCitites($args:BanCitiesInput!){
  	unBanSellersCities(args:$args)
}
    `);

  return useMutation<
    AdminUnBanSellerCititesMutation["unBanSellersCities"],
    unknown,
    AdminUnBanSellerCititesMutationVariables["args"]
  >(["admin-ban-sellers-cities"], async (args) => {
    const res = await client
      .setVariables<AdminUnBanSellerCititesMutationVariables>({ args })
      .send<AdminUnBanSellerCititesMutation>();
    return res.data.unBanSellersCities;
  });
};

export type AdminUnBanBuyersCititesMutationVariables = Exact<{
  args: BanCitiesInput;
}>;

export type AdminUnBanBuyersCititesMutation = {
  __typename?: "Mutation";
} & Pick<Mutation, "unBanBuyersCities">;

export const useAdminUnBanBuyersCitites = async () => {
  const client = createGraphqlRequestClient();

  client.setQuery(`
mutation adminUnBanBuyersCitites($args:BanCitiesInput!){
  	unBanBuyersCities(args:$args)
}
    `);

  return useMutation<
    AdminUnBanBuyersCititesMutation["unBanBuyersCities"],
    unknown,
    AdminUnBanBuyersCititesMutationVariables["args"]
  >(["admin-ban-buyers-cities"], async (args) => {
    const res = await client
      .setVariables<AdminUnBanBuyersCititesMutationVariables>({ args })
      .send<AdminUnBanBuyersCititesMutation>();
    return res.data.unBanBuyersCities;
  });
};
