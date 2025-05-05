import { shallow, ShallowWrapper } from "enzyme";
import { TimeClockDisplay, TimeClockDisplayProps } from "./TimeClockDisplay";

describe("TimeClockDisplay", () => {
  let wrapper: ShallowWrapper;
  const props: TimeClockDisplayProps = {
    from: new Date(2022, 8, 11, 15),
    to: new Date(2022, 8, 11, 19),
    off: false,
  };

  beforeEach(() => {
    wrapper = shallow(<TimeClockDisplay {...props} />);
  });

  it("should match snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
