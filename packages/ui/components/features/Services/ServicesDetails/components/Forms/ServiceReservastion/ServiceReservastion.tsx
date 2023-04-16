import React from "react";
import { useTranslation } from "react-i18next";
import {
  Divider,
  CalenderIcon,
  HStack,
  Button,
  BookedServicesCostDetails,
  useGetServiceDataQuery,
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
  useGetShopServicesQuery,
  useGetShopDetailsQuery,
  RestaurantDishsCheckoutList,
  TreatmentsCheckoutList,
} from "@UI";
import { useForm } from "utils";
import { ServiceType } from "@features/API";

export const ServiceReservastionForm: React.FC<{
  serviceId: string;
  sellerId: string;
  selectedServicesIds?: string[];
}> = ({ serviceId, selectedServicesIds, sellerId }) => {
  const { data: service } = useGetServiceDataQuery(serviceId);

  const { form, handleChange, inputProps } = useForm<
    Parameters<typeof mutate>[0]
  >({});

  const showOn = (types: ServiceType[]) =>
    types.includes(ServiceType.Restaurant);

  const { data: shop } = useGetShopDetailsQuery(sellerId);

  const { data: services } = useGetShopServicesQuery(
    { ids: selectedServicesIds!, sellerId },
    {
      enabled:
        // !!selectedServicesIds &&
        // !!sellerId &&
        showOn([ServiceType.Restaurant, ServiceType.BeautyCenter]),
    }
  );

  const { mutate } = useBookServiceMutation();

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

  return (
    <div className="pl-16 flex flex-col gap-[1.875rem]">
      <div
        style={{ boxShadow: "0px 0px 6px rgba(0, 0, 0, 0.2)" }}
        className="pt-5 pb-10 flex flex-col gap-4 p-4 rounded-[1.25rem]"
      >
        <p className="w-full text-center font-bold text-lg text-black">
          {t("Start your reservation")}
        </p>
        <Divider />

        <Stepper>
          {({ currentStepIdx, nextStep, previousStep, stepsLength }) => {
            return (
              <div className="flex flex-col gap-4 w-full">
                <ResturantFindTableFilterStepperHeader
                  currentStepIdx={currentStepIdx}
                  steps={
                    [
                      {
                        icon: <CalenderIcon />,
                        name: t("Date"),
                      },
                      showOn([ServiceType.Restaurant])
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
                  {showOn([
                    ServiceType.Hotel,
                    ServiceType.HolidayRentals,
                    ServiceType.Vehicle,
                    ServiceType.Restaurant,
                  ]) ? (
                    <ServiceRangeBookingCalander
                      bookedDates={[new Date()]}
                      date={new Date().toUTCString()}
                      onChange={([from, to]) => {
                        handleChange("checkin", from);
                        handleChange("checkout", to);
                      }}
                      value={[form?.checkin, form?.checkout]}
                    />
                  ) : undefined}

                  {showOn([ServiceType.Restaurant]) ? <TimeInput /> : undefined}

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
                <HStack className="justify-between">
                  {currentStepIdx === 0 ? (
                    <div></div>
                  ) : (
                    <Button colorScheme="gray" onClick={() => previousStep()}>
                      {t("Previous")}
                    </Button>
                  )}
                  {currentStepIdx === stepsLength - 1 ? (
                    <div></div>
                  ) : (
                    <Button
                      onClick={() => nextStep()}
                      // disabled={
                      //   typeof form.checkin !== "string" ||
                      //   typeof form.checkout !== "string"
                      // }
                    >
                      {t("Next")}
                    </Button>
                  )}
                </HStack>
              </div>
            );
          }}
        </Stepper>
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
                })) || []
              }
            />
          ) : null}
        </div>
        <Divider />
        <div className="">
          <BookedServicesCostDetails title="Rooms" vat={12 || 0}>
            <div className="font-medium text-sm text-black flex justify-between items-center">
              <p>{t("Deposit")}</p>
              <PriceDisplay price={250} />
            </div>
          </BookedServicesCostDetails>
        </div>
        <Button className="text-[1.375rem]">{t("Book")}</Button>
      </div>
    </div>
  );
};
