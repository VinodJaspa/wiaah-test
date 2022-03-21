import React from "react";
import { Root, Header, Footer, AuthFooter, ImageCard } from "ui/components";
import { useTranslation } from "react-i18next";
import { useRecoilValue } from "recoil";
import { ShoppingCartTotalItemsLengthState } from "ui/state";

export default function MasterLayout({ children }) {
  const { t, i18n } = useTranslation();
  return (
    <Root>
      <Header />
      <main className="w-full ">{children}</main>
      <Footer />
      <AuthFooter />
      <div className="container mx-auto block w-full space-y-6 py-6">
        <div className="flex w-full justify-center">
          <p className="text-2xl font-bold uppercase">
            {t("Our_Partners", "Our Partners")}
          </p>
        </div>
        <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {[...Array(4)].map((_, i: number) => (
            <ImageCard key={i} imgUrl="/shop-3.jpeg" />
          ))}
        </div>
      </div>
      <div className="flex w-full justify-start bg-gray-800 p-6">
        <p className="text-gray-500">
          Copyrights &copy; Wiaah 2021.
          {t("copyrights", "All Rights Reserved.")}
        </p>
      </div>
    </Root>
  );
}
