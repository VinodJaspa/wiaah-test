import React from "react";
import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { Signup } from "ui/views";
import { MasterLayout } from "@components";
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
interface SellerSignupPageProps {
  token: string | null;
}

const SellerSignup: NextPage<SellerSignupPageProps> = ({ token }) => {
  return (
    <>
      <Head>
        <title>Wiaah | Buyer SignUp</title>
      </Head>
      <MasterLayout token={token}>
        <main className="block w-full grow">
          <Signup loginType={"seller-signup"} />
        </main>
      </MasterLayout>
    </>
  );
};

export default SellerSignup;
