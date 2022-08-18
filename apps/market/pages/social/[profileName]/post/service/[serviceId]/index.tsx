import { MasterLayout, ServicePostView } from "@components";
import { getServicePostDataFetcher } from "api";
import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import React from "react";
import { useTranslation } from "react-i18next";
import { dehydrate, QueryClient } from "react-query";
import { AsyncReturnType, ServerSideQueryClientProps } from "types";
import {
  Container,
  getServicePostDetailsQueryKey,
  RequiredSocialMediaTags,
} from "ui";

interface ServicePostPageProps {
  data: AsyncReturnType<typeof getServicePostDataFetcher>;
}

export const getServerSideProps: GetServerSideProps<
  ServerSideQueryClientProps<ServicePostPageProps>
> = async (props) => {
  const id = props.query["serviceId"];
  const profileName = props.query["profileName"];
  const queryClient = new QueryClient();

  const data = await getServicePostDataFetcher({ id, author: profileName });

  if (id && profileName) {
    queryClient.prefetchQuery(
      getServicePostDetailsQueryKey({ id, publisher: profileName }),
      () => data
    );
  }
  return {
    props: {
      dehydratedProps: dehydrate(queryClient),
      data,
    },
  };
};

const ServicePostPage: NextPage<ServicePostPageProps> = ({ data }) => {
  const { t } = useTranslation();
  const firstPostAttachement = data.data.attachements[0];
  return (
    <>
      <Head>
        <meta
          name="title"
          content={`Wiaah | Service Post by ${data.data.name}`}
        />
        <meta
          name="og:title"
          content={`Wiaah | Service Post by ${data.data.name}`}
        />
        {firstPostAttachement ? (
          <meta
            property={`${
              firstPostAttachement.type === "image" ? "og:image" : "og:video"
            }`}
            content={firstPostAttachement.src}
            key={"page:media"}
          />
        ) : null}
        <meta name="description" content={data.data.content} />
        <meta name="og:description" content={data.data.content} />
        <meta name="twitter:card" content="summary"></meta>
        {/* <RequiredSocialMediaTags /> */}
        <title>{t("Wiaah | service post")}</title>
      </Head>
      <MasterLayout social>
        <Container>
          <ServicePostView />
        </Container>
      </MasterLayout>
    </>
  );
};

export default ServicePostPage;
