import { NextPage } from "next";
import Head from "next/head";
import React from "react";
import MasterLayout from "../components/MasterLayout";
import { AboutWiaah, Collaboration, Container, Divider, Spacer } from "ui";

const aboutWiaah: NextPage = () => {
  return (
    <>
      <Head>
        <title>About Wiaah</title>
      </Head>
      <MasterLayout>
        <Container>
          <AboutWiaah />
          <Spacer spaceInRem={2} />
          <Divider />
          <Collaboration />
        </Container>
      </MasterLayout>
    </>
  );
};

export default aboutWiaah;
