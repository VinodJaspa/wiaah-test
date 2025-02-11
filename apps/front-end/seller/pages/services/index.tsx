import { ServicesSearchView } from "@components";
import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { dehydrate, QueryClient } from "react-query";
import { ServerSideQueryClientProps } from "types";
import { SellerLayout } from "ui";

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
        <title>Wiaah | Services</title>
      </Head>
      <SellerLayout>
        <ServicesSearchView />
      </SellerLayout>
    </>
  );
};

export default ServicesPage;
