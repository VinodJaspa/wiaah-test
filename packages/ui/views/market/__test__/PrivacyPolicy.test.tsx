import { PrivacyPolicy } from "../index";
import { mount } from "enzyme";
import toJSON from "enzyme-to-json";

describe("Privacy policy", () => {
  it("should should have title element with the propery text", () => {
    const component = mount(<PrivacyPolicy />);
    const titleElement = component.find("#PrivacyPolicyTitle");
    expect(titleElement.length).toBe(1);
  });
  it("should contain privacy policy container", () => {
    const component = mount(<PrivacyPolicy />);
    const privacyPolicyContainer = component.find("#PrivacyPolicyContainer");
    expect(privacyPolicyContainer.length).toBe(1);
  });
});

describe("privacy policy snapshot", () => {
  it("should match snapshot", () => {
    const component = mount(<PrivacyPolicy />);
    expect(component).toMatchSnapshot();
  });
});
