import {
  AffiliationPostViewModal,
  Button,
  useAffiliationPostViewPopup,
} from "@UI";
import { storybookModalsTitle } from "utils";
import { ComponentMeta } from "@storybook/react";

export default {
  title: storybookModalsTitle + "AffiliationPostViewModal",
  component: AffiliationPostViewModal,
} as ComponentMeta<typeof AffiliationPostViewModal>;

export const Default = () => {
  const { setCurrentPost } = useAffiliationPostViewPopup();

  return (
    <>
      <Button onClick={() => setCurrentPost("12345")}>open</Button>
      <AffiliationPostViewModal />
    </>
  );
};
