import { GetServerSideProps } from "next";
import Head from "next/head";
import React from "react";
import { dehydrate, QueryClient } from "react-query";
import { SellerLayout, useResponsive } from "ui";
import { ChatView } from "../../components";

interface MessagesPageProps { }

const Messages: React.FC<MessagesPageProps> = () => {
  const { isMobile } = useResponsive();
  return (
    <>
      <Head>
        <title>Wiaah | Messages</title>
      </Head>
      <SellerLayout header={isMobile ? null : "main"}>
        <ChatView />
      </SellerLayout>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {}, // You can add your props here
  };
};

export default Messages;
