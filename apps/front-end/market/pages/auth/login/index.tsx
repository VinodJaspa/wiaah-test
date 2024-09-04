import React from "react";
import type { NextPage } from "next";
import Head from "next/head";
import { MasterLayout } from "@components";
import { AuthSwitcher } from "@blocks";

const LoginPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Wiaah | Login</title>
      </Head>
      <MasterLayout>
        <main className="block w-full grow">
          <div className="flex w-full justify-center items-center">
            <div className="w-full rounded-lg bg-white px-8 pt-4 pb-6 shadow-xl lg:max-w-2xl ">
              <AuthSwitcher loginType="login" link={true} />
            </div>
          </div>
        </main>
      </MasterLayout>
    </>
  );
};

export default LoginPage;
