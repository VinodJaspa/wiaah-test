import {
  Button,
  Flex,
  HStack,
  Icon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useTheme,
} from "@chakra-ui/react";
import React from "react";
import { HiDotsHorizontal } from "react-icons/hi";
import { useStory } from "ui/Hooks";
import { DisplayPostedSince, Avatar } from "ui";
import { useTranslation } from "react-i18next";
import { TranslationText } from "types";
export interface PostHeadProps {
  creatorName: string;
  creatorPhoto: string;
  createdAt: string;
  newStory?: boolean;
  functional?: boolean;
  onProfileClick?: () => any;
  onViewPostClick?: () => any;
}

const postOptions: TranslationText[] = [
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
  const { t } = useTranslation();
  const { __cssVars } = useTheme();
  const primaryColor = __cssVars["--chakra-colors-primary-main"];
  function handleOpenStories() {
    if (functional) {
      // OpenStories();
    }
    onProfileClick && onProfileClick();
  }

  return (
    <Flex w="100%" align={"center"} justify={"space-between"}>
      <HStack>
        <Avatar
          onClick={handleOpenStories}
          name={creatorName}
          photoSrc={creatorPhoto}
          newStory={newStory && functional}
        />
        <Text data-testid="PostCreatorName" fontWeight={"bold"}>
          {creatorName}
        </Text>
      </HStack>
      <Flex direction={"column"} align="end" pt="1.1rem">
        <Menu placement="bottom-end">
          <MenuButton>
            <HiDotsHorizontal
              viewBox="0 5 20 10"
              fontSize="xx-large"
              color={primaryColor}
              cursor={"pointer"}
              style={{ height: "0.5em" }}
            />
          </MenuButton>
          <MenuList>
            {postOptions.map(({ fallbackText, translationKey }, i) => (
              <MenuItem>
                <Text>{t(translationKey, fallbackText)}</Text>
              </MenuItem>
            ))}
          </MenuList>
        </Menu>
        <DisplayPostedSince since={createdAt} />
      </Flex>
    </Flex>
  );
};
