import { getMyProfileData } from "api";
import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import React from "react";
import { QueryClient, dehydrate } from "react-query";
import { SellerLayout } from "ui";
import { MyProfileView } from "../../components/views/MyProfile/MyProfileView";

interface MyProfilePageProps { }

export const getServerSideProps: GetServerSideProps<
  MyProfilePageProps
> = async () => {
  const queryClient = new QueryClient();

  queryClient.prefetchQuery("myProfileData", getMyProfileData);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

const MyProfile: NextPage = () => {
  return (
    <>
      <Head>
        <title>Wiaah | MyProfile</title>
      </Head>
      <SellerLayout>
        <MyProfileView />
      </SellerLayout>
    </>
  );
};

export default MyProfile;
