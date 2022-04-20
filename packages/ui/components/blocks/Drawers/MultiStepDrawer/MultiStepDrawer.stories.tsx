import React from "react";
import { MultiStepDrawer } from ".";
import ChakraUiDecorator from "ui/SBDecorators/ChakraUiDecorator";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { SidebarContext } from "../../../helpers";
import { Button } from "@chakra-ui/react";
import { t } from "i18next";

export default {
  title: "UI/blocks/drawers/MultiStepDrawer",
  component: MultiStepDrawer,
  decorators: [ChakraUiDecorator],
} as ComponentMeta<typeof MultiStepDrawer>;

const Templete: ComponentStory<typeof MultiStepDrawer> = ({
  isOpen,
  onClose,
  ...args
}) => {
  const [isopen, setisopen] = React.useState<boolean>(false);
  return (
    <>
      <Button onClick={() => setisopen(true)}>open</Button>
      <MultiStepDrawer
        isOpen={isopen}
        onClose={() => setisopen(false)}
        {...args}
      />
    </>
  );
};

export const Default = Templete.bind({});
Default.args = {
  steps: [
    {
      label: t("Clothing", "Clothing"),
      url: "",
      steps: [
        {
          label: t("Women_s", "Womsen's"),
          url: "",
          steps: [
            {
              label: t("Dresses", "Dreasses"),
              url: "/category/dresses",
              steps: [
                {
                  label: t("Dresses", "Dresses"),
                  url: "/category/dresses",
                  steps: [],
                },
                {
                  label: t("Shirts", "Shirts"),
                  url: "/category/shirts",
                },
              ],
            },
            {
              label: t("Shirts", "Shidrts"),
              url: "/category/shirts",
            },
          ],
        },
        {
          label: t("Men_s", "Men's"),
          url: "/category/mens",
        },
      ],
    },
    {
      label: t("Home_&_Living", "Home & Living"),
      url: "/category/home-and-living",
    },
  ],
};
