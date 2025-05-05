import { Button, HStack, VStack } from "@partials";
import React from "react";
import { useTranslation } from "react-i18next";
import { HiUser } from "react-icons/hi";

export interface AuthFooterProps {
  onLoginClick?: () => void;
  onSignupClick?: () => void;
}

export const SocialAuthFooter: React.FC<AuthFooterProps> = ({
  onLoginClick,
  onSignupClick,
}) => {
const { t } = useTranslation();
  return (
    <VStack className="p-8 gap-2 bg-primary">
      <p className="text-xl font-bold capitalize">
        {t("view_more_content", "view more content on wiaah")}
      </p>
      <HStack>
        <Button
          className="uppercase w-40 text-black justify-start"
          color="black"
          colorScheme={"white"}
          onClick={() => onLoginClick && onLoginClick()}
        >
          <HStack>
            <HiUser className="text-lg" />
            <p>{t("login", "login")}</p>
          </HStack>
        </Button>
        <Button
          className="w-40 text-primary bg-black justify-start"
          colorScheme={"darkbrown"}
          onClick={() => onSignupClick && onSignupClick()}
        >
          <HStack>
            <HiUser className="text-lg" />
            <p>{t("sign_up", "sign up")}</p>
          </HStack>
        </Button>
      </HStack>
    </VStack>
  );
};
