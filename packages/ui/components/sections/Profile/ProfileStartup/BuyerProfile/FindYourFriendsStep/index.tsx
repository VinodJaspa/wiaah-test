import React from "react";
import {
  Button,
  SectionHeader,
  Input,
  useResponsive,
  Image,
  HStack,
} from "@UI";
import { useTranslation } from "react-i18next";
import { Field, Form, Formik } from "formik";
import { mapArray } from "@UI/../utils/src";

export interface FindYourFriendsStepProps {}

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

export const FindYourFriendsStep = React.forwardRef(
  ({}: { onSuccess: () => any }, ref) => {
  const { t }: { t: (key: string, ...args: any[]) => string } = useTranslation();
    const { isMobile } = useResponsive();
    const [mailService, setMailService] = React.useState(0);

    React.useImperativeHandle(ref, () => ({
      onSubmit: () => {},
    }));

    return isMobile ? (
      <div className="flex flex-col gap-4">
        <SectionHeader sectionTitle={t("Find friends on Wiaah")} />

        {mapArray(MAIL_SERVICES, (v, i) => (
          <div className="flex flex-col gap-6 p-4">
            <div className="flex flex-col gap-4">
              <HStack>
                <Image className="h-6 w-8 object-cover" src={v.image} />
                <p>{v.name}</p>
              </HStack>
              <Input placeholder={t("Email")} />
            </div>
            <Button className="self-end" colorScheme="darkbrown">
              {t("Find Friends")}
            </Button>
          </div>
        ))}
      </div>
    ) : (
      <div className="w-full flex flex-col gap-2">
        <SectionHeader
          sectionTitle={t("Find_friends_on_Wiaah", "Find friends on Wiaah")}
        />
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
                <div className="flex flex-col gap-4">
                  {MAIL_SERVICES.map((service, i) => (
                    <div className="flex flex-col gap-4">
                      <div className="flex justify-between">
                        <div className="flex items-center">
                          <div className="inline-block w-16">
                            <img
                              className="h-8 w-12 object-cover"
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
                          <Button className="w-fit">
                            {t("Find_Friends", "Find Friends")}
                          </Button>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    );
  }
);
