import { useResponsive } from "hooks";
import { NextPage } from "next";
import Head from "next/head";
import { useTranslation } from "react-i18next";
import { SellerLayout } from "ui";
import { ServiceManagementView } from "../../components/views/ServiceManagement/ServiceManagementView";

const serviceManagement: NextPage = () => {
  const { t } = useTranslation();
  const { isMobile } = useResponsive();
  return (
    <>
      <Head>
        <title>{t("account_settings", "Account Settings")}</title>
      </Head>
      <SellerLayout noContainer header={isMobile ? null : "main"}>
        <ServiceManagementView />
      </SellerLayout>
    </>
  );
};

export default serviceManagement;
