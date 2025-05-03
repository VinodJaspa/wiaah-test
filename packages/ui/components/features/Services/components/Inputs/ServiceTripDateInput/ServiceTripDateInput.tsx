import { useDateDiff } from "hooks";
import React from "react";
import { useTranslation } from "react-i18next";
import { DateDetails, runIfFn } from "utils";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  CheckInOutInput,
  DateInput,
  AspectRatio,
  Button,
  GuestsInput,
} from "@UI";

export interface ServiceTripDateInputProps {}

export const ServiceTripDateInput: React.FC<ServiceTripDateInputProps> = () => {
const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-6">
      <p className="text-3xl">{t("Trip date")}</p>
      <div className="flex justify-between">
        {(() => {
          const [edit, setEdit] = React.useState<boolean>(false);
          const [dates, setDates] = React.useState<
            | {
                from: Date;
                to: Date;
              }
            | undefined
          >({
            from: new Date(),
            to: new Date(),
          });
          const days = dates
            ? useDateDiff({
                from: dates.from,
                to: dates.to,
              }).days
            : 0;

          const datesDisplay = dates
            ? () => {
                const checkin = DateDetails(dates.from);
                const checkout = DateDetails(dates.to);

                if (!checkin || !checkout) return null;

                const sameMonth = checkin.month_short === checkout.month_short;

                return (
                  <p>
                    {checkin.day} {sameMonth ? null : `${checkin.month_short} `}
                    -{checkout.day} {checkout.month_short}
                  </p>
                );
              }
            : null;

          const handleClearDates = () => {
            setDates(undefined);
          };

          return (
            <>
              <div className="flex flex-col gap-1">
                <p className="font-bold">{t("Dates")}</p>
                {runIfFn(datesDisplay)}
              </div>
              <Modal
                isOpen={edit}
                onClose={() => setEdit(false)}
                onOpen={() => setEdit(true)}
              >
                <ModalOverlay />
                <ModalContent className="w-[min(50rem,100%)] flex flex-col gap-8">
                  <div className="flex flex-col gap-2 w-full items-center">
                    <CheckInOutInput
                      onDatesChange={() => {}}
                      active={false}
                      checkin={dates ? dates.from : undefined}
                      checkout={dates ? dates.to : undefined}
                    />
                    <p className="font-bold">
                      {days} {t("nights")}
                    </p>
                  </div>
                  <div className="flex gap-8 justify-between">
                    <div className="w-full flex flex-col items-center">
                      <p className="font-bold">{t("Check-in")}</p>
                      <DateInput
                        className="w-[100%]"
                        dayComponent={({ active, currentMonth, dayNum }) => (
                          <AspectRatio ratio={1}>
                            <div
                              className={`${
                                active
                                  ? "text-white bg-primary"
                                  : currentMonth
                                    ? "text-black bg-white"
                                    : "text-gray-500"
                              } w-full cursor-pointer rounded h-full flex justify-center items-center`}
                            >
                              {dayNum}
                            </div>
                          </AspectRatio>
                        )}
                        onDaySelect={(date) =>
                          setDates((state) => ({
                            ...state,
                            from: new Date(date),
                          }))
                        }
                      />
                    </div>
                    <div className="w-full flex flex-col items-center">
                      <p className="font-bold">{t("Check-out")}</p>
                      <DateInput
                        className="w-[100%]"
                        dayComponent={({ active, currentMonth, dayNum }) => (
                          <AspectRatio ratio={1}>
                            <div
                              className={`${
                                active
                                  ? "text-white bg-primary"
                                  : currentMonth
                                    ? "text-black bg-white"
                                    : "text-gray-500"
                              } w-full cursor-pointer rounded h-full flex justify-center items-center`}
                            >
                              {dayNum}
                            </div>
                          </AspectRatio>
                        )}
                        onDaySelect={(date) =>
                          setDates((state) => ({
                            ...state,
                            to: new Date(date),
                          }))
                        }
                      />
                    </div>
                  </div>
                  <div className="w-full flex justify-between items-center">
                    <p
                      className="font-semibold text-primary underline cursor-pointer"
                      onClick={handleClearDates}
                    >
                      {t("Clear dates")}
                    </p>
                    <Button>{t("Save")}</Button>
                  </div>
                </ModalContent>
              </Modal>
              <p
                onClick={() => setEdit(true)}
                className="cursor-pointer underline font-bold"
              >
                {t("Edit")}
              </p>
            </>
          );
        })()}
      </div>
      <div className="flex justify-between">
        {(() => {
          const [edit, setEdit] = React.useState<boolean>(false);
          return (
            <>
              <div className="flex flex-col gap-1">
                <p className="font-bold">{t("Guests")}</p>
                <p>1 {t("guest")}</p>
              </div>
              <Modal
                isOpen={edit}
                onClose={() => setEdit(false)}
                onOpen={() => setEdit(true)}
              >
                <ModalOverlay />
                <ModalContent>
                  <GuestsInput
                    onChange={() => {}}
                    value={{ adults: 0, childrens: 0, infants: 0 }}
                  />
                </ModalContent>
              </Modal>

              <p
                onClick={() => setEdit(true)}
                className="cursor-pointer underline font-bold"
              >
                {t("Edit")}
              </p>
            </>
          );
        })()}
      </div>
    </div>
  );
};
