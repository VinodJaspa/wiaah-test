import React from "react";
import type { NextPage } from "next";
import Head from "next/head";
import { LoginView } from "ui/views";
import { useRouter } from "next/router";
import MasterLayout from "../components/MasterLayout";

const Login: NextPage = () => {
  const router = useRouter();
  const { loginType } = router.query;

  if (loginType) {
    if (
      loginType?.toString() != "login" &&
      loginType?.toString() != "seller-signup" &&
      loginType?.toString() != "buyer-signup"
    ) {
      console.log(loginType?.toString());
      router.push("/404");
    }
  }
  return (
    <>
      <Head>
        <title>Wiaah | Login</title>
      </Head>
      <MasterLayout>
        <main className="block w-full grow">
          {loginType?.toString() == "login" ||
          loginType?.toString() == "seller-signup" ||
          loginType?.toString() == "buyer-signup" ? (
            <LoginView loginType={loginType?.toString()} />
          ) : (
            ""
          )}
        </main>
      </MasterLayout>
    </>
  );
};

export default Login;
