import React from "react";
import { useTranslation } from "react-i18next";
import { BsShop } from "react-icons/bs";
import { CgShoppingBag } from "react-icons/cg";
import { IoSettingsOutline } from "react-icons/io5";
import { getRouting, RoutesType, useRouting } from "routing";
import { AspectRatio, ServicesIcon } from "ui";
import { runIfFn } from "utils";

const links: {
  icon: React.ReactNode;
  title: string;
  url: string;
}[] = [
  {
    title: "Account Settings",
    icon: IoSettingsOutline,
    url: getRouting((r) => r.visitAccountSettings()),
  },
  {
    title: "Shop Management",
    icon: BsShop,
    url: getRouting((r) => r.visitShopManagement()),
  },
  {
    title: "Shopping Management",
    icon: CgShoppingBag,
    url: getRouting((r) => r.visitShoppingManagement()),
  },
  {
    title: "Service Management",
    icon: ServicesIcon,
    url: getRouting((r) => r.visitServiceManagement()),
  },
];

export const ManagementView: React.FC = () => {
  const { visit } = useRouting();
  const { t } = useTranslation();
  return (
    <div className="flex gap-8 h-full items-center">
      {links.map((v) => (
        <div className="flex w-full">
          <AspectRatio ratio={1}>
            <div
              onClick={() => visit((r) => r.addPath(v.url))}
              className="flex hover:bg-primary hover:text-white text-primary flex-col gap-2 cursor-pointer border-2 border-primary rounded-3xl justify-center items-center w-full h-full"
            >
              <span className=" text-4xl">{runIfFn(v.icon)}</span>
              <p className="">{t(v.title)}</p>
            </div>
          </AspectRatio>
        </div>
      ))}
    </div>
  );
};
