import React from "react";
import type { GetServerSideProps, NextPage } from "next";
import { MasterLayout } from "@components";
import { VehicleServiceDetailsView } from "ui";
import { Container, GetServiceDetailsQueryKey } from "ui";
import { ExtractParamFromQuery } from "utils";
import { dehydrate, QueryClient } from "react-query";
import {
  ServicePresentationType,
  Vehicle,
  VehicleService,
  getServiceDetailsDataSwitcher,
  getVehicleSearchDataFetcher,
  getVehicleServiceProviderDetailsFetcher,
} from "api";
import {
  AsyncReturnType,
  GqlResponse,
  ServerSideQueryClientProps,
} from "types";
import {
  MetaAuthor,
  MetaDescription,
  MetaImage,
  MetaTitle,
  MetaVideo,
  RequiredSocialMediaTags,
} from "react-seo";

interface VehicleServiceDetailsPageProps {
  data: GqlResponse<VehicleService, "getVehicleService">;
}

export const getServerSideProps: GetServerSideProps<
  ServerSideQueryClientProps<VehicleServiceDetailsPageProps>
> = async ({ query }) => {
  const queryClient = new QueryClient();

  const serviceType = "vehicle";
  const serviceId = ExtractParamFromQuery(query, "id");

  const data = (await getServiceDetailsDataSwitcher(
    serviceType,
    serviceId
  )) as GqlResponse<VehicleService, "getVehicleService">;

  queryClient.prefetchQuery(
    GetServiceDetailsQueryKey({ serviceType, id: serviceId }),
    () => data
  );

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
      {data && data ? (
        <>
          <MetaTitle
            content={`Wiaah | Service Details by ${data.data.getVehicleService.owner.firstName}`}
          />
          <MetaDescription
            content={data.data.getVehicleService.serviceMetaInfo.description}
          />
          {data.data.getVehicleService.presentations.at(0).type ===
            ServicePresentationType.Vid ? (
            <MetaVideo
              content={data.data.getVehicleService.presentations.at(0).src}
            />
          ) : (
            <MetaImage
              content={data.data.getVehicleService.presentations.at(0).src}
            />
          )}
          <MetaAuthor author={data.data.getVehicleService.owner.firstName} />
          <RequiredSocialMediaTags />
        </>
      ) : null}
      <MasterLayout>
        <Container>
          <VehicleServiceDetailsView />
        </Container>
      </MasterLayout>
    </>
  );
};

export default VehicleServiceDetailsPage;
