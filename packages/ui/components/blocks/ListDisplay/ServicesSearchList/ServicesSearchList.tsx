import { FilteredServiceMetaDataType } from "api";
import React from "react";
import { useTranslation } from "react-i18next";
import {
  useGetFilteredServicesMetaDataQuery,
  useSearchFilters,
  ServiceDetailedSearchCard,
  SpinnerFallback,
} from "ui";

export const ServicesSearchList: React.FC = () => {
  const { t } = useTranslation();
  const { filters, getFiltersSearchQuery } = useSearchFilters();
  const [services, setServices] = React.useState<FilteredServiceMetaDataType[]>(
    []
  );
  const { isLoading, isError } = useGetFilteredServicesMetaDataQuery(filters, {
    onSuccess: (data) => setServices(data),
  });
  return (
    <div className="w-full flex flex-col gap-4 justify-center">
      {typeof getFiltersSearchQuery === "string" ? (
        <p className="text-2xl font-bold">
          {services.length} {t("Services were found in")}{" "}
          {getFiltersSearchQuery || ""}
        </p>
      ) : null}
      <SpinnerFallback isLoading={isLoading} isError={isError}>
        {services.length < 1 ? (
          <div className="w-fit h-48 flex just-center items-center text-2xl">
            <span>{t("no services found")}</span>
          </div>
        ) : (
          services.map((service, i) => (
            <ServiceDetailedSearchCard key={i} {...service} />
          ))
        )}
      </SpinnerFallback>
    </div>
  );
};
