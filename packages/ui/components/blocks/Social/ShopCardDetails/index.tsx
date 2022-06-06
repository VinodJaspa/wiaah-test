import { Avatar, Button, Flex, HStack, Text } from "@chakra-ui/react";
import { Rate } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";
import { ProfileInfo } from "types/market/Social";
import { NumberShortner } from "utils";

export interface ShopCardDetailsProps {
  user: ProfileInfo;
  title: string;
  rating: number;
  price: number;
  oldPrice: number;
  views: number;
  onFollow?: () => any;
  onAddToCart?: () => any;
  onBook?: () => any;
  service?: boolean;
}

export const ShopCardDetails: React.FC<ShopCardDetailsProps> = ({
  oldPrice,
  price,
  rating,
  title,
  user,
  views,
  onFollow,
  onAddToCart,
  service,
  onBook,
}) => {
  const { t } = useTranslation();
  function handleFollowClick() {
    onFollow && onFollow();
  }
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
          <Avatar bgColor={"black"} src={user.thumbnail} name={user.name} />
          <Text>{user.name}</Text>
        </HStack>
        <Button
          _focus={{ ring: "0px" }}
          bgColor={"primary.main"}
          colorScheme={"primary"}
          onClick={handleFollowClick}
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
      <HStack w="100%" justify={"space-between"}>
        <Text
          color="white"
          fontWeight={"semibold"}
          fontSize="xl"
          textTransform={"capitalize"}
        >
          {NumberShortner(views)} {t("views", "views")}
        </Text>
        <Button
          colorScheme={"primary"}
          bgColor="primary.main"
          textTransform={"capitalize"}
        >
          {service ? (
            <Text onClick={onBook}>{t("book_now", "book now")}</Text>
          ) : (
            <Text onClick={onAddToCart}>{t("add_to_cart", "add to cart")}</Text>
          )}
        </Button>
      </HStack>
    </Flex>
  );
};
