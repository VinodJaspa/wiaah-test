import React from "react";
import { useTranslation } from "react-i18next";
import {
  Modal,
  ModalContent,
  Switch,
  TimeData,
  ModalFooter,
  TimeSliderController,
  Button,
  useSpecialDaysOpenTimeModal,
  ModalOverlay,
} from "@UI";
import { hoursAday } from "utils";

export interface SpecialDaysOpenTimeModalProps {
  onScheduleComplete: (date: { dates: Date[]; range: TimeData[] }) => any;
  onClearSpeicalDays: (days: Date[]) => any;
}

export const SpecialDaysOpenTimeModal: React.FC<
  SpecialDaysOpenTimeModalProps
> = ({ onScheduleComplete, onClearSpeicalDays }) => {
  const [isWorkingDay, setIsWorkingDay] = React.useState<boolean>(true);
  const [workingRange, setWorkingRange] = React.useState<TimeData[]>([]);
  const { days, clear } = useSpecialDaysOpenTimeModal();
  const isOpen = days.length > 0;
const { t } = useTranslation();

  return (
    <Modal isOpen={isOpen} onOpen={() => { }} onClose={clear}>
      <ModalOverlay />
      <ModalContent className="flex  justify-center flex-col gap-4">
        <div className="flex flex-wrap justify-center text-xl">
          {days.map((date, i) => (
            <span
              className="bg-primary-50 px-4 py-2 rounded text-primary font-semibold"
              key={i}
            >
              {new Date(date).toLocaleDateString("en-us", {
                weekday: "long",
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
              })}
            </span>
          ))}
        </div>
        <div className="flex pt-6 pb-16 flex-col gap-2 items-center justify-center">
          <Switch
            checked={isWorkingDay}
            onChange={(checked) => setIsWorkingDay(checked)}
          />
          <p className="font-semibold text-2xl">
            {t("is_working_day", "Is working day")}?
          </p>
        </div>
        {isWorkingDay && (
          <TimeSliderController
            value={[new Date()]}
            openRanges={[
              {
                from: hoursAday[9].toString(),
                to: hoursAday[18].toString(),
              },
            ]}
            timeRange={hoursAday}
            onChange={(time: Date[]) => {
              setWorkingRange(
                time.map((t) => ({
                  from: new Date(t.setHours(t.getHours(), 0, 0, 0)).toString(),
                  to: new Date(
                    t.setHours(t.getHours() + 1, 0, 0, 0)
                  ).toString(),
                }))
              );
            }}
          />
        )}
        <ModalFooter className="mt-4">
          <Button
            onClick={() => {
              onClearSpeicalDays(days);

              clear();
            }}
            outline
          >
            {t("clear_special_day", "Clear special day")}
          </Button>
          <Button
            onClick={() => {
              onScheduleComplete({
                dates: days,
                range: workingRange,
              });
              clear();
            }}
          >
            {t("done", "done")}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
