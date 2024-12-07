import React from "react";
import type { GetServerSideProps, NextPage } from "next";
import { MasterLayout, MetaTags } from "@components";
import { MarketRestaurantDetailsView } from "ui";
import { Container, GetServiceDetailsQueryKey } from "ui";
import { ExtractParamFromQuery } from "utils";
import { dehydrate, QueryClient } from "react-query";
import {
  Restaurant,
  ServicePresentationType,
  getServiceDetailsDataSwitcher,
  getRestaurantServiceMetadataQuery,
  GetRestaurantServiceMetaDataQuery,
} from "api";
import {
  AsyncReturnType,
  GqlResponse,
  ServerSideQueryClientProps,
} from "types";
import { useRouting } from "routing";

interface RestaurantServiceDetailsPageProps {
  data: GetRestaurantServiceMetaDataQuery;
}

export const getServerSideProps: GetServerSideProps<
  ServerSideQueryClientProps<RestaurantServiceDetailsPageProps>
> = async ({ query }) => {
  const queryClient = new QueryClient();

  const serviceId = ExtractParamFromQuery(query, "id");

  if (!serviceId) {
    return {
      notFound: true,
    };
  }
  try {
    const data = await getRestaurantServiceMetadataQuery(serviceId);

    queryClient.prefetchQuery(
      GetServiceDetailsQueryKey({ serviceType: "restaurant", id: serviceId }),
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

const RestaurantServiceDetailsPage: NextPage<
  RestaurantServiceDetailsPageProps
> = ({ data }) => {
  const { getParam } = useRouting();
  const id = getParam("id");
  const finaleData = data || mockData;
  const { owner, serviceMetaInfo, presentation } =
    finaleData.data.getRestaurantMetaData;
  return (
    <>
      {data && data.data ? (
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
          <MarketRestaurantDetailsView id={id} />
        </Container>
      </MasterLayout>
    </>
  );
};

export default RestaurantServiceDetailsPage;

const mockData: AsyncReturnType<typeof getRestaurantServiceMetadataQuery> = {
  data: {
    getRestaurantMetaData: {
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
