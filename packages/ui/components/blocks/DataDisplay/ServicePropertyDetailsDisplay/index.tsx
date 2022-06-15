import React from "react";
import { useTranslation } from "react-i18next";
import { PropertyDetailsType } from "types";
import {
  HStack,
  MathPowerDisplay,
  PersonIcon,
  PropertyDimensionsIcon,
} from "ui";

export interface ServicePropertyDetailsDisplayProps
  extends PropertyDetailsType {}

export const ServicePropertyDetailsDisplay: React.FC<ServicePropertyDetailsDisplayProps> =
  ({ residentsCapacity, size }) => {
    const { t } = useTranslation();
    return (
      <div className="flex items-center gap-4 flex-wrap">
        {typeof residentsCapacity === "object" ? (
          <HStack>
            <PersonIcon />
            {t("maximum")} : {residentsCapacity.max}{" "}
            {residentsCapacity?.residentType === "adults"
              ? t("adults")
              : residentsCapacity.residentType === "children"
              ? t("childrens")
              : null}
          </HStack>
        ) : null}
        {typeof size === "object" ? (
          <HStack>
            <PropertyDimensionsIcon /> {size.inMeter}
            <MathPowerDisplay power={2}>{t("m")}</MathPowerDisplay>/
            {size.inFeet}
            <MathPowerDisplay power={2}>{t("ft")}</MathPowerDisplay>
          </HStack>
        ) : null}
      </div>
    );
  };
