import React from "react";
import { useRouting } from "routing";
import {
  ResturantSearchInput,
  ResturantSearchList,
  ServicesRequestKeys,
} from "ui";

export const ResturantSearchView: React.FC = () => {
  const { visit } = useRouting();
  return (
    <div className="flex flex-col gap-8">
      <div className="md:w-3/4 w-full mx-auto">
        <ResturantSearchInput
          onSubmit={() =>
            visit((routes) =>
              routes.visitServiceLocationSearchResults(
                ServicesRequestKeys.resturants,
                "location"
              )
            )
          }
        />
      </div>

      <ResturantSearchList />
    </div>
  );
};
