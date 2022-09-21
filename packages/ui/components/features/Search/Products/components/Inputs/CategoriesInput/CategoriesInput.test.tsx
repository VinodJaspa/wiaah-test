import { shallow, ShallowWrapper } from "enzyme";
import {
  CategoriesSelectInput,
  CategoriesSelectInputProps,
} from "./CategoriesSelectInput";

describe("CategoriesSelectIput", () => {
  let wrapper: ShallowWrapper;
  let props: CategoriesSelectInputProps = {
    categories: ["fashion", "sports"],
    value: "test",
    onChange(value) {},
  };

  beforeEach(() => {
    wrapper = shallow(<CategoriesSelectInput {...props} />);
  });
  it("should match snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });
  it("should match snapshot with ph", () => {
    expect(
      shallow(<CategoriesSelectInput {...props} placeholder="ph test" />)
    ).toMatchSnapshot();
  });
});
