import { Avatar, Button, Flex, HStack, Text } from "@chakra-ui/react";
import { t } from "i18next";
import { Rate } from "antd";
import React from "react";
import { ProfileInfo } from "types/market/Social";
import { NumberShortner } from "../../helpers/numberShortener";

export interface ShopCardDetailsProps {
  user: ProfileInfo;
  title: string;
  rating: number;
  price: number;
  oldPrice: number;
  views: number;
  onFollow?: () => any;
}

export const ShopCardDetails: React.FC<ShopCardDetailsProps> = ({
  oldPrice,
  price,
  rating,
  title,
  user,
  views,
  onFollow,
}) => {
  return (
    <Flex
      p="1rem"
      align={"start"}
      bg="primary.main"
      w="100%"
      direction={"column"}
    >
      <HStack justify={"space-between"} w="100%">
        <HStack color="white">
          <Avatar src={user.thumbnail} name={user.name} />
          <Text>{user.name}</Text>
        </HStack>
        <Button
          _focus={{ ring: "0px" }}
          bgColor={"primary.main"}
          colorScheme={"primary"}
          textTransform={"capitalize"}
        >
          {t("follow", "follow")}
        </Button>
      </HStack>
      <Text
        textAlign={"start"}
        color="white"
        fontSize={"x-large"}
        fontWeight="semibold"
      >
        {title}
      </Text>
      <Flex
        align={"center"}
        gap="0.25rem"
        fontWeight={"semibold"}
        color="white"
      >
        <Text fontSize={"x-large"}>${price}</Text>
        {oldPrice && (
          <Text
            textDecoration={"line-through"}
            color="gray.100"
            fontSize={"xl"}
          >
            ${oldPrice}
          </Text>
        )}
      </Flex>
      <Rate disabled allowHalf value={rating} className="" />
      <Text
        color="white"
        fontWeight={"semibold"}
        fontSize="xl"
        textTransform={"capitalize"}
      >
        {NumberShortner(views)} {t("views", "views")}
      </Text>
    </Flex>
  );
};
