import React from "react";
import { useTranslation } from "react-i18next";
import { TabsTabType } from "types";
import {
  SectionHeader,
  Select,
  SelectOption,
  Table,
  TBody,
  THead,
  Tr,
  Th,
  Td,
  TableContainer,
  Avatar,
  HStack,
  Verified,
} from "ui";
import {
  FormatedDays,
  getDividedWeeks,
  getHistoryMonths,
  getMonthDays,
  HistoryMonth,
  weekDays,
} from "utils";
const test = {
  from: new Date(Date.now()).toString(),
  to: new Date(Date.now()).toString(),
  customer: "cutstomer name",
  email: "customer@test.com",
  phone: "132456832",
  date: new Date(Date.now()).toString(),
  service: "back pain treatment",
  customerPhoto: "",
  verified: true,
};

type BookingAppointement = typeof test;

export interface BookingsSectionProps {}

export const BookingsSection: React.FC<BookingsSectionProps> = () => {
  const { t } = useTranslation();
  const [days, setDays] = React.useState<FormatedDays[]>([]);
  const [bookings, setBookings] =
    React.useState<Record<string, BookingAppointement[]>>();
  const [date, setDate] = React.useState<{ year: number; month: number }>();

  React.useEffect(() => {
    const res: Record<string, BookingAppointement[]> = Bookings.reduce(
      (acc, curr) => {
        const day = new Date(curr.date).getDate();
        const newObj = { ...acc };

        newObj[day] =
          typeof newObj[day] !== "undefined" ? [...newObj[day], curr] : [curr];
        return newObj;
      },
      {}
    );
    setBookings(res);
  }, []);

  React.useEffect(() => {
    if (date) {
      setDays(getMonthDays(date.year, date.month));
    }
  }, [date]);
  return (
    <div className="flex flex-col gap-4">
      <SectionHeader sectionTitle={t("booking", "Booking")} />
      <div className="flex flex-col gap-4">
        <div className="flex justify-center">
          <Select<HistoryMonth>
            onOptionSelect={(v) => {
              setDate({ year: v.year, month: v.monthIdx });
            }}
            className="text-xl font-bold"
          >
            {getHistoryMonths().map(({ monthName, year, monthIdx }, i) => (
              <SelectOption
                className="font-semibold px-2"
                key={i}
                value={{ monthName, year, monthIdx }}
              >
                {monthName} {year}
              </SelectOption>
            ))}
          </Select>
        </div>
        <TableContainer>
          <Table
            TdProps={{ className: "border-gray-200 border-y-2" }}
            className="w-full"
          >
            <THead>
              <Tr>
                {weekDays.map((day, i) => (
                  <Th key={i}>{day}</Th>
                ))}
              </Tr>
            </THead>
            <TBody>
              {getDividedWeeks(days).map((week, i) => (
                <Tr key={i}>
                  {week.map((day, i) => {
                    const daysBookings = bookings ? bookings[day.dayNum] : null;
                    return (
                      <Td
                        className={`${
                          day.currentMonth
                            ? "text-black font-bold"
                            : "text-gray-400 text-semibold"
                        } min-w-[8rem] min-h-[4rem]`}
                        valign="baseline"
                        key={i}
                      >
                        <span className="w-full flex justify-end">
                          {day.dayNum}
                        </span>
                        {daysBookings &&
                          day.currentMonth &&
                          daysBookings.map((day, i) => (
                            <div
                              key={i}
                              className="bg-red-200 p-2 flex flex-col gap-1 rounded font-normal"
                            >
                              <div>
                                <span>
                                  {new Date(day.from).toLocaleTimeString(
                                    "en-us",
                                    {
                                      hour: "2-digit",
                                      minute: "2-digit",
                                      hour12: true,
                                    }
                                  )}
                                </span>
                                {" - "}
                                <span>
                                  {new Date(day.to).toLocaleTimeString(
                                    "en-us",
                                    {
                                      hour: "2-digit",
                                      minute: "2-digit",
                                      hour12: true,
                                    }
                                  )}
                                </span>
                              </div>
                              <div>{day.customer}</div>
                              <div>{day.email}</div>
                              <div>{day.phone}</div>
                              <div>{day.service}</div>
                              <HStack>
                                <Avatar
                                  className="w-8 h-8"
                                  src={day.customerPhoto}
                                />
                                <span>{day.customer}</span>
                                {day.verified ? (
                                  <Verified className="text-primary-500 text-lg" />
                                ) : null}
                              </HStack>
                            </div>
                          ))}
                      </Td>
                    );
                  })}
                </Tr>
              ))}
            </TBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

const Bookings: BookingAppointement[] = [
  {
    from: new Date(Date.now()).toString(),
    to: new Date(Date.now()).toString(),
    customer: "cutstomer",
    email: "customer@test.com",
    phone: "132456832",
    date: new Date(Date.UTC(2022, 5, 30)).toString(),
    service: "back pain treatment",
    customerPhoto: "/shop.jpeg",
    verified: true,
  },
];

const bookingTabs: TabsTabType[] = [
  {
    tabTitle: {
      translationKey: "month",
      fallbackText: "Month",
    },
    tabItem: <></>,
  },
];
