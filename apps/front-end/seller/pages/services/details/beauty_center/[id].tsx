import { GetServerSideProps, NextPage } from "next";
import React from "react";
import {
  getBeautyCenterDetailsDataQueryKey,
  SellerLayout,
  useGetBeautyCenterDetailsQuery,
  useGetHealthCenterDetailsQuery,
} from "ui";
import { MetaTitle } from "react-seo";
import { useTranslation } from "react-i18next";
import { ServerSideQueryClientProps } from "types";
import { dehydrate, QueryClient } from "react-query";
import { getBeautyCenterDetailsDataFetcher } from "api";
import { useRouting } from "routing";
import { BeautyCenterServiceDetailsView } from "@components";
import { ExtractParamFromQuery } from "utils";

export const getServerSideProps: GetServerSideProps<
  ServerSideQueryClientProps
> = async ({ query }) => {
  const id = ExtractParamFromQuery(query, "id");
  const client = new QueryClient();

  if (id) {
    client.prefetchQuery(getBeautyCenterDetailsDataQueryKey({ id }), () =>
      getBeautyCenterDetailsDataFetcher({ id })
    );
  }

  return {
    props: {
      dehydratedState: dehydrate(client),
    },
  };
};

const RestaurantServiceDetailsPage: NextPage = () => {
  const { t } = useTranslation();
  const { getParam } = useRouting();
  const id = getParam("id");
  const { data: res, isLoading, isError } = useGetBeautyCenterDetailsQuery(id);
  return (
    <>
      <MetaTitle
        content={`${t("Beauty Center Details")} | ${
          res ? res?.serviceMetaInfo?.title || "" : ""
        }`}
      />

      <SellerLayout>
        <BeautyCenterServiceDetailsView />
      </SellerLayout>
    </>
  );
};

export default RestaurantServiceDetailsPage;
