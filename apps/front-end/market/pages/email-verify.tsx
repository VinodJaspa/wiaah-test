import React from "react";
import type { NextPage } from "next";
import Head from "next/head";
import { Login } from "ui/views";
import { MasterLayout } from "@components";
import { useVerifyEmailMutation } from "ui";
import { useTranslation } from "react-i18next";

const BuyerSignup: NextPage = () => {
  const { t } = useTranslation();
  const { mutate } = useVerifyEmailMutation();
  return (
    <>
      <Head>
        <title>{t("wiaah_verify_email_title", "Wiaah | Verify Email")}</title>
      </Head>
      <MasterLayout>
        <main className="block w-full grow">
          <Login
            onSubmit={(data, type) => {
              type === "email-verify" ? mutate(data) : null;
            }}
            loginType={"email-verify"}
          />
        </main>
      </MasterLayout>
    </>
  );
};

export default BuyerSignup;
