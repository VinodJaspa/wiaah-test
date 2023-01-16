import React from "react";
import { shallow, mount, ShallowWrapper, ReactWrapper } from "enzyme";
import { OrderConfirmationProductsTable } from "@UI";
import { ProductsWithProfile as placeholderProducts } from "placeholder";
import { getMountedComponent } from "../../helpers";
import { act } from "react-dom/test-utils";

const selectors = {
  productsTableBody: "#ProductsTableBody",
  tableHead: "#ProductsTableHead",
  product: "[data-testid='ProductCard']",
  removeItemButton: "[data-testid='RemoveButton']",
  productName: "[data-testid='ProductName']",
  productShopName: "[data-testid='ProductShopName']",
  productPrice: "[data-testid='ProductPrice']",
  productQty: "[data-testid='ProductQty']",
};
const productsOnly = placeholderProducts.filter(
  (product) => product.item.type === "product"
);
describe("OrderConfirmationProductsTable component render tests", () => {
  let wrapper: ShallowWrapper;
  let productsContainer: ShallowWrapper;
  let tableHead: ShallowWrapper;
  let products: ShallowWrapper;
  let removeButton: ShallowWrapper;
  let productName: ShallowWrapper;
  let productPrice: ShallowWrapper;
  let productQty: ShallowWrapper;

  beforeEach(() => {
    wrapper = shallow(
      <OrderConfirmationProductsTable products={placeholderProducts} />
    );
    productsContainer = wrapper.find(selectors.productsTableBody);
    tableHead = wrapper.find(selectors.tableHead);
    products = wrapper.find(selectors.product);
    removeButton = wrapper.find(selectors.removeItemButton);
    productName = wrapper.find(selectors.productName);
    productPrice = wrapper.find(selectors.productPrice);
    productQty = wrapper.find(selectors.productQty);
  });

  it("should render properly without products", () => {
    shallow(<OrderConfirmationProductsTable />);
  });
  it("should render properly with products", () => {
    shallow(<OrderConfirmationProductsTable products={placeholderProducts} />);
  });
  it("should have the right elements", () => {
    expect(products.length).toBe(productsOnly.length);
    expect(removeButton.length).toBe(productsOnly.length);
    expect(productName.length).toBe(productsOnly.length);
    expect(productPrice.length).toBe(productsOnly.length);
    expect(productQty.length).toBe(productsOnly.length);
    expect(productsContainer.length).toBe(1);
    expect(tableHead.length).toBe(1);
  });
  it("should only have products listed (no service cards)", () => {
    expect(productsContainer.children().length).toBe(productsOnly.length);
  });
  it("product card must have the same cols length as the header", () => {
    const headerCols = tableHead.childAt(0).children();
    const productsRows = productsContainer.find(selectors.product);
    productsRows.forEach((row) => {
      const productCols = row.children();
      expect(productCols.length).toBe(headerCols.length);
    });
  });
});

describe("OrderConfirmationProductsTable functionallity tests", () => {
  let wrapper: ReactWrapper;
  let productsContainer: ReactWrapper;
  let tableHead: ReactWrapper;

  let onRemoveMock: jest.Mock;
  beforeEach(() => {
    onRemoveMock = jest.fn();
    wrapper = mount(
      <OrderConfirmationProductsTable
        onRemove={onRemoveMock}
        products={placeholderProducts}
      />
    );
    productsContainer = getMountedComponent(
      wrapper,
      selectors.productsTableBody,
      2
    );
    tableHead = getMountedComponent(wrapper, selectors.tableHead, 2);
  });
  it("should call onRemove on removing an item", () => {
    const products = productsContainer
      .children()
      .map((child) => getMountedComponent(child, selectors.product));
    expect(products.length).toBe(productsOnly.length);
    products.forEach((product, i) => {
      const remove = getMountedComponent(
        product,
        selectors.removeItemButton,
        2
      );

      act(() => {
        remove.simulate("click");
      });
      expect(onRemoveMock).toBeCalledTimes(i + 1);
    });
  });
});

describe("OrderConfirmationProductsTable snapshot tests", () => {
  it("should match snapshot without products", () => {
    expect(shallow(<OrderConfirmationProductsTable />)).toMatchSnapshot();
  });
  it("should match snapshot with products", () => {
    expect(
      shallow(<OrderConfirmationProductsTable products={placeholderProducts} />)
    ).toMatchSnapshot();
  });
});
