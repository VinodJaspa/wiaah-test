import { ServicePostView } from "@components";
import Head from "next/head";
import React from "react";
import { useTranslation } from "react-i18next";
import { useRouting } from "routing";
import { SellerLayout } from "ui";

const ServicePost = () => {
  const { t } = useTranslation();
  const { getParam } = useRouting();

  const id = getParam("postid");
  return (
    <>
      <Head>
        <title>{t("Service Post")}</title>
      </Head>
      <SellerLayout>
        <ServicePostView id={id} />
      </SellerLayout>
    </>
  );
};

export default ServicePost;
