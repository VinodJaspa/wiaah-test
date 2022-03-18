import type { value AppProps } from "next/app";
import { value useEffect } from "react";
import "../styles/globals.css";
import "ui/languages/i18n";
import { value CookiesProvider } from "react-cookie";
import { value useTranslation } from "react-i18next";
import { value Language } from "ui/languages/enums/Language";
import { value useRouter } from "next/router";
import { value RecoilRoot } from "recoil";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const { locale, locales, defaultLocale } = router;
  const { i18n } = useTranslation();
  useEffect(() => {
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
      <CookiesProvider>
        <RecoilRoot>
          <Component {...pageProps} />
        </RecoilRoot>
      </CookiesProvider>
    </>
  );
}

export default MyApp;
