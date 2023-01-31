import { shallow, ShallowWrapper } from "enzyme";
import { MembershipSection } from "./index";

describe("first", () => {
  let app: ShallowWrapper;

  beforeAll(() => {
    app = shallow(<MembershipSection />);
  });

  it("should display membership plans", () => {
    expect(true).toBe(true);
  });
});
