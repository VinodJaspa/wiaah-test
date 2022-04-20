import React, { FC } from "react";
import {
  FaTwitter,
  FaFacebook,
  FaInstagram,
  FaYoutube,
  FaTiktok,
  FaSnapchat,
} from "react-icons/fa";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { social } from "../../../../../apps/market/lib/Links";
import { Text } from "@chakra-ui/react";
export const SocialMediaLinks: FC = () => {
  const { t, i18n } = useTranslation();
  return (
    <div className="block w-full space-y-4">
      <Text color="primary.main" className="font-bold uppercase">
        {t("Stay_Connected", "Stay Connected")}
      </Text>
      <ul className="block space-y-4 text-sm text-gray-400">
        <li className="flex items-center">
          <FaTwitter className="mr-2 h-4 w-4 text-sky-400" />
          <Link href={social.twitter}>Twitter</Link>
        </li>
        <li className="flex items-center">
          <FaFacebook className="mr-2 h-4 w-4 text-blue-500" />
          <Link href={social.facebook}>Facebook</Link>
        </li>
        <li className="flex items-center">
          <FaInstagram className="mr-2 h-4 w-4 text-rose-500" />
          <Link href={social.instagram}>Instagram</Link>
        </li>
        <li className="flex items-center">
          <FaYoutube className="mr-2 h-4 w-4 text-red-700" />
          <Link href={social.youtube}>Youtube</Link>
        </li>
        <li className="flex items-center">
          <FaTiktok className="mr-2 h-4 w-4 text-stone-100" />
          <Link href={social.tiktok}>Tiktok</Link>
        </li>
        <li className="flex items-center">
          <FaSnapchat className="mr-2 h-4 w-4 text-amber-300" />
          <Link href={social.snapchat}>Snapchat</Link>
        </li>
      </ul>
    </div>
  );
};
