import { Button, Text, VStack } from "@chakra-ui/react";
import React from "react";
import { useTranslation } from "react-i18next";
import { Avatar } from "ui";
import { useStory } from "ui/Hooks";
export interface SocialPostHeaderProps {
  thumbnail: string;
  name: string;
  onViewProfile?: () => any;
}

export const SocialPostHeader: React.FC<SocialPostHeaderProps> = ({
  name,
  onViewProfile,
  thumbnail,
}) => {
  const { t } = useTranslation();
  const { OpenStories, newStory } = useStory();
  return (
    <VStack
      rounded={"lg"}
      color="white"
      bg={"primary.main"}
      px="3rem"
      py="1.5rem"
      gap="0.5rem"
      w={{ base: "100%", md: "fit-content" }}
    >
      <Avatar
        onClick={OpenStories}
        newStory={newStory}
        photoSrc={thumbnail}
        name={name}
        className="w-[3rem] h-[3rem]"
      />
      <Text fontSize={"lg"}>{name}</Text>
      <Button
        _focus={{ ring: "0" }}
        colorScheme={"primary"}
        bgColor="primary.main"
        boxShadow={"lg"}
        textTransform={"capitalize"}
        px="3rem"
        borderWidth={"1px"}
        borderColor={"blackAlpha.500"}
        textColor="white"
        onClick={() => onViewProfile && onViewProfile()}
      >
        {t("view_profile", "view profile")}
      </Button>
    </VStack>
  );
};
