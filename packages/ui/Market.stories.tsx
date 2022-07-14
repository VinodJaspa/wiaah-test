import { ServicesViewsList } from "../../apps/market/data/ServicesViewsList";
import { ComponentMeta } from "@storybook/react";
import { NotFound, ServicesRequestKeys } from "ui";
import { getServiceView, ServicesTypeSwitcher } from "utils";
import MasterLayout from "../../apps/market/components/MasterLayout";

const Main = () => {
  return (
    <MasterLayout>
      <ServicesTypeSwitcher
        serviceType={ServicesRequestKeys.healthCenter}
        get={getServiceView.RESAULTS}
        fallbackComponent={NotFound}
        servicesList={ServicesViewsList}
      />
    </MasterLayout>
  );
};

export default {
  title: "",
  component: Main,
} as ComponentMeta<typeof Main>;

export const Default = () => <Main />;
