import React from "react";
import {
  Avatar,
  Flex,
  Icon,
  VStack,
  Text,
  Button,
  HStack,
  useDisclosure,
} from "@chakra-ui/react";
import { BiMessageAltDetail } from "react-icons/bi";
import { CgMoreVertical } from "react-icons/cg";
import { ShopScoialProfileInfo } from "types/market/Social";
import { t } from "i18next";
import { MdVerified } from "react-icons/md";
import { Verified } from "ui";
import { FlagIcon } from "react-flag-kit";
import { SubscribersPopup } from "./SubscribersPopup";

export interface SocialProfileProps {
  shopInfo: ShopScoialProfileInfo;
  onFollow?: () => void;
}

export const SocialProfile: React.FC<SocialProfileProps> = ({
  onFollow,
  shopInfo,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: subscriptionsIsOpen,
    onOpen: subscriptionsOnOpen,
    onClose: subscriptionsOnClose,
  } = useDisclosure();
  return (
    <Flex
      // gap="0.5rem"
      align={"center"}
      bg={{ md: "primary.main" }}
      p="1rem"
      color={"white"}
      fontSize="1.5rem"
      justify={"space-between"}
      direction={"column"}
    >
      <SubscribersPopup
        title={t("subscribers", "subscribers")}
        isOpen={isOpen}
        onClose={onClose}
      />
      <SubscribersPopup
        title={t("subscriptions", "subscriptions")}
        isOpen={subscriptionsIsOpen}
        onClose={subscriptionsOnClose}
      />
      <Flex w="100%" justify={"space-between"}>
        <Icon cursor={"pointer"} as={CgMoreVertical} />
        <Avatar
          showBorder
          size={"2xl"}
          objectFit={"contain"}
          name={shopInfo.name}
          src={shopInfo.thumbnail}
          bgColor="black"
        ></Avatar>
        <Icon cursor={"pointer"} rotate={180} as={BiMessageAltDetail} />
      </Flex>
      <Flex
        bgColor={{ base: "primary.main", md: "transparent" }}
        align={"center"}
        my="0.5rem"
        px="0.25rem"
        rounded={"lg"}
        gap="0.5rem"
      >
        <Text>{shopInfo.name}</Text>
        {shopInfo.verifed && <Icon fontSize={"x-large"} as={MdVerified} />}
      </Flex>
      <Flex lineHeight={"1.8rem"} gap="1rem">
        <Flex direction={"column"} align={"center"} cursor={"pointer"}>
          <Text fontWeight={"bold"}>{shopInfo.publications}</Text>
          <Text textTransform={"capitalize"}>
            {t("publications", "publications")}
          </Text>
        </Flex>
        <Flex
          direction={"column"}
          align="center"
          onClick={subscriptionsOnOpen}
          cursor={"pointer"}
        >
          <Text fontWeight={"bold"}>{shopInfo.subscriptions}</Text>
          <Text textTransform={"capitalize"}>
            {t("subscriptions", "subscriptions")}
          </Text>
        </Flex>
        <Flex
          direction={"column"}
          align="center"
          onClick={onOpen}
          cursor={"pointer"}
        >
          <Text fontWeight={"bold"}>{shopInfo.subscribers}</Text>
          <Text textTransform={"capitalize"}>
            {t("subscribers", "Subscribers")}
          </Text>
        </Flex>
      </Flex>
      <Button
        ring={"0px"}
        _focus={{ ring: "0px" }}
        rounded={"md"}
        my="0.5rem"
        borderWidth={"1px"}
        boxShadow={"lg"}
        px="2rem"
        borderColor="black"
        colorScheme={"primary.main"}
      >
        {t("follow", "Follow")}
      </Button>
      <Flex
        bg={{ base: "whiteAlpha.200", md: "transparent" }}
        gap="0.5rem"
        w="100%"
        align={"center"}
        justify={"end"}
      >
        <Text fontSize={"lg"}>
          <FlagIcon code={shopInfo.countryCode} />
        </Text>
        <Text color={{ base: "black", md: "white" }} fontSize={"md"}>
          {shopInfo.location}
        </Text>
      </Flex>
    </Flex>
  );
};
