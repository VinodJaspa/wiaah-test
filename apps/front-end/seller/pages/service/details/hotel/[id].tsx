import { NextPage } from "next";
import { MetaTitle } from "react-seo";
import { useRouting } from "routing";
import { HotelDetailsView, SellerLayout } from "ui";
import React from "react";
const ServiceDetails: NextPage = () => {
  const { getParam } = useRouting();
  const tabIndex = parseInt(getParam("tabIndex")) || 0;

  return (
    <>
      <MetaTitle content="service details" />
      <SellerLayout>
        <HotelDetailsView selectedTab={tabIndex} />
      </SellerLayout>
    </>
  );
};

export default ServiceDetails;
