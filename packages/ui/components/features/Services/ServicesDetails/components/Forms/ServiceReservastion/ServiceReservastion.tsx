import React from "react";
import { useTranslation } from "react-i18next";
import {
  Divider,
  CalenderIcon,
  HStack,
  Button,
  BookedServicesCostDetails,
  ServiceRangeBookingCalander,
  useBookServiceMutation,
  HotelGuestsInput,
  Stepper,
  ResturantFindTableFilterStepperHeader,
  StepperContent,
  PersonIcon,
  PriceDisplay,
  ClockIcon,
  TimeInput,
  useGetShopDetailsQuery,
  RestaurantDishsCheckoutList,
  TreatmentsCheckoutList,
  Image,
  WorkingDaysCalender,
  useGetBookingCostQuery,
} from "@UI";
import { isDate, useForm } from "utils";
import { Service, ServiceType } from "@features/API";

export const ServiceReservastionForm: React.FC<{
  sellerId: string;
  selectedServicesIds?: string[];
}> = ({ selectedServicesIds, sellerId }) => {
  const { form, handleChange, inputProps } = useForm<
    Parameters<typeof mutate>[0]
  >({});

  const { mutate } = useBookServiceMutation();

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
  const { data: costData } = useGetBookingCostQuery(bookingForm, {
    enabled:
      selectedServicesIds &&
      selectedServicesIds.length > 0 &&
      isDate(bookingForm.checkinDate),
  });

  const services = React.useMemo(
    () => costData?.services.map((v) => v.service) || [],
    [costData]
  );

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
  const { t } = useTranslation();

  const formatedDishs = services?.reduce((acc, curr) => {
    const menu = acc.find((v) => v.menuName === curr.menuType);

    if (menu) {
      return acc
        .filter((v) => v.menuName !== curr.menuType)
        .concat([
          {
            menuName: curr.menuType || "",
            dishs: [...(menu?.dishs || []), menu],
          },
        ]);
    } else {
      return acc.concat([
        {
          menuName: curr.menuType || "",
          dishs: [...(menu?.dishs || []), curr],
        },
      ]);
    }
  }, [] as { menuName: string; dishs: typeof services }[]);

  const showOn = (types: ServiceType[]) => types.includes(serviceType);

  return (
    <div className="pl-4 flex flex-col max-h-screen overflow-y-scroll thinScroll gap-[1.875rem]">
      <div
        style={{ boxShadow: "0px 0px 6px rgba(0, 0, 0, 0.2)" }}
        className="pt-5 pb-10 flex flex-col gap-4 p-4 rounded-[1.25rem]"
      >
        <p className="w-full text-center font-bold text-lg text-black">
          {t("Start your reservation")}
        </p>
        {showOn([
          ServiceType.Hotel,
          ServiceType.HolidayRentals,
          ServiceType.Vehicle,
          ServiceType.HealthCenter,
        ]) ? (
          <div className="flex gap-2">
            <Image
              className="w-20 h-16 rounded-lg"
              src={
                service?.thumbnail ||
                "https://www.amaviacollection.com/wp-content/uploads/2022/05/Villa-Gaia-1-scaled.jpeg"
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
        ) : null}
        <Divider />

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
                      ])
                        ? { icon: <ClockIcon />, name: t("Time") }
                        : undefined,
                      showOn([
                        ServiceType.Hotel,
                        ServiceType.HolidayRentals,
                        ServiceType.Restaurant,
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
                        workingDates={[
                          {
                            date: new Date().toString(),
                            workingHoursRanges: [
                              {
                                from: new Date().toString(),
                                to: new Date().toString(),
                              },
                              {
                                from: new Date().toString(),
                                to: new Date().toString(),
                              },
                              {
                                from: new Date().toString(),
                                to: new Date().toString(),
                              },
                              {
                                from: new Date().toString(),
                                to: new Date().toString(),
                              },
                            ],
                          },
                          {
                            date: new Date().toString(),
                            workingHoursRanges: [
                              {
                                from: new Date().toString(),
                                to: new Date().toString(),
                              },
                              {
                                from: new Date().toString(),
                                to: new Date().toString(),
                              },
                              {
                                from: new Date().toString(),
                                to: new Date().toString(),
                              },
                              {
                                from: new Date().toString(),
                                to: new Date().toString(),
                              },
                            ],
                          },
                          {
                            date: new Date().toString(),
                            workingHoursRanges: [
                              {
                                from: new Date().toString(),
                                to: new Date().toString(),
                              },
                              {
                                from: new Date().toString(),
                                to: new Date().toString(),
                              },
                              {
                                from: new Date().toString(),
                                to: new Date().toString(),
                              },
                              {
                                from: new Date().toString(),
                                to: new Date().toString(),
                              },
                            ],
                          },
                          {
                            date: new Date().toString(),
                            workingHoursRanges: [
                              {
                                from: new Date().toString(),
                                to: new Date().toString(),
                              },
                              {
                                from: new Date().toString(),
                                to: new Date().toString(),
                              },
                              {
                                from: new Date().toString(),
                                to: new Date().toString(),
                              },
                              {
                                from: new Date().toString(),
                                to: new Date().toString(),
                              },
                            ],
                          },
                          {
                            date: new Date().toString(),
                            workingHoursRanges: [
                              {
                                from: new Date().toString(),
                                to: new Date().toString(),
                              },
                              {
                                from: new Date().toString(),
                                to: new Date().toString(),
                              },
                              {
                                from: new Date().toString(),
                                to: new Date().toString(),
                              },
                              {
                                from: new Date().toString(),
                                to: new Date().toString(),
                              },
                            ],
                          },
                        ]}
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
                        handleChange("checkin", from);
                        handleChange("checkout", to);
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
                        ingredints: e.ingredients,
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
        <div className="">
          <BookedServicesCostDetails
            subTotal={150}
            total={450}
            title="Rooms"
            vat={10 || 0}
            vatAmount={45}
            deposit={0}
          >
            <div className="font-medium text-sm text-black flex justify-between items-center">
              <p>{t("Deposit")}</p>
              <PriceDisplay price={250} />
            </div>
            <Divider></Divider>
            <div className="font-medium text-sm text-black flex justify-between items-center">
              <p>{t("Cleaning fee")}</p>
              <PriceDisplay price={50} />
            </div>
          </BookedServicesCostDetails>
        </div>
        <Button className="text-[1.375rem]">{t("Book")}</Button>
      </div>
    </div>
  );
};
