import React from "react";
import { useTranslation } from "react-i18next";
import {
  SocialPostHeader,
  SocialServicePostsList,
  Button,
  SpinnerFallback,
  ShowMapButton,
  SocialServicePostDetailsCard,
  useGetServicePostDetails,
  SocialProfileServicePosts,
} from "ui";

export const ServicePostView: React.FC<{ id: string }> = ({ id }) => {
  const { t } = useTranslation();
  const { data, isLoading, isError } = useGetServicePostDetails(id);

  return (
    <div className="py-2 md:py-16 gap-8 flex flex-col">
      <div className="flex items-center md:items-start flex-col gap-8 mb-24 md:flex-row">
        <div className="flex flex-col gap-4">
          <SpinnerFallback isError={isError} isLoading={isLoading}>
            {data ? (
              <SocialPostHeader
                name={data.user.profile.username}
                thumbnail={data.user.profile.photo}
              />
            ) : null}
          </SpinnerFallback>
          <ShowMapButton onClick={() => {}} />
        </div>
        <SpinnerFallback isError={isError} isLoading={isLoading}>
          {data ? <SocialServicePostDetailsCard post={data} /> : null}
        </SpinnerFallback>
      </div>
      <p className="text-3xl font-bold w-full text-center">
        <SpinnerFallback isError={isError} isLoading={isLoading}>
          {data ? (
            <>
              {t("view")} {data.user.profile.username} {t("other posts")}
            </>
          ) : null}
        </SpinnerFallback>
      </p>
      <SocialProfileServicePosts userId={id} />
      <Button outline>{t("view more")}</Button>
    </div>
  );
};
