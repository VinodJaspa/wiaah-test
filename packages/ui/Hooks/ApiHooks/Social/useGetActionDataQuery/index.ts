import { useQuery } from "react-query";
import { getActionData } from "api";

export const useGetActionDataQuery = (id: string | null) => {
  return useQuery(
    ["ActionData", { id }],
    () => {
      if (!id) return;
      return getActionData(id);
    },
    {
      enabled: !!id,
    }
  );
};
