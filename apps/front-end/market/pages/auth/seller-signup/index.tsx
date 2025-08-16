import React from "react";
import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { Signup } from "ui/views";
import { MasterLayout } from "@components";
import nookies from "cookies-next";

export const getServerSideProps: GetServerSideProps = async (context) => {
  // Get cookies from the request using nookies
    const token = nookies.getCookie('auth_token', context) || null; 


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
