import React from "react";
import type { NextPage } from "next";
import Head from "next/head";
import { Login } from "ui/views";
import { MasterLayout } from "@components";
import { useBuyerSignupMutation } from "ui";

const BuyerSignup: NextPage = () => {
  const { mutate, data } = useBuyerSignupMutation();
  console.log({ data });
  return (
    <>
      <Head>
        <title>Wiaah | Buyer SignUp</title>
      </Head>
      <MasterLayout>
        <main className="block w-full grow">
          <Login
            onSubmit={(data, type) => {
              type === "buyer-signup" ? mutate(data) : null;
            }}
            loginType={"buyer-signup"}
          />
        </main>
      </MasterLayout>
    </>
  );
};

export default BuyerSignup;
