import { renderHook, WaitFor } from "@testing-library/react-hooks";
import { useGetMyProducts } from "../useGetMyProducts";

describe("useGetMyProducts tests", () => {
  it("should get the right data", () => {
    const { result } = renderHook(() =>
      useGetMyProducts({ args: { page: 5, take: 15 } })
    );

    expect(result.current.isLoading).toBe(true);
  });
});
