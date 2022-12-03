import React, { useEffect } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import { Login as LoginView } from "ui/views";
import MasterLayout from "../components/MasterLayout";

const Login: NextPage = () => {
  return (
    <>
      <Head>
        <title>Wiaah | Login</title>
      </Head>
      <MasterLayout>
        <main className="block w-full grow">
          <LoginView loginType={"login"} />
        </main>
      </MasterLayout>
    </>
  );
};

export default Login;
