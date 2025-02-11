import { HStack, Image, Text } from "@chakra-ui/react";
import Link from "next/link";
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
      <div className="flex items-center gap-4">
        <div className="w-[48px] h-[48px] overflow-hidden rounded-full flex-shrink-0">
          <Image
            src={location.image}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <Link href={`/localisation/${location.name}`}>{location.name}</Link>
      </div>
      <Text>{NumberShortner(location.views)}</Text>
    </HStack>
  );
};
