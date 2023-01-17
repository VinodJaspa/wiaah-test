import ProductsPage from "./index";
import { render, screen, waitFor } from "@testing-library/react";

describe("admin products", () => {
  it("should render the products correctly", async () => {
    render(<ProductsPage />);

    await waitFor(async () => {
      const products = await screen.findAllByTestId("product-record");
      expect(products.length).toBe(1);
    });
  });
});
