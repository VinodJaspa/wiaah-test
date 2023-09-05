import { usePaginationControls } from "@blocks/Navigating";
import { ArrowLeftIcon, ArrowRightIcon } from "@partials";
import React from "react";

export const BasicPagination: React.FC<{ controls: usePaginationControls }> = ({
  controls,
}) => {
  return (
    <div className="flex w-fit items-center gap-2">
      <p className="font-medium">
        {controls.page} - {controls.totalPages}
      </p>
      <button
        onClick={controls?.previous}
        className="bg-primary text-white rounded w-8 h-8 text-lg flex justify-center items-center"
      >
        <ArrowLeftIcon />
      </button>
      <button
        onClick={controls?.next}
        className="bg-primary  text-white rounded w-8 h-8 text-lg flex justify-center items-center"
      >
        <ArrowRightIcon />
      </button>
    </div>
  );
};
