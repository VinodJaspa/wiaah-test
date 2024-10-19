import { LocationSearchInput } from "../../../blocks/DataInput";
import {
  RecommendedBeautyCenterSearchList,
  ServicesRequestKeys,
  useGetRecommendedBeautyCentersQuery,
} from "../../../features";
import { Pagination } from "../../../partials";
import React from "react";
import { useRouting } from "routing";

export const BeautyCenterSearchView: React.FC = () => {
  const { visit } = useRouting();
  const { data } = useGetRecommendedBeautyCentersQuery({ page: 1, take: 10 });
  return (
    <div className="flex flex-col items-center gap-8">
      <LocationSearchInput
        onLocationSelect={(location) => {
          visit((routes) =>
            routes.visitServiceLocationSearchResults(
              ServicesRequestKeys.beauty_center,
              location,
            ),
          );
        }}
      />

      <RecommendedBeautyCenterSearchList
        treatments={[...Array(10)].map(() => ({
          title: "treatment title",
          category: "Facial",
          duration: 45,
          id: "",
          price: 40,
          rate: 4,
          reviews: 150,
          thumbnail:
            "https://media.istockphoto.com/id/501398614/photo/face-skin-care-facial-hydro-microdermabrasion-peeling-treatment.jpg?s=612x612&w=0&k=20&c=8sB-63Okl1ZlF1aHNRtJb7aVzf3qCezOnphkgnW_shY=",
        }))}
      />
      <Pagination />
    </div>
  );
};
