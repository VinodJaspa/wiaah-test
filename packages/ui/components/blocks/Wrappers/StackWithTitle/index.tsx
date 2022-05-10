import {
  Box,
  Flex,
  FlexProps,
  HStack,
  Icon,
  StackProps,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { useTranslation } from "react-i18next";
import { IconType } from "react-icons";
import { TranslationText } from "types";

export interface StackWithTitleProps {
  title: TranslationText;
  titleIcon: IconType;
  titleStyle?: StackProps;
}

export const StackWithTitle: React.FC<StackWithTitleProps> = ({
  title,
  titleIcon,
  children,
  titleStyle,
}) => {
  const { t } = useTranslation();
  return (
    <Flex gap="0.5rem" direction={"column"}>
      <HStack {...titleStyle} textTransform={"uppercase"} color="gray">
        <Icon as={titleIcon} />
        <Text>{t(title.translationKey, title.fallbackText)}</Text>
      </HStack>
      <Box>{children}</Box>
    </Flex>
  );
};
