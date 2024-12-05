import React from "react";
import type { GetServerSideProps, NextPage } from "next";
import { MasterLayout } from "@components";
import { MarketHealthCenterDetailsView } from "ui";
import { Container, GetServiceDetailsQueryKey } from "ui";
import { ExtractParamFromQuery } from "utils";
import { dehydrate, QueryClient } from "react-query";
import {
  getHealthCenterDetailsFetcher,
  getServiceDetailsDataSwitcher,
  HealthCenter,
  ServicePaymentMethods,
  ServiceStatus,
} from "api";
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
import { ServicePresentationType } from "@features/API";

interface HealthCenterServiceDetailsPageProps {
  data: AsyncReturnType<typeof getHealthCenterDetailsFetcher>;
}

// Placeholder data for fallback
// Corrected placeholder data structure
const placeholderData: AsyncReturnType<typeof getHealthCenterDetailsFetcher> = {
  data: {
    getHealthCenter: {
      __typename: "HealthCenter",
      id: "health-center-id-placeholder",
      ownerId: "owner-id-placeholder",
      vat: 20.0,
      rating: 4.5,
      totalReviews: 100,
      location: {
        __typename: "ServiceLocation",
        address: "123 Main St",
        country: "CountryName",
        state: "StateName",
        city: "CityName",
        lat: 40.7128,
        lon: -74.006,
        postalCode: 10001,
      },
      contact: {
        __typename: "ServiceContact",
        address: "123 Main St",
        country: "CountryName",
        state: "StateName",
        city: "CityName",
        email: "contact@example.com",
        phone: "+123456789",
      },
      status: ServiceStatus.Active,
      presentations: [
        {
          type: ServicePresentationType.Img,
          src: "/shop.jpeg",
        },
      ],
      policies: [],
      serviceMetaInfo: {
        __typename: "ServiceMetaInfo",
        title: "Health Center Placeholder",
        description: "A description for the placeholder health center.",
        metaTagDescription: "Meta tag description placeholder.",
        metaTagKeywords: ["health", "center", "placeholder"],
        hashtags: ["#health", "#wellness"],
      },
      payment_methods: [ServicePaymentMethods.Cash],
      cancelationPolicies: [],
      doctors: [],
      workingHours: {
        __typename: "WorkingSchedule",
        id: "1",
        weekdays: {
          __typename: "WeekdaysWorkingHours",
          mo: {
            __typename: "ServiceDayWorkingHours",
            periods: ["09:00-12:00", "13:00-18:00"],
          },
          tu: {
            __typename: "ServiceDayWorkingHours",
            periods: ["09:00-12:00", "13:00-18:00"],
          },
          we: {
            __typename: "ServiceDayWorkingHours",
            periods: ["09:00-12:00", "13:00-18:00"],
          },
          th: {
            __typename: "ServiceDayWorkingHours",
            periods: ["09:00-12:00", "13:00-18:00"],
          },
          fr: {
            __typename: "ServiceDayWorkingHours",
            periods: ["09:00-12:00", "13:00-18:00"],
          },
          sa: {
            __typename: "ServiceDayWorkingHours",
            periods: ["10:00-14:00"],
          },
        },
      },
    },
  },
};

// Server-side props fetching
export const getServerSideProps: GetServerSideProps<
  ServerSideQueryClientProps<HealthCenterServiceDetailsPageProps>
> = async ({ query }) => {
  const queryClient = new QueryClient();
  const serviceType = "health_center";
  const serviceId = ExtractParamFromQuery(query, "id");

  let data: AsyncReturnType<typeof getHealthCenterDetailsFetcher>;

  try {
    data = (await getServiceDetailsDataSwitcher(
      serviceType,
      serviceId,
    )) as AsyncReturnType<typeof getHealthCenterDetailsFetcher>;

    queryClient.prefetchQuery(
      GetServiceDetailsQueryKey({ serviceType, id: serviceId }),
      () => data,
    );
  } catch (error) {
    console.error("Error fetching service details:", error);
    data = placeholderData;
  }

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      data,
    },
  };
};

const MetaTags: React.FC<{
  data: AsyncReturnType<typeof getHealthCenterDetailsFetcher>;
}> = ({ data }) => {
  const { serviceMetaInfo, presentations, owner } = data.data.getHealthCenter;
  const primaryPresentation = presentations.at(0);

  return (
    <>
      <MetaTitle
        content={`Wiaah | Service Details by ${serviceMetaInfo.title}`}
      />
      <MetaDescription content={serviceMetaInfo.description} />
      {primaryPresentation.type === "vid" ? (
        <MetaVideo content={primaryPresentation.src} />
      ) : (
        <MetaImage content={primaryPresentation.src} />
      )}
      <MetaAuthor author={owner?.firstName} />
      <RequiredSocialMediaTags />
    </>
  );
};

const HealthCenterServiceDetailsPage: NextPage<
  HealthCenterServiceDetailsPageProps
> = ({ data }) => {
  const { getParam } = useRouting();
  const id = getParam("id");

  return (
    <>
      {data && data.data && <MetaTags data={data} />}
      <MasterLayout>
        <Container>
          <MarketHealthCenterDetailsView id={id} />
        </Container>
      </MasterLayout>
    </>
  );
};

export default HealthCenterServiceDetailsPage;
