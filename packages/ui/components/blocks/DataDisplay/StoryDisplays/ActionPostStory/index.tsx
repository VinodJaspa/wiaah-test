import React from "react";
import { ActionViewer, actionsPlaceholders } from "@UI";
import { useRouter } from "next/router";
import { useStory } from "@UI";

export interface ActionPostStoryProps {
  postId: string;
}

export const ActionPostStory: React.FC<ActionPostStoryProps> = ({ postId }) => {
  const router = useRouter();
  const { CloseStories } = useStory();
  function handleRoute() {
    if (actionsPlaceholders[0].url) {
      CloseStories();
      router.replace(actionsPlaceholders[0].url);
    }
  }
  return (
    <div className="cursor-pointer" onClick={handleRoute}>
      <div className="pointer-events-none">
        <ActionViewer
          playIcon
          dark={true}
          interactionPos="in"
          action={actionsPlaceholders[0]}
        />
      </div>
    </div>
  );
};
