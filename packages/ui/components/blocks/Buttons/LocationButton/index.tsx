import {
  Button,
  Flex,
  FlexProps,
  Icon,
  IconProps,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { HiLocationMarker } from "react-icons/hi";
import { SearchPlaceItem } from "types";

export interface LocationButtonProps extends SearchPlaceItem {
  onLocationClick?: (locationName: string) => any;
  style?: FlexProps;
  iconStyle?: IconProps;
}

export const LocationButton: React.FC<LocationButtonProps> = ({
  name,
  onLocationClick,
  style,
  iconStyle,
}) => {
  return (
    <Button
      px="0"
      w="100%"
      justifyContent={"start"}
      color="black"
      bgColor={"white"}
      colorScheme={"gray"}
      onClick={() => onLocationClick && onLocationClick(locationName)}
    >
      <Flex gap="1rem" align="center" {...style} spacing="2rem">
        <Icon {...iconStyle} fontSize={"xxx-large"} as={HiLocationMarker} />
        <Text textTransform={"capitalize"} fontWeight={"semibold"}>
          {name}
        </Text>
      </Flex>
    </Button>
  );
};
