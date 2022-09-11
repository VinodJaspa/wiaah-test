import { ComponentMeta, ComponentStory } from "@storybook/react";
import { storybookOtherServicesSectionsTitle } from "utils";
import { ServicePoliciesSection } from "./ServicePoliciesSection";

export default {
  title: storybookOtherServicesSectionsTitle + "ServicePoliciesSection",
  component: ServicePoliciesSection,
} as ComponentMeta<typeof ServicePoliciesSection>;

const template: ComponentStory<typeof ServicePoliciesSection> = (args) => (
  <ServicePoliciesSection {...args} />
);

export const Default = template.bind({});
Default.args = {
  policies: [
    {
      policyTerms: [
        "Lorem Ipsum is simply dummy text of the printing and typesetting",
        "industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley",
        "survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem",
        "Ipsum passages, and more recently with desktop publishing",
        "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of",
        "packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
      ],
      policyTitle: "",
    },
  ],
  title: "Check-in Checkout Terms",
};
