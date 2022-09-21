import { shallow, ShallowWrapper } from "enzyme";
import { getTestId } from "utils";
import { ExtraServiceInput, ExtraServiceInputProps } from "./ExtraServiceInput";

const selectors = {
  extraNameInput: "ExtraServiceNameInput",
  extraCostInput: "ExtraServiceCostInput",
  extraAddBtn: "ExtraAddBtn",
};

describe("ExtraServiceInput", () => {
  let wrapper: ShallowWrapper;
  let props: ExtraServiceInputProps = {
    onAdd(data) {},
  };
  let mockOnAdd: jest.Mock;
  beforeEach(() => {
    mockOnAdd = jest.fn();
    wrapper = shallow(<ExtraServiceInput {...props} onAdd={mockOnAdd} />);
  });

  it("should call on add with the right props", () => {
    wrapper
      .find(getTestId(selectors.extraNameInput))
      .simulate("change", { target: { value: "test name" } });
    wrapper
      .find(getTestId(selectors.extraCostInput))
      .simulate("change", { target: { value: "15" } });
    wrapper.find(getTestId(selectors.extraAddBtn)).simulate("click");
    expect(mockOnAdd).toBeCalledTimes(1);
    expect(mockOnAdd).toBeCalledWith({ name: "test name", cost: 15 });
  });

  it("should match snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
