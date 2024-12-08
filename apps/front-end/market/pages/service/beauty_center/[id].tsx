import React from "react";
import type { GetServerSideProps, NextPage } from "next";
import { MasterLayout, MetaTags } from "@components";
import { MarketBeautyCenterServiceDetailsView, ServiceTypeCard } from "ui";
import { Container, GetServiceDetailsQueryKey } from "ui";
import { ExtractParamFromQuery } from "utils";
import { dehydrate, QueryClient } from "react-query";
import {
  GetBeautyCenterServiceMetaDataQuery,
  getBeautyCenterServiceMetadataQuery,
  ServicePresentationType,
} from "api";
import { AsyncReturnType, ServerSideQueryClientProps } from "types";
import { useRouting } from "routing";

interface BeautyCenterServiceDetailsPageProps {
  data: GetBeautyCenterServiceMetaDataQuery;
}

export const getServerSideProps: GetServerSideProps<
  ServerSideQueryClientProps<BeautyCenterServiceDetailsPageProps>
> = async ({ query }) => {
  const queryClient = new QueryClient();

  const serviceId = ExtractParamFromQuery(query, "id");

  if (!serviceId) {
    return {
      notFound: true,
    };
  }

  try {
    const data = await getBeautyCenterServiceMetadataQuery(serviceId);

    queryClient.prefetchQuery(
      GetServiceDetailsQueryKey({
        serviceType: "beauty_center",
        id: serviceId,
      }),
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
const BeautyCenterServiceDetailsPage: NextPage<
  BeautyCenterServiceDetailsPageProps
> = ({ data }) => {
  const { getParam } = useRouting();
  const id = getParam("id");
  const finalData = data || mockData; // Use placeholder data if query fails

  const { serviceMetaInfo, presentation, owner } =
    finalData.data.getBeautyCenterMetaData;

  return (
    <>
      <MetaTags
        metaConfig={{
          title: serviceMetaInfo.title,
          description: serviceMetaInfo.description,
          presentation: presentation,
          ownerFirstName: owner.firstName || "no_name",
        }}
      />
      <MasterLayout>
        <Container>
          <MarketBeautyCenterServiceDetailsView id={id} />
        </Container>
      </MasterLayout>
    </>
  );
};

export default BeautyCenterServiceDetailsPage;

const mockData: AsyncReturnType<typeof getBeautyCenterServiceMetadataQuery> = {
  data: {
    getBeautyCenterMetaData: {
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
