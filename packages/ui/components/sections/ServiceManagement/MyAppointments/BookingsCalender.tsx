import React from "react";
import { useTranslation } from "react-i18next";
import {
  SectionHeader,
  HStack,
  useGetMyAppointmentsQuery,
  Slider,
  Button,
  DraggableSlider,
  ArrowUpIcon,
  ArrowDownIcon,
  Modal,
  ModalOverlay,
  ModalContent,
} from "@UI";
import { ServiceType } from "@features/API";
import {
  AddToDate,
  SubtractFromDate,
  mapArray,
  randomNum,
  runIfFn,
  useForm,
  weekDayLong,
} from "utils";
import { BookDetailsSection, BookingsSectionCtx } from ".";
import { random } from "lodash";

export interface BookingCalenderSectionProps {}

const contrastColors = ["#00BCD4"];

export const BookingsCalenderSection: React.FC<
  BookingCalenderSectionProps
> = () => {
  const { t } = useTranslation();
  const { setBookId } = React.useContext(BookingsSectionCtx);
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
        console.log("try", data);
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
        console.log({ error, data });
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

  React.useEffect(() => {
    console.log({ data });
    if (data && data?.pages.length < 2) {
      console.log("fketch", { data });
      fetchNextPage();
    }
  }, [data]);

  return (
    <div className="flex flex-col gap-4">
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
      <SectionHeader sectionTitle={t("my_appointments", "My Appointments")} />
      <div className="flex gap-2">
        <div style={{ height: `calc(100vh - 18vh)` }}>
          <div className="grid grid-cols-7">
            {weekDayLong.map((v) => (
              <p className="bg-white h-full shadow-2xl px-8 py-2">{v}</p>
            ))}
          </div>

          <div className="overflow-hidden h-full">
            <DraggableSlider
              vertical
              activeIndex={activeWeek}
              itemsCount={2}
              draggingActive={false}
            >
              {mapArray([data?.pages[0], data?.pages[0]], (page, i) => (
                <div
                  className="grid grid-cols-7 w-full border-y h-full"
                  key={i}
                >
                  {mapArray(
                    Object.entries(
                      [...Array(7)].reduce((acc, _, i) => {
                        const bookings = page?.data?.filter((v) => {
                          const valid = !isNaN(new Date(v.checkin).getTime());
                          if (!valid) return false;

                          const date = new Date(v.checkin).getDay();

                          return date === i;
                        });

                        const day =
                          new Date(
                            page?.cursor || get1stWeekDate(new Date())
                          ).getDate() + i;

                        return { ...acc, [day]: bookings };
                      }, {} as Record<number, typeof page>)
                    ),
                    ([day, bookings], i) => {
                      const istoday = new Date().getDate() === parseInt(day);
                      return (
                        <div
                          key={day}
                          className=" h-full overflow-y-scroll noScroll border-x "
                        >
                          <div className="bg-white py-4 px-2 h-full shadow flex flex-col gap-1">
                            <HStack className="text-semibold">
                              <BiCalendar />
                              <p className={istoday ? "text-priamry" : ""}>
                                {istoday
                                  ? t("Today")
                                  : `${day}/${
                                      new Date(
                                        page?.cursor || new Date()
                                      ).getMonth() + 1
                                    }/${new Date(
                                      page?.cursor || new Date()
                                    ).getFullYear()}`}
                              </p>
                            </HStack>
                            <IncrementalRenderer
                              show={random(2, 4)}
                              more={random(1, 5)}
                              maxHeight={300}
                            >
                              {mapArray(
                                bookings as typeof page["data"],
                                (v, i) => {
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
                                        const shownDishs = v.dishs.slice(0, 2);
                                        const dishsLeft =
                                          v.dishs.length - shownDishs.length;
                                        return `${shownDishs
                                          .map((v) => v.name)
                                          .join(", ")}` +
                                          (dishsLeft > 0)
                                          ? `, ${t("and")} ${dishsLeft} ${t(
                                              "more dishs"
                                            )}`
                                          : "";

                                      case ServiceType.HealthCenter:
                                        return `${
                                          v.doctor.speciality?.name
                                            ? `${v.doctor.speciality.name}: `
                                            : ""
                                        }${v.doctor.name}`;

                                      case ServiceType.BeautyCenter:
                                        const shownTreats = v.treatments.slice(
                                          0,
                                          2
                                        );
                                        const treatsLeft =
                                          v.treatments.length -
                                          shownTreats.length;
                                        return `${shownTreats
                                          .map((v) => v.title)
                                          .join(", ")}` +
                                          (treatsLeft > 0)
                                          ? `, ${t("and")} ${treatsLeft} ${t(
                                              "more dishs"
                                            )}`
                                          : "";
                                      case ServiceType.Vehicle:
                                        return `${v.vehicle?.title || ""}`;

                                      case ServiceType.HolidayRentals:
                                        return `${v.room?.title || ""}`;
                                      default:
                                        break;
                                    }
                                  })();

                                  return (
                                    <div
                                      style={{ backgroundColor: color }}
                                      className="text-white p-2 rounded"
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
                                          onClick={() => setBookDetialsId(v.id)}
                                          className="inline cursor-pointer"
                                        />
                                      </p>
                                    </div>
                                  );
                                }
                              )}
                            </IncrementalRenderer>
                          </div>
                        </div>
                      );
                    }
                  )}
                </div>
              ))}
            </DraggableSlider>
          </div>
        </div>
        <div className="h-fill flex flex-col gap-2 justify-between">
          <Button
            loading={isFetchingPreviousPage}
            onClick={() => {
              if (isFetchingPreviousPage) return;
              fetchPreviousPage().then((v) => {
                if (v.data?.pages && v.data.pages.length > 0) {
                  setActiveWeek((v) => v - 1);
                }
              });
            }}
            className="text-xl p-2"
            center
          >
            <ArrowUpIcon />
          </Button>
          <Button
            loading={isFetchingNextPage}
            onClick={() => {
              if (isFetchingNextPage) return;
              fetchNextPage().then((v) => {
                if (v.data?.pages && v.data.pages.length > 0) {
                  setActiveWeek((v) => v + 1);
                }
              });
            }}
            className="text-xl p-2"
            center
          >
            <ArrowDownIcon />
          </Button>
        </div>
      </div>
    </div>
  );
};

