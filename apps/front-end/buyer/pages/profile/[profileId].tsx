import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import React from "react";
import { dehydrate, QueryClient } from "react-query";
import { getSocialProfileData } from "api";
import { SellerLayout, useGetSocialProfile } from "ui";
import { SocialView } from "ui";
interface ProfilePageProps {
  profileId: string;
}

export const getServerSideProps: GetServerSideProps<ProfilePageProps> = async ({
  query,
}) => {
  const { profileId } = query;
  const id = Array.isArray(profileId) ? profileId[0] : profileId;

  const queryClient = new QueryClient();

  queryClient.prefetchQuery(["SocialProfile", { profileId }], () =>
    getSocialProfileData(id)
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      profileId: id,
    },
  };
};

const Profile: NextPage<ProfilePageProps> = ({ profileId }) => {
  //WARNING: graphql query is not ready yet
  const { data: _data } = useGetSocialProfile(profileId);
  return (
    <>
      <Head>
        <title>{"Buyer | profile"}</title>
      </Head>
      <SellerLayout>
        <SocialView profileId={profileId} />
      </SellerLayout>
    </>
  );
};

export default Profile;
