import { shallow, ShallowWrapper } from "enzyme";
import { BrandSelectInputProps, BrandSelectInput } from "./BrandSelectInput";

describe("BrandSelectInpit", () => {
  let wrapper: ShallowWrapper;
  const props: BrandSelectInputProps = {
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
