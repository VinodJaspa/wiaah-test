import { ServiceType } from "@features/API";
import { getRandomImage } from "placeholder";
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

const FAKE_RECOMMENDED_SHOP_POSTS = [
  {
    __typename: "ProductPost",
    id: "post1",
    productId: "prod1",
    views: 1500,
    shares: 200,
    reactionNum: 300,
    comments: 50,
    userId: "user1",
    createdAt: "2023-06-01T00:00:00Z",
    location: {
      __typename: "PostLocation",
      address: "123 Main St",
      city: "Productville",
      country: "Productland",
      state: "Productstate",
    },
    product: {
      __typename: "Product",
      id: "prod1",
      title: "Amazing Product",
      discount: 20,
      price: 100.0,
      thumbnail: getRandomImage(),
    },
    user: {
      __typename: "Account",
      id: "user1",
      profile: {
        __typename: "Profile",
        photo: getRandomImage(),
        username: "user1name",
        id: "profile1",
        verified: true,
        profession: "Influencer",
      },
    },
  },
  {
    __typename: "ProductPost",
    id: "post2",
    productId: "prod2",
    views: 2500,
    shares: 300,
    reactionNum: 500,
    comments: 75,
    userId: "user2",
    createdAt: "2023-06-02T00:00:00Z",
    location: {
      __typename: "PostLocation",
      address: "456 Market St",
      city: "Shoptown",
      country: "Productland",
      state: "Productstate",
    },
    product: {
      __typename: "Product",
      id: "prod2",
      title: "Incredible Product",
      discount: 10,
      price: 200.0,
      thumbnail: getRandomImage(),
    },
    user: {
      __typename: "Account",
      id: "user2",
      profile: {
        __typename: "Profile",
        photo: getRandomImage(),
        username: "user2name",
        id: "profile2",
        verified: false,
        profession: "Blogger",
      },
    },
  },
  {
    __typename: "ProductPost",
    id: "post3",
    productId: "prod3",
    views: 500,
    shares: 50,
    reactionNum: 100,
    comments: 20,
    userId: "user3",
    createdAt: "2023-06-03T00:00:00Z",
    location: {
      __typename: "PostLocation",
      address: "789 Commerce Ave",
      city: "Tradetown",
      country: "Productland",
      state: "Productstate",
    },
    product: {
      __typename: "Product",
      id: "prod3",
      title: "Fantastic Product",
      discount: 15,
      price: 150.0,
      thumbnail: getRandomImage(),
    },
    user: {
      __typename: "Account",
      id: "user3",
      profile: {
        __typename: "Profile",
        photo: getRandomImage(),
        username: "user3name",
        id: "profile3",
        verified: true,
        profession: "Reviewer",
      },
    },
  },
];

const FAKE_RECOMMENDED_SERVICES_POSTS = {
  __typename: "ServicesCursorPaginationResponse",
  cursor: "initial_cursor",
  hasMore: true,
  nextCursor: "next_cursor_123",
  data: [
    {
      __typename: "Service",
      name: "Relaxing Massage",
      thumbnail: getRandomImage(),
      price: 75.0,
      type: "Wellness",
      description:
        "A soothing and relaxing massage to rejuvenate your body and mind.",
      speciality: "Massage Therapy",
      id: "service1",
      ingredients: ["Essential oils", "Aromatherapy"],
      owner: {
        __typename: "Account",
        profile: {
          __typename: "Profile",
          username: "therapist123",
          photo: getRandomImage(),
          verified: true,
        },
        shop: {
          __typename: "Shop",
          location: {
            __typename: "Location",
            address: "123 Wellness Blvd",
            country: "Healthland",
            city: "Relaxville",
          },
        },
      },
    },
    {
      __typename: "Service",
      name: "Organic Facial",
      thumbnail: getRandomImage(),
      price: 60.0,
      type: "Beauty",
      description:
        "An organic facial treatment that revitalizes and nourishes your skin.",
      speciality: "Facial Treatments",
      id: "service2",
      ingredients: ["Organic products", "Natural extracts"],
      owner: {
        __typename: "Account",
        profile: {
          __typename: "Profile",
          username: "beautyguru456",
          photo: getRandomImage(),
          verified: false,
        },
        shop: {
          __typename: "Shop",
          location: {
            __typename: "Location",
            address: "456 Beauty St",
            country: "Glamland",
            city: "Beautytown",
          },
        },
      },
    },
    {
      __typename: "Service",
      name: "Deep Tissue Massage",
      thumbnail: getRandomImage(),
      price: 85.0,
      type: "Wellness",
      description: "A deep tissue massage to relieve muscle tension and pain.",
      speciality: "Massage Therapy",
      id: "service3",
      ingredients: ["Therapeutic oils", "Warm compress"],
      owner: {
        __typename: "Account",
        profile: {
          __typename: "Profile",
          username: "healinghands789",
          photo: getRandomImage(),
          verified: true,
        },
        shop: {
          __typename: "Shop",
          location: {
            __typename: "Location",
            address: "789 Therapy Rd",
            country: "Healthland",
            city: "Therapytown",
          },
        },
      },
    },
  ],
};

export const SellerShopView: React.FC = () => {
  const cols = useBreakpointValue({ base: 1, md: 2, lg: 3 });
  const { getParam, visit } = useRouting();

  const type = getParam("s_type");

  const setType = (v) => visit((r) => r.addQuery({ s_type: v }));
  const [serviceType, setServiceType] = React.useState<ServiceType>(
    ServiceType.Hotel
  );

  const { t } = useTranslation();
  //WARNING: grqphql is not ready yet
  const { data: _data } = useGetRecommendedShopPostsQuery({});
  const data = FAKE_RECOMMENDED_SHOP_POSTS;

  const {
    data: _recommendedServices,
    fetchNextPage,
    hasNextPage,
  } = useGetRecommendedServices(
    { type: serviceType, take: 30 },
    {
      getNextPageParam: (last) => last.nextCursor,
    }
  );
  const recommendedServices = FAKE_RECOMMENDED_SERVICES_POSTS;
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
                className={`${type === "product"
                    ? "text-black font-semibold border-black"
                    : "text-[#707070] border-white"
                  } border-b-2 pb-2`}
              >
                {t("Shop")}
              </p>
            </button>
            <button>
              <p
                className={`${type === "service"
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
                    alt="shop"
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
            <HStack className="w-full overflow-x-scroll noScroll gap-4 flex justify-center">
              {mapArray(services, (v) => (
                <div
                  key={v.key}
                  onClick={() => setServiceType(v.key)}
                  className={`flex flex-col items-center gap-1`}
                >
                  <div
                    className={`w-10 h-10 text-2xl flex justify-center items-center rounded-lg ${v.key === serviceType
                        ? "bg-black fill-white text-white"
                        : "bg-white fill-iconGray text-iconGray"
                      }`}
                  >
                    {v.key === serviceType
                      ? runIfFn(v.activeIcon)
                      : runIfFn(v.icon)}
                  </div>
                  <p
                    className={` ${v.key === serviceType
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
                className={`${showOn([
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
                {/*
                  NOTE:This line is commented because the placeholder data does not have pages
                {mapArray(recommendedServices?.pages, (v, i) => (
               */}
                <React.Fragment>
                  {mapArray(recommendedServices.data, (v, i) => (
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
                          alt="thumbnail"
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
                            <p className="text-xs font-normal">{t("Night")}</p>
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
                ))
              </div>
            </ScrollCursorPaginationWrapper>
          </div>
        </SimpleTabItemList>
      </SimpleTabs>
    </div>
  );
};
