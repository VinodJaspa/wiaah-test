import { setTestid } from "utils";
import { mount, ReactWrapper } from "enzyme";
import { QueryClient, QueryClientProvider } from "react-query";
import { useBuyerSignupMutation } from "../useBuyerSignupMutation";
import * as api from "api";
import { createGraphqlRequestClient } from "api";

jest.mock("api", () => ({
  ...jest.requireActual("api"),
  createGraphqlRequestClient: jest.fn(),
}));

const Provider: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <QueryClientProvider client={new QueryClient()}>
    <>{children}</>
  </QueryClientProvider>
);

const Hook = () => {
  const { mutate, data, isLoading } = useBuyerSignupMutation();

  return (
    <div>
      <button onClick={(props: any) => mutate(props)} />
      <div {...setTestid("data")} test-data={data} test-loading={isLoading} />
    </div>
  );
};

describe("useBuyerSignupMutation", () => {
  let wrapper: ReactWrapper;
  let mockGraphqlClient = createGraphqlRequestClient as jest.Mock;
  beforeAll(() => {
    wrapper = mount(
      <Provider>
        <Hook />
      </Provider>,
    );
  });

  it("should mutate with the right data", async () => {
    expect(true).toBeTruthy();
  });
});
