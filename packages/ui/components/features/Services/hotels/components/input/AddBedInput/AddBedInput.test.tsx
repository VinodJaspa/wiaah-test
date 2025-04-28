import { mount, ReactWrapper, shallow, ShallowWrapper } from "enzyme";
import {
  getDeepMountedComponent,
  getMountedComponent,
  getTestId,
  waitFor,
} from "utils";
import { AddBedInput, AddBedInputProps } from "./AddBedInput";
import { act } from "react-dom/test-utils";

const selectors = {
  addButton: "AddNewBedAddButton",
  bedNameInput: "AddNewBedNameInput",
};

describe("AddBedInput", () => {
  let wrapper: ReactWrapper;
  let mockOnAdd: jest.Mock;
  const props: AddBedInputProps = {
    onAdd(bed) {},
  };
  beforeEach(() => {
    mockOnAdd = jest.fn();
    wrapper = mount(<AddBedInput {...props} onAdd={mockOnAdd} />);
  });
  it("should trigger on add with the right bed name when clicling on the add button", async () => {
    const bednameinput = getDeepMountedComponent(
      wrapper,
      getTestId(selectors.bedNameInput)
    );
    bednameinput.simulate("change", {
      target: { name: "name", value: "test bed name" },
    });
    wrapper.update();
    getDeepMountedComponent(wrapper, getTestId(selectors.addButton)).simulate(
      "click"
    );
    await waitFor(() => {
      wrapper.update();
      expect(mockOnAdd).toBeCalledTimes(1);
      expect(mockOnAdd).toBeCalledWith({ name: "test bed name" });
    });
  });
});
