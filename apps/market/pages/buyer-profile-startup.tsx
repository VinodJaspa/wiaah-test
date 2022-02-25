import React from "react";
import type { NextPage } from "next";
import Head from "next/head";
import { BuyerProfileStartUpView } from "ui/views";

const SignUpFinalisation: NextPage = () => {
  return (
    <>
      <Head>
        <title>Wiaah | Buyer Signup Finalisation</title>
      </Head>
      <main className="block w-full grow">
        <BuyerProfileStartUpView />
      </main>
    </>
  );
};

export default SignUpFinalisation;
