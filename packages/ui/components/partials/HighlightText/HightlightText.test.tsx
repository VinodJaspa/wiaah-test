import { shallow, ShallowWrapper } from "enzyme";
import { getTestId } from "utils";
import { HighlightText, HighlightTextProps } from "./HightlightText";

const selectors = {
  highlighedText: "highlightedText",
};

const text = "some random text to test";

describe("HighlightText", () => {
  let wrapper: ShallowWrapper;
  const props: HighlightTextProps = {
    toHighlight: "dom te",
  };

  beforeEach(() => {
    wrapper = shallow(<HighlightText {...props}>{text}</HighlightText>);
  });
  it("should render the seperate the highlighted text correctly", () => {
    expect(wrapper.find(getTestId(selectors.highlighedText)).text()).toBe(
      props.toHighlight
    );
  });
  it("should render the full text properly", () => {
    expect(wrapper.text()).toBe(text);
  });
  it("should render the alt text passed to the text prop if the children type is not string", () => {
    expect(shallow(<HighlightText {...props} text={"alt text"} />).text()).toBe(
      "alt text"
    );
  });
  it("should match snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
