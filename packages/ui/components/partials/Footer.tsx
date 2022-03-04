import React from "react";
import {
  FaTwitter,
  FaFacebook,
  FaInstagram,
  FaYoutube,
  FaTiktok,
  FaSnapchat,
  FaAt,
  FaUserAlt,
} from "react-icons/fa";
import { CountryLanguageCurrencySwitch } from "ui/components";
import { useTranslation } from "react-i18next";

export const Footer: React.FC = () => {
  const { t, i18n } = useTranslation();
  return (
    <>
      <footer className="block w-full bg-gray-800 p-6">
        <div className="grid w-full grid-cols-1 place-content-center gap-4 md:grid-cols-3 lg:grid-cols-5">
          <div className="block w-full space-y-4 lg:col-span-2">
            <p className="font-bold uppercase text-green-300">
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
            <button className="rounded-lg bg-green-400 px-3.5 py-2 uppercase text-white">
              {t("Subscribe", "Subscribe")}
            </button>
          </div>
          <div className="block w-full space-y-4">
            <p className="font-bold uppercase text-green-300">
              {t("Customer_Service", "Customer Service")}
            </p>
            <ul className="block space-y-4 text-sm text-gray-400">
              <li>{t("Contact_Us", "Contact Us")}</li>
              <li>{t("Help_and_FAQs", "Help and FAQs")}</li>
            </ul>
          </div>
          <div className="block w-full space-y-4">
            <p className="font-bold uppercase text-green-300">
              {t("Information", "Information")}
            </p>
            <ul className="block space-y-4 text-sm text-gray-400">
              <li>{t("About_Wiaah", "About Wiaah")}</li>
              <li>{t("Privacy_Policy", "Privacy Policy")}</li>
              <li>{t("Terms_Conditions", "Terms & Conditions")}</li>
            </ul>
          </div>
          <div className="block w-full space-y-4">
            <p className="font-bold uppercase text-green-300">
              {t("Stay_Connected", "Stay Connected")}
            </p>
            <ul className="block space-y-4 text-sm text-gray-400">
              <li className="flex items-center">
                <FaTwitter className="mr-2 h-4 w-4 text-sky-400" /> Twitter
              </li>
              <li className="flex items-center">
                <FaFacebook className="mr-2 h-4 w-4 text-blue-500" />
                Facebook
              </li>
              <li className="flex items-center">
                <FaInstagram className="mr-2 h-4 w-4 text-rose-500" />
                Instagram
              </li>
              <li className="flex items-center">
                <FaYoutube className="mr-2 h-4 w-4 text-red-700" />
                Youtube
              </li>
              <li className="flex items-center">
                <FaTiktok className="mr-2 h-4 w-4 text-stone-100" />
                Tiktok
              </li>
              <li className="flex items-center">
                <FaSnapchat className="mr-2 h-4 w-4 text-amber-300" />
                Snapchat
              </li>
            </ul>
          </div>
        </div>
        <CountryLanguageCurrencySwitch />
      </footer>
    </>
  );
};
