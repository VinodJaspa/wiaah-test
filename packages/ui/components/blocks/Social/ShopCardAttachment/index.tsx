import {
  Badge,
  Box,
  BoxProps,
  Button,
  Center,
  Circle,
  Flex,
  Icon,
  IconButton,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { useTranslation } from "react-i18next";
import {
  HiDotsHorizontal,
  HiOutlineHeart,
  HiOutlineShoppingCart,
} from "react-icons/hi";
import { CashBack } from "types/market/CartSummary";
import { Interactions } from "types/market/Social";
import { PostAttachment } from "ui";
import { PostAttachmentProps } from "../PostAttachment";

export interface ShopCardAttachmentProps {
  src: string;
  type: "image" | "video";
  alt?: string;
  cashback?: CashBack;
  discount?: CashBack;
  productType: "product" | "service";
  onInteraction?: (interaction: Interactions) => any;
  showbook?: boolean;
  attachmentProps?: Partial<PostAttachmentProps>;
  innerProps?: React.PropsWithRef<BoxProps>;
}

export const ShopCardAttachment: React.FC<ShopCardAttachmentProps> = ({
  children,
  src,
  type,
  productType,
  cashback,
  discount,
  alt,
  onInteraction,
  showbook,
  attachmentProps,
  innerProps,
}) => {
  const { t } = useTranslation();
  return (
    <Box {...innerProps} maxW="100%" h="100%" position={"relative"}>
      <PostAttachment {...attachmentProps} src={src} type={type} alt={alt} />
      <Flex
        w="100%"
        h="100%"
        position={"absolute"}
        top="0px"
        left="0px"
        p="0.25rem"
        justify={"space-between"}
        pointerEvents="none"
      >
        <Center h="fit-content" bg="white" rounded={"lg"} px="0.25rem">
          <Icon
            cursor={"pointer"}
            fontSize="x-large"
            rounded={"lg"}
            pointerEvents="all"
            onClick={() => onInteraction && onInteraction("moreOpts")}
            as={HiDotsHorizontal}
          />
        </Center>
        <Flex
          justifySelf={"center"}
          align="center"
          direction={"column"}
          py="0.25rem"
          position={"absolute"}
          top="0px"
          left="50%"
          h="100%"
          transform={"auto"}
          translateX={"-50%"}
          justify={"space-between"}
        >
          {cashback && (
            <Box
              alignItems={"center"}
              display={"flex"}
              color="white"
              bg={"secondaryRed"}
              p="0.25rem"
              gap="0.5rem"
              h="fit-content"
              rounded={"lg"}
              fontWeight={"semibold"}
              fontSize={"md"}
            >
              <Text>
                {cashback.value}
                {cashback.unit}
              </Text>
              <Text textTransform={"capitalize"}>
                {t("cashback", "cashback")}
              </Text>
            </Box>
          )}
          {productType === "service" && showbook ? (
            <Button
              colorScheme={"white"}
              px="0.5rem"
              bgColor="white"
              color="black"
              fontWeight={"semibold"}
              w="fit-content"
              p="0.5rem"
              rounded={"lg"}
              textTransform={"capitalize"}
              pointerEvents="all"
              cursor={"pointer"}
              onClick={() => onInteraction && onInteraction("book")}
            >
              {t("book_service", "book service")}
            </Button>
          ) : null}
        </Flex>
        <Flex
          align={"end"}
          h="100%"
          justify={"space-between"}
          direction={"column"}
        >
          <Flex color="gray.700" gap="0.5rem" direction={"column"}>
            <Circle
              pointerEvents="all"
              cursor={"pointer"}
              onClick={() => onInteraction && onInteraction("saveToWL")}
              maxWidth={"fit-content"}
              p="0.25rem"
              bg="white"
            >
              <Icon fontSize={"xl"} as={HiOutlineHeart} />
            </Circle>
            <Circle
              pointerEvents="all"
              cursor={"pointer"}
              onClick={() => onInteraction && onInteraction("addToCart")}
              maxWidth={"fit-content"}
              p="0.25rem"
              bg="white"
            >
              <Icon fontSize={"xl"} as={HiOutlineShoppingCart} />
            </Circle>
          </Flex>
          {discount ? (
            <Flex
              alignItems={"center"}
              color="white"
              bg={"secondaryRed"}
              px="0.5rem"
              gap="0.5rem"
              rounded={"lg"}
              fontWeight={"semibold"}
              fontSize={"md"}
            >
              <Text>
                {discount.value}
                {discount.unit}
              </Text>
              <Text py="0.25rem" textTransform={"uppercase"}>
                {t("off", "off")}
              </Text>
            </Flex>
          ) : (
            <Text visibility={"hidden"}>.</Text>
          )}
        </Flex>
      </Flex>
    </Box>
  );
};
