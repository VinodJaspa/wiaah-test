import type { AppProps } from "next/app";
import { useEffect } from "react";
import "../styles/globals.css";
import "ui/languages/i18n";
import { CookiesProvider } from "react-cookie";
import { useTranslation } from "react-i18next";
import { Language } from "ui/languages/enums/Language";
import { useRouter } from "next/router";
import { RecoilRoot } from "recoil";
import { ChakraProvider } from "@chakra-ui/react";
import { CoomingSoon } from "../components/ComingSoon";
import theme from "ui/themes/chakra_ui/theme";

const coomingSoon = false;

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
      <ChakraProvider theme={theme}>
        <CookiesProvider>
          <RecoilRoot>
            {coomingSoon ? <CoomingSoon /> : <Component {...pageProps} />}
          </RecoilRoot>
        </CookiesProvider>
      </ChakraProvider>
    </>
  );
}

export default MyApp;
