import React from "react";
import type { GetServerSideProps, NextPage } from "next";
import { MasterLayout, MetaTags } from "@components";
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
import { useRouting } from "routing";

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
        <MetaTags
          metaConfig={{
            title: data.data.getHotelService.serviceMetaInfo.title,
            description: data.data.getHotelService.serviceMetaInfo.description,
            presentation: data.data.getHotelService.presentations[0],
            ownerFirstName: data.data.getHotelService.owner.firstName,
          }}
        />
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
