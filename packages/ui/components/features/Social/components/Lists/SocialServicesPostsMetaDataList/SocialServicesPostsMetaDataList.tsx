import { usePagination } from "hooks";
import React from "react";
import {
  ServicesSearchGrid,
  useGetServicesPostsOnMapDataQuery,
  SocialServicePostMetaDataCard,
  SpinnerFallback,
} from "ui";

export const SocialServicesPostsMetaDataList: React.FC = () => {
  const { page, take } = usePagination();
  const {
    data: res,
    isLoading,
    isError,
  } = useGetServicesPostsOnMapDataQuery({}, { page, take });
  return res ? (
    <SpinnerFallback isLoading={isLoading} isError={isError}>
      <ServicesSearchGrid
        component={SocialServicePostMetaDataCard}
        data={res?.data}
        handlePassData={(props) => props}
      />
    </SpinnerFallback>
  ) : null;
};
