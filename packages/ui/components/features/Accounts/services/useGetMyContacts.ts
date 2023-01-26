import { createGraphqlRequestClient } from "api";
import { Exact } from "types";
import { useQuery } from "react-query";
import { UserContact } from "@features/Accounts";

export type GetMyContactsQueryVariables = Exact<{ [key: string]: never }>;

export type GetMyContactsQuery = { __typename?: "Query" } & {
  getMyContacts: { __typename?: "UserContact" } & Pick<
    UserContact,
    "gmail" | "outlook" | "whatsapp" | "yahoo"
  >;
};

export const useGetMyContacts = () => {
  const client = createGraphqlRequestClient();
  client.setQuery(`
    query getMyContacts{
        getMyContacts{
            gmail
            outlook
            whatsapp
            yahoo
        }
    }
`);

  return useQuery(["get-my-contacts"], async () => {
    const res = await client.send<GetMyContactsQuery>();
    return res.data.getMyContacts;
  });
};
