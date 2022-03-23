import { NextPage } from "next";
import Head from "next/head";
import React from "react";
import MasterLayout from "../components/MasterLayout";
import { AboutWiaahView, Container, Divider, Spacer } from "ui";
import { Collaboration } from "ui/components/blocks/Collaboration";

const aboutWiaah: NextPage = () => {
  return (
    <>
      <Head>
        <title>About Wiaah</title>
      </Head>
      <MasterLayout>
        <Container>
          <AboutWiaahView />
          <Spacer spaceInRem={2} />
          <Divider />
          <Collaboration />
        </Container>
      </MasterLayout>
    </>
  );
};

export default aboutWiaah;
