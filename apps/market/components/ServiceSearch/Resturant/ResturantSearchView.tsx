import { RecommendedResturantData } from "api";
import React from "react";
import {
  ResturantSearchInput,
  ResturantRecommendedCard,
  useGetRecommendedResturantsQuery,
  SpinnerFallback,
} from "ui";

export const ResturantSearchView: React.FC = () => {
  const [resturants, setResturants] = React.useState<
    RecommendedResturantData[]
  >([]);
  const { isLoading, isError } = useGetRecommendedResturantsQuery(10, 0, {
    onSuccess: (data) => setResturants(data),
  });
  return (
    <div className="flex flex-col gap-8 py-8">
      <div className="w-3/4 mx-auto">
        <ResturantSearchInput onSubmit={() => {}} />
      </div>

      <SpinnerFallback isLoading={isLoading} isError={isError}>
        <div className="w-full mx-auto justify-between gap-4 grid grid-cols-[repeat(auto-fit,minmax(10rem,23%))]">
          {Array.isArray(resturants)
            ? resturants.map((res, i) => (
                <ResturantRecommendedCard {...res} key={i} />
              ))
            : null}
        </div>
      </SpinnerFallback>
    </div>
  );
};
