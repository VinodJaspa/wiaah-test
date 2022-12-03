import React from "react";
import { NextPage } from "next";
import Head from "next/head";
import { Container, Divider, Spacer, Collaboration, PrivacyPolicy } from "ui";
import MasterLayout from "../components/MasterLayout";
const privacyPolicy: NextPage = () => {
  return (
    <>
      <Head>
        <title>About Wiaah</title>
      </Head>
      <MasterLayout>
        <Container>
          <PrivacyPolicy />
          <Spacer spaceInRem={2} />
          <Divider />
          <Collaboration />
        </Container>
      </MasterLayout>
    </>
  );
};

export default privacyPolicy;
