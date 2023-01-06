import { createGraphqlRequestClient } from "@Utils";
import { useMutation } from "react-query";

export const useSellerSignupMutation = () => {
  const client = createGraphqlRequestClient();

  client.setQuery(`

    `);

  return useMutation({});
};
