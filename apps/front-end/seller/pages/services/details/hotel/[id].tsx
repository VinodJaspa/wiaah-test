import { HotelDetailsView } from "@components";
import { NextPage } from "next";
import Head from "next/head";
import React from "react";
import { MetaTitle } from "react-seo";
import { SellerLayout } from "ui";

const ServiceDetails: NextPage = () => {
  return (
    <>
      <Head>
        <MetaTitle content="service details" />
      </Head>
      <SellerLayout>
        <HotelDetailsView />
      </SellerLayout>
    </>
  );
};

export default ServiceDetails;
