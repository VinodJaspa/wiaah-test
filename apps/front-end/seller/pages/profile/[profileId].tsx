import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import React from "react";
import { dehydrate, QueryClient } from "react-query";
import { getSocialProfileData } from "api";
import { SellerLayout, useGetSocialProfile } from "ui";
import { SocialView } from "components/views/SocialView";

interface ProfilePageProps {
  profileId: string | null;
}

export const getServerSideProps: GetServerSideProps<ProfilePageProps> = async ({
  query,
}) => {
  const { profileId } = query;
  const id = Array.isArray(profileId) ? profileId[0] : profileId || null;

  if (id) {
    const queryClient = new QueryClient();
    await queryClient.prefetchQuery(["SocialProfile", { profileId: id }], () =>
      getSocialProfileData(id)
    );

    return {
      props: {
        dehydratedState: dehydrate(queryClient),
        profileId: id,
      },
    };
  } else {
    return {
      props: {
        dehydratedState: null,
        profileId: null,
      },
    };
  }
};

const Profile: NextPage<ProfilePageProps> = ({ profileId }) => {
  //WARNING: graphql query is not ready yet
  const { data: _data } = useGetSocialProfile(profileId);

  if (!profileId) {
    return <div>Profile not found</div>;
  }

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
