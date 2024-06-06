import { TabHighlighter } from "components/views/sellers/TabHighlighter";
import { Form, Formik } from "formik";
import React from "react";
import { useTranslation } from "react-i18next";
import {
  Button,
  DateFormInput,
  FormikInput,
  SaveIcon,
  SimpleTabHead,
  SimpleTabItemList,
  SimpleTabs,
  Switch,
  TabList,
} from "ui";

const Maintenance: React.FC = () => {
  const { t } = useTranslation();

  const socialLinks: { link: string; label: string }[] = [
    { label: "facebook", link: "https://www.facebook.com" },
    { label: "twitter", link: "https://www.twitter.com" },
    { label: "instagram", link: "https://www.instagram.com" },
    { label: "youtube", link: "https://www.youtube.com" },
    { label: "tiktok", link: "https://www.tiktok.com" },
    { label: "snapchat", link: "https://www.snapchat.com" },
  ];

  const tabs = [
    t("Maintenance Settings"),
    t("Social Links"),
    t("Page Settings"),
  ];

  return (
    <section>
      <div className="flex flex-col gap-4 border border-gray-300 p-4">
        <SimpleTabs>
          <div className="flex flex-wrap border-b border-b-gray-300">
            <SimpleTabHead>
              <TabHighlighter tabsTitles={tabs} />
            </SimpleTabHead>
          </div>
          <SimpleTabItemList>
            <div className="flex items-center gap-4">
              <Switch />
              <span>{t("Enable Maintenance")}</span>
            </div>
            <Formik
              initialValues={{
                ...socialLinks.reduce((acc, curr) => {
                  return { ...acc, [curr.label]: curr.link };
                }, {}),
              }}
              onSubmit={() => {}}
            >
              {({ values, handleChange }) => (
                <Form>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {socialLinks.map((link, i) => (
                      <FormikInput
                        key={i}
                        flushed
                        name={link.label}
                        label={link.label}
                      />
                    ))}
                  </div>
                </Form>
              )}
            </Formik>
            <Formik initialValues={{}} onSubmit={() => {}}>
              <div className="flex flex-col gap-4">
                <div className="flex items-start gap-2">
                  <Switch />
                  <p>{t("Coming Soon ON")}</p>
                </div>
                <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                  <FormikInput
                    placeholder={t("Paste url here")}
                    flushed
                    name={"video_url"}
                  />
                  <FormikInput
                    flushed
                    placeholder={`Select Time`}
                    name={"video_time"}
                  />
                  <DateFormInput
                    placeholder={t("Select Date")}
                    flushed
                    className="w-full"
                  />
                </div>
                <div className="w-full justify-end flex">
                  <Button className="flex items-center gap-2 px-4">
                    <SaveIcon className="text-white fill-white" />
                    {t("Update")}
                  </Button>
                </div>
              </div>
            </Formik>
          </SimpleTabItemList>
        </SimpleTabs>
      </div>
    </section>
  );
};

export default Maintenance;
