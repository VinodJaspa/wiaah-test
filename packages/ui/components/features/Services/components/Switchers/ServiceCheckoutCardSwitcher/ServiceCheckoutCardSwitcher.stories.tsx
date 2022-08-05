import { ComponentMeta, ComponentStory } from "@storybook/react";
import { randomNum, storybookOtherServicesDataDisplayTitle } from "utils";
import { ServiceCheckoutCardSwitcher } from "./ServiceCheckoutCardSwitcher";

export default {
  title: storybookOtherServicesDataDisplayTitle + "ServiceCheckoutCardSwitcher",
  component: ServiceCheckoutCardSwitcher,
} as ComponentMeta<typeof ServiceCheckoutCardSwitcher>;

const template: ComponentStory<typeof ServiceCheckoutCardSwitcher> = (args) => (
  <ServiceCheckoutCardSwitcher {...args} />
);
const senctence =
  "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Minima libero perferendis fugit error unde, adipisci possimus totam mollitia? Inventore odio soluta nisi magnam vitae id voluptatum cum atque maiores nihil";

export const Hotel = template.bind({});
Hotel.args = {
  service: {
    type: "hotel",
    data: {
      serviceType: "hotel",
      bookedDates: {
        from: new Date(Date.now()).toString(),
        to: new Date(Date.now()).toString(),
      },
      rate: randomNum(5),
      refundingRule: {
        cost: 12,
        duration: 3,
        id: "12",
      },

      reviews: randomNum(153),
      thumbnail: "/place-1.jpg",
      id: "123",
      rateReason: "cleanliness",
      title: "Citadines Montmartre Paris",
      duration: [30, 60],
      extras: [
        {
          name: "Breakfast + book now, pay later",
          price: randomNum(100),
        },
      ],
      guests: randomNum(5),
      cashback: {
        amount: randomNum(20),
        type: "percent",
      },
      price: randomNum(500),
    },
  },
};

export const Restaurant = template.bind({});
Restaurant.args = {
  service: {
    type: "resturant",
    data: {
      serviceType: "resturant",
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
      thumbnail:
        "https://digital.ihg.com/is/image/ihg/crowne-plaza-jeddah-5499645385-2x1",
      id: "123",
      rateReason: "cleanliness",
      title: "Citadines Montmartre Paris",
      duration: [30, 60],
      bookedMenus: [
        {
          price: randomNum(100),
          qty: randomNum(10),
          title: senctence.slice(0, randomNum(senctence.length)),
        },
        {
          price: randomNum(100),
          qty: randomNum(10),
          title: senctence.slice(0, randomNum(senctence.length)),
        },
        {
          price: randomNum(100),
          qty: randomNum(10),
          title: senctence.slice(0, randomNum(senctence.length)),
        },
      ],
      guests: randomNum(5),
      cashback: {
        amount: randomNum(20),
        type: "percent",
      },

      price: randomNum(500),
    },
  },
};

export const HealthCenter = template.bind({});
HealthCenter.args = {
  service: {
    type: "health_center",
    data: {
      serviceType: "health_center",
      bookedDates: {
        from: new Date(Date.now()).toString(),
        to: new Date(Date.now()).toString(),
      },
      rate: randomNum(5),
      refundingRule: {
        cost: 60,
        duration: 0,
        id: "12",
      },

      reviews: randomNum(153),
      thumbnail:
        "https://www.astate.edu/a/student-health-center/images/student-health-750px.jpg",
      id: "123",
      rateReason: "cleanliness",
      title: "Citadines Montmartre Paris",

      duration: [30, 60],
      guests: randomNum(5),
      cashback: {
        amount: randomNum(20),
        type: "percent",
      },
      price: randomNum(500),
      doctor: {
        id: "123",
        name: "Doctor 1",
        specialty: "spine",
        price: randomNum(50),
        photo:
          "https://img.freepik.com/premium-photo/mature-doctor-hospital_256588-179.jpg?w=2000",
      },
    },
  },
};

export const BeautyCenter = template.bind({});
BeautyCenter.args = {
  service: {
    type: "beauty_center",
    data: {
      serviceType: "beauty_center",
      bookedDates: {
        from: new Date(Date.now()).toString(),
        to: new Date(Date.now()).toString(),
      },
      rate: randomNum(5),
      refundingRule: {
        cost: 0,
        duration: 4,
        id: "12",
      },
      duration: [30, 60],
      reviews: randomNum(153),
      thumbnail:
        "https://www.ariostea-high-tech.com/img/progetti/hotel-spa-wellness/U714/big/Tacha+Beauty+Center-01.jpg",
      id: "123",
      rateReason: "cleanliness",
      title: "Citadines Montmartre Paris",
      cashback: {
        amount: randomNum(20),
        type: "percent",
      },
      price: randomNum(500),
      bookedTreatments: [
        {
          category: "Facial",
          title: "Hydro facial with chemical peel",
          durationInMinutes: [30, 60],
          price: randomNum(50),
          discount: randomNum(60),
        },
      ],
    },
  },
};
