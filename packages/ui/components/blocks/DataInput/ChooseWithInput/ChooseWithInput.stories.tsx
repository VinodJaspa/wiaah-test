import { storybookDataInputBlocksTitle } from "utils";
import { ComponentMeta } from "@storybook/react";
import { ChooseWithInput } from "ui";

export default {
  title: storybookDataInputBlocksTitle + "ChooseWithInput",
  component: ChooseWithInput,
} as ComponentMeta<typeof ChooseWithInput>;

export const Default = () => (
  <ChooseWithInput
    name="test"
    title={{
      translationKey: "deposit",
      fallbackText: "deposit",
    }}
    options={[
      {
        title: {
          translationKey: "free",
          fallbackText: "free",
        },
        key: "test1",
        input: null,
      },
      {
        title: {
          translationKey: "free",
          fallbackText: "free",
        },
        key: "test2",
        input: {
          placeholder: "fee..",
        },
      },
      {
        title: {
          translationKey: "free",
          fallbackText: "free",
        },
        key: "test3",
        input: null,
      },
    ]}
  />
);
