import { NextPage } from "next";
import React from "react";
import Head from "next/head";
import { HotelsSearchResaultsView, MasterLayout } from "@components";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";
import {
  ExtractServiceTypeFromQuery,
  getServiceView,
  ServicesTypeSwitcher,
} from "utils";
import { ServicesViewsList } from "lib";
import { NotFound } from "ui";
const filtered: NextPage = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const serviceType = ExtractServiceTypeFromQuery(router.query);

  return (
    <>
      <Head>
        <title>
          {t("Service Search")} | {router.query.location || ""}
        </title>
      </Head>
      <MasterLayout>
        <ServicesTypeSwitcher
          serviceType={serviceType}
          get={getServiceView.RESAULTS}
          fallbackComponent={NotFound}
          servicesList={ServicesViewsList}
        />
      </MasterLayout>
    </>
  );
};

export default filtered;
