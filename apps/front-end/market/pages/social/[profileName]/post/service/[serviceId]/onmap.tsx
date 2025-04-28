import { MasterLayout, ServicePostOnMapView } from "@components";
import {
  FormatedSearchableFilter,
  getServicePostsOnMapDataFetcher,
  QueryPaginationInputs,
} from "api";
import { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";
import { useTranslation } from "react-i18next";
import { dehydrate, QueryClient } from "react-query";
import {
  MetaDescription,
  MetaImage,
  MetaTitle,
  RequiredSocialMediaTags,
} from "react-seo";
import { ServerSideQueryClientProps } from "types";
import {
  getServicesPostsOnMapQueryKey,
  useGetServicesPostsOnMapDataQuery,
} from "ui";

export const getServerSideProps: GetServerSideProps<
  ServerSideQueryClientProps
> = async (props) => {
  const query = props.query;

  const serviceId = query["id"];
  const queryClient = new QueryClient();
  const filters: FormatedSearchableFilter = { id: serviceId };
  const paginaton: QueryPaginationInputs = { page: 1, take: 20 };
  queryClient.prefetchQuery(
    getServicesPostsOnMapQueryKey(filters, paginaton),
    () => getServicePostsOnMapDataFetcher(filters, paginaton),
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

const ServicePostOnMapPage: NextPage = () => {
const { t }: { t: (key: string, ...args: any[]) => string } = useTranslation();
  const router = useRouter();
  const id = router.query["id"];
  const profileName = router.query["profileName"];
  const { data } = useGetServicesPostsOnMapDataQuery(id ? { id } : {}, {
    page: 1,
    take: 10,
  });
  return (
    <>
      <MetaTitle
        content={`Wiaah | ${data ? data.total : ""} service posts by ${profileName ?? ""
          }`}
      />
      <MetaImage content={data ? data.data.at(0).attachments.at(0).src : ""} />
      <MetaDescription
        content={`serivces posts search by ${profileName ?? ""
          } in wiaah marketplace`}
      />
      <RequiredSocialMediaTags />

      <MasterLayout social>
        <ServicePostOnMapView id={"3"} />
      </MasterLayout>
    </>
  );
};

export default ServicePostOnMapPage;
