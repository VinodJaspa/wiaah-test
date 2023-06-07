import { useForm } from "@UI/../utils/src";
import { useSocialControls } from "@blocks";
import { useSendContactUsMutation } from "@features/Feedback/api/useSendContactUsMutation";
import { Button, Drawer, DrawerContent, Input, Textarea } from "@partials";
import { SectionHeader } from "@sections/ShoppingManagement";
import React from "react";
import { useTranslation } from "react-i18next";

export const ContactUsDrawer: React.FC = () => {
  const { value, hideContactUs } = useSocialControls("showContactUs");
  const { mutate } = useSendContactUsMutation();
  const { form, inputProps } = useForm<Parameters<typeof mutate>[0]>({
    email: "",
    message: "",
    name: "",
  });
  const { t } = useTranslation();
  const isOpen = value === true;

  return (
    <Drawer isOpen={isOpen} onClose={hideContactUs}>
      <DrawerContent className="flex flex-col w-full gap-4">
        <SectionHeader sectionTitle={t("Contact us")} />
        <div className="h-full flex justify-center items-center">
          <p>{t("Got a question?")}</p>
          <p>
            {t(
              "We’d love to hear from you. Send us a message and well respond as soon as possible."
            )}
          </p>
          <Input
            {...inputProps("name")}
            label={t("Name")}
            placeholder={t("Type name")}
          />
          <Input
            {...inputProps("email")}
            label={t("Email")}
            placeholder={t("Type email")}
          />
          <Textarea
            {...inputProps("message")}
            label={t("Message")}
            placeholder={t("Type message")}
          />
          <Button
            onClick={() => {
              mutate(form);
            }}
            className="w-full"
          >
            {t("Send Message")}
          </Button>
        </div>
      </DrawerContent>
    </Drawer>
  );
};
