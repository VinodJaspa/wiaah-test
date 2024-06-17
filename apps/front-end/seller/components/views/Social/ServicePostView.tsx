import { PresentationType, ServicePresentationType } from "@features/API";
import { getRandomImage } from "placeholder";
import React from "react";
import { useTranslation } from "react-i18next";
import {
  SocialPostHeader,
  Button,
  SpinnerFallback,
  ShowMapButton,
  SocialServicePostDetailsCard,
  useGetServicePostDetails,
  SocialProfileServicePosts,
} from "ui";

const FAKE_DEATAILED_POST = {
  __typename: "ServicePost",
  id: "post2",
  reactionNum: 89,
  shares: 15,
  comments: 4,
  createdAt: "2023-06-01T10:20:30Z",
  userId: "user2",
  serviceId: "service2",
  serviceType: "Electrician",
  views: 875,
  location: {
    __typename: "PostLocation",
    address: "456 Elm St",
    city: "Monroe",
    state: "WI",
    country: "USA",
  },
  service: {
    __typename: "Service",
    id: "service2",
    title: "Electrical Service",
    thumbnail: getRandomImage(),
    price: 200,
    rating: 4.8,
  },
  user: {
    __typename: "Account",
    id: "user2",
    profile: {
      __typename: "Profile",
      id: "profile2",
      username: "jane_smith",
      photo: getRandomImage(),
      profession: "Electrician",
      verified: false,
      followers: 120,
    },
  },
};

export const ServicePostView: React.FC<{ id: string }> = ({ id }) => {
  const { t } = useTranslation();
  // WARNING: graphql query is not ready yet
  const {
    data: _data,
    isLoading: _isloading,
    isError: _isError,
  } = useGetServicePostDetails(id);
  const data = FAKE_DEATAILED_POST;

  return (
    <div className="py-2 md:py-16 gap-8 flex flex-col">
      <div className="flex items-center md:items-start flex-col gap-8 mb-24 md:flex-row">
        <div className="flex flex-col gap-4">
          <SpinnerFallback isLoading={false}>
            {data ? (
              <SocialPostHeader
                name={data.user.profile.username}
                thumbnail={data.user.profile.photo}
              />
            ) : null}
          </SpinnerFallback>
          <ShowMapButton onClick={() => { }} />
        </div>
        <SpinnerFallback isLoading={false}>
          {data ? (
            <SocialServicePostDetailsCard
              post={{
                id: data.id,
                comments: data.comments,
                reactionNum: data.reactionNum,
                service: {
                  presentation: [
                    {
                      type: ServicePresentationType.Img,
                      src: data.service.thumbnail,
                    },
                  ],
                  title: data.service.title,
                  hashtags: ["fake_hashtag"],
                },
              }}
            />
          ) : null}
        </SpinnerFallback>
      </div>
      <p className="text-3xl font-bold w-full text-center">
        <SpinnerFallback isLoading={false}>
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
