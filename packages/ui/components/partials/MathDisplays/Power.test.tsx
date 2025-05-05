import { shallow, ShallowWrapper } from "enzyme";
import { MathPowerDisplay, MathPowerDisplayProps } from "./Power";

describe("Power", () => {
  let wrapper: ShallowWrapper;
  const props: MathPowerDisplayProps = {
    power: 45,
  };
  beforeEach(() => {
    wrapper = shallow(<MathPowerDisplay {...props} />);
  });

  it("should match snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
