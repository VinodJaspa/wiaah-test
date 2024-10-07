import { waitFor } from "@src/utils";
import { renderHook } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { useGetServiceCategoriesQuery } from "../useGetServiceCategories";

const queryClient = new QueryClient();
const wrapper: React.FC<React.PropsWithChildren<{}>> = ({ children }) => (
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
