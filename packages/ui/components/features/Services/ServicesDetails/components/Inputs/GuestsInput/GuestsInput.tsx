import React, { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import {
  ArrowDownIcon,
  Menu,
  MenuList,
  MenuButton,
  HotelGuestsInput,
} from "@UI";
export interface GuestsInputProps {
  children?: ReactNode;
  onChange: (guests: {
    adults: number;
    childrens: number;
    infants: number;
  }) => any;
  value: {
    adults: number;
    childrens: number;
    infants: number;
  };
}

export const GuestsInput: React.FC<GuestsInputProps> = ({
  onChange: setGuests,
  children,
  value: guests,
}) => {
const { t }: { t: (key: string, ...args: any[]) => string } = useTranslation();

  return (
    <Menu>
      <MenuButton>
        <div className="flex items-center justify-between gap-2 border-b border-gray-200">
          <p className="cursor-pointer w-full font-semibold text-lg">
            {/*@ts-ignore*/}
            {children}
          </p>
          <ArrowDownIcon className="text-lg" />
        </div>
      </MenuButton>
      <MenuList className="w-96">
        <HotelGuestsInput
          name={t("Adults")}
          count={guests.adults}
          description={`${t("Age")} 13+`}
          onCountChange={(v) => setGuests({ ...guests, adults: v })}
        />
        <HotelGuestsInput
          count={guests.childrens}
          name={t("Children")}
          description={`${t("Ages")} 2-12`}
          onCountChange={(v) => setGuests({ ...guests, adults: v })}
        />
        <HotelGuestsInput
          name={t("Infants")}
          count={guests.infants}
          description={`${t("Under")} 2`}
          onCountChange={(v) => setGuests({ ...guests, adults: v })}
        />
      </MenuList>
    </Menu>
  );
};
