import { shallow, ShallowWrapper } from "enzyme";
import { ServiceTripDateInput } from "./ServiceTripDateInput";

describe("ServiceTripDataInput", () => {
  let wrapper: ShallowWrapper;
  beforeEach(() => {
    wrapper = shallow(<ServiceTripDateInput />);
  });

  it("should match snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
