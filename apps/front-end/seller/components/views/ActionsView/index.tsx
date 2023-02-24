import { Flex } from "@chakra-ui/react";
import React from "react";
import { SocialActionData } from "types";
import { useTranslation } from "react-i18next";
import { actionsPlaceholders, ActionViewer, PostViewPopup, Slider } from "ui";

import { VerticalCarousel } from "ui";
import { useResponsive } from "ui";
import { useRouter } from "next/router";

export const ActionsView: React.FC = () => {
  const router = useRouter();
  return (
    <div className="bg-white h-screen w-full overflow-hidden flex flex-col items-center">
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

      <div className="bg-white h-5/6 w-[min(35rem,100%)] flex flex-col items-center">
        {/* actions View */}
        <Slider variant="vertical">
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
        </Slider>
      </div>
      {/* </FloatingContainer> */}
    </div>
  );
};
