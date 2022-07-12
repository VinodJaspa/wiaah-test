import React from "react";
import { useRouter } from "next/router";
import { SidebarProvider } from "../helpers/SidebarContext";
import classNames from "classnames";
import { useTranslation } from "react-i18next";
import { Language } from "ui/languages/enums/Language";
import { useResponsive } from "ui";

export interface RootProps {
  scrollable?: boolean;
}

export const Root: React.FC<RootProps> = ({ children, scrollable = true }) => {
  const { isMobile } = useResponsive();
  const router = useRouter();
  const { i18n } = useTranslation();
  const { locale, locales, defaultLocale } = router;
  React.useEffect(() => {
    console.log("Starting...");
    switch (locale) {
      case Language.EN:
        i18n.changeLanguage(Language.EN);
        break;
      case Language.FR:
        i18n.changeLanguage(Language.FR);
        break;
      case Language.DE:
        i18n.changeLanguage(Language.DE);
        break;
      case Language.ES:
        i18n.changeLanguage(Language.ES);
        break;
      default:
        i18n.changeLanguage(Language.EN);
        break;
    }
  }, [locale]);
  return (
    <>
      <SidebarProvider>
        <div
          className={classNames(
            `relative flex h-screen w-full flex-col overflow-x-hidden overflow-y-auto ${
              isMobile || !scrollable ? "no-scrollBar" : ""
            }`
          )}
        >
          {children}
        </div>
      </SidebarProvider>
    </>
  );
};
