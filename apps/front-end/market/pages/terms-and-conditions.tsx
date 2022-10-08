import { Divider } from "antd";
import { NextPage } from "next";
import Head from "next/head";
import React from "react";
import { Container, Spacer, Collaboration, TermsAndConditions } from "ui";
import MasterLayout from "../components/MasterLayout";

const termsAndConditions: NextPage = () => {
  return (
    <>
      <Head>
        <title>About Wiaah</title>
      </Head>
      <MasterLayout>
        <Container>
          <TermsAndConditions />
          <Spacer spaceInRem={2} />
          <Divider />
          <Collaboration />
        </Container>
      </MasterLayout>
    </>
  );
};

export default termsAndConditions;
