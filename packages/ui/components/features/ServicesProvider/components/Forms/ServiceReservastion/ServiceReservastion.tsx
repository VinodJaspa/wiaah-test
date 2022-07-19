import React from "react";
import { useTranslation } from "react-i18next";
import {
  Select,
  SelectOption,
  DateInput,
  Menu,
  MenuList,
  MenuButton,
  Button,
  Divider,
  HStack,
  useGetServicesProviderQuery,
  useSearchFilters,
  SpinnerFallback,
  PriceDisplay,
} from "ui";
import { getDaysDiff } from "utils";

export const ServiceReservastion: React.FC = () => {
  const [checkin, SetCheckin] = React.useState<string>("");
  const [checkout, SetCheckout] = React.useState<string>("");
  const { filters } = useSearchFilters();
  const {
    data: res,
    isError,
    isLoading,
  } = useGetServicesProviderQuery(filters);

  const daysDiff: number = getDaysDiff(checkin, checkout) || 0;

  const total = res
    ? res.data.pricePerNight * daysDiff + res.data.serviceFee + res.data.taxes
    : 0;

  const { t } = useTranslation();

  return (
    <div className="p-4 rounded-lg shadow h-full justify-between border-[1px] flex flex-col border-gray-300">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col rounded-lg border-2 border-gray-300">
          <div className="flex ">
            <Menu className="w-full">
              <MenuButton>
                <div className="flex w-full flex-col p-4 border-b-gray-300 border-r-gray-300 border-b-2 border-r-2">
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
                <div className="flex flex-col w-full border-b-2 border-b-gray-300 p-4">
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
          <div className="flex flex-col py-2">
            <p className="font-bold px-4">{t("guests")}</p>
            <Select className="border-[0px]">
              {[...Array(10)].map((_, i) => (
                <SelectOption value={i + 1}>
                  <p>
                    {i + 1} {t("guest")}
                  </p>
                </SelectOption>
              ))}
            </Select>
          </div>
        </div>
        <Button>{t("Reserve")}</Button>
      </div>
      <div className="flex flex-col">
        <SpinnerFallback isLoading={isLoading} isError={isError}>
          <div className="flex flex-col gap-2 text-lg font-semibold">
            <HStack className={"justify-between underline"}>
              <span className="flex whitespace-nowrap">
                <PriceDisplay
                  priceObject={{ amount: res?.data.pricePerNight || 0 }}
                />{" "}
                x {daysDiff || 0} {t("nights")}
              </span>
            </HStack>
            <HStack className={"justify-between"}>
              <p>{t("Service fee")}</p>
              <PriceDisplay
                priceObject={{ amount: res?.data.serviceFee || 0 }}
              />
            </HStack>
            <HStack className={"justify-between"}>
              <p>{t("Occupancy taxes and fees")}</p>
              <PriceDisplay priceObject={{ amount: res?.data.taxes || 0 }} />
            </HStack>
          </div>
          <Divider className="my-4 border-[1px] border-gray-300" />
          <HStack className="justify-between font-bold text-lg">
            <p>{t("Total")}</p>
            <PriceDisplay priceObject={{ amount: total }} />
          </HStack>
        </SpinnerFallback>
      </div>
    </div>
  );
};
