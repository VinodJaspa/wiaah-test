import React, { FC } from "react";
import { ImageCard, Spacer } from "../../components";
import { t } from "i18next";

export const Collaboration: FC = () => {
  return (
    <div className="">
      <div className="flex w-full justify-center">
        <p className="text-2xl font-bold uppercase">
          {t("Collaboration", "Collaboration")}
        </p>
      </div>
      <Spacer />
      <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {[...Array(4)].map((_, i: number) => (
          <ImageCard key={i} name="Item Name" imgUrl="/shop-2.jpeg" />
        ))}
      </div>
    </div>
  );
};
