import { Menu, MenuButton, MenuList } from "ui";
import React from "react";
import { useTranslation } from "react-i18next";
import { DateInput } from "ui";
import { CalenderIcon } from "ui";
import { HtmlDivProps } from "types";

export interface VehicleDropOffDateInputProps extends HtmlDivProps {}

export const VehicleDropOffDateInput: React.FC<
  VehicleDropOffDateInputProps
> = ({ children, className, ...props }) => {
  const [date, setDate] = React.useState<string>();
  const [FormatedDate, setFormatedDate] = React.useState<string>("");
  const { t } = useTranslation();

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
            <div className="flex flex-col whitespace-nowrap">
              <p>{t("Drop-off Date")}</p>
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
