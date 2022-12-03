import { storybookBlocksTitle, AuthPopup, Button, useLoginPopup } from "ui";
import { ComponentMeta } from "@storybook/react";
import { useTranslation } from "react-i18next";
// import { useLoginPopup } from "@hooks";

export default {
  title: storybookBlocksTitle + "AuthPopup",
  component: AuthPopup,
} as ComponentMeta<typeof AuthPopup>;

export const Default = () => {
  const { t } = useTranslation();
  const { OpenLoginPopup } = useLoginPopup();
  return (
    <>
      <Button onClick={OpenLoginPopup}>{t("open", "open")}</Button>
      <AuthPopup />
    </>
  );
};
