import { Form, Formik } from "formik";
import React from "react";
import { useTranslation } from "react-i18next";
import { SectionHeader, Switch, TranslationText } from "@UI";
import { PersonalizationAndDataDto, TranslationTextType } from "types";
import { BsDot } from "react-icons/bs";

export interface PersonalizationAndDataSectionProps {}

export const PersonalizationAndDataSection: React.FC<
  PersonalizationAndDataSectionProps
> = ({}) => {
  const [initialValue, setInitialValue] =
    React.useState<PersonalizationAndDataDto>({
      cookiesFromOtherCompanies: false,
      essentialCookies: false,
      ourCookies: false,
    });
  const { t } = useTranslation();
  return (
    <div className="flex flex-col gap-8">
      <SectionHeader sectionTitle={t("cookies", "Cookies")} />
      <p>
        {t(
          "we_use_cookies",
          "We use cookies to help provide,personalize and improve your experience,including the ads you see,help businesses with analytics and measuring ad performance,and to provideasafer experience for you.You can learn more about how we use cookies in our Cookie Policy. We'll remember your cookie choices and apply them anywhere you're logged into Instagram and where you use your accounts to log into other Facebook products.You can review or change your choices at any time in your cookie settings."
        )}
      </p>
      <Formik<PersonalizationAndDataDto>
        initialValues={initialValue}
        onSubmit={(data, { resetForm }) => {
          console.log(data);
          resetForm();
        }}
      >
        {({ setFieldValue, values }) => {
          function handleSelectAllOptional() {
            notes.forEach((note) => {
              setFieldValue(note.value, true);
            });
          }
          return (
            <Form className="flex flex-col gap-8">
              <div className="hstack justify-between">
                <span className="text-xl font-bold">
                  {t("essential_cookies", "Essential Cookies")}
                </span>
                <Switch
                  checked={values.essentialCookies}
                  onChange={(checked) =>
                    setFieldValue("essentialCookies", checked)
                  }
                />
              </div>
              <p>
                {t(
                  "cookies_required_to_use_facebook_products",
                  "These cookies are required to use Facebook Company Products.They're necessary for these sites to work as intended."
                )}
              </p>
              <div className="hstack justify-between">
                <span className="font-bold text-xl">
                  {t("optional_cookies", "Optional Cookies")}
                </span>
                <span
                  onClick={handleSelectAllOptional}
                  className="cursor-pointer text-primary"
                >
                  {t("select_all", "Select All")}
                </span>
              </div>
              {notes.map((note, i) => (
                <div className="flex flex-col gap-4">
                  <div className="hstack justify-between">
                    <span className="text-xl font-bold">
                      <TranslationText translationObject={note.title} />
                    </span>

                    <Switch
                      //@ts-ignore
                      checked={values[note.value]}
                      onChange={(checked) => setFieldValue(note.value, checked)}
                    />
                  </div>
                  <TranslationText translationObject={note.description} />
                  {note.notes.map((note, i) => (
                    <div key={i} className="flex flex-col gap-2">
                      <span className="text-lg font-bold">
                        <TranslationText translationObject={note.noteHeader} />:
                      </span>
                      {note.notePoints.map((point, i) => (
                        <div key={i} className="flex gap-2 ">
                          <BsDot className="min-w-[1em] text-3xl" />
                          <TranslationText translationObject={point} />
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              ))}
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
