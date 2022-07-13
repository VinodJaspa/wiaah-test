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
import {
  useActionComments,
  useResponsive,
  PostAttachment,
  ActionHeader,
  FloatingContainer,
} from "ui";

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
  const { isMobile } = useResponsive();
  const { t } = useTranslation();
  return (
    <>
      {action && (
        <FloatingContainer
          className={`${
            interactionPos === "in" ? "pr-0" : "pr-24"
          } h-full max-w-[35rem]`}
          items={[
            {
              label: (
                <div
                  className={`${
                    dark ? "text-white bg-black bg-opacity-30" : "text-black "
                  } flex justify-center px-1 text-center gap-2 flex-col rounded-full text-7xl`}
                >
                  <div className="flex flex-col justify-center">
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
              ),
              right: "0.5rem",
              top: "center",
              floatingItemProps: {
                className: "-translate-y-1/2",
              },
            },
          ]}
        >
          <div
            className="flex gap-2 self-start h-full flex-col"
            onClick={() => onActionClick && onActionClick(action.id)}
          >
            <FloatingContainer
              // pointerEvents={"none"}
              // h="100%"
              // w="100%"
              // display={"flex"}
              // alignItems="center"
              items={[
                {
                  label: (
                    <ActionHeader
                      className="w-full p-2 text-white min-h-max bg-gradient-to-t from-black to-transparent bg-opacity-80"
                      actionHashtags={[]}
                      actionTitle={action.title}
                      userName={action.user.name}
                      userThumbnail={action.user.thumbnail}
                      actionLocation={"Los Angeles"}
                    />
                  ),
                  bottom: true,
                  left: true,
                  floatingItemProps: {
                    className: "w-full",
                  },
                },
                {
                  label: (
                    <BiVolumeFull
                      className={`${
                        muteIcon ? "hidden" : ""
                      } rounded-full bg-black bg-opacity-40 text-white text-5xl`}
                    />
                  ),
                  top: "1rem",
                  right: "1rem",
                },
                {
                  label: (
                    <BsPlayFill
                      className={`${
                        playIcon ? "hidden" : ""
                      } rounded-full bg-black bg-opacity-40 text-white text-5xl`}
                    />
                  ),
                  top: "1rem",
                  left: "1rem",
                },
                {
                  label: <CgPlayButtonR className="text-5xl text-white" />,
                  top: muteIcon ? "3.5rem" : "1rem",
                  right: "1rem",
                },
              ]}
            >
              <PostAttachment
                controls={false}
                autoPlay
                play={play}
                type={action.storyType !== "text" ? action.storyType : "image"}
                src={action.storySrc || ""}
                {...action}
              />
            </FloatingContainer>
          </div>
        </FloatingContainer>
      )}
    </>
  );
};
