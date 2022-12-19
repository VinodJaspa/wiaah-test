import {
  ContactUsForm,
  CountryLanguageCurrencySwitch,
  storybookBlocksTitle,
} from "@UI";
import { ComponentMeta } from "@storybook/react";

export default {
  title: storybookBlocksTitle + "CountryLanguageCurrencySwitch",
  component: CountryLanguageCurrencySwitch,
} as ComponentMeta<typeof CountryLanguageCurrencySwitch>;

export const Default = () => <CountryLanguageCurrencySwitch />;
