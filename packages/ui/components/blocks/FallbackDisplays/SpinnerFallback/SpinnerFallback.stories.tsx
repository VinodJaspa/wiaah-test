import { storybookFallbackDisplayTitle } from "utils";
import { SpinnerFallback } from "./index";
import { Meta } from "@storybook/react";

export default {
  title: "UI / Blocks / Fallback display /SpinnerFallbackDisplay",
  component: SpinnerFallback,
} as Meta<typeof SpinnerFallback>;

export const loading = () => <SpinnerFallback isLoading />;
export const error = () => <SpinnerFallback isError />;
