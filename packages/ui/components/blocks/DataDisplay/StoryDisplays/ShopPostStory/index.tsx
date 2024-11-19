import React from "react";
import { SocialShopCard, shopCardInfoPlaceholder } from "@UI";
import { useRouter } from "next/router";
import { useStory } from "@UI";

export interface ShopPostStoryProps {
  postId: string;
}

export const ShopPostStory: React.FC<ShopPostStoryProps> = ({ postId }) => {
  const router = useRouter();

  const { CloseStories } = useStory();
  function handleRoute() {
    CloseStories();
    if (shopCardInfoPlaceholder.url) {
      router.replace(shopCardInfoPlaceholder.url);
    }
  }

  return (
    <div className="cursor-pointer w-full h-full">
      <SocialShopCard shopCardInfo={shopCardInfoPlaceholder} />
    </div>
  );
};
