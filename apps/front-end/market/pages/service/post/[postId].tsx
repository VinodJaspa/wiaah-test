import { ServicePostView } from "ui";
import Head from "next/head";
import React from "react";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";
import { MasterLayout } from "@components";

const ServicePost = () => {
const { t }: { t: (key: string, ...args: any[]) => string } = useTranslation();
  const router = useRouter();
  const postId = router.query.postId as string;
  return (
    <>
      <Head>
        <title>{t("Service Post")}</title>
      </Head>
      <MasterLayout>
        <ServicePostView postId={postId} />
      </MasterLayout>
    </>
  );
};

export default ServicePost;
