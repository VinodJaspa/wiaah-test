import { shallow, ShallowWrapper } from "enzyme";
import { StatusSelectInput, StatusSelectInputProps } from "./StatusSelectInput";

describe("StatusSelectInput", () => {
  let wrapper: ShallowWrapper;
  let onChangeMock: jest.Mock;
  let props: StatusSelectInputProps = {
    onChange(value) {},
    options: ["instock", "outofstock"],

    value: "test value",
  };

  beforeEach(() => {
    onChangeMock = jest.fn();
    wrapper = shallow(<StatusSelectInput {...props} onChange={onChangeMock} />);
  });

  it("should match snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });
  it("should match snapshot with ph", () => {
    expect(
      shallow(<StatusSelectInput {...props} placeholder={"test ph"} />)
    ).toMatchSnapshot();
  });
});
