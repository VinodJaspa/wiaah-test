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
} from "@chakra-ui/react";
import React from "react";
import { HiDotsHorizontal } from "react-icons/hi";
import { Avatar, DisplayPostedSince } from "ui";
import { MdClose } from "react-icons/md";
import { ProfileInfo } from "types/market/Social";
import { HiEye } from "react-icons/hi";
import { NumberShortner } from "ui/components/helpers/numberShortener";
import { useStorySeenBy } from "../../../Hooks";
import { useTranslation } from "react-i18next";

export interface SocialStoryViewerHeaderProps {
  user: ProfileInfo;
  createdAt: string;
  views: number;
  newStory?: boolean;
  onClose?: () => any;
}

export const SocialStoryViewerHeader: React.FC<SocialStoryViewerHeaderProps> =
  ({ user, views, createdAt, newStory, onClose }) => {
    const { t } = useTranslation();
    const { OpenStorySeenBy } = useStorySeenBy();
    return (
      <Flex fontSize={"xl"} gap="2rem" w="100%" direction={"column"}>
        <Flex w="100%" justify={"space-between"}>
          <Icon
            cursor={"pointer"}
            onClick={onClose && onClose()}
            as={MdClose}
          />
          <Flex gap="0.5rem" align={"center"} direction={"column"}>
            <Avatar
              newStory={newStory}
              showBorder
              size={"lg"}
              name={user.name}
              photoSrc={user.thumbnail}
            />
            <Text>{user.name}</Text>
          </Flex>
          <Menu>
            <MenuButton h={"fit-content"}>
              <Icon as={HiDotsHorizontal} />
            </MenuButton>
            <MenuList color={"black"} textTransform={"capitalize"}>
              <MenuItem>{t("share", "share ")}</MenuItem>
              <MenuItem>{t("copy_url", "copy url")}</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
        <Flex w="100%" justify={"space-between"}>
          <HStack cursor={"pointer"} onClick={OpenStorySeenBy}>
            <Text>{NumberShortner(views)}</Text>
            <Icon as={HiEye} />
          </HStack>
          <DisplayPostedSince ago since={createdAt} />
        </Flex>
      </Flex>
    );
  };
