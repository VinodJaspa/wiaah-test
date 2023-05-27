import { MySiteSettingsView } from "@UI";
import { SellerLayout } from "@blocks";
import { AccountSettingsView } from "@components";
import Head from "next/head";
import React from "react";
import { useTranslation } from "react-i18next";

const SiteSettings = () => {
  const { t } = useTranslation();

  return (
    <>
      <Head>
        <title>{t("Site Settings")}</title>
      </Head>
      <SellerLayout noContainer header={"main"}>
        <MySiteSettingsView />
      </SellerLayout>
    </>
  );
};

export default SiteSettings;
