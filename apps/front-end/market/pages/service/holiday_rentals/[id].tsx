import React from "react";
import type { GetServerSideProps, NextPage } from "next";
import { MasterLayout } from "@components";
import { HotelDetailsView } from "ui";
import { Container, GetServiceDetailsQueryKey } from "ui";
import { ExtractParamFromQuery } from "utils";
import { dehydrate, QueryClient } from "react-query";
import {
  Hotel,
  ServicePresentationType,
  getServiceDetailsDataSwitcher,
} from "api";
import {
  AsyncReturnType,
  GqlResponse,
  ServerSideQueryClientProps,
  ServicesType,
} from "types";
import {
  MetaAuthor,
  MetaDescription,
  MetaImage,
  MetaTitle,
  MetaVideo,
  RequiredSocialMediaTags,
} from "react-seo";

interface HotelServiceDetailsPageProps {
  data: GqlResponse<Hotel, "getHotelService">;
}

export const getServerSideProps: GetServerSideProps<
  ServerSideQueryClientProps<HotelServiceDetailsPageProps>
> = async ({ query }) => {
  const queryClient = new QueryClient();

  const serviceType: ServicesType = "holidays_rentals";
  const serviceId = ExtractParamFromQuery(query, "id");

  const data = (await getServiceDetailsDataSwitcher(
    serviceType,
    serviceId
  )) as GqlResponse<Hotel, "getHotelService">;

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
  return (
    <>
      {data && data.data ? (
        <>
          <MetaTitle
            content={`Wiaah | Service Details by ${data.data.getHotelService.owner.firstName}`}
          />
          <MetaDescription
            content={data.data.getHotelService.serviceMetaInfo.description}
          />
          {data.data.getHotelService.presentations.at(0).type ===
            ServicePresentationType.Vid ? (
            <MetaVideo
              content={data.data.getHotelService.presentations.at(0).src}
            />
          ) : (
            <MetaImage
              content={data.data.getHotelService.presentations.at(0).src}
            />
          )}
          <MetaAuthor author={data.data.getHotelService.owner.firstName} />
          <RequiredSocialMediaTags />
        </>
      ) : null}
      <MasterLayout>
        <Container>
          <HotelDetailsView id={""} />
        </Container>
      </MasterLayout>
    </>
  );
};

export default HotelServiceDetailsPage;
