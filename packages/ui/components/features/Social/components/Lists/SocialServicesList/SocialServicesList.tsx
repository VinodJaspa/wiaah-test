import { usePagination, useResponsive } from "hooks";
import React from "react";
import {
  useGetServicesPostsQuery,
  ListWrapper,
  PaginationWrapper,
  SocialServicePostCard,
  SpinnerFallback,
} from "ui";
export interface SocialServicesListProps {}

export const SocialServicePostsList: React.FC<SocialServicesListProps> = () => {
  const { take, page } = usePagination(16);
  const {
    data: res,
    isLoading,
    isError,
  } = useGetServicesPostsQuery({ take, page });
  const { isMobile, isTablet } = useResponsive();
  return (
    <SpinnerFallback isLoading={isLoading} isError={isError}>
      {Array.isArray(res?.data) ? (
        <ListWrapper cols={isTablet ? 2 : isMobile ? 1 : 4}>
          {res?.data.map((post) => (
            <SocialServicePostCard {...post} />
          ))}
        </ListWrapper>
      ) : null}
    </SpinnerFallback>
  );
};
