import React from "react";
import type { GetServerSideProps, NextPage } from "next";
import { MasterLayout, MetaTags } from "@components";
import { MarketVehicleServiceDetailsView } from "ui";
import { Container, GetServiceDetailsQueryKey } from "ui";
import { ExtractParamFromQuery } from "utils";
import { dehydrate, QueryClient } from "react-query";
import {
  GetVehicleServiceMetaDataQuery,
  getVehicleServiceMetadataQuery,
  ServicePresentationType,
  VehicleService,
} from "api";
import {
  AsyncReturnType,
  GqlResponse,
  ServerSideQueryClientProps,
} from "types";

interface VehicleServiceDetailsPageProps {
  data: GetVehicleServiceMetaDataQuery;
}

export const getServerSideProps: GetServerSideProps<
  ServerSideQueryClientProps<VehicleServiceDetailsPageProps>
> = async ({ query }) => {
  const queryClient = new QueryClient();

  const serviceId = ExtractParamFromQuery(query, "id");

  if (!serviceId) {
    return {
      notFound: true,
    };
  }

  try {
    const data = await getVehicleServiceMetadataQuery(serviceId);

    queryClient.prefetchQuery(
      GetServiceDetailsQueryKey({ serviceType: "vehicle", id: serviceId }),
      () => data,
    );

    return {
      props: {
        dehydratedState: dehydrate(queryClient),
        data,
      },
    };
  } catch (error) {
    console.error("Error in getServerSideProps:", error);

    return {
      props: {
        dehydratedState: dehydrate(queryClient),
        data: null, // Provide a fallback
      },
    };
  }
};

const VehicleServiceDetailsPage: NextPage<VehicleServiceDetailsPageProps> = ({
  data,
}) => {
  const finaleData = data || mockData;
  const { serviceMetaInfo, owner, presentation } =
    finaleData.data.getVehicleMetaData;
  return (
    <>
      {finaleData && finaleData.data ? (
        <MetaTags
          metaConfig={{
            title: serviceMetaInfo.title,
            description: serviceMetaInfo.description,
            presentation: presentation,
            ownerFirstName: owner.firstName,
          }}
        />
      ) : null}
      <MasterLayout>
        <Container>
          <MarketVehicleServiceDetailsView />
        </Container>
      </MasterLayout>
    </>
  );
};

export default VehicleServiceDetailsPage;

const mockData: AsyncReturnType<typeof getVehicleServiceMetadataQuery> = {
  data: {
    getVehicleMetaData: {
      presentation: { src: "/shop.jpeg", type: ServicePresentationType.Img },
      serviceMetaInfo: {
        title: "Placeholder Service",
        description: "Description of the placeholder service.",
        metaTagDescription: "Meta tag description for placeholder.",
        metaTagKeywords: ["placeholder", "beauty", "center"],
        hashtags: ["#beauty", "#placeholder"],
      },
      owner: {
        id: "4",
        firstName: "firstName",
      },
    },
  },
};
