import { renderHook } from "@testing-library/react";
import { useGetMyProducts } from "../useGetMyProducts";
import { GetFilteredProductsInput } from "@features/API"; // Ensure correct import path

describe("useGetMyProducts tests", () => {
  it("should get the right data", () => {
    // Directly pass an object that matches GetFilteredProductsInput
    const input: GetFilteredProductsInput = {
      pagination: { page: 5, take: 15 },
    };

    const { result } = renderHook(() => useGetMyProducts(input));

    expect(result.current.isLoading).toBe(true);
  });
});
