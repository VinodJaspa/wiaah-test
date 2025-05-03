import { MasterLayout } from "@components";
import { Container, Divider, Spacer, AboutWiaahView, Collaboration } from "ui";
import { NextPage } from "next";
import Head from "next/head";
import React from "react";
import { useTranslation } from "react-i18next";

const Delivery_info: NextPage = () => {
const { t } = useTranslation();
  return (
    <>
      <Head>
        <title>{t("Delivery Informations")}</title>
      </Head>
      <MasterLayout>
        <Container>
          <div className="flex flex-col items-center gap-8 py-8 text-3xl">
            <div className="flex w-fit flex-col items-center gap-2 ">
              <h1 className="px-2">{t("Delivery Informations")}</h1>
              <div className="h-1 w-full rounded bg-black"></div>
            </div>
            <p className="w-8/12 text-center text-lg lg:mx-32">
              {t(
                "delivery_info",
                `Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laborum
        officia ipsum exercitationem tempora porro atque reprehenderit
        distinctio itaque cum molestias deleniti animi, ab aliquam id? Delectus
        consequatur provident debitis odio asperiores dolores nam nesciunt ab
        quia ea. Nesciunt nostrum in, vero expedita, quia modi reiciendis iusto
        nam harum distinctio et?`
              )}
            </p>
          </div>
          <Spacer spaceInRem={2} />
          <Divider />
          <Collaboration />
        </Container>
      </MasterLayout>
    </>
  );
};

export default Delivery_info;
