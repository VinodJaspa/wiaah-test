import { ServiceType } from "@features/API";
import React from "react";
import { useTranslation } from "react-i18next";
import { useRouting } from "routing";
import {
  useGetRecommendedShopPostsQuery,
  SimpleTabs,
  SimpleTabHead,
  SimpleTabItemList,
  Image,
  AspectRatio,
  HStack,
  Avatar,
  Verified,
  SaveFlagFIllIcon,
  PriceDisplay,
  Button,
  ShoppingCartOutlinePlusIcon,
  useSocialControls,
  HotelIcon,
  HotelOutlineIcon,
  HolidayRentalsOutlineIcon,
  HolidayRentalsIcon,
  HealthCenterFillIcon,
  HealthCenterOutlineIcon,
  VehicleOutlineIcon,
  VehicleFillIcon,
  BeautyCenterOutlineIcon,
  BeautyCenterFillIcon,
  useGetRecommendedServices,
  ScrollCursorPaginationWrapper,
  LocationOutlineIcon,
  VStack,
  RestaurantFillIcon,
  Stack,
  Text,
} from "ui";
import { mapArray, runIfFn, useBreakpointValue } from "utils";

export const SellerShopView: React.FC = () => {
  const cols = useBreakpointValue({ base: 1, md: 2, lg: 3 });
  const { getParam, visit } = useRouting();

  const type = getParam("s_type");

  const setType = (v) => visit((r) => r.addQuery({ s_type: v }));
  const [serviceType, setServiceType] = React.useState<ServiceType>(
    ServiceType.Hotel
  );

  const { t } = useTranslation();
  const { data } = useGetRecommendedShopPostsQuery({});

  const {
    data: recommendedServices,
    fetchNextPage,
    hasNextPage,
  } = useGetRecommendedServices(
    { type: serviceType, take: 30 },
    {
      getNextPageParam: (last) => last.nextCursor,
    }
  );
  const { viewProductDetails } = useSocialControls();

  const services: {
    icon: React.ReactNode;
    activeIcon: React.ReactNode;
    label: string;
    key: ServiceType;
  }[] = [
    {
      icon: <HotelOutlineIcon />,
      activeIcon: <HotelIcon />,
      key: ServiceType.Hotel,
      label: t("Hotel"),
    },
    {
      icon: <HolidayRentalsOutlineIcon />,
      activeIcon: <HolidayRentalsIcon />,
      key: ServiceType.HolidayRentals,
      label: t("Holiday Rentals"),
    },
    {
      icon: <HealthCenterOutlineIcon />,
      activeIcon: <HealthCenterFillIcon />,
      key: ServiceType.HealthCenter,
      label: t("Health Center"),
    },
    {
      icon: <VehicleOutlineIcon />,
      activeIcon: <VehicleFillIcon />,
      key: ServiceType.Vehicle,
      label: t("Vehicle Center"),
    },
    {
      icon: <BeautyCenterOutlineIcon />,
      activeIcon: <BeautyCenterFillIcon />,
      key: ServiceType.BeautyCenter,
      label: t("Beauty Center"),
    },
    {
      icon: <RestaurantFillIcon />,
      activeIcon: <RestaurantFillIcon />,
      key: ServiceType.Restaurant,
      label: t("Restaurant"),
    },
  ];

  const showOn = (types: ServiceType[]) => types.includes(serviceType);

  return (
    <div className="py-4 font-sf">
      <SimpleTabs
        onChange={(v) => {
          console.log("tab change", { v });
          if (v === 0) setType("product");
          if (v === 1) setType("service");
        }}
        value={type === "product" ? 0 : 1}
      >
        <HStack className="justify-around">
          <SimpleTabHead>
            <button>
              <p
                className={`${
                  type === "product"
                    ? "text-black font-semibold border-black"
                    : "text-[#707070] border-white"
                } border-b-2 pb-2`}
              >
                {t("Shop")}
              </p>
            </button>
            <button>
              <p
                className={`${
                  type === "service"
                    ? "text-black font-semibold border-black"
                    : "text-[#707070] border-white"
                } border-b-2 pb-2`}
              >
                {t("Service")}
              </p>
            </button>
          </SimpleTabHead>
        </HStack>
        <SimpleTabItemList>
          <div className="grid grid-cols-2 gap-4 p-4">
            {mapArray(data, (v, i) => (
              <div key={v.id + i} className="flex flex-col gap-2">
                <AspectRatio
                  onClick={() => viewProductDetails(v.id)}
                  className="cursor-pointer"
                  ratio={1.04}
                >
                  <Image
                    src={v.product.thumbnail}
                    className="rounded-lg w-full h-full object-cover"
                  />
                  <HStack className="absolute text-white left-1 bottom-1 gap-1">
                    <Avatar
                      className="min-w-[1rem]"
                      src={v.user?.profile?.photo}
                      name={v.user?.profile?.username}
                      alt={v.user?.profile?.username}
                    />
                    <p className="text-xs font-semibold">
                      {v.user?.profile?.username}
                    </p>
                    {v.user?.profile?.verified ? (
                      <Verified className="text-[0.5rem] text-blue-500" />
                    ) : null}
                  </HStack>
                </AspectRatio>
                <div className="flex gap-4 justify-between">
                  <div className="text-[0.813rem]">
                    <Text maxLines={2}>{v.product?.title}</Text>
                  </div>
                  <span>
                    <SaveFlagFIllIcon className="text-primary text-lg pr-1" />
                  </span>
                </div>
                <HStack className="justify-between">
                  <p className="font-semibold flex items-center gap-1">
                    <p className="font-semibold flex items-center gap-1">
                      <PriceDisplay
                        decimel
                        symbolProps={{ className: "font-bold text-primary" }}
                        displayCurrency={false}
                        symbol={false}
                        price={v.product?.price}
                      />
                    </p>
                  </p>
                  <Button
                    onClick={() => viewProductDetails(v.id)}
                    colorScheme="darkbrown"
                    className="text-lg text-white"
                  >
                    <ShoppingCartOutlinePlusIcon />
                  </Button>
                </HStack>
              </div>
            ))}
          </div>
          <div className="flex flex-col w-full gap-4 p-4">
            <HStack className="w-full overflow-x-scroll noScroll gap-4">
              {mapArray(services, (v) => (
                <div
                  key={v.key}
                  onClick={() => setServiceType(v.key)}
                  className={`flex flex-col items-center gap-1`}
                >
                  <div
                    className={`w-10 h-10 text-2xl flex justify-center items-center rounded-lg ${
                      v.key === serviceType
                        ? "bg-black fill-white text-white"
                        : "bg-white fill-iconGray text-iconGray"
                    }`}
                  >
                    {v.key === serviceType
                      ? runIfFn(v.activeIcon)
                      : runIfFn(v.icon)}
                  </div>
                  <p
                    className={` ${
                      v.key === serviceType
                        ? "text-black font-medium"
                        : "text-[#707070]"
                    }  whitespace-nowrap`}
                  >
                    {v.label}
                  </p>
                </div>
              ))}
            </HStack>

            <ScrollCursorPaginationWrapper
              controls={{ hasMore: hasNextPage, next: fetchNextPage }}
            >
              <div
                className={`${
                  showOn([
                    ServiceType.Hotel,
                    ServiceType.HealthCenter,
                    ServiceType.Restaurant,
                  ])
                    ? "grid-cols-2 gap-6"
                    : showOn([
                        ServiceType.HolidayRentals,
                        ServiceType.BeautyCenter,
                      ])
                    ? "grid-cols-1"
                    : "grid-cols-3 gap-3"
                } grid gap-3`}
              >
                {mapArray(recommendedServices?.pages, (v, i) => (
                  <React.Fragment key={i}>
                    {mapArray(v?.data, (v, i) => (
                      <div key={v.id} className="flex flex-col">
                        <AspectRatio
                          className="overflow-hidden"
                          ratio={
                            showOn([ServiceType.Hotel])
                              ? 0.7
                              : showOn([ServiceType.Vehicle])
                              ? 1.15
                              : showOn([ServiceType.HealthCenter])
                              ? 1.04
                              : showOn([
                                  ServiceType.HolidayRentals,
                                  ServiceType.BeautyCenter,
                                ])
                              ? 0.58
                              : 1
                          }
                        >
                          <Image
                            className="w-full h-full rounded-md object-cover"
                            src={v.thumbnail}
                          />
                          <HStack className="absolute top-1 left-1 gap-1">
                            <Avatar
                              className="min-w-[.75rem]"
                              src={v.owner.profile.photo}
                            ></Avatar>
                            <p className="text-semibold text-white text-[0.625rem]">
                              {v.owner.profile.username}
                            </p>
                            <Verified className="text-[0.5rem] text-blue-500"></Verified>
                          </HStack>
                          <SaveFlagFIllIcon className="absolute text-primary right-1 -top-1 text-3xl"></SaveFlagFIllIcon>
                          {showOn([
                            ServiceType.Vehicle,
                            ServiceType.Restaurant,
                          ]) ? (
                            <HStack className="text-[0.625rem] absolute bottom-1 left-1">
                              <LocationOutlineIcon className="text-primary" />
                              <p className="text-white">
                                {v?.owner?.shop?.location?.country}
                              </p>
                            </HStack>
                          ) : null}
                        </AspectRatio>
                        {showOn([ServiceType.Hotel]) ? (
                          <HStack className="justify-between p-1">
                            <div>
                              <p className="font-medium text-sm">{v.name}</p>
                              <HStack className="text-xs">
                                <LocationOutlineIcon className="text-primary" />
                                <p className="text-[#525252]">
                                  {v?.owner?.shop?.location?.country}
                                </p>
                              </HStack>
                            </div>
                            <VStack className="gap-0">
                              <p className="flex text-sm font-medium">
                                <PriceDisplay
                                  decimel
                                  price={v.price}
                                  symbolProps={{
                                    className: "text-primary font-bold",
                                  }}
                                />
                                /
                              </p>
                              <p className="text-xs font-normal">
                                {t("Night")}
                              </p>
                            </VStack>
                          </HStack>
                        ) : null}

                        {showOn([ServiceType.HolidayRentals]) ? (
                          <div>
                            <p className="text-lg font-medium">{v.name}</p>
                            <p className="text-[0.813rem]">{v.description}</p>
                            <HStack className="justify-between">
                              <HStack className="text-[0.813rem] text-[#525252]">
                                <LocationOutlineIcon className="text-primary" />
                                <p>
                                  {v.owner?.shop?.location?.address},{" "}
                                  {v.owner.shop.location.city},{" "}
                                  {v?.owner?.shop?.location?.country}
                                </p>
                              </HStack>

                              <VStack className="gap-0">
                                <p className="flex text-sm font-semibold">
                                  <PriceDisplay
                                    decimel
                                    price={v.price}
                                    symbolProps={{
                                      className: "text-primary font-bold",
                                    }}
                                  />
                                  /
                                </p>
                                <p>{t("Day")}</p>
                              </VStack>
                            </HStack>
                          </div>
                        ) : null}

                        {showOn([ServiceType.HealthCenter]) ? (
                          <HStack className="justify-between p-1">
                            <div>
                              <p className="text-sm font-semibold text-[#525252]">
                                {v.name}
                              </p>
                              <p>{v.speciality}</p>
                            </div>
                            <VStack className="gap-0">
                              <p className="flex text-sm font-semibold">
                                <PriceDisplay
                                  decimel
                                  price={v.price}
                                  symbolProps={{
                                    className: "text-primary font-bold",
                                  }}
                                />
                                /
                              </p>
                              <p className="text-xs">{t("Consultation")}</p>
                            </VStack>
                          </HStack>
                        ) : null}

                        {showOn([ServiceType.Vehicle]) ? (
                          <div className="p-1 flex flex-col gap-[0.375rem]">
                            <p className="text-sm font-medium">
                              {v.name.length > 30
                                ? v.name.slice(0, 29) + "..."
                                : v.name}
                            </p>
                            <p className="flex text-[0.813rem] items-end font-semibold">
                              <PriceDisplay
                                decimel
                                price={v.price}
                                symbolProps={{
                                  className: "text-primary font-bold",
                                }}
                              />
                              /
                              <span className="font-normal text-[0.625rem]">
                                {t("Day")}
                              </span>
                            </p>
                          </div>
                        ) : null}

                        {showOn([ServiceType.BeautyCenter]) ? (
                          <div className="p-1">
                            <p className="text-lg font-semibold">{v.name}</p>
                            <HStack className="justify-between">
                              <HStack className="text-[#525252] text-[0.813rem]">
                                <LocationOutlineIcon className="text-primary" />
                                <p>{v?.owner?.shop?.location?.country}</p>
                              </HStack>
                              <PriceDisplay
                                decimel
                                price={v.price}
                                symbolProps={{
                                  className: "text-primary font-bold",
                                }}
                              />
                            </HStack>
                          </div>
                        ) : null}

                        {showOn([ServiceType.Restaurant]) ? (
                          <div className="p-1">
                            <p className="text-sm font-semibold">{v.name}</p>
                            <Stack
                              className="items-center gap-1"
                              divider={
                                <span className="w-1 h-1 bg-[#525252] rounded-full"></span>
                              }
                            >
                              {["Chinese", "American"].map((v, i) => (
                                <span key={i}>{v}</span>
                              ))}
                            </Stack>
                            <p className="text-xs font-semibold text-[#525252] ">
                              {mapArray(v.ingredients, (v, i) => (
                                <span key={i}>{v}</span>
                              ))}
                            </p>
                            <HStack className="justify-end">
                              <PriceDisplay
                                decimel
                                price={v.price}
                                symbolProps={{
                                  className: "text-primary font-bold",
                                }}
                              />
                            </HStack>
                          </div>
                        ) : null}
                      </div>
                    ))}
                  </React.Fragment>
                ))}
              </div>
            </ScrollCursorPaginationWrapper>
          </div>
        </SimpleTabItemList>
      </SimpleTabs>
    </div>
  );
};
