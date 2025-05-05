import React from "react";
import { useTranslation } from "react-i18next";
import { CountInput } from "@UI";
import { setTestid } from "utils";
type NightsStayDataType = { min: number; max: number };

export interface HoliydayRentalsBoundedStayNightsInputProps {
  value: NightsStayDataType;
  onChange: (data: NightsStayDataType) => any;
}

export const HoliydayRentalsBoundedStayNightsInput: React.FC<
  HoliydayRentalsBoundedStayNightsInputProps
> = ({ onChange, value = { min: 0, max: 0 } }) => {
const { t } = useTranslation();
  return (
    <div className="whitespace-nowrap flex flex-col sm:flex-row gap-4 items-center">
      <div className="border px-2 py-4 w-full rounded gap-4 flex justify-between">
        <p {...setTestid("minNightsText")}>
          {value.min} {t("min nights")}
        </p>
        <CountInput
          {...setTestid("minCountInput")}
          count={value.min}
          onCountChange={(count) =>
            onChange && onChange({ ...value, min: count })
          }
        />
      </div>
      <div className="border px-2 py-4 w-full rounded gap-4 flex justify-between">
        <p {...setTestid("maxNightsText")}>
          {value.max} {t("max nights")}
        </p>
        <CountInput
          {...setTestid("maxCountInput")}
          count={value.max}
          onCountChange={(count) =>
            onChange && onChange({ ...value, max: count })
          }
        />
      </div>
    </div>
  );
};
