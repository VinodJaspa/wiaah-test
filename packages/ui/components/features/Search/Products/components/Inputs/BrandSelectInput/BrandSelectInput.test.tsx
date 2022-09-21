import { shallow, ShallowWrapper } from "enzyme";
import { BrandSelectInputProps, BrandSelectInput } from "./BrandSelectInput";

describe("BrandSelectInpit", () => {
  let wrapper: ShallowWrapper;
  let props: BrandSelectInputProps = {
    options: ["Nike", "addidas"],
    value: "test",
    onChange(value) {},
  };

  beforeEach(() => {
    wrapper = shallow(<BrandSelectInput {...props} />);
  });
  it("should match snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
