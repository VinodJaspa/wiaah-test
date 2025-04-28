import { shallow, ShallowWrapper } from "enzyme";
import { getTestId } from "utils";
import {
  ServiceDetailsReviewsSection,
  ServiceDetailsReviewsSectionProps,
} from "./ServiceDetailsReviewsSection";

const selectors = {
  reviewLevel: "ReviewLevel",
  reviewComment: "ReviewComment",
};

describe("ServiceDetailsReviewsSection", () => {
  let wrapper: ShallowWrapper;
  const props: ServiceDetailsReviewsSectionProps = {
    overAllRating: 4.5,
    ratingLevels: [
      {
        name: "cleanlines",
        rate: 5,
      },
      {
        name: "as described",
        rate: 4.5,
      },
      {
        name: "taste",
        rate: 4.8,
      },
    ],
    reviews: [],
  };
  beforeEach(() => {
    wrapper = shallow(<ServiceDetailsReviewsSection {...props} />);
  });

  it("Should match snapshot with ratings", () => {
    expect(wrapper.find(getTestId(selectors.reviewLevel)).length).toBe(
      props.ratingLevels.length
    );
    expect(wrapper.find(getTestId(selectors.reviewComment)).length).toBe(
      props.reviews.length
    );
    expect(wrapper).toMatchSnapshot();
  });
  it("should match snapshot with no ratings", () => {
    expect(
      shallow(
        <ServiceDetailsReviewsSection
          {...props}
          ratingLevels={[]}
          reviews={[]}
        />
      )
    );
  });
});
