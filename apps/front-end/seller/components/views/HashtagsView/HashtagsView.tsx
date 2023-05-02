import { useRouter } from "next/router";
import React from "react";
import { useTranslation } from "react-i18next";
import { TabType } from "types";
import {
  HashTagPostsListWrapper,
  PostCardsListWrapper,
  ShopCardsListWrapper,
  TabsViewer,
  Divider,
  HStack,
  Button,
  SocialServicePostsList,
  getRandomImage,
} from "ui";
import {
  ShopCardsInfoPlaceholder,
  hashTagCardsInfoPlaceholder,
} from "placeholder";
import { useBreakpointValue } from "utils";
import { AttachmentType } from "@features/API";

export const HashtagsView: React.FC = () => {
  const cols = useBreakpointValue({ base: 1, md: 2, lg: 3 });
  const { t } = useTranslation();
  const router = useRouter();
  const { tag } = router.query;

  const tabs: TabType[] = [
    {
      name: t("Newsfeed"),
      component: (
        <div className="flex flex-col gap-16">
          <HashTagPostsListWrapper
            hashtags={[
              {
                id: "",
                attachments: [
                  { src: getRandomImage(), type: AttachmentType.Img },
                ],
                authorProfileId: "",
                comments: 45,
                content: "Test",
                createdAt: new Date().toString(),
                listTitle: "Most liked post",
                reactionNum: 26,
                profile: {
                  id: "",
                  ownerId: "",
                  photo: getRandomImage(),
                  profession: "profe",
                  username: "name",
                },
                shares: 54,
                tags: [],
                title: "title",
                userId: "",
              },
              {
                id: "",
                attachments: [
                  { src: getRandomImage(), type: AttachmentType.Img },
                ],
                authorProfileId: "",
                comments: 45,
                content: "Test",
                createdAt: new Date().toString(),
                listTitle: "Most commented post",
                reactionNum: 26,
                profile: {
                  id: "",
                  ownerId: "",
                  photo: getRandomImage(),
                  profession: "profe",
                  username: "name",
                },
                shares: 54,
                tags: [],
                title: "title",
                userId: "",
              },
              {
                id: "",
                attachments: [
                  { src: getRandomImage(), type: AttachmentType.Img },
                ],
                authorProfileId: "",
                comments: 45,
                content: "Test",
                createdAt: new Date().toString(),
                listTitle: "Most liked video",
                reactionNum: 26,
                profile: {
                  id: "",
                  ownerId: "",
                  photo: getRandomImage(),
                  profession: "profe",
                  username: "name",
                },
                shares: 54,
                tags: [],
                title: "title",
                userId: "",
              },
              {
                id: "",
                attachments: [
                  { src: getRandomImage(), type: AttachmentType.Img },
                ],
                authorProfileId: "",
                comments: 45,
                content: "Test",
                createdAt: new Date().toString(),
                listTitle: "Most viewed video",
                reactionNum: 26,
                profile: {
                  id: "",
                  ownerId: "",
                  photo: getRandomImage(),
                  profession: "profe",
                  username: "name",
                },
                shares: 54,
                tags: [],
                title: "title",
                userId: "",
              },
            ]}
          />
          <PostCardsListWrapper
            grid
            posts={[...Array(15)].map(() => ({
              id: "",
              attachments: [
                { src: getRandomImage(), type: AttachmentType.Img },
              ],
              authorProfileId: "",
              comments: 45,
              content: "Test",
              createdAt: new Date().toString(),
              reactionNum: 26,
              publisher: {
                id: "",
                ownerId: "",
                photo: getRandomImage(),
                profession: "profe",
                username: "name",
              },
              shares: 54,
              tags: [],
              title: "title",
              userId: "",
            }))}
          />
        </div>
      ),
    },
    {
      name: t("Shop"),
      component: (
        <div className="flex flex-col gap-16">
          <HashTagPostsListWrapper
            hashtags={[
              {
                id: "",
                attachments: [
                  { src: getRandomImage(), type: AttachmentType.Img },
                ],
                authorProfileId: "",
                comments: 45,
                content: "Test",
                createdAt: new Date().toString(),
                listTitle: "Most liked post",
                reactionNum: 26,
                profile: {
                  id: "",
                  ownerId: "",
                  photo: getRandomImage(),
                  profession: "profe",
                  username: "name",
                },
                shares: 54,
                tags: [],
                title: "title",
                userId: "",
              },
              {
                id: "",
                attachments: [
                  { src: getRandomImage(), type: AttachmentType.Img },
                ],
                authorProfileId: "",
                comments: 45,
                content: "Test",
                createdAt: new Date().toString(),
                listTitle: "Most commented post",
                reactionNum: 26,
                profile: {
                  id: "",
                  ownerId: "",
                  photo: getRandomImage(),
                  profession: "profe",
                  username: "name",
                },
                shares: 54,
                tags: [],
                title: "title",
                userId: "",
              },
              {
                id: "",
                attachments: [
                  { src: getRandomImage(), type: AttachmentType.Img },
                ],
                authorProfileId: "",
                comments: 45,
                content: "Test",
                createdAt: new Date().toString(),
                listTitle: "Most liked video",
                reactionNum: 26,
                profile: {
                  id: "",
                  ownerId: "",
                  photo: getRandomImage(),
                  profession: "profe",
                  username: "name",
                },
                shares: 54,
                tags: [],
                title: "title",
                userId: "",
              },
              {
                id: "",
                attachments: [
                  { src: getRandomImage(), type: AttachmentType.Img },
                ],
                authorProfileId: "",
                comments: 45,
                content: "Test",
                createdAt: new Date().toString(),
                listTitle: "Most viewed video",
                reactionNum: 26,
                profile: {
                  id: "",
                  ownerId: "",
                  photo: getRandomImage(),
                  profession: "profe",
                  username: "name",
                },
                shares: 54,
                tags: [],
                title: "title",
                userId: "",
              },
            ]}
          />
          <Divider />
          <ShopCardsListWrapper cols={cols} items={[]} />
        </div>
      ),
    },
    {
      name: t("Service"),
      component: (
        <div className="flex flex-col gap-16">
          <HashTagPostsListWrapper
            hashtags={[
              {
                id: "",
                attachments: [
                  { src: getRandomImage(), type: AttachmentType.Img },
                ],
                authorProfileId: "",
                comments: 45,
                content: "Test",
                createdAt: new Date().toString(),
                listTitle: "Most liked post",
                reactionNum: 26,
                profile: {
                  id: "",
                  ownerId: "",
                  photo: getRandomImage(),
                  profession: "profe",
                  username: "name",
                },
                shares: 54,
                tags: [],
                title: "title",
                userId: "",
              },
              {
                id: "",
                attachments: [
                  { src: getRandomImage(), type: AttachmentType.Img },
                ],
                authorProfileId: "",
                comments: 45,
                content: "Test",
                createdAt: new Date().toString(),
                listTitle: "Most commented post",
                reactionNum: 26,
                profile: {
                  id: "",
                  ownerId: "",
                  photo: getRandomImage(),
                  profession: "profe",
                  username: "name",
                },
                shares: 54,
                tags: [],
                title: "title",
                userId: "",
              },
              {
                id: "",
                attachments: [
                  { src: getRandomImage(), type: AttachmentType.Img },
                ],
                authorProfileId: "",
                comments: 45,
                content: "Test",
                createdAt: new Date().toString(),
                listTitle: "Most liked video",
                reactionNum: 26,
                profile: {
                  id: "",
                  ownerId: "",
                  photo: getRandomImage(),
                  profession: "profe",
                  username: "name",
                },
                shares: 54,
                tags: [],
                title: "title",
                userId: "",
              },
              {
                id: "",
                attachments: [
                  { src: getRandomImage(), type: AttachmentType.Img },
                ],
                authorProfileId: "",
                comments: 45,
                content: "Test",
                createdAt: new Date().toString(),
                listTitle: "Most viewed video",
                reactionNum: 26,
                profile: {
                  id: "",
                  ownerId: "",
                  photo: getRandomImage(),
                  profession: "profe",
                  username: "name",
                },
                shares: 54,
                tags: [],
                title: "title",
                userId: "",
              },
            ]}
          />
          <Divider />
          <SocialServicePostsList posts={[]} />
        </div>
      ),
    },
    // {
    //   name: t("Action"),
    //   component: (
    //     <div className="flex flex-col gap-16">
    //       <HashTagPostsListWrapper hashtags={hashTagCardsInfoPlaceholder} />
    //       <Divider />
    //       <ActionsListWrapper cols={cols} actions={actionsPlaceholders} />
    //     </div>
    //   ),
    // },
  ];
  return (
    <div className="flex flex-col p-4 items-center">
      <HStack className="px-2 w-full justify-between">
        <div></div>
        <p className="font-bold text-[3em]">#{tag}</p>
        <Button>{t("Follow")}</Button>
      </HStack>
      <TabsViewer tabs={tabs} />
    </div>
  );
};
