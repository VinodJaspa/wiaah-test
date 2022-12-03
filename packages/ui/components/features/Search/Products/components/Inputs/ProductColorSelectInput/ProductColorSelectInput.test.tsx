import { shallow, ShallowWrapper } from "enzyme";
import {
  ProductColorSelectInput,
  ProductColorSelectInputProps,
} from "./ProductColorSelectInput";

describe("ProductColorSelectInput", () => {
  let wrapper: ShallowWrapper;
  let onChangeMock: jest.Mock;
  let props: ProductColorSelectInputProps = {
    onChange(value) {},
    colors: [
      {
        label: "red",
        value: "red",
      },
      {
        label: "green",
        value: "green",
      },
    ],
    value: "red",
  };

  beforeEach(() => {
    onChangeMock = jest.fn();
    wrapper = shallow(
      <ProductColorSelectInput {...props} onChange={onChangeMock} />
    );
  });

  it("should match snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });
  it("should match snapshot with ph", () => {
    expect(
      shallow(<ProductColorSelectInput {...props} placeholder={"test ph"} />)
    ).toMatchSnapshot();
  });
});
