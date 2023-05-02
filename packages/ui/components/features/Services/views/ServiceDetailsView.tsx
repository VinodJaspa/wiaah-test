import React from "react";
import {
  ServiceReachOutSection,
  ServiceOnMapLocalizationSection,
  ServicePoliciesSection,
  HotelServiceRoomsSection,
  ServicesProviderDescriptionSection,
  ServicePresentationCarosuel,
  StaticSideBarWrapper,
  SpinnerFallback,
  ServiceDetailsReviewsSection,
  SellerServiceWorkingHoursSection,
  ServicesProviderHeader,
  Image,
  Button,
  Divider,
  LocationOnPointFillIcon,
  useGetShopDetailsQuery,
  SimpleTabs,
  SimpleTabHead,
  SimpleTabItemList,
  HStack,
  ServiceReservastionForm,
  useGetUserServicesQuery,
  usePaginationControls,
  ResturantMenuList,
  HealthCenterDoctorsList,
  VehicleProprtiesList,
  PriceDisplay,
  AspectRatio,
  UnDiscountedPriceDisplay,
  TimeRangeDisplay,
  ClockIcon,
  CountInput,
  Pagination,
  Stack,
  PropertyDimensionsIcon,
  MathPowerDisplay,
  ServicePropertiesSwticher,
  CloseIcon,
  useResponsive,
  ArrowLeftAlt1Icon,
  Avatar,
  Verified,
  SaveFlagFIllIcon,
  LocationOutlineIcon,
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  ArrowRightIcon,
  VStack,
  BedOutlineIcon,
  BathtubOutlineIcon,
  WifiOutlineIcon,
  CarOutlineIcon,
  useSocialControls,
} from "ui";
import { useTranslation } from "react-i18next";
import {
  RestaurantDishType,
  Service,
  ServiceAdaptation,
  ServiceCancelationType,
  ServicePresentationType,
  ServiceRestriction,
  ServiceType,
} from "@features/API";
import { mapArray, runIfFn } from "@UI/../utils/src";
import { ImCheckmark } from "react-icons/im";
import { startCase } from "lodash";

