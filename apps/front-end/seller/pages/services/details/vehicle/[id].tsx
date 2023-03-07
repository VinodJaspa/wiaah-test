import { GetServerSideProps, NextPage } from "next";
import React from "react";
import {
  getHealthCenterDetailsQueryKey,
  getRestaurantServiceProviderDetailsDataQuerykey,
  getVehicleProviderDetailsQueryKey,
  SellerLayout,
  useGetHealthCenterDetailsQuery,
  useGetVehicleProviderDetailsQuery,
} from "ui";
import { MetaTitle } from "react-seo";
import { useTranslation } from "react-i18next";
import { ServerSideQueryClientProps } from "types";
import { dehydrate, QueryClient } from "react-query";
import {
  getHealthCenterDetailsFetcher,
  getVehicleServiceProviderDetailsFetcher,
} from "api";
import { useRouting } from "routing";
import {
  BeautyCenterServiceDetailsView,
  HealthCenterDetailsView,
  VehicleServiceDetailsView,
} from "@components";

export const getServerSideProps: GetServerSideProps<
  ServerSideQueryClientProps
> = async ({ query }) => {
  const id = query["id"];
  const client = new QueryClient();

  if (id) {
    client.prefetchQuery(getVehicleProviderDetailsQueryKey({ id }), () =>
      getVehicleServiceProviderDetailsFetcher({ id })
    );
  }

  return {
    props: {
      dehydratedState: dehydrate(client),
    },
  };
};

const VehicleServiceDetailsPage: NextPage = () => {
  const { t } = useTranslation();
  const { getParam } = useRouting();
  const id = getParam("id");
  const {
    data: res,
    isLoading,
    isError,
  } = useGetVehicleProviderDetailsQuery({
    id,
  });
  return (
    <>
      <MetaTitle
        content={`${t("Vehicle Details")} | ${
          res ? res?.serviceMetaInfo?.title || "" : ""
        }`}
      />

      <SellerLayout>
        <VehicleServiceDetailsView />
      </SellerLayout>
    </>
  );
};

export default VehicleServiceDetailsPage;
