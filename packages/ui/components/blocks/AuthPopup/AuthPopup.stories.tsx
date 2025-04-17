import { storybookBlocksTitle, AuthPopup, Button, useLoginPopup } from "@UI";
import { Meta } from "@storybook/react";
import { useTranslation } from "react-i18next";
// import { useLoginPopup } from "@hooks";

export default {
  title: "UI / blocks / AuthPopup",
  component: AuthPopup,
} as Meta<typeof AuthPopup>;

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
