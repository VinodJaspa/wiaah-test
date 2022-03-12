import { shallow } from "enzyme";
import { DividerWidthChild } from "../DividerWithChild";
import toJSON from "enzyme-to-json";

describe("dividerWithChild", () => {
  it("should render properly", () => {
    shallow(<DividerWidthChild />);
  });
  it("should render child being passed to", () => {
    const childComponent = <div>test</div>;
    const component = shallow(
      <DividerWidthChild>{childComponent}</DividerWidthChild>
    );
    expect(component.containsMatchingElement(childComponent)).toBe(true);
  });
});

describe("snapshot", () => {
  it("should match snapshot in its default state", () => {
    const component = shallow(<DividerWidthChild />);
    expect(toJSON(component)).toMatchSnapshot();
  });
  it("should match snapshot with text", () => {
    const childComponent = <div>test</div>;
    const component = shallow(
      <DividerWidthChild>{childComponent}</DividerWidthChild>
    );
    expect(toJSON(component)).toMatchSnapshot();
  });
});
