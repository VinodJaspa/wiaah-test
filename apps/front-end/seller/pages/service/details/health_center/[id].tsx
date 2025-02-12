import { GetServerSideProps, NextPage } from "next";
import { useTranslation } from "react-i18next";
import { dehydrate, QueryClient } from "react-query";
import { useRouting } from "routing";
import { ServerSideQueryClientProps } from "types";
import { HealthCenterDetailsView, SellerLayout } from "ui";

export const getServerSideProps: GetServerSideProps<
  ServerSideQueryClientProps
> = async ({ query }) => {
  const id = query["id"] as string;
  const client = new QueryClient();

  // if (id) {
  //   client.prefetchQuery(getHealthCenterDetailsQueryKey({ id }), () =>
  //     getHealthCenterDetailsFetcher({ id }),
  //   );
  // }

  return {
    props: {
      dehydratedState: dehydrate(client),
    },
  };
};

const HealthCenterServiceDetailsPage: NextPage = () => {
  const { t } = useTranslation();
  const { getParam } = useRouting();
  const id = getParam("id");
  // const { data: res, isLoading, isError } = useGetHealthCenterDetailsQuery(id);

  return (
    <>
      {/* <MetaTitle
        content={`${t("Health Center Details")} | ${
          res ? res.owner.firstName || "" : ""
        }`}
      /> */}

      <SellerLayout>
        <HealthCenterDetailsView />
      </SellerLayout>
    </>
  );
};

export default HealthCenterServiceDetailsPage;
