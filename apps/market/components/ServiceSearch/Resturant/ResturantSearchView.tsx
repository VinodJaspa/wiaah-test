import React from "react";
import { ResturantSearchInput, ResturantSearchList } from "ui";

export const ResturantSearchView: React.FC = () => {
  return (
    <div className="flex flex-col gap-8 py-8">
      <div className="w-3/4 mx-auto">
        <ResturantSearchInput onSubmit={() => {}} />
      </div>

      <ResturantSearchList />
    </div>
  );
};
