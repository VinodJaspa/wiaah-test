import { mount, shallow } from "enzyme";
import React from "react";
import { AddressDetails, AddressInputsFields } from "types";
import { AddressInputs } from "../AddressInputs";
import { getMountedComponent } from "@UI/components/helpers/test/getMountedComponent";
const selectors = {
  firstName: "#FirstNameInput",
  lastName: "#LastNameInput",
  address: "#AddressInput",
  address2: "#Address2Input",
  addressFinder: "#AddressFinderInput",
  zipCode: "#ZipCodeInput",
  contact: "#ContactInput",
  city: "#CityInput",
  country: "#CountryInput",
  defaultDelivery: "#SetDefaultDeliveryAddressInput",
  defaultBilling: "#SetDefaultBillingAddressInput",
  addAddressButton: "#AddAddressButton",
  cancelAddAddressButton: "#CancelAddAddressButton",
  addAddressManually: "#AddAddressManuallySwitcher",
};

const initialInput: AddressDetails = {
  firstName: "1stName",
  lastName: "2ndName",
  address: "random address 1",
  address2: "random address 2",
  city: "random city",
  country: "random country",
  zipCode: 132,
  contact: "12346798",
};

describe("address input rendering tests", () => {
  it("should render properly", () => {
    shallow(<AddressInputs />);
  });
  it("should render with the right input fileds with auto address state (auto address finder)", () => {
    const component = shallow(<AddressInputs />);
    const firstname = component.find(selectors.firstName);
    const lastname = component.find(selectors.lastName);
    const addressFinder = component.find(selectors.addressFinder);
    const address = component.find(selectors.address);
    const address2 = component.find(selectors.address2);
    const zipCode = component.find(selectors.zipCode);
    const city = component.find(selectors.city);
    const country = component.find(selectors.country);
    const contact = component.find(selectors.contact);
    const addressSwitcher = component.find(selectors.addAddressManually);
    const defaultDelivery = component.find(selectors.defaultDelivery);
    const defaultBilling = component.find(selectors.defaultBilling);
    const addAddressButton = component.find(selectors.addAddressButton);

    expect(firstname.length).toBe(1);
    expect(lastname.length).toBe(1);
    expect(addressFinder.length).toBe(1);
    expect(address.length).toBe(0);
    expect(address2.length).toBe(0);
    expect(zipCode.length).toBe(1);
    expect(city.length).toBe(0);
    expect(country.length).toBe(0);
    expect(contact.length).toBe(1);
    expect(addressSwitcher.length).toBe(1);
    expect(defaultDelivery.length).toBe(1);
    expect(defaultBilling.length).toBe(1);
    expect(addAddressButton.length).toBe(1);
  });
  it("should render with the right input fileds with manual address state", () => {
    const component = shallow(<AddressInputs />);
    const firstname = component.find(selectors.firstName);
    const lastname = component.find(selectors.lastName);
    const addressSwitcher = component.find(selectors.addAddressManually);
    addressSwitcher.simulate("change", { target: { checked: true } });
    const addressFinder = component.find(selectors.addressFinder);
    const address = component.find(selectors.address);
    const address2 = component.find(selectors.address2);
    const zipCode = component.find(selectors.zipCode);
    const city = component.find(selectors.city);
    const country = component.find(selectors.country);
    const contact = component.find(selectors.contact);
    const defaultDelivery = component.find(selectors.defaultDelivery);
    const defaultBilling = component.find(selectors.defaultBilling);

    expect(firstname.length).toBe(1);
    expect(lastname.length).toBe(1);
    expect(addressFinder.length).toBe(0);
    expect(address.length).toBe(1);
    expect(address2.length).toBe(1);
    expect(zipCode.length).toBe(1);
    expect(city.length).toBe(1);
    expect(country.length).toBe(1);
    expect(contact.length).toBe(1);
    expect(defaultDelivery.length).toBe(1);
    expect(defaultBilling.length).toBe(1);
  });
  it("should render inputs with the correct inital values", () => {
    const component = shallow(<AddressInputs initialInputs={initialInput} />);
    const firstname = component.find(selectors.firstName);
    const lastname = component.find(selectors.lastName);
    const address = component.find(selectors.address);
    const address2 = component.find(selectors.address2);
    const zipCode = component.find(selectors.zipCode);
    const city = component.find(selectors.city);
    const country = component.find(selectors.country);
    const contact = component.find(selectors.contact);
    const cancelAddAddressButton = component.find(
      selectors.cancelAddAddressButton
    );

    expect(cancelAddAddressButton.length).toBe(1);
    expect(firstname.props().value).toBe(initialInput.firstName);
    expect(lastname.props().value).toBe(initialInput.lastName);
    expect(address.props().value).toBe(initialInput.address);
    expect(address2.props().value).toBe(initialInput.address2);
    expect(zipCode.props().value).toBe(initialInput.zipCode);
    expect(city.props().value).toBe(initialInput.city);
    expect(country.props().value).toBe(initialInput.country);
    expect(contact.props().value).toBe(initialInput.contact);
  });
  // it("submit button should have the text 'ADD ADDRESS' if its not an address edit", () => {
  //   const component = shallow(<AddressInputs />);
  //   const btn = component.find("#AddAddressButton");
  //   console.log(component.debug());
  //   expect(btn.text()).toBe("ADD ADDRESS");
  // });
  // it("submit button should have the text 'SAVE' if its an address edit", () => {
  //   const initialInput: AddressDetails = {
  //     firstName: "1stName",
  //     lastName: "2ndName",
  //     address: "random address 1",
  //     address2: "random address 2",
  //     city: "random city",
  //     country: "random country",
  //     zipCode: 132,
  //     contact: "12346798",
  //   };
  //   const component = shallow(<AddressInputs initialInputs={initialInput} />);
  //   const btn = component.find("#AddAddressButton");
  //   expect(btn.text()).toBe("SAVE");
  // });
});

