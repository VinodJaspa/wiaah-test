import React from "react";
import { useRouter } from "next/router";
import { SidebarProvider } from "../helpers/SidebarContext";
import classNames from "classnames";
import { useTranslation } from "react-i18next";
import { Language } from "@UI/languages/enums/Language";
import { useResponsive } from "@UI";
import { runIfFn } from "utils";

export interface RootProps {
  scrollable?: boolean;
}

export const Root: React.FC<RootProps> = ({ children, scrollable = true }) => {
  const { isMobile } = useResponsive();
  const router = useRouter();
  const { i18n } = useTranslation();
  if (router.locale) {
    const { locale, locales, defaultLocale } = router;
    React.useEffect(() => {
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
  }

  return (
    <>
      <SidebarProvider>
        <div
          className={classNames(
            `relative ${isMobile || !scrollable ? "no-scrollBar" : ""}`
          )}
        >
          {runIfFn(children)}
        </div>
      </SidebarProvider>
    </>
  );
};
