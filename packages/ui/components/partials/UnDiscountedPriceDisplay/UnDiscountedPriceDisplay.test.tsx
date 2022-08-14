import { mount, ReactWrapper, shallow } from "enzyme";
import React from "react";
import { RecoilRoot } from "recoil";
import { UnDiscountedPriceDisplay } from "./UnDiscountedPriceDisplay";

const amount = 52.2;
const discount = 13;
const unDiscounted = 60;

describe("UnDiscountedPriceDisplay tests", () => {
  it("should display the right price before discount", () => {
    expect(
      mount(
        <RecoilRoot>
          <UnDiscountedPriceDisplay amount={amount} discount={discount} />
        </RecoilRoot>
      ).text()
    ).toBe(`$${unDiscounted}.00`);
  });
});
