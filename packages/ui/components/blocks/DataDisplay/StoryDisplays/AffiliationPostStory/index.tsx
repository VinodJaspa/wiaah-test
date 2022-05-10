import React from "react";
import { SocialAffiliationCard, socialAffiliationCardPlaceholder } from "ui";
import { useRouter } from "next/router";
import { Box } from "@chakra-ui/react";
import { useStory } from "ui";
export interface AffiliationPostStoryProps {
  postId: string;
}

export const AffiliationPostStory: React.FC<AffiliationPostStoryProps> = ({
  postId,
}) => {
  const router = useRouter();

  const { CloseStories } = useStory();
  function handleRoute() {
    CloseStories();
    if (socialAffiliationCardPlaceholder.url) {
      router.replace(socialAffiliationCardPlaceholder.url);
    }
  }
  return (
    <Box cursor={"pointer"} onClick={handleRoute}>
      <Box pointerEvents={"none"}>
        <SocialAffiliationCard {...socialAffiliationCardPlaceholder} />;
      </Box>
    </Box>
  );
};
