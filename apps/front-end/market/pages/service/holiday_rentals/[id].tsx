import React from "react";
import type { GetServerSideProps, NextPage } from "next";
import { MasterLayout, MetaTags } from "@components";
import { MarketHotelDetailsView, ServiceTypeOfSeller } from "ui";
import { Container, GetServiceDetailsQueryKey } from "ui";
import { ExtractParamFromQuery } from "utils";
import { dehydrate, QueryClient } from "react-query";
import {
  Hotel,
  getServiceDetailsDataSwitcher,
  getServicesProviderDataFetcher,
} from "api";
import {
  AsyncReturnType,
  GqlResponse,
  ServerSideQueryClientProps,
  ServicesType,
} from "types";

interface HotelServiceDetailsPageProps {
  data: GqlResponse<Hotel, "getHotelService">;
}

export const getServerSideProps: GetServerSideProps<
  ServerSideQueryClientProps<HotelServiceDetailsPageProps>
> = async ({ query }) => {
  const queryClient = new QueryClient();

  const serviceType: ServicesType = "holidays_rentals";
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
      data,
    },
  };
};

const HotelServiceDetailsPage: NextPage<HotelServiceDetailsPageProps> = ({
  data,
}) => {
  const finalData = data || mockData;

  const { serviceMetaInfo, presentations, owner } =
    finalData.data.getHotelService;
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
          <MarketHotelDetailsView id={""} />
        </Container>
      </MasterLayout>
    </>
  );
};

export default HotelServiceDetailsPage;

const mockData: AsyncReturnType<typeof getServicesProviderDataFetcher> = {
  data: {
    getHotelService: {
      rooms: [],
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
      presentations: [],
      ownerId: "owner-1",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      location: {
        address: "123 Placeholder Street",
        country: "Placeholder Country",
        state: "Placeholder State",
        city: "Placeholder City",
        lat: 12.345678,
        lon: 98.765432,
        postalCode: 12345,
      },
      policies: [],
      serviceMetaInfo: {
        title: "Placeholder Service",
        description: "Description of the placeholder service.",
        metaTagDescription: "Meta tag description for placeholder.",
        metaTagKeywords: ["placeholder", "beauty", "center"],
        hashtags: ["#beauty", "#placeholder"],
      },
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
