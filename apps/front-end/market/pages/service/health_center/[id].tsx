import React from "react";
import type { GetServerSideProps, NextPage } from "next";
import { MasterLayout } from "@components";
import { MarketHealthCenterDetailsView } from "ui";
import { Container, GetServiceDetailsQueryKey } from "ui";
import { ExtractParamFromQuery } from "utils";
import { dehydrate, QueryClient } from "react-query";
import {
  getHealthCenterServiceMetadataQuery,
  GetHealthCenterServiceMetaDataQuery,
} from "api";
import { AsyncReturnType, ServerSideQueryClientProps } from "types";
import { useRouting } from "routing";
import { ServicePresentationType } from "@features/API";
import { MetaTags } from "components/Wrappers";

interface HealthCenterServiceDetailsPageProps {
  data: GetHealthCenterServiceMetaDataQuery;
}

// Server-side props fetching
export const getServerSideProps: GetServerSideProps<
  ServerSideQueryClientProps<HealthCenterServiceDetailsPageProps>
> = async ({ query }) => {
  const queryClient = new QueryClient();

  const serviceId = ExtractParamFromQuery(query, "id");

  if (!serviceId) {
    return {
      notFound: true,
    };
  }

  try {
    const data = await getHealthCenterServiceMetadataQuery(serviceId);

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

const HealthCenterServiceDetailsPage: NextPage<
  HealthCenterServiceDetailsPageProps
> = ({ data }) => {
  const { getParam } = useRouting();
  const id = getParam("id");

  const finalData = data || mockData; // Use placeholder data if query fails

  const { serviceMetaInfo, presentation, owner } =
    finalData.data.getHealthCenterMetaData;

  return (
    <>
      {finalData && (
        <MetaTags
          metaConfig={{
            title: serviceMetaInfo.title,
            description: serviceMetaInfo.description,
            presentation: presentation,
            ownerFirstName: owner.firstName,
          }}
        />
      )}
      <MasterLayout>
        <Container>
          <MarketHealthCenterDetailsView id={id} />
        </Container>
      </MasterLayout>
    </>
  );
};

export default HealthCenterServiceDetailsPage;

const mockData: AsyncReturnType<typeof getHealthCenterServiceMetadataQuery> = {
  data: {
    getHealthCenterMetaData: {
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
