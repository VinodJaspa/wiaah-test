import React from "react";
import type { GetServerSideProps, NextPage } from "next";
import { MasterLayout, VehicleServiceDetailsView } from "@components";
import { Container, GetServiceDetailsQueryKey } from "ui";
import { ExtractParamFromQuery } from "utils";
import { dehydrate, QueryClient } from "react-query";
import {
  getServiceDetailsDataSwitcher,
  getVehicleSearchDataFetcher,
  getVehicleServiceProviderDetailsFetcher,
} from "api";
import { AsyncReturnType, ServerSideQueryClientProps } from "types";
import {
  MetaAuthor,
  MetaDescription,
  MetaImage,
  MetaTitle,
  MetaVideo,
  RequiredSocialMediaTags,
} from "react-seo";

interface VehicleServiceDetailsPageProps {
  data: AsyncReturnType<typeof getVehicleServiceProviderDetailsFetcher>;
}

export const getServerSideProps: GetServerSideProps<
  ServerSideQueryClientProps<VehicleServiceDetailsPageProps>
> = async ({ query }) => {
  const queryClient = new QueryClient();

  const serviceType = "vehicle";
  const serviceId = ExtractParamFromQuery(query, "id");

  const data = {};

  // queryClient.prefetchQuery(
  //   GetServiceDetailsQueryKey({ serviceType, id: serviceId }),
  //   () => data
  // );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      data,
    },
  };
};

const VehicleServiceDetailsPage: NextPage<VehicleServiceDetailsPageProps> = ({
  data,
}) => {
  return (
    <>
      {/* {data && data ? (
        <>
          <MetaTitle
            content={`Wiaah | Service Details by ${data.serviceMetaInfo.title}`}
          />
          <MetaDescription content={data.serviceMetaInfo.description} />
          {data.presentations.at(0).type === "vid" ? (
            <MetaVideo content={data.presentations.at(0).src} />
          ) : (
            <MetaImage content={data.presentations.at(0).src} />
          )}
          <MetaAuthor author={data.owner.name} />
          <RequiredSocialMediaTags />
        </>
      ) : null} */}
      <MasterLayout>
        <Container>
          <VehicleServiceDetailsView />
        </Container>
      </MasterLayout>
    </>
  );
};

export default VehicleServiceDetailsPage;
