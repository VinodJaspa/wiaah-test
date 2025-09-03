import React from "react";
import SavedCollections from "@features/Saved/components/sections/SavedPostsSection/SavedPostsSection";
import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { useTranslation } from "react-i18next";
import { dehydrate, QueryClient } from "react-query";
import { ServerSideQueryClientProps } from "types";
import { SellerLayout } from "ui";
import SavedCollectionsPage from "@features/Saved/components/sections/SavedPostsSection/SavedCollectionsPage";

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
        <title>{t("Saved ")}</title>
      </Head>
      <SellerLayout header={"main"}>
        <SavedCollectionsPage/>
      </SellerLayout>
    </>
  );
};

export default Saved;
