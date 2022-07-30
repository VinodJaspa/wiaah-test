import { usePagination } from "hooks";
import {
  useSearchFilters,
  uesGetShopsOnmapSearchQuery,
  ShopMapSearchCard,
} from "ui";
import React from "react";

export const ShopsOnMapSearchList: React.FC = () => {
  const { page, take } = usePagination(16);
  const { filters } = useSearchFilters();
  const {
    data: res,
    isLoading,
    isError,
  } = uesGetShopsOnmapSearchQuery({ page, take }, filters);

  return (
    <div className="flex gap-4 w-fit">
      {res
        ? res.data.map((shop, i) => (
            <div className="w-52">
              <ShopMapSearchCard {...shop} key={i} />
            </div>
          ))
        : null}
    </div>
  );
};
