import React from "react";
import type { GetServerSideProps, NextPage } from "next";
import { MasterLayout } from "@components";
import { MarketHotelDetailsView } from "ui";
import { Container, GetServiceDetailsQueryKey } from "ui";
import { ExtractParamFromQuery, ExtractServiceTypeFromQuery } from "utils";
import { useRouter } from "next/router";
import { dehydrate, QueryClient } from "react-query";
import { Hotel, getServiceDetailsDataSwitcher } from "api";
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
import { ServicePresentationType } from "@features/API";

interface HotelServiceDetailsPageProps {
  data: AsyncReturnType<typeof getServiceDetailsDataSwitcher>;
}

export const getServerSideProps: GetServerSideProps<
  ServerSideQueryClientProps<HotelServiceDetailsPageProps>
> = async ({ query }) => {
  const queryClient = new QueryClient();

  const serviceType = "hotel";
  const serviceId = ExtractParamFromQuery(query, "id");

  const data = (await getServiceDetailsDataSwitcher(
    serviceType,
    serviceId,
  )) as GqlResponse<Hotel, "getHotelService">;

  queryClient.prefetchQuery(
    GetServiceDetailsQueryKey({ serviceType, id: serviceId }),
    () => data,
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      data: data as GqlResponse<Hotel, "getHotelService">,
    },
  };
};

const HotelServiceDetailsPage: NextPage<HotelServiceDetailsPageProps> = ({
  data,
}: {
  data: GqlResponse<Hotel, "getHotelService">;
}) => {
  const { getParam } = useRouting();
  const router = useRouter();
  const id = getParam("id");
  const serviceType = ExtractServiceTypeFromQuery(router.query);

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
          <MarketHotelDetailsView id={id || ""} />
        </Container>
      </MasterLayout>
    </>
  );
};

export default HotelServiceDetailsPage;
