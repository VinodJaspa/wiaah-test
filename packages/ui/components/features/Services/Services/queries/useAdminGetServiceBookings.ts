import { createGraphqlRequestClient } from "api";
import { useQuery } from "react-query";

type args = {};
export const adminGetServiceBookingsQueryKey = (args: args) => [
  "admin-get-service-bookings",
  { args },
];

export const adminGetServiceBookingsQueryFetcher = async (args: args) => {
  const client = createGraphqlRequestClient();
  client.setQuery(``);

  const res = await client.setVariables<>({ args }).send<>();
  return res.data;
};

export const useAdminGetServiceBookingsQuery = (args: args) =>
  useQuery(adminGetServiceBookingsQueryKey(args), () =>
    adminGetServiceBookingsQueryFetcher(args)
  );
