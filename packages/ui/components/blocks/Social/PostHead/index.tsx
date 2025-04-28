
import React from "react";
import { HiDotsHorizontal } from "react-icons/hi";
import { useStory } from "@src/Hooks";
import { DisplayPostedSince, Avatar, ShadcnText, ShadcnFlex, ShadcnStack, Menubar, MenubarTrigger, MenubarContent, MenubarItem } from "ui";
import { useTranslation } from "react-i18next";
import { TranslationTextType } from "types";
export interface PostHeadProps {
  creatorName: string;
  creatorPhoto: string;
  createdAt: string;
  newStory?: boolean;
  functional?: boolean;
  onProfileClick?: () => any;
  onViewPostClick?: () => any;
}

const postOptions: TranslationTextType[] = [
  {
    translationKey: "save_for_later",
    fallbackText: "Save For Later",
  },
  {
    translationKey: "report",
    fallbackText: "Report",
  },
  {
    translationKey: "open_the_post",
    fallbackText: "Open The Post",
  },
  {
    translationKey: "hide",
    fallbackText: "Hide",
  },
  {
    translationKey: "copy_url",
    fallbackText: "Copy Url",
  },
];

export const PostHead: React.FC<PostHeadProps> = ({
  creatorName,
  createdAt,
  creatorPhoto,
  newStory,
  functional,
  onProfileClick,
  onViewPostClick,
}) => {
  // const { OpenStories } = useStory();
const { t }: { t: (key: string, ...args: any[]) => string } = useTranslation();
const primaryColor = "bg-primary";
  function handleOpenStories() {
    if (functional) {
      // OpenStories();
    }
    onProfileClick && onProfileClick();
  }

  return (
    <ShadcnFlex className="w-full flex items-center justify-between">
      <ShadcnStack className="flex items-center gap-3">
        <Avatar
          onClick={handleOpenStories}
          name={creatorName}
          photoSrc={creatorPhoto}
          newStory={newStory && functional}
        />
        <ShadcnText data-testid="PostCreatorName" className="font-bold">
          {creatorName}
        </ShadcnText>
      </ShadcnStack>
      <ShadcnFlex className="flex flex-col items-end pt-4">
      <Menubar className="absolute bottom-0 right-0">
          <MenubarTrigger>
            <HiDotsHorizontal
              viewBox="0 5 20 10"
              fontSize="xx-large"
              color={primaryColor}
              cursor={"pointer"}
              style={{ height: "0.5em" }}
            />
          </MenubarTrigger>
          <MenubarContent align="end">
            {postOptions.map((text, i) => (
           <MenubarItem key={i}>
                <ShadcnText>
                  {t(typeof text === "string" ? text : text.fallbackText || "")}
                </ShadcnText>

              </MenubarItem>
            ))}
           </MenubarContent>
           </Menubar>
        <DisplayPostedSince since={createdAt} />
      </ShadcnFlex>
    </ShadcnFlex>
  );
};
