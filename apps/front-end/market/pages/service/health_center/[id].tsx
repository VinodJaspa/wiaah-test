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
  ServicePaymentMethods,
  ServiceStatus,
} from "api";
import { AsyncReturnType, ServerSideQueryClientProps } from "types";
import { useRouting } from "routing";
import { ServicePresentationType } from "@features/API";
import { MetaTags } from "components/Wrappers";

interface HealthCenterServiceDetailsPageProps {
  data: AsyncReturnType<typeof getHealthCenterDetailsFetcher>;
}

const placeholderData: AsyncReturnType<typeof getHealthCenterDetailsFetcher> = {
  data: {
    getHealthCenter: {
      __typename: "HealthCenter",
      id: "health-center-id-placeholder",
      ownerId: "owner-id-placeholder",
      owner: {
        firstName: "owner_firstName",
        lastName: "owner_lastName",
        verified: true,
        email: "owner_email",
        photo: "/shop.jpeg",
        id: "2",
      },
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
  }

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      data,
    },
  };
};

const HealthCenterServiceDetailsPage: NextPage<
  HealthCenterServiceDetailsPageProps
> = ({ data }) => {
  const { getParam } = useRouting();
  const id = getParam("id");

  const finalData = data || placeholderData; // Use placeholder data if query fails

  const { serviceMetaInfo, presentations, owner } =
    finalData.data.getHealthCenter;

  return (
    <>
      {finalData && finalData.data && (
        <MetaTags
          metaConfig={{
            title: serviceMetaInfo.title,
            description: serviceMetaInfo.description,
            presentation: presentations[0],
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
