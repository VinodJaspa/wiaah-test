import { NextPage } from "next";
import React from "react";
import { Container, NotFound } from "ui";
import Head from "next/head";
import { useTranslation } from "react-i18next";
import { ServiceSearchView, ResturantSearchView } from "@components";
import MasterLayout from "../../../../components/MasterLayout";
import { useRouter } from "next/router";
import { ServicesType } from "types";

const ServiceCategory: NextPage = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const [loaded, setLoaded] = React.useState<boolean>(false);
  const serviceType: ServicesType = Array.isArray(router.query.serviceType)
    ? (router.query.serviceType[0] as ServicesType)
    : typeof router.query.serviceType === "string"
    ? (router.query.serviceType as ServicesType)
    : ("" as ServicesType);

  React.useEffect(() => {
    router.events.on("routeChangeComplete", () => {
      setLoaded(true);
    });
  }, []);
  return (
    <>
      <Head>
        <title>{t("Service Search")}</title>
      </Head>
      <MasterLayout
        rootProps={{
          scrollable: false,
        }}
      >
        <Container>
          {(() => {
            switch (serviceType) {
              case "hotel":
                return <ServiceSearchView />;
              case "resturant":
                return <ResturantSearchView />;

              default:
                return loaded ? <NotFound /> : null;
            }
          })()}
        </Container>
      </MasterLayout>
    </>
  );
};

export default ServiceCategory;
