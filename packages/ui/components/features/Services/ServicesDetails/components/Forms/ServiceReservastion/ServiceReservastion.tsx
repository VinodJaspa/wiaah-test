import { TimeInput } from "@blocks";
import { RestaurantDishType, Service, ServiceType } from "@features/API";
import {
  GetBookingCostQuery,
  HotelGuestsInput,
  useGetBookingCostQuery,
  useGetShopDetailsQuery,
} from "@features/index";
import {
  Avatar,
  Button,
  CalenderIcon,
  Checkbox,
  ClockIcon,
  Divider,
  HStack,
  Image,
  PersonIcon,
  PriceDisplay,
  Stepper,
  StepperContent,
} from "@partials";
import { WorkingDaysCalender } from "@UI/components/blocks/DataDisplay/Date/WorkingDaysCalander";
import {
  RestaurantDishsCheckoutList,
  TreatmentsCheckoutList,
} from "@UI/components/features/Services/components/Cards/ServicesCheckoutCards/HotelCheckoutCard";
import { BookedServicesCostDetails } from "@UI/components/features/Services/components/DataDisplay/BookedServicesCostDetails";
import { ServiceRangeBookingCalander } from "@UI/components/features/Services/components/Inputs/ServiceBookingCalander";
import { ResturantFindTableFilterStepperHeader } from "@UI/components/features/Services/resturant/components/Headers/ResturantFindTableFilterStepperHeader";
import React from "react";
import { useTranslation } from "react-i18next";
import { mapArray, useForm } from "utils";
import { ServiceCancelationPolicyInput } from "@UI/components/features/Services/components/Inputs/ServiceCancelationPolicyInput";

const FAKE_BOOKING_COST_DATA: GetBookingCostQuery["getBookingCost"] = {
  total: 500.0,
  subTotal: 450.0,
  vatAmount: 50.0,
  vatPercent: 0.1,
  services: [
    {
      qty: 2,
      service: {
        id: "service123",
        thumbnail:
          "https://images.pexels.com/photos/27726786/pexels-photo-27726786/free-photo-of-sousse-archaeological-museum.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        type: ServiceType.Restaurant,
        name: "Deluxe Room",
        num_of_rooms: 1,
        beds: 2,
        bathrooms: 1,
        menuType: RestaurantDishType.Main,
        price: 200.0,
        extras: [
          {
            cost: 50.0,
            name: "Extra Bed",
            id: "extra1",
          },
          {
            cost: 20.0,
            name: "Late Checkout",
            id: "extra2",
          },
        ],
        cancelationPolicies: [
          {
            id: "1",
            cost: 50,
            duration: 60,
          },
          {
            id: "2",
            cost: 0,
            duration: 30,
          },
          {
            id: "3",
            cost: 0,
            duration: 0,
          },
        ],
      },
    },
    {
      qty: 1,
      service: {
        id: "service124",
        thumbnail:
          "https://images.pexels.com/photos/27726786/pexels-photo-27726786/free-photo-of-sousse-archaeological-museum.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        type: ServiceType.Hotel,
        name: "Suite",
        num_of_rooms: 1,
        beds: 1,
        bathrooms: 1,
        menuType: RestaurantDishType.Main,
        price: 300.0,
        extras: [
          {
            cost: 30.0,
            name: "Airport Pickup",
            id: "extra3",
          },
        ],
        cancelationPolicies: [
          {
            id: "1",
            cost: 50,
            duration: 60,
          },
          {
            id: "2",
            cost: 0,
            duration: 30,
          },
          {
            id: "3",
            cost: 0,
            duration: 0,
          },
        ],
      },
    },
  ],
};

interface BookingFormData {
  checkin: string;
  checkout: string;
  dishsIds: string;
  extrasIds: string;
  guests: number;
  serviceId: string;
  treatmentsIds: string;
}

