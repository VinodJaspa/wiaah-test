import { getMyProfileData } from "api";
import { MyProfileViewCustomed } from "components/views/MyProfile/MyProfileViewCustomed";
import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import React from "react";
import { QueryClient, dehydrate } from "react-query";
import { SellerLayout } from "ui";
import { MyProfileView } from "../../components/views/MyProfile/MyProfileView";

interface MyProfilePageProps { }

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {}, // You can add your props here
  };
};
const myProfile: NextPage = () => {
  return (
    <>
      <Head>
        <title>Wiaah | MyProfile</title>
      </Head>
      <SellerLayout>
        <MyProfileViewCustomed />
      </SellerLayout>
    </>
  );
};

export default myProfile;
