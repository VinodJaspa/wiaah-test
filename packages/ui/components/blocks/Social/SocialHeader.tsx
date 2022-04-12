import React from "react";
import {
  Box,
  Button,
  Flex,
  HStack,
  Image,
  Input,
  Text,
} from "@chakra-ui/react";
import { t } from "i18next";

export const SocialHeader: React.FC = () => {
  return (
    <Flex
      align={"center"}
      py="0.5rem"
      px="4rem"
      boxShadow={"main"}
      bg={{ base: "white", md: "black" }}
      justify={{ base: "center", md: "space-between" }}
    >
      <Box h="5rem">
        <Image h="100%" src="/wiaah_logo.png" />
      </Box>
      <Flex
        display={{ base: "none", md: "flex" }}
        align={"center"}
        color="white"
        gap="1rem"
      >
        <Flex gap="0.5rem" direction={"column"}>
          <Text>{t("email_or_phone", "Email or Phone")}</Text>
          <Input
            color="black"
            w="17rem"
            bg="white"
            type={"email"}
            placeholder={t("email_or_phone", "email or phone")}
          />
          <Text
            textTransform={"capitalize"}
            cursor={"pointer"}
            color="primary.main"
          >
            {t("forgot_password", "forgot password")}
          </Text>
        </Flex>
        <Flex direction={"column"}>
          <Text textTransform={"capitalize"}>{t("password", "password")}</Text>
          <Input
            color="black"
            bg="white"
            w="17rem"
            type="password"
            placeholder={t("password", "password")}
          />
          <Text visibility={"hidden"}>.</Text>
        </Flex>
        <Button
          textTransform={"capitalize"}
          _focus={{ ring: "0" }}
          colorScheme="primary"
          bgColor={"primary.main"}
        >
          {t("login", "login")}
        </Button>
      </Flex>
    </Flex>
  );
};
