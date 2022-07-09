import { NextPage } from "next";
import React from "react";
import { Container } from "ui";
import { ServiceSearchView } from "../../../components";
import MasterLayout from "../../../components/MasterLayout";

const ServiceCategory: NextPage = () => {
  return (
    <MasterLayout
      rootProps={{
        scrollable: false,
      }}
    >
      <Container>
        <ServiceSearchView />
      </Container>
    </MasterLayout>
  );
};

export default ServiceCategory;
