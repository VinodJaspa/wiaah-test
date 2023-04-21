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
} from "ui";
import { useTranslation } from "react-i18next";
import {
  ServiceAdaptation,
  ServiceCancelationType,
  ServicePresentationType,
  ServiceRestriction,
  ServiceType,
} from "@features/API";
import { mapArray } from "@UI/../utils/src";
import { useRouting } from "@UI/../routing";
import { ImCheckmark } from "react-icons/im";
import { startCase } from "lodash";

export const ServiceDetailsView: React.FC<{
  userId: string;
}> = ({ userId }) => {
  const { data: shop } = useGetShopDetailsQuery(userId);
  // const {
  //   data: services,
  //   isError,
  //   isLoading,
  // } = useGetMyServicesQuery(serviceId);

  const { visit } = useRouting();

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
        ]);
    } else {
      return acc.concat([
        {
          menuName: curr.menuType || "",
          dishs: [curr],
        },
      ]);
    }
  }, [] as { menuName: string; dishs: typeof services["data"] }[]);

  return (
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
                  workingDays={Object.values(shop?.workingSchedule?.weekdays)}
                />
              ) : null}
            </SpinnerFallback>
            <SpinnerFallback isLoading={isLoading} isError={isError}>
              <>
                {showOn([ServiceType.Hotel]) ? (
                  <HotelServiceRoomsSection
                    rooms={
                      services?.data.map((v) => ({
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
                      })) || []
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
                    // onMenuListChange={}
                    menu={
                      formatedDishs?.map((v) => ({
                        name: v.menuName,
                        dishs: v.dishs.map((e) => ({
                          name: e.name,
                          thumbnail: e.thumbnail,
                          price: e.price,
                          ingredints: e.ingredients,
                        })),
                      })) || []
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
                              onClick={() => setSelectedServicesIds(v.id)}
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
              {shop ? (
                <>
                  {/* TODO: BIND SERVICE RATING */}
                  <ServiceDetailsReviewsSection
                    overAllRating={shop.rating}
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
                </>
              ) : null}
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
