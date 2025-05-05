import { EllipsisText, useSocialControls } from "@blocks";
import { useGetShopDetailsQuery } from "@features/Shop";
import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  ArrowLeftAlt1Icon,
  AspectRatio,
  Button,
  CountInput,
  Divider,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  HStack,
  Image,
  LocationOutlineIcon,
  PriceDisplay,
  Switch,
} from "@partials";
import React from "react";
import { useTranslation } from "react-i18next";
import { ServiceRangeBookingCalander } from "../Inputs";
import {
  useBookServiceMutation,
  useGetBookingCostQuery,
} from "@features/Services/ServicesDetails";
import { HotelGuestsInput } from "@features/Services/hotels";
import { mapArray, useForm } from "@UI/../utils/src";
import { RestaurantDishType, ServiceType } from "@features/API";
import { startCase } from "lodash";

export const ServiceBookingDrawer: React.FC = () => {
  const { value, closeServiceDetails } = useSocialControls("serviceBooking");
const { t } = useTranslation();
  const isOpen =
    typeof value?.sellerId === "string" &&
    Array.isArray(value.servicesIds) &&
    typeof value.servicesIds[0] === "string";

  const { data: shop } = useGetShopDetailsQuery(value?.sellerId!, {
    enabled: isOpen,
  });

  const { mutate } = useBookServiceMutation();

  const { form, inputProps, handleChange } = useForm<
    Parameters<typeof useGetBookingCostQuery>[0]
  >({
    checkinDate: new Date().toUTCString(),
    servicesIds: value?.servicesIds || [],
    adults: 0,
    children: 0,
    extrasIds: [],
  });

  // const { data: services } = useGetUserServicesByIds(
  //   { sellerId: value?.sellerId!, servicesIds: value?.servicesIds! },
  //   { enabled: isOpen }
  // );

  const { data: services, isLoading } = useGetBookingCostQuery(form, {
    enabled: isOpen,
  });

  const resetForm = () => {};

  const showOn = (types: ServiceType[]) =>
    types.includes(shop?.type || ServiceType.Hotel);

  const service = services?.services?.at(0);

  return (
    <Drawer
      position="bottom"
      full
      isOpen={isOpen}
      onClose={closeServiceDetails}
    >
      <DrawerOverlay />
      <DrawerContent>
        <AspectRatio ratio={0.54}>
          <Image className="w-full h-full object-cover" src={shop?.thumbnail} />
          <ArrowLeftAlt1Icon className="text-lg absolute cursor-pointer text-white left-4 top-10" />
          <div className="absolute top-0 left-0 right-0 bottom-0 bg-black bg-opacity-10"></div>
          <div className="flex flex-col gap-2 absolute top-8 left-1/2 -translate-x-1/2">
            <p className="text-xl font-semibold text-white">{shop?.name}</p>
          </div>
        </AspectRatio>

        <div className="flex flex-col gap-6 pt-8 px-4 rounded-3xl -translate-y-16 bg-white">
          <HStack className="justify-between items-center">
            <p className="text-lg font-semibold">{t("Dates")}</p>
            <p onClick={resetForm} className="cursor-pointer text-primary">
              {t("Clear")}
            </p>
          </HStack>
          <div className="flex flex-col gap-6 pb-6 w-full shadow">
            <ServiceRangeBookingCalander
              bookedDates={[]}
              date={new Date()}
              onChange={() => {}}
              value={[]}
              single={showOn([
                ServiceType.Restaurant,
                ServiceType.HealthCenter,
                ServiceType.BeautyCenter,
              ])}
            />
            <Divider className="mt-0 py-0" />

            {showOn([
              ServiceType.Hotel,
              ServiceType.HolidayRentals,
              ServiceType.Restaurant,
              ServiceType.BeautyCenter,
              ServiceType.Vehicle,
              ServiceType.HealthCenter,
            ]) ? (
              <>
                <div className="flex flex-col px-4 gap-2">
                  <p className="text-lg font-semibold">{t("Time")}</p>
                  <p className="text-[#868686] text-[0.813rem]">
                    {
                      new Date()
                        .toLocaleDateString(undefined, {
                          timeZoneName: "long",
                        })
                        .split(",")[1]
                    }
                  </p>
                </div>
                <div className="p-4 text-[1.375rem] flex items-center self-center font-medium">
                  <HStack className="gap-3">
                    <p>{12}</p>
                    <p>:</p>
                    <p>{30}</p>
                  </HStack>
                  <Divider variant="vert" className="mx-2" />
                  <p>{"PM"}</p>
                </div>
                <p className="self-center text-secondaryRed">
                  {t("Please choose a time between")} {`(10:00 AM - 10:00 PM)`}
                </p>
              </>
            ) : null}
          </div>

          {showOn([
            ServiceType.Hotel,
            ServiceType.HolidayRentals,
            ServiceType.Restaurant,
          ]) ? (
            <>
              <div className="flex flex-col gap-4">
                <p className="text-lg font-semibold">{t("Guests")}</p>
                <div className="flex flex-col gap-2">
                  <HotelGuestsInput
                    onCountChange={(v) => handleChange("adults", v)}
                    count={form.adults || 0}
                    name={t("Adults")}
                    description={t("18 or olders")}
                  />
                  <HotelGuestsInput
                    onCountChange={(v) => handleChange("children", v)}
                    count={form.children || 0}
                    name={t("Children")}
                    description={t("17 or younger")}
                  />
                </div>
              </div>
              <Divider />
            </>
          ) : null}

          {showOn([ServiceType.BeautyCenter]) ? (
            <Accordion>
              {mapArray(services?.services || [], (v, i) => (
                <AccordionItem key={v.service.id} itemkey={v.service.id}>
                  <AccordionButton>
                    <p className="font-semibold py-2">{v.service.name}</p>
                  </AccordionButton>
                  <AccordionPanel>
                    <div className="flex flex-col gap-4">
                      <div className="flex justify-between">
                        <div className="flex gap-2">
                          <Image
                            className="w-24 h-16 object-cover rounded"
                            src={v.service.thumbnail}
                          />
                          <p className="font-semibold">{v.service.name}</p>
                        </div>
                        <p className="font-semibold px-4">{v.qty}x</p>
                        <PriceDisplay
                          className="font-semibold"
                          price={v.service.price * v.qty}
                          symbolProps={{ className: "text-primary font-bold" }}
                        />
                      </div>

                      {v?.service?.extras && v?.service?.extras?.length > 0 ? (
                        <div className="flex flex-col gap-2 w-full">
                          <p className="font-medium">{t("Extras")}</p>

                          {mapArray(v.service.extras || [], (e, i) => (
                            <HStack className="justify-between">
                              <HStack>
                                <CountInput max={v.qty} min={0} />
                                <p>{e.name}</p>
                              </HStack>
                              <PriceDisplay
                                className="font-semibold"
                                price={e.cost}
                                symbolProps={{
                                  className: "text-primary font-bold",
                                }}
                              />
                            </HStack>
                          ))}
                        </div>
                      ) : null}
                    </div>
                  </AccordionPanel>
                </AccordionItem>
              ))}
            </Accordion>
          ) : null}

          {showOn([ServiceType.Restaurant]) ? (
            <Accordion defaultOpen>
              {mapArray(
                [
                  RestaurantDishType.Starter,
                  RestaurantDishType.Main,
                  RestaurantDishType.Dessert,
                  RestaurantDishType.Drinks,
                ],
                (v, i) => {
                  const dishs = services?.services.filter(
                    (s) => s.service.menuType === v
                  );
                  return dishs && dishs.length > 0 ? (
                    <>
                      <AccordionItem key={i} itemkey={v}>
                        <AccordionButton>
                          <p className="font-semibold text-lg">
                            {startCase(v)}
                          </p>
                        </AccordionButton>
                        <AccordionPanel>
                          <div className="flex flex-col gap-4 w-full">
                            {mapArray(dishs || [], (v) => (
                              <div className="flex flex-col gap-4">
                                <div className="flex justify-between">
                                  <div className="flex gap-2">
                                    <Image
                                      className="w-24 h-16 object-cover rounded"
                                      src={v.service.thumbnail}
                                    />
                                    <p className="font-semibold">
                                      {v.service.name}
                                    </p>
                                  </div>
                                  <p className="font-semibold">{v.qty}x</p>
                                  <PriceDisplay
                                    className="font-semibold"
                                    price={v.service.price * v.qty}
                                    symbolProps={{
                                      className: "text-primary font-bold",
                                    }}
                                  />
                                </div>

                                <div className="flex flex-col gap-2 w-full">
                                  <p className="font-medium">{t("Extras")}</p>

                                  {mapArray(v.service.extras || [], (e, i) => (
                                    <HStack className="justify-between">
                                      <HStack>
                                        <CountInput max={v.qty} min={0} />
                                        <p>{e.name}</p>
                                      </HStack>
                                      <PriceDisplay
                                        className="font-semibold"
                                        price={e.cost}
                                        symbolProps={{
                                          className: "text-primary font-bold",
                                        }}
                                      />
                                    </HStack>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        </AccordionPanel>
                      </AccordionItem>
                      <Divider></Divider>
                    </>
                  ) : null;
                }
              )}
            </Accordion>
          ) : null}

          {showOn([
            ServiceType.Hotel,
            ServiceType.HolidayRentals,
            ServiceType.HealthCenter,
            ServiceType.Vehicle,
          ]) ? (
            <div className="flex flex-col gap-4">
              <div className="flex justify-between">
                <div className="flex gap-2">
                  <Image
                    className="w-24 h-16 rounded object-cover"
                    src={service?.service.thumbnail}
                  />
                  <div>
                    <p className="font-semibold">{service?.service.name}</p>

                    <HStack className="text-[0.813rem] text-[#525252]">
                      <LocationOutlineIcon className="text-base min-w-fit text-primary" />
                      <EllipsisText maxLines={2}>
                        {shop?.location?.address}, {shop?.location.city},{" "}
                        {shop?.location?.country}
                      </EllipsisText>
                    </HStack>
                  </div>
                </div>
                <PriceDisplay
                  className="font-semibold"
                  price={service?.service.price}
                  symbolProps={{ className: "text-primary font-bold" }}
                />
              </div>

              {service?.service?.extras &&
              service?.service?.extras?.length > 0 ? (
                <div className="flex flex-col gap-2 w-full">
                  <p className="font-medium">{t("Extras")}</p>
                  {mapArray(service?.service.extras || [], (e, i) => (
                    <HStack key={e.id + i} className="justify-between">
                      <HStack>
                        <Switch />
                        <p>{e.name}</p>
                      </HStack>
                      <PriceDisplay
                        className="font-semibold"
                        price={e.cost}
                        symbolProps={{
                          className: "text-primary font-bold",
                        }}
                      />
                    </HStack>
                  ))}
                </div>
              ) : null}
            </div>
          ) : null}

          <HStack className="justify-between items-center">
            <PriceDisplay
              className="text-[1.375rem] font-semibold"
              price={156}
              symbolProps={{ className: "text-primary font-bold" }}
            />
            <Button
              onClick={() => {
                // mutate({});
              }}
              className="font-bold"
              colorScheme="darkbrown"
            >
              {t("Book now")}
            </Button>
          </HStack>
        </div>
      </DrawerContent>
    </Drawer>
  );
};
