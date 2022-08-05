import { randomNum, storybookOtherServicesCardsTitle } from "utils";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { ServiceCheckoutCommonCardWrapper } from "./ServiceCheckoutCommonCardWrapper";

export default {
  title: storybookOtherServicesCardsTitle + "ServiceCheckoutCommonCardWrapper",
  component: ServiceCheckoutCommonCardWrapper,
} as ComponentMeta<typeof ServiceCheckoutCommonCardWrapper>;

const template: ComponentStory<typeof ServiceCheckoutCommonCardWrapper> = (
  args
) => <ServiceCheckoutCommonCardWrapper {...args} />;

export const Default = template.bind({});
Default.args = {
  bookedDates: {
    from: new Date(Date.now()).toString(),
    to: new Date(Date.now()).toString(),
  },
  rate: randomNum(5),
  refundingRule: {
    cost: 0,
    duration: 0,
    id: "12",
  },
  reviews: randomNum(153),
  thumbnail: "/place-1.jpg",
  id: "123",
  rateReason: "cleanliness",
  title: "Citadines Montmartre Paris",
  cashback: {
    amount: randomNum(20),
    type: "percent",
  },
  price: randomNum(500),
  serviceType: "hotel",
  duration: [30, 60],
  children: <div>children</div>,
};
