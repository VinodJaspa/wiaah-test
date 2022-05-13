import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import { useTranslation } from "react-i18next";
import { dehydrate, QueryClient } from "react-query";
import { SellerLayout } from "ui";
import { getRouteAfter } from "ui/components/helpers";
import { AccountSettingsView } from "../../components/views/AccountSettings/AccountSettingsView";

interface AccountSettingsPageProps {}

export const getServerSideProps: GetServerSideProps<AccountSettingsPageProps> =
  async () => {
    const queryClient = new QueryClient();

    // prefecth queries

    return {
      props: {
        dehydratedState: dehydrate(queryClient),
      },
    };
  };

const accountSettings: NextPage<AccountSettingsPageProps> = ({}) => {
  const router = useRouter();
  const { t } = useTranslation();
  const [currentRoute, setCurrentRoute] = React.useState("");

  React.useEffect(() => {
    const { section } = router.query;
    const route = Array.isArray(section) ? section[0] : section;
    if (!route || route.length < 2) {
      router.push(`${router.asPath}/account`, null, { shallow: true });
    }
  }, [router]);

  return (
    <>
      <Head>
        <title>{t("account_settings", "Account Settings")}</title>
      </Head>
      <SellerLayout header={null}>
        <AccountSettingsView />
      </SellerLayout>
    </>
  );
};

export default accountSettings;
