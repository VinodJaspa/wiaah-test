import { Divider, Select, SelectOption } from "ui";
import { Language } from "ui/languages/enums/Language";
import { useRouter } from "next/router";
import { Country } from "country-state-city";
import { useTranslation } from "react-i18next";
import { useCookies } from "react-cookie";
import { FaRegCopyright } from "react-icons/fa";
import React from "react";

export interface SocialFooterProps {
  onLinkClick?: (link: string) => void;
  copyRightYear: number;
}
export const SocialFooter: React.FC<SocialFooterProps> = ({
  onLinkClick,
  copyRightYear,
}) => {
  const { t } = useTranslation();
  const router = useRouter();
  const [cookie, setCookie] = useCookies(["country", "currency"]);
  const { i18n } = useTranslation();
  const [langCode, setLang] = React.useState<Language>("" as Language);
  const [countryCode, setCountryCode] = React.useState("US");
  const [currency, setCurrency] = React.useState("usd");
  const [langCaption, setLanguageCaption] = React.useState("");
  const [countryName, setCountryName] = React.useState("United States");
  const [isModalVisible, setIsModalVisible] = React.useState(false);

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

  if ("locale" in router) {
    const { locale } = router;
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
  }
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
    <div className="py-2">
      <Divider />
      <div className="flex flex-col items-center gap-4">
        <div className="flex flex-wrap gap-8 justify-center">
          {links.map(({ label, link }, i) => (
            <p
              key={i}
              className="mx4 my-1 cursor-pointer hover:text-primary text-gray-500"
              onClick={() => handleLinkClick(link)}
            >
              {label}
            </p>
          ))}
        </div>
        <div className="flex gap-4">
          <Select value={langCode} onChange={onLanguageChange}>
            <SelectOption value="en">English</SelectOption>
            <SelectOption value="fr">Français</SelectOption>
            <SelectOption value="es">Española</SelectOption>
            <SelectOption value="de">Deutsch</SelectOption>
          </Select>
          <div className="flex gap-2 text-gray-500 items-center">
            <FaRegCopyright />
            {copyRightYear}
            <p>Wiaah</p>
          </div>
        </div>
      </div>
    </div>
  );
};
