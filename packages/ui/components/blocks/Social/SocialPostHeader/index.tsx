import React from "react";
import { useTranslation } from "react-i18next";
import { Avatar, Button, VStack } from "ui";
import { useStory } from "../../../../src/Hooks";
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
    <VStack className="rounded-lg text-white bg-primary px-12 py-6 gap-2 w-full md:w-fit">
      <Avatar
        onClick={OpenStories}
        newStory={newStory}
        photoSrc={thumbnail}
        name={name}
        className="w-[3rem] h-[3rem]"
      />
      <p className="text-lg">{name}</p>
      <Button
        colorScheme={"white"}
        outline
        className="px-12 text-white capitalize"
        onClick={() => onViewProfile && onViewProfile()}
      >
        {t("view_profile", "view profile")}
      </Button>
    </VStack>
  );
};
