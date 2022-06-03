import { Flex } from "@chakra-ui/react";
import React from "react";
import { SocialActionData } from "types";
import { useTranslation } from "react-i18next";
import { actionsPlaceholders, ActionViewer, PostViewPopup } from "ui";

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
    <Flex
      bgColor={"white"}
      w="100%"
      h="100vh"
      overflow={"hidden"}
      direction="column"
      align="center"
    >
      {/* <Text textTransform={"capitalize"} fontSize={"4xl"} fontWeight="bold">
        {t("action", "action")}
      </Text> */}
      {/* <PostViewPopup
        fetcher={async ({ queryKey }) => {
          const id = queryKey[1].postId;
          const action = actionsPlaceholders.find((post) => post.id === id);
          return action ? action : null;
        }}
        queryName="action"
        idParam="actionId"
        renderChild={(props: SocialActionData) => {
          return <ActionViewer action={props} />;
        }}
      /> */}

      <Flex
        h="100%"
        // w={{ base: "100%", sm: "container.sm", md: "25rem" }}
        overflow="hidden"
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
      </Flex>
      {/* </FloatingContainer> */}
    </Flex>
  );
};
