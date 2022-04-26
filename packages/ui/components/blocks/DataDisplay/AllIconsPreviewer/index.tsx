import { Flex, Input, VStack, Icon, Text } from "@chakra-ui/react";
import All from "react-icons/fa";
import { IconType } from "react-icons";
import React from "react";

export type IconDetails = {
  iconName: string;
  icon: IconType;
};

export const AllIconsPreviewer: React.FC = () => {
  const [Filter, setFilter] = React.useState<string>("");
  const [icons, setIcons] = React.useState<IconDetails[]>([]);

  React.useEffect(() => {
    if (All) {
      const icons: IconDetails[] = Object.entries(All).map(
        ([key, icon], i) => ({
          icon,
          iconName: key,
        })
      );

      setIcons(icons.filter((icon) => icon.iconName.includes(Filter)));
    }
  }, [Filter]);

  return (
    <Flex w="100%" direction={"column"}>
      <Input
        w="80%"
        value={Filter}
        onChange={(e) => setFilter(e.target.value)}
      />
      <Flex gap="1rem" flexWrap={"wrap"}>
        {icons.map(({ iconName, icon }, i) => (
          <VStack key={i}>
            <Icon as={icon} />
            <Text>{iconName}</Text>
          </VStack>
        ))}
      </Flex>
    </Flex>
  );
};
