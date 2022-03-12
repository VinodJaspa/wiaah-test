import React from "react";
import { shallow } from "enzyme";
import MasterLayout from "../components/MasterLayout";

describe("MasterLayout component render as expected", () => {
  test("check for last snapshot", () => {
    const wrapper = shallow(
      <MasterLayout>
        <button></button>
      </MasterLayout>
    );
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find("button").length).toEqual(1);
  });
});
