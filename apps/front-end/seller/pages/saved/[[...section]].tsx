import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import React from "react";
import { useTranslation } from "react-i18next";
import { dehydrate, QueryClient } from "react-query";
import { SavedView, SellerLayout } from "ui";
import { ServerSideQueryClientProps } from "types";

export const getServerSideProps: GetServerSideProps<
  ServerSideQueryClientProps
> = async () => {
  const queryClient = new QueryClient();

  // prefecth queries

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

const Saved: NextPage = () => {
  const { t } = useTranslation();

  return (
    <>
      <Head>
        <title>{t("Saved")}</title>
      </Head>
      <SellerLayout noContainer header={"main"}>
        <SavedView />
      </SellerLayout>
    </>
  );
};

export default Saved;
