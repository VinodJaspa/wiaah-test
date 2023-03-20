import { AdminListTable } from "@blocks";
import { ServiceType } from "@features/API";
import React from "react";
import { useTranslation } from "react-i18next";

export const AccountServiceManagement: React.FC<{
  accountId: string;
}> = () => {
  const { t } = useTranslation();
  const serviceType: ServiceType = ServiceType.Restaurant as ServiceType;
  const title = () => {
    switch (serviceType) {
      case ServiceType.Restaurant:
        return t("Dishs");
      case ServiceType.Hotel:
        return t("Rooms");
      case ServiceType.BeautyCenter:
        return t("Treatments");
      case ServiceType.HealthCenter:
        return t("Doctors");
      case ServiceType.HolidayRentals:
        return t("Rooms");
      case ServiceType.Vehicle:
        return t("Vehicles");
      default:
        break;
    }
  };
  return (
    <AdminListTable data={[]} headers={[]} title={t(title())}></AdminListTable>
  );
};
