import { storybookCardsTitle } from "utils";
import { ComponentMeta } from "@storybook/react";
import { ServiceTypeCard } from "ui";

export default {
  title: storybookCardsTitle + "ServiceTypeCard",
  component: ServiceTypeCard,
} as ComponentMeta<typeof ServiceTypeCard>;

export const Default = () => {
  return (
    <ServiceTypeCard
      serviceInfo={{
        serviceName: "sample service",
        serviceDescription: "sample service description",
        serviceIcon: <div>icon</div>,
        serviceKey: "thingsRenting",
      }}
      onServiceChoosen={(serviceKey) => {}}
    />
  );
};
