import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import React from "react";
import { useSetRecoilState } from "recoil";
import { PostCardInfo, ProfileInfo } from "types/market/Social";
import { Container, Collaboration } from "ui";
import {
  SocialProfileInfo,
  PostCardPlaceHolder,
  PostCommentPlaceholder,
  postProfilesPlaceholder,
} from "ui/placeholder/social";
import { SocialNewsfeedPosts, SocialProfileInfoState } from "ui/state";
import MasterLayout from "../../../components/MasterLayout";
import SocialView from "../../../components/Social/SocialView";
import { products } from "ui/placeholder/products";
import { Spacer } from "@chakra-ui/react";

interface SocialPageProps {
  profile: ProfileInfo;
  newsfeedPosts: PostCardInfo[];
}

const images: string[] = [...products.map((pro) => pro.imgUrl)];
const getRandomUser = () =>
  postProfilesPlaceholder[
    Math.floor(Math.random() * postProfilesPlaceholder.length)
  ];
// export const getServerSideProps: GetServerSideProps<SocialPageProps> =
//   async () => {
//     // get user/shop profle info
//     // const { attachment, ...restComment } = PostCommentPlaceholder;

//     // [...Array(10)].map(() => ({
//     //   profileInfo: PostCardPlaceHolder.profileInfo,
//     //   postInfo: {
//     //     ...PostCardPlaceHolder.postInfo,
//     //     attachment: {
//     //       type: "image",
//     //       src: images[Math.floor(Math.random() * images.length)],
//     //     },
//     //     description: PostCardPlaceHolder.postInfo.description.substring(
//     //       0,
//     //       Math.floor(
//     //         Math.random() * PostCardPlaceHolder.postInfo.description.length
//     //       )
//     //     ),
//     //   },
//     // }));

//     return {
//       props: {
//         profile,
//         newsfeedPosts,
//       },
//     };
//   };

const ShopSocialProfile: NextPage = () => {
  const setprofile = useSetRecoilState(SocialProfileInfoState);
  const setFeedPosts = useSetRecoilState(SocialNewsfeedPosts);
  const profile: ProfileInfo = SocialProfileInfo;
  const newsfeedPosts: PostCardInfo[] = [
    {
      profileInfo: PostCardPlaceHolder.profileInfo,
      postInfo: {
        ...PostCardPlaceHolder.postInfo,
        attachment: {
          src: "/verticalImage.jpg",
          type: "image",
        },
        content: "",
        comments: [
          {
            ...PostCommentPlaceholder,
            attachment: null,
          },
        ],
      },
    },
    {
      profileInfo: PostCardPlaceHolder.profileInfo,
      postInfo: {
        ...PostCardPlaceHolder.postInfo,
        attachment: {
          src: "/verticalVideo.mp4",
          type: "video",
        },
        comments: [],
      },
    },
    {
      profileInfo: PostCardPlaceHolder.profileInfo,
      postInfo: {
        ...PostCardPlaceHolder.postInfo,
        attachment: {
          src: "/video.mp4",
          type: "video",
        },
        content: "test content",
        comments: [
          {
            ...PostCommentPlaceholder,
            user: getRandomUser(),
            content: "nice video",
            attachment: {
              src: "/shop.jpeg",
              type: "image",
            },
          },
          {
            ...PostCommentPlaceholder,
            user: getRandomUser(),
            content: "nice video",
            attachment: null,
          },
          {
            ...PostCommentPlaceholder,
            user: getRandomUser(),
            content: "nice video",
            attachment: null,
          },
          {
            ...PostCommentPlaceholder,
            user: getRandomUser(),
            content: "nice video",
            attachment: null,
          },

          {
            ...PostCommentPlaceholder,
            user: getRandomUser(),
            content: "nice video",
            attachment: null,
          },
        ],
      },
    },
    {
      profileInfo: PostCardPlaceHolder.profileInfo,
      postInfo: {
        ...PostCardPlaceHolder.postInfo,
        attachment: {
          src: images[Math.floor(Math.random() * images.length)],
          type: "image",
        },
        tags: [],
        comments: [],
      },
    },
    {
      profileInfo: PostCardPlaceHolder.profileInfo,
      postInfo: {
        ...PostCardPlaceHolder.postInfo,
        attachment: {
          src: images[Math.floor(Math.random() * images.length)],
          type: "image",
        },
        content: "",
        comments: [],
      },
    },
    {
      profileInfo: PostCardPlaceHolder.profileInfo,
      postInfo: {
        ...PostCardPlaceHolder.postInfo,
        attachment: {
          src: images[Math.floor(Math.random() * images.length)],
          type: "image",
        },
        content: "",
        comments: [],
      },
    },
    {
      profileInfo: PostCardPlaceHolder.profileInfo,
      postInfo: {
        ...PostCardPlaceHolder.postInfo,
        attachment: {
          src: images[Math.floor(Math.random() * images.length)],
          type: "image",
        },
        content: "",
        comments: [],
      },
    },
    {
      profileInfo: PostCardPlaceHolder.profileInfo,
      postInfo: {
        ...PostCardPlaceHolder.postInfo,
        attachment: {
          src: images[Math.floor(Math.random() * images.length)],
          type: "image",
        },
        content: "",
        comments: [],
      },
    },
    {
      profileInfo: PostCardPlaceHolder.profileInfo,
      postInfo: {
        ...PostCardPlaceHolder.postInfo,
        attachment: {
          src: images[Math.floor(Math.random() * images.length)],
          type: "image",
        },
        content: "",
        comments: [],
      },
    },
  ];
  setprofile(profile);

  setFeedPosts(newsfeedPosts);

  return (
    <>
      <Head>
        <title>Wiaah | Social</title>
      </Head>
      <MasterLayout socialFooter socialHeader>
        <SocialView />
      </MasterLayout>
      <div className="h-8" />
    </>
  );
};

export default ShopSocialProfile;
