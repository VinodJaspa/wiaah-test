import React from "react";
import { useTranslation } from "react-i18next";
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
  useGetMyAppointmentsQuery,
  Clickable,
  Image,
} from "@UI";
import {
  BookedService,
  Maybe,
  MyBookingsSearchPeriod,
  Profile,
} from "@features/API";
import {
  AddToDate,
  FormatedDays,
  getDividedWeeks,
  getMonthDays,
  weekDays,
} from "utils";
import { BookingsSectionCtx } from ".";

export interface BookingCalenderSectionProps {}

export const BookingsCalenderSection: React.FC<
  BookingCalenderSectionProps
> = () => {
  const { t } = useTranslation();
  const { setBookId } = React.useContext(BookingsSectionCtx);
  const [days, setDays] = React.useState<FormatedDays[]>([]);
  const [date, setDate] = React.useState<Date>(new Date());
  const [period, setPeriod] = React.useState<MyBookingsSearchPeriod>(
    MyBookingsSearchPeriod.Month
  );

  const { data } = useGetMyAppointmentsQuery({
    date: date.toString(),
    searchPeriod: period,
  });

  const [bookings, setBookings] = React.useState<Record<string, typeof data>>(
    {}
  );

  React.useEffect(() => {
    if (!data) return;
    const res: typeof bookings = data.reduce((acc, curr) => {
      const day = new Date(curr.checkin).getDate();
      const newObj = { ...acc };

      newObj[day] =
        typeof newObj[day] !== "undefined"
          ? [...(newObj[day] || []), curr]
          : [curr];
      return newObj;
    }, {} as typeof bookings);
    setBookings(res);
  }, [data]);

  React.useEffect(() => {
    if (date) {
      setDays(getMonthDays(date.getFullYear(), date.getMonth()));
    }
  }, [date]);
  return (
    <div className="flex flex-col gap-4">
      <SectionHeader sectionTitle={t("my_appointments", "My Appointments")} />
      <div className="flex flex-col gap-4">
        <Tabs>
          <div className="flex justify-between">
            <TabsHeader>
              {Object.values(MyBookingsSearchPeriod).map((title, i) => (
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
            <Select<Date>
              onOptionSelect={(v) => {
                setDate(v);
              }}
              className="text-xl font-bold"
            >
              {[...Array(36)]
                .map(
                  (_, i) =>
                    new Date(new Date().setMonth(new Date().getMonth() + i))
                )
                .map((date, i) => (
                  <SelectOption
                    className="font-semibold px-2"
                    key={i}
                    value={date}
                  >
                    {date.toLocaleDateString("en-us", { month: "short" })}{" "}
                    {date.getFullYear()}
                  </SelectOption>
                ))}
            </Select>
          </div>
        </Tabs>

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
                    const daysBookings = bookings ? bookings[day.dayNum] : null;
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
                          daysBookings.map(({ id, ...rest }, i) => (
                            <Clickable onClick={() => setBookId(id)}>
                              <BookedDayCard
                                cardDetails={{ ...rest, id }}
                                key={i}
                              />
                            </Clickable>
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

export interface BookedDayCardProps {
  cardDetails: Pick<
    BookedService,
    "checkin" | "checkout" | "duration" | "id"
  > & {
    buyer?: Maybe<
      Pick<BookedService["buyer"], "email" | "phone"> & {
        profile?: Maybe<Pick<Profile, "verified" | "username" | "photo">>;
      }
    >;
    service?: Maybe<Pick<BookedService["service"], "title">>;
  };
}

export const BookedDayCard: React.FC<BookedDayCardProps> = ({
  cardDetails: { checkin, checkout, duration, buyer, service },
}) => {
  const serviceTitle = service?.title;

  return (
    <div className={`bg-red-200 p-2 flex flex-col gap-1 rounded font-normal`}>
      <div>
        <span>
          {new Date(checkin).toLocaleTimeString("en-us", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          })}
        </span>
        {checkout || typeof duration === "number" ? (
          <>
            {" - "}
            <span>
              {new Date(
                checkout
                  ? checkout
                  : AddToDate(new Date(checkin), { minutes: duration! })
              ).toLocaleTimeString("en-us", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
              })}
            </span>
          </>
        ) : null}
      </div>
      <div>{buyer?.profile?.username}</div>
      <div>{buyer?.email}</div>
      <div>{buyer?.phone}</div>
      <div>{serviceTitle}</div>
      <HStack>
        <Image
          className="w-8 h-8 rounded-full object-coverj"
          alt={buyer?.profile?.username}
          src={buyer?.profile?.photo}
        />
        <span>{buyer?.profile?.username}</span>
        {buyer?.profile?.verified ? (
          <Verified className="text-primary-500 text-lg" />
        ) : null}
      </HStack>
    </div>
  );
};
