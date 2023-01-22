import { ServicesView } from "@components";
import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import React from "react";
import { dehydrate, QueryClient } from "react-query";
import { ServerSideQueryClientProps } from "types";
import { ScrollPaginationWrapper, SellerLayout } from "ui";

export const getServerSideProps: GetServerSideProps<
  ServerSideQueryClientProps
> = async () => {
  const queryclient = new QueryClient();

  queryclient.prefetchQuery("", () => {});

  return {
    props: {
      dehydratedState: dehydrate(queryclient),
    },
  };
};

const ServicesPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>services</title>
      </Head>
      <SellerLayout>
        <ScrollPaginationWrapper onBottomReach={() => {}}>
          <ServicesView />
        </ScrollPaginationWrapper>
      </SellerLayout>
    </>
  );
};

export default ServicesPage;
