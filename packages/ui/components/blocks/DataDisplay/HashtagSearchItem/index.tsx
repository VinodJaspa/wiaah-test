import { StackProps, HStack, Icon, Text } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { HiHashtag } from "react-icons/hi";
import { NumberShortner } from "../../../helpers";
import { SearchHashtagItem } from "types";

export interface HashTagSearchProps extends SearchHashtagItem {
  style?: StackProps;
}

export const HashTagSearch: React.FC<HashTagSearchProps> = ({
  hashtagName,
  hashtagViews,
  style,
}) => {
  const { t } = useTranslation();
  return (
    <HStack {...style} w="100%" justify={"space-between"}>
      <HStack spacing="1rem">
        <Icon
          borderWidth={"1px"}
          borderColor={"gray.300"}
          rounded="full"
          p="0.5rem"
          fontSize={"5xl"}
          as={HiHashtag}
        />
        <Text fontWeight={"bold"}>{hashtagName}</Text>
      </HStack>
      <HStack spacing="0.5rem">
        <Text>{NumberShortner(hashtagViews)}</Text>
        <Text>{t("views", "views")}</Text>
      </HStack>
    </HStack>
  );
};
