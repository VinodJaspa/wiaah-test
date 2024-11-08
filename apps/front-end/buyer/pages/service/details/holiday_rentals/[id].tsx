import { HotelDetailsView } from "ui";
import { NextPage } from "next";
import Head from "next/head";
import React from "react";
import { MetaTitle } from "react-seo";
import { SellerLayout } from "ui";

const HolidayRentalsDetails: NextPage = () => {
  return (
    <>
      <MetaTitle content="service details" />
      <SellerLayout>
        <HotelDetailsView />
      </SellerLayout>
    </>
  );
};

export default HolidayRentalsDetails;
