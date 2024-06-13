import { useTranslation } from "react-i18next";
import { BiVolumeFull } from "react-icons/bi";
import { BsPlayFill } from "react-icons/bs";
import { CgPlayButtonR } from "react-icons/cg";
import {
  HiHeart,
  HiOutlineChat,
  HiShare,
  HiDotsHorizontal,
} from "react-icons/hi";
import { SocialActionData } from "types";
import { useActionComments, PostAttachment, ActionHeader } from "@UI";
import { AttachmentType } from "@features/API";

export interface ActionsViewerProps {
  action: SocialActionData;
  play?: boolean;
  onActionClick?: (actionId: string) => any;
  dark?: boolean;
  interactionPos?: "in" | "out";
  muteIcon?: boolean;
  playIcon?: boolean;
}

export const ActionViewer: React.FC<ActionsViewerProps> = ({
  action,
  play,
  onActionClick,
  dark,
  muteIcon,
  playIcon,
  interactionPos = "out",
}) => {
  const { ToggleComments } = useActionComments();
  const { t } = useTranslation();
  return (
    <div className="relative h-full w-[min(35rem,100%)] mx-auto">
      {action && (
        <>
          <div
            className={`${dark ? "text-white bg-black bg-opacity-30" : " "} ${interactionPos === "in"
                ? "right-0 text-white"
                : "left-full text-black"
              } z-10 bottom-0 absolute flex justify-center px-1 text-center gap-2 flex-col rounded-full text-7xl`}
          >
            <div className="flex flex-col ml-1 justify-center">
              <HiHeart />
              <span className="text-xl">1.5k</span>
            </div>
            <div
              className="flex flex-col justify-center"
              onClick={ToggleComments}
            >
              <HiOutlineChat />
              <span className="text-xl">500</span>
            </div>
            <div className="flex flex-col justify-center gap-0">
              <HiShare />
              <span className="text-xl">{t("share", "share")}</span>
            </div>
            <div className="flex flex-col justify-center">
              <HiDotsHorizontal />
            </div>
          </div>
          <ActionHeader
            className="absolute bottom-0 left-0 z-10 w-full p-2 text-white min-h-max bg-gradient-to-t from-black to-transparent bg-opacity-80"
            actionHashtags={[]}
            actionTitle={action.title}
            userName={action.user.name}
            userThumbnail={action.user.thumbnail}
            actionLocation={"Los Angeles"}
          />
          {muteIcon ? (
            <BiVolumeFull
              className={`${muteIcon ? "hidden" : ""
                } absolute z-10 top-4 right-4 rounded-full bg-black bg-opacity-40 text-white text-5xl`}
            />
          ) : null}
          <BsPlayFill
            className={`${playIcon ? "hidden" : ""
              } absolute z-10 top-4 left-4 rounded-full bg-black bg-opacity-40 text-white text-5xl`}
          />
          <CgPlayButtonR
            className={`absolute ${muteIcon ? "top-14" : "top-4"
              } right-4 z-10 text-5xl text-white`}
          />

          <div
            className="flex gap-2 self-start h-full flex-col"
            onClick={() => onActionClick && onActionClick(action.id)}
          >
            <PostAttachment
              type={
                action.storyType === "image"
                  ? AttachmentType.Img
                  : AttachmentType.Vid
              }
              src={action.storySrc || ""}
            />
          </div>
        </>
      )}
    </div>
  );
};
