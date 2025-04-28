import { useSocialControls } from "@blocks";
import { ServiceType, StoreType } from "@features/API";
import { useGetShopDetailsQuery } from "@features/Shop";
import { useFollowProfileMutation } from "@features/Social";
import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  AspectRatio,
  Avatar,
  Button,
  Drawer,
  DrawerContent,
  EmailIcon,
  HStack,
  HeartOutlineAltIcon,
  Image,
  LocationIcon,
  LocationOutlineIcon,
  PaperPlaneAngleOutlineIcon,
  PhoneHandleIcon,
  PriceDisplay,
  Slider,
  TimeClockDisplay,
  Video,
} from "@partials";
import { SectionHeader } from "@sections/ShoppingManagement";
import { startCase } from "lodash";
import React, { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { useRouting } from "routing";
import { mapArray } from "utils";

export const MarketServiceDetailsDrawer: React.FC = () => {
  const { shareLink } = useSocialControls();
  const { getUrl, visit } = useRouting();

const { t }: { t: (key: string, ...args: any[]) => string } = useTranslation();
  const { mutate: follow } = useFollowProfileMutation();
  const { value } = useSocialControls("marketShowServiceDetails");

  const isOpen = typeof value === "string" && value.length > 0;
  const id = value;

  const { data } = useGetShopDetailsQuery(id!, {
    enabled: isOpen,
  });

  const showOn = (types: ServiceType[]) =>
    types.includes(data?.type as ServiceType);

  const contactItems: { label: string; value: string; icon: ReactNode }[] = [
    {
      label: t("Address"),
      icon: <LocationIcon />,
      value: `${data?.location?.address}, ${data?.location?.city}, ${data?.location?.country}`,
    },
    {
      label: t("Phone"),
      icon: <PhoneHandleIcon />,
      value: `${data?.phone}`,
    },
    {
      label: t("E-mail"),
      icon: <EmailIcon />,
      value: `${data?.email}`,
    },
  ];

  return (
    <Drawer position="bottom" full onClose={() => {}} isOpen={isOpen}>
      <DrawerContent>
        <SectionHeader sectionTitle={startCase(data?.type || t("Service"))} />

        <div className="flex flex-col gap-6">
          <div className="relative">
            <div className="absolute top-0 right-0 p-4 flex flex-col gap-6">
              <button
                onClick={() => {}}
                className="w-6 h-6 flex justify-center items-center rounded-full bg-black/30"
              >
                {/* TODO: create user saves for shops */}
                <HeartOutlineAltIcon />
              </button>

              <button
                onClick={() =>
                  data
                    ? shareLink(getUrl((r) => r.visitServiceDetails(data?.id)))
                    : null
                }
                className="w-6 h-6 flex justify-center items-center rounded-full bg-black/30"
              >
                <PaperPlaneAngleOutlineIcon />
              </button>
            </div>

            <div className="flex flex-col gap-4">
              <MarketServicePresentationDisplay
                images={data?.images || []}
                title={data?.name || ""}
                videos={data?.videos || []}
              />

              <HStack>
                <LocationOutlineIcon />
                <p className="flex items-center gap-1 text-sm">
                  {data?.location.address},{" "}
                  {data?.location.state || data?.location.city},{" "}
                  {data?.location.country}
                </p>
              </HStack>

              <p className="flex items-center">
                <span className="text-lg font-semibold">
                  <PriceDisplay symbolProps={{ className: "text-primary" }} />/
                </span>
                <span className="text-sm text-grayText">{t("Day")}</span>
              </p>
            </div>
          </div>

          <HStack className="justify-between">
            <HStack>
              <Avatar
                className="text-[2.5rem]"
                src={data?.sellerProfile.photo}
                alt={data?.sellerProfile.username}
              />
              <div className="flex flex-col gap-1">
                <p>{data?.sellerProfile.username}</p>
                {/* TODO:  display category */}
                <p>
                  {startCase(data?.type || "service")} {t("Service")}
                </p>
              </div>
            </HStack>

            <HStack>
              <Button
                colorScheme="darkbrown"
                onClick={() =>
                  data?.sellerProfile?.id
                    ? follow({ profileId: data?.sellerProfile?.id })
                    : null
                }
              >
                {t("Follow")}
              </Button>

              <Button
                colorScheme="darkbrown"
                outline
                onClick={() =>
                  data?.sellerProfile?.id
                    ? visit((r) =>
                        r.visitChatRoomByProfileId(data?.sellerProfile?.id),
                      )
                    : null
                }
              >
                {t("Contact")}
              </Button>
            </HStack>
          </HStack>

          {showOn([ServiceType.Hotel, ServiceType.HolidayRentals]) ? (
            // TODO: arrival/departure
            (<></>)
          ) : null}

          <div className="flex flex-col gap-2">
            <p>{t("Description")}</p>
            <p>{data?.description}</p>
          </div>

          {showOn([
            ServiceType.Hotel,
            ServiceType.HolidayRentals,
            ServiceType.Vehicle,
          ]) ? (
            <>{/* TODO: facilities */}</>
          ) : null}

          <Accordion defaultOpen>
            <AccordionItem itemkey={"contact"}>
              <AccordionButton>{t("Contact")}</AccordionButton>
              <AccordionPanel>
                {mapArray(contactItems, (item, i) => (
                  <HStack key={i} className="justify-between">
                    <div className="flex flex-col gap-1">
                      <p className="text-xs text-grayText">{item.label}</p>
                      <p className="text-sm font-medium">{item.value}</p>
                    </div>
                    {/* @ts-ignore */}
                    <div className="text-2xl">{item.icon}</div>
                  </HStack>
                ))}
              </AccordionPanel>
            </AccordionItem>

            <AccordionItem itemkey={"terms_and_policies"}>
              <AccordionButton>{t("Terms and Policies")}</AccordionButton>
              <AccordionPanel>
                {/* TODO: get terms and policies from api */}
              </AccordionPanel>
            </AccordionItem>
          </Accordion>

          <div className="flex flex-col gap-4">
            <p className="text-lg font-semibold">{t("Working Hours")}</p>

            <div className="grid grid-col-2 gap-2">
              {(data?.workingSchedule?.weekdays
                ? Object.entries(data.workingSchedule.weekdays)
                : []
              )
                .filter((v) => v[0].length < 3)
                .map(([key, value], i) => {
                  const sameDay = false;
                  const from =
                    typeof value === "string" ? null : value?.periods.at(0);
                  const to =
                    typeof value === "string" ? null : value?.periods.at(1);
                  return (
                    <HStack
                      className={`rounded-xl flex items-center justify-center gap-2 py-3 ${
                        sameDay ? "border-primary bg-primary-50" : "bg-white"
                      } border`}
                    >
                      <TimeClockDisplay
                        from={new Date(from!)}
                        to={new Date(to!)}
                        off={!from || !to}
                      />
                      <div className="flex flex-col gap-2">
                        <p className="text-xs">
                          {new Date(from!).toLocaleDateString("en-us", {
                            weekday: "long",
                          })}
                        </p>

                        <div className="flex text-primary text-sm">
                          {from && to ? (
                            <>
                              <p>
                                {new Date(from).toLocaleTimeString("en-us", {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })}
                              </p>
                              -
                              <p>
                                {new Date(to).toLocaleTimeString("en-us", {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })}
                              </p>
                            </>
                          ) : (
                            <p>{t("Day off")}</p>
                          )}
                        </div>
                      </div>
                    </HStack>
                  );
                })}
            </div>
          </div>

          {/* TODO: dispaly services */}

          {/* TODO: display map */}

          {/* TODO: display reviews */}
        </div>
      </DrawerContent>
    </Drawer>
  );
};

const MarketServicePresentationDisplay: React.FC<{
  title: string;
  images: string[];
  videos: string[];
}> = ({ images, title, videos }) => {
  const [idx, setIdx] = React.useState<number>(0);

  return (
    <div className="flex flex-col gap-4">
      <Slider currentItemIdx={idx} onSliderChange={(idx) => setIdx(idx)}>
        {mapArray(videos, (src, i) => (
          <AspectRatio key={i} ratio={1.3}>
            <Video className="w-full h-full" src={src} />
          </AspectRatio>
        ))}

        {mapArray(images, (src, i) => (
          <AspectRatio key={i} ratio={1.3}>
            <Image className="w-full h-full object-cover" src={src} />
          </AspectRatio>
        ))}
      </Slider>

      <div className="flex justify-between gap-4">
        <p className="text-xl font-semibold">{title}</p>

        <p className="text-sm text-white bg-black/30 rounded-md flex">
          {idx + 1}/{(images?.length || 0) + (videos?.length || 0)}
        </p>
      </div>
    </div>
  );
};
