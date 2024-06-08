import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import React from "react";
import { SocialProfileInfo, postProfilesPlaceholder } from "placeholder";
import { MasterLayout, SocialView } from "@components";
import { products } from "placeholder";
import { SocialProfileData } from "api";

interface SocialPageProps {
  profile: SocialProfileData;
}

const images: string[] = [...products.map((pro) => pro.imgUrl)];
const getRandomUser = () =>
  postProfilesPlaceholder[
    Math.floor(Math.random() * postProfilesPlaceholder.length)
  ];
export const getServerSideProps: GetServerSideProps<
  SocialPageProps
> = async () => {
  // get user/shop profle info

  return {
    props: {
      profile: {
        id: "1",
        name: "Wiaah",
        accountType: "seller",
        publications: 100,
        subscribers: 40,
        subscriptions: 23,
        thumbnail: "/wiaah_logo.png",
        countryCode: "CH",
        verifed: true,
        location: {
          address: "test add",
          city: "city",
          cords: {
            lat: 45,
            lng: 56,
          },
          country: "country",
          countryCode: "CHF",
          postalCode: 1234,
          state: "state",
        },
        public: true,
        bio: "Lorem Ipsum is simply dummy text of the printing Lorem Ipsum is simply dummy text of the printing ",
        links: ["https://www.instagram.com"],
        isFollowed: false,
        profileCoverPhoto: "/shop-2.jpeg",
        profession: "test prof",
        userId: "test userid",
        verified: true,
      },
    },
  };
};

const ShopSocialProfile: NextPage<SocialPageProps> = ({ profile }) => {
  return (
    <>
      <Head>
        <title>{profile.name}</title>
      </Head>
      <MasterLayout social>
        <SocialView profileId={profile.id} />
      </MasterLayout>
    </>
  );
};

export default ShopSocialProfile;
