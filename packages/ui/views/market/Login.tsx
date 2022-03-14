import React from "react";
import { t } from "i18next";
import { useRouter } from "next/router";
import { LoginType } from "../../../../apps/market/lib/LoignTypes";

import { AuthSwitcher, FormContainer } from "../../components/blocks";

export interface LoginViewProps {
  loginType: LoginType;
}

export const Login: React.FC<LoginViewProps> = ({ loginType = "login" }) => {
  const router = useRouter();
  return (
    <>
      <div
        className={`login-view-container xl:py-34
       flex flex-col items-start bg-[#00B081] p-4 lg:flex-row lg:p-24 xl:px-36`}
      >
        <div className="container mx-auto flex flex-col rounded-lg bg-black bg-opacity-20 filter lg:flex-row">
          <div className="w-full p-2 text-white lg:w-7/12">
            <h1 className="text-3xl text-white lg:text-5xl">
              {t(
                "Welcome_to_Wiaah",
                "Welcome to Wiaah: The First and Reference Social Marketplace"
              )}
            </h1>
            <p className="mt-5 mb-5 text-justify text-base font-light lg:mt-10 lg:text-xl">
              {t(
                "With_Wiaah_Text",
                "With Wiaah, connect with the world's leading fashion brands and your favourite brands, participate in their success while succeding in your turn."
              )}
            </p>
            <div className="flex flex-col items-end text-lg font-light lg:text-xl">
              <cite className="text-justify">
                {t(
                  "founder_of_wiaah_cite",
                  '"It is by participating in the success of others that we acheive our own success"'
                )}
              </cite>
              <div className="mt-5 mb-5 lg:mb-0">
                {t("Founder_of_Wiaah", "Founder of Wiaah")}
              </div>
            </div>
          </div>
          <FormContainer>
            <AuthSwitcher
              loginType={loginType}
              link={true}
              onViewChange={(view) => router.push(view)}
            />
          </FormContainer>
        </div>
      </div>
    </>
  );
};
