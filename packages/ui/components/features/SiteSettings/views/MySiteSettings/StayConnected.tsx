import { useTranslation } from "react-i18next";

import React from "react";
import { useAdminGetSiteSettings } from "@features/Admin/services/Queries/useGetAdminSiteSettingsQuery";

const StayConnectedSection: React.FC = () => {
const { t }: { t: (key: string, ...args: any[]) => string } = useTranslation();

  const { } = useAdminGetSiteSettings;

  return <></>;
};
