import React from "react";
import { shallow } from "enzyme";
import { SellerCard } from "../SellerCard";

it("renders correctly", () => {
  const wrapper = shallow(
    <SellerCard id="3" name="card" rating={5} reviews={5} />,
  );
  expect(wrapper).toMatchSnapshot();
});
