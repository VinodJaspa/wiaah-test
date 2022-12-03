import React from "react";
import { PriceDisplay } from "ui/components/partials/PriceDisplay";
import { shallow } from "enzyme";

describe("PriceDisaply tests", () => {
  it("should render properly", () => {
    shallow(
      <PriceDisplay
        priceObject={{
          amount: 15,
          currency: "CHF",
        }}
      />
    );
  });
  it("should show the right text", () => {
    const wrapper = shallow(
      <PriceDisplay
        priceObject={{
          amount: 15,
          currency: "CHF",
        }}
      />
    );
    expect(wrapper.text()).toContain("15 CHF");
  });
});
