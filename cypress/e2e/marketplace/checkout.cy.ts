import { SeedDBResponse } from "../../tasks";
import { marketplaceRoutes } from "../const";

const testids = {
  productAddToCartBtn: "product_add_to_cart_btn",
  shoppingCartOpenBtn: "shopping_cart_open_btn",
  shoppingCartCheckoutBtn: "shopping_cart_checkout_btn",
  shoppingCartItem: "shipping_cart_item",
};

describe("Checkout end to end Testing", () => {
  let productsCategories: { id: string; name: string }[];
  let products: { id: string; name: string; categoryId: string }[];

  beforeEach(() => {
    cy.task<SeedDBResponse>("seedDb").then((res) => {
      productsCategories = res.productCategories;
      products = res.products;
    });
  });
  it("should add product to cart", () => {
    cy.viewport("iphone-x");
    const product = products.at(0);
    cy.visit(marketplaceRoutes.visitProductPage(product.id));

    cy.url().should("contain", product.id);

    cy.find(testids.productAddToCartBtn).click();

    cy.find(testids.shoppingCartOpenBtn).click();

    cy.find(testids.shoppingCartCheckoutBtn).click();

    cy.url().should("have.text", "checkout");

    cy.find(testids.shoppingCartItem).first().as("cartItem");

    cy.get("@cartItem").should("have.length", 1);

    cy.get("@cartItem").should("have.attr", "data-itemID", product.id);
  });
});
