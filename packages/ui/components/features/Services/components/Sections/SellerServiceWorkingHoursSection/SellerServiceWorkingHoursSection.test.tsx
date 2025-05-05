import { shallow, ShallowWrapper } from "enzyme";
import {
  SellerServiceWorkingHoursSection,
  SellerServiceWorkingHoursSectionProps,
} from "./SellerServiceWorkingHoursSection";

describe("SellerServiceWorkingHoursSection", () => {
  let wrapper: ShallowWrapper;
  const props: SellerServiceWorkingHoursSectionProps = {
    workingDays: {
      __typename: "ServiceWeekdaysWorkingHours",
      mo: {
        __typename: "ServiceServiceDayWorkingHours",
        periods: ["09:00-12:00", "13:00-17:00"],
      },
      tu: {
        __typename: "ServiceServiceDayWorkingHours",
        periods: ["09:00-12:00", "13:00-17:00"],
      },
      we: {
        __typename: "ServiceServiceDayWorkingHours",
        periods: ["09:00-12:00", "13:00-17:00"],
      },
      th: {
        __typename: "ServiceServiceDayWorkingHours",
        periods: ["09:00-12:00", "13:00-17:00"],
      },
      fr: {
        __typename: "ServiceServiceDayWorkingHours",
        periods: ["09:00-12:00", "13:00-17:00"],
      },
      sa: {
        __typename: "ServiceServiceDayWorkingHours",
        periods: ["10:00-14:00"],
      },
      su: {
        __typename: "ServiceServiceDayWorkingHours",
        periods: ["10:00-14:00"],
      },
    },
  };

  beforeEach(() => {
    wrapper = shallow(<SellerServiceWorkingHoursSection {...props} />);
  });

  it("should match snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
