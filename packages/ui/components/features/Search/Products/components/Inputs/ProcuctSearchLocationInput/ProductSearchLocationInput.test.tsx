import { shallow, ShallowWrapper } from "enzyme";
import {
  ProductSearchLocationInput,
  ProductSearchLocationInputProps,
} from "./ProductSearchLocationInput";

describe("NumberInput", () => {
  let wrapper: ShallowWrapper;
  let onChangeMock: jest.Mock;
  const props: ProductSearchLocationInputProps = {
    onChange(value) {},
    value: 15,
  };

  beforeEach(() => {
    onChangeMock = jest.fn();
    wrapper = shallow(
      <ProductSearchLocationInput {...props} onChange={onChangeMock} />
    );
  });

  it("should match snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });
  it("should match snapshot with ph", () => {
    expect(
      shallow(<ProductSearchLocationInput {...props} placeholder="ph test" />)
    ).toMatchSnapshot();
  });
});
