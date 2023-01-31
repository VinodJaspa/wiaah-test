import { shallow, ShallowWrapper } from "enzyme";
import { SavedPostsSection } from "./SavedPostsSection";
import { useGetMySavedPostsQuery } from "@UI";

jest.mock("@UI", () => ({
  ...jest.requireActual("@UI"),
  useGetMySavedPostsQuery: jest.fn(),
}));

describe("SavedPostsSection", () => {
  let wrapper: ShallowWrapper;

  let mockHook = useGetMySavedPostsQuery as jest.Mock;

  beforeAll(() => {
    wrapper = shallow(<SavedPostsSection></SavedPostsSection>);
  });

  it("should render", () => {
    expect(wrapper).toBeDefined();
  });

  it("should pass the right data to the psot cards list wrapper", () => {
    expect(mockHook).toBeCalledTimes(0);
  });
});
