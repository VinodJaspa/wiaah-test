import React from "react";
import { useTranslation } from "react-i18next";
import {
  BookingAppointement,
  HtmlDivProps,
  TabsTabType,
  TranslationTextType,
} from "types";
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
  Tabs,
  TabsHeader,
  TabTitle,
  TranslationText,
} from "ui";
import {
  FormatedDays,
  getDividedWeeks,
  getHistoryMonths,
  getMonthDays,
  HistoryMonth,
  weekDays,
} from "utils";
import { BookingsSectionCtx } from ".";
import { useGetAppointmentsQuery } from "@src/Hooks";

type BookingsObjectType = Record<string, BookingAppointement[]>;

export interface BookingCalenderSectionProps {}

export const BookingsCalenderSection: React.FC<
  BookingCalenderSectionProps
> = () => {
  const { t } = useTranslation();
  const { setBookId } = React.useContext(BookingsSectionCtx);
  const [days, setDays] = React.useState<FormatedDays[]>([]);
  const [bookings, setBookings] = React.useState<BookingsObjectType>();
  const [date, setDate] = React.useState<{ year: number; month: number }>({
    year: new Date(Date.now()).getFullYear(),
    month: new Date(Date.now()).getMonth(),
  });

  const { data: FetchedBookings, isLoading: BookingIsLoading } =
    useGetAppointmentsQuery();

  React.useEffect(() => {
    if (!FetchedBookings) return;
    const res: BookingsObjectType = FetchedBookings.reduce((acc, curr) => {
      const day = new Date(curr.date).getDate();
      const newObj = { ...acc };

      newObj[day] =
        typeof newObj[day] !== "undefined" ? [...newObj[day], curr] : [curr];
      return newObj;
    }, {} as BookingsObjectType);
    setBookings(res);
  }, [FetchedBookings]);

  React.useEffect(() => {
    if (date) {
      setDays(getMonthDays(date.year, date.month));
    }
  }, [date]);
  return (
    <div className="flex flex-col gap-4">
      <SectionHeader sectionTitle={t("my_appointments", "My Appointments")} />
      <div className="flex flex-col gap-4">
        <Tabs>
          <div className="flex justify-between">
            <TabsHeader>
              {BookingPeriodFilterTabsTitles.map((title, i) => (
                <TabTitle TabKey={i}>
                  {({ currentTabIdx }) => (
                    <TranslationText
                      className={`${
                        currentTabIdx === i
                          ? "border-b-2 border-primary pb-2 text-primary"
                          : ""
                      }`}
                      translationObject={title}
                      key={i}
                    />
                  )}
                </TabTitle>
              ))}
            </TabsHeader>
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
              TdProps={{ className: "border-gray-200 border-2 h-[8rem]" }}
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
                      const daysBookings = bookings
                        ? bookings[day.dayNum]
                        : null;
                      return (
                        <Td
                          className={`${
                            day.currentMonth
                              ? "text-black font-bold"
                              : "text-gray-400 text-semibold"
                          } min-w-[8rem] min-h-[8rem]`}
                          valign="baseline"
                          key={i}
                        >
                          <span className="w-full flex justify-end">
                            {day.dayNum}
                          </span>
                          {daysBookings &&
                            day.currentMonth &&
                            daysBookings.map(({ bookId, ...rest }, i) => (
                              <BookedDayCard
                                className="cursor-pointer"
                                onClick={() => setBookId(bookId)}
                                cardDetails={{ ...rest, bookId }}
                                key={i}
                              />
                            ))}
                        </Td>
                      );
                    })}
                  </Tr>
                ))}
              </TBody>
            </Table>
          </TableContainer>
        </Tabs>
      </div>
    </div>
  );
};

const BookingPeriodFilterTabsTitles: TranslationTextType[] = [
  {
    translationKey: "month",
    fallbackText: "Month",
  },
  {
    translationKey: "week",
    fallbackText: "Week",
  },
  { translationKey: "day", fallbackText: "Day" },
];

export interface BookedDayCardProps extends HtmlDivProps {
  cardDetails: BookingAppointement;
}

export const BookedDayCard: React.FC<BookedDayCardProps> = ({
  cardDetails: {
    customer,
    customerPhoto,
    date,
    email,
    from,
    phone,
    service,
    to,
    verified,
  },
  className,
  ...props
}) => {
  return (
    <div
      {...props}
      className={`${
        className || ""
      } bg-red-200 p-2 flex flex-col gap-1 rounded font-normal`}
    >
      <div>
        <span>
          {new Date(from).toLocaleTimeString("en-us", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          })}
        </span>
        {" - "}
        <span>
          {new Date(to).toLocaleTimeString("en-us", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          })}
        </span>
      </div>
      <div>{customer}</div>
      <div>{email}</div>
      <div>{phone}</div>
      <div>{service}</div>
      <HStack>
        <Avatar className="w-8 h-8" src={customerPhoto} />
        <span>{customer}</span>
        {verified ? <Verified className="text-primary-500 text-lg" /> : null}
      </HStack>
    </div>
  );
};

const bookingTabs: TabsTabType[] = [
  {
    tabTitle: {
      translationKey: "month",
      fallbackText: "Month",
    },
    tabItem: <></>,
  },
];
