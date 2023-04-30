import { getRandomName, useForm } from "@UI/../utils/src";
import { getRandomImage } from "@UI/placeholder";
import { ReportContentType, useSocialControls } from "@blocks";
import { MessageAttachmentType } from "@features/API";
import { useSendChatMessageMutation } from "@features/Chat/services/useSendChatMessage";
import {
  useGetUserChatRoomQuery,
  useGetUserStory,
} from "@features/Social/services";
import {
  Avatar,
  ClockIcon,
  CloseIcon,
  Drawer,
  DrawerContent,
  HStack,
  HorizontalDotsIcon,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  PaperPlaneAngleIcon,
  SmilingFaceFillEmoji,
  Verified,
} from "@partials";
import { useDateDiff } from "@src/index";
import React from "react";
import { useTranslation } from "react-i18next";

export const SocialStoryDrawer: React.FC = () => {
  const { closeStory, value } = useSocialControls("userStory");
  const { t } = useTranslation();
  const userId = typeof value === "string" ? value : null;
  const { form, inputProps } = useForm<Parameters<typeof mutate>[0]>(
    {
      content: "",
    },
    {
      userId: userId,
      attachments: [
        {
          id: "storyId",
          type: MessageAttachmentType.Story,
          src: "",
        },
      ],
    }
  );

  const { data } = useGetUserStory(value!, {
    enabled: typeof value === "string",
  });

  const { mutate: getUserRoom } = useGetUserChatRoomQuery();
  const { mutate } = useSendChatMessageMutation();

  return (
    <Drawer full position="bottom" isOpen={!!value} onClose={closeStory}>
      <DrawerContent className="p-4 max-h-[100vh] noScroll flex flex-col gap-6 bg-[#000]">
        <div className="h-[93%]">
          <StoryViewer
            story={{
              content:
                "Lorem Ipsum is simply dummy text of the printing and typesetting",
              createdAt: new Date().toUTCString(),
              id: "",
              src: getRandomImage(),
              type: "img",
            }}
            user={{
              id: "",
              photo: getRandomImage(),
              username: getRandomName().firstName,
            }}
            onClose={closeStory}
            onNext={() => {}}
            onPrev={() => {}}
            totalStoryCount={3}
            currentStory={0}
          />
        </div>
        <HStack className="w-full self-end gap-6 bg-black">
          <InputGroup className="w-full rounded-full px-2 pr-4">
            <Input
              {...inputProps("content")}
              className="bg-black placeholder:text-white"
              placeholder={t("Write a message....")}
            />

            <InputRightElement>
              <SmilingFaceFillEmoji className="text-white text-xl" />
            </InputRightElement>
          </InputGroup>
          <PaperPlaneAngleIcon
            className="text-3xl text-white cursor-pointer"
            onClick={() => {
              if (typeof value === "string") {
                getUserRoom(
                  {
                    userId: value,
                  },
                  {
                    onSuccess(data) {
                      mutate({
                        ...form,
                        roomId: data.id,
                      });
                    },
                  }
                );
              }
            }}
          />
        </HStack>
      </DrawerContent>
    </Drawer>
  );
};

interface SocialViewerProps {
  user: {
    id: string;
    username: string;
    photo: string;
  };
  currentStory: number;
  totalStoryCount: number;
  story: {
    id: string;
    src: string;
    content: string;
    createdAt: string;
    type: "img" | "video";
  };
  onClose: () => any;
  onNext: () => any;
  onPrev: () => any;
}

export const StoryViewer: React.FC<SocialViewerProps> = ({
  onClose,
  story,
  user,
  currentStory,
  totalStoryCount,
}) => {
  const { t } = useTranslation();
  const { reportContent } = useSocialControls();
  if (!story) return null;
  const { getSince } = useDateDiff({
    from: new Date(story.createdAt),
    to: new Date(),
  });
  const since = getSince();

  return (
    <div className="w-full h-full flex flex-col bg-black gap-4">
      <HStack className="gap-4">
        <HStack>
          <Avatar src={user.photo} className="min-w-[2.125rem]" />
          <div>
            <HStack className="text-sm">
              <p className="font-semibold text-white">{user.username}</p>
              <Verified className="text-blue-500 text-sm"></Verified>
            </HStack>

            <HStack className="text-[#BFBFBF] gap-[0.25rem]">
              <ClockIcon className="text-sm" />
              <p className=" text-xs">
                {since.value}
                {since.timeUnitNarrow}
              </p>
            </HStack>
          </div>
        </HStack>
        <HStack className="w-full">
          {[...Array(totalStoryCount)].map((_, i) => (
            <div
              className={`h-[1.5px] w-full relative rounded-3xl ${
                i < currentStory ? "bg-white" : "bg-[#B9B9B9]"
              }`}
            >
              {currentStory === i ? (
                <div className="h-full absolute top-0 right-1/2 left-0 bg-white"></div>
              ) : null}
            </div>
          ))}
        </HStack>
        <Menu>
          <MenuButton>
            <HorizontalDotsIcon className="text-white text-lg" />
          </MenuButton>
          <MenuList>
            <MenuItem
              onClick={() => {
                reportContent(story.id, ReportContentType.story);
              }}
            >
              <p>{t("Report")}</p>
            </MenuItem>
          </MenuList>
        </Menu>
        <CloseIcon
          onClick={() => {
            onClose && onClose();
          }}
          className="text-sm text-white"
        />
      </HStack>
      {story?.content?.length > 0 ? (
        <p className="text-white text-center font-semibold text-xl">
          {story.content}
        </p>
      ) : null}

      {story.type === "img" ? (
        <Image
          src={story.src}
          className="w-full rounded-2xl h-full object-cover"
        />
      ) : (
        <video
          src={story.src}
          className="w-full h-full rounded-2xl object-cover"
        />
      )}
    </div>
  );
};
