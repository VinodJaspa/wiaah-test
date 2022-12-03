import { GetServerSideProps, NextPage } from "next";
import React from "react";
import {
  getHealthCenterDetailsQueryKey,
  getRestaurantServiceProviderDetailsDataQuerykey,
  SellerLayout,
  useGetHealthCenterDetailsQuery,
} from "ui";
import { MetaTitle } from "react-seo";
import { useTranslation } from "react-i18next";
import { ServerSideQueryClientProps } from "types";
import { dehydrate, QueryClient } from "react-query";
import { getHealthCenterDetailsFetcher } from "api";
import { useRouting } from "routing";
import { HealthCenterDetailsView } from "@components";

export const getServerSideProps: GetServerSideProps<
  ServerSideQueryClientProps
> = async ({ query }) => {
  const id = query["id"];
  const client = new QueryClient();

  if (id) {
    client.prefetchQuery(getHealthCenterDetailsQueryKey({ id }), () =>
      getHealthCenterDetailsFetcher({ id })
    );
  }

  return {
    props: {
      dehydratedState: dehydrate(client),
    },
  };
};

const HealthCenterServiceDetailsPage: NextPage = () => {
  const { t } = useTranslation();
  const { getParam } = useRouting();
  const id = getParam("id");
  const {
    data: res,
    isLoading,
    isError,
  } = useGetHealthCenterDetailsQuery({
    id,
  });
  return (
    <>
      <MetaTitle
        content={`${t("Beauty Center Details")} | ${
          res ? res.data.name || "" : ""
        }`}
      />

      <SellerLayout>
        <HealthCenterDetailsView />
      </SellerLayout>
    </>
  );
};

export default HealthCenterServiceDetailsPage;
