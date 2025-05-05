import { NextPage } from "next";
import { MetaTitle } from "react-seo";
import { HotelDetailsView, SellerLayout } from "ui";
import React from 'react';
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
