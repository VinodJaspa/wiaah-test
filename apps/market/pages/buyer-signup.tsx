import React from "react";
import type { NextPage } from "next";
import Head from "next/head";
import { Login } from "ui/views";
import MasterLayout from "../components/MasterLayout";
import LoignTypes from "../lib/LoignTypes";

const BuyerSignup: NextPage = () => {
  return (
    <>
      <Head>
        <title>Wiaah | Buyer SignUp</title>
      </Head>
      <MasterLayout>
        <main className="block w-full grow">
          <Login loginType={LoignTypes.buyer_signup} />
        </main>
      </MasterLayout>
    </>
  );
};

export default BuyerSignup;
