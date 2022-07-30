import { usePagination, useResponsive } from "hooks";
import React from "react";
import {
  useSearchFilters,
  useGetHealthCentersDataQuery,
  AspectRatioImage,
  Rate,
} from "ui";

export const HealthCenterHorizontalCardsList: React.FC = () => {
  const { take, page } = usePagination(8);
  const { filters } = useSearchFilters();
  const {
    data: res,
    isLoading,
    isError,
  } = useGetHealthCentersDataQuery({ page, take }, filters);

  return (
    <div className="flex gap-4">
      {res
        ? res.data.map((center, i) => (
            <div className="flex bg-white flex-col shadow">
              <AspectRatioImage
                src={center.centerData.photo}
                alt={center.centerData.name}
                ratio={9 / 16}
              />
              <div className="flex flex-col w-48 gap-1 p-2">
                <p className="font-semibold">{center.centerData.name}</p>
                <p>
                  {center.centerData.location.address},{" "}
                  {center.centerData.location.postalCode}{" "}
                  {center.centerData.location.city}{" "}
                  {center.centerData.location.country}
                </p>
                <Rate rating={center.centerData.rate} />
              </div>
            </div>
          ))
        : null}
    </div>
  );
};
