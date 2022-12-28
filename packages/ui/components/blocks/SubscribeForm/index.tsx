import React, { FC } from "react";
import { FaAt, FaUserAlt } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { Button } from "@partials";

export interface SubscribeFormProps {}

export const SubscribeForm: FC<SubscribeFormProps> = () => {
  const { t, i18n } = useTranslation();
  return (
    <div className="block w-full space-y-4 lg:col-span-2">
      <p className="text-primary uppercase font-bold">
        {t("Wiaah_Alert_En", "Wiaah Alert En")}
      </p>
      <p className="text-sm text-gray-400">
        {t(
          "call_for_registration_0)",
          "Register now to get updates on promotions and coupons"
        )}
      </p>
      <div className="flex w-4/5 items-center space-x-2 rounded-lg bg-gray-700 px-2 py-1.5 lg:w-3/4">
        <FaAt className="pointer-events-none h-4 w-4 text-gray-400" />
        <input
          placeholder={t("Email", "Email")}
          className="flex w-full appearance-none bg-gray-700 px-2 py-1.5 text-white focus:outline-none"
        />
      </div>
      <div className="flex w-4/5 items-center space-x-2 rounded-lg bg-gray-700 px-2 py-1.5 lg:w-3/4">
        <FaUserAlt className="pointer-events-none h-4 w-4 text-gray-400" />
        <input
          placeholder={t("Name", "Name")}
          className="flex w-full appearance-none bg-gray-700 px-2 py-1.5 text-white focus:outline-none"
        />
      </div>
      <Button className="px-3.5 py-2 uppercase ">
        {t("Subscribe", "Subscribe")}
      </Button>
    </div>
  );
};
