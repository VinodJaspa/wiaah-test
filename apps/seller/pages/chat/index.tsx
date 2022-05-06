import { GetServerSideProps } from "next";
import Head from "next/head";
import React from "react";
import { dehydrate, QueryClient } from "react-query";
import { SellerLayout, useResponsive } from "ui";
import { ChatView } from "../../components";

interface MessagesPageProps {}

export const getServerSideProps: GetServerSideProps<MessagesPageProps> =
  async () => {
    const queryClient = new QueryClient();

    // get messages page data with
    // queryClient.prefetchQuery

    return {
      props: {
        dehydratedProps: dehydrate(queryClient),
      },
    };
  };

const messages: React.FC<MessagesPageProps> = () => {
  const { isMobile } = useResponsive();
  return (
    <>
      <Head>
        <title>Wiaah | Messages</title>
      </Head>
      <SellerLayout
        header={isMobile ? null : "main"}
        sideBar={false}
        containerProps={{ h: "100%" }}
      >
        <ChatView />
      </SellerLayout>
    </>
  );
};

export default messages;
