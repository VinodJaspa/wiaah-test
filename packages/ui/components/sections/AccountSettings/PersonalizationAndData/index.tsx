import { Form, Formik } from "formik";
import React from "react";
import { useTranslation } from "react-i18next";
import {
  Button,
  Divider,
  HStack,
  SectionHeader,
  Switch,
  useGetCookiesSettingsQuery,
  useResponsive,
  useUpdateCookiesSettings,
} from "@UI";
import { TranslationTextType } from "types";

export interface PersonalizationAndDataSectionProps {}

export const PersonalizationAndDataSection: React.FC<
  PersonalizationAndDataSectionProps
> = ({}) => {
  const { data } = useGetCookiesSettingsQuery();
  const { mutate } = useUpdateCookiesSettings();
  const { isMobile } = useResponsive();

const { t } = useTranslation();
  return isMobile ? (
    <div className="flex flex-col gap-4 p-2">
      <SectionHeader sectionTitle={t("Cookies")} />
      <div>
        <p>
          {t(
            "We use cookies to help provide, personalize and improve your experience, including the ads you see, help business with analytics and measuring ad performance, and to provide a sager experience for you. You can learn more about how we use cookies in our Cookie Policy. We’ll remember your cookie choices and apply them anywhere you’re logged into instagram and where you use your accounts to log into other Facebook products. You can review or change your choices at any time in your cookie settings."
          )}
        </p>
        <Divider className="my-4" />
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <HStack className="justify-between">
              <p className="text-lg font-semibold">{t("Essential Cookies")}</p>
              <Switch variant="alt" />
            </HStack>
            <p className="text-xs">
              {t(
                "(These cookies are required to use Wiaah Company Products. They’re necessary for these sites to work as intended.)"
              )}
            </p>
          </div>
          <HStack className="justify-between">
            <p className="text-lg font-semibold">{t("Optional Cookies")}</p>
            <Switch variant="alt" />
          </HStack>
        </div>
      </div>
    </div>
  ) : (
    <div className="flex flex-col gap-8">
      <SectionHeader sectionTitle={t("Cookies")} />
      <p>
        {t(
          "We use cookies to help provide, personalize and improve your experience,including the ads you see,help businesses with analytics and measuring ad performance,and to provideasafer experience for you.You can learn more about how we use cookies in our Cookie Policy. We'll remember your cookie choices and apply them anywhere you're logged into Instagram and where you use your accounts to log into other Facebook products.You can review or change your choices at any time in your cookie settings."
        )}
      </p>
      <Formik<{
        ids: string[];
      }>
        initialValues={{ ids: [] }}
        onSubmit={(data, { resetForm }) => {
          mutate(data);
          resetForm();
        }}
      >
        {({ setFieldValue, values }) => {
          function handleSelectAllOptional() {
            const optional = data?.cookies.filter((v) => !v.required);

            setFieldValue(
              "ids",
              values.ids
                .filter((v) => !optional?.some((e) => e.id === v))
                .concat(optional?.map((v) => v.id) || [])
            );
          }

          function handleSelectAllRequired() {
            const required = data?.cookies.filter((v) => v.required);

            setFieldValue(
              "ids",
              values.ids
                .filter((v) => !required?.some((e) => e.id === v))
                .concat(required?.map((v) => v.id) || [])
            );
          }

          return (
            <Form className="flex flex-col gap-8">
              <>
                <div className="hstack justify-between">
                  <span className="font-bold text-xl">
                    {t("Essential Cookies")}
                  </span>
                  <span
                    onClick={handleSelectAllRequired}
                    className="cursor-pointer text-primary"
                  >
                    {t("Select All")}
                  </span>
                </div>
                <p>
                  {t(
                    "These cookies are required to use Wiaah Company Products.They're necessary for these sites to work as intended."
                  )}
                </p>

                {Array.isArray(data?.cookies)
                  ? data?.cookies
                      .filter((v) => v.required)
                      .map((note, i) => (
                        <div className="flex flex-col gap-4">
                          <div className="hstack justify-between">
                            <span className="text-xl font-bold">
                              {note.title}
                            </span>

                            <Switch
                              checked={values.ids.includes(note.id)}
                              onChange={(checked) => {
                                if (checked) {
                                  setFieldValue(
                                    "ids",
                                    values.ids
                                      .filter((e) => e !== note.id)
                                      .concat([note.id])
                                  );
                                } else {
                                  setFieldValue(
                                    "ids",
                                    values.ids.filter((e) => e !== note.id)
                                  );
                                }
                              }}
                            />
                          </div>
                          <p>{note.description}</p>
                          {note.benefits.map((note, i) => (
                            <div key={i} className="flex flex-col gap-2">
                              <span className="text-lg font-bold">
                                {note}
                                {":"}
                              </span>
                            </div>
                          ))}
                        </div>
                      ))
                  : null}

                <div className="hstack justify-between">
                  <span className="font-bold text-xl">
                    {t("Optional Cookies")}
                  </span>
                  <span
                    onClick={handleSelectAllOptional}
                    className="cursor-pointer text-primary"
                  >
                    {t("Select All")}
                  </span>
                </div>
                {Array.isArray(data?.cookies)
                  ? data?.cookies
                      .filter((v) => !v.required)
                      .map((note, i) => (
                        <div className="flex flex-col gap-4">
                          <div className="hstack justify-between">
                            <span className="text-xl font-bold">
                              {note.title}
                            </span>

                            <Switch
                              checked={values.ids.includes(note.id)}
                              onChange={(checked) => {
                                if (checked) {
                                  setFieldValue(
                                    "ids",
                                    values.ids
                                      .filter((e) => e !== note.id)
                                      .concat([note.id])
                                  );
                                } else {
                                  setFieldValue(
                                    "ids",
                                    values.ids.filter((e) => e !== note.id)
                                  );
                                }
                              }}
                            />
                          </div>
                          <p>{note.description}</p>
                          {note.benefits.map((note, i) => (
                            <div key={i} className="flex flex-col gap-2">
                              <span className="text-lg font-bold">
                                {note}
                                {":"}
                              </span>
                            </div>
                          ))}
                        </div>
                      ))
                  : null}
                <HStack className="justify-end">
                  {JSON.stringify(values) !==
                  JSON.stringify({
                    ids: data?.myCookies.acceptedCookiesIds,
                  }) ? (
                    <Button type="submit">{t("Save")}</Button>
                  ) : null}
                </HStack>
              </>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

type section = {
  title: TranslationTextType;
  description: TranslationTextType;
  notes: note[];
  value: string;
};

type note = {
  noteHeader: TranslationTextType;
  notePoints: TranslationTextType[];
};

const notes: section[] = [
  {
    title: {
      translationKey: "our_cookies_on_other_apps_and_websites",
      fallbackText: "Our Cookies on Other Apps and Websites",
    },
    description: {
      translationKey: "our_cookies_explaination",
      fallbackText:
        "These cookies help other companies to share information with us about your activity on their apps and websites.We use the information we receive to help personalize and improve your experience, including the ads you see,help businesses with analytics and measuring ad performance,and to provide services off of Instagram,like using Instagram to log into other apps and websites.",
    },
    value: "ourCookies",
    notes: [
      {
        noteHeader: {
          translationKey: "if_you_allow_our_use_of_these_cookies",
          fallbackText: "If you allow our use of these cookies",
        },
        notePoints: [
          {
            translationKey: "continue_using_instagram_to_log_into",
            fallbackText:
              "You can continue using Instagram to log into other apps and websites",
          },
          {
            translationKey: "we'll_use_inforomation_from_other_apps",
            fallbackText:
              "We'll use information from other apps and websites to show you relevant ads,unless you have not provided consent to our use of data from partners for ads,or otherwise restricted our use of information from other apps and websites using either Data About Your Activity From Partners or your device settings,in which case we will continue to honor your choices.",
          },
        ],
      },
      {
        noteHeader: {
          translationKey: "if_you_dont_allow_our_use_of_these_cookies",
          fallbackText: "If you dont allow our use of these cookies",
        },
        notePoints: [
          {
            translationKey: "you'll_be_logged_out_of_apps_websites",
            fallbackText:
              "You'll be logged out of apps and websites where you've used your Instagram accounts to log in, and won't be able to use your accounts to log back in",
          },
          {
            translationKey: "we'll_use_limited_information",
            fallbackText:
              "We'll use limited information from other apps and websites for security and integrity purposes,but it will not be used to show you personalized ads",
          },
          {
            translationKey: "we_may_still_receive_aggregate_information",
            fallbackText:
              "We'll use limited information from other apps and websites for security and integrity purposes,but it will not be used to show you personalized ads",
          },
        ],
      },
    ],
  },
  {
    title: {
      translationKey: "cookies_from_other_companies",
      fallbackText: "Cookies From Other Companies",
    },
    description: {
      translationKey: "cookies_from_other_companies_explaination",
      fallbackText:
        "For advertising and measurement services off of Facebook Products,analytics,and to provide certain features and improve our services for you,we use tools from other companies.These companies also use cookies.You can learn more in our Cookie Policy.",
    },
    value: "cookiesFromOtherCompanies",
    notes: [
      {
        noteHeader: {
          translationKey: "if_you_allow_our_use_of_these_cookies",
          fallbackText: "If you allow our use of these cookies",
        },
        notePoints: [
          {
            translationKey: "better_personalize_ads_for_you",
            fallbackText:
              "we'll be able to better personalize ads for you off Instagram, and measure their performance",
          },
          {
            translationKey: "features_on_our_products_will_not_be_affected",
            fallbackText: "Features on our prodcuts will not be affected",
          },
          {
            translationKey: "other_companies_will_receive_info_about_you",
            fallbackText:
              "Other companies will receive inforomation about you by using cookies",
          },
        ],
      },
      {
        noteHeader: {
          translationKey: "if_you_dont_allow_our_use_of_these_cookies",
          fallbackText: "If you dont allow our use of these cookies",
        },
        notePoints: [
          {
            translationKey: "we_won't_personalize_ads_for_you",
            fallbackText:
              "we won't use cookies from other companies to help personalize ads for you off of Instagram, or to measure their performance",
          },
          {
            translationKey: "some_features_on_our_products_may_not_work",
            fallbackText: "Some features on our products may not work",
          },
        ],
      },
    ],
  },
];
