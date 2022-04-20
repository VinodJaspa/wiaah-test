import { mount, ReactWrapper, shallow, ShallowWrapper } from "enzyme";
import React from "react";
import { act } from "react-dom/test-utils";
import { CardDetails } from "types/market/Checkout";
import { getMountedComponent } from "../../helpers";
import { PaymentGateway } from "../PaymentGateway";

const selectors = {
  cardNumber: "#CardNumberInput",
  cardCvv: "#CardCvvInput",
  cardExpiryDate: "#CardExpiryDateInput",
  payNowButton: "#PayNowButton",
  paymentTitle: "#PaymentTitle",
  inputMessage: "#inputMessage",
};
const placeHolderInputs: CardDetails = {
  cardNumber: "12345678912132132345",
  cvv: "1234",
  expiryDate: "12/25",
};
describe("PaymentGateway render and props tests", () => {
  let wrapper: ReactWrapper;
  let cardNumberInput: ReactWrapper;
  let cardCvv: ReactWrapper;
  let cardExpiryDate: ReactWrapper;
  let payNowButton: ReactWrapper;
  let onSuccess: jest.Mock;
  beforeEach(() => {
    onSuccess = jest.fn();
    wrapper = mount(<PaymentGateway />);
    cardNumberInput = getMountedComponent(wrapper, selectors.cardNumber, 2);
    cardCvv = getMountedComponent(wrapper, selectors.cardCvv, 2);
    cardExpiryDate = getMountedComponent(wrapper, selectors.cardExpiryDate, 2);
    payNowButton = getMountedComponent(wrapper, selectors.payNowButton, 2);
  });

  it("should render properly", () => {
    shallow(<PaymentGateway />);
  });
  it("should have the right elments", () => {
    expect(cardNumberInput.length).toBe(1);
    expect(cardCvv.length).toBe(1);
    expect(cardExpiryDate.length).toBe(1);
    expect(payNowButton.length).toBe(1);
  });
});

describe("PaymentGateWay inputs validation tests", () => {
  let wrapper: ReactWrapper;
  let cardNumberInput: ReactWrapper;
  let cardCvv: ReactWrapper;
  let cardExpiryDate: ReactWrapper;
  let payNowButton: ReactWrapper;
  let onSuccess: jest.Mock;
  beforeEach(() => {
    onSuccess = jest.fn();
    wrapper = mount(<PaymentGateway onSuccess={onSuccess} />);
    cardNumberInput = getMountedComponent(wrapper, selectors.cardNumber, 2);
    cardCvv = getMountedComponent(wrapper, selectors.cardCvv, 2);
    cardExpiryDate = getMountedComponent(wrapper, selectors.cardExpiryDate, 2);
    payNowButton = getMountedComponent(wrapper, selectors.payNowButton, 2);
  });
  it("should not trigger onSuccess if inputs are empty", (done) => {
    act(() => {
      payNowButton.simulate("click");
    });
    setTimeout(() => {
      expect(onSuccess).not.toBeCalled();
      done();
    }, 500);
  });

  it("should trigger onSuccess with the expected data", (done) => {
    act(() => {
      cardNumberInput.simulate("change", {
        target: { name: "cardNumber", value: placeHolderInputs.cardNumber },
      });
      cardExpiryDate.simulate("change", {
        target: { name: "expiryDate", value: placeHolderInputs.expiryDate },
      });
      cardCvv.simulate("change", {
        target: { name: "cvv", value: placeHolderInputs.cvv },
      });
      wrapper.update();
      wrapper.find(selectors.payNowButton).first().simulate("click");
    });
    console.log(payNowButton.debug());
    wrapper.update();
    // console.log(wrapper.debug());
    setTimeout(() => {
      expect(onSuccess).toBeCalled();
      done();
    }, 300);
  });

  it("should show 'Card Number is required' error massege if cardNumber field is empty", (done) => {
    act(() => {
      cardNumberInput.simulate("change", {
        name: "cardNumber",
        value: "hgfhg",
      });
    });

    wrapper.update();

    // console.log(wrapper.debug());
    setTimeout(() => {
      expect(onSuccess).toBeCalledWith({ placeHolderInputs });
      done();
    }, 300);
  });
});

// describe("PaymentGateway snapshots", () => {
//   let wrapper: ShallowWrapper;
//   beforeEach(() => {
//     wrapper = shallow(<PaymentGateway />);
//   });
//   it("should match snapshot", () => {
//     expect(wrapper).toMatchSnapshot();
//   });
// });
