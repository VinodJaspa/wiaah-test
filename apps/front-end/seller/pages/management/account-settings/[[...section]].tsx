import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import React from "react";
import { useTranslation } from "react-i18next";
import { dehydrate, QueryClient } from "react-query";
import { SellerLayout } from "ui";
import { AccountSettingsView } from "@components";

interface AccountSettingsPageProps { }

export const getServerSideProps: GetServerSideProps<
  AccountSettingsPageProps
> = async () => {
  const queryClient = new QueryClient();

  // prefecth queries

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

const AccountSettings: NextPage<AccountSettingsPageProps> = ({ }) => {
  const { t } = useTranslation();

  return (
    <>
      <Head>
        <title>{t("Account Settings")}</title>
      </Head>
      <SellerLayout noContainer header={"main"}>
        <AccountSettingsView />
      </SellerLayout>
    </>
  );
};

export default AccountSettings;
