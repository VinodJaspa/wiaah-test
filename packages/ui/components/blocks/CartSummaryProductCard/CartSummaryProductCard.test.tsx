import React from "react";
import { shallow, mount, ShallowWrapper, render, ReactWrapper } from "enzyme";
import { CartSummaryProductCard } from "../CartSummaryProductCard";
import { CartSummaryItem, ShopContactDetails } from "types/market/CartSummary";
import { getMountedComponent } from "../../helpers";

const date = Date.UTC(2020, 5, 25);

const selectors = {
  productName: "#ProductName",
  productImage: "#ProductImage",
  productPrice: "#ProductPrice",
  productQty: "#ProductQty",
  productSize: "#ProductSize",
  productColor: "#ProductColor",
  productDesc: "#ProductDesc",
  productDate: "#ProductDate",
  productCashback: "#ProductCashBack",
  productDiscount: "#ProductDiscount",
  productAddress: "#ProductAddress",
  productLocation: "#ProductLocation",
  productOldPrice: "#ProductOldPrice",
  productBookingIndicator: "#ProductBookingIndicator",
  moveToWishList: "#MoveToWishListButton",
  removeItem: "#RemoveProductButton",
};

const ProductVariantSelectors: Partial<typeof selectors> = {
  ...selectors,
  productAddress: undefined,
  productLocation: undefined,
  productBookingIndicator: undefined,
};

const product: CartSummaryItem = {
  id: "10",
  imageUrl: "testUrl",
  name: "test",
  price: 15,
  qty: 2,
  type: "product",
  cashback: {
    unit: "%",
    value: 15,
  },
  color: "red/blue",
  date: date,
  description:
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi quam commodi error perferendis nostrum veritatis sunt blanditiis soluta sapiente nisi, sequi quo assumenda dolorem sed, distinctio et cum tempora voluptate.",
  discount: {
    unit: "%",
    value: 5,
  },
  eventAdresses: "test@event.com",
  eventDuration: 50,
  location: "test location",
  oldPrice: 20,
  size: "large",
};

const shopProfile: ShopContactDetails = {
  id: "5",
  imageUrl: "test image url",
  name: "wiaah test",
};

describe("CartSummaryProductCard render tests", () => {
  let wrapper: ReactWrapper;
  let productName: ReactWrapper;
  let productPrice: ReactWrapper;
  let productQty: ReactWrapper;
  let productSize: ReactWrapper;
  let productColor: ReactWrapper;
  let productDesc: ReactWrapper;
  let productDate: ReactWrapper;
  let productCashback: ReactWrapper;
  let productDiscount: ReactWrapper;
  let productAddress: ReactWrapper;
  let productLocation: ReactWrapper;
  let productOldPrice: ReactWrapper;
  let moveToWishList: ReactWrapper;
  let removeItemButton: ReactWrapper;
  let onRemoveMock: jest.Mock;
  let onMoveToWishListMock: jest.Mock;
  let onQtyChangeMock: jest.Mock;
  let onProfileMock: jest.Mock;
  let onContactMock: jest.Mock;

  beforeEach(() => {
    onRemoveMock = jest.fn();
    onMoveToWishListMock = jest.fn();
    onQtyChangeMock = jest.fn();
    onContactMock = jest.fn();
    wrapper = mount(
      <CartSummaryProductCard
        onContactClick={onContactMock}
        onMoveToWishList={onMoveToWishListMock}
        onProfileClick={onProfileMock}
        onQtyChange={onQtyChangeMock}
        onRemove={onRemoveMock}
        product={product}
      />
    );
    moveToWishList = getMountedComponent(wrapper, selectors.moveToWishList);
    removeItemButton = getMountedComponent(wrapper, selectors.removeItem);
    productName = getMountedComponent(wrapper, selectors.productName, 2);
    productPrice = getMountedComponent(wrapper, selectors.productPrice, 2);
    productQty = getMountedComponent(wrapper, selectors.productQty, 2);
    productSize = getMountedComponent(wrapper, selectors.productSize, 2);
    productColor = getMountedComponent(wrapper, selectors.productColor, 2);
    productDesc = getMountedComponent(wrapper, selectors.productDesc, 2);
    productDate = getMountedComponent(wrapper, selectors.productDate, 2);
    productCashback = getMountedComponent(
      wrapper,
      selectors.productCashback,
      2
    );
    productDiscount = getMountedComponent(
      wrapper,
      selectors.productDiscount,
      2
    );
    productAddress = getMountedComponent(wrapper, selectors.productAddress, 2);
    productLocation = getMountedComponent(
      wrapper,
      selectors.productLocation,
      2
    );
    productOldPrice = getMountedComponent(
      wrapper,
      selectors.productOldPrice,
      2
    );
  });

  it("should render properly", () => {
    shallow(<CartSummaryProductCard product={product} />);
  });

  it("should render properly with shop profile", () => {
    shallow(<CartSummaryProductCard profile={shopProfile} product={product} />);
  });

  it("should contain the right element in product variant", () => {
    wrapper.update();

    expect(productName.length).toBe(1);
    expect(productPrice.length).toBe(1);
    expect(moveToWishList.length).toBe(1);
    expect(removeItemButton.length).toBe(1);
    expect(productColor.length).toBe(1);
    expect(productDesc.length).toBe(1);
    expect(productDiscount.length).toBe(1);
    expect(productOldPrice.length).toBe(1);
    expect(productQty.length).toBe(1);
    expect(productSize.length).toBe(1);
  });
});

