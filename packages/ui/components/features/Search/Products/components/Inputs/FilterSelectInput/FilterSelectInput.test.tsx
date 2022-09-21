import { shallow, ShallowWrapper } from "enzyme";
import { FilterSelectInput, FilterSelectInputProps } from "./FilterSelectInput";

describe("FilterSelectInput", () => {
  let wrapper: ShallowWrapper;
  let props: FilterSelectInputProps = {
    options: ["fashion", "sports"],
    value: "test value",
    onChange(value) {},
  };

  beforeEach(() => {
    wrapper = shallow(<FilterSelectInput {...props} />);
  });
  it("should match snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });
  it("should match snapshot with ph", () => {
    expect(
      shallow(<FilterSelectInput {...props} placeholder="ph test" />)
    ).toMatchSnapshot();
  });
});
