import React from "react";
import { useTranslation } from "react-i18next";
import { MdClose, MdArrowLeft, MdArrowRight } from "react-icons/md";
import { Spacer, Button, Divider } from "ui";
import { getTimeInAmPm } from "ui/components/helpers/getTimeInAmPm";

export interface ServiceBookingCalanderProps {
  month: Month;
  onNextMonthReq?: () => void;
  onPrevMonthReq?: () => void;
  onClose?: () => void;
  onSuccess?: (event: Event) => void;
}

export interface Month {
  name: string;
  firstDayName: "Su" | "Mo" | "Tu" | "We" | "Th" | "Fr" | "Sa";
  year: number;
  number: number;
  lastMonthDaysNum: number;
  daysNum: number;
  events: Event[];
}

export interface Event {
  id: string;
  name: string;
  from: string;
  to: string;
  day: number;
  availablity: boolean;
}

interface FormatedDays {
  dayNum: number;
  currentMonth: boolean;
}

const weekDays = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

export const ServiceBookingCalander: React.FC<ServiceBookingCalanderProps> = ({
  month,
  onClose,
  onSuccess,
  onNextMonthReq,
  onPrevMonthReq,
}) => {
  const [activeDay, setActiveDay] = React.useState<number>();
  const [events, setEvents] = React.useState<Event[]>([]);
  const [allDays, setAllDays] = React.useState<FormatedDays[]>(getDays());
  const [activeEvent, setActiveEvent] = React.useState<Event>();
  const [DividedWeeks, setDividedWeeks] = React.useState<FormatedDays[][]>([]);
  const { t } = useTranslation();

  React.useEffect(() => {
    getDividedWeeks();
  }, [allDays]);

  React.useEffect(() => {
    setActiveEvent(undefined);
  }, [events]);

  function getDays(): FormatedDays[] {
    const firstDayOffset = weekDays.findIndex(
      (day) => day === month.firstDayName
    );
    const lastMonthDays: FormatedDays[] = [...Array(firstDayOffset)]
      .map((_, i) => ({
        currentMonth: false,
        dayNum: month.lastMonthDaysNum - i,
      }))
      .reverse();

    const currentMonthDays: FormatedDays[] = [...Array(month.daysNum)].map(
      (_, i) => ({
        currentMonth: true,
        dayNum: i + 1,
      })
    );

    const LastAndCurrentDays: FormatedDays[] = [
      ...lastMonthDays,
      ...currentMonthDays,
    ];
    const NextMonthDaysNum: number =
      weekDays.length - (LastAndCurrentDays.length % weekDays.length);

    const nextMonthDays: FormatedDays[] = [...Array(NextMonthDaysNum)].map(
      (_, i) => ({
        currentMonth: false,
        dayNum: i + 1,
      })
    );

    const allDays = [...lastMonthDays, ...currentMonthDays, ...nextMonthDays];
    return allDays;
  }

  const getDividedWeeks: () => void = React.useCallback(() => {
    let array: FormatedDays[][] = [];
    let currentPhase = 0;
    while (currentPhase * 7 < allDays.length) {
      const sliced = [
        ...allDays.slice(currentPhase * 7, (currentPhase + 1) * 7),
      ];
      array.push(sliced);
      currentPhase++;
    }
    setDividedWeeks(array);
  }, [allDays]);

  function handleClose() {
    if (onClose) {
      onClose();
    }
  }

  function handleSetActiveEvent(event: Event) {
    setActiveEvent(event);
  }

  function handleCancelEvent() {
    setActiveEvent(undefined);
  }

  function handleNextMonth() {
    if (onNextMonthReq) {
      onNextMonthReq();
    }
  }

  function handlePrevMonth() {
    if (onPrevMonthReq) {
      onPrevMonthReq();
    }
  }

  function handleSubmitEvent() {
    if (!activeEvent || !onSuccess) return;
    onSuccess(activeEvent);
    handleCancelEvent();
  }

  React.useEffect(() => {
    const currentActiveDayEvents: Event[] = month.events.filter(
      (event) => event.day === activeDay
    );
    setEvents(currentActiveDayEvents);
  }, [activeDay]);

  return (
    <section className="h-fit w-[35rem] bg-white p-4">
      <div className="flex items-center justify-between">
        <div className="">{t("Booek Event", "Book Event")}</div>
        <div
          id="CalanderClose"
          onClick={handleClose}
          className="cursor-pointer"
        >
          <MdClose />
        </div>
      </div>
      <Spacer spaceInRem={2} />
      <div className="">
        {/* calander */}
        <div className="flex items-center justify-between px-4">
          <div onClick={handlePrevMonth} className="text-3xl">
            <MdArrowLeft />
          </div>

          <div className="flex gap-2 font-bold">
            {/* month and year */}
            <span>{month.name}</span>
            <span>{month.year}</span>
          </div>

          <div onClick={handleNextMonth} className="text-3xl">
            <MdArrowRight />
          </div>
        </div>

        <div>
          {/* calander grid */}
          <table className="w-full">
            <th className="flex w-full justify-between">
              {weekDays.map((day, weekIndex) => (
                <td
                  key={weekIndex}
                  className="flex w-full items-center justify-center"
                >
                  {day}
                </td>
              ))}
            </th>
            <tbody className="">
              {DividedWeeks.map((week, weekIndex) => (
                <tr
                  key={weekIndex}
                  className="flex items-center justify-between"
                >
                  {week.map(({ currentMonth, dayNum }, dayIndex) => (
                    <td
                      key={dayIndex}
                      onClick={() => {
                        if (!currentMonth) return;
                        setActiveDay(dayNum);
                      }}
                      className={`${
                        currentMonth
                          ? "cursor-pointer"
                          : "cursor-not-allowed text-gray-400"
                      } ${
                        activeDay === dayNum && currentMonth
                          ? "bg-blue-600 text-white"
                          : ""
                      } flex w-full items-center justify-center`}
                    >
                      <span>{dayNum}</span>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-center font-semibold">
          {getTimeInAmPm(new Date())}
        </div>

        <Divider />
        {activeDay && (
          <div>
            <div className="font-bold">
              {/* date */}
              <span>{`${month.number}/${activeDay}/${month.year}`}</span>
            </div>
            <div className="flex flex-col gap-2">
              {/* evemts  */}
              {events.length > 0
                ? events.map((event, i) => (
                    <div
                      key={i}
                      className={`${
                        activeEvent && activeEvent.id === event.id
                          ? "bg-gray-200"
                          : "bg-white"
                      } flex w-full cursor-pointer justify-between rounded p-4 shadow`}
                    >
                      <div
                        onClick={() => handleSetActiveEvent(event)}
                        className="flex w-full gap-4"
                      >
                        <div className="flex flex-col">
                          {/* from, to */}
                          <span className="font-bold">
                            {getTimeInAmPm(new Date(event.from))}
                          </span>

                          <span className="">
                            {getTimeInAmPm(new Date(event.to))}
                          </span>
                        </div>
                        <div className="flex flex-col">
                          <span className="font-bold">
                            {event.availablity ? "Available" : "Unavailable"}
                          </span>
                          <span className="font-semibold">{event.name}</span>
                        </div>
                      </div>
                      {activeEvent && activeEvent.id === event.id ? (
                        <div
                          onClick={() => handleCancelEvent()}
                          className="p-4"
                        >
                          <MdClose />
                        </div>
                      ) : null}
                    </div>
                  ))
                : "No events for this day"}
            </div>
          </div>
        )}
        <Spacer />
        <div className="flex w-full items-center justify-center">
          <div
            className={`${
              activeEvent
                ? "cursor-pointer opacity-100"
                : "cursor-not-allowed opacity-50"
            } max-w-40`}
          >
            <Button
              onClick={() => handleSubmitEvent()}
              text={t("Confirm_Booking", "Confirm Booking")}
              fontSizeInRem={1}
              customClasses={
                activeEvent ? "cursor-pointer" : "cursor-not-allowed"
              }
            />
          </div>
        </div>
      </div>
    </section>
  );
};
