import React from "react";
import { shallow } from "enzyme";
import { Checkbox } from "@UI";

describe("Checkbox render test", () => {
  it("should render correctly", () => {
    expect(shallow(<Checkbox />));
  });
});

describe("Checkbox snapshot tests", () => {
  it("it should match snapshot", () => {
    expect(shallow(<Checkbox />));
  });
});
