import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import React from "react";
import { dehydrate, QueryClient } from "react-query";
import { getSocialProfileData } from "api";
import { SellerLayout, useGetSocialProfile } from "ui";
import { SocialView } from "@components";
import { extractUserfromNextjsCookies } from "utils";
import { getRouting } from "routing";

interface ProfilePageProps {
  profileId: string;
}

export const getServerSideProps: GetServerSideProps<ProfilePageProps> = async ({
  query,
  req,
}) => {
  const user = await extractUserfromNextjsCookies(req.cookies);

  const { profileId } = query;

  const id = Array.isArray(profileId) ? profileId[0] : profileId;

  const profileData = await getSocialProfileData(id);

  if (profileData?.data?.userId === user?.id) {
    return {
      props: {
        profileId: profileData.data.id,
      },
      redirect: {
        destination: getRouting((r) => r.visitMyProfile()),
      },
    };
  }

  const queryClient = new QueryClient();
  queryClient.prefetchQuery(
    ["SocialProfile", { profileId }],
    () => profileData
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      profileId: id,
    },
  };
};

const profile: NextPage<ProfilePageProps> = ({ profileId }) => {
  const { data } = useGetSocialProfile(profileId);
  return (
    <>
      <Head>
        <title>{data ? data.data.name : "Seller | profile"}</title>
      </Head>
      <SellerLayout>
        <SocialView profileId={profileId} />
      </SellerLayout>
    </>
  );
};

export default profile;
