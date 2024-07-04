import React from "react";
import type { GetServerSideProps, NextPage } from "next";
import { MasterLayout } from "@components";

import { RestaurantDetailsView } from "ui";
import {
  Container,
  GetServiceDetailsQueryKey,
  ServicePresentationCarosuel,
} from "ui";
import { ExtractParamFromQuery } from "utils";
import { dehydrate, QueryClient } from "react-query";
import {
  Restaurant,
  ServicePresentationType,
  getResturantSearchFiltersFetcher,
  getServiceDetailsDataSwitcher,
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
import { useRouting } from "routing";

interface RestaurantServiceDetailsPageProps {
  data: GqlResponse<Restaurant, "getRestaurant">;
}

export const getServerSideProps: GetServerSideProps<
  ServerSideQueryClientProps<RestaurantServiceDetailsPageProps>
> = async ({ query }) => {
  const queryClient = new QueryClient();

  const serviceType = "restaurant";
  const serviceId = ExtractParamFromQuery(query, "id");

  const data = (await getServiceDetailsDataSwitcher(
    serviceType,
    serviceId
  )) as GqlResponse<Restaurant, "getRestaurant">;

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

const RestaurantServiceDetailsPage: NextPage<
  RestaurantServiceDetailsPageProps
> = ({ data }) => {
  const { getParam } = useRouting();
  const id = getParam("id");
  return (
    <>
      {data && data.data ? (
        <>
          <MetaTitle
            content={`Wiaah | Service Details by ${data.data.getRestaurant.name}`}
          />
          <MetaDescription
            content={data.data.getRestaurant.serviceMetaInfo.description}
          />
          {data.data.getRestaurant.presentations.at(0).type ===
            ServicePresentationType.Vid ? (
            <MetaVideo
              content={data.data.getRestaurant.presentations.at(0).src}
            />
          ) : (
            <MetaImage
              content={data.data.getRestaurant.presentations.at(0).src}
            />
          )}
          <MetaAuthor author={data.data.getRestaurant.owner.firstName} />
          <RequiredSocialMediaTags />
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
