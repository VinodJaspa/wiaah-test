import React from "react";
import type { GetServerSideProps, NextPage } from "next";
import { HealthCenterDetailsView, MasterLayout } from "@components";
import { Container, GetServiceDetailsQueryKey } from "ui";
import { ExtractParamFromQuery } from "utils";
import { dehydrate, QueryClient } from "react-query";
import {
  getHealthCenterDetailsFetcher,
  getServiceDetailsDataSwitcher,
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
import { useRouting } from "routing";

interface HealthCenterServiceDetailsPageProps {
  data: AsyncReturnType<typeof getHealthCenterDetailsFetcher>;
}

export const getServerSideProps: GetServerSideProps<
  ServerSideQueryClientProps<HealthCenterServiceDetailsPageProps>
> = async ({ query }) => {
  const queryClient = new QueryClient();

  const serviceType = "health_center";
  const serviceId = ExtractParamFromQuery(query, "id");

  const data = (await getServiceDetailsDataSwitcher(
    serviceType,
    serviceId
  )) as AsyncReturnType<typeof getHealthCenterDetailsFetcher>;

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

const HealthCenterServiceDetailsPage: NextPage<
  HealthCenterServiceDetailsPageProps
> = ({ data }) => {
  const { getParam } = useRouting();
  const id = getParam("id");
  return (
    <>
      {data && data.data ? (
        <>
          <MetaTitle
            content={`Wiaah | Service Details by ${data.data.getHealthCenter.serviceMetaInfo.title}`}
          />
          <MetaDescription
            content={data.data.getHealthCenter.serviceMetaInfo.description}
          />
          {data.data.getHealthCenter.presentations.at(0).type === "vid" ? (
            <MetaVideo
              content={data.data.getHealthCenter.presentations.at(0).src}
            />
          ) : (
            <MetaImage
              content={data.data.getHealthCenter.presentations.at(0).src}
            />
          )}
          <MetaAuthor author={data.data.getHealthCenter.owner?.firstName} />
          <RequiredSocialMediaTags />
        </>
      ) : null}
      <MasterLayout>
        <Container>
          <HealthCenterDetailsView id={id} />
        </Container>
      </MasterLayout>
    </>
  );
};

export default HealthCenterServiceDetailsPage;
