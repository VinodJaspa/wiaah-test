import React from "react";
import type { NextPage } from "next";
import Head from "next/head";
import { BuyerProfileStartUpView } from "ui/views";
import { Container } from "ui";

const SignUpFinalisation: NextPage = () => {
  return (
    <>
      <Head>
        <title>Wiaah | Buyer Signup Finalisation</title>
      </Head>
      <main className="block w-full grow">
        <Container>
          <BuyerProfileStartUpView />
        </Container>
      </main>
    </>
  );
};

export default SignUpFinalisation;