describe("CartSummaryProductCard functionallity tests", () => {
  let wrapper: ReactWrapper;
  let productName: ReactWrapper;
  let productPrice: ReactWrapper;
  let productQty: ReactWrapper;
  let productSize: ReactWrapper;
  let productColor: ReactWrapper;
  let productDesc: ReactWrapper;
  let productDate: ReactWrapper;
  let productCashback: ReactWrapper;
  let productDiscount: ReactWrapper;
  let productAddress: ReactWrapper;
  let productLocation: ReactWrapper;
  let productOldPrice: ReactWrapper;
  let moveToWishListButton: ReactWrapper;
  let removeItemButton: ReactWrapper;
  let onRemoveMock: jest.Mock;
  let onMoveToWishListMock: jest.Mock;
  let onQtyChangeMock: jest.Mock;
  let onProfileMock: jest.Mock;
  let onContactMock: jest.Mock;

  beforeEach(() => {
    onRemoveMock = jest.fn();
    onMoveToWishListMock = jest.fn();
    onQtyChangeMock = jest.fn();
    onContactMock = jest.fn();
    wrapper = mount(
      <CartSummaryProductCard
        onContactClick={onContactMock}
        onMoveToWishList={onMoveToWishListMock}
        onProfileClick={onProfileMock}
        onQtyChange={onQtyChangeMock}
        onRemove={onRemoveMock}
        product={product}
      />
    );
    moveToWishListButton = getMountedComponent(
      wrapper,
      selectors.moveToWishList
    );
    removeItemButton = getMountedComponent(wrapper, selectors.removeItem);
    productName = getMountedComponent(wrapper, selectors.productName, 2);
    productPrice = getMountedComponent(wrapper, selectors.productPrice, 2);
    productQty = getMountedComponent(wrapper, selectors.productQty, 2);
    productSize = getMountedComponent(wrapper, selectors.productSize, 2);
    productColor = getMountedComponent(wrapper, selectors.productColor, 2);
    productDesc = getMountedComponent(wrapper, selectors.productDesc, 2);
    productDate = getMountedComponent(wrapper, selectors.productDate, 2);
    productCashback = getMountedComponent(
      wrapper,
      selectors.productCashback,
      2
    );
    productDiscount = getMountedComponent(
      wrapper,
      selectors.productDiscount,
      2
    );
    productAddress = getMountedComponent(wrapper, selectors.productAddress, 2);
    productLocation = getMountedComponent(
      wrapper,
      selectors.productLocation,
      2
    );
    productOldPrice = getMountedComponent(
      wrapper,
      selectors.productOldPrice,
      2
    );
  });
  it("should call onRemove with the right id on removing item", () => {
    removeItemButton.simulate("click");
    expect(onRemoveMock).toBeCalledTimes(1);
    expect(onRemoveMock).toBeCalledWith(product.id);
  });
  it("should call onMoveToWishList on movetowishlist icon click", () => {
    moveToWishListButton.simulate("click");
    expect(onMoveToWishListMock).toBeCalledTimes(1);
    expect(onMoveToWishListMock).toBeCalledWith(product.id);
  });
  it("should call onQtyChange on quantity change", () => {
    productQty.simulate("change", { target: { value: "5" } });

    expect(onQtyChangeMock).toBeCalledTimes(1);
    expect(onQtyChangeMock).toBeCalledWith(product.id, 5);
  });
});

describe("CarySummaryProductCard snapshot tests", () => {
  it("should match snapshot without shop profile", () => {
    expect(
      shallow(<CartSummaryProductCard product={product} />)
    ).toMatchSnapshot();
  });
  it("should match snapshot with shop profile", () => {
    expect(
      shallow(
        <CartSummaryProductCard profile={shopProfile} product={product} />
      )
    ).toMatchSnapshot();
  });
  it("should match snapshot Without profile in minimal variant", () => {
    expect(
      shallow(<CartSummaryProductCard minimal product={product} />)
    ).toMatchSnapshot();
  });
  it("should match snapshot with shop profile in minimal variant", () => {
    expect(
      shallow(
        <CartSummaryProductCard
          minimal
          profile={shopProfile}
          product={product}
        />
      )
    ).toMatchSnapshot();
  });
});
