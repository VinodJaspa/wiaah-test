import React from "react";
import type { GetServerSideProps, NextPage } from "next";
import { MasterLayout, RestaurantDetailsView } from "@components";
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
import { useRouting } from "routing";

interface HotelServiceDetailsPageProps {
  data: AsyncReturnType<ReturnType<typeof getServiceDetailsDataSwitcher>>;
}

export const getServerSideProps: GetServerSideProps<
  ServerSideQueryClientProps<HotelServiceDetailsPageProps>
> = async ({ query }) => {
  const queryClient = new QueryClient();

  const serviceType = "restaurant";
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

const RestaurantServiceDetailsPage: NextPage<HotelServiceDetailsPageProps> = ({
  data,
}) => {
  const { getParam } = useRouting();
  const id = getParam("id");
  return (
    <>
      {data && data.data ? (
        <>
          {/* <MetaTitle content={`Wiaah | Service Details by ${data.data.name}`} />
          <MetaDescription content={data.data.description} />
          {data.data.presintations.at(0).type === "video" ? (
            <MetaVideo content={data.data.presintations.at(0).src} />
          ) : (
            <MetaImage content={data.data.presintations.at(0).src} />
          )}
          <MetaAuthor author={data.data.name} />
          <RequiredSocialMediaTags /> */}
        </>
      ) : null}
      <MasterLayout>
        <Container>
          <RestaurantDetailsView id={id} />
        </Container>
      </MasterLayout>
    </>
  );
};

export default RestaurantServiceDetailsPage;
