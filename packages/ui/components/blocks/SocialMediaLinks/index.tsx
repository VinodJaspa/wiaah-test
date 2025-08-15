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
import { social } from "ui/data";

export const SocialMediaLinks: FC = () => {
  const { t } = useTranslation();

  const socialLinks = [
    { name: "Twitter", icon: FaTwitter, href: social.twitter, color: "text-sky-400" },
    { name: "Facebook", icon: FaFacebook, href: social.facebook, color: "text-blue-500" },
    { name: "Instagram", icon: FaInstagram, href: social.instagram, color: "text-rose-500" },
    { name: "Youtube", icon: FaYoutube, href: social.youtube, color: "text-red-700" },
    { name: "Tiktok", icon: FaTiktok, href: social.tiktok, color: "text-stone-100" },
    { name: "Snapchat", icon: FaSnapchat, href: social.snapchat, color: "text-amber-300" },
  ];

  return (
    <div className="block w-full space-y-4">
      <p className="text-white font-bold uppercase">
        {t("Stay_Connected", "Stay Connected")}
      </p>
      <ul className="block space-y-4 text-sm text-gray-400">
        {socialLinks.map(({ name, icon: Icon, href, color }) => (
          <li key={name} className="flex items-center">
            <Icon className={`mr-2 h-4 w-4 ${color}`} />
            <Link href={href}>{name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
