import { storybookCardsTitle } from "utils";
import { Meta } from "@storybook/react";
import { ServiceTypeCard } from "@UI";
import { ServiceType } from "@features/API";

export default {
  title: "UI / blocks / cards /ServiceTypeCard",
  component: ServiceTypeCard,
} as Meta<typeof ServiceTypeCard>;

export const Default = () => {
  return (
    <ServiceTypeCard
      serviceInfo={{
        serviceName: "sample service",
        serviceDescription: "sample service description",
        serviceIcon: <div>icon</div>,
        serviceKey: ServiceType.Hotel,
      }}
      onServiceChoosen={(serviceKey) => {}}
    />
  );
};
