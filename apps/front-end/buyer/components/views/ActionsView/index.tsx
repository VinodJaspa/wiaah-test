import React from "react";
import { SocialActionData } from "types";
import { useTranslation } from "react-i18next";
import { actionsPlaceholders, ActionViewer, PostViewPopup, ShadcnFlex } from "ui";

import { VerticalCarousel } from "ui";
import { useResponsive } from "ui";
import { useRouter } from "next/router";
// export type ActionPostInteractionsType = {
//   icon:IconType
//   interactionLabel:string
// }

// export const ActionPostInteractions:ActionPostInteractionsType[] = [
//   {
//     icon: HiThumbUp,
//     interactionLabel:"likes"
//   }
// ]

export const ActionsView: React.FC = () => {
  const router = useRouter();
  return (
    <ShadcnFlex
   className="bg:white w-full h-full overflow-hidden column center"

  >


   
    
      {/* <Text textTransform={"capitalize"} fontSize={"4xl"} fontWeight="bold">
        {t("action", "action")}
      </Text> */}

      <div
      className="h-full overflow-hidden"
      
      >
        {/* actions View */}
        <VerticalCarousel>
          {actionsPlaceholders.map((action, i) => (
            <ActionViewer
              onActionClick={(id) => {
                router.push(
                  router.pathname,
                  { query: { actionId: id } },
                  { shallow: true }
                );
              }}
              action={action}
              key={i}
            />
          ))}
        </VerticalCarousel>
      </div>
      {/* </FloatingContainer> */}
      </ShadcnFlex>
  );
};
