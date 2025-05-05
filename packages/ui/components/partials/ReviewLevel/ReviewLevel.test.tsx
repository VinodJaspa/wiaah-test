import { shallow, ShallowWrapper } from "enzyme";
import { ReviewLevel, ReviewLevelProps } from "./ReviewLevel";

describe("ReviewLevel", () => {
  let wrapper: ShallowWrapper;
  const props: ReviewLevelProps = {
    name: "review 1",
    rate: 8.9,
    rateOf: 10,
  };

  beforeEach(() => {
    wrapper = shallow(<ReviewLevel {...props} />);
  });

  it("should match snapshot with default rateof", () => {
    expect(
      shallow(<ReviewLevel {...props} rateOf={undefined} rate={4.9} />)
    ).toMatchSnapshot();
  });
  it("should match snapshot with rate higher than rateof", () => {
    expect(
      shallow(<ReviewLevel {...props} rateOf={undefined} rate={8} />)
    ).toMatchSnapshot();
  });
  it("should match snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
