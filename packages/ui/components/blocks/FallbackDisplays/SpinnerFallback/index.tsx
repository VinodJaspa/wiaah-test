import { HStack, Icon, Spinner, Text } from "@chakra-ui/react";
import React from "react";
import { MdError } from "react-icons/md";
import { useTranslation } from "react-i18next";

export interface SpinnerFallbackProps {
  isLoading?: boolean;
  isError?: boolean;
}

export const SpinnerFallback: React.FC<SpinnerFallbackProps> = ({
  isLoading,
  children,
  isError,
}) => {
  const { t } = useTranslation();

  if (isError)
    return (
      <HStack>
        <Icon as={MdError} />
        <Text>{t("something_went_wrong", "something went wrong")}</Text>
      </HStack>
    );

  if (isLoading)
    return (
      <HStack fontSize={"xx-large"} w="100%" justify={"center"}>
        <Text>{t("loading", "Loading")}</Text>
        <Spinner color="primary.main" />
      </HStack>
    );

  return <>{children}</>;
};
