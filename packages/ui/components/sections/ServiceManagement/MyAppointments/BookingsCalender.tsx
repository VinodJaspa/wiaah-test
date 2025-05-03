import * as React from "react";
import { useTranslation } from "react-i18next";
import {
  SectionHeader,
  HStack,
  useGetMyAppointmentsQuery,
  Modal,
  ModalOverlay,
  ModalContent,
  Table,
  THead,
  Tr,
  Th,
  TBody,
  Td,
  WeekSwitcher,
  useResponsive,
  ArrowLeftIcon,
  AspectRatio,
  DotIcon,
} from "@UI";
import { ServiceType } from "@features/API";
import {
  getMonthCalenderDays,
  isDate,
  isSameDay,
  mapArray,
  randomNum,
  runIfFn,
  useForm,
  weekDayLong,
} from "utils";
import { BookDetailsSection, BookingsSectionCtx } from ".";
import { ArrElement } from "@UI/../types/src";
import { BiCalendar } from "react-icons/bi";
import { FaClock } from "react-icons/fa";
import { BsFillInfoCircleFill } from "react-icons/bs";

export interface BookingCalenderSectionProps { }

const contrastColors = ["#00BCD4"];

export const BookingsCalenderSection: React.FC<
  BookingCalenderSectionProps
> = () => {
const { t } = useTranslation();
  const { isMobile } = useResponsive();
  const [now] = React.useState(new Date());
  const [activeWeek, setActiveWeek] = React.useState(0);
  const [bookDetailsId, setBookDetialsId] = React.useState<string>();
  const { form } = useForm<Parameters<typeof useGetMyAppointmentsQuery>[0]>({
    date: get1stWeekDate(now),
    days: 7,
  });

  const {
    data,
    fetchNextPage,
    fetchPreviousPage,
    isFetchingNextPage,
    isFetchingPreviousPage,
  } = useGetMyAppointmentsQuery(form, {
    getNextPageParam: (data) => {
      try {
        return {
          date: get1stWeekDate(
            new Date(
              new Date(data.date).setDate(
                new Date(data.date).getDate() + data.days
              )
            )
          ),
          days: 7,
        } as Parameters<typeof useGetMyAppointmentsQuery>[0];
      } catch (error) {
        return data;
      }
    },
    getPreviousPageParam: (data) => {
      try {
        return {
          date: get1stWeekDate(
            new Date(
              new Date(data.date).setDate(
                new Date(data.date).getDate() - data.days
              )
            )
          ),
          days: 7,
        } as Parameters<typeof useGetMyAppointmentsQuery>[0];
      } catch (error) {
        return data;
      }
    },
    onSuccess(data) {
      data.pageParams;
    },
  });

  function get1stWeekDate(date: Date) {
    return new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate() + date.getDay(),
      0,
      0,
      0
    ).toString();
  }

  const pages = data?.pages!;

  function bookings(
    page: ArrElement<typeof pages>
  ): [string, (typeof page)["data"]][] {
    return Object.entries(
      [...Array(7)].reduce((acc, _, i) => {
        const bookings = page?.data?.filter((v) => {
          const valid = !isNaN(new Date(v.checkin).getTime());
          if (!valid) return false;

          const date = new Date(v.checkin).getDate();

          return date === new Date(page.cursor!).getDate() + i;
        });

        const day =
          new Date(page?.cursor || get1stWeekDate(new Date())).getDate() + i;

        return { ...acc, [day]: bookings };
      }, {} as Record<number, (typeof page)["data"]>)
    );
  }

  return isMobile ? (
    <div className="flex flex-col gap-6">
      <HStack className="relative justify-center">
        <p>{t("My Appointments")}</p>
        <ArrowLeftIcon className="absolute left-1" />
      </HStack>
    </div>
  ) : (
    <div className="flex flex-col w-full gap-4">
      <Modal
        isOpen={!!bookDetailsId}
        onClose={() => setBookDetialsId(undefined)}
      >
        <ModalOverlay></ModalOverlay>
        <ModalContent className="w-[95vw]">
          <BookDetailsSection
            bookId={bookDetailsId || ""}
            onGoBack={() => {
              setBookDetialsId(undefined);
            }}
          />
        </ModalContent>
      </Modal>
      <SectionHeader sectionTitle={t("My Appointments")} />
      <div style={{ width: `calc(100vw - 40vw)` }}>
        <div className="flex flex-col items-center py-2 justify-center gap-1">
          <p className="font-semibold uppercase text-sm">{t("Switch Week")}</p>
          <WeekSwitcher
            date={
              isDate(data?.pages[activeWeek].cursor!)
                ? new Date(data?.pages[activeWeek].cursor!)
                : undefined
            }
            onNext={() => fetchNextPage()}
            onPrev={() => fetchPreviousPage()}
          />
        </div>
        <div className="w-full h-full">
          {mapArray(data?.pages, (page, i) => {
            const Bookings = bookings(page);
            return (
              <div className="h-full w-full">
                <Table
                  ThProps={{
                    className: "border",
                  }}
                  TdProps={{
                    className:
                      "border first:whitespace-nowrap first:font-semibold first:text-gray-600",
                    valign: "top",
                  }}
                  className="w-full h-full"
                  key={i}
                >
                  <THead>
                    <Tr className="">
                      <Th></Th>
                      {weekDayLong.map((v) => (
                        <Th className="">{v}</Th>
                      ))}
                    </Tr>
                    <Tr>
                      <Th>{t("Time")}</Th>
                      {mapArray(Bookings, ([day], i) => {
                        const istoday = new Date().getDate() === parseInt(day);
                        return (
                          <Th>
                            <HStack className="text-semibold justify-center">
                              <BiCalendar />
                              <p className={istoday ? "text-primary" : ""}>
                                {istoday
                                  ? t("Today")
                                  : `${day}/${new Date(
                                    page?.cursor || new Date()
                                  ).getMonth() + 1
                                  }/${new Date(
                                    page?.cursor || new Date()
                                  ).getFullYear()}`}
                              </p>
                            </HStack>
                          </Th>
                        );
                      })}
                    </Tr>
                  </THead>
                  <TBody>
                    {mapArray([...Array(24)], (_, i) => {
                      const date = new Date(
                        new Date().getFullYear(),
                        new Date().getMonth(),
                        new Date().getDate(),
                        i,
                        0,
                        0,
                        0
                      );
                      return (
                        <Tr key={i} className="h-full">
                          <Td>
                            {date.toLocaleTimeString("en-us", {
                              hour: "2-digit",
                              hour12: true,
                            })}
                          </Td>

                          {mapArray(Bookings, (_, bi) => {
                            const cursorDate = new Date(page.cursor!);
                            const targetDate = isNaN(
                              new Date(page?.cursor || "").getTime()
                            )
                              ? null
                              : new Date(
                                cursorDate.getFullYear(),
                                cursorDate.getMonth(),
                                cursorDate.getDate() + bi,
                                i
                              );

                            const end = new Date(
                              new Date(targetDate!).setHours(
                                targetDate?.getHours() + 1
                              )
                            );
                            const bookings = targetDate
                              ? page.data?.filter((v) => {
                                const start = new Date(v.checkin);
                                return start >= targetDate && start <= end;
                              })
                              : null;
                            return (
                              <Td>
                                <div className="w-full h-full text-xs">
                                  <CalenderBookingsList
                                    length={bookings?.length || 0}
                                  >
                                    {mapArray(bookings || [], (v, i) => {
                                      const color =
                                        contrastColors[
                                        randomNum(contrastColors.length)
                                        ];

                                      const buyerName = `${v.buyer.firstName} ${v.buyer.lastName}`;
                                      const serviceTitle = (() => {
                                        switch (v.type) {
                                          case ServiceType.Hotel:
                                            return v.room?.title || "";

                                          case ServiceType.Restaurant:
                                            const shownDishs = v.dishs.slice(
                                              0,
                                              2
                                            );
                                            const dishsLeft =
                                              v.dishs.length -
                                              shownDishs.length;
                                            return `${shownDishs
                                              .map((v) => v.name)
                                              .join(", ")}` +
                                              (dishsLeft > 0)
                                              ? `, ${t("and")} ${dishsLeft} ${t(
                                                "more dishs"
                                              )}`
                                              : "";

                                          case ServiceType.HealthCenter:
                                            return `${v.doctor.speciality?.name
                                                ? `${v.doctor.speciality.name}: `
                                                : ""
                                              }${v.doctor.name}`;

                                          case ServiceType.BeautyCenter:
                                            const shownTreats =
                                              v.treatments.slice(0, 2);
                                            const treatsLeft =
                                              v.treatments.length -
                                              shownTreats.length;
                                            return `${shownTreats
                                              .map((v) => v.title)
                                              .join(", ")}` +
                                              (treatsLeft > 0)
                                              ? `, ${t(
                                                "and"
                                              )} ${treatsLeft} ${t(
                                                "more dishs"
                                              )}`
                                              : "";
                                          case ServiceType.Vehicle:
                                            return `${v.vehicle?.title || ""}`;

                                          case ServiceType.HolidayRentals:
                                            return `${v.room?.title || ""}`;
                                          default:
                                            return null;
                                         
                                        }
                                      })();

                                      return (
                                        <div
                                          style={{
                                            backgroundColor: color,
                                          }}
                                          className={`text-white p-2 border-white border rounded`}
                                        //  first:static absolute top-0 left-0 group-hover:first:translate-x-0 group-hover:translate-x-[110%] first:translate-x-0 translate-x-4 duration-300 transform transition-all w-[95%] h-full -z-10 group-hover:z-10 `}
                                        >
                                          <HStack className="">
                                            <FaClock />
                                            <p>
                                              <span className="font-semibold">
                                                {new Date(
                                                  v.checkin
                                                ).toLocaleTimeString("en-us", {
                                                  hour: "2-digit",
                                                  hour12: true,
                                                  minute: "2-digit",
                                                })}
                                              </span>{" "}
                                            </p>
                                          </HStack>
                                          <p>{buyerName}</p>
                                          <p className="inline">
                                            {serviceTitle}{" "}
                                            <BsFillInfoCircleFill
                                              onClick={() =>
                                                setBookDetialsId(v.id)
                                              }
                                              className="inline cursor-pointer"
                                            />
                                          </p>
                                        </div>
                                      );
                                    })}
                                  </CalenderBookingsList>
                                </div>
                              </Td>
                            );
                          })}
                        </Tr>
                      );
                    })}
                  </TBody>
                </Table>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export const CalenderBookingsList: React.FC<{
  children: React.ReactNode;
  length: number;
}> = ({ children, length }) => {
const { t } = useTranslation();
  const [open, setOpen] = React.useState<boolean>(false);

  const showMore = !open && length > 1;

  const showLess = !showMore && open && length > 1;

  const more = length - 1;

  return (
    <>
      {React.Children.toArray(children)
        .slice(0, open ? length : 1)
        .map((v, i) => runIfFn(v, { key: i }))}
      {showMore ? (
        <p
          onClick={() => setOpen(true)}
          className=" cursor-pointer w-full text-center text-primary font-semibold"
        >
          {t("show more")} {`(${more}+)`}
        </p>
      ) : null}
      {showLess ? (
        <p
          onClick={() => setOpen(false)}
          className="cursor-pointer w-full text-center text-primary font-semibold"
        >
          {t("show less")}
        </p>
      ) : null}
    </>
  );
};

export const NotificationCalender: React.FC<{
  value: string;
  onChange: (dateUTC: string) => any;
  notificationDates: string[];
  monthDate: string;
}> = ({ onChange, value, notificationDates, monthDate }) => {
const { t } = useTranslation();
  const { allDates, weekdays } = getMonthCalenderDays(new Date(monthDate));

  return (
    <Table ThProps={{ align: "center" }}>
      <Tr>
        {mapArray(weekdays, (v, i) => (
          <Th className="text-xs font-medium" key={i}>
            {t(v)}
          </Th>
        ))}
      </Tr>
      {[...Array(weekdays.length)].map((_, i) => {
        const days = allDates.slice(
          i * (weekdays.length - 1),
          (i + 1) * (weekdays.length - 1)
        );
        return (
          <Tr>
            {mapArray(days, (v, i) => {
              const isSelected = isSameDay(new Date(value), v.date);
              const notification = notificationDates.find((n) =>
                isSameDay(new Date(n), v.date)
              );
              return (
                <Td
                  className={`${isSelected ? "border-black border" : ""
                    } rounded-full p-1`}
                  key={i}
                >
                  <AspectRatio
                    className={`${isSelected
                        ? "bg-black text-white"
                        : notification
                          ? "bg-[#CCCCCC] text-white"
                          : "text-black"
                      } rounded-full w-7 h-7`}
                    ratio={1}
                  >
                    {new Date(v.date).getDate()}
                    <DotIcon className="w-1 h-1 bg-secondaryRed absolute bottom-3/4 left-3/4" />
                  </AspectRatio>
                </Td>
              );
            })}
          </Tr>
        );
      })}
    </Table>
  );
};
