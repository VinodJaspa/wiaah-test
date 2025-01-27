import { createGraphqlRequestClient } from "api";
import { getRandomImage } from "placeholder";
import { useQuery } from "react-query";
import { isDev } from "utils";

export type GetAllUsersQueryVariables = {
  limit?: number;
  offset?: number;
};

export type GetAllUsersQuery = {
  allUsers: {
    id: string;
    username: string;
    fullName: string;
    avatar: string;
  }[];
};

const mockUsers = [
  {
    id: "1",
    username: "john",
    fullName: "Mock User One",
    avatar: getRandomImage(),
  },
  {
    id: "2",
    username: "jenny",
    fullName: "Mock User Two",
    avatar: getRandomImage(),
  },
  {
    id: "3",
    username: "mira",
    fullName: "Mock User Three",
    avatar: getRandomImage(),
  },
];

export const useGetAllUsers = (limit = 10, offset = 0) => {
  const client = createGraphqlRequestClient();

  client.setQuery(`
    query GetAllUsers($limit: Int, $offset: Int) {
      allUsers(limit: $limit, offset: $offset) {
        id
        username
        fullName
        avatar
      }
    }
  `);

  client.setVariables<GetAllUsersQueryVariables>({ limit, offset });

  return useQuery(
    ["get-all-users", { limit, offset }],
    async () => {
      if (isDev) {
        return mockUsers;
      }

      const res = await client.send<GetAllUsersQuery>();
      return res.data.allUsers;
    },
    {
      staleTime: 1000 * 60 * 5,
      enabled: !isDev || mockUsers.length > 0,
    },
  );
};
