import { MasterLayout } from "@components";
import { Signup, useSigninMutation } from "@UI";
import Head from "next/head";
import React from "react";
import { useTranslation } from "react-i18next";

const Signin = () => {
const { t } = useTranslation();
  const { mutate } = useSigninMutation();

  return (
    <>
      <Head>
        <title>{t("wiaah_login_title", "Wiaah | Login")}</title>
      </Head>
      <MasterLayout>
        <main className="block w-full grow">
          <Signup
            onSubmit={(data, type) => {
              console.log("login", data, type);
              type === "login" ? mutate(data) : null;
            }}
            loginType={"login"}
          />
        </main>
      </MasterLayout>
    </>
  );
};

export default Signin;
