import React from "react";
import { shallow } from "enzyme";
import { Card, CardHeader, CardTitle, CardContent } from "../../shadcn-components";

it("renders as expected without parameters", () => {
  const wrapper = shallow(<Card />);
  expect(wrapper).toMatchSnapshot();
});

it("renders as expected with parameters", () => {
  const wrapper = shallow(
    <Card>
      <CardHeader>
        <CardTitle>Card Name</CardTitle>
      </CardHeader>
      <CardContent>
        <img src="/no_image.jpg" alt="Card Image" />
      </CardContent>
    </Card>
  );

  expect(wrapper.find("img").props().src).toEqual("/no_image.jpg");
  expect(wrapper.find(CardTitle).text()).toEqual("Card Name");
});
