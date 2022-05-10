import { Text, TextProps } from "@chakra-ui/react";
import React from "react";

export interface DisplayDateProps {
  date: string | number;
  hours12?: boolean;
  locale?: string;
  innerProps?: TextProps;
}

export const DisplayDate: React.FC<DisplayDateProps> = ({
  date,
  hours12,
  locale,
  innerProps,
}) => {
  const formatedDate =
    typeof date === "string" || typeof date === "number"
      ? new Date(date).toLocaleString(locale, {
          hour12: hours12,
          hour: "numeric",
          minute: "numeric",
        })
      : undefined;
  if (formatedDate === "Invalid Date") return null;
  return <Text {...innerProps}>{formatedDate}</Text>;
};
