import { FilteredHotelsMetaDataType } from "api";
import { usePagination, useResponsive } from "hooks";
import React from "react";
import { useTranslation } from "react-i18next";
import { useMutateFocusedMapItemId } from "ui";
import {
  useGetFilteredServicesMetaDataQuery,
  DisplayFoundServices,
  HotelDetailedSearchCard,
  SpinnerFallback,
  PaginationWrapper,
} from "ui";

export interface HotelsSearchListProps {
  sorting?: boolean;
  horizontal?: boolean;
}

export const HotelsSearchList: React.FC<HotelsSearchListProps> = ({
  sorting,
  horizontal,
}) => {
  const { focusMapItem } = useMutateFocusedMapItemId();
  const { page, take } = usePagination();
  const { t } = useTranslation();

  let filters = {};
  let getLocationFilterQuery = "";
  const [services, setServices] = React.useState<FilteredHotelsMetaDataType[]>(
    []
  );
  const { isTablet } = useResponsive();

  const {
    data: res,
    isLoading,
    isError,
  } = useGetFilteredServicesMetaDataQuery({ page, take }, filters, {
    onSuccess: (res) => setServices(res.data),
  });

  return horizontal ? (
    <div className="w-fit flex gap-4 justify-center">
      <SpinnerFallback isLoading={isLoading} isError={isError}>
        {services.length < 1 ? (
          <div className="w-fit h-48 flex just-center items-center text-2xl">
            <span>{t("no services found")}</span>
          </div>
        ) : (
          services.map((service, i) => (
            <div className="w-56">
              <HotelDetailedSearchCard
                vertical
                minimal
                onShowOnMap={(id) => focusMapItem(id)}
                key={i}
                {...service}
              />
            </div>
          ))
        )}
      </SpinnerFallback>
    </div>
  ) : (
    <PaginationWrapper>
      <div className="w-full flex flex-col gap-4 justify-center">
        <DisplayFoundServices
          location={getLocationFilterQuery || ""}
          servicesNum={res?.total || 0}
        />
        <SpinnerFallback isLoading={isLoading} isError={isError}>
          {services.length < 1 ? (
            <div className="w-fit h-48 flex just-center items-center text-2xl">
              <span>{t("no services found")}</span>
            </div>
          ) : (
            services.map((service, i) => (
              <HotelDetailedSearchCard
                vertical={isTablet}
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
