import React from "react";
import { useTranslation } from "react-i18next";
import {
  SocialPostHeader,
  useGetServicePostDetailsQuery,
  useSearchFilters,
  Button,
  SpinnerFallback,
  ShowMapButton,
  SocialServicePostDetailsCard,
  SocialProfileServicePosts,
  ServicePresentationType,
  getRandomImage,
  Divider,
} from "ui";

const randomNum = (max: number) => Math.floor(Math.random() * max);

export const ServicePostView: React.FC = () => {
const { t } = useTranslation();
  const { filters } = useSearchFilters();
  const {
    data: res ,
    isLoading,
    isError,
  } = useGetServicePostDetailsQuery(filters);
  return (
    <div className="p-2 md:py-16 gap-8 flex flex-col">
      <div className="flex items-center md:items-start flex-col gap-4 mb-24 md:flex-row">
        <div className="flex flex-col w-full gap-4">
          <SpinnerFallback isError={isError} isLoading={isLoading}>
            {res ? (
              <SocialPostHeader
                name={res?.data.profileInfo.name}
                thumbnail={res?.data.profileInfo.thumbnail}
              />
            ) : null}
          </SpinnerFallback>
          <ShowMapButton onClick={() => { }} />
        </div>
        <Divider></Divider>
        <SpinnerFallback isError={isError} isLoading={isLoading}>
          <SocialServicePostDetailsCard
            post={{
              id: "",
              comments: randomNum(150),
              reactionNum: randomNum(150),
              service: {
                title:
                  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It ",
                hashtags: ["hotel"],
                presentation: [
                  {
                    src: getRandomImage(),
                    type: ServicePresentationType.Img,
                  },
                ],
              },
            }}
          />
        </SpinnerFallback>
      </div>
      <p className="text-3xl font-bold w-full text-center">
        <SpinnerFallback isError={isError} isLoading={isLoading}>
          {(res ? res : null) ? (
            <>
              {t("view", "view")} {(res ? res : null).data.profileInfo.name}{" "}
              {t("other_posts", "other posts")}
            </>
          ) : null}
        </SpinnerFallback>
      </p>
      <SocialProfileServicePosts userId="" />
      <Button outline>{t("view_more", "view more")}</Button>
    </div>
  );
};
