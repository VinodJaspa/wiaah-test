import { mount, shallow } from "enzyme";
import { getMountedComponent } from "../../helpers/test/getMountedComponent";
import { VoucherInput } from "../VoucherInput";
import React from "react";
import { act } from "react-dom/test-utils";

const selectors = {
  VoucherInput: "#VoucherInput",
  applyVoucherButton: "#ApplyVoucherButton",
  message: "#InputMessage",
};

describe("VoucherInput renders", () => {
  it("should render properly", () => {
    shallow(<VoucherInput />);
  });
});

describe("VoucherInput functionallity tests", () => {
  it("should not call onSuccess if input is empty", async () => {
    const onSuccessMock = jest.fn();
    const wrapper = mount(<VoucherInput onSuccess={onSuccessMock} />);
    const addVoucherButton = getMountedComponent(
      wrapper,
      selectors.applyVoucherButton
    );
    await act(async () => {
      addVoucherButton.simulate("click");
    });
    expect(onSuccessMock).not.toBeCalled();
  });
  it("should call onSuccess with the expected output", async () => {
    const code = "50OFF";
    const onSuccessMock = jest.fn().mockImplementation(() => true);
    const wrapper = mount(<VoucherInput onSuccess={onSuccessMock} />);
    const input = getMountedComponent(wrapper, selectors.VoucherInput);
    const addVoucherButton = getMountedComponent(
      wrapper,
      selectors.applyVoucherButton
    );
    await act(async () => {
      input.simulate("change", { target: { value: code } });
      addVoucherButton.simulate("click");
    });
    console.log("voucher input ", input.debug());
    expect(onSuccessMock).toBeCalledTimes(1);
    expect(onSuccessMock).toBeCalledWith(code);
  });
  it("should dispaly 'Enter a voucher code' error message if input is empty", async () => {
    const wrapper = mount(<VoucherInput />);
    const addVoucherButton = getMountedComponent(
      wrapper,
      selectors.applyVoucherButton
    );
    await act(async () => {
      addVoucherButton.simulate("click");
    });
    wrapper.update();
    const message = getMountedComponent(wrapper, selectors.message);
    expect(message.text()).toBe("Enter a voucher code");
  });
  it("should dispaly 'Successfully added voucher code' success message if voucher code added successfully", async () => {
    const code = "50OFF";
    const onSuccessMock = jest.fn().mockImplementation(() => true);
    const wrapper = mount(<VoucherInput onSuccess={onSuccessMock} />);
    const input = getMountedComponent(wrapper, selectors.VoucherInput);
    const addVoucherButton = getMountedComponent(
      wrapper,
      selectors.applyVoucherButton
    );
    await act(async () => {
      input.simulate("change", { target: { value: code } });
      addVoucherButton.simulate("click");
    });

    wrapper.update();
    const message = getMountedComponent(wrapper, selectors.message);
    expect(message.text()).toBe("Successfully added voucher code");
  });
  it("should dispaly 'Invalid voucher code' error message if the voucher is not valid", async () => {
    const code = "50OFF";
    const onSuccessMock = jest.fn().mockImplementation(() => false);
    const wrapper = mount(<VoucherInput onSuccess={onSuccessMock} />);
    const input = getMountedComponent(wrapper, selectors.VoucherInput);
    const addVoucherButton = getMountedComponent(
      wrapper,
      selectors.applyVoucherButton
    );
    await act(async () => {
      input.simulate("change", { target: { value: code } });
      addVoucherButton.simulate("click");
    });

    wrapper.update();
    const message = getMountedComponent(wrapper, selectors.message);
    expect(message.text()).toBe("Invalid voucher code");
  });
  it("should dispaly 'Successfully added voucher code' success message if voucher code added successfully", async () => {
    const code = "50OFF";
    const onSuccessMock = jest.fn().mockImplementation(() => true);
    const wrapper = mount(<VoucherInput onSuccess={onSuccessMock} />);
    const input = getMountedComponent(wrapper, selectors.VoucherInput);
    const addVoucherButton = getMountedComponent(
      wrapper,
      selectors.applyVoucherButton
    );
    await act(async () => {
      input.simulate("change", { target: { value: code } });
      addVoucherButton.simulate("click");
    });

    wrapper.update();
    const message = getMountedComponent(wrapper, selectors.message);
    expect(message.text()).toBe("Successfully added voucher code");
  });
});

describe("VoucherInput snapshots", () => {
  it("should match snapshot", () => {
    const wrapper = shallow(<VoucherInput />);
    expect(wrapper).toMatchSnapshot();
  });
});
