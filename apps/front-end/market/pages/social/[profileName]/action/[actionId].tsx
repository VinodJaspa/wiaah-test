import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import React from "react";
import { MasterLayout } from "@components";
import { ActionsView } from "@components";

interface ActionsPageProps {}

export const getServerSideProps: GetServerSideProps<
  ActionsPageProps
> = async () => {
  return {
    props: {},
  };
};

const actions: NextPage<ActionsPageProps> = () => {
  return (
    <>
      <Head>
        <title>Wiaah | actions</title>
      </Head>
      <MasterLayout social>
        <ActionsView />
      </MasterLayout>
    </>
  );
};

export default actions;