export const ServiceReservastionForm: React.FC<{
  sellerId: string;
  selectedServicesIds?: string[];
}> = ({ selectedServicesIds, sellerId }) => {
  // const { mutate } = useBookServiceMutation();
  const { form, handleChange, inputProps } = useForm<BookingFormData>({
    checkin: "2024-07-01T15:00:00Z",
    checkout: "2024-07-05T11:00:00Z",
    dishsIds: "dish1",
    extrasIds: "extra1",
    guests: 2,
    serviceId: "service123",
    treatmentsIds: "treatment1",
  });

  const { data: shop } = useGetShopDetailsQuery(sellerId);
  const serviceType = shop?.type || ServiceType.Hotel;

  const {
    form: bookingForm,
    inputProps: bookingCostInput,
    handleChange: handleBookingCostChange,
    dateInputProps,
    selectProps,
  } = useForm<Parameters<typeof useGetBookingCostQuery>[0]>({
    checkinDate: "",
    servicesIds: selectedServicesIds || [],
    checkinTime: "",
    checkoutDate: "",
    extrasIds: [],
  });

  /*  const { data: _costData } = useGetBookingCostQuery(bookingForm, {
    enabled:
      selectedServicesIds &&
      selectedServicesIds.length > 0 &&
      isDate(bookingForm.checkinDate),
  }); */

  const costData = FAKE_BOOKING_COST_DATA;

  const services = costData?.services.map((v) => v.service);

  const service = Array.isArray(services) ? services[0] : ({} as Service);

  const [guests, setGuests] = React.useState<{
    adults: number;
    childrens: number;
    infants: number;
  }>({
    adults: 0,
    childrens: 0,
    infants: 0,
  });
const { t }: { t: (key: string, ...args: any[]) => string } = useTranslation();

  const formatedDishs = services?.reduce(
    (acc, curr) => {
      const menu = acc.find((v) => v.menuName === curr.menuType);

      if (menu) {
        menu.dishs.push(curr);
      } else {
        acc.push({
          menuName: curr.menuType || "",
          dishs: [curr],
        });
      }

      return acc;
    },
    [] as { menuName: string; dishs: typeof services }[],
  );

  const showOn = (types: ServiceType[]) => types.includes(serviceType);

  const createDate = (
    daysOffset: number,
    hours: number,
    minutes = 0,
  ): string => {
    const date = new Date();
    date.setDate(date.getDate() + daysOffset);
    date.setHours(hours, minutes, 0, 0);
    return date.toISOString();
  };

  const mockWorkingDates = Array.from({ length: 14 }).map((_, index) => ({
    date: createDate(index, 0),
    workingHoursRanges: [
      { from: createDate(index, 9), to: createDate(index, 10) },
      { from: createDate(index, 11), to: createDate(index, 12) },
      { from: createDate(index, 14), to: createDate(index, 15) },
      { from: createDate(index, 16), to: createDate(index, 17) },
      { from: createDate(index, 19), to: createDate(index, 20) },
    ],
  }));

  const mockTakenDates = Array.from({ length: 5 }).map(() => {
    const daysOffset = Math.floor(Math.random() * 14);
    const startHour = Math.floor(Math.random() * 23);
    const maxDuration = 23 - startHour;
    const duration = Math.floor(Math.random() * maxDuration) + 1;
    const endHour = startHour + duration;

    return {
      date: createDate(daysOffset, 0),
      workingHoursRanges: [
        {
          from: createDate(daysOffset, startHour),
          to: createDate(daysOffset, endHour),
        },
      ],
    };
  });

  return (
    <div className="pl-4 flex flex-col max-h-screen overflow-y-scroll thinScroll gap-[1.875rem] h-fit">
      <div
        style={{ boxShadow: "0px 0px 6px rgba(0, 0, 0, 0.2)" }}
        className="pt-5 pb-10 flex flex-col gap-4 p-4 rounded-[1.25rem]"
      >
        <p className="w-full text-center font-bold text-lg text-black">
          {t("Start your reservation")}
        </p>
        <Stepper>
          {({ currentStepIdx, goToStep, nextStep }) => {
            return (
              <div className="flex flex-col gap-4 w-full">
                <ResturantFindTableFilterStepperHeader
                  onChange={(idx) => {
                    if (idx < currentStepIdx) goToStep(idx);
                  }}
                  currentStepIdx={currentStepIdx}
                  steps={
                    [
                      showOn([
                        ServiceType.BeautyCenter,
                        ServiceType.HolidayRentals,
                        ServiceType.Hotel,
                        ServiceType.Restaurant,
                        ServiceType.Vehicle,
                      ])
                        ? {
                            icon: <CalenderIcon />,
                            name: t("Date"),
                          }
                        : undefined,
                      showOn([
                        ServiceType.Restaurant,
                        ServiceType.BeautyCenter,
                        ServiceType.HealthCenter,
                        ServiceType.Vehicle,
                      ])
                        ? { icon: <ClockIcon />, name: t("Time") }
                        : undefined,
                      showOn([
                        ServiceType.Hotel,
                        ServiceType.HolidayRentals,
                        ServiceType.Restaurant,
                        ServiceType.BeautyCenter,
                      ])
                        ? {
                            icon: <PersonIcon />,
                            name: t("Guests"),
                          }
                        : undefined,
                    ].filter((v) => !!v) as any
                  }
                />
                <StepperContent>
                  {showOn([ServiceType.HealthCenter]) ? (
                    <div className="mx-4">
                      <WorkingDaysCalender
                        workingDates={mockWorkingDates}
                        takenDates={mockTakenDates}
                      />
                    </div>
                  ) : undefined}
                  {showOn([
                    ServiceType.Hotel,
                    ServiceType.HolidayRentals,
                    ServiceType.Vehicle,
                    ServiceType.Restaurant,
                    ServiceType.BeautyCenter,
                  ]) ? (
                    <ServiceRangeBookingCalander
                      single={showOn([
                        ServiceType.HealthCenter,
                        ServiceType.Restaurant,
                        ServiceType.BeautyCenter,
                      ])}
                      bookedDates={[new Date()]}
                      date={new Date().toUTCString()}
                      onChange={([from, to], complete) => {
                        handleChange("checkin", from.toString());
                        handleChange("checkout", to.toString());
                        if (complete) nextStep();
                      }}
                      value={[form?.checkin, form?.checkout]}
                    />
                  ) : undefined}

                  {showOn([
                    ServiceType.Restaurant,
                    ServiceType.BeautyCenter,
                  ]) ? (
                    <TimeInput />
                  ) : undefined}

                  {showOn([
                    ServiceType.Hotel,
                    ServiceType.HolidayRentals,
                    ServiceType.Restaurant,
                  ]) ? (
                    <div className="flex flex-col gap-4">
                      <HotelGuestsInput
                        name={t("Adults")}
                        count={guests.adults}
                        description={`${t("Age")} 13+`}
                        onCountChange={(v) =>
                          setGuests({ ...guests, adults: v })
                        }
                      />
                      <HotelGuestsInput
                        count={guests.childrens}
                        name={t("Children")}
                        description={`${t("Ages")} 2-12`}
                        onCountChange={(v) =>
                          setGuests({ ...guests, adults: v })
                        }
                      />
                      <HotelGuestsInput
                        name={t("Infants")}
                        count={guests.infants}
                        description={`${t("Under")} 2 ${t("years old")}`}
                        onCountChange={(v) =>
                          setGuests({ ...guests, adults: v })
                        }
                      />
                    </div>
                  ) : null}
                </StepperContent>
              </div>
            );
          }}
        </Stepper>

        {showOn([ServiceType.Restaurant, ServiceType.BeautyCenter]) ? (
          <>
            <Divider />
            <div className="flex flex-col gap-4">
              {showOn([ServiceType.Restaurant]) ? (
                <RestaurantDishsCheckoutList
                  menus={
                    formatedDishs?.map((v) => ({
                      name: v.menuName,
                      dishs: v.dishs.map((e) => ({
                        name: e.name,
                        thumbnail: e.thumbnail,
                        price: e.price,
                        ingredints: ["ingredints"],
                        qty: v.dishs.filter((d) => d.id === e.id).length,
                      })),
                    })) || []
                  }
                />
              ) : null}
              {showOn([ServiceType.BeautyCenter]) ? (
                <TreatmentsCheckoutList
                  treatments={
                    services?.map((v) => ({
                      name: v.name,
                      price: v.price,
                      thumbnail: v.thumbnail,
                      qty:
                        selectedServicesIds?.filter((e) => e === v.id).length ||
                        1,
                    })) || []
                  }
                />
              ) : null}
            </div>
          </>
        ) : null}

        <Divider />

        {/* PREVIEW FOR SELECTED DOCTOR */}
        {showOn([ServiceType.HealthCenter]) && (
          <>
            <div className="flex justify-between items-center">
              <div className="flex gap-2">
                <Avatar
                  src="https://images.pexels.com/photos/11901031/pexels-photo-11901031.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt="Dr. Rebecca Parker"
                />
                <div className="flex flex-col ">
                  <p className="font-semibold text-lg">Dr. Rebecca Parker</p>
                  <p className="text-gray-400">Senior Neurologist</p>
                </div>
              </div>
              <p>$220</p>
            </div>
            <Divider />
          </>
        )}

        {/* PREVIEW FOR SELECTED ROOM OR VEHICLE */}
        {showOn([
          ServiceType.Hotel,
          ServiceType.HolidayRentals,
          ServiceType.Vehicle,
        ]) && (
          <>
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                <Image
                  className="w-20 h-16 rounded-lg"
                  src={
                    "https://media.istockphoto.com/id/506903162/photo/luxurious-villa-with-pool.jpg?b=1&s=612x612&w=0&k=20&c=vcCQ5L9Tt2ZurwFhtodR6njSUnMsEn_ZqEmsa0hs9lM="
                  }
                  alt={service?.name}
                />
                <div className="flex h-full flex-col font-medium gap-1">
                  <p>{service?.name || "Dolce Vita Villa"}</p>
                  {showOn([ServiceType.Hotel, ServiceType.HolidayRentals]) ? (
                    <HStack>
                      <p>
                        {service?.num_of_rooms || 4} {t("Rooms")}
                      </p>
                      <p>
                        {service?.beds || 6} {t("Beds")}
                      </p>
                      <p>
                        {service?.bathrooms || 5} {t("Bathrooms")}
                      </p>
                    </HStack>
                  ) : null}
                </div>
              </div>
              <p>${service?.price}</p>
            </div>
            <Divider />
          </>
        )}

        {/* COST CALCULATIONS */}
        <div>
          <BookedServicesCostDetails
            subTotal={150}
            total={450}
            title="Rooms"
            vat={10}
            vatAmount={45}
            deposit={0}
          >
            {showOn([ServiceType.Hotel, ServiceType.HolidayRentals]) && (
              <>
                <div className="font-medium text-sm text-black flex justify-between items-center">
                  <p>{t("Breakfast (extra)")}</p>
                  <PriceDisplay price={50} />
                </div>
                <Divider />
              </>
            )}

            <div className="font-medium text-sm text-black flex justify-between items-center">
              <p>{t("Cancellation fee")}</p>
              <PriceDisplay price={100} />
            </div>
            <Divider />

            {showOn([
              ServiceType.Hotel,
              ServiceType.HolidayRentals,
              ServiceType.Vehicle,
            ]) && (
              <>
                <div className="font-medium text-sm text-black flex justify-between items-center">
                  <p>{t("Deposit")}</p>
                  <PriceDisplay price={250} />
                </div>
                <Divider />
              </>
            )}
            {showOn([ServiceType.Hotel, ServiceType.HolidayRentals]) && (
              <>
                <div className="font-medium text-sm text-black flex justify-between items-center">
                  <p>{t("Cleaning fee")}</p>
                  <PriceDisplay price={50} />
                </div>
                <Divider />
              </>
            )}
          </BookedServicesCostDetails>
        </div>

        {/* BOOK BUTTON */}
        <Button className="text-[1.375rem]">{t("Book")}</Button>
      </div>
    </div>
  );
};
