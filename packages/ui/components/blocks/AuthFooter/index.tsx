import React from "react";
import { FaUserAlt } from "react-icons/fa";
import Link from "next/link";
import { useTranslation } from "react-i18next";

export const AuthFooter: React.FC = () => {
  const { t, i18n } = useTranslation();
  return (
    <>
      <div className="bg-primary block w-full items-center justify-center space-y-4 space-x-4 p-6 md:flex md:space-y-0">
        <p className="text-center text-xl text-white">
          {t(
            "Turn_Your_Passion_Into_a_Business",
            "Turn Your Passion Into a Business"
          )}
        </p>
        <div>
          <Link href="/seller-signup">
            <button className="mx-auto flex w-44 items-center border rounded-md bg-white px-3 py-2 text-sm uppercase text-gray-700">
              <FaUserAlt className="mr-2 h-4 w-4" />
              {t("Open_a_shop", "Open a shop")}
            </button>
          </Link>
        </div>
        <div>
          <Link href="/login">
            <button className="mx-auto flex w-44 items-center border rounded-md bg-black px-3 py-2 text-sm uppercase">
              <div className="flex text-primary">
                <FaUserAlt className="mr-2 h-4 w-4" />
                {t("Seller_login", "Seller login")}
              </div>
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};
