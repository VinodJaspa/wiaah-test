import React from "react";
import { SocialShopCard, shopCardInfoPlaceholder } from "ui";
import { useRouter } from "next/router";
import { Box } from "@chakra-ui/react";
import { useStory } from "ui";

export interface ShopPostStoryProps {
  id: string;
}

export const ShopPostStory: React.FC<ShopPostStoryProps> = ({ id }) => {
  const router = useRouter();

  const { CloseStories } = useStory();
  function handleRoute() {
    CloseStories();
    if (shopCardInfoPlaceholder.url) {
      router.replace(shopCardInfoPlaceholder.url);
    }
  }

  return (
    <Box cursor={"pointer"} onClick={handleRoute}>
      <Box pointerEvents={"none"}>
        <SocialShopCard shopCardInfo={shopCardInfoPlaceholder} />
      </Box>
    </Box>
  );
};
