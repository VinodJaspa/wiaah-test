import React from "react";
import { SocialActionData } from "types";
import {
  GridWrapper,
  PostAttachment,
  useActionViewPopup,
  ActionViewModal,
} from "ui";

export interface PostCardsListWrapperProps {
  actions: SocialActionData[];
  cols?: number;
  onActionClick?: (actionId: string) => any;
}

export const ActionsListWrapper: React.FC<PostCardsListWrapperProps> = ({
  actions,
  cols = 1,
  onActionClick,
}) => {
  const { setCurrentActionId } = useActionViewPopup();
  return (
    <>
      <ActionViewModal />
      <GridWrapper
        itemProps={{ bg: "black" }}
        items={actions.map((action, i) => ({
          displayVariant: "normal",
          component: (
            <PostAttachment
              key={i}
              minimal
              style={{
                onClick: () => {
                  setCurrentActionId(action.id);
                },
              }}
              controls={false}
              src={action.storySrc || ""}
              type={action.storyType}
            />
          ),
        }))}
        cols={cols}
      />
    </>
  );
};
