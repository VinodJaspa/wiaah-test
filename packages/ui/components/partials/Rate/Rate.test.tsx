import React from "react";
import { shallow } from "enzyme";
import { Rate } from "@UI";

describe("Rate render test", () => {
  it("should render correctly", () => {
    expect(shallow(<Rate rating={5} />));
  });
});

describe("Rate snapshot tests", () => {
  it("it should match snapshot", () => {
    expect(shallow(<Rate rating={5} />));
  });
});
