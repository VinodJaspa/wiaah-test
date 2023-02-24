import React from "react";
import { useRouting } from "routing";
import {
  ServicesSearchGrid,
  SocialServicePostMetaDataCard,
  SocialServicePostMetaDataCardProps,
  SpinnerFallback,
} from "@UI";

export const SocialServicesPostsMetaDataList: React.FC<{
  posts: SocialServicePostMetaDataCardProps["post"][];
}> = ({ posts }) => {
  const { visit } = useRouting();
  return (
    <>
      {posts ? (
        <ServicesSearchGrid
          component={SocialServicePostMetaDataCard}
          data={posts}
          handlePassData={(props) => ({
            post: props,
            onClick: () =>
              visit((r) => r.addQuery({ servicepostid: props.id })),
          })}
        />
      ) : null}
    </>
  );
};
