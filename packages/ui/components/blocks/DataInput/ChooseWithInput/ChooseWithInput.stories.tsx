import { storybookDataInputBlocksTitle } from "utils";
import { Meta } from "@storybook/react";
import { ChooseWithInput } from "@UI";

export default {
  title: "UI / blocks / Data Input /ChooseWithInput",
  component: ChooseWithInput,
} as Meta<typeof ChooseWithInput>;

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
