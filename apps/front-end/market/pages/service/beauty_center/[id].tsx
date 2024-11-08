import React from "react";
import type { GetServerSideProps, NextPage } from "next";
import { MasterLayout } from "@components";
import { MarketBeautyCenterServiceDetailsView } from "ui";
import { Container, GetServiceDetailsQueryKey } from "ui";
import { ExtractParamFromQuery } from "utils";
import { dehydrate, QueryClient } from "react-query";
import {
  FormatedSearchableFilter,
  GetHotelServiceArgs,
  getBeautyCenterDetailsDataFetcher,
  getServiceDetailsDataSwitcher,
} from "api";
import { AsyncReturnType, ServerSideQueryClientProps } from "types";
import {
  MetaAuthor,
  MetaDescription,
  MetaImage,
  MetaTitle,
  MetaVideo,
  RequiredSocialMediaTags,
} from "react-seo";
import { useRouting } from "routing";

interface BeautyCenterServiceDetailsPageProps {
  data: AsyncReturnType<typeof getBeautyCenterDetailsDataFetcher>;
}

export const getServerSideProps: GetServerSideProps<
  ServerSideQueryClientProps<BeautyCenterServiceDetailsPageProps>
> = async ({ query }) => {
  const queryClient = new QueryClient();

  const serviceType = "beauty_center";
  const serviceId = ExtractParamFromQuery(query, "id");
  const beautyCenterDetailsArgs: GetHotelServiceArgs &
    FormatedSearchableFilter = {
    id: "your_beauty_center_id",
  };

  const data = (await getServiceDetailsDataSwitcher(
    serviceType,
    beautyCenterDetailsArgs.id,
  )) as AsyncReturnType<typeof getBeautyCenterDetailsDataFetcher>;

  queryClient.prefetchQuery(
    GetServiceDetailsQueryKey({ serviceType, id: serviceId }),
    () => data,
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      data,
    },
  };
};

const BeautyCenterServiceDetailsPage: NextPage<
  BeautyCenterServiceDetailsPageProps
> = ({ data }) => {
  const { getParam } = useRouting();
  const id = getParam("id");
  return (
    <>
      {data && data.data ? (
        <>
          <MetaTitle
            content={`Wiaah | Service Details by ${data.data.getBeautyCenterById.serviceMetaInfo.title}`}
          />
          <MetaDescription
            content={data.data.getBeautyCenterById.serviceMetaInfo.description}
          />
          {data.data.getBeautyCenterById.presentations.at(0).type === "vid" ? (
            <MetaVideo
              content={data.data.getBeautyCenterById.presentations.at(0).src}
            />
          ) : (
            <MetaImage
              content={data.data.getBeautyCenterById.presentations.at(0).src}
            />
          )}
          <MetaAuthor author={data.data.getBeautyCenterById.owner?.firstName} />
          <RequiredSocialMediaTags />
        </>
      ) : null}
      <MasterLayout>
        <Container>
          <MarketBeautyCenterServiceDetailsView id={id} />
        </Container>
      </MasterLayout>
    </>
  );
};

export default BeautyCenterServiceDetailsPage;
