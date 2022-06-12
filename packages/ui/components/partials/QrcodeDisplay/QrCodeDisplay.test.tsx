import React from "react";
import { shallow } from "enzyme";
import { QrcodeDisplay } from "ui";

describe("Radio render test", () => {
  it("should render correctly", () => {
    expect(shallow(<QrcodeDisplay value="159" />));
  });
});

describe("Radio snapshot tests", () => {
  it("it should match snapshot", () => {
    expect(shallow(<QrcodeDisplay value="123" />));
  });
});
