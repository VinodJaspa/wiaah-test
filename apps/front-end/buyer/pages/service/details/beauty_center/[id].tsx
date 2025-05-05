import { GetServerSideProps, NextPage } from "next";
import { useTranslation } from "react-i18next";
import { dehydrate, QueryClient } from "react-query";
import { useRouting } from "routing";
import { ServerSideQueryClientProps } from "types";
import { BeautyCenterServiceDetailsView, SellerLayout } from "ui";
import { ExtractParamFromQuery } from "utils";

export const getServerSideProps: GetServerSideProps<
  ServerSideQueryClientProps
> = async ({ query }) => {
  const id = ExtractParamFromQuery(query, "id") as string;
  const client = new QueryClient();

  // if (id) {
  //   client.prefetchQuery(getBeautyCenterDetailsDataQueryKey({ id }), () =>
  //     getBeautyCenterDetailsDataFetcher(id),
  //   );
  // }

  return {
    props: {
      dehydratedState: dehydrate(client),
    },
  };
};

const RestaurantServiceDetailsPage: NextPage = () => {
const { t } = useTranslation();
  const { getParam } = useRouting();
  const id = getParam("id");
  // const { data: res, isLoading, isError } = useGetBeautyCenterDetailsQuery(id);
  return (
    <>
      {/* <MetaTitle
        content={`${t("Beauty Center Details")} | ${res ? res?.serviceMetaInfo?.title || "" : ""
          }`}
      /> */}

      <SellerLayout>
        <BeautyCenterServiceDetailsView />
      </SellerLayout>
    </>
  );
};

export default RestaurantServiceDetailsPage;
