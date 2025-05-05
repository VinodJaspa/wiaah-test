import React from "react";
import { useTranslation } from "react-i18next";
import { Menu, MenuButton, MenuList, DateInput } from "@UI";
import { getDaysDiff } from "utils";

export interface CheckInOutInputProps {
  onDatesChange?: (checkIn: Date, checkout: Date, daysdiff: number) => any;
  active?: boolean;
  checkin?: Date;
  checkout?: Date;
}

export const CheckInOutInput: React.FC<CheckInOutInputProps> = ({
  onDatesChange,
  active = true,
  checkin: Checkin,
  checkout: Checkout,
}) => {
  const [checkin, SetCheckin] = React.useState<string>("");
  const [checkout, SetCheckout] = React.useState<string>("");
const { t } = useTranslation();

  React.useEffect(() => {
    if (!isNaN(Date.parse(new Date(Checkin || "").toString()))) {
      SetCheckin(new Date(Checkin || "").toString());
    }
  }, [Checkin]);
  React.useEffect(() => {
    if (!isNaN(Date.parse(new Date(Checkout || "").toString()))) {
      SetCheckout(new Date(Checkout || "").toString());
    }
  }, [Checkout]);
  React.useEffect(() => {
    const validCheckin = !isNaN(Date.parse(checkin));
    const validCheckout = !isNaN(Date.parse(checkout));

    if (validCheckin && validCheckout) {
      const daysDiff: number = getDaysDiff(checkin, checkout) || 0;
      onDatesChange &&
        onDatesChange(new Date(checkin), new Date(checkout), daysDiff);
    }
  }, [checkin, checkout]);

  return (
    <div className="flex ">
      <Menu className="w-full">
        <MenuButton>
          <div className="whitespace-nowrap cursor-pointer flex w-full flex-col px-4 py-2 border-b-gray-300 border-r-gray-300 border-b-2 border-r-2">
            <p className="flex flex-col uppercase font-bold">{t("check-in")}</p>

            <p>
              {isNaN(Date.parse(checkin))
                ? "dd/mm/yyyy"
                : new Date(checkin).toLocaleDateString("en-us", {
                    day: "numeric",
                    month: "numeric",
                    year: "numeric",
                  })}
            </p>
          </div>
        </MenuButton>
        {active ? (
          <MenuList>
            <DateInput onDaySelect={(date) => SetCheckin(date)} />
          </MenuList>
        ) : null}
      </Menu>
      <Menu className="w-full">
        <MenuButton>
          <div className="whitespace-nowrap cursor-pointer flex flex-col w-full border-b-2 border-b-gray-300 px-4 py-2">
            <p className="flex flex-col uppercase font-bold">
              {t("check-out")}
            </p>

            <p>
              {isNaN(Date.parse(checkout))
                ? "dd/mm/yyyy"
                : new Date(checkout).toLocaleDateString("en-us", {
                    day: "numeric",
                    month: "numeric",
                    year: "numeric",
                  })}
            </p>
          </div>
        </MenuButton>
        {active ? (
          <MenuList>
            <DateInput onDaySelect={(date) => SetCheckout(date)} />
          </MenuList>
        ) : null}
      </Menu>
    </div>
  );
};
