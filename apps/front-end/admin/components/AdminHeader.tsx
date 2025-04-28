import { useUserData } from "hooks";
import React from "react";
import {
  BellOutlineIcon,
  Avatar,
  InputGroup,
  Input,
  InputLeftElement,
  SearchIcon,
  HStack,
  WavingHand,
  Divider,
} from "ui";
import { useTranslation } from "react-i18next";

export const AdminHeader: React.FC<{ title: string }> = ({ title = "" }) => {
  const { user } = useUserData();
  const { t }: { t: (key: string, ...args: any[]) => string } =
    useTranslation();
  return (
    <div className="w-full">
      <div className="h-24 flex items-center justify-between">
        <div className="flex">
          <div className="flex gap-4">
            <WavingHand className="text-4xl" />
            <div className="flex flex-col gap-1">
              <p className="font-bold text-2xl">{t("Welcome back")}</p>
              <p className="font-medium text-gray-500">{user?.name}</p>
            </div>
          </div>
          <Divider className="h-auto mx-8" variant="vert" />
          <InputGroup className="border-none h-fit self-center rounded-lg bg-gray-100">
            <InputLeftElement>
              <SearchIcon />
            </InputLeftElement>
            <Input className="bg-gray-100" placeholder={t("Search")} />
          </InputGroup>
        </div>
        <div className="flex items-center gap-6 text-black">
          <BellOutlineIcon className="text-icon text-2xl" />
          <Avatar className="text-5xl" src={user?.photoSrc} alt={user?.name} />
        </div>
      </div>
    </div>
  );
};
