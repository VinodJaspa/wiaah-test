import { shallow, ShallowWrapper } from "enzyme";
import React from "react";
import {
  EditServicePresentationSection,
  EditServicePresentationSectionProps,
} from "./EditServicePresentationSection";

describe("EditServicePresentationSection", () => {
  let wrapper: ShallowWrapper;
  let onChangeMock: jest.Mock;
  let props: EditServicePresentationSectionProps = {};

  beforeEach(() => {
    onChangeMock = jest.fn();
    wrapper = shallow(<EditServicePresentationSection />);
  });

  it("should match snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
