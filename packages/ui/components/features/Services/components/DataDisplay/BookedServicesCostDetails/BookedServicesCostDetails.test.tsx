import React from "react";
import {
  BookedServicesCostDetails,
  BookedServicesCostDetailsProps,
} from "./BookedServicesCostDetails";
import { mount, ReactWrapper } from "enzyme";
import { RecoilRoot } from "recoil";
import { useSetBookedServicesState, BookedService } from "state";
import { CalculateVat, getTestId, randomNum } from "utils";

let mockVisitServiceCheckout: jest.Mock = jest.fn();

jest.mock("routing", () => ({
  useRouting: () => ({
    visit(fn: (routes: object) => any) {
      fn({ visitServiceCheckout: mockVisitServiceCheckout });
    },
  }),
}));

const testids = {
  subtotal: "Subtotal",
  total: "Total",
  vat: "Vat",
  bookedServiceItem: "BookedServiceItem",
  checkoutBtn: "CheckoutBtn",
};

let mockServices: BookedService[] = [...Array(10)].map((_, i) => ({
  id: `${i}`,
  name: `service ${i}`,
  price: randomNum(15),
  qty: i,
}));

let mockSubtotal = mockServices.reduce((acc, curr) => {
  return acc + curr.price * curr.qty;
}, 0);

const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { addService } = useSetBookedServicesState();
  React.useEffect(() => {
    mockServices.forEach((item) => {
      addService(item);
    });
  }, []);
  return <>{children}</>;
};

describe("BookedServicesCostDetails tests", () => {
  let wrapper: ReactWrapper;
  let props: BookedServicesCostDetailsProps;
  beforeEach(() => {
    props = {
      vat: 10, // Placeholder value for VAT percentage
      title: "Sample Service", // Placeholder title
      deposit: 50, // Optional deposit amount
      subTotal: 200, // Placeholder subtotal
      total: 220, // Placeholder total (subTotal + VAT, for example)
      vatAmount: 20, // Placeholder VAT amount
    };
    wrapper = mount(
      <RecoilRoot>
        <Wrapper>
          <BookedServicesCostDetails {...props} />
        </Wrapper>
      </RecoilRoot>,
    );
  });
  it("should render the title", () => {
    expect(wrapper.findWhere((node) => node.text() === props.title));
  });
  it("should render subtotal", () => {
    const subtotal = wrapper.find(getTestId(testids.subtotal));
    expect(subtotal.length).toBe(1);
    expect(subtotal.find("PriceDisplay").length).toBe(1);
    expect(subtotal.find("PriceDisplay").prop("price")).toBe(mockSubtotal);
  });
  it("should display the booked services quantity, name and price", () => {
    const services = wrapper.find(getTestId(testids.bookedServiceItem));
    expect(services.length).toBe(mockServices.length);
    services.forEach((node, i) => {
      expect(node.text()).toContain(
        `${mockServices[i].qty}x ${mockServices[i].name}`,
      );
      expect(node.find("PriceDisplay").length).toBe(1);
      expect(node.find("PriceDisplay").prop("price")).toBe(
        mockServices[i].price,
      );
    });
  });
  it("should display vat percent and cost correctly", () => {
    const vatNode = wrapper.find(getTestId(testids.vat));
    expect(vatNode.text()).toContain(`Vat(${props.vat}%)`);
    expect(vatNode.find("PriceDisplay").length).toBe(1);
    expect(vatNode.find("PriceDisplay").prop("price")).toBe(
      CalculateVat(mockSubtotal, props.vat),
    );
  });
  it("should display total cost correctly", () => {
    const node = wrapper.find(getTestId(testids.total));
    expect(node.text()).toContain(`Total`);
    expect(node.find("PriceDisplay").length).toBe(1);
    expect(node.find("PriceDisplay").prop("price")).toBe(
      mockSubtotal + CalculateVat(mockSubtotal, props.vat),
    );
  });
  it("should render a button with the text Checkout that triggers the service checkout routing", () => {
    const checkoutBtn = wrapper.findWhere(
      (node) => node.name() === "Button" && node.text() === "Checkout",
    );
    expect(checkoutBtn.length).toBe(1);
    checkoutBtn.simulate("click");
    expect(mockVisitServiceCheckout).toBeCalled();
  });
});
