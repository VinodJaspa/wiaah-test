import { shallow, ShallowWrapper } from "enzyme";
import { getTestId } from "utils";
import { NumberInput, NumberInputProps } from "./NumberInput";

const selectors = {
  incrementBtn: "IncrementBtn",
  decrementBtn: "DecrementBtn",
  input: "Input",
};

describe("NumberInput", () => {
  let wrapper: ShallowWrapper;
  let onChangeMock: jest.Mock;
  const props: NumberInputProps = {
    onChange(value) {},
    value: 15,
  };

  beforeEach(() => {
    onChangeMock = jest.fn();
    wrapper = shallow(<NumberInput {...props} onChange={onChangeMock} />);
  });

  it("should trigger on change with a incremented number on increment btn click", () => {
    wrapper.find(getTestId(selectors.incrementBtn)).simulate("click");
    expect(onChangeMock).toBeCalledTimes(1);
    expect(onChangeMock).toBeCalledWith(16);
  });
  it("should trigger on change with a decremented number on decrement btn click", () => {
    wrapper.find(getTestId(selectors.decrementBtn)).simulate("click");
    expect(onChangeMock).toBeCalledTimes(1);
    expect(onChangeMock).toBeCalledWith(14);
  });
  it("should match snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });
  it("should match snapshot with ph", () => {
    expect(
      shallow(<NumberInput {...props} placeholder="ph test" />)
    ).toMatchSnapshot();
  });
});
