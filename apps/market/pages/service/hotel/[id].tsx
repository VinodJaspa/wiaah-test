import React from "react";
import type { GetServerSideProps, NextPage } from "next";
import { HotelDetailsView, MasterLayout } from "@components";
import { Container, GetServiceDetailsQueryKey } from "ui";
import { ExtractParamFromQuery, ExtractServiceTypeFromQuery } from "utils";
import { useRouter } from "next/router";
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

interface HotelServiceDetailsPageProps {
  data: AsyncReturnType<ReturnType<typeof getServiceDetailsDataSwitcher>>;
}

export const getServerSideProps: GetServerSideProps<
  ServerSideQueryClientProps<HotelServiceDetailsPageProps>
> = async ({ query }) => {
  const queryClient = new QueryClient();

  const serviceType = "hotel";
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

const HotelServiceDetailsPage: NextPage<HotelServiceDetailsPageProps> = ({
  data,
}) => {
  const router = useRouter();
  const serviceType = ExtractServiceTypeFromQuery(router.query);

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
          <HotelDetailsView />
        </Container>
      </MasterLayout>
    </>
  );
};

export default HotelServiceDetailsPage;
