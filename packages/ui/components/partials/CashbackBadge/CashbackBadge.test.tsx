import { mount, shallow, ShallowWrapper } from "enzyme";
import { waitFor, getTestId } from "utils/src/test";
import { CashbackBadge } from "./CashbackBadge";
import React from "react";
import { RecoilRoot } from "recoil";
describe("CashbackBadge rendering tests", () => {
  it("should render properly in cash mode", () => {
    const wrapper = mount(
      <RecoilRoot>
        <CashbackBadge amount={15} type={"cash"} />
      </RecoilRoot>
    );
    console.log(wrapper.text());
    expect(wrapper.text()).toBe("$15.00 Cashback");
  });

  it("should render properly in percent mode", () => {
    const wrapper = mount(
      <RecoilRoot>
        <CashbackBadge amount={15} type={"percent"} />
      </RecoilRoot>
    );
    console.log(wrapper.text());
    expect(wrapper.text()).toBe("15% Cashback");
  });
});
