import { FilteredHotelsMetaDataType } from "api";
import { usePagination } from "hooks";
import React from "react";
import { useTranslation } from "react-i18next";
import { useMutateFocusedMapItemId } from "ui";
import {
  useGetFilteredServicesMetaDataQuery,
  useSearchFilters,
  HotelDetailedSearchCard,
  SpinnerFallback,
  PaginationWrapper,
} from "ui";

export interface HotelsSearchListProps {
  sorting?: boolean;
}

export const HotelsSearchList: React.FC<HotelsSearchListProps> = ({
  sorting,
}) => {
  const { focusMapItem } = useMutateFocusedMapItemId();
  const { page, take } = usePagination();
  const { t } = useTranslation();
  const { filters, getFiltersSearchQuery } = useSearchFilters();
  const [services, setServices] = React.useState<FilteredHotelsMetaDataType[]>(
    []
  );

  const { isLoading, isError } = useGetFilteredServicesMetaDataQuery(
    { page, take },
    filters,
    {
      onSuccess: (res) => setServices(res.data),
    }
  );
  return (
    <PaginationWrapper>
      <div className="w-full flex flex-col gap-4 justify-center">
        {typeof getFiltersSearchQuery === "string" ? (
          <p className="text-2xl font-bold">
            {Array.isArray(services) ? services.length : ""}{" "}
            {t("Services were found in")} {getFiltersSearchQuery || ""}
          </p>
        ) : null}
        <SpinnerFallback isLoading={isLoading} isError={isError}>
          {services.length < 1 ? (
            <div className="w-fit h-48 flex just-center items-center text-2xl">
              <span>{t("no services found")}</span>
            </div>
          ) : (
            services.map((service, i) => (
              <HotelDetailedSearchCard
                onShowOnMap={(id) => focusMapItem(id)}
                key={i}
                {...service}
              />
            ))
          )}
        </SpinnerFallback>
      </div>
    </PaginationWrapper>
  );
};
