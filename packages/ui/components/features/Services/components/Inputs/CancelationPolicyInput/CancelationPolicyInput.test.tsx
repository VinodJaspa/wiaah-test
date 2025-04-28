import { shallow, ShallowWrapper } from "enzyme";
import { getTestId } from "utils";
import {
  CancelationPolicyInput,
  CancelationPolicyInputProps,
} from "./CancelationPolicyInput";

const selectors = {
  costInput: "CancelationPolicyCostInput",
  durationInput: "CancelationPolicyDurationInput",
  onAddBtn: "CancelationPolicyAddBtn",
};

describe("CancelationPolicyInput", () => {
  let wrapper: ShallowWrapper;
  const props: CancelationPolicyInputProps = {
    onAdd(data) {},
  };
  let mockOnAdd: jest.Mock;
  beforeEach(() => {
    mockOnAdd = jest.fn();
    wrapper = shallow(<CancelationPolicyInput {...props} onAdd={mockOnAdd} />);
  });

  it("should call onAdd when the right data", () => {
    wrapper
      .find(getTestId(selectors.costInput))
      .simulate("change", { target: { value: "5" } });
    wrapper
      .find(getTestId(selectors.durationInput))
      .simulate("change", { target: { value: "9" } });
    wrapper.find(getTestId(selectors.onAddBtn)).simulate("click");
    expect(mockOnAdd).toBeCalledTimes(1);
    expect(mockOnAdd).toBeCalledWith({ cost: 5, duration: 9 });
  });

  it("should match snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
