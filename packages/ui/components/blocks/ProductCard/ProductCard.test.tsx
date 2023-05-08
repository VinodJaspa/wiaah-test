import { shallow } from "enzyme";
import { ProductCard } from "../ProductCard";
import React from "react";

describe("Product card render tests", () => {
  it("should render properly", () => {
    shallow(
      <ProductCard
        buttonText="test"
        id="testid"
        imageUrl="/shop.jpeg"
        name="test card"
        price={15}
        cashback="15%"
      />
    );
  });

  it("should render the right elements with the right text", () => {
    const colors = ["#900", "#000", "#fff"];
    const component = shallow(
      <ProductCard
        id="testid"
        imageUrl="/shop.jpeg"
        name="test card"
        price={15}
        cashback="15%"
        buttonText="add to cart"
        colors={colors}
        currency="USD"
        currencySymbol="$"
        discount={10}
        oldPrice={20}
      />
    );

    const productName = component.find("[data-test='productName']");
    const productCashback = component.find("[data-test='productCashback']");
    const productBtnText = component.find("[data-test='productButtonText']");
    const productPrice = component.find("[data-test='productPrice']");
    const productDiscount = component.find("[data-test='productDiscount']");
    const productPriceContainer = component.find(
      "[data-test='productPriceContainer']"
    );
    const productColors = component.find("[data-test='productColors']");
    const productOldPrice = component.find("[data-test='productOldPrice']");
    const productColor = component.find("[data-test='productColor']");
    const currencySymbol = component.find(
      "[data-test='productCurrencySymbol']"
    );

    productColor.forEach((color, i) => {
      expect(color.props().style?.backgroundColor).toBe(colors[i]);
    });

    expect(productDiscount.length).toBe(1);
    expect(productPriceContainer.length).toBe(1);
    expect(productColors.length).toBe(1);
    expect(productColor.length).toBe(3);
    expect(productName.length).toBe(1);
    expect(productCashback.length).toBe(1);
    expect(productBtnText.length).toBe(1);
    expect(productPrice.length).toBe(1);
    expect(currencySymbol.length).toBe(1);
    expect(productOldPrice.length).toBe(1);

    expect(productName.text()).toBe("test card");
    expect(productCashback.text()).toBe("15% Cashback");
    expect(productBtnText.text()).toBe("add to cart");
    expect(productPrice.text()).toBe("15");
    expect(currencySymbol.text()).toBe("$");
    expect(productDiscount.text()).toBe("10% OFF");
  });
  it("should not render 'booking' indicator when variant prop is not 'service'", () => {
    const component = shallow(
      <ProductCard
        buttonText="test"
        id="testid"
        imageUrl="/shop.jpeg"
        name="test card"
        price={15}
        cashback="15%"
      />
    );
    const serviceIndicator = component.find("[data-test='bookingText']");
    expect(serviceIndicator.length).toBe(0);
  });
  it("should render 'booking' indicator when variant prop is 'service'", () => {
    const component = shallow(
      <ProductCard
        buttonText="test"
        id="testid"
        imageUrl="/shop.jpeg"
        name="test card"
        price={15}
        cashback="15%"
        variant="service"
      />
    );
    const serviceIndicator = component.find("[data-test='bookingText']");
    expect(serviceIndicator.length).toBe(1);
    expect(serviceIndicator.text()).toBe("Booking");
  });
  it("should render filled heart if product is liked and position is save", () => {
    const component = shallow(
      <ProductCard
        buttonText="test"
        id="testid"
        imageUrl="/shop.jpeg"
        name="test card"
        price={15}
        cashback="15%"
        variant="service"
        liked={true}
      />
    );
    const liked = component.find("[data-test='productLiked']");
    const notLiked = component.find("[data-test='productNotLiked']");

    expect(liked.length).toBe(1);
    expect(notLiked.length).toBe(0);
  });
  it("should render empty heart if product is not liked and position is save", () => {
    const component = shallow(
      <ProductCard
        buttonText="test"
        id="testid"
        imageUrl="/shop.jpeg"
        name="test card"
        price={15}
        cashback="15%"
        variant="service"
        liked={false}
      />
    );
    const liked = component.find("[data-test='productLiked']");
    const notLiked = component.find("[data-test='productNotLiked']");

    expect(liked.length).toBe(0);
    expect(notLiked.length).toBe(1);
  });
  it("should render delete icon if position is delete", () => {
    const component = shallow(
      <ProductCard
        buttonText="test"
        id="testid"
        imageUrl="/shop.jpeg"
        name="test card"
        price={15}
        cashback="15%"
        liked={false}
      />
    );
    const liked = component.find("[data-test='productLiked']");
    const notLiked = component.find("[data-test='productNotLiked']");

    expect(liked.length).toBe(0);
    expect(notLiked.length).toBe(1);
  });
});

