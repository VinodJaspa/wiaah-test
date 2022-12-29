import { AspectRatio } from "@partials";
import { NextPage } from "next";
import React from "react";
import { useTranslation } from "react-i18next";

const maintenance: NextPage = () => {
  const { t } = useTranslation();
  return (
    <section className=" w-screen h-screen bg-white flex justify-center items-center">
      <div className="w-[min(30rem,100%)]">
        <AspectRatio ratio={1}>
          <div className="relative flex-col gap-4 rounded-full bg-primary-50 text-3xl text-center font-bold text-primary flex justify-center items-center h-full w-full">
            <p className="text-4xl font-bold">
              {t("This site is under maintenance")}
            </p>
            <p className="font-thin text-sm">
              {t("We're preparing to serve you better.")}
            </p>
          </div>
        </AspectRatio>
      </div>
    </section>
  );
};

export default maintenance;
