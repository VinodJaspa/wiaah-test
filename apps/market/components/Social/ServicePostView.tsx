import React from "react";
import { useTranslation } from "react-i18next";
import {
  SocialPostHeader,
  SocialStoriesModal,
  SocialServicePostCard,
  useGetServicePostDetailsQuery,
  useSearchFilters,
  SocialServicePostsList,
  Button,
  SpinnerFallback,
  ShowMapButton,
  SocialServicePostDetailsCard,
} from "ui";

export const ServicePostView: React.FC = () => {
  const { t } = useTranslation();
  const { filters } = useSearchFilters();
  const {
    data: res,
    isLoading,
    isError,
  } = useGetServicePostDetailsQuery(filters);
  return (
    <div className="py-2 md:py-16 gap-8 flex flex-col">
      <div className="flex items-center md:items-start flex-col gap-8 mb-24 md:flex-row">
        <SocialStoriesModal />
        <div className="flex flex-col gap-4">
          <SpinnerFallback isError={isError} isLoading={isLoading}>
            {res ? (
              <SocialPostHeader
                name={res.data.profileInfo.name}
                thumbnail={res.data.profileInfo.thumbnail}
              />
            ) : null}
          </SpinnerFallback>
          <ShowMapButton onClick={() => {}} />
        </div>
        <SpinnerFallback isError={isError} isLoading={isLoading}>
          {res ? (
            <SocialServicePostDetailsCard
              user={res.data.profileInfo}
              {...res.data}
            />
          ) : null}
        </SpinnerFallback>
      </div>
      <p className="text-3xl font-bold w-full text-center">
        <SpinnerFallback isError={isError} isLoading={isLoading}>
          {res ? (
            <>
              {t("view", "view")} {res.data.profileInfo.name}{" "}
              {t("other_posts", "other posts")}
            </>
          ) : null}
        </SpinnerFallback>
      </p>
      <SocialServicePostsList />
      <Button outline>{t("view_more", "view more")}</Button>
    </div>
  );
};