describe("productCard callback function tests", () => {
  it("should only trigger onLike callback on heart icon click when position prop equals 'save'", () => {
    const onLikeCbMock = jest.fn();
    const onDeleteCbMock = jest.fn();

    const component = shallow(
      <ProductCard
        buttonText="test"
        id="testid"
        imageUrl="/shop.jpeg"
        name="test card"
        price={15}
        cashback="15%"
        onLike={onLikeCbMock}
        onDelete={onDeleteCbMock}
        position="save"
      />
    );
    const actionButton = component.find("[data-test='actionButton']");
    actionButton.simulate("click");
    expect(onLikeCbMock).toBeCalledTimes(1);
    expect(onDeleteCbMock).toBeCalledTimes(0);
  });
  it("should only trigger onDelete callback on delete icon click when position prop equals 'delete'", () => {
    const onLikeCbMock = jest.fn();
    const onDeleteCbMock = jest.fn();

    const component = shallow(
      <ProductCard
        buttonText="test"
        id="testid"
        imageUrl="/shop.jpeg"
        name="test card"
        price={15}
        cashback="15%"
        onLike={onLikeCbMock}
        onDelete={onDeleteCbMock}
        position="delete"
      />
    );
    const actionButton = component.find("[data-test='actionButton']");
    actionButton.simulate("click");
    expect(onLikeCbMock).toBeCalledTimes(0);
    expect(onDeleteCbMock).toBeCalledTimes(1);
  });
  it("should only trigger onButtonClick callback on button click", () => {
    const onLikeCbMock = jest.fn();
    const onDeleteCbMock = jest.fn();
    const onButtonClick = jest.fn();

    const component = shallow(
      <ProductCard
        buttonText="test"
        id="testid"
        imageUrl="/shop.jpeg"
        name="test card"
        price={15}
        cashback="15%"
        onLike={onLikeCbMock}
        onDelete={onDeleteCbMock}
        onButtonClick={onButtonClick}
      />
    );
    const mainButton = component.find("[data-test='productButtonText']");
    mainButton.simulate("click");
    expect(onLikeCbMock).toBeCalledTimes(0);
    expect(onDeleteCbMock).toBeCalledTimes(0);
    expect(onButtonClick).toBeCalledTimes(1);
  });
});

describe("productCard snapshot tests", () => {
  it("should match snapshot with the required props", () => {
    const component = shallow(
      <ProductCard
        buttonText="test"
        id="testid"
        imageUrl="/shop.jpeg"
        name="test card"
        price={15}
        cashback="15%"
      />
    );
    expect(component).toMatchSnapshot();
  });
  it("should match snapshot with the all props", () => {
    const component = shallow(
      <ProductCard
        buttonText="test"
        id="testid"
        imageUrl="/shop.jpeg"
        name="test card"
        price={15}
        cashback="15%"
        colors={["#fff", "#900", "#000"]}
        currency="USD"
        currencySymbol="$"
        discount={15}
        forceHover={true}
        liked={true}
        oldPrice={20}
        position="delete"
        rating={5}
        variant="service"
      />
    );
    expect(component).toMatchSnapshot();
  });
});
