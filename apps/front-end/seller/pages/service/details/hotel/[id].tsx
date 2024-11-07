import { HotelDetailsView } from "@components";
import { getHealthCenterDetailsFetcher } from "api";
import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import React from "react";
import { dehydrate, QueryClient } from "react-query";
import { MetaTitle } from "react-seo";
import { ServerSideQueryClientProps } from "types";
import { getHealthCenterDetailsQueryKey, SellerLayout } from "ui";

const ServiceDetails: NextPage = () => {
  return (
    <>
      <MetaTitle content="service details" />
      <SellerLayout>
        <HotelDetailsView />
      </SellerLayout>
    </>
  );
};

export default ServiceDetails;
