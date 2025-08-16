import React from "react";
import type { NextPage } from "next";
import Head from "next/head";
import { Signup } from "ui/views";
import { MasterLayout } from "@components";
import { useBuyerSignupMutation } from "ui";

const BuyerSignup: NextPage = () => {
  // const { mutate, data } = useBuyerSignupMutation();
  return (
    <>
      <Head>
        <title>Wiaah | Buyer SignUp</title>
      </Head>
      <MasterLayout>
        <main className="block w-full grow">
          <Signup loginType={"buyer-signup"} />
        </main>
      </MasterLayout>
    </>
  );
};

export default BuyerSignup;
