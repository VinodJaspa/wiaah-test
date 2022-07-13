import { useQuery } from "react-query";
import { getPostCommentsData } from "api";

export const useGetPostCommentsQuery = (id: string | null) => {
  return useQuery(
    ["PostComments", { id }],
    ({ queryKey }: any) => {
      const id = queryKey[1].id;
      return getPostCommentsData(id);
    },
    {
      enabled: !!id,
    }
  );
};
