import { storybookFallbackDisplayTitle } from "utils";
import { SpinnerFallback } from "ui";
import { ComponentMeta } from "@storybook/react";

export default {
  title: storybookFallbackDisplayTitle + "SpinnerFallbackDisplay",
  component: SpinnerFallback,
} as ComponentMeta<typeof SpinnerFallback>;

export const loading = () => <SpinnerFallback isLoading />;
export const error = () => <SpinnerFallback isError />;
