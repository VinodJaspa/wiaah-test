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
        weekDay: "Sunday",
        from: new Date(2022, 8, 21).toString(),
        to: new Date(2022, 8, 24).toString(),
      },
      {
        weekDay: "Friday",
        from: new Date(2022, 8, 21).toString(),
        to: new Date(2022, 8, 24).toString(),
      },
      {
        weekDay: "Monday",
        from: new Date(2022, 8, 21).toString(),
        to: new Date(2022, 8, 24).toString(),
      },
      {
        weekDay: "Saturday",
        from: new Date(2022, 8, 21).toString(),
        to: new Date(2022, 8, 24).toString(),
      },
      {
        weekDay: "Thursday",
        from: new Date(2022, 8, 21).toString(),
        to: new Date(2022, 8, 24).toString(),
      },
      {
        weekDay: "Tuesday",
        from: new Date(2022, 8, 21).toString(),
        to: new Date(2022, 8, 24).toString(),
      },
      {
        weekDay: "Wednesday",
        from: new Date(2022, 8, 21).toString(),
        to: new Date(2022, 8, 24).toString(),
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
