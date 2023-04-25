import React from "react";
import { useTranslation } from "react-i18next";
import { BsCameraFill } from "react-icons/bs";
import {
  Avatar,
  Button,
  CommentIcon,
  CommentOutlineIcon,
  DigitalCamera,
  EllipsisText,
  HStack,
  HeartFillIcon,
  HeartOutlineIcon,
  Image,
  SaveFlagOutlineIcon,
  ShareIcon,
  ShareOutlineIcon,
  ShoppingCartOutlinePlusIcon,
  Slider,
  VStack,
  Verified,
  VerticalDotsIcon,
  VolumeIcon,
  getRandomImage,
  useGetPeronalizedActionsQuery,
  useGetSimillarActionsQuery,
} from "ui";
import { NumberShortner, mapArray, randomNum } from "utils";

export const ActionsView: React.FC = () => {
  const { t } = useTranslation();
  const { data } = useGetPeronalizedActionsQuery();
  const { data: simillar } = useGetSimillarActionsQuery({});

  const actions = data ? [data] : [];
  const mockRes = [...Array(15)].map((_, i) => ({
    comments: randomNum(123456),
    reactionNum: randomNum(123456),
    shares: randomNum(123456),
    src: "/action.mp4",
    thumbnail: getRandomImage(),
    id: "",
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

  return (
    <div className="h-screen">
      {/* actions View */}
      <Slider variant="vertical">
        {mapArray(actions, (v, i) => (
          <div key={i} className="w-full h-full relative">
            <video src={v.src} className="w-full h-full object-cover" />
            <div className="absolute pb-14 z-10 px-4 py-6 text-white text-xl top-0 left-0 w-full h-full flex flex-col justify-between">
              <div className="flex justify-between">
                <DigitalCamera />
                <HStack className="gap-4">
                  <VolumeIcon className="text-lg" />
                  <VerticalDotsIcon className="text-sm" />
                </HStack>
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

                {/* product ref */}
                {product ? (
                  <div className="flex flex-col gap-2">
                    <HStack>
                      <Avatar className="w-11" src={product.photo} />
                      <p className="font-bold text-xl font-semibold">
                        {t("Nike")}
                      </p>
                      {product.verified ? <Verified /> : null}
                    </HStack>
                    <div className="flex text-sm gap-2 text-white">
                      <EllipsisText maxLines={2}>
                        {product.prodTitle.slice(0, 79)}
                      </EllipsisText>
                      <Button>
                        <ShoppingCartOutlinePlusIcon className="text-2xl text-white" />
                      </Button>
                    </div>
                  </div>
                ) : null}

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
