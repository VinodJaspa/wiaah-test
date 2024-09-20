import React from "react";
import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { MasterLayout } from "@components";
import { AuthSwitcher, FormContainer } from "@blocks";
import { t } from "i18next";
import nookies from "nookies";

export const getServerSideProps: GetServerSideProps = async (context) => {
  // Get cookies from the request using nookies
  const cookies = nookies.get(context);
  const token = cookies.auth_token || null; // Assuming 'token' is the cookie name you're looking for

  return {
    props: {
      token,
    },
  };
};
interface LoginPageProps {
  token: string | null;
}

const LoginPage: NextPage<LoginPageProps> = ({ token }) => {
  return (
    <>
      <Head>
        <title>Wiaah | Login</title>
      </Head>
      <MasterLayout token={token}>
        <main className="block w-full grow">
          <div className="flex w-full justify-center items-center">
            <div
              className={`login-view-container xl:py-34
       flex flex-col items-start bg-[#00B081] p-4 lg:flex-row lg:p-24 xl:px-36`}
            >
              <div className="container mx-auto flex flex-col gap-16 rounded-lg bg-black bg-opacity-20 filter lg:flex-row">
                <div className="w-full p-2 text-white lg:w-7/12">
                  <h1 className="text-3xl text-white lg:text-5xl">
                    {t(
                      "Welcome_to_Wiaah",
                      "Welcome to Wiaah: The First and Reference Social Marketplace"
                    ).toString()}
                  </h1>
                  <p className="mt-5 mb-5 text-justify text-base font-light lg:mt-10 lg:text-xl">
                    {t(
                      "With_Wiaah_Text",
                      "With Wiaah, connect with the world's leading fashion brands and your favourite brands, participate in their success while succeding in your turn."
                    ).toString()}
                  </p>
                  <div className="flex flex-col items-end text-lg font-light lg:text-xl">
                    <cite className="text-justify">
                      {t(
                        "founder_of_wiaah_cite",
                        '"It is by participating in the success of others that we acheive our own success"'
                      ).toString()}
                    </cite>
                    <div className="mt-5 mb-5 lg:mb-0">
                      {t("founder_of_wiaah", "Founder of Wiaah").toString()}
                    </div>
                  </div>
                </div>
                <FormContainer>
                  <AuthSwitcher loginType="login" />
                </FormContainer>
              </div>
            </div>
          </div>
        </main>
      </MasterLayout>
    </>
  );
};

export default LoginPage;
