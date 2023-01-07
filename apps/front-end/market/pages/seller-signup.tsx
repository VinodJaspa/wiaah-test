import React from "react";
import type { NextPage } from "next";
import Head from "next/head";
import { Login } from "ui/views";
import { MasterLayout } from "@components";
import { useSellerSignupMutation } from "ui";

const SellerSignup: NextPage = () => {
  const { mutate } = useSellerSignupMutation();
  return (
    <>
      <Head>
        <title>Wiaah | Seller SignUp</title>
      </Head>
      <MasterLayout>
        <main className="block w-full grow">
          <Login
            onSubmit={(data, type) => {
              type === "seller-signup" ? mutate(data) : null;
            }}
            loginType={"seller-signup"}
          />
        </main>
      </MasterLayout>
    </>
  );
};

export default SellerSignup;
