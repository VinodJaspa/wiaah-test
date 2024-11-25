import React from "react";
import type { GetServerSideProps, NextPage } from "next";
import { Container, CookiesInfoBanner } from "ui";
import { HomeView } from "ui/views";
import { MasterLayout } from "@components";
import nookies from "nookies";
import Head from "next/head";

export const getServerSideProps: GetServerSideProps = async (context) => {
  // Get cookies from the request using nookies
  const cookies = nookies.get(context);
  const token = cookies.auth_token || null; // Assuming 'token' is the cookie name you're looking for

  return {
    props: {
      token,
    },
  };
};
interface MarketPageProps {
  token: string | null;
}

const Market: NextPage<MarketPageProps> = ({ token }) => {
  return (
    <>
      <Head>Wiaah | Market</Head>
      <MasterLayout token={token}>
        <Container>
          <HomeView />
        </Container>
        <div className="fixed bottom-4 left-0 w-full">
          <Container>
            <CookiesInfoBanner />
          </Container>
        </div>
      </MasterLayout>
    </>
  );
};

export default Market;
