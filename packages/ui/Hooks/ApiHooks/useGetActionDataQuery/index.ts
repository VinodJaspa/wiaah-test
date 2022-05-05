import { useQuery } from "react-query";
import { getActionData } from "api";

export const useGetActionDataQuery = (id: string | null) => {
  return useQuery(
    ["ActionData", { id }],
    ({ queryKey }) => {
      const id = queryKey[1].id;
      return getActionData(id);
    },
    {
      enabled: !!id,
    }
  );
};
