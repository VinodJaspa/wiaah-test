import React from "react";
import { shallow } from "enzyme";
import { Radio } from "ui";

describe("Radio render test", () => {
  it("should render correctly", () => {
    expect(shallow(<Radio />));
  });
});

describe("Radio snapshot tests", () => {
  it("it should match snapshot", () => {
    expect(shallow(<Radio />));
  });
});
