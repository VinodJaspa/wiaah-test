import React from "react";
import { useTranslation } from "react-i18next";
import { BiCamera, BiSpeaker } from "react-icons/bi";
import { BsCameraFill, BsVolumeDown } from "react-icons/bs";
import {
  CommentOutlineIcon,
  HStack,
  HeartOutlineIcon,
  SaveFlagOutlineIcon,
  ShareOutlineIcon,
  Slider,
  VStack,
  VerticalDotsIcon,
  VolumeIcon,
  useGetPeronalizedActionsQuery,
} from "ui";
import { NumberShortner, mapArray } from "utils";

export const ActionsView: React.FC = () => {
  const { t } = useTranslation();
  const { data } = useGetPeronalizedActionsQuery();

  const actions = data ? [data] : [];

  return (
    <div className="h-screen">
      {/* actions View */}
      <Slider variant="vertical">
        {mapArray(actions, (v, i) => (
          <div key={i} className="w-full h-full relative">
            <video src={v.src} className="w-full h-full object-cover" />
            <div className="absolute pb-14 z-10 px-4 py-6 text-white text-xl top-0 left-0 w-full h-full flex flex-col justify-between">
              <div className="flex justify-between">
                <BsCameraFill />
                <HStack className="gap-4">
                  <VolumeIcon className="text-xl" />
                  <VerticalDotsIcon className="text-normal" />
                </HStack>
              </div>
              <div className="flex flex-col gap-4">
                {/* interations */}
                <div className="flex flex-col gap-4 w-fit self-end">
                  <VStack>
                    <SaveFlagOutlineIcon />
                    {t("Save")}
                  </VStack>
                  <VStack>
                    <HeartOutlineIcon />
                    <p>{NumberShortner(data.reactionNum)}</p>
                  </VStack>
                  <VStack>
                    <CommentOutlineIcon />
                    <p>{NumberShortner(data.comments)}</p>
                  </VStack>
                  <VStack>
                    <ShareOutlineIcon />
                    <p>{NumberShortner(data.shares)}</p>
                  </VStack>
                </div>

                {/* product ref */}
                <div></div>

                {/* recommended actions */}
                <div></div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};
