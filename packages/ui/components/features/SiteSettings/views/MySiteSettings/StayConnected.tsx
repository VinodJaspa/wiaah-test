import { useTranslation } from "react-i18next";

import React from "react";
import { useAdminGetSiteSettings } from "@features/Admin";

const StayConnectedSection: React.FC = () => {
  const { t } = useTranslation();

  const {} = useAdminGetSiteSettings;

  return <></>;
};