export const ServiceDetailsView: React.FC<{
  userId: string;
}> = ({ userId }) => {
  const { isMobile } = useResponsive();
  const { bookServices } = useSocialControls();
  const { data: shop } = useGetShopDetailsQuery(userId);

  const { changeTotalItems, controls, pagination } = usePaginationControls();
  const { data: services, isLoading: sericesIsLoading } =
    useGetUserServicesQuery(userId, pagination);

  const [serviceId, setServiceId] = React.useState<string>("test");
  const [selectedServicesids, setSelectedServicesIds] = React.useState<
    string[]
  >([]);

  const isError = false;
  const isLoading = false;

  const { t } = useTranslation();

  const serviceType = shop?.type || ServiceType.Hotel;

  const showOn = (types: ServiceType[]) => types.includes(serviceType);

  const formatedDishs = services?.data?.reduce((acc, curr) => {
    const menu = acc.find((v) => v.menuName === curr.menuType);

    if (menu) {
      return acc
        .filter((v) => v.menuName !== curr.menuType)
        .concat([
          {
            menuName: curr.menuType || "",
            dishs: [...(menu?.dishs || []), menu],
          },
        ]) as unknown as any;
    } else {
      return acc.concat([
        {
          menuName: curr.menuType || "",
          dishs: [curr],
        },
      ]);
    }
  }, [] as { menuName: string; dishs: typeof services["data"] }[]);

  return isMobile ? (
    <div className="flex flex-col overflow-x-hidden gap-6 pb-12 p-4 w-full font-sf">
      <AspectRatio className="overflow-hidden" ratio={1}>
        <Image
          className="w-full rounded-2xl h-full object-cover"
          src={shop?.thumbnail}
        />
        <div className="absolute top-3 left-3">
          <ArrowLeftAlt1Icon className="text-white" />
        </div>

        <HStack className="absolute top-2 left-1/2 -translate-x-1/2 flex items-center">
          <Avatar
            className="min-w-[1.375rem]"
            src={shop?.sellerProfile.photo}
            name={shop?.sellerProfile.username}
          />
          <p className="font-semibold text-white">
            {shop?.sellerProfile.username}
          </p>
          <Verified className="text-blue-500 text-sm" />
        </HStack>
        <SaveFlagFIllIcon className="absolute -translate-y-1 text-3xl top-0 right-4 text-primary" />
        <div className="absolute rounded-xl backdrop-blur-sm bg-white bg-opacity-80 left-3 right-3 bottom-3 p-3">
          <HStack className="justify-between">
            <div className="flex flex-col gap-2">
              <p className="text-xl font-semibold">{shop?.name}</p>
              <HStack className="text-[0.813rem] text-[#525252]">
                <LocationOutlineIcon className="text-base text-primary" />
                <p>
                  {shop?.location?.address}, {shop?.location.city},{" "}
                  {shop?.location?.country}
                </p>
              </HStack>
            </div>
          </HStack>
        </div>
      </AspectRatio>

      <HStack className="justify-between">
        <div className="flex flex-col gap-2"></div>
        <HStack className="text-sm gap-4">
          <Button className="capitalize" colorScheme="darkbrown">
            {t("follow")}
          </Button>
          <Button className="capitalize" colorScheme="darkbrown" outline>
            {t("contact")}
          </Button>
        </HStack>
      </HStack>

      <div className="flex flex-col gap-2">
        <p className="text-lg font-semibold">{t("Description")}</p>
        <p className="text-sm text-[#424242]">{shop?.description}</p>
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-lg font-semibold">{t("Preview")}</p>

        <HStack className="w-full overflow-x-scroll">
          {mapArray(shop?.images, (v) => (
            <Image
              src={v}
              className="min-w-[5.625rem] h-[5.625rem] rounded-lg object-cover"
            />
          ))}
        </HStack>
      </div>

      <Accordion>
        <AccordionItem itemkey={"contact"}>
          <AccordionButton>
            <HStack className="justify-between">
              <p className="text-lg font-semibold">{t("Contact")}</p>
            </HStack>
          </AccordionButton>
          <AccordionPanel>
            <div className="pt-4">
              <ServiceReachOutSection
                email={shop?.email!}
                location={shop?.location!}
                telephone={shop?.phone!}
              />
            </div>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
      <Divider />
      <div className="flex flex-col gap-4">
        <p className="text-lg font-semibold">{t("Working Hours")}</p>

        <HStack className="overflow-x-scroll noScroll">
          {typeof shop?.workingSchedule?.weekdays === "object" ? (
            <SellerServiceWorkingHoursSection
              workingDays={
                (Object.values(shop?.workingSchedule?.weekdays) as any) || []
              }
            />
          ) : null}
        </HStack>
      </div>

      <div className="flex flex-col gap-4 w-full">
        <p className="text-lg font-semibold">
          {showOn([ServiceType.Hotel]) ? t("Rooms") : ""}
          {showOn([ServiceType.HolidayRentals]) ? t("Properties") : ""}
          {showOn([ServiceType.Vehicle]) ? t("More Vehicles") : ""}
          {showOn([ServiceType.BeautyCenter]) ? t("Treatments") : ""}
          {showOn([ServiceType.HealthCenter]) ? t("Doctors") : ""}
        </p>

        {showOn([ServiceType.Hotel, ServiceType.HolidayRentals]) ? (
          <div className="flex flex-col gap-4">
            {mapArray(services?.data || [], (v, i) => (
              <div
                key={v.id}
                className="flex flex-col gap-4 border rounded-xl p-2"
              >
                <div className="flex gap-2">
                  <Image
                    className="w-36 h-36 object-cover rounded-xl"
                    src={v.thumbnail}
                  />
                  <div className="flex flex-col gap-4">
                    <HStack className="justify-between">
                      <p className="font-semibold">{v.name}</p>
                      {v.measurements ? (
                        <div className="flex text-[0.563rem] items-center gap-2 text-lightBlack">
                          <PropertyDimensionsIcon className="text-sm" />
                          <div className="flex items-center">
                            {v.measurements.inMeter}
                            <MathPowerDisplay power={2}>m</MathPowerDisplay>
                          </div>
                          /
                          <div className="flex items-center">
                            {v.measurements.inFeet}
                            <MathPowerDisplay power={2}>ft</MathPowerDisplay>
                          </div>
                        </div>
                      ) : null}
                    </HStack>
                    <div className="flex flex-wrap">
                      {mapArray(v.includedAmenities || [], (v, i) => (
                        <div
                          key={i}
                          className="bg-primary-50 px-2 text-primary"
                        >
                          {v}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <ServiceDetailsFacilities service={v} />

                <Accordion>
                  <AccordionItem itemkey={`t&p-${v.id}`}>
                    <AccordionButton>
                      <HStack className="justify-between">
                        <p className="text-lg font-semibold">
                          {t("Terms and Policies")}
                        </p>
                      </HStack>
                    </AccordionButton>
                    <AccordionPanel>
                      <div className="flex flex-col gap-4 pt-4">
                        <div className="flex flex-col">
                          <p className="font-semibold">{t("Cancelation")}:</p>
                          {v.cancelable ? (
                            <ServiceDetailsCancelationSwitcher
                              policy={v.cancelationPolicy}
                              serviceType={v.type}
                            />
                          ) : (
                            t("Not Allowed")
                          )}
                        </div>
                        <div className="flex flex-col gap-4">
                          <p className="text-base font-semibold text-title">
                            {t("Restrictions")}
                          </p>
                          <div className="flex flex-col gap-4">
                            {mapArray(
                              Object.values(ServiceRestriction),
                              (data, i) => (
                                <HStack key={i}>
                                  {v.restriction?.includes(data) ? (
                                    <div className="text-primary p-2">
                                      <ImCheckmark />
                                    </div>
                                  ) : (
                                    <div className="text-red-500 p-2 ">
                                      <CloseIcon />
                                    </div>
                                  )}
                                  <p>{startCase(data)}</p>
                                </HStack>
                              )
                            )}
                          </div>
                        </div>
                      </div>
                    </AccordionPanel>
                  </AccordionItem>
                </Accordion>

                <div className="flex flex-col gap-2">
                  <p className="font-semibold">{t("Extras")}</p>
                  {mapArray(v.extras || [], (e, i) => (
                    <HStack key={i} className="justify-between">
                      <HStack>
                        <div className="w-1 h-1 bg-black rounded-full" />
                        <p className="capitalize font-medium">{e.name}</p>
                      </HStack>

                      <PriceDisplay
                        className="font-semibold"
                        symbolProps={{ className: "text-primary" }}
                        price={e.cost}
                      />
                    </HStack>
                  ))}
                </div>

                <HStack className="gap-8">
                  <p className="text-red-500 font-medium text-sm">
                    {t("Only")} {v.discount?.units}{" "}
                    {t("Tickets left at this price on our site")}
                  </p>

                  <VStack className="gap-0">
                    <HStack className="gap-1">
                      <PriceDisplay
                        className="text-lg font-semibold"
                        price={v.price}
                        symbolProps={{ className: "text-primary" }}
                      />
                      <div className="flex text-sm">
                        <UnDiscountedPriceDisplay
                          amount={v.price}
                          discount={v.discount?.value || 0}
                        />
                        /
                      </div>
                    </HStack>
                    <p className="font-semibold">{t("Night")}</p>
                  </VStack>
                </HStack>
                <Button
                  onClick={() => {
                    console.log("book hotel");
                    bookServices({
                      sellerId: v.sellerId,
                      servicesIds: [v.id],
                    });
                  }}
                  className="flex w-fit self-end items-center"
                  colorScheme="darkbrown"
                >
                  {t("Book now")} <ArrowRightIcon className="text-xl" />
                </Button>
              </div>
            ))}
          </div>
        ) : null}

        {showOn([ServiceType.HealthCenter]) ? (
          <div className="flex flex-col gap-4">
            {mapArray(services?.data || [], (v, i) => (
              <HStack key={v.id + i}>
                <Image
                  src={v.thumbnail}
                  className="w-[9.25rem] h-[6.25rem] object-cover rounded-lg"
                />
                <div className="flex flex-col w-full justify-between">
                  <div className="flex flex-col gap-3">
                    <p className="font-semibold">{v.name}</p>
                    <p className="font-medium text-[#868686] text-xs">
                      {v.speciality}
                    </p>
                  </div>

                  <HStack className="justify-between">
                    <PriceDisplay
                      price={v.price}
                      symbolProps={{ className: "text-primary font-bold" }}
                      className="text-xl font-semibold"
                    />
                    <Button
                      onClick={() => {
                        bookServices({
                          sellerId: shop?.ownerId,
                          servicesIds: [v.id],
                        });
                      }}
                      className="text-xs"
                    >
                      {t("Select")}
                    </Button>
                  </HStack>
                </div>
              </HStack>
            ))}
          </div>
        ) : null}

        {showOn([ServiceType.Vehicle]) ? (
          <div className="flex flex-col gap-4">
            {mapArray(services?.data || [], (v, i) => (
              <div key={v.id + i} className="flex flex-col gap-4">
                <AspectRatio ratio={0.53}>
                  <Image
                    src={v.thumbnail}
                    className="w-full h-full rounded-lg object-cover"
                  />
                </AspectRatio>

                <div className="flex flex-col gap-2">
                  <p className="font-semibold">{v.name}</p>
                  <div className="flex flex-wrap gap-4 items-center">
                    {mapArray(v.includedAmenities || [], (v, i) => (
                      <HStack key={i} className="gap-1">
                        <span className="text-primary">
                          <ServicePropertiesSwticher slug={v} />
                        </span>
                        <p className="capitalize font-medium">{v}</p>
                      </HStack>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <p className="text-sm font-semibold">{t("Cancelation")}:</p>
                  <p className="text-xs font-mediums">
                    <ServiceDetailsCancelationSwitcher
                      policy={v.cancelationPolicy}
                      serviceType={v.type}
                    />
                  </p>
                </div>

                <HStack className="justify-between">
                  <div className="flex items-center">
                    <PriceDisplay
                      price={v.price}
                      className="font-bold text-xl"
                      symbolProps={{ className: "text-primary" }}
                    />
                    /<p className="text-sm">{t("Day")}</p>
                  </div>
                  <Button
                    onClick={() => {
                      bookServices({
                        sellerId: shop?.ownerId,
                        servicesIds: [v.id],
                      });
                    }}
                    colorScheme="darkbrown"
                    className="text-sm flex items-cneter font-semibold"
                  >
                    <p>{t("Book now")}</p>
                    <ArrowRightIcon className="text-xl" />
                  </Button>
                </HStack>
              </div>
            ))}
          </div>
        ) : null}

        {showOn([ServiceType.BeautyCenter]) ? (
          <div className="flex flex-col gap-4 w-full rounded-lg px-2 pt-2 py-4 border border-gray-200 border-opacity-75">
            {mapArray(services?.data || [], (s, i) => (
              <div className="flex gap-3" key={i}>
                <Image
                  src={s.thumbnail}
                  className="w-[9.25rem] h-[8rem] rounded-lg object-cover"
                />

                <div className="justify-between flex flex-col w-full">
                  <div className="flex flex-col w-full gap-2">
                    <p className="text-[0.938rem] font-medium">{s.name}</p>
                    <HStack className="justify-between">
                      <div className="flex flex-col gap-1">
                        <p className="text-[0.688rem] text-[#646464]">
                          {t("Time")}
                        </p>
                        <p className="text-primary text-[0.813rem]">
                          <TimeRangeDisplay
                            rangeInMinutes={[s.duration || 0]}
                          />
                        </p>
                      </div>

                      <div className="flex flex-col items-center justify-center">
                        <PriceDisplay
                          className="text-xl font-semibold"
                          price={s.price}
                          symbolProps={{ className: "text-primary font-bold" }}
                        />
                        <UnDiscountedPriceDisplay
                          className="text-[#ADADAD]"
                          amount={s.price}
                          discount={s.discount?.value || 0}
                        />
                      </div>
                    </HStack>
                  </div>
                  <div className="self-end w-fit">
                    <CountInput
                      count={
                        selectedServicesids.filter((v) => v === s.id).length ||
                        0
                      }
                      onCountChange={(c) =>
                        setSelectedServicesIds((old) =>
                          old
                            .filter((v) => v !== s.id)
                            .concat([...Array(c)].map(() => s.id))
                        )
                      }
                    />
                  </div>
                </div>
              </div>
            ))}

            <HStack className="justify-between gap-4">
              <PriceDisplay
                className="text-xl font-semibold"
                symbolProps={{ className: "text-primary font-bold" }}
                price={150}
              />
              <Button
                onClick={() => {
                  bookServices({
                    sellerId: shop?.ownerId,
                    servicesIds: selectedServicesids,
                  });
                }}
                className="flex items-center"
                colorScheme="darkbrown"
              >
                <p>{t("Book now")}</p>
                <ArrowRightIcon className="text-xl" />
              </Button>
            </HStack>
          </div>
        ) : null}

        {showOn([ServiceType.Restaurant]) ? (
          <div className="flex flex-col gap-4 w-full">
            {mapArray(
              [
                RestaurantDishType.Starter,
                RestaurantDishType.Main,
                RestaurantDishType.Dessert,
                RestaurantDishType.Drinks,
              ],
              (v, i) => (
                <div className="flex flex-col w-full gap-3" key={i}>
                  <p className="text-lg font-semibold">{startCase(v)}</p>
                  <div className="flex flex-col w-full gap-4">
                    {mapArray(
                      services?.data.filter((e) => e.menuType === v),
                      (s) => (
                        <HStack key={s.id}>
                          <Image
                            className="w-[9.125rem] h-[6.25rem] rounded-[0.625rem]"
                            src={s.thumbnail}
                          />
                          <div className="flex flex-col justify-between w-full gap-1">
                            <div>
                              <p className="text-lg font-semibold">{s.name}</p>
                              <p className="text-[#868686] font-medium text-[0.813rem]">
                                {(s.ingredients || [])?.join(",")}
                              </p>
                            </div>
                            <HStack className="justify-between">
                              <PriceDisplay
                                price={s.price}
                                className="text-xl font-semibold"
                                symbolProps={{
                                  className: "text-primary font-bold",
                                }}
                              />

                              <CountInput
                                count={
                                  selectedServicesids.filter((v) => v === s.id)
                                    .length || 0
                                }
                                onCountChange={(c) =>
                                  setSelectedServicesIds((old) =>
                                    old
                                      .filter((v) => v !== s.id)
                                      .concat([...Array(c)].map(() => s.id))
                                  )
                                }
                              />
                            </HStack>
                          </div>
                        </HStack>
                      )
                    )}
                  </div>
                </div>
              )
            )}

            <HStack className="justify-between">
              <PriceDisplay
                className="text-xl font-semibold"
                price={950}
                symbolProps={{ className: "text-primary font-bold" }}
              />
              <Button
                onClick={() =>
                  bookServices({
                    sellerId: shop?.ownerId,
                    servicesIds: selectedServicesids,
                  })
                }
                className="flex items-center"
                colorScheme="darkbrown"
              >
                <p>{t("Book now")}</p>

                <ArrowRightIcon className="text-lg" />
              </Button>
            </HStack>
          </div>
        ) : null}
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <p className="text-lg font-semibold">{t("Show us on Map")}</p>
          <p className="text-[0.813rem]">
            {shop?.location.address}, {shop?.location.city},{" "}
            {shop?.location.country}
          </p>
        </div>
        {shop ? (
          <ServiceOnMapLocalizationSection location={shop.location} />
        ) : null}
        <Button colorScheme="darkbrown" className="flex items-center w-fit">
          {t("Get direction")} <ArrowRightIcon className="text-xl" />
        </Button>
      </div>
      {/* 
      <div className="flex flex-col gap-4">
        <HStack className="gap-[0.375rem]">
          <p className="text-text-lg font-semibold">{t("Reviews")}</p>
          <StarIcon className="text-primary" />
          <p className="text-primary">{shop?.rating?.toFixed(1) || 0}</p>
        </HStack>
      </div> */}
      <ServiceDetailsReviewsSection
        overAllRating={shop?.rating || 0}
        ratingLevels={[
          {
            rate: 4.9,
            name: "Amenities",
          },
          {
            name: "Communication",
            rate: 5,
          },
          {
            name: "Value for Money",
            rate: 5,
          },
          {
            name: "Hygiene",
            rate: 5,
          },
          {
            name: "Location of Property",
            rate: 5,
          },
        ]}
        reviews={[...Array(6)].map((_, i) => ({
          name: "John Doberman",
          content:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          thumbnail: `/profile (${i + 1}).jfif`,
          date: new Date().toString(),
        }))}
      />
      {/* <Stack col divider={<Divider variant="vert" />}>
        {[...Array(10)].map(() => (
          <div className="flex"></div>
        ))}
      </Stack> */}
    </div>
  ) : (
    <div className="flex flex-col gap-8 px-2 py-8">
      <div className="flex flex-col sm:flex-row gap-4 w-full items-center justify-between shadow p-4">
        <div className="flex flex-col items-center sm:items-start sm:flex-row gap-4">
          <Image
            className="w-40 h-28 sm:h-20 sm:w-28 rounded-xl object-cover"
            src={shop ? shop.thumbnail : ""}
          />
          <div className="flex flex-col">
            <p className=" font-bold text-xl">{shop ? shop.name : null}</p>
            <div className="flex text-black gap-1 items-center">
              <LocationOnPointFillIcon />
              {shop ? (
                <p>
                  {shop.location.city}, {shop.location.country}
                </p>
              ) : null}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button>{t("Follow")}</Button>
          <Button outline>{t("Contact")}</Button>
        </div>
      </div>
      <Divider />
      <ServicePresentationCarosuel
        data={
          shop
            ? shop.images.map((v) => ({
                src: v,
                type: ServicePresentationType.Img,
              })) || []
            : []
        }
      />
      <SpinnerFallback isLoading={isLoading} isError={isError}>
        {shop ? (
          <ServicesProviderHeader
            rating={shop.rating}
            reviewsCount={shop.reviews}
            serviceTitle={shop.name}
            // travelPeriod={{ arrival: new Date(), departure: new Date() }}
          />
        ) : null}
      </SpinnerFallback>
      <StaticSideBarWrapper
        sidebar={() => {
          if (serviceId) {
            return (
              <ServiceReservastionForm
                sellerId={shop?.ownerId!}
                selectedServicesIds={selectedServicesids}
              />
            );
          } else {
            return (
              <div className="w-full flex justify-center items-center p-8">
                {t("Please select a service to book")}
              </div>
            );
          }
        }}
      >
        <SimpleTabs>
          <HStack>
            <SimpleTabHead>
              <ServiceDetailsTabHead title={t("Description")} />
              <ServiceDetailsTabHead title={t("Contact")} />
              <ServiceDetailsTabHead title={t("Policies")} />
              <ServiceDetailsTabHead title={t("Working hours")} />
              {showOn([ServiceType.Hotel]) ? (
                <ServiceDetailsTabHead title={t("Rooms")} />
              ) : null}
              {showOn([ServiceType.BeautyCenter]) ? (
                <ServiceDetailsTabHead title={t("Treatments")} />
              ) : null}
              {showOn([ServiceType.HealthCenter]) ? (
                <ServiceDetailsTabHead title={t("Doctors")} />
              ) : null}
              {showOn([ServiceType.HolidayRentals]) ? (
                <ServiceDetailsTabHead title={t("Rentals")} />
              ) : null}
              {showOn([ServiceType.Restaurant]) ? (
                <ServiceDetailsTabHead title={t("Menus")} />
              ) : null}
              {showOn([ServiceType.Vehicle]) ? (
                <ServiceDetailsTabHead title={t("Vehicles")} />
              ) : null}
              <ServiceDetailsTabHead title={t("Localization")} />
              <ServiceDetailsTabHead title={t("Customer reviews")} />
            </SimpleTabHead>
          </HStack>
          <SimpleTabItemList>
            <SpinnerFallback isLoading={isLoading} isError={isError}>
              {shop ? (
                <div className="flex flex-col gap-8">
                  <ServicesProviderDescriptionSection
                    description={shop.description}
                    // bathrooms={2}
                    // bedrooms={3}
                    // bikes={3}
                    // cars={2}
                    // pets={1}
                  />
                </div>
              ) : null}
            </SpinnerFallback>
            <SpinnerFallback isLoading={isLoading} isError={isError}>
              {shop ? (
                <ServiceReachOutSection
                  email={shop.email}
                  location={shop.location}
                  telephone={shop.phone}
                />
              ) : null}
            </SpinnerFallback>
            <SpinnerFallback isLoading={isLoading} isError={isError}>
              {shop ? (
                <ServicePoliciesSection
                  title={"Check-in Checsdkout Terms"}
                  // deposit={15}
                  policies={[
                    {
                      policyTitle: "Check-in and Check-out",
                      terms: [
                        "Check-in time is after 3:00 PM",
                        "Check-out time is before 12:00 PM",
                        "Early check-in or late check-out may be available upon request and subject to availability",
                      ],
                    },
                    {
                      policyTitle: "Cancellation",
                      terms: [
                        "Cancellation policy varies depending on the rate plan booked",
                        "Some rate plans may be non-refundable",
                        "Cancellation requests must be made by 6:00 PM local time on the day prior to arrival to avoid cancellation fees",
                      ],
                    },
                    {
                      policyTitle: "Pets",
                      terms: ["Pets are not allowed in the hotel"],
                    },
                  ]}
                />
              ) : null}
            </SpinnerFallback>
            <SpinnerFallback isLoading={isLoading} isError={isError}>
              {shop && shop.workingSchedule ? (
                <SellerServiceWorkingHoursSection
                  workingDays={
                    Object.values(shop?.workingSchedule?.weekdays) as any
                  }
                />
              ) : null}
            </SpinnerFallback>
            <SpinnerFallback isLoading={isLoading} isError={isError}>
              <>
                {showOn([ServiceType.Hotel]) ? (
                  <HotelServiceRoomsSection
                    rooms={
                      (services?.data.map((v) => ({
                        id: v.id,
                        cancelable: true,
                        name: v.name,
                        price: v.price,
                        rating: v.rating,
                        reviews: v.reviews,
                        thumbnail: v.thumbnail,
                        bathrooms: v.bathrooms,
                        beds: v.beds,
                        measurements: v.measurements,
                        adaptedFor: v.adaptedFor,
                        discount: {
                          ...v,
                          amount: v.discount?.value,
                        },
                        includedAmenities: v.includedAmenities,
                        extras: v.extras,
                      })) as any) || []
                    }
                  />
                ) : null}
                {showOn([ServiceType.HolidayRentals]) ? (
                  <>
                    {mapArray(services?.data, (room, i) => (
                      <div key={i}>
                        <Stack col divider={<Divider className="my-5" />}>
                          <div className="flex flex-col sm:flex-row gap-4">
                            <div className="min-w-[11.25rem] h-fit overflow-hidden rounded-xl">
                              <AspectRatio ratio={1}>
                                <Image
                                  src={room.thumbnail}
                                  className="w-full h-full object-cover"
                                />
                              </AspectRatio>
                            </div>
                            <div className="flex flex-col justify-between w-full gap-4">
                              <div className="flex flex-col gap-5">
                                <div className="flex gap-4 justify-between">
                                  <p className="font-bold text-base text-title">
                                    {room.name}
                                  </p>
                                  {room.measurements ? (
                                    <div className="flex items-center gap-2 text-lightBlack">
                                      <PropertyDimensionsIcon className="text-sm" />
                                      <div className="flex items-center">
                                        {room.measurements.inMeter}
                                        <MathPowerDisplay power={2}>
                                          m
                                        </MathPowerDisplay>
                                      </div>
                                      /
                                      <div className="flex items-center">
                                        {room.measurements.inFeet}
                                        <MathPowerDisplay power={2}>
                                          ft
                                        </MathPowerDisplay>
                                      </div>
                                    </div>
                                  ) : null}
                                </div>

                                <div
                                  style={{
                                    gridTemplateColumns: `repeat(${3},1fr)`,
                                  }}
                                  className={`w-full grid gap-4 text-primary text-xl thinScroll overflow-y-scroll`}
                                >
                                  {mapArray(
                                    room.includedAmenities!,
                                    (ame, i) => (
                                      <HStack key={i}>
                                        <ServicePropertiesSwticher slug={ame} />
                                        <p className="font-medium text-darkBrown text-xs">
                                          {t(ame)}
                                        </p>
                                      </HStack>
                                    )
                                  )}
                                </div>
                              </div>
                              <div>
                                <Divider></Divider>
                                <HStack className="flex-wrap  gap-4">
                                  <HStack>
                                    <p className="font-semibold">
                                      {t("Property Type")}:
                                    </p>
                                    <p>{startCase(room.propertyType || "")}</p>
                                  </HStack>
                                  <HStack>
                                    <p className="font-semibold">
                                      {t("Type of Place")}:
                                    </p>
                                    <p>{startCase(room.typeOfPlace || "")}</p>
                                  </HStack>
                                </HStack>
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-col w-full gap-6">
                            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                              <div className="flex flex-col gap-4">
                                <p className="text-base font-bold text-title">
                                  {t("Adapeted for")}
                                </p>
                                <div className="flex flex-col gap-4">
                                  {mapArray(
                                    Object.values(ServiceAdaptation),
                                    (data, i) => (
                                      <HStack key={i}>
                                        {room.adaptedFor?.includes(data) ? (
                                          <div className="text-primary p-2">
                                            <ImCheckmark />
                                          </div>
                                        ) : (
                                          <div className="text-red-500 p-2 ">
                                            <CloseIcon />
                                          </div>
                                        )}
                                        <p>{startCase(data)}</p>
                                      </HStack>
                                    )
                                  )}
                                </div>
                              </div>
                              <div className="flex flex-col gap-4">
                                <p className="text-base font-bold text-title">
                                  {t("Restrictions")}
                                </p>
                                <div className="flex flex-col gap-4">
                                  {mapArray(
                                    Object.values(ServiceRestriction),
                                    (data, i) => (
                                      <HStack key={i}>
                                        {room.restriction?.includes(data) ? (
                                          <div className="text-primary p-2">
                                            <ImCheckmark />
                                          </div>
                                        ) : (
                                          <div className="text-red-500 p-2 ">
                                            <CloseIcon />
                                          </div>
                                        )}
                                        <p>{startCase(data)}</p>
                                      </HStack>
                                    )
                                  )}
                                </div>
                              </div>
                              <div className="flex flex-col col-span-2 gap-4">
                                <p className="text-base font-bold text-title">
                                  {t("Extras")}
                                </p>
                                <div className="flex flex-col gap-4">
                                  {mapArray(room.extras!, (data, i) => (
                                    <div
                                      key={i}
                                      className="flex items-center text-xs font-normal text-lightBlack justify-between gap-4"
                                    >
                                      <p className=" font-semibold text-lg">
                                        {startCase(data.name)}
                                      </p>
                                      {data.cost > 0 ? (
                                        <PriceDisplay
                                          className="text-primary font-bold"
                                          price={data.cost}
                                        />
                                      ) : (
                                        t("FREE")
                                      )}
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                            <div className="flex flex-col gap-2">
                              <p className="font-semibold text-lg">
                                {t("Policy")}
                              </p>
                              <HStack className="justify-between">
                                <p className="font-medium">
                                  {t("Cleaning fees")}
                                </p>
                                <span className="font-bold">
                                  <PriceDisplay
                                    price={room?.cleaningFee || 0}
                                  />
                                </span>
                              </HStack>
                              <Divider></Divider>
                              <HStack>
                                <p className="font-medium">
                                  {t("Cancelation")}:
                                </p>
                                {room.cancelable ? (
                                  <>
                                    {(() => {
                                      switch (room.cancelationPolicy) {
                                        case ServiceCancelationType.Simple:
                                          return t(
                                            "You can cancel any time before your reservation date"
                                          );
                                        case ServiceCancelationType.Moderate:
                                          return t(
                                            "You can cancel any time up to 24 hours before your reservation date"
                                          );
                                        case ServiceCancelationType.Strict:
                                          return [
                                            ServiceType.BeautyCenter,
                                            ServiceType.Restaurant,
                                            ServiceType.HealthCenter,
                                          ].includes(room.type)
                                            ? t(
                                                "if you cancel within 5 hours of the schduled date, 50% of the reservation price will taken"
                                              )
                                            : t(
                                                "if you cancel within 30 days of the schduled date, 50% of the reservation price will taken"
                                              );
                                      }
                                    })()}
                                  </>
                                ) : (
                                  t("Not Allowed")
                                )}
                              </HStack>
                            </div>
                          </div>
                          <div className="flex flex-col gap-5 w-full">
                            <div className="flex items-center flex-wrap gap-5">
                              <div className="text-lg items-center flex gap-2 font-bold text-black">
                                <PriceDisplay price={room.price} />

                                {room.discount ? (
                                  <>
                                    <div className="text-sm flex gap-1 text-lightBlack items-center font-normal">
                                      <UnDiscountedPriceDisplay
                                        amount={
                                          room.price +
                                          room.discount.value * room.price
                                        }
                                        discount={room.discount.value}
                                      />
                                      /
                                      <p className="text-black">{t("night")}</p>
                                    </div>
                                  </>
                                ) : null}
                              </div>
                              {room.discount ? (
                                <>
                                  <p className="text-secondaryRed text-sm font-medium">
                                    {t("Only") +
                                      ` ${room.discount.units} ` +
                                      t(
                                        "Tickets left at this price on our site"
                                      )}
                                  </p>
                                </>
                              ) : null}
                            </div>
                            <Button
                              onClick={() => setSelectedServicesIds([room.id])}
                              className="text-[1.375rem] text-white font-bold"
                            >
                              {t("Book Now")}
                            </Button>
                          </div>
                        </Stack>
                      </div>
                    ))}
                  </>
                ) : null}
                {showOn([ServiceType.BeautyCenter]) ? (
                  <>
                    {mapArray(services?.data, (v) => (
                      <div className="flex w-full  select-none justify-between">
                        <div className="flex gap-2 w-2/3">
                          <Image
                            className="w-32 h-24 rounded-lg"
                            src={v.thumbnail}
                          />
                          <div className="md:text-lg font-semibold flex flex-col gap-1">
                            <p className="">
                              {v.treatmentCategory} - {v.name}
                            </p>
                            <div className="flex font-normal text-base gap-2 items-center">
                              <ClockIcon />
                              {v.duration ? (
                                <TimeRangeDisplay
                                  rangeInMinutes={[v.duration!]}
                                />
                              ) : null}
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-4 justify-between w-1/3">
                          <div></div>
                          <span className="text-xl">
                            <CountInput />
                          </span>
                          <div className="flex font-semibold flex-col gap-1 items-end">
                            <PriceDisplay
                              symbol
                              priceObject={{ amount: v.price }}
                            />
                            <UnDiscountedPriceDisplay
                              className="text-gray-400"
                              amount={v?.price || 0 * (v?.discount?.value || 1)}
                              discount={v?.discount?.value || 0}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </>
                ) : null}
                {showOn([ServiceType.Restaurant]) ? (
                  <ResturantMenuList
                    onMenuListChange={() => {}}
                    menu={
                      (formatedDishs?.map((v) => ({
                        name: v.menuName,
                        dishs: v.dishs.map((e) => ({
                          name: e.name,
                          thumbnail: e.thumbnail,
                          price: e.price,
                          ingredints: e.ingredients,
                        })),
                      })) as any) || []
                    }
                  />
                ) : null}
                {showOn([ServiceType.HealthCenter]) ? (
                  <HealthCenterDoctorsList
                    doctors={mapArray(services?.data || [], (v) => ({
                      description: v.description,
                      name: v.name,
                      price: v.price,
                      rating: v.rating,
                      id: v.id,
                      thumbnail: v.thumbnail,
                      speciality: v.speciality || "",
                    }))}
                    cancelation={[]}
                  />
                ) : null}
                {showOn([ServiceType.Vehicle]) ? (
                  <div className="flex flex-col items-center w-full">
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 w-full gap-6">
                      {mapArray(services?.data, (v) => (
                        <div className="flex flex-col gap-2">
                          <AspectRatio ratio={9 / 16}>
                            <Image
                              className="w-full h-full object-cover"
                              src={v.thumbnail}
                            />
                          </AspectRatio>

                          <div className="flex flex-col gap-2">
                            <p className="font-semibold text-lg">
                              {v.name.slice(0, 50)}
                              {v.name.length > 50 ? "..." : ""}
                            </p>
                            <span className="text-lg">
                              <VehicleProprtiesList
                                VehicleProps={{
                                  airCondition: v.airCondition!,
                                  gpsAvailable: v.gpsAvailable!,
                                  lugaggeCapacity: v.lugaggeCapacity!,
                                  maxSpeedInKm: v.maxSpeedInKm!,
                                  seats: v.seats!,
                                  windows: v.windows!,
                                }}
                              />
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            {v.price ? (
                              <div className="flex font-semibold gap-2">
                                {v.discount ? (
                                  <div className="text-lg text-gray-400">
                                    <UnDiscountedPriceDisplay
                                      amount={v.price}
                                      discount={v.discount.value}
                                    />
                                  </div>
                                ) : null}
                                <span className="text-lg text-primary flex whitespace-nowrap gap-2">
                                  <PriceDisplay price={v.price} /> | {t("Day")}
                                </span>
                              </div>
                            ) : (
                              <div></div>
                            )}
                            <Button
                              onClick={() => setSelectedServicesIds([v.id])}
                            >
                              {t("Select")}
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                    <Pagination />
                  </div>
                ) : null}
              </>
            </SpinnerFallback>
            <SpinnerFallback isLoading={isLoading} isError={isError}>
              {shop ? (
                <>
                  <ServiceOnMapLocalizationSection location={shop.location} />
                </>
              ) : null}
            </SpinnerFallback>
            <SpinnerFallback isLoading={isLoading} isError={isError}>
              {shop ? <>{/* TODO: BIND SERVICE RATING */}</> : null}
            </SpinnerFallback>
          </SimpleTabItemList>
        </SimpleTabs>
      </StaticSideBarWrapper>
    </div>
  );
};

const ServiceDetailsTabHead: React.FC<{
  title: string;
  selected?: boolean;
}> = ({ title, selected, ...rest }) => (
  <p
    {...rest}
    className={`${
      selected ? "text-primary border-b" : ""
    } font-semibold px-4 py-1 cursor-pointer hover:border-b border-primary`}
  >
    {title}
  </p>
);

{
  /* per service  */
}

export const ServiceDetailsFacilities: React.FC<{
  service: Partial<Service>;
}> = ({ service: v }) => {
  const { t } = useTranslation();
  const showOn = (types: ServiceType[]) =>
    types.includes(v.type || ServiceType.Hotel);

  const facilities: { icon: React.ReactNode; label: string }[] = showOn([
    ServiceType.Hotel,
    ServiceType.HolidayRentals,
  ])
    ? [
        {
          icon: BedOutlineIcon,
          label: `${v.beds || 0} ${t("Bedrooms")}`,
        },
        {
          icon: BathtubOutlineIcon,
          label: `${v.bathrooms || 0} ${t("Bathrooms")}`,
        },
        {
          icon: WifiOutlineIcon,
          label: `${t("24h WIFI")}`,
        },
        {
          icon: CarOutlineIcon,
          label: `${t("3 Cars 24h")}`,
        },
      ]
    : [];

  return (
    <Accordion>
      <AccordionItem itemkey={`facilities-${v.id}`}>
        <AccordionButton>
          <p className="text-lg font-semibold">{t("Facilities")}</p>
        </AccordionButton>
        <AccordionPanel>
          <HStack className="gap-4 overflow-scroll noScroll pb-2 ">
            {mapArray(facilities, (v, i) => (
              <div
                key={i}
                className="flex flex-col px-2 min-w-[4.875rem] h-[3.625rem] items-center justify-center border-2 rounded-lg border-primary"
              >
                <span className="text-2xl">{runIfFn(v.icon)}</span>
                <p className="text-xs whitespace-nowrap font-medium">
                  {v.label}
                </p>
              </div>
            ))}
          </HStack>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};

export const ServiceDetailsCancelationSwitcher: React.FC<{
  policy: ServiceCancelationType;
  serviceType: ServiceType;
}> = ({ policy, serviceType }) => {
  const { t } = useTranslation();
  return (
    <>
      {(() => {
        switch (policy) {
          case ServiceCancelationType.Simple:
            return t("You can cancel any time before your reservation date");
          case ServiceCancelationType.Moderate:
            return t(
              "You can cancel any time up to 24 hours before your reservation date"
            );
          case ServiceCancelationType.Strict:
            return [
              ServiceType.BeautyCenter,
              ServiceType.Restaurant,
              ServiceType.HealthCenter,
            ].includes(serviceType)
              ? t(
                  "if you cancel within 5 hours of the schduled date, 50% of the reservation price will taken"
                )
              : t(
                  "if you cancel within 30 days of the schduled date, 50% of the reservation price will taken"
                );
        }
      })()}
    </>
  );
};
