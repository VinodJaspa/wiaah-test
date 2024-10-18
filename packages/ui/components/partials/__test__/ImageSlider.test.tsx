import React from "react";
import { ImageSlider } from "../../";
import { shallow } from "enzyme";

it("renders as expected without parameters", () => {
  const wrapper = shallow(
    <ImageSlider
      images={[
        "https://via.placeholder.com/300x200?text=Image+1",
        "https://via.placeholder.com/300x200?text=Image+2",
        "https://via.placeholder.com/300x200?text=Image+3",
        "https://via.placeholder.com/300x200?text=Image+4",
        "https://via.placeholder.com/300x200?text=Image+5",
      ]}
    />,
  );
  expect(wrapper).toMatchSnapshot();
});
