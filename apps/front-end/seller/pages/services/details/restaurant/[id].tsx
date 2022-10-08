import { GetServerSideProps, NextPage } from "next";
import React from "react";
import {
  getRestaurantServiceProviderDetailsDataQuerykey,
  SellerLayout,
  useGetRestaurantServiceDetailsDataQuery,
} from "ui";
import { MetaTitle } from "react-seo";
import { useTranslation } from "react-i18next";
import { ServerSideQueryClientProps } from "types";
import { dehydrate, QueryClient } from "react-query";
import { getResturantServiceDetialsData } from "api";
import { useRouting } from "routing";
import { RestaurantDetailsView } from "@components";

export const getServerSideProps: GetServerSideProps<
  ServerSideQueryClientProps
> = async ({ query }) => {
  const id = query["id"];
  const client = new QueryClient();

  if (id) {
    client.prefetchQuery(
      getRestaurantServiceProviderDetailsDataQuerykey({ id }),
      () => getResturantServiceDetialsData({ id })
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
  const {
    data: res,
    isLoading,
    isError,
  } = useGetRestaurantServiceDetailsDataQuery({
    id,
  });
  return (
    <>
      <MetaTitle
        content={`${t("Restaurant Details")} | ${
          res ? res.data.name || "" : ""
        }`}
      />

      <SellerLayout>
        <RestaurantDetailsView />
      </SellerLayout>
    </>
  );
};

export default RestaurantServiceDetailsPage;
