import React from "react";
import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import MasterLayout from "../../components/MasterLayout";
import { ShopDetailsView } from "../../components";
import {
  Container,
  ServiceDetailsView,
  getShopDetailsQueryFetcher,
  getShopDetailsQueryKey,
  setQueryClientServerSideProps,
  useGetShopDetailsQuery,
  GetShopDetailsQuery,
  getRandomName,
} from "ui";
import { Collaboration } from "ui/components/blocks/Collaboration";
import { BusinessType, ServiceType, StoreType } from "@features/API";
import { useRouting } from "routing";
import { QueryClient, dehydrate } from "react-query";
import nookies from "cookies-next";

export const getServerSideProps: GetServerSideProps = async (context) => {
  // Extract the ID from the URL params
  const id = context?.params?.["id"] as string | undefined;

  // Extract cookies using nookies
     const token = nookies.getCookie('auth_token', context) || null; 
 
  return {
    props: {
      id: id || null,
    },
  };
};

interface ServiceDetailedPageProps {
  token: string | null;
}

const ServiceDetailPage: NextPage<ServiceDetailedPageProps> = ({ token }) => {
  const { getParam } = useRouting();

  const id = getParam("id");
  // const { data: _shop } = useGetShopDetailsQuery(id, { enabled: !!id });
  const shop = FAKE_SHOP;

  // get product details from api
  return (
    <>
      <Head>
        <title>Wiaah | Shop</title>
      </Head>
      <MasterLayout token={token}>
        {shop.storeType === StoreType.Service ? (
          <ServiceDetailsView id={FAKE_SHOP.id} />
        ) : (
          <ShopDetailsView id={FAKE_SHOP.id} />
        )}
      </MasterLayout>
    </>
  );
};

const FAKE_SHOP: GetShopDetailsQuery["getUserShop"] = {
  storeType: StoreType.Product,
  type: ServiceType.HolidayRentals,
  ownerId: "",
  banner: "",
  businessType: BusinessType.Individual,
  createdAt: new Date().toUTCString(),
  description:
    "Welcome to our stunning hotel room, where luxury and natural beauty blend seamlessly together. As you step into the room, you're immediately struck by the breathtaking sunset views visible through the floor-to-ceiling windows.",
  email: "test@email.com",
  id: "testid",
  images: [...Array(10)].map(() => "/shop.jpeg"),
  sellerProfile: {
    id: "",
    ownerId: "",
    photo: "/shop.jpeg",
    username: getRandomName().firstName,
  },
  location: {
    address: "Burj Al Arab Jumeirah Jumeira Road Umm Suqeim 3",
    city: "Dubai",
    country: "United Arab Emirates",
    lat: 45.464664,
    lon: 9.18854,
    postalCode: 1546,
    state: "state",
    countryCode: "",
  },
  name: "service name",
  phone: "1324658",
  rating: 5,
  reviews: 160,
  thumbnail: "/shop.jpeg",
  verified: true,
  videos: [],
  workingSchedule: {
    id: "",
    weekdays: {
      mo: {
        periods: [
          new Date(2023, 4, 15, 10).toUTCString(),
          new Date(2023, 4, 15, 18).toUTCString(),
        ],
      },
      tu: {
        periods: [
          new Date(2023, 4, 15, 10).toUTCString(),
          new Date(2023, 4, 15, 18).toUTCString(),
        ],
      },
      we: {
        periods: [
          new Date(2023, 4, 15, 10).toUTCString(),
          new Date(2023, 4, 15, 18).toUTCString(),
        ],
      },
      th: {
        periods: [
          new Date(2023, 4, 15, 10).toUTCString(),
          new Date(2023, 4, 15, 18).toUTCString(),
        ],
      },
      fr: {
        periods: [
          new Date(2023, 4, 15, 10).toUTCString(),
          new Date(2023, 4, 15, 18).toUTCString(),
        ],
      },
      sa: {
        periods: [
          new Date(2023, 4, 15, 10).toUTCString(),
          new Date(2023, 4, 15, 18).toUTCString(),
        ],
      },
      su: {
        periods: [
          new Date(2023, 4, 15, 10).toUTCString(),
          new Date(2023, 4, 15, 18).toUTCString(),
        ],
      },
    },
  },
};

export default ServiceDetailPage;
