import {
  BeautyCenterTreatment,
  BeautyCenter,
  SearchFilteredBeautyCenterInput,
} from "@features/Services/Services";
import { createGraphqlRequestClient } from "api";
import { GqlResponse } from "@UI/../types/src";
import { useQuery } from "react-query";

export const useGetFilteredBeautyCenterTreatmentsQuery = (
  input: SearchFilteredBeautyCenterInput,
) => {
  const client = createGraphqlRequestClient();

  client.setQuery(`
        query getBeautyCenterTreatments(
            $args:SearchFilteredBeautyCenterInput!
        ){
            getFilteredBeuatyCenterTreatments(
                args:$args
            ){
                category{
                    createdAt
                    createdById
                    id
                    title
                    updatedAt
                }
                discount{
                    units
                    value
                }
                duration
                id
                price
                title
                treatmentCategoryId
            }
        }
    `);

  client.setVariables({
    args: input,
  });

  return useQuery(["search-filtered-beauty-center", input], async () => {
    const res =
      await client.send<
        GqlResponse<
          (BeautyCenterTreatment & { center: BeautyCenter })[],
          "getFilteredBeuatyCenterTreatments"
        >
      >();
    return res.data.data.getFilteredBeuatyCenterTreatments;
  });
};
