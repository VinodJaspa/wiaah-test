import { NextPage } from "next";
import Head from "next/head";
import { useTranslation } from "react-i18next";
import { SellerLayout } from "ui";
import { ServiceManagementView } from "../../components";

const serviceManagement: NextPage = () => {
  const { t } = useTranslation();

  return (
    <>
      <Head>
        <title>{t("account_settings", "Account Settings")}</title>
      </Head>
      <SellerLayout noContainer>
        <ServiceManagementView />
      </SellerLayout>
    </>
  );
};

export default serviceManagement;
