import { shallow, ShallowWrapper } from "enzyme";
import {
  MyServicesCardSwitcher,
  MyServicesCardSwitcherProps,
} from "./MyServicesCardSwitcher";
import React from "react";

const services = [
  {
    id: "1",
    title: "hotel service",
    description: "hotel service description",
    pricePerNight: 150,
    thumbnail: "/shop-2.jpeg",
    provider: "hotel service provider",
    type: "hotel",
  },
  {
    id: "2",
    title: "restaurant service",
    description: "restaruant service description",
    type: "restaurant",
    provider: "restaurant provider name",
    thumbnail: "/place-2.jpeg",
  },
  {
    id: "3",
    title: "health center service",
    description: "health center service description",
    type: "health_center",
    provider: "health center provider name",
    thumbnail: "/doctor.jpg",
  },
  {
    id: "4",
    title: "beauty center service",
    description: "beauty center service description",
    type: "beauty_center",
    provider: "beauty center provider name",
    thumbnail: "/place-2.jpeg",
  },
  {
    id: "5",
    title: "Holiday rentals service",
    description: "holiday rentals service description",
    type: "holiday_rentals",
    provider: "provider name",
    thumbnail: "/shop-3.jpeg",
    pricePerNight: 150,
  },
  {
    id: "6",
    title: "vehicle service",
    description: "vehicle service description",
    type: "vehicle",
    provider: "provider name",
    thumbnail: "/shop-3.jpeg",
  },
];

describe("MyServicesCardSwticher", () => {
  let wrapper: ShallowWrapper;
  let props: MyServicesCardSwitcherProps = {
    onEdit() {},
    onRemove() {},
    //@ts-ignore
    data: { ...services[0], type: "" },
  };

  beforeEach(() => {
    wrapper = shallow(<MyServicesCardSwitcher {...props} />);
  });

  it("should match snapshot with invalid service type", () => {
    expect(wrapper).toMatchSnapshot();
  });
  it("should match snapshot with hotel service type", () => {
    expect(
      shallow(<MyServicesCardSwitcher {...props} data={services[0]} />)
    ).toMatchSnapshot();
  });
  it("should match snapshot with restaurant service type", () => {
    expect(
      shallow(<MyServicesCardSwitcher {...props} data={services[1]} />)
    ).toMatchSnapshot();
  });
  it("should match snapshot with health center service type", () => {
    expect(
      shallow(<MyServicesCardSwitcher {...props} data={services[2]} />)
    ).toMatchSnapshot();
  });
  it("should match snapshot with beauty center service type", () => {
    expect(
      shallow(<MyServicesCardSwitcher {...props} data={services[3]} />)
    ).toMatchSnapshot();
  });
  it("should match snapshot with holiday rentals service type", () => {
    expect(
      shallow(<MyServicesCardSwitcher {...props} data={services[4]} />)
    ).toMatchSnapshot();
  });
  it("should match snapshot with vehicle service type", () => {
    expect(
      shallow(<MyServicesCardSwitcher {...props} data={services[5]} />)
    ).toMatchSnapshot();
  });
});
