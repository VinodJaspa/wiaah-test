import {
  ContactUsForm,
  CountryLanguageCurrencySwitch,
  storybookBlocksTitle,
} from "@UI";
import { Meta } from "@storybook/react";

export default {
  title: "UI / blocks / CountryLanguageCurrencySwitch",
  component: CountryLanguageCurrencySwitch,
} as Meta<typeof CountryLanguageCurrencySwitch>;

export const Default = () => <CountryLanguageCurrencySwitch />;
