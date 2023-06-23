import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Language } from "@UI/languages/enums/Language";
import {
  Divider,
  Select,
  SelectOption,
  Modal,
  ModalContent,
  ModalOverlay,
} from "@UI";
import { useRouter } from "next/router";
import { FaGlobeEurope } from "react-icons/fa";
import { useCookies } from "react-cookie";
import { countries, getCountryByCode } from "utils";
import { useChangeCurrency } from "lib";

export const CountryLanguageCurrencySwitch: React.FC = () => {
  const { handleChangeCurrency } = useChangeCurrency();
  const router = useRouter();
  const locale = router ? router.locale : Language.EN;
  const [cookie, setCookie] = useCookies(["country", "currency"]);
  const { t, i18n } = useTranslation();
  const [langCode, setLang] = useState<Language>(locale as Language);
  const [countryCode, setCountryCode] = useState("US");
  const [currency, setCurrency] = useState("usd");
  const [langCaption, setLanguageCaption] = useState(locale);
  const [countryName, setCountryName] = useState("United States");
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
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

  useEffect(() => {
    if (cookie.country) {
      setCountryName(getCountryByCode(cookie.country)?.name as string);
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
    handleChangeCurrency(newCurrency);
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

  return (
    <>
      <div className="text-white mt-8 flex w-full justify-center md:justify-end">
        <div
          onClick={() => showInternationalModal()}
          className="flex cursor-pointer border border-gray-400"
        >
          <div className="flex items-center border-r border-gray-400 p-4 ">
            <FaGlobeEurope className="mr-2 h-4 w-4" />
            {countryName}
          </div>
          <div className="flex border-r border-gray-400 p-4 ">
            {langCaption}
          </div>
          <div className="flex p-4 uppercase ">({currency})</div>
        </div>
        <Modal
          onClose={() => setIsModalVisible(false)}
          isOpen={isModalVisible}
          onOpen={() => {}}
        >
          <ModalOverlay />
          <ModalContent className="text-black">
            <div className="px-4 text-3xl font-light">
              {t("Update Language")}
            </div>
            <div className="py-1">
              <Divider />
            </div>
            <div className="mb-5 text-lg">
              {t(
                "Set_Languages_Country_Currency",
                "Set your Languages, Country and Currency"
              )}
            </div>
            <div className="mb-8">
              <div className="text-lg">{t("Language", "Language")}</div>
              <div className="mt-2 text-gray-400">
                {t("Language you prefer")}
              </div>
              <div className="int-motal-input-container">
                <Select
                  onOptionSelect={(v) => onLanguageChange(v)}
                  className="w-full text-lg"
                >
                  <SelectOption value="en">English</SelectOption>
                  <SelectOption value="fr">Français</SelectOption>
                  <SelectOption value="es">Española</SelectOption>
                  <SelectOption value="de">Deutsch</SelectOption>
                </Select>
              </div>
            </div>
            <div className="mb-8">
              <div className="text-lg">{t("Country", "Country")}</div>
              <div className="mt-2 text-gray-400">
                {t("Country you live in")}
              </div>
              <div className="int-motal-input-container">
                <Select onOptionSelect={(v) => onCountryChange(v)}>
                  {countries.map((item, key: number) => {
                    return (
                      <SelectOption key={key} value={item.isoCode}>
                        {item.name}
                      </SelectOption>
                    );
                  })}
                </Select>
              </div>
            </div>
            <div className="mb-8">
              <div className="text-lg">{t("Currency", "Currency")}</div>
              <div className="mt-2 text-gray-400">{t("Currency you use")}</div>
              <div className="int-motal-input-container">
                <Select
                  defaultValue="usd"
                  onOptionSelect={(v) => onCurrencyChange(v)}
                  className="w-full text-lg"
                >
                  <SelectOption value="usd">
                    $ {t("United State Dollar")} (USD)
                  </SelectOption>
                  <SelectOption value="chf">
                    ₣ {t("Swiss Franc")} (CHF)
                  </SelectOption>
                  <SelectOption value="gbp">
                    £ {t("The pound sterling")} (GBP)
                  </SelectOption>
                  <SelectOption value="eur">€ Euro (EUR)</SelectOption>
                </Select>
              </div>
            </div>
            <div className="pt-4 pb-1">
              <Divider />
            </div>
            <div className="flex justify-end">
              <button
                className="mr-4 rounded-md bg-gray-600 py-2 px-6 text-white"
                onClick={() => {
                  setIsModalVisible(false);
                }}
              >
                {t("Close")}
              </button>
              <button
                className="green-background rounded-md py-2 px-6 text-white"
                onClick={saveInternationalSettings}
              >
                {t("Save")}
              </button>
            </div>
          </ModalContent>
        </Modal>
      </div>
    </>
  );
};
