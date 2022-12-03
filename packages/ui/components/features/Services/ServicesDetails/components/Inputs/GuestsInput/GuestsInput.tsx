import React from "react";
import { useTranslation } from "react-i18next";
import {
  ArrowDownIcon,
  Menu,
  MenuList,
  MenuButton,
  HotelGuestsInput,
} from "ui";
export interface GuestsInputProps {}

export const GuestsInput: React.FC<GuestsInputProps> = () => {
  const { t } = useTranslation();
  const [guests, setGuests] = React.useState<number>(0);
  return (
    <Menu>
      <MenuButton>
        <div className="flex items-center justify-between gap-2 border-b border-gray-200">
          <p className="cursor-pointer w-full font-semibold text-lg">
            {guests} {t("Persons")}
          </p>
          <ArrowDownIcon className="text-lg" />
        </div>
      </MenuButton>
      <MenuList>
        <HotelGuestsInput
          name={t("Adults")}
          description={`${t("Age")} 13+`}
          onCountChange={() => {}}
        />
        <HotelGuestsInput
          name={t("Children")}
          description={`${t("Ages")} 2-12`}
          onCountChange={() => {}}
        />
        <HotelGuestsInput
          name={t("Infants")}
          description={`${t("Under")} 2`}
          onCountChange={() => {}}
        />
      </MenuList>
    </Menu>
  );
};
