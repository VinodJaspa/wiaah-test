import {
  AffiliationPostViewModal,
  Button,
  useAffiliationPostViewPopup,
} from "@UI";
import { storybookModalsTitle } from "utils";
import { Meta } from "@storybook/react";

export default {
  title: "UI / Blocks / Modals /AffiliationPostViewModal",
  component: AffiliationPostViewModal,
} as Meta<typeof AffiliationPostViewModal>;

export const Default = () => {
  const { setCurrentPost } = useAffiliationPostViewPopup();

  return (
    <>
      <Button onClick={() => setCurrentPost("12345")}>open</Button>
      <AffiliationPostViewModal />
    </>
  );
};
