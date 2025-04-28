import React from "react";
import { useTranslation } from "react-i18next";
import { HtmlDivProps } from "types";
import { DateInput, Menu, MenuList, CalenderIcon, MenuButton } from "@UI";

export interface VehiclePickupDateInputProps extends HtmlDivProps {}

export const VehiclePickupDateInput: React.FC<VehiclePickupDateInputProps> = ({
  children,
  className,
  ...props
}) => {
  const [date, setDate] = React.useState<string>();
  const [FormatedDate, setFormatedDate] = React.useState<string>("");
const { t }: { t: (key: string, ...args: any[]) => string } = useTranslation();

  React.useEffect(() => {
    if (date) {
      const newDate = new Date(date);
      const weekday = newDate.toLocaleDateString("en-us", {
        weekday: "short",
      });
      const daynum = newDate.toLocaleDateString("en-us", {
        day: "numeric",
      });
      const monthname = newDate.toLocaleDateString("en-us", {
        month: "short",
      });
      setFormatedDate(`${weekday} ${daynum} ${monthname}`);
    }
  }, [date]);

  return (
    <div
      {...props}
      className={`${
        className || ""
      } text-black flex gap-2 items-center h-full p-2 rounded bg-white`}
    >
      <Menu>
        <MenuButton>
          <div className="flex gap-2 cursor-pointer items-center">
            <CalenderIcon />
            <div className="whitespace-nowrap flex flex-col">
              <p className="">{t("Pick-up Date")}</p>
              <p className="font-bold">{FormatedDate}</p>
            </div>
          </div>
        </MenuButton>
        <MenuList>
          <DateInput onDaySelect={(date) => setDate(date)} />
        </MenuList>
      </Menu>
    </div>
  );
};
