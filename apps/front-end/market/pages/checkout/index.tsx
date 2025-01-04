import { MasterLayout } from "@components";
import { CheckoutView } from "ui";
import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import React from "react";
import { Collaboration, Container } from "ui";
import nookies from "nookies";

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
interface ServiceCheckoutProps {
  token: string | null;
}

const ServiceCheckout: NextPage<ServiceCheckoutProps> = ({ token }) => {
  return (
    <React.Fragment>
      <Head>
        <title>Wiaah | Checkout</title>
      </Head>
      <MasterLayout token={token}>
        <div className="bg-[#F3F3F3]">
          <Container>
            <CheckoutView />
          </Container>
        </div>
        <Container>
          <Collaboration />
        </Container>
      </MasterLayout>
    </React.Fragment>
  );
};

export default ServiceCheckout;
