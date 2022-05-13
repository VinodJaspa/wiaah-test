import { HStack, Image, Text } from "@chakra-ui/react";
import { SearchLocalizationItem } from "types";
import { NumberShortner } from "../../../helpers";

export interface LocalizationSearchItemProps {
  location: SearchLocalizationItem;
}
export const LocalizationSearchItem: React.FC<LocalizationSearchItemProps> = ({
  location,
}) => {
  return (
    <HStack w="100%" justify={"space-between"}>
      <HStack gap="0.5rem" h="2rem">
        <Image h="100%" src={location.image} />
        <Text>{location.name}</Text>
      </HStack>
      <Text>{NumberShortner(location.views)}</Text>
    </HStack>
  );
};
