import { mount, ReactWrapper } from "enzyme";
import React from "react";
import { RecoilRoot } from "recoil";
import { PriceLevelDisplay, PriceLevelDisplayProps } from "./PriceLevelDisplay";

export const WrappedPriceLevelDisplay: React.FC<PriceLevelDisplayProps> = (
  props
) => (
  <RecoilRoot>
    <PriceLevelDisplay {...props} />
  </RecoilRoot>
);

describe("PriceLevelDisplay tests", () => {
  let wrapper: ReactWrapper;
  const levels = [80, 150, 250, 450];
  it("should render properly with the right number of symbols", () => {
    wrapper = mount(<WrappedPriceLevelDisplay amount={20} levels={levels} />);
    expect(wrapper.text()).toBe("$");

    wrapper = mount(<WrappedPriceLevelDisplay amount={90} levels={levels} />);
    expect(wrapper.text()).toBe("$$");

    wrapper = mount(<WrappedPriceLevelDisplay amount={160} levels={levels} />);
    expect(wrapper.text()).toBe("$$$");

    wrapper = mount(<WrappedPriceLevelDisplay amount={300} levels={levels} />);
    expect(wrapper.text()).toBe("$$$$");

    wrapper = mount(<WrappedPriceLevelDisplay amount={500} levels={levels} />);
    expect(wrapper.text()).toBe("$$$$$");

    wrapper = mount(<WrappedPriceLevelDisplay amount={1000} levels={levels} />);
    expect(wrapper.text()).toBe("$$$$$");
  });
});
