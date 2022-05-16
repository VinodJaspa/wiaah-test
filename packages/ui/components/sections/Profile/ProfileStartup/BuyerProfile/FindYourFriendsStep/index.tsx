import { Button, Divider, Stack } from "@chakra-ui/react";
import React from "react";
import { Input } from "antd";
import { useTranslation } from "react-i18next";
import { IoMdMail } from "react-icons/io";
import { Field, Form, Formik } from "formik";

export interface FindYourFriendsStepProps {}
const GMAIL_MAIL_SERVICE = 1;
const YAHOO_MAIL_SERVICE = 2;
const OUTLOOK_MAIL_SERVICE = 3;
const WHATSAPP_MAIL_SERVICE = 4;
const OTHER_MAIL_SERVICE = 5;

const MAIL_SERVICES: { name: string; image: string }[] = [
  {
    name: "gmail",
    image: "/gmail-logo.png",
  },
  {
    name: "yahoo",
    image: "/yahoo-logo.png",
  },
  {
    name: "outlook",
    image: "/outlook-logo.png",
  },
  {
    name: "whatsapp",
    image: "/whatsapp-logo.png",
  },
];

export const FindYourFriendsStep: React.FC<FindYourFriendsStepProps> = ({}) => {
  const { t } = useTranslation();

  let [mailService, setMailService] = React.useState(0);
  return (
    <div className="w-full">
      <h2 className="hidden text-xl font-bold md:block">
        {t("Find_friends_on_Wiaah", "Find friends on Wiaah")}
      </h2>
      <p className="pb-6 text-gray-400 md:pb-0">
        {t(
          "This_information_will_help",
          "This information will help you find friends on Wiaah"
        )}
      </p>
      <div className="flex flex-col gap-4 md:p-12">
        <Formik initialValues={{}} onSubmit={() => {}}>
          {() => (
            <Form>
              <Stack divider={<Divider />} direction={"column"} spacing="1rem">
                {MAIL_SERVICES.map((service, i) => (
                  <div className="flex flex-col gap-4">
                    <div className="flex justify-between">
                      <div className="flex items-center">
                        <div className="inline-block w-16">
                          <img
                            className="h-8"
                            src={service.image}
                            alt={`${service.name} logo`}
                          />
                        </div>
                        <span className="text-lg font-bold">
                          {service.name}
                        </span>
                      </div>
                      <div
                        className="green-text cursor-pointer font-bold"
                        onClick={() => {
                          setMailService(i);
                        }}
                      >
                        {t("Find_Friends", "Find Friends")}
                      </div>
                    </div>
                    {mailService == i && (
                      <>
                        <Field
                          as={Input}
                          name={"email"}
                          type="email"
                          placeholder={t("Email", "Email")}
                        />
                        <Button w="fit-content">
                          {t("Find_Friends", "Find Friends")}
                        </Button>
                      </>
                    )}
                  </div>
                ))}
              </Stack>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};
