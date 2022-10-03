import React from "react";
import type { NextPage } from "next";
import Head from "next/head";
import { SellerProfileStartupView, Container } from "ui";

const SignUpFinalisation: NextPage = () => {
  return (
    <>
      <Head>
        <title>Wiaah | Signup Finalisation</title>
      </Head>
      <main className="block w-full grow h-screen">
        <Container>
          <SellerProfileStartupView />
        </Container>
      </main>
    </>
  );
};

export default SignUpFinalisation;
