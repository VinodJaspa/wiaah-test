import { usePaginationControls } from "@blocks";
import { useGetProfileServicePostQuery } from "@features/Social/services";
import { ScrollPaginationWrapper } from "@partials";
import React from "react";
import { SocialServicePostsList } from "@features/Social";

export const SocialProfileServicePosts: React.FC<{
  userId: string;
}> = ({ userId }) => {
  const { pagination, controls } = usePaginationControls();
  const { data } = useGetProfileServicePostQuery({ userId, pagination });
  return (
    <ScrollPaginationWrapper controls={controls}>
      <SocialServicePostsList
        posts={
          data?.map((v) => ({ postInfo: v, profileInfo: v.user.profile! })) ||
          []
        }
      />
    </ScrollPaginationWrapper>
  );
};
