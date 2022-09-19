import { PendingAppointmentCard } from "./index";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { storybookServiceManagementCardsTitle } from "utils";

export default {
  title: storybookServiceManagementCardsTitle + "PendingAppointmentCard",
  component: PendingAppointmentCard,
} as ComponentMeta<typeof PendingAppointmentCard>;

const template: ComponentStory<typeof PendingAppointmentCard> = (args) => (
  <PendingAppointmentCard {...args} />
);

export const Default = template.bind({});
Default.args = {
  appointmentRequestData: {
    type: "hotel",
    data: {
      title: "hotel appointment",
      bookedDates: {
        from: new Date(),
        to: new Date(),
      },
      cashback: {
        amount: 15,
        type: "cash",
      },
      duration: [60, 90],
      extras: ["extra 1", "extra 2"],
      guests: 3,
      id: "132",
      price: 150,
      rate: 4.8,
      rateReason: "good",
      refundingRule: {
        cost: 26,
        duration: 5,
        id: "test",
      },
      reviews: [],
      serviceType: "hotel",
      thumbnail: "/place-2.jpg",
    },
  },
};
