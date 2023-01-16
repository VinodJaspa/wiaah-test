import { waitFor } from "@testing-library/react";
import { renderHook } from "@testing-library/react-hooks";
import { QueryClient, QueryClientProvider } from "react-query";
import { useGetServiceCategoriesQuery } from "../useGetServiceCategories";

const queryClient = new QueryClient();
const wrapper: React.FC = ({ children }) => (
  <QueryClientProvider client={queryClient}>
    <>{children}</>
  </QueryClientProvider>
);

describe("useGetServiceCategories", () => {
  it("should work", async () => {
    const { result } = renderHook(() => useGetServiceCategoriesQuery(), {
      wrapper,
    });
    expect(result.current).toEqual("Hello");

    await waitFor(() => result.current.isSuccess);
  });
});
