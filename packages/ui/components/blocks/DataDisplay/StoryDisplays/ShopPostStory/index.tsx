import React from "react";
import { SocialShopCard, shopCardInfoPlaceholder } from "ui";
import { useRouter } from "next/router";
import { useStory } from "ui";

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
    <div className="cursor-pointer" onClick={handleRoute}>
      <div className="pointer-events-none">
        <SocialShopCard shopCardInfo={shopCardInfoPlaceholder} />
      </div>
    </div>
  );
};
