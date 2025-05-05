import { useResponsive } from "hooks";
import { NextPage } from "next";
import { MetaTitle } from "react-seo";
import { SellerLayout } from "ui";
import { ServiceManagementView } from "@components";
import { useTranslation } from "react-i18next";
import React from "react";
const ServiceManagement: NextPage = () => {
const { t } = useTranslation();
  const { isMobile } = useResponsive();
  return (
    <>
      <MetaTitle content={t(`Wiaah | Service management`)} />
      <SellerLayout noContainer header={isMobile ? null : "main"}>
        <ServiceManagementView />
      </SellerLayout>
    </>
  );
};

export default ServiceManagement;
