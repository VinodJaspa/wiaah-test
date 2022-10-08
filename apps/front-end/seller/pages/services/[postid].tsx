import { ServicePostView } from "@components";
import Head from "next/head";
import React from "react";
import { useTranslation } from "react-i18next";
import { SellerLayout } from "ui";

const ServicePost = () => {
  const { t } = useTranslation();
  return (
    <>
      <Head>
        <title>{t("Service Post")}</title>
      </Head>
      <SellerLayout>
        <ServicePostView />
      </SellerLayout>
    </>
  );
};

export default ServicePost;
