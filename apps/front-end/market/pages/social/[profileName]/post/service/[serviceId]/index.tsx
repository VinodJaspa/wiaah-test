import { MasterLayout } from "@components";
import { getServicePostDataFetcher } from "api";
import { GetServerSideProps, NextPage } from "next";
import React from "react";
import { useTranslation } from "react-i18next";
import { dehydrate, QueryClient } from "react-query";
import { useRouting } from "routing";
import { AsyncReturnType, ServerSideQueryClientProps } from "types";
import { Container, getServicePostDetailsQueryKey, ServicePostView } from "ui";
import {
  MetaAuthor,
  MetaImage,
  MetaTitle,
  MetaDescription,
  MetaVideo,
  MetaUrl,
  RequiredSocialMediaTags,
} from "react-seo";
import { useMediaQuery } from "react-responsive";


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

  queryClient.prefetchQuery(
    getServicePostDetailsQueryKey({ id, publisher: profileName }),
    () => data,
  );
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      data: data,
    },
  };
};

const ServicePostPage: NextPage<ServicePostPageProps> = ({ data }) => {
const { t }: { t: (key: string, ...args: any[]) => string } = useTranslation();
  const { getCurrentPath } = useRouting();
  const firstPostAttachement = data?.data?.attachements[0];

  return (
    <>
      <MetaTitle
        content={`${t("Wiaah | Service post by ")}${data.data.profileInfo.name
          }`}
      />
      {firstPostAttachement ? (
        firstPostAttachement.type === "video" ? (
          <MetaVideo content={firstPostAttachement.src} />
        ) : (
          <MetaImage content={firstPostAttachement.src} />
        )
      ) : null}
      <MetaDescription content={data.data.content} />
      <MetaUrl url={getCurrentPath()} />
      <MetaAuthor author={data.data.profileInfo.name} />
      <RequiredSocialMediaTags />
      <MasterLayout social>
        <Container>
          <ServicePostView postId={"2"} />
        </Container>
      </MasterLayout>
    </>
  );
};

export default ServicePostPage;
