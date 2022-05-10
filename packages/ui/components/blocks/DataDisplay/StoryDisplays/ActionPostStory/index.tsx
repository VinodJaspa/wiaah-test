import React from "react";
import { ActionViewer, actionsPlaceholders } from "ui";
import { useRouter } from "next/router";
import { Box } from "@chakra-ui/react";
import { useStory } from "ui";

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
    <Box cursor={"pointer"} onClick={handleRoute}>
      <Box pointerEvents={"none"}>
        <ActionViewer
          playIcon
          dark={true}
          interactionPos="in"
          action={actionsPlaceholders[0]}
        />
      </Box>
    </Box>
  );
};
