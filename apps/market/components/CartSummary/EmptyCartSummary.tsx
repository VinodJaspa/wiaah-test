import { Flex, Text, Button } from "@chakra-ui/react";
import { t } from "i18next";
import React from "react";
import { colorPalette } from "ui/components/helpers/colorPalette";
import { useRouter } from "next/router";

const EmptyCartSummary: React.FC = () => {
  const router = useRouter();
  return (
    <Flex
      justifyContent={"space-between"}
      direction={"column"}
      alignItems={"end"}
      h="100%"
    >
      <Text w="100%">There are no items in this cart!</Text>
      <Button
        rounded={"none"}
        _hover={{ bgColor: colorPalette.PrimaryGreen }}
        color={colorPalette.whiteText}
        w="fit-content"
        bgColor={colorPalette.PrimaryGreen}
        onClick={() => router.push("/")}
      >
        {t("continue_shopping", "Continue Shopping")}
      </Button>
    </Flex>
  );
};

export default EmptyCartSummary;
