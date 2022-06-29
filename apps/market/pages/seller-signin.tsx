import React from "react";
import type { NextPage } from "next";
import Head from "next/head";
import { Login } from "ui/views";
import MasterLayout from "../components/MasterLayout";

const SellerSignup: NextPage = () => {
  return (
    <>
      <Head>
        <title>Wiaah | Seller SignUp</title>
      </Head>
      <MasterLayout>
        <main className="block w-full grow">
          <Login loginType={"seller-signup"} />
        </main>
      </MasterLayout>
    </>
  );
};

export default SellerSignup;
