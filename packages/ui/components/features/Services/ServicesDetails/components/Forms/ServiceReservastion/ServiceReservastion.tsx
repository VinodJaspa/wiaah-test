import { useBoundedCountState } from "hooks";
import React from "react";
import { useTranslation } from "react-i18next";
import { useRouting } from "routing";
import {
  DateInput,
  Menu,
  MenuList,
  MenuButton,
  Button,
  useGetServicesProviderQuery,
  useSearchFilters,
  MinusIcon,
  PlusIcon,
  InputGroup,
  InputSuggestions,
  ArrowDownIcon,
  BookedServicesCostDetails,
} from "ui";
import { getDaysDiff } from "utils";

export const ServiceReservastion: React.FC = () => {
  const { visit } = useRouting();
  const [checkin, SetCheckin] = React.useState<string>("");
  const [checkout, SetCheckout] = React.useState<string>("");
  const { filters } = useSearchFilters();
  const {
    data: res,
    isError,
    isLoading,
  } = useGetServicesProviderQuery(filters);

  const daysDiff: number = getDaysDiff(checkin, checkout) || 0;

  const { t } = useTranslation();

  return (
    <div className="p-4 bg-white rounded-lg gap-16 shadow h-full justify-between border-[1px] flex flex-col border-gray-300">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col rounded-lg border-2 border-gray-300">
          <div className="flex ">
            <Menu className="w-full">
              <MenuButton>
                <div className="cursor-pointer flex w-full flex-col px-4 py-2 border-b-gray-300 border-r-gray-300 border-b-2 border-r-2">
                  <p className="flex flex-col uppercase font-bold">
                    {t("check-in")}
                  </p>

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
              <MenuList>
                <DateInput onDaySelect={(date) => SetCheckin(date)} />
              </MenuList>
            </Menu>
            <Menu className="w-full">
              <MenuButton>
                <div className="cursor-pointer flex flex-col w-full border-b-2 border-b-gray-300 px-4 py-2">
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
              <MenuList>
                <DateInput onDaySelect={(date) => SetCheckout(date)} />
              </MenuList>
            </Menu>
          </div>
          <div className="flex flex-col">
            {(() => {
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
            })()}
          </div>
        </div>
        <Button className="py-4 ">{t("Book now")}</Button>
      </div>
      <BookedServicesCostDetails title="Rooms" vat={res?.data.vat || 0} />
    </div>
  );
};

export interface HotelGuestsInputProps {
  name: string;
  description: string;
  onCountChange: () => any;
}
export const HotelGuestsInput: React.FC<HotelGuestsInputProps> = ({
  description,
  name,
  onCountChange,
}) => {
  return (
    <div className="text-xl p-4 flex items-center w-full bg-white justify-between">
      <div className="flex flex-col gap-1">
        <p className="font-bold">{name || ""}</p>
        <p>{description || ""}</p>
      </div>
      <CountInput onCountChange={onCountChange} max={5} min={0} />
    </div>
  );
};

export interface CountInputProps {
  onCountChange: (count: number) => any;
  min?: number;
  max?: number;
}
export const CountInput: React.FC<CountInputProps> = ({
  onCountChange,
  max,
  min,
}) => {
  const { count, decrement, increment } = useBoundedCountState(min, max);

  React.useEffect(() => {
    onCountChange && onCountChange(count);
  }, [count]);

  return (
    <div className="whitespace-nowrap flex items-center gap-1">
      <MinusIcon
        className={`${count === min ? "opacity-50" : ""}`}
        onClick={() => decrement()}
      />
      <p className="w-10 select-none text-center whitespace-nowrap">{count}</p>
      <PlusIcon
        className={`${count === max ? "opacity-50" : ""}`}
        onClick={() => increment()}
      />
    </div>
  );
};
