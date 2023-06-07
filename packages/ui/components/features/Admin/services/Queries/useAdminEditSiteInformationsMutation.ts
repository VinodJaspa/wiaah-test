import { createGraphqlRequestClient } from "api";
import { useMutation } from "react-query";

export const useAdminEditSiteInformationsMutation = () => {
  const client = createGraphqlRequestClient();

  client.setQuery(``);

  return useMutation<>(["edit-site-info"], async () => {
    const res = await client.setVariables().send();
  });
};
