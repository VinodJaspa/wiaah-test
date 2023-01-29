import { shallow, ShallowWrapper } from "enzyme";
import { SavedPostsSection } from "./SavedPostsSection";

describe("SavedPostsSection", () => {
  let wrapper: ShallowWrapper;

  beforeAll(() => {
    wrapper = shallow(<SavedPostsSection></SavedPostsSection>);
  });

  it("should render", () => {
    expect(wrapper).toBeDefined();
  });
});
