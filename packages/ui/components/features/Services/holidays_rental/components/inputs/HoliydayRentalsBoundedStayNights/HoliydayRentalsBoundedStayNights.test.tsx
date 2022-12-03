import { shallow, ShallowWrapper } from "enzyme";
import { getTestId } from "utils";
import {
  HoliydayRentalsBoundedStayNightsInput,
  HoliydayRentalsBoundedStayNightsInputProps,
} from "./HoliydayRentalsBoundedStayNights";

const selectors = {
  minCountInput: "minCountInput",
  minNightsText: "minNightsText",
  maxNightsText: "maxNightsText",
  maxCountInput: "maxCountInput",
};

describe("HolidayRentalsBoundedStayNight", () => {
  let wrapper: ShallowWrapper;
  let mockOnChange: jest.Mock;
  let props: HoliydayRentalsBoundedStayNightsInputProps = {
    onChange(data) {},
    value: {
      min: 4,
      max: 15,
    },
  };
  beforeEach(() => {
    mockOnChange = jest.fn();
    wrapper = shallow(
      <HoliydayRentalsBoundedStayNightsInput
        {...props}
        onChange={mockOnChange}
      />
    );
  });

  it("Should trigger onChange with the right props when min count input changes", () => {
    const onMinChange = wrapper
      .find(getTestId(selectors.minCountInput))
      .prop("onCountChange") as Function;
    onMinChange(props.value.min - 1);
    expect(mockOnChange).toBeCalledTimes(1);
    expect(mockOnChange).toBeCalledWith({
      ...props.value,
      min: props.value.min - 1,
    });
  });
  it("Should trigger onChange with the right props when max count input changes", () => {
    const onMinChange = wrapper
      .find(getTestId(selectors.maxCountInput))
      .prop("onCountChange") as Function;
    onMinChange(props.value.max + 1);
    expect(mockOnChange).toBeCalledTimes(1);
    expect(mockOnChange).toBeCalledWith({
      ...props.value,
      max: props.value.max + 1,
    });
  });
  it("Should display the right nights number text", () => {
    expect(wrapper.find(getTestId(selectors.minNightsText)).text()).toBe(
      `${props.value.min} min nights`
    );
    expect(wrapper.find(getTestId(selectors.maxNightsText)).text()).toBe(
      `${props.value.max} max nights`
    );
  });

  it("should match snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
