import { NextPage } from "next";
import { MetaTitle } from "react-seo";
import { HotelDetailsView, SellerLayout } from "ui";

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