import { useState, useEffect, useRef, ReactNode } from "react";
import { BiCalendar } from "react-icons/bi";
import { FaClock } from "react-icons/fa";
import { BsFillInfoCircleFill } from "react-icons/bs";

interface Props {
  children: ReactNode[];
  maxHeight: number;
  show: number;
  more?: number;
}

const IncrementalRenderer = ({ children, maxHeight, more, show }: Props) => {
  const [renderedChildren, setRenderedChildren] = useState<ReactNode[]>([]);
  const childrenRef = useRef<(HTMLDivElement | null)[]>([]);
  const [isOverflowed, setIsOverflowed] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    const totalHeight = childrenRef.current.reduce((acc, child) => {
      return acc + (child?.getBoundingClientRect().height || 0);
    }, 0);

    if (totalHeight > maxHeight) {
      setIsOverflowed(true);
    }
  }, [children, maxHeight]);

  useEffect(() => {
    if (!isOverflowed) {
      setRenderedChildren(children);
    } else {
      let totalHeight = 0;
      let i = 0;

      while (totalHeight <= maxHeight && i < children.length) {
        totalHeight +=
          childrenRef.current[i]?.getBoundingClientRect().height || 0;
        i++;
      }

      setRenderedChildren(children.slice(0, i));
    }
  }, [children, isOverflowed, maxHeight]);

  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="flex flex-col gap-2 w-full">
        {renderedChildren.slice(0, show).map((child, index) => (
          <div key={index} ref={(ref) => (childrenRef.current[index] = ref)}>
            {child}
          </div>
        ))}
      </div>
      {more ? (
        <div className="py-2 text-primary">
          +{more} {t("more")}
        </div>
      ) : null}
    </div>
  );
};

const AppointmentsCardList: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const ref1 = React.useRef<HTMLDivElement>(null);
  const [shownElements, setShowElements] = React.useState<React.ReactNode[]>(
    []
  );

  const [width, setWidth] = React.useState(0);
  const [height, setHeight] = React.useState(0);

  React.useLayoutEffect(() => {
    if (ref1.current) {
      setWidth(ref1.current.clientWidth);
      setHeight(ref1.current.clientHeight);
    }
  }, [ref1, shownElements]);

  React.useEffect(() => {
    const containerH = ref.current?.getBoundingClientRect().height;
    if (typeof containerH !== "number") return;

    const childs = React.Children.toArray(children).reduce<number[]>(
      (acc, curr) => {
        const sum = acc.reduce((acc, curr) => acc + curr, 0);

        if (containerH > sum) {
          return [...acc, curr.clientHeight];
        }

        return acc;
      },
      [] as number[]
    );
    console.log({
      childs,
      v: React.Children.toArray(children)[0],
    });
  }, [ref, ref1]);

  return (
    <div
      className="flex flex-col gap-2 w-full h-full  overflow-y-scroll thinScroll relative"
      ref={ref}
    >
      <div className="absolute top-0 left-0 w-full" ref={ref1}>
        {mapArray(shownElements, (v) => runIfFn(v))}
      </div>
    </div>
  );
};
