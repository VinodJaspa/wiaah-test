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
  SocialLayout,
} from "ui";
import { useTranslation } from "react-i18next";
import { useSetRecoilState } from "recoil";
import { VoucherState } from "@src/state";
import { useLoginPopup } from "ui";
import { useRouter } from "next/router";

export interface MasterLayoutProps {
  social?: boolean;
  rootProps?: RootProps;
  children: React.ReactNode;
  token?: string;
}

const MasterLayout: React.FC<MasterLayoutProps> = ({
  children,
  social,
  rootProps,
  token,
}) => {
  let voucher;
const { t } = useTranslation();
  const router = useRouter();
  const setVoucher = useSetRecoilState(VoucherState);
  useEffect(() => {
    setVoucher(voucher);
  }, [voucher, setVoucher]);

  const { OpenLoginPopup } = useLoginPopup();
  function handleOpenLogin() {
    OpenLoginPopup;
  }

  return (
    <Root {...rootProps}>
      <CommentReportModal />
      <MasterLocationMapModal />
      <AuthPopup />
      <SocialLayout />
      {!social && <Header token={token} />}
      {social && <SocialHeader />}
      <main className="flex w-full flex-col">
        <>{children}</>
      </main>
      {!social && (
        <>
          <Footer />
          <AuthFooter />
          <div className="flex w-full justify-start bg-black p-6">
            <p className="text-gray-500">
              Copyright &copy; Wiaah 2021.{" "}
              {t("copyrights", "All Rights Reserved.")}
            </p>
          </div>
        </>
      )}

      {/* Social Footer */}
      {social && (
        <>
          <div className="fixed bottom-0 w-full z-50 sm:hidden">
            <SocialAuthFooter
              onLoginClick={handleOpenLogin}
              onSignupClick={handleOpenLogin}
            />
          </div>
          <SocialFooter copyRightYear={2022} />
        </>
      )}
    </Root>
  );
};

export default MasterLayout;

export { MasterLayout };
