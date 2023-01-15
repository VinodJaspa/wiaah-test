import React, { useEffect } from "react";
import {
  Root,
  Header,
  Footer,
  AuthFooter,
  ImageCard,
  AuthPopup,
  SocialFooter,
  SocialHeader,
  SocialAuthFooter,
  CommentReportModal,
  RootProps,
  MasterLocationMapModal,
} from "ui";
import { useTranslation } from "react-i18next";
import { useSetRecoilState } from "recoil";
import {
  UserAddressesState,
  VoucherState,
  CheckoutProductsState,
} from "@src/state";
import { useLoginPopup } from "ui";

export interface MasterLayoutProps {
  social?: boolean;
  rootProps?: RootProps;
}

const MasterLayout: React.FC<MasterLayoutProps> = ({
  children,
  social,
  rootProps,
}) => {
  let voucher;
  const { t } = useTranslation();
  const setVoucher = useSetRecoilState(VoucherState);
  useEffect(() => {
    setVoucher(voucher);
  }, []);

  const { OpenLoginPopup } = useLoginPopup();
  function handleOpenLogin() {
    OpenLoginPopup;
  }

  return (
    <Root {...rootProps}>
      <CommentReportModal />
      <MasterLocationMapModal />
      <AuthPopup />
      {!social && <Header />}
      {social && <SocialHeader />}
      <main className="flex w-full flex-col">
        <>{children}</>
      </main>
      {!social && <Footer />}
      {!social && <AuthFooter />}
      {!social && (
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
      )}
      {!social && (
        <div className="flex w-full justify-start bg-gray-800 p-6">
          <p className="text-gray-500">
            Copyrights &copy; Wiaah 2021.
            {t("copyrights", "All Rights Reserved.")}
          </p>
        </div>
      )}
      {social && (
        <div className="fixed bottom-0 w-full z-50 sm:hidden">
          <SocialAuthFooter
            onLoginClick={handleOpenLogin}
            onSignupClick={handleOpenLogin}
          />
        </div>
      )}
      {social && <SocialFooter copyRightYear={2022} />}
    </Root>
  );
};

export default MasterLayout;

export { MasterLayout };
