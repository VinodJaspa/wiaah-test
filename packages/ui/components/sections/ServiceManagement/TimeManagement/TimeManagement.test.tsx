import { shallow, ShallowWrapper } from "enzyme";
import { TimeManagementSection } from ".";

describe("TimeManagement tests", () => {
  let wrapper: ShallowWrapper;

  beforeAll(() => {
    wrapper = shallow(<TimeManagementSection />);
  });
});
