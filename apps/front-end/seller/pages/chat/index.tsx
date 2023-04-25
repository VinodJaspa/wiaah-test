import { GetServerSideProps } from "next";
import Head from "next/head";
import React from "react";
import { dehydrate, QueryClient } from "react-query";
import { ServerSideQueryClientProps } from "types";
import { SellerLayout, useResponsive } from "ui";
import { ChatView } from "../../components";

interface MessagesPageProps {}

export const getServerSideProps: GetServerSideProps<
  ServerSideQueryClientProps
> = async () => {
  const queryClient = new QueryClient();

  // get messages page data with
  // queryClient.prefetchQuery

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

const messages: React.FC<MessagesPageProps> = () => {
  const { isMobile } = useResponsive();
  return (
    <>
      <Head>
        <title></title>
      </Head>
      <SellerLayout
        sideBar={isMobile}
        containerProps={{ className: "h-[100%]" }}
      >
        <ChatView />
      </SellerLayout>
    </>
  );
};

export default messages;
