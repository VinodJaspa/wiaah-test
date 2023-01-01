import React from "react";
import { shallow } from "enzyme";
import { Spinner } from "@UI";

describe("Spinner render test", () => {
  it("should render correctly", () => {
    expect(shallow(<Spinner />));
  });
});

describe("Spinner snapshot tests", () => {
  it("it should match snapshot", () => {
    expect(shallow(<Spinner />));
  });
});