describe("addressInput functionallity tests", () => {
  it("should call onSuccess with the right inputs", () => {
    const expectedOutput: AddressInputsFields = {
      ...initialInput,
      defaultDeliveryAddress: false,
      defaultBillingAddress: false,
    };
    const onSuccessMock = jest.fn();
    const component = shallow(
      <AddressInputs onSuccess={onSuccessMock} initialInputs={initialInput} />
    );
    const addAddressButton = component.find(selectors.addAddressButton);
    addAddressButton.simulate("click");

    expect(onSuccessMock).toBeCalledTimes(1);
    expect(onSuccessMock).toBeCalledWith(expectedOutput);
  });
  it("should call onSuccess with default shipping address checked", () => {
    const expectedOutput: AddressInputsFields = {
      ...initialInput,
      defaultDeliveryAddress: true,
      defaultBillingAddress: false,
    };
    const onSuccessMock = jest.fn();
    const component = mount(
      <AddressInputs onSuccess={onSuccessMock} initialInputs={initialInput} />
    );

    const defaultDelivery = getMountedComponent(
      component,
      selectors.defaultDelivery
    );
    const addAddressButton = getMountedComponent(
      component,
      selectors.addAddressButton
    );

    defaultDelivery.simulate("change", {
      target: { checked: !defaultDelivery.prop("checked") },
    });

    addAddressButton.simulate("click");
    expect(onSuccessMock).toBeCalledTimes(1);
    expect(onSuccessMock).toBeCalledWith(expectedOutput);
  });

  it("should call onSuccess with default billing address checked", () => {
    const expectedOutput: AddressInputsFields = {
      ...initialInput,
      defaultDeliveryAddress: false,
      defaultBillingAddress: true,
    };
    const onSuccessMock = jest.fn();
    const component = mount(
      <AddressInputs onSuccess={onSuccessMock} initialInputs={initialInput} />
    );
    const addAddressButton = getMountedComponent(
      component,
      selectors.addAddressButton
    );
    const defualtBilling = getMountedComponent(
      component,
      selectors.defaultBilling
    );

    defualtBilling.simulate("change", {
      target: { checked: !defualtBilling.prop("checked") },
    });

    addAddressButton.simulate("click");
    expect(onSuccessMock).toBeCalledTimes(1);
    expect(onSuccessMock).toBeCalledWith(expectedOutput);
  });

  it("should call onCancel when the cancel button gets clicked", () => {
    const onCancelMock = jest.fn();
    const component = shallow(
      <AddressInputs initialInputs={initialInput} onCancel={onCancelMock} />
    );

    const cancelAddAddressButton = component.find(
      selectors.cancelAddAddressButton
    );
    cancelAddAddressButton.simulate("click");
    expect(onCancelMock).toBeCalledTimes(1);
  });
});

