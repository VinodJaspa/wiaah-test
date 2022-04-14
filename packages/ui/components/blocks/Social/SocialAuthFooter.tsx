import { Button, HStack, Icon, Text, VStack } from "@chakra-ui/react";
import { t } from "i18next";
import React from "react";
import { HiUser } from "react-icons/hi";
import { IoCloudyNightSharp } from "react-icons/io5";

export interface AuthFooterProps {
  onLoginClick?: () => void;
  onSignupClick?: () => void;
}

export const SocialAuthFooter: React.FC<AuthFooterProps> = ({
  onLoginClick,
  onSignupClick,
}) => {
  return (
    <VStack p="2rem" gap="0.5rem" bgColor={"primary.main"}>
      <Text fontWeight={"bold"} fontSize={"xl"} textTransform={"capitalize"}>
        {t("view_more_content", "view more content on wiaah")}
      </Text>
      <HStack gap="0.5rem">
        <Button
          w="10rem"
          boxShadow={"main"}
          bgColor={"white"}
          color="black"
          textTransform={"uppercase"}
          colorScheme={"white"}
          justifyContent="start"
          onClick={() => onLoginClick && onLoginClick()}
        >
          <HStack>
            <Icon fontSize={"lg"} as={HiUser} />
            <Text>{t("login", "login")}</Text>
          </HStack>
        </Button>
        <Button
          w="10rem"
          boxShadow={"main"}
          color={"primary.main"}
          bgColor="black"
          colorScheme={"black"}
          textTransform={"uppercase"}
          justifyContent="start"
          onClick={() => onSignupClick && onSignupClick()}
        >
          <HStack>
            <Icon fontSize={"lg"} as={HiUser} />
            <Text>{t("sign_up", "sign up")}</Text>
          </HStack>
        </Button>
      </HStack>
    </VStack>
  );
};
