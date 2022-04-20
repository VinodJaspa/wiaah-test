import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Language } from "ui/languages/enums/Language";
import { Modal } from "antd";
import { Select } from "antd";
import { Divider } from "ui/components";
import { Country } from "country-state-city";
import { useRouter } from "next/router";
import { FaGlobeEurope } from "react-icons/fa";
import { useCookies } from "react-cookie";
import { Box } from "@chakra-ui/react";

const countries = Country.getAllCountries();
const { Option } = Select;

export const CountryLanguageCurrencySwitch: React.FC = () => {
  const router = useRouter();
  const { locale } = router;
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

  return (
    <>
      <Box
        color="primary.main"
        className="mt-8 flex w-full justify-center md:justify-end"
      >
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
          className=""
          centered={true}
          title={null}
          footer={null}
          onCancel={() => setIsModalVisible(false)}
          closeIcon=" "
          visible={isModalVisible}
        >
          <div className="px-4 text-3xl font-light">
            {t("Update_Language", "Update Language")}
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
              {t("Language_you_prefer", "Language you prefer")}
            </div>
            <div className="int-motal-input-container">
              <Select
                defaultValue={langCode}
                onChange={onLanguageChange}
                className="w-full text-lg"
                bordered={false}
              >
                <Option value="en">English</Option>
                <Option value="fr">Français</Option>
                <Option value="es">Española</Option>
                <Option value="de">Deutsch</Option>
              </Select>
            </div>
          </div>
          <div className="mb-8">
            <div className="text-lg">{t("Country", "Country")}</div>
            <div className="mt-2 text-gray-400">
              {t("Country_you_live_in", "Country you live in")}
            </div>
            <div className="int-motal-input-container">
              <Select
                showSearch
                defaultValue={countryCode}
                className="w-full text-lg"
                bordered={false}
                optionFilterProp="children"
                onChange={onCountryChange}
              >
                {countries.map((item, key: number) => {
                  return (
                    <Option key={key} value={item.isoCode}>
                      {item.name}
                    </Option>
                  );
                })}
              </Select>
            </div>
          </div>
          <div className="mb-8">
            <div className="text-lg">{t("Currency", "Currency")}</div>
            <div className="mt-2 text-gray-400">
              {t("Currency_you_use", "Currency you use")}
            </div>
            <div className="int-motal-input-container">
              <Select
                defaultValue="usd"
                onChange={onCurrencyChange}
                className="w-full text-lg"
                bordered={false}
                style={{}}
              >
                <Option value="usd">
                  $ {t("United_State_Dollar", "United State Dollar")} (USD)
                </Option>
                <Option value="chf">
                  {t("Swiss_Franc", "Swiss Franc")} (CHF)
                </Option>
                <Option value="gbp">
                  £ {t("The_pound_sterling", "The pound sterling")} (GBP)
                </Option>
                <Option value="eur">€ Euro (EUR)</Option>
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
              {t("Close", "Close")}
            </button>
            <button
              className="green-background rounded-md py-2 px-6 text-white"
              onClick={saveInternationalSettings}
            >
              {t("Save", "Save")}
            </button>
          </div>
        </Modal>
      </Box>
    </>
  );
};
