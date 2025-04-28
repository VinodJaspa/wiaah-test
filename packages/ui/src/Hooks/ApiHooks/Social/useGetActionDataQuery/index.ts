import { useQuery } from "react-query";
import { getActionData } from "api";

export const useGetActionDataQuery = (id: string | null) => {
  return useQuery(
    ["ActionData", { id }],
    () => {
      if (!id) return undefined
      return getActionData(id);
    },
    {
      enabled: !!id,
    }
  );
};
