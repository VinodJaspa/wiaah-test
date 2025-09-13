import { MasterLayout } from "@components";
import { ChatView } from "components/Messages";
import { GetServerSideProps } from "next";
import Head from "next/head";
import React from "react";
import { useResponsive } from "ui";


interface MessagesPageProps { }

const Messages: React.FC<MessagesPageProps> = () => {
  const { isMobile } = useResponsive();
  return (
    <>
      <Head>
        <title>Wiaah | Messages</title>
      </Head>
      <MasterLayout >
        <ChatView />
      </MasterLayout>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {}, // You can add your props here
  };
};

export default Messages;
