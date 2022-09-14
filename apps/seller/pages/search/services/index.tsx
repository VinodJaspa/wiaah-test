import { ServicesSearchView } from "@components";
import { NextPage } from "next";
import React from "react";
import { useTranslation } from "react-i18next";
import { MetaTitle } from "react-seo";
import { SellerLayout } from "ui";

const SearchServicesPage: NextPage = () => {
  const { t } = useTranslation();
  return (
    <>
      <MetaTitle content={t("Service search")} />
      <SellerLayout>
        <ServicesSearchView />
      </SellerLayout>
    </>
  );
};

export default SearchServicesPage;
