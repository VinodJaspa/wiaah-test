import { shallow, ShallowWrapper } from "enzyme";
import {
  CancelationPoliciesListInput,
  CancelationPoliciesListInputProps,
} from "./CancelationPoliciesList";

describe("CancelationPoliciesList", () => {
  let wrapper: ShallowWrapper;
  let props: CancelationPoliciesListInputProps = {
    onChange(policies) {},
    value: [
      { cost: 4, duration: 4 },
      { cost: 5, duration: 15 },
    ],
  };

  beforeAll(() => {
    jest.useFakeTimers().setSystemTime(new Date(2022));
  });

  beforeEach(() => {
    wrapper = shallow(<CancelationPoliciesListInput {...props} />);
  });

  it("should match snapshot with value", () => {
    expect(wrapper).toMatchSnapshot();
  });
  it("should match snapshot without value", () => {
    expect(
      shallow(<CancelationPoliciesListInput {...props} value={[]} />)
    ).toMatchSnapshot();
  });
});
