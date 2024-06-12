import { usePaginationControls } from "@blocks";
import { useGetProfileServicePostQuery } from "@features/Social/services";
import { ScrollPaginationWrapper } from "@partials";
import React from "react";
import { SocialServicePostsList } from "@features/Social";
import { ServicePostData } from "ui/placeholder";

export const SocialProfileServicePosts: React.FC<{
  userId: string;
}> = ({ userId }) => {
  const { pagination, controls } = usePaginationControls();
  // use This grphql endpoint only if the server is ready if not use Placeholder data
  const { data } = useGetProfileServicePostQuery({ userId, pagination });

  return (
    <ScrollPaginationWrapper controls={controls}>
      <SocialServicePostsList posts={ServicePostData} />
    </ScrollPaginationWrapper>
  );
};
