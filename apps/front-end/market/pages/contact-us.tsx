import React from "react";
import { NextPage } from "next";
import Head from "next/head";
import MasterLayout from "../components/MasterLayout";
import { ContactUsView, Container } from "ui";

const contactUs: NextPage = () => {
  return (
    <>
      <Head>
        <title>Contact Us</title>
      </Head>
      <MasterLayout>
        <Container>
          <ContactUsView />
        </Container>
      </MasterLayout>
    </>
  );
};

export default contactUs;
