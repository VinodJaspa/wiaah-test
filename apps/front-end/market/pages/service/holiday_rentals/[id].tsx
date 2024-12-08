import React from "react";
import type { GetServerSideProps, NextPage } from "next";
import { MasterLayout, MetaTags } from "@components";
import { MarketHotelDetailsView, ServiceTypeOfSeller } from "ui";
import { Container, GetServiceDetailsQueryKey } from "ui";
import { ExtractParamFromQuery } from "utils";
import { dehydrate, QueryClient } from "react-query";
import {
  getHotelServiceMetadataQuery,
  ServicePresentationType,
  GetHotelServiceMetaDataQuery,
} from "api";
import { AsyncReturnType, ServerSideQueryClientProps } from "types";
import { useRouting } from "routing";

interface HotelServiceDetailsPageProps {
  data: GetHotelServiceMetaDataQuery | undefined;
}

export const getServerSideProps: GetServerSideProps<
  ServerSideQueryClientProps<HotelServiceDetailsPageProps>
> = async ({ query }) => {
  const queryClient = new QueryClient();

  const serviceId = ExtractParamFromQuery(query, "id");

  if (!serviceId) {
    return {
      notFound: true,
    };
  }

  try {
    const data = await getHotelServiceMetadataQuery(serviceId);

    queryClient.prefetchQuery(
      GetServiceDetailsQueryKey({ serviceType: "hotel", id: serviceId }),
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

const HotelServiceDetailsPage: NextPage<HotelServiceDetailsPageProps> = ({
  data,
}) => {
  const { getParam } = useRouting();
  const id = getParam("id");
  const finaleData = data || mockData;

  const { serviceMetaInfo, owner, presentation } =
    finaleData.data.getHotelMetaData;

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
          <MarketHotelDetailsView id={id || ""} />
        </Container>
      </MasterLayout>
    </>
  );
};

export default HotelServiceDetailsPage;

const mockData: AsyncReturnType<typeof getHotelServiceMetadataQuery> = {
  data: {
    getHotelMetaData: {
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
