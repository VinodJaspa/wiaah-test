import { shallow, ShallowWrapper } from "enzyme";
import {
  WeekDayInputData,
  WeekdaysOpenTimeInput,
  WeekdaysOpenTimeInputProps,
} from "./WeekdaysOpenTimeInput";

describe("ProductColorSelectInput", () => {
  let wrapper: ShallowWrapper;
  let onChangeMock: jest.Mock;
  let props: WeekdaysOpenTimeInputProps = {
    onChange(data) {},
    value: [
      {
        weekday: 2,
        openRanges: [[new Date(), new Date()]],
      },
    ],
  };

  beforeEach(() => {
    onChangeMock = jest.fn();
    wrapper = shallow(
      <WeekdaysOpenTimeInput {...props} onChange={onChangeMock} />
    );
  });

  it("should match snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
