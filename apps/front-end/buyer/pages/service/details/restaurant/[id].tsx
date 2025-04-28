import { GetServerSideProps, NextPage } from "next";
import { useTranslation } from "react-i18next";
import { dehydrate, QueryClient } from "react-query";
import { useRouting } from "routing";
import { ServerSideQueryClientProps } from "types";
import { RestaurantDetailsView, SellerLayout } from "ui";

export const getServerSideProps: GetServerSideProps<
  ServerSideQueryClientProps
> = async ({ query }) => {
  const id = query["id"] as string;
  const client = new QueryClient();

  // if (id) {
  //   client.prefetchQuery(
  //     getRestaurantServiceProviderDetailsDataQuerykey(id),
  //     () => getResturantServiceDetialsData(id),
  //   );
  // }

  return {
    props: {
      dehydratedState: dehydrate(client),
    },
  };
};

const RestaurantServiceDetailsPage: NextPage = () => {
const { t }: { t: (key: string, ...args: any[]) => string } = useTranslation();
  const { getParam } = useRouting();
  const id = getParam("id");
  // const {
  //   data: res,
  //   isLoading,
  //   isError,
  // } = useGetRestaurantServiceDetailsDataQuery(id);
  return (
    <>
      {/* <MetaTitle
        content={`${t("Restaurant Details")} | ${res ? res?.owner?.firstName || "" : ""
          }`}
      /> */}

      <SellerLayout>
        <RestaurantDetailsView />
      </SellerLayout>
    </>
  );
};

export default RestaurantServiceDetailsPage;
