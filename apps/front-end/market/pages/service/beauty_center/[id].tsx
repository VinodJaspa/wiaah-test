import React from "react";
import type { GetServerSideProps, NextPage } from "next";
import { MasterLayout, MetaTags } from "@components";
import { MarketBeautyCenterServiceDetailsView, ServiceTypeCard } from "ui";
import { Container, GetServiceDetailsQueryKey } from "ui";
import { ExtractParamFromQuery } from "utils";
import { dehydrate, QueryClient } from "react-query";
import {
  getBeautyCenterDetailsDataFetcher,
  getServiceDetailsDataSwitcher,
  ServicePaymentMethods,
} from "api";
import { AsyncReturnType, ServerSideQueryClientProps } from "types";
import { useRouting } from "routing";
import {
  ServiceStatus,
  ServiceTypeOfSeller,
} from "@features/API/gql/generated";

interface BeautyCenterServiceDetailsPageProps {
  data: AsyncReturnType<typeof getBeautyCenterDetailsDataFetcher> | null;
}

export const getServerSideProps: GetServerSideProps<
  ServerSideQueryClientProps<BeautyCenterServiceDetailsPageProps>
> = async ({ query }) => {
  const queryClient = new QueryClient();

  const serviceType = "beauty_center";
  const serviceId = ExtractParamFromQuery(query, "id");

  let data = null;
  try {
    data = (await getServiceDetailsDataSwitcher(
      serviceType,
      serviceId,
    )) as AsyncReturnType<typeof getBeautyCenterDetailsDataFetcher>;

    queryClient.prefetchQuery(
      GetServiceDetailsQueryKey({ serviceType, id: serviceId }),
      () => data,
    );
  } catch (error) {
    console.error("Failed to fetch service details:", error);
  }

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      data: data || null,
    },
  };
};

const BeautyCenterServiceDetailsPage: NextPage<
  BeautyCenterServiceDetailsPageProps
> = ({ data }) => {
  const { getParam } = useRouting();
  const id = getParam("id");
  const finalData = data || mockData; // Use placeholder data if query fails

  const { serviceMetaInfo, presentations, owner } =
    finalData.data.getBeautyCenterById;

  return (
    <>
      <MetaTags
        metaConfig={{
          title: serviceMetaInfo.title,
          description: serviceMetaInfo.description,
          presentation: presentations[0],
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

const mockData: AsyncReturnType<typeof getBeautyCenterDetailsDataFetcher> = {
  data: {
    getBeautyCenterById: {
      owner: {
        firstName: "owner_firstName",
        lastName: "owner_lastName",
        verified: true,
        email: "owner_email",
        photo: "/shop.jpeg",
        id: "2",
      },
      id: "1",
      contact: {
        address: "123 Placeholder Street",
        country: "Placeholder Country",
        city: "Placeholder City",
        email: "contact@example.com",
        phone: "+123456789",
      },
      ownerId: "owner-1",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      vat: 15.0,
      rating: 4.5,
      totalReviews: 100,
      beauty_center_typeId: "type-1",
      status: ServiceStatus.Active, // Corresponding to ServiceStatus.Active
      title: "Placeholder Beauty Center",
      location: {
        address: "123 Placeholder Street",
        country: "Placeholder Country",
        state: "Placeholder State",
        city: "Placeholder City",
        lat: 12.345678,
        lon: 98.765432,
        postalCode: 12345,
      },
      presentations: [],
      policies: [],
      serviceMetaInfo: {
        title: "Placeholder Service",
        description: "Description of the placeholder service.",
        metaTagDescription: "Meta tag description for placeholder.",
        metaTagKeywords: ["placeholder", "beauty", "center"],
        hashtags: ["#beauty", "#placeholder"],
      },
      payment_methods: [ServicePaymentMethods.Cash], // Corresponding to ServicePaymentMethods.Cash
      cancelationPolicies: [],
      type_of_seller: ServiceTypeOfSeller.Individual, // Corresponding to ServiceTypeOfSeller.Individual
      treatments: [
        {
          id: "treatment-1",
          treatmentCategoryId: "category-1",
          category: null,
          title: "Placeholder Treatment",
          price: 100.0,
          duration: [60],
          discount: {
            value: 10, // Example discount object, replace with your type definition
            units: 10,
          },
        },
      ],

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
