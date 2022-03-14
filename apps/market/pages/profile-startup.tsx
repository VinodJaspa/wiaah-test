import React from "react";
import type { NextPage } from "next";
import Head from "next/head";
import { SellerProfileStartupView } from "ui/views";

const SignUpFinalisation: NextPage = () => {
  return (
    <>
      <Head>
        <title>Wiaah | Signup Finalisation</title>
      </Head>
      <main className="block w-full grow">
        <SellerProfileStartupView />
      </main>
    </>
  );
};

export default SignUpFinalisation;
