import React from "react";
import { ResturantSearchInput, ResturantSearchList } from "ui";

export const ResturantSearchView: React.FC = () => {
  return (
    <div className="flex flex-col gap-8">
      <div className="md:w-3/4 w-full mx-auto">
        <ResturantSearchInput onSubmit={() => {}} />
      </div>

      <ResturantSearchList />
    </div>
  );
};
