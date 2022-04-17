import { Flex, Divider, Text, Select, Icon } from "@chakra-ui/react";
import { Language } from "ui/languages/enums/Language";
import { t } from "i18next";
import { useRouter } from "next/router";
import { Country } from "country-state-city";
import { useTranslation } from "react-i18next";
import { useCookies } from "react-cookie";
import { FaRegCopyright } from "react-icons/fa";
import React from "react";

const links: {
  label: string;
  link: string;
}[] = [
  {
    label: t("about", "about"),
    link: "",
  },
  {
    label: t("contact_us", "contact us"),
    link: "",
  },
  {
    label: t("help_and_faqs", "help and FAQs"),
    link: "",
  },
  {
    label: t("terms_&_conditions", "terms & conditions"),
    link: "",
  },
  {
    label: t("privacy_policy", "privacy policy"),
    link: "",
  },
];

export interface SocialFooterProps {
  onLinkClick?: (link: string) => void;
  copyRightYear: number;
}
export const SocialFooter: React.FC<SocialFooterProps> = ({
  onLinkClick,
  copyRightYear,
}) => {
  const router = useRouter();
  const { locale } = router;
  const [cookie, setCookie] = useCookies(["country", "currency"]);
  const { i18n } = useTranslation();
  const [langCode, setLang] = React.useState<Language>(locale as Language);
  const [countryCode, setCountryCode] = React.useState("US");
  const [currency, setCurrency] = React.useState("usd");
  const [langCaption, setLanguageCaption] = React.useState(locale);
  const [countryName, setCountryName] = React.useState("United States");
  const [isModalVisible, setIsModalVisible] = React.useState(false);

  React.useEffect(() => {
    switch (locale) {
      case Language.EN:
        setLang(Language.EN);
        i18n.changeLanguage(Language.EN);
        setLanguageCaption("English");
        break;
      case Language.FR:
        setLang(Language.FR);
        i18n.changeLanguage(Language.FR);
        setLanguageCaption("Français");
        break;
      case Language.DE:
        setLang(Language.DE);
        i18n.changeLanguage(Language.DE);
        setLanguageCaption("Deutsch");
        break;
      case Language.ES:
        setLang(Language.ES);
        i18n.changeLanguage(Language.ES);
        setLanguageCaption("Española");
        break;
      default:
        setLang(Language.EN);
        i18n.changeLanguage(Language.EN);
        setLanguageCaption("English");
        break;
    }
  }, [locale]);

  React.useEffect(() => {
    if (cookie.country) {
      setCountryName(Country.getCountryByCode(cookie.country)?.name as string);
      setCountryCode(cookie.country);
    }
    if (cookie.currency) {
      setCurrency(cookie.currency);
    }
  }, [cookie.country, cookie.currency]);

  const showInternationalModal = () => {
    setIsModalVisible(true);
  };

  function onCountryChange(newCountry: string) {
    setCountryCode(newCountry);
  }
  function onCurrencyChange(newCurrency: string) {
    setCurrency(newCurrency);
  }

  function onLanguageChange(value: any) {
    setLang(value);
  }

  let saveInternationalSettings = () => {
    setLocale(langCode);
    setCookie("country", countryCode, { path: "/" });
    setCookie("currency", currency, { path: "/" });
    setIsModalVisible(false);
  };

  const setLocale = (newLocal: string) => {
    switch (newLocal) {
      case Language.EN:
        setLang(Language.EN);
        i18n.changeLanguage(Language.EN);
        setLanguageCaption("English");
        router.push(router.asPath, undefined, { locale: Language.EN });
        break;
      case Language.FR:
        setLang(Language.FR);
        i18n.changeLanguage(Language.FR);
        setLanguageCaption("Français");
        router.push(router.asPath, undefined, { locale: Language.FR });
        break;
      case Language.DE:
        setLang(Language.DE);
        i18n.changeLanguage(Language.DE);
        setLanguageCaption("Deutsch");
        router.push(router.asPath, undefined, { locale: Language.DE });
        break;
      case Language.ES:
        setLang(Language.ES);
        i18n.changeLanguage(Language.ES);
        setLanguageCaption("Española");
        router.push(router.asPath, undefined, { locale: Language.ES });
        break;
      default:
        setLang(Language.EN);
        i18n.changeLanguage(Language.EN);
        setLanguageCaption("English");
        router.push(router.asPath, undefined, { locale: Language.EN });
        break;
    }
  };

  function handleLinkClick(link: string) {
    onLinkClick && onLinkClick(link);
  }
  return (
    <>
      {/* <Divider my="2rem" /> */}
      <Flex gap="1rem" align={"center"} direction={"column"}>
        <Flex flexWrap={"wrap"} justify={"center"}>
          {links.map(({ label, link }, i) => (
            <Text
              key={i}
              mx="1rem"
              my="0.25rem"
              cursor={"pointer"}
              _hover={{
                textDecorationColor: "primary.main",
                color: "primary.main",
              }}
              textTransform={"capitalize"}
              color="gray"
              onClick={() => handleLinkClick(link)}
            >
              {label}
            </Text>
          ))}
        </Flex>
        <Flex gap="1rem">
          <Select
            _focus={{ ringColor: "primary.main" }}
            minW="8rem"
            defaultValue={langCode}
            onChange={onLanguageChange}
          >
            <option value="en">English</option>
            <option value="fr">Français</option>
            <option value="es">Española</option>
            <option value="de">Deutsch</option>
          </Select>
          <Flex gap="0.5rem" color="gray" align={"center"}>
            <Icon as={FaRegCopyright} />
            {copyRightYear}
            <Text>Wiaah</Text>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};
