import { mapArray, randomNum } from "@UI/../utils/src";
import { getRandomImage } from "@UI/placeholder";
import { useSocialControls } from "@blocks";
import { ServiceType } from "@features/API";
import { Map, RenderMap } from "@features/GoogleMaps";
import {
  AspectRatio,
  Avatar,
  CloseIcon,
  DotIcon,
  Drawer,
  DrawerContent,
  HStack,
  Image,
  LocationDistanceOutlineIcon,
  LocationOutlineIcon,
  MathPowerDisplay,
  SearchIcon,
  SunIcon,
  VerifiedIcon,
} from "@partials";
import React from "react";
import { useTranslation } from "react-i18next";
import { startCase } from "lodash";

export const LocationSearchDrawer: React.FC = () => {
  const { value, closeSearchMap } = useSocialControls("searchMap");
  const { t } = useTranslation();
  const [details, setDetails] = React.useState(true);
  const [filter, setfilter] = React.useState<string>();

  const places: { label: string; key: string }[] = [
    {
      key: "",
      label: t("All"),
    },
    {
      key: ServiceType.Restaurant,
      label: t("Restaurant"),
    },
    {
      key: ServiceType.Hotel,
      label: t("Hotels"),
    },
    {
      key: ServiceType.HealthCenter,
      label: t("Health Center"),
    },
    {
      key: ServiceType.BeautyCenter,
      label: t("Beauty Center"),
    },
    {
      key: ServiceType.Vehicle,
      label: t("Vehicle"),
    },
    {
      key: ServiceType.HolidayRentals,
      label: t("Holiday Rentals"),
    },
  ];

  const shops: {
    name: string;
    thumbnail: string;
    category: string;
    thumbnails: string[];
  }[] = [...Array(10)].map((_, i) => ({
    name: ["The Heavenly Hideaway", "Nike"][randomNum(2)],
    category: startCase(
      Object.values(ServiceType)[randomNum(Object.values(ServiceType).length)]
    ),
    thumbnail: getRandomImage(),
    thumbnails: [...Array(20)].map(() => getRandomImage()),
  }));

  return (
    <Drawer
      full
      position="bottom"
      // isOpen={!!value}
      isOpen={true}
      onClose={closeSearchMap}
      draggable
    >
      <DrawerContent>
        <div className="relative h-0 z-10 w-full">
          <HStack className="justify-between absolute top-8 px-4 w-full">
            <div className="w-8 h-8 flex justify-center items-center rounded-full bg-white">
              <CloseIcon
                onClick={() => closeSearchMap()}
                className="text-xl text-black"
              />
            </div>
            <HStack>
              <div className="w-8 h-8 flex justify-center items-center rounded-full bg-white">
                <SearchIcon className="text-xl text-black" />
              </div>
              <div className="w-8 h-8 flex justify-center items-center rounded-full bg-white">
                <LocationDistanceOutlineIcon className="text-black text-xl" />
              </div>
            </HStack>
          </HStack>
        </div>

        <RenderMap />

        <Drawer
          draggable
          isOpen={details}
          onClose={() => setDetails(false)}
          position="bottom"
        >
          <DrawerContent className="p-4">
            <HStack>
              <LocationOutlineIcon className="text-3xl" />
              <div className="flex flex-col">
                <p className="text-lg font-semibold text-black">
                  Jumeirah Street, Dubai
                </p>
                <HStack className="text-[#939393]">
                  <HStack className="gap-1">
                    <SunIcon />
                    <p className="flex gap-1 items-center">
                      30 <MathPowerDisplay power={0}>C</MathPowerDisplay>
                    </p>
                  </HStack>

                  <HStack className="gap-1">
                    <DotIcon className="text-[4px]" />
                    <p>Mostly Sunny</p>
                  </HStack>

                  <HStack className="gap-1">
                    <DotIcon className="text-[4px]" />
                    <p>
                      {new Date().toLocaleTimeString("en-us", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}{" "}
                      GMT
                    </p>
                  </HStack>
                </HStack>
              </div>
            </HStack>

            <HStack className="gap-4 my-4 overflow-x-scroll noScroll">
              {mapArray(places, ({ key, label }) => (
                <p
                  onClick={() => {
                    setfilter(key);
                  }}
                  className={`${
                    filter === key
                      ? "bg-black text-white"
                      : "bg-black bg-opacity-5"
                  } py-2 px-4 rounded-full whitespace-nowrap`}
                >
                  {label}
                </p>
              ))}
            </HStack>

            <div className="h-full overflow-y-scroll flex flex-col gap-6">
              {mapArray(shops, ({ name, thumbnail, category, thumbnails }) => (
                <div className="flex flex-col gap-2">
                  <HStack>
                    <Avatar
                      src={thumbnail}
                      className="min-w-[2.375rem] border-primary border"
                    />
                    <div className="flex flex-col">
                      <HStack>
                        <p className="font-semibold text-base">{name}</p>
                        <VerifiedIcon className="text-primary text-xs"></VerifiedIcon>
                      </HStack>
                      <HStack className="text-xs">
                        <p className="text-xs text-[#939393] font-medium">
                          {category}
                        </p>
                        <HStack className="text-black">
                          <DotIcon className="text-[5px]"></DotIcon>
                          <p>
                            {t("Open until")} {12} PM
                          </p>
                        </HStack>
                      </HStack>
                    </div>
                  </HStack>

                  <div className="grid grid-cols-3 gap-1">
                    {mapArray(thumbnails.slice(0, 6), (v, i) => (
                      <AspectRatio ratio={0.75}>
                        <Image
                          key={i}
                          src={v}
                          className="w-full h-full object-cover rounded-md"
                        />
                      </AspectRatio>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </DrawerContent>
        </Drawer>
      </DrawerContent>
    </Drawer>
  );
};
