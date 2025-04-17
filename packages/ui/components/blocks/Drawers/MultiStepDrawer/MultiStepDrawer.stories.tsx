import React from "react";
import { storybookDrawersTitle } from "utils";
import { MultiStepDrawer, Button } from "@UI";
import { Meta, StoryFn } from "@storybook/react";
import { t } from "i18next";

export default {
  title: "UI / Blocks / drawers /MultiStepDrawer",
  component: MultiStepDrawer,
} as Meta<typeof MultiStepDrawer>;

const Templete: StoryFn<typeof MultiStepDrawer> = ({
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

export const Default = {
  render: Templete,

  args: {
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
  },
};
