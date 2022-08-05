import React from "react";
import { useTranslation } from "react-i18next";
import { useRouting } from "routing";
import {
  Button,
  useGetServicesProviderQuery,
  useSearchFilters,
  BookedServicesCostDetails,
  GuestsInput,
  CheckInOutInput,
} from "ui";

export const ServiceReservastion: React.FC = () => {
  const { visit } = useRouting();

  const { filters } = useSearchFilters();
  const {
    data: res,
    isError,
    isLoading,
  } = useGetServicesProviderQuery(filters);

  const { t } = useTranslation();

  return (
    <div className="p-4 bg-white rounded-lg gap-16 shadow h-full justify-between border-[1px] flex flex-col border-gray-300">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col rounded-lg border-2 border-gray-300">
          <CheckInOutInput />
          <GuestsInput />
        </div>
        <Button className="py-4 ">{t("Book now")}</Button>
      </div>
      <BookedServicesCostDetails title="Rooms" vat={res?.data.vat || 0} />
    </div>
  );
};