describe("addressInput input validation tests", () => {
  it("shouldnt call onSucsss if not all inputs are filled (manual address input)", () => {
    const placeHolderValues: AddressDetails = {
      firstName: "1stName",
      lastName: "2ndName",
      address: "random address 1",
      address2: "random address 2",
      city: "random city",
      country: "random country",
      zipCode: 132,
      contact: "12346798",
    };
    const onSuccessMock = jest.fn();
    const component = mount(<AddressInputs onSuccess={onSuccessMock} />);
    const firstname = getMountedComponent(component, selectors.firstName);
    const lastname = getMountedComponent(component, selectors.lastName);
    const addressSwitcher = getMountedComponent(
      component,
      selectors.addAddressManually
    );
    addressSwitcher.simulate("change", { target: { checked: true } });
    const address = getMountedComponent(component, selectors.address);
    const address2 = getMountedComponent(component, selectors.address2);
    const zipCode = getMountedComponent(component, selectors.zipCode);
    const country = getMountedComponent(component, selectors.country);
    const contact = getMountedComponent(component, selectors.contact);
    const addAddressButton = getMountedComponent(
      component,
      selectors.addAddressButton
    );

    firstname.simulate("change", {
      target: { value: placeHolderValues.firstName },
    });
    lastname.simulate("change", {
      target: { value: placeHolderValues.lastName },
    });
    address.simulate("change", {
      target: { value: placeHolderValues.address },
    });
    address2.simulate("change", {
      target: { value: placeHolderValues.address2 },
    });
    zipCode.simulate("change", {
      target: { value: placeHolderValues.zipCode },
    });
    // city.simulate("change",{target:{value:placeHolderValues.city}})
    country.simulate("change", {
      target: { value: placeHolderValues.country },
    });
    contact.simulate("change", {
      target: { value: placeHolderValues.contact },
    });
    addAddressButton.simulate("click");
    expect(onSuccessMock).not.toBeCalled();
  });
  it("shouldnt call onSucsss if not all inputs are filled (auto address finder)", () => {
    const placeHolderValues: Partial<AddressInputsFields> = {
      firstName: "1stName",
      lastName: "2ndName",
      zipCode: 132,
      contact: "12346798",
    };
    const onSuccessMock = jest.fn();
    const component = mount(<AddressInputs onSuccess={onSuccessMock} />);
    const firstname = getMountedComponent(component, selectors.firstName);
    const lastname = getMountedComponent(component, selectors.lastName);
    const addressFinder = getMountedComponent(
      component,
      selectors.addressFinder
    );
    const contact = getMountedComponent(component, selectors.contact);
    const addAddressButton = getMountedComponent(
      component,
      selectors.addAddressButton
    );

    firstname.simulate("change", {
      target: { value: placeHolderValues.firstName },
    });
    lastname.simulate("change", {
      target: { value: placeHolderValues.lastName },
    });
    // zipCode.simulate("change", {
    //   target: { value: placeHolderValues.zipCode },
    // });
    contact.simulate("change", {
      target: { value: placeHolderValues.contact },
    });
    addressFinder.simulate("change", { target: { value: "15 test street" } });

    addAddressButton.simulate("click");
    expect(onSuccessMock).not.toBeCalled();
  });

  it("should not call onSuccess if zip code is not numeric", () => {
    const testCases = ["1234@", "1324string"];
    testCases.forEach((c) => {
      const onSuccessMock = jest.fn();
      const component = mount(<AddressInputs onSuccess={onSuccessMock} />);
      const zipCode = getMountedComponent(component, selectors.zipCode);
      zipCode.simulate("change", { target: { value: c } });
      expect(onSuccessMock).not.toBeCalled();
    });
  });
});

describe("AddressInput snapshop tests", () => {
  it("should match shallow snapshot", () => {
    const component = shallow(<AddressInputs />);
    expect(component).toMatchSnapshot();
  });
  it("should match shallow snapshot with initial value", () => {
    const component = mount(<AddressInputs initialInputs={initialInput} />);
    expect(component).toMatchSnapshot();
  });
});
