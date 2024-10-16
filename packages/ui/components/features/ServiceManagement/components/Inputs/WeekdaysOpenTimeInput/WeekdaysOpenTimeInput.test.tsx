import { shallow, ShallowWrapper } from "enzyme";
import {
  WeekdaysOpenTimeInput,
  WeekdaysOpenTimeInputProps,
} from "./WeekdaysOpenTimeInput";

describe("ProductColorSelectInput", () => {
  let wrapper: ShallowWrapper;
  let onChangeMock: jest.Mock;
  let props: WeekdaysOpenTimeInputProps = {
    onChange(data) { },
    value: {
      mo: {
        __typename: "ServiceServiceDayWorkingHours",
        periods: ["09:00-12:00", "13:00-17:00"],
      },
      tu: {
        __typename: "ServiceServiceDayWorkingHours",
        periods: ["09:00-12:00"],
      },
      we: {
        __typename: "ServiceServiceDayWorkingHours",
        periods: ["10:00-14:00"],
      },
      th: {
        __typename: "ServiceServiceDayWorkingHours",
        periods: ["09:00-12:00", "14:00-18:00"],
      },
      fr: {
        __typename: "ServiceServiceDayWorkingHours",
        periods: ["09:00-12:00", "13:00-16:00"],
      },
      sa: null, // No working hours on Saturday
      su: null, // No working hours on Sunday
    },
  };

  beforeEach(() => {
    onChangeMock = jest.fn();
    wrapper = shallow(
      <WeekdaysOpenTimeInput {...props} onChange={onChangeMock} />,
    );
  });

  it("should match snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
