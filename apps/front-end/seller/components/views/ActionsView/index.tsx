import { ContentHostType } from "@features/API";
import React from "react";
import { useTranslation } from "react-i18next";
import {
  Avatar,
  Button,
  CommentIcon,
  DigitalCamera,
  EllipsisText,
  HStack,
  HeartFillIcon,
  Image,
  LocationAddressDisplay,
  LocationOutlineIcon,
  LoopIcon,
  MusicNoteFillIcon,
  PersonGroupIcon,
  SaveFlagOutlineIcon,
  ShareIcon,
  ShoppingCartOutlinePlusIcon,
  Slider,
  StarsIcon,
  VStack,
  Verified,
  VerticalDotsIcon,
  VolumeIcon,
  getRandomImage,
  useGetPeronalizedActionsQuery,
  useGetSimillarActionsQuery,
  useSocialControls,
} from "ui";
import { NumberShortner, mapArray, randomNum } from "utils";

export const ActionsView: React.FC = () => {
  const { t } = useTranslation();
  const { data } = useGetPeronalizedActionsQuery();
  const { data: simillar } = useGetSimillarActionsQuery({});
  const { createRemixAction, showContentTaggedProfiles, openMusicDetails } =
    useSocialControls();

  const actions = data ? [data] : [];
  const mockRes = [...Array(15)].map((_, i) => ({
    comments: randomNum(123456),
    reactionNum: randomNum(123456),
    shares: randomNum(123456),
    src: "/action.mp4",
    thumbnail: getRandomImage(),
    id: `${i}`,
  }));

  const hasProduct = true;
  const product = hasProduct
    ? {
        shopName: "Nike",
        verified: true,
        prodTitle:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the",
        photo: "/wiaah_logo.png",
      }
    : null;

  const actionBadges: {
    label: string;
    onClick: () => any;
    icon: React.ReactNode;
  }[] = [];

  return (
    <div className="h-screen">
      {/* actions View */}
      <Slider variant="vertical">
        {mapArray(actions, (v, i) => (
          <div key={i} className="w-full h-full relative">
            <video src={v.src} className="w-full h-full object-cover" />
            <div className="absolute pb-14 z-10 px-4 py-6 text-white text-xl top-0 left-0 w-full h-full flex flex-col justify-between">
              <div className="flex flex-col gap-6">
                <div className="flex justify-between">
                  <DigitalCamera />
                  <div
                    onClick={() => {
                      openMusicDetails(v.music);
                    }}
                    className="cursor-pointer px-2 py-1 bg-black bg-opacity-40 flex items-center gap-2"
                  >
                    <MusicNoteFillIcon />
                    <p className="text-xs font-medium">{v.music}</p>
                  </div>
                  <HStack className="gap-4">
                    <VolumeIcon className="text-lg" />
                    <VerticalDotsIcon className="text-sm" />
                  </HStack>
                </div>
                <Button colorScheme="gray" className="self-end px-4">
                  <ShoppingCartOutlinePlusIcon className="text-2xl text-white" />
                </Button>
              </div>
              <div className="flex flex-col gap-4">
                {/* interations */}
                <div className="flex flex-col gap-4 w-fit text-lg self-end">
                  <VStack>
                    <SaveFlagOutlineIcon />
                    <p className="font-medium text-xs">{t("Save")}</p>
                  </VStack>
                  <VStack>
                    <HeartFillIcon />
                    <p className="font-medium text-xs">
                      {NumberShortner(data.reactionNum)}
                    </p>
                  </VStack>
                  <VStack>
                    <CommentIcon />
                    <p className="font-medium text-xs">
                      {NumberShortner(data.comments)}
                    </p>
                  </VStack>
                  <VStack>
                    <ShareIcon />
                    <p className="text-xs font-medium">
                      {NumberShortner(data.shares)}
                    </p>
                  </VStack>
                </div>

                <div className="flex flex-col gap-2">
                  <HStack className="flex-wrap gap-2">
                    {[
                      {
                        icon: <LoopIcon />,
                        label: t("Remix"),
                        onClick: () => {
                          createRemixAction(v.id);
                        },
                      },
                      {
                        icon: <StarsIcon />,
                        label: v.effect.name,
                      },
                    ].map((v) => (
                      <HStack
                        onClick={v.onClick}
                        className="rounded-full cursor-pointer bg-black bg-opacity-40 py-1 px-2"
                      >
                        {v.icon}
                        <p className="text-xs font-semibold text-white">
                          {v.label}
                        </p>
                      </HStack>
                    ))}
                  </HStack>
                  <HStack>
                    <Avatar className="w-11" src={v?.profile?.photo} />
                    <div className="flex flex-col">
                      <HStack>
                        <p className="font-semibold">{v?.profile?.username}</p>
                        {v?.profile?.verified ? (
                          <Verified className="text-primary text-sm" />
                        ) : null}
                      </HStack>
                      <HStack>
                        <HStack className="bg-black text-xs rounded-full text-white bg-opacity-40 py-1 px-2">
                          <LocationOutlineIcon />
                          <LocationAddressDisplay
                            address={v.location.address}
                            city={v.location.city}
                            country={v.location.country}
                          />
                        </HStack>
                        <HStack
                          onClick={() =>
                            showContentTaggedProfiles(
                              v.id,
                              ContentHostType.Action
                            )
                          }
                          className="cursor-pointer bg-black text-xs rounded-full text-white bg-opacity-40 py-1 px-2"
                        >
                          <PersonGroupIcon />
                          <p>
                            {v.tags.length} {t("people")}
                          </p>
                        </HStack>
                      </HStack>
                    </div>
                  </HStack>
                  <div className="flex text-sm gap-2 text-white">
                    <EllipsisText maxLines={2}>
                      {product.prodTitle.slice(0, 79)}
                    </EllipsisText>
                  </div>
                </div>

                {/* recommended actions */}
                <div className="pb-3">
                  <HStack className="w-full overflow-x-visible gap-4">
                    {mapArray(mockRes, (v) => (
                      <Image
                        className="object-cover w-[5.25rem] h-[8.438rem] rounded-2xl"
                        src={v.thumbnail}
                      />
                    ))}
                  </HStack>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};
