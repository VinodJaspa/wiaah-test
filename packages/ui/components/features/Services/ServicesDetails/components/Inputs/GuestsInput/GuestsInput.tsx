import React from "react";
import { useTranslation } from "react-i18next";
import {
  InputGroup,
  ArrowDownIcon,
  HotelGuestsInput,
  InputSuggestions,
} from "ui";
export interface GuestsInputProps {}

export const GuestsInput: React.FC<GuestsInputProps> = () => {
  const { t } = useTranslation();
  const [guests, setGuests] = React.useState<number>(0);
  return (
    <InputGroup>
      {({ setFocused }) => (
        <p
          onClick={() => setFocused(true)}
          className="relative cursor-pointer w-full font-bold text-lg uppercase p-4"
        >
          {guests} {t("guests")}
          <ArrowDownIcon className="absolute top-1/2 right-4 text-lg -translate-y-1/2" />
        </p>
      )}
      <InputSuggestions className="shadow border text-4xl border-gray-200 overflow-x-hidden thinScroll">
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
      </InputSuggestions>
    </InputGroup>
  );
};
