import { Form, Formik } from "formik";
import React from "react";
import { useTranslation } from "react-i18next";
import { useRouting } from "routing";
import { useGetBookedServicesState } from "state";
import {
  useGetServicesProviderQuery,
  useSearchFilters,
  Divider,
  LocationIcon,
  Select,
  SelectOption,
  TwoPersonIcon,
  CalenderIcon,
  HStack,
  ArrowDownIcon,
  Menu,
  MenuList,
  MenuButton,
  DateInput,
  Button,
  BookedServicesCostDetails,
} from "ui";
import { isDate } from "utils";

export const ServiceReservastion: React.FC = () => {
  const { visit } = useRouting();

  const { bookedServices } = useGetBookedServicesState();
  const { filters } = useSearchFilters();
  const {
    data: res,
    isError,
    isLoading,
  } = useGetServicesProviderQuery(filters);

  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-[1.875rem]">
      <div
        style={{ boxShadow: "0px 0px 6px rgba(0, 0, 0, 0.2)" }}
        className="pt-5 pb-10 flex flex-col gap-4 rounded-[1.25rem]"
      >
        <p className="w-full text-center font-bold text-lg text-black">
          {t("Start booking hotel")}
        </p>
        <Divider />
        <Formik initialValues={{} as Record<string, any>} onSubmit={() => {}}>
          {({ values, setFieldValue }) => (
            <Form className="px-9 flex flex-col gap-[3.25rem]">
              <div className="flex items-center gap-8 justify-between">
                <div className="flex w-full flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <LocationIcon className="text-primary text-[1.25rem]" />
                    <p className="font-semibold text-base text-lightBlack">
                      {t("Location")}
                    </p>
                  </div>
                  <Select flushed>
                    <SelectOption className="px-[0]" value={"paris"}>
                      <p className="font-semibold text-lg">
                        {t("Paris") + ", " + t("france")}
                      </p>
                    </SelectOption>
                  </Select>
                </div>
                <div className="flex w-full flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <TwoPersonIcon className="text-primary fill-primary text-[1.25rem]" />
                    <p className="font-semibold text-base text-lightBlack">
                      {t("Guests")}
                    </p>
                  </div>
                  <Select flushed>
                    <SelectOption className="px-[0]" value={"paris"}>
                      <p className="font-semibold text-lg">
                        {`${4} ${t("Persons")}`}
                      </p>
                    </SelectOption>
                  </Select>
                </div>
              </div>

              <div className="flex items-center justify-between gap-8">
                <div className="flex flex-col w-full gap-1">
                  <HStack>
                    <CalenderIcon className="text-primary fill-primary text-[1.25rem] gap-1" />
                    <p className="text-lightBlack font-bold">{t("Check-in")}</p>
                  </HStack>

                  <Menu>
                    <MenuButton>
                      <div className="flex gap-1 px-2 justify-between items-center">
                        <p className="text-black font-semibold text-lg">
                          {isDate(values["checkin_date"])
                            ? new Date(
                                values["checkin_date"]
                              ).toLocaleDateString("en", {
                                dateStyle: "short",
                              })
                            : "dd/mm/yy"}
                        </p>
                        <ArrowDownIcon className="text-xl" />
                      </div>
                    </MenuButton>
                    <MenuList>
                      <DateInput
                        value={values["checkin_date"]}
                        onDaySelect={(date) => {
                          console.log("date", date);
                          setFieldValue("checkin_date", date);
                        }}
                      />
                    </MenuList>
                  </Menu>
                </div>

                <div className="flex flex-col w-full gap-1">
                  <HStack>
                    <CalenderIcon className="text-primary fill-primary text-[1.25rem] gap-1" />
                    <p className="text-lightBlack font-bold">
                      {t("Check-out")}
                    </p>
                  </HStack>

                  <Menu>
                    <MenuButton>
                      <div className="flex gap-1 px-2 justify-between items-center">
                        <p className="text-black font-semibold text-lg">
                          {isDate(values["checkout_date"])
                            ? new Date(
                                values["checkout_date"]
                              ).toLocaleDateString("en", {
                                dateStyle: "short",
                              })
                            : "dd/mm/yy"}
                        </p>
                        <ArrowDownIcon className="text-2xl" />
                      </div>
                    </MenuButton>
                    <MenuList>
                      <DateInput
                        value={values["checkout_date"]}
                        onDaySelect={(date) =>
                          setFieldValue("checkout_date", date)
                        }
                      />
                    </MenuList>
                  </Menu>
                </div>
              </div>
              <Button className="text-[1.375rem]">
                {t("Check availablity")}
              </Button>
            </Form>
          )}
        </Formik>
      </div>
      <div className="px-11">
        <BookedServicesCostDetails title="Rooms" vat={res?.data.vat || 0}>
          <div className="font-medium text-sm text-black flex justify-between items-center">
            <p>{t("Rooms")}</p>
            <p className="text-black text-sm font-medium text-opacity-50">
              {bookedServices.length}
            </p>
          </div>
        </BookedServicesCostDetails>
      </div>
    </div>
  );
};
