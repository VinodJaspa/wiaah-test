import { ComponentMeta } from "@storybook/react";
import { SocialContentProductsListingModal } from "./SocialContentProductsListingModal";
import { storybookModalsTitle } from "utils";
import { RecoilRoot } from "recoil";
import { useSocialControls } from "@blocks";
import { Button } from "@partials";

export default {
  title: storybookModalsTitle + "SocialContentProductsListingModal",
  decorators: [
    (S) => (
      <RecoilRoot>
        <S />
      </RecoilRoot>
    ),
  ],
} as ComponentMeta<typeof SocialContentProductsListingModal>;

export const Default = () => {
  const { showSocialContentProductsListing } = useSocialControls();

  return (
    <>
      <Button
        onClick={() => showSocialContentProductsListing(["test1", "test2"])}
      >
        open
      </Button>
      <SocialContentProductsListingModal />;
    </>
  );
};
