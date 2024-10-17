import { shallow, ShallowWrapper } from "enzyme";
import {
  SellerServiceWorkingHoursSection,
  SellerServiceWorkingHoursSectionProps,
} from "./SellerServiceWorkingHoursSection";

describe("SellerServiceWorkingHoursSection", () => {
  let wrapper: ShallowWrapper;
  let props: SellerServiceWorkingHoursSectionProps = {
    workingDays: [
      {
        __typename: "ShopDayWorkingHours",
        periods: [
          "Monday: 09:00 AM - 05:00 PM",
          "Tuesday: 09:00 AM - 05:00 PM",
          "Wednesday: 09:00 AM - 05:00 PM",
          "Thursday: 09:00 AM - 05:00 PM",
          "Friday: 09:00 AM - 05:00 PM",
          "Saturday: 10:00 AM - 02:00 PM",
          "Sunday: Closed",
        ],
      },
    ],
  };

  beforeEach(() => {
    wrapper = shallow(<SellerServiceWorkingHoursSection {...props} />);
  });

  it("should match snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
