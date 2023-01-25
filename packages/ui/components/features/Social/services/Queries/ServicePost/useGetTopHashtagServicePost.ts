import { createGraphqlRequestClient } from "@UI/../api";
import { useQuery } from "react-query";

export const useGetTopHashtagServicePost = () => {
  const client = createGraphqlRequestClient();

  client.setQuery(`

    `);

  return useQuery(["use-get-top-hashtag-service-post"], async () => {
    const res = await client.send();
  });
};
