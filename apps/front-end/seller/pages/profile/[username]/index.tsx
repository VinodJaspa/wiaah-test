import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import React from "react";
import { dehydrate, DehydratedState, QueryClient } from "react-query";
import { getSocialProfileData } from "api";
import { SellerLayout, useGetSocialProfile } from "ui";
import { SocialProfileView } from "ui";
import { extractUserfromNextjsCookies } from "utils";
import { getRouting } from "routing";

interface ProfilePageProps {
  username: string;
}

export const getServerSideProps: GetServerSideProps<ProfilePageProps> = async ({
  query,
  req,
}) => {
  const user = await extractUserfromNextjsCookies(req.cookies);

  const { username: _username } = query;

  const username = Array.isArray(_username) ? _username[0] : _username;

  const profileData = await getSocialProfileData(username);

  if (profileData?.data?.userId === user?.id) {
    return {
      props: {
        profileId: profileData.data.id,
        username,
      },
      redirect: {
        destination: getRouting((r) => r.visitMyProfile()),
      },
    };
  }

  const queryClient = new QueryClient();
  queryClient.prefetchQuery(["SocialProfile", { username }], () => profileData);

  return {
    props: {
      dehydratedState: dehydrate(queryClient) as DehydratedState,
      username,
    },
  };
};

const profile: NextPage<ProfilePageProps> = ({ username }) => {
  // const { data } = useGetSocialProfile(username);
  return (
    <>
      <Head>
        <title>{"Seller | profile"}</title>
      </Head>
      <SellerLayout>
        <SocialProfileView username={username || "name"} />
      </SellerLayout>
    </>
  );
};

export default profile;
