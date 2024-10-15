import React from "react";
import { shallow } from "enzyme";
import { ProductViewRight } from "../ProductViewRight";

it("renders correctly", () => {
  const wrapper = shallow(
    <ProductViewRight
      id="prod2"
      name="Wireless Headphones"
      price={99}
      oldPrice={149}
      imgUrl="/images/headphones.jpg"
      rating={4.2}
      reviews={85}
      category="Audio"
      saved={false}
      available={25}
      shippedToYourCountry={false}
    />,
  );
  expect(wrapper).toMatchSnapshot();
});
