import { getAffiliationPostDetails } from "api";
import { useQuery } from "react-query";

export const useGetAffiliationPost = (id: string | null) => {
  return useQuery(["AfffiliationPost", { id }], getAffiliationPostDetails, {
    enabled: !!id,
  });
};
