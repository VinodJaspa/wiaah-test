import { Text } from "@chakra-ui/react";
import { ServiceType } from "@features/API";
import React from "react";
import { useTranslation } from "react-i18next";
import { useRouting } from "routing";
import { usePreferedCurrency } from "state";
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
      icon: <HealthCenterFillIcon />,
      activeIcon: <HealthCenterOutlineIcon />,
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
  ];

  return (
    <div className="py-4">
      <SimpleTabs
        onChange={(v) => {
          if (v === 0) setType("product");
          if (v === 1) setType("service");
        }}
        value={type === "product" ? 0 : 1}
      >
        <HStack className="justify-around">
          <SimpleTabHead>
            <p
              className={`${
                type === "product"
                  ? "text-black font-semibold border-black"
                  : "text-[#707070] border-white"
              } border-b-2 pb-2`}
            >
              {t("Shop")}
            </p>
            <p
              className={`${
                type === "service"
                  ? "text-black font-semibold border-black"
                  : "text-[#707070] border-white"
              } border-b-2 pb-2`}
            >
              {t("Service")}
            </p>
          </SimpleTabHead>
        </HStack>
        <SimpleTabItemList>
          <div className="grid grid-cols-2 gap-4 p-4">
            {mapArray(data, (v, i) => (
              <div className="flex flex-col gap-2">
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
                    <Text noOfLines={2}>{v.product?.title}</Text>
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
          <div className="flex flex-col gap-4 p-4">
            <HStack className="w-fit overflow-x-scroll noScroll gap-4">
              {mapArray(services, (v) => (
                <div
                  key={v.key}
                  className={` ${
                    v.key === serviceType
                      ? "text-black font-medium"
                      : "text-[#707070]"
                  } flex flex-col items-center gap-1`}
                >
                  <div
                    className={`w-10 h-10 text-2xl flex justify-center items-center rounded-lg ${
                      v.key === serviceType ? "bg-black" : "bg-white"
                    }`}
                  >
                    {v.key === serviceType
                      ? runIfFn(v.activeIcon)
                      : runIfFn(v.icon)}
                  </div>
                  <p className={` whitespace-nowrap`}>{v.label}</p>
                </div>
              ))}
            </HStack>
          </div>
        </SimpleTabItemList>
      </SimpleTabs>
    </div>
  );
};
