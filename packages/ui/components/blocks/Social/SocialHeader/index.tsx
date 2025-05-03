import { ShadcnBox, ShadCnButton, ShadcnFlex, ShadcnText } from "@UI/components/shadcn-components";
import React from "react";
import { useTranslation } from "react-i18next";


export const SocialHeader: React.FC = () => {
const { t } = useTranslation();
  return (
    <ShadcnFlex
      className="items-center py-2 px-16 shadow-md bg-white md:bg-black justify-center md:justify-between"
    >
      <ShadcnBox className="h-20">
        <img className="h-full" src="/wiaah_logo.png" alt="Wiaah Logo" />
      </ShadcnBox>

      <ShadcnFlex className="hidden md:flex items-center flex-col lg:flex-row text-white gap-4">
        <ShadcnFlex className="flex-col gap-2">
          <ShadcnText>{t("email_or_phone", "Email or Phone")}</ShadcnText>
          <input 
            className="text-black w-[17rem] bg-white p-2 border rounded-md" 
            type="email"
            placeholder={t("email_or_phone", "email or phone")} 
          />
          <p className="text-primary cursor-pointer capitalize">
            {t("forgot_password", "forgot password")}
          </p>
        </ShadcnFlex>

        <ShadcnFlex className="flex-col gap-2">
          <p className="capitalize">{t("password", "password")}</p>
          <input 
            className="text-black w-[17rem] bg-white p-2 border rounded-md" 
            type="password"
            placeholder={t("password", "password")} 
          />
          <p className="invisible">.</p>
        </ShadcnFlex>

        <ShadCnButton className="capitalize bg-primary text-white focus:ring-0 px-4 py-2 rounded-md hover:bg-primary/80">
          {t("login", "login")}
        </ShadCnButton>
      </ShadcnFlex>
    </ShadcnFlex>
  );
};
