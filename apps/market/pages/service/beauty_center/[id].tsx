import React from "react";
import type { GetServerSideProps, NextPage } from "next";
import { BeautyCenterServiceDetailsView, MasterLayout } from "@components";
import { Container, GetServiceDetailsQueryKey } from "ui";
import { ExtractParamFromQuery } from "utils";
import { dehydrate, QueryClient } from "react-query";
import { getServiceDetailsDataSwitcher } from "api";
import { AsyncReturnType, ServerSideQueryClientProps } from "types";
import {
  MetaAuthor,
  MetaDescription,
  MetaImage,
  MetaTitle,
  MetaVideo,
  RequiredSocialMediaTags,
} from "react-seo";

interface BeautyCenterServiceDetailsPageProps {
  data: AsyncReturnType<ReturnType<typeof getServiceDetailsDataSwitcher>>;
}

export const getServerSideProps: GetServerSideProps<
  ServerSideQueryClientProps<BeautyCenterServiceDetailsPageProps>
> = async ({ query }) => {
  const queryClient = new QueryClient();

  const serviceType = "beauty_center";
  const serviceId = ExtractParamFromQuery(query, "id");

  const data = await getServiceDetailsDataSwitcher(serviceType)({
    id: serviceId,
  });

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

const BeautyCenterServiceDetailsPage: NextPage<
  BeautyCenterServiceDetailsPageProps
> = ({ data }) => {
  return (
    <>
      {data && data.data ? (
        <>
          <MetaTitle content={`Wiaah | Service Details by ${data.data.name}`} />
          <MetaDescription content={data.data.description} />
          {data.data.presintations.at(0).type === "video" ? (
            <MetaVideo content={data.data.presintations.at(0).src} />
          ) : (
            <MetaImage content={data.data.presintations.at(0).src} />
          )}
          <MetaAuthor author={data.data.name} />
          <RequiredSocialMediaTags />
        </>
      ) : null}
      <MasterLayout>
        <Container>
          <BeautyCenterServiceDetailsView />
        </Container>
      </MasterLayout>
    </>
  );
};

export default BeautyCenterServiceDetailsPage;
