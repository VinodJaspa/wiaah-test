import { shallow } from "enzyme";
import { DividerWidthText } from "../DividerWithText";
import toJSON from "enzyme-to-json";

describe("divider with text", () => {
  it("should render properly", () => {
    shallow(<DividerWidthText />);
  });
  it("should render text correctly", () => {
    const component = shallow(<DividerWidthText text="divider test text" />);
    expect(component.text).toBe("divider test text");
  });
});

describe("snapshot", () => {
  it("should match snapshot in its default state", () => {
    const component = shallow(<DividerWidthText />);
    expect(toJSON(component)).toMatchSnapshot();
  });
  it("should match snapshot with text", () => {
    const component = shallow(<DividerWidthText text="divider test text" />);
    expect(toJSON(component)).toMatchSnapshot();
  });
});
