import { useUserData } from "hooks";
import React from "react";
import {
  BellOutlineIcon,
  Avatar,
  InputGroup,
  Input,
  InputLeftElement,
  SearchIcon,
} from "ui";
import { useTranslation } from "react-i18next";

export const AdminHeader: React.FC<{ title: string }> = ({ title = "" }) => {
  const { user } = useUserData();
  const { t } = useTranslation();
  return (
    <div className="w-full">
      <div className="h-24 flex items-center justify-between">
        <p className="md:text-xl xl:text-2xl font-bold capitalize">{title}</p>
        <InputGroup className="rounded-lg w-1/2">
          <InputLeftElement>
            <SearchIcon className="" />
          </InputLeftElement>
          <Input placeholder={t("Search")} />
        </InputGroup>
        <div className="flex items-center gap-4 text-black">
          <BellOutlineIcon className="text-icon" />
          <Avatar className="text-3xl" src={user?.photoSrc} alt={user?.name} />
        </div>
      </div>
    </div>
  );
};
