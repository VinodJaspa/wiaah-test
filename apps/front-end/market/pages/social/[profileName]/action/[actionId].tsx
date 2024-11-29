import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import React from "react";
import { MasterLayout } from "@components";
import { ActionsView } from "@components";
import { ActionPostView } from "@blocks";
import { Container } from "@partials";

interface ActionsPageProps {
  actionId: string | null; // Updated to account for null value
}

export const getServerSideProps: GetServerSideProps<ActionsPageProps> = async (
  context,
) => {
  const { actionId } = context.query;

  return {
    props: {
      actionId: typeof actionId === "string" ? actionId : null, // Ensure type safety
    },
  };
};

const actions: NextPage<ActionsPageProps> = ({ actionId }) => {
  return (
    <>
      <Head>
        <title>Wiaah | Actions</title>
      </Head>
      <MasterLayout social>
        <Container>
          <ActionPostView videoId={actionId} />
        </Container>
      </MasterLayout>
    </>
  );
};

export default actions;
