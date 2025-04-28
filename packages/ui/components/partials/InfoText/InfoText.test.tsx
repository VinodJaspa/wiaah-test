import { shallow, ShallowWrapper } from "enzyme";
import { InfoTextProps, InfoText, InfoTextCases } from "./InfoText";

describe("InfoText", () => {
  let wrapper: ShallowWrapper;
  const props: InfoTextProps = {};
  const variants: (keyof InfoTextCases)[] = [
    "fail",
    "info",
    "success",
    "warning",
  ];
  const casesText: string[] = [
    "fail text",
    "successful text",
    "info text",
    "warning text",
  ];
  beforeEach(() => {
    wrapper = shallow(<InfoText>text test</InfoText>);
  });

  it("should render child properly", () => {
    expect(wrapper.text()).toBe("text test");
  });
  it("should match snapshot with variants", () => {
    variants.forEach((v) => {
      expect(
        shallow(<InfoText variant={v}>test text</InfoText>)
      ).toMatchSnapshot(`variant ${v}`);
    });
    expect(wrapper).toMatchSnapshot("default");
  });
  it("should match snapshot with cases", () => {
    casesText.forEach((text) => {
      expect(
        shallow(
          <InfoText
            cases={{
              fail: "fail text",
              success: "successful text",
              info: "info text",
              warning: "warning text",
            }}
          >
            {text}
          </InfoText>
        )
      ).toMatchSnapshot(`case: ${text}`);
    });
  });
});
