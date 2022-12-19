import React from "react";
import { SocialAffiliationCard, socialAffiliationCardPlaceholder } from "@UI";
import { useRouter } from "next/router";
import { useStory } from "@UI";
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
    <div className="cursor-pointer" onClick={handleRoute}>
      <div className="pointer-events-none">
        <SocialAffiliationCard {...socialAffiliationCardPlaceholder} />;
      </div>
    </div>
  );
};
