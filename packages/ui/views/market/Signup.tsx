import React from "react";
import { t } from "i18next";
import { useRouter } from "next/router";
import { LoginType } from "types";

import { AuthSwitcher, FormContainer } from "../../components/blocks";

export interface LoginViewProps {
  loginType: LoginType;
  onSubmit?: (data: any, type: LoginType) => any;
  handleRoute:(route :string)=> void;
}

export const Signup: React.FC<LoginViewProps> = ({
  loginType = "login",
  handleRoute,
  onSubmit,
}) => {
  const router = useRouter();

  return (
    <>
      <div
        className={`login-view-container xl:py-34 min-h-screen
       flex flex-col items-start bg-[#00B081] p-4 lg:flex-row lg:p-24 xl:px-36`}
      >
        <div className="container mx-auto my-auto flex flex-col gap-16 rounded-lg bg-black bg-opacity-20 filter lg:flex-row">
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
            <AuthSwitcher
              loginType={loginType}
              link={true}
              onViewChange={(view) => handleRoute(view)}
            />
          </FormContainer>
        </div>
      </div>
    </>
  );
};
