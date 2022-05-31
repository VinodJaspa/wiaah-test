import React from "react";
import { shallow, mount } from "enzyme";
import { ProgressBars } from "./index";

describe("progressbars snapshot tests", () => {
  it("should match snapshot", () => {
    expect(shallow(<ProgressBars progressBarsData={[]} />));
  });
});
